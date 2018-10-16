/********************** Register an event **********************/
// Normally you register event listeners.
var button = document.querySelector("button")
button.addEventListener("click", () => {
    console.log('Clicked via event listener !!!')
})

//  Using RxJS you create an observable instead.
var button = document.querySelector("button")
Rx.Observable
    .fromEvent(button, 'click')
    .subscribe((() => console.log('Clicked via Rxjs!!')))

/********************** Display count ****************************/
// Display Count
var count1 = 0;
var button = document.querySelector('button')
button.addEventListener('click', () => {
    console.log(`Clicked ${++count1} times`)
})

// Display Count using RxJS

var button = document.querySelector("button");
Rx.Observable
    .fromEvent(button, 'click')
    .scan(count2 => count2 + 1, 0)
    .subscribe((count2) => console.log(`Clicked ${count2} times`))

/********************** Allow one click ***************************/
// Allow at most one click per second, with plain JavaScript:
var count3 = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var button = document.querySelector('button');
button.addEventListener('click', () => {
    if (Date.now() - lastClick >= rate) {
        console.log(`Clicked ${++count3} times`)
        lastClick = Date.now();
    }
})

// Allow at most one click per second, with Rxjs

var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .scan(count4 => count4 + 1, 0)
    .subscribe(count4 => console.log(`Clicked ${count4} times`));

const result = Rx.Observable
    .of(1, 2, 3)
    .scan((a, b) => a + b, 0)
    .subscribe((val) => console.log(val))