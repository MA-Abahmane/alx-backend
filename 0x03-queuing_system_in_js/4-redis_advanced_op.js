/**
 * let’s use the client to store a hash value
 * Create Hash:
 * Using hset, store some values
 */

import redis from 'redis'
import { promisify } from 'util'

// Create a Redis client
const client = redis.createClient()

// Connect to the Redis server
client.on('connect', () => console.log('Redis client connected to the server'))

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`))


const values = {
'Portland': '50',
'Seattle': '80',
'New York': '20',
'Bogota': '20',
'Cali': '40',
'Paris': '2'
}

for (const [key, val] of Object.entries(values))
    client.hset('HolbertonSchools', key, val, redis.print)

client.hgetall('HolbertonSchools', (err, hashObj) => {
    console.log(hashObj)
})