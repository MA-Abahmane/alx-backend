const kue = require('kue')

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781']

// Function to send notification
function sendNotification(phoneNumber, message, job, done) 
{
  // Track progress of the job
  job.progress(0, 100)

  // If phoneNumber is blacklisted, fail the job
  if (blacklistedNumbers.includes(phoneNumber)) 
  {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`)
    done(error)
    // Track progress of the job
  } else {
    job.progress(50, 100) 

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`)
    done()
  }
}

// Create a queue with concurrency of 2
const queue = kue.createQueue({ concurrency: 2 })

// Queue process to handle jobs of push_notification_code_2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data
  sendNotification(phoneNumber, message, job, done)
})
