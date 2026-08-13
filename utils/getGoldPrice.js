const GOLD_PRICE = 2000

export function getGoldPrice() {
    return GOLD_PRICE + getPriceFluctuation()
}

function getPriceFluctuation() {
    return Number(((Math.random() - 0.5) * 100).toFixed(2))
}