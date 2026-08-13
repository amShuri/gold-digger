export async function parseJSONBody(req) {
    try {
        let requestBody = ''
        for await (const chunk of req) {
            requestBody += chunk
        }
        return JSON.parse(requestBody)
    } catch (err) {
        console.log(err)
    }
}