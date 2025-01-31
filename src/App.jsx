import { useEffect, useState } from 'react'
import './App.css'
import { TbPlayerSkipForwardFilled } from "react-icons/tb";

import { redirectToSpotifyAuthorize, currentToken, logout } from './spotify';
import { getDevices, getTrack, shuffle, skip } from './spotifyAPI';

function App() {

  const [device, setDevice] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [trackComposer, setTrackComposer] = useState('');


  const handleShowInfo = async () => {
    const res = await getTrack();
    setTrackTitle(res.item.name);
    const composer = res.item.artists.map(artist => artist.name).join(", ");
    setTrackComposer(composer);
  }

  useEffect(() => {
    if (currentToken.access_token) {
      // logged in

      // set devices
      getDevices().then(devices => {
        console.log(devices.devices)
        devices.devices.forEach(d => d.is_active ? setDevice(d) : '');
    });
    }
}, [])

/*
<div className='container'>
          <h2>Enter playlist URL</h2>
          <input type="text" value={playlistUrl} onChange={e => setPlaylistUrl(e.target.value)} />
            
          <div style={{width: "100%"}}>
            <button onClick={() => shuffle().then(() => startPlaylist(playlistUrl))}>start</button>
          </div>
        </div>
*/

  return (
    <div className='page'>
      <div className='instr-container'>
        <h2>Instructions</h2>

        <ol style={{listStylePosition: "inside"}}>
          <li>Login with your spotify account.</li>
          <li>Open Spotify on your phone or computer and <br /> start playing a playlist.</li>
          <li>Refresh this page. You should see your active device. <br />
           (look below if you dont)</li>
          <li>Use the skip button to start playing the next song <br />
            in a random place.</li>
          <li>After you think you know what song it is, use the <br />
            "show info" button to display the title and composer to <br />
            verify your guess.</li>
        </ol>

        <h3>Troubleshooting:</h3>
        <ul style={{listStylePosition: "inside"}}>
          <li>If your device is not detected, please try to close Spotify <br />
            (and clear from background) then re-open it, and refresh <br /> this page.</li>
          <li>If its still not working please try to logout and log <br />
            back in as the token might be expired.</li>
            <li>And finally if its still not working please let me know! <br />
            <a href="mailto:emrymcgill@gmail.com">emrymcgill@gmail.com</a></li>
        </ul>
      </div>
      {currentToken.access_token ?
      <div className='content-container'>
        <div className='top-bar'>
          <div>
            <p><b>Device:</b> {device.name ? device.name : 'No active device.'}</p>
          </div>
          <button onClick={logout}>logout</button>
        </div>

        {trackTitle ?
        <div className='container'>
          <h2>Title:</h2>
          <p style={{fontSize: '1.5rem', width: '100%'}}>{trackTitle}</p>
          <h2>Composer:</h2>
          <p style={{fontSize: '1.5rem', width: '100%'}}>{trackComposer}</p>
        </div>
        : '' }
        
        <div className='container'>
          <div style={{display: "flex", gap: "0.5rem"}}>
            <button onClick={handleShowInfo}>Show Info</button>
            <button onClick={() => {
              setTrackTitle('');
              setTrackComposer('');
              skip();
              }} className='pause-btn'><TbPlayerSkipForwardFilled /></button>
          </div>
        </div>
      </div>
      :
      <div className='content-container'>
      <div className='top-bar'>
        <button onClick={redirectToSpotifyAuthorize}>log in to spotify</button>
      </div>
      </div>
      }
      <div className='instr-container-bottom'>
        <h2>Instructions</h2>

        <ol style={{listStylePosition: "inside"}}>
          <li>Login with your spotify account.</li>
          <li>Open Spotify on your phone or computer and <br /> start playing a playlist.</li>
          <li>Refresh this page. You should see your active device. <br />
           (look below if you dont)</li>
          <li>Use the skip button to start playing the next song <br />
            in a random place.</li>
          <li>After you think you know what song it is, use the <br />
            "show info" button to display the title and composer to <br />
            verify your guess.</li>
        </ol>

        <h3>Troubleshooting:</h3>
        <ul style={{listStylePosition: "inside"}}>
          <li>If your device is not detected, please try to close Spotify <br />
            (and clear from background) then re-open it, and refresh <br /> this page.</li>
          <li>If its still not working please try to logout and log <br />
            back in as the token might be expired.</li>
            <li>And finally if its still not working please let me know! <br />
            <a href="mailto:emrymcgill@gmail.com">emrymcgill@gmail.com</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App
