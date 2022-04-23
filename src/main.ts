import {Server} from "socket.io";
import {handleSocket} from './socketHandler';
import config from './config';
import * as express from "express";
import {createServer} from 'http';

const app = express()
app.use(express.static('public'))

const httpServer = createServer(app);

const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: "*",
    methods: ["GET"]
  }
});
io.on("connection", s => handleSocket(s, io));
httpServer.listen(config.port, () => {
  console.log('\nServer listening on port ' + config.port)
})
