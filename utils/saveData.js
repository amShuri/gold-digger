import path from 'node:path'
import fs from 'node:fs/promises'

export async function saveData(data) {
    const filePath = path.join('data', 'data.json')
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}