let accessToken;
const clientID = '914827c44750421c8fe7968f4226029b'
const redirectUri = 'http://localhost:3000/'
//window.location.href = 

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
     //checking url to see if accessToken has been obtained
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //clears the parameters, so when a new access token is needed it can grab it

      window.setTimeout(() => accessToken = '', expiresIn * 1000)//resets using '' in the matched time 
      window.history.pushState('Access token', null, '/')      
    } else {
     return `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }

  },
};
