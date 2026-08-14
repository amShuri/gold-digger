import { saveData } from '../utils/saveData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { getData } from '../utils/getData.js'
import { getGoldPrice } from '../utils/getGoldPrice.js'
import { sendEmailEmitter } from '../events/sendEmail.js'

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

        await saveData(data)
        
        sendEmailEmitter.emit('transactionCompleted', purchase)
        sendResponse(res, 201, 'application/json', JSON.stringify(purchase))
    } catch(err) {
        console.log(err)
    }
}