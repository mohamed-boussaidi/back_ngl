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
  const shotLivedToken = await getInstagramShortToken(code);
  const { ApiTokenId, instagramAccessToken } = await getInstagramAccess(
    shotLivedToken
  );
  const { instagramId, username } = await getInstagramProfile(
    ApiTokenId,
    instagramAccessToken
  );
  const user = await findUserByInstagramId(instagramId);
  try {
    if (!user) {
      const newUser = await createUser({
        instagramId,
        username,
        ApiTokenId,
        instagramAccessToken,
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
    await user.save();
    const payload = omit(user.toJSON(), ['ApiTokenId', 'instagramAccessToken']);
    const jwt = signJwt(payload);
    return res.status(StatusCodes.OK).send(jwt);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
