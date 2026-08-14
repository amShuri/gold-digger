import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleSSE } from './utils/handleSSE.js'
import { handleGet, handlePost } from './handlers/routeHandlers.js'

const __dirname = import.meta.dirname
const PORT = 8000
const server = http.createServer(async (req, res) => {

    if (req.url === '/events') {
        return handleSSE(req, res)
    }

    if (req.url === '/') {
        if (req.method === 'POST') {
            return handlePost(req, res)
        }
    }

    if (req.url === '/transaction-pdf') {
        if (req.method === 'GET') {
            return handleGet(res)
        }
    }

    await serveStatic(req, res, __dirname)
})

server.listen(PORT, () => {
    console.log('server running on port ', PORT)
})