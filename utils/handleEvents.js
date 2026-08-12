export function handleEvents(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'stay-alive')

    res.write('data: Live Price 🟢\n\n')

    req.on('close', () => {
        res.end()
    })
}