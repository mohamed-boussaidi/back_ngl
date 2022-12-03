import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from '../helpers/omit';
import { createUser, findUserByInstagramId } from '../user/user.service';
import { LoginBody } from './auth.schema';
import {
  getInstagramAccess,
  getInstagramProfile,
  getInstagramShortToken,
} from './auth.service';
import { signJwt } from './auth.utils';

// Login Handler
export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { code } = req.body;
  try {
    const shortTokenData = await getInstagramShortToken(code);
    const shotLivedToken = shortTokenData.access_token;
    const ApiTokenId = shortTokenData.user_id;
    if (!shotLivedToken || !ApiTokenId) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const accessTokenData = await getInstagramAccess(shotLivedToken);
    const instagramAccessToken = accessTokenData.access_token;
    const instagramTokenExpiration = accessTokenData.expires_in;
    if (!instagramAccessToken || !instagramTokenExpiration) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const profileData = await getInstagramProfile(instagramAccessToken);
    const instagramId = profileData.id;
    const username = profileData.username;
    if (!instagramId || !username) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const user = await findUserByInstagramId(instagramId);
    if (!user) {
      const newUser = await createUser({
        instagramId,
        username,
        ApiTokenId,
        instagramAccessToken,
        instagramTokenExpiration,
      });
      const payload = omit(newUser.toJSON(), [
        'ApiTokenId',
        'instagramAccessToken',
      ]);
      const jwt = signJwt(payload);
      return res.status(StatusCodes.OK).send(jwt);
    }
    user.ApiTokenId = ApiTokenId;
    user.instagramAccessToken = instagramAccessToken;
    user.instagramTokenExpiration = instagramTokenExpiration;
    await user.save();
    const payload = omit(user.toJSON(), ['ApiTokenId', 'instagramAccessToken']);
    const jwt = signJwt(payload);
    return res.status(StatusCodes.OK).send(jwt);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
