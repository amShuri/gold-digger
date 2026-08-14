import fs from 'node:fs'
import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'
import { EventEmitter } from 'node:events';

export const transactionEmitter = new EventEmitter()

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

function generatePDF(purchase) {
    const doc = new PDFDocument()
    const stream = fs.createWriteStream('output.pdf')

    doc.pipe(stream)
    doc.text(`
        Gold Digger (Scrimba Project)

        Amount Paid: £${purchase.amountPaid}
        Gold Price: £${purchase.pricePerOz}/oz
        Gold Purchased: ${purchase.goldSold} oz
        Date: ${purchase.date}
    `)
    doc.end()
}

transactionEmitter.on('transactionCompleted', generatePDF)
transactionEmitter.on('transactionCompleted', sendEmail)