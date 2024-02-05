/**
 * Add two functions:
 * - setNewSchool:
 *   It accepts two arguments schoolName, and value.
 *   It should set in Redis the value for the key schoolName
 *   It should display a confirmation message using redis.print
 * - displaySchoolValue:
 *   It accepts one argument schoolName.
 *   It should log to the console the value for the key passed as argument
 */

import redis from 'redis'

// Create a Redis client
const client = redis.createClient()

// Connect to the Redis server
client.on('connect', () => console.log('Redis client connected to the server'))

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`))


// Data Definition functions
function setNewSchool(schoolName, value)
{
    client.set(schoolName, value, (err, reply) => redis.print(reply))
}

function displaySchoolValue(schoolName)
{
    client.get(schoolName, (err, reply) => redis.print(reply))
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
