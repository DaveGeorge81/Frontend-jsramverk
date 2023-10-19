import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://jsramverk-trains-meda23.azurewebsites.net/';
// const URL = 'localhost:1337';

export const socket = io(URL);