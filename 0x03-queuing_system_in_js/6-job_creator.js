const kue = require('kue');
// Create a queue
const queue  = kue.createQueue();

const jobData = {
    phoneNumber: 12345678,
    message: 'hello'
}

// create job
const job = queue.create('push_notification_code', jobData)

job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
    console.log('Notification job completed');
})

job.on('failed', () => {
    console.log('Notification job failed');
})


job.save()