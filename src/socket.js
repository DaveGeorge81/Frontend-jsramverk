import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://jsramverk-trains-meda23.azurewebsites.net/';

export const socket = io(URL);