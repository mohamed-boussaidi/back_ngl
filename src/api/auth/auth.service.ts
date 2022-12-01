// Get Instagram Short Access Token Request
export async function getInstagramShortToken(code: string) {
  console.log(code);
  return 'token';
}
// Get Instagram Long Access Token Request
export async function getInstagramAccess(shotLivedToken: string) {
  console.log(shotLivedToken);
  return { instagramAccessToken: 'token1', ApiTokenId: 'tokenid1' };
}
// Get Instagram User Profile
export async function getInstagramProfile(
  ApiTokenId: string,
  instagramAccessToken: string
) {
  console.log(ApiTokenId, instagramAccessToken);
  return { instagramId: 'instaid', username: 'username' };
}
