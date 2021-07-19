const min = 2;
const max = 10_000_000; //new rule
const primes = [];

//Algorithm : Sieve of Eratosthenes
function generatePrimes(start, range){
    let isPrime = true;
    const end = start + range;
    for(let i = start; i< end; i++) {
        for(let j = min; j < Math.sqrt(end); j++) {
            if(i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);

/*
prime: 9.469s
664579
*/