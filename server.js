import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleEvents } from './utils/handleEvents.js'
import { handlePost } from './handlers/routeHandlers.js'

const __dirname = import.meta.dirname
const PORT = 8000
const server = http.createServer(async (req, res) => {

    if (req.url === '/events') {
        return handleEvents(req, res)
    }

    if (req.url === '/') {
        if (req.method === 'POST') {
            return handlePost(req, res)
        }
    }

    await serveStatic(req, res, __dirname)
})

server.listen(PORT, () => {
    console.log('server running on port ', PORT)
})