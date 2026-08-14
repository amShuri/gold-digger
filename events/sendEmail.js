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
    console.log(purchase)
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // we send the email to ourselves for testing
            subject: 'Transaction Details',
            text: 'Gold Digger (Scrimba Project)',
            html: `
                <h1>Gold Digger (Scrimba Project)</h1>
                <p>Here are the details of your transaction:</p>
                <p>Date: ${purchase.date}</p>
                <p>You bought: ${purchase.goldSold} ounces (ozt) of gold for £${purchase.amountPaid}</p>
            `
        }

        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err)
    }
}

sendEmailEmitter.on('transactionCompleted', sendEmail)