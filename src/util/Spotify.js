let accessToken;
const clientID = "ca70f74f8bbc431bb94fa84dd6babf2b";
const redirectUri = "http://localhost:3000/";

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

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000); //resets using '' in the matched time
      window.history.pushState("Access token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return !jsonResponse.tracks
      ? []
      : jsonResponse.tracks.items.map((track) => ({
          id: track.id,
            name: track.name,
              artist: track.artists[0].name,
                album: track.album.name,
                  uri: track.uri,
        }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    let userId;
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: headers,
      });
      console.log(response);
      const jsonResponse = await response.json();
      userId = jsonResponse.id;
  
      const userIdResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      console.log(userIdResponse);
      const userIdJsonResponse = await userIdResponse.json();
      const playlistId = userIdJsonResponse.id;
  
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      );
      console.log(playlistResponse);
      const playlistJsonResponse = await playlistResponse.json();
      return playlistJsonResponse.id;
    } catch (error) {
      console.error(error);
    }
  },
  
};
