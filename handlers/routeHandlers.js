import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { getData } from '../utils/getData.js'
import { getGoldPrice } from '../utils/getGoldPrice.js'

export async function handlePost(req, res) {
    try {
        const invesmentAmount = await parseJSONBody(req)
        const data = await getData()
        const goldPrice = getGoldPrice()
        const purchase = {
            date: new Date(),
            amountPaid: invesmentAmount,
            pricePerOz: goldPrice,
            goldSold: invesmentAmount / goldPrice
        }
        data.push(purchase)

        const filePath = path.join('data', 'data.json')
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))

        sendResponse(res, 201, 'application/json', JSON.stringify(purchase))
    } catch(err) {
        console.log(err)
    }
}