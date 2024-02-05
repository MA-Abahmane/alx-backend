/**
 * Using Babel and ES6, write a script named 0-redis_client.js.
 *  It should connect to the Redis server running on your machine
*/

import redis from 'redis'

// Create a Redis client
const client = redis.createClient()

// Connect to the Redis server
client.on('connect', () => {console.log('Redis client connected to the server')})

client.on('error', (err) => {console.log(`Redis client not connected to the server: ${err}`)})
