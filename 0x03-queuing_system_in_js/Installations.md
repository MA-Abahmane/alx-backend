# Download Redis 6.0.10
```bash
$ wget http://download.redis.io/releases/redis-6.0.10.tar.gz

# Extract the downloaded archive
$ tar xzf redis-6.0.10.tar.gz
```

# Navigate into the Redis directory
```bash
$ cd redis-6.0.10

# Compile Redis
$ make
```

# Start Redis in the background
```bash
$ src/redis-server &

# Verify that the server is working
$ src/redis-cli ping
PONG
```
# Use the Redis client to set a key-value pair
```bash
$ src/redis-cli set Holberton School
OK
```

# Verify the value is set correctly
```bash
$ src/redis-cli get Holberton
"School"

# Find the process ID (PID) of the running Redis server
$ ps aux | grep redis-server
```

# Kill the Redis server using its PID
```bash
$ kill [PID_OF_Redis_Server]

# Copy the dump.rdb from the redis-6.0.10 directory to the Queuing project root
$ cp redis-6.0.10/dump.rdb /path/to/queuing-project-root/
```

# Verify the value is still present after server restart (optional)
```bash
$ src/redis-server &
$ src/redis-cli get Holberton
"School"
```