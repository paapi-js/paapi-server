import {Server} from "socket.io";
import {handleSocket} from './socketHandler';
import config from './config';

const io = new Server(config.server.port, {
  serveClient: false,
  cors: {
    origin: "*",
    methods: ["GET"]
  }
});
io.on("connection", s => handleSocket(s, io));
console.log('Starting server on port ' + config.server.port)
