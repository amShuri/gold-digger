import fs from 'node:fs/promises'
import { saveData } from '../utils/saveData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { getData } from '../utils/getData.js'
import { getGoldPrice } from '../utils/getGoldPrice.js'
import { transactionEmitter } from '../events/handleEvents.js'

export async function handlePost(req, res) {
    try {
        const investmentAmount = await parseJSONBody(req)
        const data = await getData()
        const goldPrice = getGoldPrice()
        const purchase = {
            date: new Date(),
            amountPaid: investmentAmount,
            pricePerOz: goldPrice,
            goldSold: investmentAmount / goldPrice
        }
        data.push(purchase)
        
        await saveData(data)
        
        transactionEmitter.emit('transactionCompleted', purchase)
        sendResponse(res, 201, 'application/json', JSON.stringify(purchase))
    } catch(err) {
        console.log(err)
    }
}

export async function handleGet(res) {
    try {
        const PDFContent = await fs.readFile('./output.pdf')
        sendResponse(res, 200, 'application/pdf', PDFContent)
    } catch (err) {
        console.log(err)
    }
}