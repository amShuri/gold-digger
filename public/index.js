const connectionStatus = document.getElementById('connection-status')
const priceDisplay = document.getElementById('price-display')
const investmentAmount = document.getElementById('investment-amount')
const summaryModal = document.getElementById('summary-modal')
const ounces = document.getElementById('ounces')
const amount = document.getElementById('amount')

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

document.getElementById('investment-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Number(investmentAmount.value))
    })
    const data = await response.json()

    ounces.textContent = data.goldSold.toFixed(2)
    amount.textContent = data.amountPaid

    summaryModal.showModal()
})

