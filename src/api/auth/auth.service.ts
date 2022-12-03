import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

// Get Instagram Short Access Token Request
export async function getInstagramShortToken(code: string) {
  const url = 'https://api.instagram.com/oauth/access_token';
  const params = new URLSearchParams();
  params.append('client_id', process.env.INSTAGRAM_APP_ID as string);
  params.append('client_secret', process.env.INSTAGRAM_SECRET as string);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', process.env.REDIRECT_URI as string);
  params.append('code', code);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const response = await axios.post(url, params, config);
    if (response.status == StatusCodes.OK) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
}
// Get Instagram Long Access Token Request
export async function getInstagramAccess(shotLivedToken: string) {
  const url = 'https://graph.instagram.com/access_token';
  const params = new URLSearchParams();
  params.append('grant_type', 'ig_exchange_token');
  params.append('client_secret', process.env.INSTAGRAM_SECRET as string);
  params.append('access_token', shotLivedToken);
  try {
    const response = await axios.get(url, { params });
    if (response.status == StatusCodes.OK) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
}
// Get Instagram User Profile
export async function getInstagramProfile(instagramAccessToken: string) {
  const url =
    'https://graph.instagram.com/me?' +
    'fields=id,username&' +
    'access_token=' +
    instagramAccessToken;
  try {
    const response = await axios.get(url);
    if (response.status == StatusCodes.OK) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
}
