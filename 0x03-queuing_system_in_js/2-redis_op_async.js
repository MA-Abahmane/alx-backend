import redis from 'redis'
import { promisify } from 'util'

// Create a Redis client
const client = redis.createClient()

// Connect to the Redis server
client.on('connect', () => console.log('Redis client connected to the server'))

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`))


const get_async = promisify(client.get).bind(client)

// Data Definition functions
function setNewSchool(schoolName, value)
{
    client.set(schoolName, value, (err, reply) => redis.print(reply))
}

async function displaySchoolValue(schoolName)
{
    const result = await get_async(schoolName)
    redis.print(result)
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
