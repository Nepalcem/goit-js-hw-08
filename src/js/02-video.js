import Player from '@vimeo/player/src/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const playerOnFunc = function (data) {
  const timePlayed = data.seconds;
  localStorage.setItem('videoplayer-current-time', timePlayed);
  console.log(localStorage.getItem('videoplayer-current-time'));
};

player.on('timeupdate', throttle(playerOnFunc, 1000));

const localTimePlayed = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(localTimePlayed);
