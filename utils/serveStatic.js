import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req, res, baseDir) {
    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    )
    const extname = path.extname (req.url)
    const contentType = getContentType(extname)

    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)
    } catch(err) {
        const filePath = path.join(publicDir, '404.html')
        const content = await fs.readFile(filePath)
        sendResponse(res, 404, 'text/html', content)
    }
}