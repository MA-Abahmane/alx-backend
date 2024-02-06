import kue from 'kue'
import { expect } from 'chai'

import createPushNotificationsJobs from './8-job'


describe('createPushNotificationsJobs', () => {
  let queue

  beforeEach(() => {
    queue = kue.createQueue()
    queue.testMode.enter()
  })

  afterEach(() => {
    queue.testMode.clear()
    queue.testMode.exit()
  })

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array')
  })

  it('should create two new jobs to the queue', () => {
    const jobs = [
        { phoneNumber: '123', message: 'Message 1' },
        { phoneNumber: '456', message: 'Message 2' }
      ];
  
      //createPushNotificationsJobs(jobs, queue);

  })
})
