import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import { createServer } from 'node:http'
const usersDb = []

function getUserCategory(birthDay) {
    const age = new Date().getFullYear() - new Date(birthDay).getFullYear()
    if (age >= 18 && age <= 25) return 'young-adult'
    if (age >= 26 && age <= 50) return 'adult'
    if (age >= 51) return 'elderly'
    if (age < 18) {
        throw new Error('User must be 18yo or older')
    }
}
const server = createServer(async (req, res) => {
    try {


        if (req.url === '/users' && req.method === 'POST') {
            const user = JSON.parse(await once(req, 'data'))
            const updatedUser = { id: randomUUID(), ...user, category: getUserCategory(user.birthDay) }
            usersDb.push(updatedUser)
            res.writeHead(201, { 'Content-Type': 'applicatio/json' })
            res.end(JSON.stringify({
                id: updatedUser.id
            }))
            return;
        }
        if (req.url.startsWith('/users') && req.method === 'GET') {
            const [, , id] = req.url.split('/')
            const user = usersDb.find(user => user.id === id)
            res.end(JSON.stringify(user))
            return;
        }

    } catch (error) {
        if (error.message.includes('18yo')) {
            res.writeHead(400, {
                'Content-Type': 'applicatio/json'
            })
            res.end(JSON.stringify({
                message: error.message
            }))
            return;
        }
        res.writeHead(500)
        res.end('Internal error')
    }
    res.end('Hello World')
})

export { server }
