const http = require('http')

const todos = [
    {id: 1, task: 'learn react'},
    {id: 2, task: 'learn node api'},
    {id: 3, task: 'do exercise'},
]

const server = http.createServer((req, res) => {
    const {url, method} = req

    let body = []

    req
        .on('data', (chunk) => {
            body.push(chunk)
        })
        .on('end', () => {
            body = Buffer.concat(body).toString()

            let status = 404
            let response = {
                success: false, 
                error: 'Not Found',
                data: null
            }

            if (method === 'GET' && url === '/todos') {
                status = 200
                response.success = true
                response.error = 'Success'
                response.data = todos
            } else if (method === 'POST' && url === '/todos') {
                const {id, task} = JSON.parse(body)
                todos.push({id, task})

                if (!id || !task) {
                    status = 400
                    response.success = false
                    response.error = 'id and task are required'
                    response.data = null   
                } else {
                    status = 201
                    response.success = true
                    response.error = 'id and task are created'
                    response.data = todos
                }

            }
            
            res.writeHead(status, {
                'Content-type': 'application/json',
                'X-Powered-By': 'Node.js'
            })

            res.end(JSON.stringify(response))
        })
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})