<h1 style='color: royalblue;'> Redis Cheat Sheet for JavaScript </h1>

## Redis Quick Start

### Installation
- Install Redis server on your machine or use a cloud-based service.

### Connecting to Redis
- Use a Redis client library to connect to the server.

## Redis Client Interface

### Key-Value Operations

#### SET
```javascript
const redis = require('redis');
const client = redis.createClient();

client.set('key', 'value', (err, reply) => {
  console.log(reply); // OK
});
```

#### GET
```javascript
client.get('key', (err, reply) => {
  console.log(reply); // value
});
```

### List Operations

#### LPUSH
```javascript
client.lpush('myList', 'element1', 'element2', (err, length) => {
  console.log(length); // Length of the list after push
});
```

#### LRANGE
```javascript
client.lrange('myList', 0, -1, (err, elements) => {
  console.log(elements); // Array of all elements in the list
});
```

### Hash Operations

#### HSET
```javascript
client.hset('myHash', 'field1', 'value1', (err, reply) => {
  console.log(reply); // 1 if field is a new field, 0 if field already exists
});
```

#### HGET
```javascript
client.hget('myHash', 'field1', (err, value) => {
  console.log(value); // value1
});
```

## Redis Client for Node.js

### Using `ioredis` Library

#### Installation
```bash
npm install ioredis
```

#### Example
```javascript
const Redis = require('ioredis');
const redis = new Redis();

redis.set('key', 'value');
redis.get('key').then((value) => {
  console.log(value); // value
});
```

## Kue (Deprecated but Still Used)

### Installation
```bash
npm install kue
```

### Example
```javascript
const kue = require('kue');
const queue = kue.createQueue();

const job = queue.create('email', {
  title: 'send welcome email',
  to: 'user@example.com',
  template: 'welcome-email',
}).save();

job.on('complete', () => {
  console.log('Job completed successfully');
});

// Process jobs in a separate worker file
// worker.js
const kue = require('kue');
const queue = kue.createQueue();

queue.process('email', (job, done) => {
  // Email sending logic here
  console.log(`Sending email to ${job.data.to}`);
  done();
});
```

## Important Notes
- Kue is deprecated, and it's recommended to use modern job queue solutions like Bull or Agenda.
- Always handle errors and edge cases appropriately in your code.
- Ensure proper error handling and connection management in production environments.

**.MAA**
