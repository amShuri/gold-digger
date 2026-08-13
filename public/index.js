const connectionStatus = document.getElementById('connection-status')
const priceDisplay = document.getElementById('price-display')
const eventSource = new EventSource('http://localhost:8000/events')

eventSource.onmessage = (event) => {
    connectionStatus.textContent = event.data
}

eventSource.onerror = (event) => {
    connectionStatus.textContent = 'Disconnected 🔴'
    priceDisplay.textContent = '----.--'
}

eventSource.addEventListener('priceUpdate', (event) => {
    priceDisplay.textContent = event.data
})