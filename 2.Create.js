/*
    The following is an Observable that pushes the values 1, 2, 3 
    immediately (synchronously) when subscribed, and the value 4 
    after one second has passed since the subscribe call, then 
    completes.
*/

var observable = Rx.Observable
    .create((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        setTimeout(() => {
            observer.next(4);
            observer.complete();
        })
    })
console.log('Just before subscribe !!')
observable.subscribe({
    next: (x) => console.log(`Got the value ${x}`),
    error: (err) => console.log(`Something went wrong ${err}`),
    complete: () => console.log(`Done`)
})
console.log('Just after subscribe !!')

/*
    Observables are like functions with zero arguments, but generalize 
    those to allow multiple values.
*/
console.info('%cUsing functions', 'color:coral')

function sample() {
    console.log('Hello')
    return 42;
}

const x = sample.call();
console.log(x)
const y = sample.call();
console.log(y)

console.info('%c************', 'color:blue')
console.info('%cUsing RxJS', 'color:blue')
const foo = Rx.Observable
    .create((observer) => {
        console.log('Hello')
        observer.next(42);
    });

foo.subscribe((x) => {
    console.log(x)
})

foo.subscribe((y) => {
    console.log(y)
})

console.log('before function call');
console.log(sample.call());
console.log('after function call');

console.log('before subscription');
foo.subscribe((x) => {
    console.log(x)
})
console.log('after subscription')

/*
    What is the difference between an Observable and a function? 
    Observables can "return" multiple values over time, something 
    which functions cannot.
*/

function test() {
    console.log('Hello');
    return 42;
    return 100; // This will never happen
}

console.log(test.call());

const multiReturns = Rx.Observable
    .create((observer) => {
        console.log('I will return multiple values')
        observer.next(42)
        observer.next(75)
        observer.next(100)
    })

multiReturns.subscribe((value) => {
    console.log(value)
})

/*
func.call()             - means "give me one value synchronously"
observable.subscribe()  - means "give me any amount of values, either 
                          synchronously or asynchronously"
*/