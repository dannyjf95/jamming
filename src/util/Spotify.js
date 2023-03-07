let userAccessToken;

export const Spotify = {
 
 getAccessToken () {
  if(userAccessToken) {
   return userAccessToken
  }
 }
}