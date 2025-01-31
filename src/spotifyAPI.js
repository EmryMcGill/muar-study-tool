import { currentToken } from "./spotify";

const tokenEndpoint = "https://accounts.spotify.com/api/token";

// get the access token
export async function getToken(code) {
    const code_verifier = localStorage.getItem('code_verifier');
  
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_CLIENT_ID,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code_verifier: code_verifier,
      }),
    });
  
    return await response.json();
}

// get the refresh token
export async function refreshToken() {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: currentToken.refresh_token
      }),
    });
  
    return await response.json();
}
  
// get all avalible devices
export async function getDevices () {
  const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
  return await response.json();
}

// start the playlist on the device
export async function startPlaylist (playlist) {
  // extract playlist id
  const playlistId = playlist.split('/').pop();

  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + currentToken.access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "context_uri": `spotify:playlist:${playlistId}`
    }),
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  // get the length of the song
  const track = await getTrack();
  const trackLen = track.item.duration_ms - 60000;
  const rand = Math.floor(Math.random() * (trackLen + 1));

  // skip to random point in the song
  await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${rand}`, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
}

// turn on shuffle
export async function shuffle () {
  await fetch("https://api.spotify.com/v1/me/player/shuffle?state=true", {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + currentToken.access_token,
      'Content-Type': 'application/json'
    },
  });
}

// get current track
export async function getTrack () {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });
  return await response.json();
}

export async function skip () {
  // skip to next song
  await fetch(`https://api.spotify.com/v1/me/player/next`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + currentToken.access_token,
      'Content-Type': 'application/json'
    },
  });
  
  // delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // get the length of the song
  const track = await getTrack();
  const trackLen = track.item.duration_ms - 60000;
  const rand = Math.floor(Math.random() * (trackLen + 1));

  // skip to random point in the song
  await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${rand}`, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  }); 
}

export async function play () {
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + currentToken.access_token,
    },
  });
}

export async function pause () {
  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + currentToken.access_token,
      'Content-Type': 'application/json'
    },
  });
}