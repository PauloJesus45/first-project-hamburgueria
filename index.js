import cors from "cors"
import Express from "express"
import {v4} from "uuid"

const app = Express()
const port = 3001
app.use(cors())
const ordes = []

const ckeckId = (request, response, next) => {
     const { id } = request.params
     const index = orders.finIndex(order => order.id === id)

     if (index <0){
        return response.status(404).json({ erro: "Order Not Found" })
      
    }

    request.orderId = id
    request.orderIndex

    next()
}

const url = (request, response, next) => {
    const { url,method } = request
    console.log(`Url: ${url}, Method: ${method}`)

    next()
}

app.post('/order', url, (request, response) => {
    const { order, clientName, price, status } = request.body

    const o = { id: v4(), order, clientName, price, status }

    orders.push(o)

    return response.status(201).json(orders)
})

app.get('/order', url, (request, response) => {
    return response.json(orders)
})

app.put('/orders/:id', checkId, url, (request, response) => {
    const { order, clientName, price, status } = request.body
    const id = request.orderId
    const index = request.orderIndex

    const updateOrder = { id, order, clientName, price, status }

    orders[index] = updateOrder

    return response.status(201).json(updateOrder)
})

app.delete('/order/:id', checkId, (request, response) => {
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', checkId, url, (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    return response.json(orders[index])
})

app.patch('/order/:id', checkId, url, (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    orders[index].status = 'Pronto'

    return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`🚀Server Started in: ${port}`)
})