import {Server, Socket} from 'socket.io';
import generateId from './generateId';

export function handleSocket(socket: Socket, io: Server) {
  let roomId = null
  socket.on('paapi:join', async (id: string) => {
    if (id === null || id === '') {
      id = await generateId()
    }
    roomId = id
    socket.join(id.toString())
    socket.emit('paapi:joined', id)
    socket.broadcast.to(id).emit('paapi:other-joined')
    const devicesInRoom = io.sockets.adapter.rooms.get(roomId)?.size

    if (devicesInRoom >= 2) {
      socket.broadcast.to(roomId).emit('paapi:paired')
      socket.emit('paapi:paired')
    }
  })

  socket.onAny((eventName, ...args) => {
    if (eventName.startsWith('paapi:')) return
    socket.broadcast.to(roomId).emit(eventName, ...args)
  })
}
