async savePlaylist(name, trackUris, playlistId) {
 if (!name || !trackUris.length) {
   return;
 }

 const accessToken = Spotify.getAccessToken();
 const headers = { Authorization: `Bearer ${accessToken}` };
 const userId = await Spotify.getCurrentUserId();

 try {
   // If a playlist ID is provided, update the playlist name
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
     // Otherwise, create a new playlist
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

   const addTracksResponse = await fetch(
     `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
     {
       headers: headers,
       method: "POST",
       body: JSON.stringify({ uris: trackUris }),
     }
   );
   console.log(addTracksResponse);
   const addTracksJsonResponse = await addTracksResponse.json();
   return addTracksJsonResponse.id;
 } catch (error) {
   console.error(error);
 }
}