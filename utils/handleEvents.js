import { getGoldPrice } from './getGoldPrice.js'

export function handleEvents(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    
    res.write('data: Live Price 🟢\n\n')

    // Send the initial price immediately. Without this, the price display would
    // remain "----.--" until the first interval runs 2 seconds later.
    res.write(`event: priceUpdate\ndata: ${getGoldPrice()}\n\n`)

    // Send subsequent price updates every 2 seconds
    const intervalId = setInterval(() => {
        res.write(`event: priceUpdate\ndata: ${getGoldPrice()}\n\n`)
    }, 2000);

    req.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
}