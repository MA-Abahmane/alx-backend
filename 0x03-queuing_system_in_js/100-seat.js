const kue = require('kue')
const redis = require('redis')
const express = require('express')
const { promisify } = require('util')


const app = express()
const port = 1245

// Create a Redis client
const redisClient = redis.createClient()
const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)

// Reserve a seat function
async function reserveSeat(number) {
  await setAsync('available_seats', number)
}

// Get current available seats function
async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats')
  return parseInt(seats) || 0
}

// Initialize available seats to 50
reserveSeat(50)

// reservation status
let reservationEnabled = true

// Create queue
const queue = kue.createQueue()

// Route to get current available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats()
  res.json({ numberOfAvailableSeats })
})

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ "status": "Reservation are blocked" })
    return
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ "status": "Reservation failed" })
    } else {
      res.json({ "status": "Reservation in process" })
    }
  })

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`)
  })

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`)
  })
})

// Route to process the queue
app.get('/process', async (req, res) => {
  res.json({ "status": "Queue processing" })

  // Decrease available seats
  const currentAvailableSeats = await getCurrentAvailableSeats()
  if (currentAvailableSeats === 0) {
    reservationEnabled = false
    return
  }

  await reserveSeat(currentAvailableSeats - 1)
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
