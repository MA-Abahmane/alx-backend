const redis = require('redis')
const express = require('express')
const { promisify } = require('util')


const app = express()
const port = 1245

// products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
]

// Redis client
const redisClient = redis.createClient()
const setAsync = promisify(redisClient.set).bind(redisClient)
const getAsync = promisify(redisClient.get).bind(redisClient)

// Reserve stock by item ID
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock)
}

// Get current reserved stock by item ID
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`)
  return parseInt(stock) || 0
}

// Middleware to parse request parameters
app.use(express.json())

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity
  })))
})

// route to get product details by item ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId)
  const product = listProducts.find(item => item.itemId === itemId)

  if (!product) {
    return res.json({ "status": "Product not found" })
  }

  const currentQuantity = await getCurrentReservedStockById(itemId)
  res.json({ ...product, currentQuantity })
})

// Route to reserve a product by item ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId)
  const product = listProducts.find(item => item.itemId === itemId)

  if (!product) {
    return res.json({ "status": "Product not found" })
  }

  const currentQuantity = await getCurrentReservedStockById(itemId)

  if (currentQuantity <= 0) {
    return res.json({ "status": "Not enough stock available", itemId })
  }

  await reserveStockById(itemId, currentQuantity - 1)
  res.json({ "status": "Reservation confirmed", itemId })
})


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
