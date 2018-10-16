/*
    An RxJS Subject is a special type of Observable that allows values to be 
    multicasted to many Observers. While plain Observables are unicast 
    (each subscribed Observer owns an independent execution of the Observable),
    Subjects are multicast.

    A Subject is like an Observable, but can multicast to many Observers. 
    Subjects are like EventEmitters: they maintain a registry of many listeners.
 */

var subject = new Rx.Subject();


subject.subscribe((x) => {
    console.log(`Observable A : ${x}`)
})

subject.subscribe((x) => {
    console.info(`Observable B : ${x}`)
})

subject.next(1);
subject.next(2)

/*
    Since a Subject is an Observer, this also means you may provide 
    a Subject as the argument to the subscribe of any Observable, 
    like the example below shows:
*/

var subject = new Rx.Subject();


subject.subscribe((x) => {
    console.log(`Observable A : ${x}`)
})

subject.subscribe((x) => {
    console.info(`Observable B : ${x}`)
})

var observable = Rx.Observable.from([1, 2, 3])
observable.subscribe(subject)