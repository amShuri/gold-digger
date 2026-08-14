import nodemailer from 'nodemailer'
import { EventEmitter } from 'node:events';

export const sendEmailEmitter = new EventEmitter()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendEmail(purchase) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // we send the email to ourselves for testing
            subject: 'Transaction Details',
            text: `
                Gold Digger (Scrimba Project)

                Amount Paid: £${purchase.amountPaid}
                Gold Price: £${purchase.pricePerOz}/oz
                Gold Purchased: ${purchase.goldSold} oz
                Date: ${purchase.date}
            `,
        }

        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err)
    }
}

sendEmailEmitter.on('transactionCompleted', sendEmail)