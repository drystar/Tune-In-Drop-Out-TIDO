import React, { useState, useEffect } from 'react';
import Script from 'react-load-script';
import classNames from 'classnames';
import { MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md';
import {
  currentTrackPlaying,
  subscribeToCurrentTrackPlaying
} from './../../socketManager.js';
// import getSongsFromSpotifyPlaylist from '../party_room/Party';
import './Player.scss';
// const Player = ({
//     current_track,
//     playlist,
//     isPause
// }) => (
//     <ul>
//         ...
//     </ul>
// )
// Player.propsTypes = {
//     current_track: PropType.shape({
//         id: PropType.string
//     })
// }

// SDK TOKEN
const token = process.env.REACT_APP_SPOTIFY_SDK_TOKEN;
// const token =
//   'BQD1dvRsPFgQwdpKx-6FYfjvcpzNE8a4jQRJvostGSRtX5vdmpQ7-fimZcSxQQT7329AvDK-TkqfFc-tYYZFTW_pEM0CADbYbj-VpuRe3S1uIl38kXZcJq6S8O3VAoYQMoMGiDR2yOrzJ-q6JAbkFqdvkXw17wmMc4GBA2p2vOUspizZKCBRBLR9s8es';

const Player = () => {
  const [player, setPlayer] = useState(null);
  // eslint-disable-next-line
  const [isLoading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  // const [playlist, setPlaylist] = useState([]);
  const [isPaused, setIsPaused] = useState(true);

  // currentTrackPlaying(currentTrack);

  useEffect(() => {
    setLoading(true);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setLoading(false);

      const player = new window.Spotify.Player({
        name: 'TiDo',
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('player_state_changed', state => {
        // console.log('currentTrack', state.track_window.current_track);
        // console.log(state);
        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);
        // console.log(
        //   'current track artists',
        //   state.track_window.current_track.artists[0].name
        // );
        // console.log(currentTrack);
      });

      player.connect();

      setPlayer(player);
      // setIsPaused(false);
    };
  }, []);

  // subscribeToCurrentTrackPlaying((track) => {
  //   setCurrentTrack(track)
  // })

  // useEffect(() => {
  //   const onSongChange = song => {
  //     console.log('on song change', song);
  //     //use the socket method for updating current playing track
  //     setCurrentTrack(song);
  //   };
  //   subscribeToCurrentTrackPlaying(onSongChange);
  // }, [currentTrack]);

  const playerDiv = classNames('div--player');

  function commands() {
    if (isPaused) {
      return (
        <div>
          <MdPlayArrow
            onClick={() => {
              console.log('purple people eaters Playing');
              togglePlay();
            }}
          />

          <MdSkipNext
            onClick={() => {
              console.log('pink people eaters Skipping');
              toggleNext();
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <MdPause
            onClick={() => {
              console.log('purple people eaters Pausing');
              togglePlay();
            }}
          />
          <MdSkipNext
            onClick={() => {
              console.log('pink people eaters Skipping');
              toggleNext();
            }}
          />
        </div>
      );
    }
  }

  const togglePlay = () => {
    if (player) {
      player.togglePlay();
      setIsPaused(false);
    } else {
      console.log('no such player yet, son');
    }
  };

  const toggleNext = () => {
    if (player) {
      player.nextTrack();
    } else {
      console.log('no such player yet, mon');
    }
  };
  // console.log('test current track', currentTrack);
  return (
    <div className={playerDiv}>
      <Script url="https://sdk.scdn.co/spotify-player.js" />

      {currentTrack.album && (
        <img alt="" src={currentTrack.album.images[2].url}></img>
      )}

      <div id="song--details">
        {currentTrack && <div id="song">{currentTrack.name}</div>}
        {currentTrack.artists && (
          <div id="artist">{`${currentTrack.artists[0].name}`}</div>
        )}
      </div>
      <div id="commands">{commands()}</div>
    </div>
  );
};
export default Player;
