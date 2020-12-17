const keys = require("./keys")
const redis = require("redis")

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
})

const sub = redisClient.duplicate();

function fib(index) {
	if(index < 2) return 1;
	return fib(index-1) + fib(index-2);
}

// redis에 새로운 value가 들어오면
sub.on('message',(channel, message) => {
    console.log("message : " + message)
	redisClient.hset('values',message, fib(parseInt(message)));
})

// redis에 새로운 값이 insert되면 위의 코드를 실행
sub.subscribe('insert')