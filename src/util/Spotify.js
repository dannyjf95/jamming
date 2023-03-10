const clientID = "019dbe2ce8a6414b887cad35172bd235";
const redirectUri = "http://localhost:3000/";
let accessToken;
let userId;

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
    } //CHANGE AT END
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

  async savePlaylist(name, trackUris, playlistId) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await Spotify.getCurrentUserId();

    try {
      if (playlistId) {
        const updatePlaylistResponse = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
          {
            headers: headers,
            method: "PUT",
            body: JSON.stringify({ name: name }),
          }
        );
        console.log(updatePlaylistResponse);
      } else {
        //create playlist fetch
        const createPlaylistResponse = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ name: name }),
          }
        );
        console.log(createPlaylistResponse);
        const createPlaylistJsonResponse = await createPlaylistResponse.json();
        playlistId = createPlaylistJsonResponse.id;
      }

      // playlist tracks fetch
      const addTrackResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      );
      console.log(addTrackResponse);
      const addTrackJsonResponse = await addTrackResponse.json();
      return addTrackJsonResponse.id;
    } catch (error) {
      console.error(error);
    }
  },

  async getCurrentUserId() {
    if (userId) {
      return userId;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const response = await fetch(`https://api.spotify.com/v1/me `, {
        headers: headers,
      });
      console.log(response);
      const jsonResponse = await response.json();
      userId = jsonResponse.id;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserPlaylists() {
    //getting playing not creating.. 'GET'
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await Spotify.getCurrentUserId();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: "GET",
        }
      );
      const jsonResponse = await response.json();
      return !jsonResponse.items
        ? []
        : jsonResponse.items.map((playlist) => ({
            playlistId: playlist.id,
            playlistName: playlist.name,
          }));
    } catch (error) {
      console.log(error);
    }
  },

  async getPlaylist(id) {
    if (!id) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await Spotify.getCurrentUserId();

    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks `,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return !jsonResponse.tracks
      ? []
      : jsonResponse.tracks.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
  },
};
