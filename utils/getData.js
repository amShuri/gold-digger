import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try {
        const filePath = path.join('data', 'data.json')
        const data = await fs.readFile(filePath)
        const parsedData = JSON.parse(data)
        return parsedData
    } catch(err) {
        console.log(err)
        return []
    }
}