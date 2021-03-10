// require your server and launch it here
const server = require('./api/server.js')

server.listen(8000, () => {
  console.log('listening on 8000')
})