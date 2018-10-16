/**
    Anatomy of an Observable

    1.Creating Observables
    2.Subscribing to Observables
    3.Executing the Observable
    4.Disposing Observables
 */

/******************************  Creating Observables ******************************
    Observables can be created with create, but usually we use the 
    so-called creation operators, like of, from, interval, etc.

    Rx.Observable.create is an alias for the Observable constructor, 
    and it takes one argument: the subscribe function.
*/
var observable = Rx.Observable
    .create(function subscribe(observer) {
        var id = setInterval(() => {
            observer.next('hi')
        }, 1000)
    })

/******************************  Subscribing to Observables ******************************

    Subscribing to an Observable is like calling a function, providing 
    callbacks where the data will be delivered to.
 */

observable.subscribe((value) => {
    console.log(value)
})

/******************************  Executing Observables ***********************************

    The code inside Observable.create(function subscribe(observer) {...}) 
    represents an "Observable execution", a lazy computation that only 
    happens for each Observer that subscribes. The execution produces 
    multiple values over time, either synchronously or asynchronously.

    There are three types of values an Observable Execution can deliver:

    "Next" notification: sends a value such as a Number, a String, an Object, etc.
    "Error" notification: sends a JavaScript Error or exception.
    "Complete" notification: does not send a value.
    
    Next notifications are the most important and most common type: they 
    represent actual data being delivered to an Observer. Error and Complete 
    notifications may happen only once during the Observable Execution, 
    and there can only be either one of them.
    
 */

// The following is an example of an Observable execution that delivers 
// three Next notifications, then completes:

var observable = Rx.Observable
    .create(function subscribe(observer) {
        observer.next(1)
        observer.next(2)
        observer.next(3)
        observer.complete()
    })

// Observables strictly adhere to the Observable Contract, so the following 
// code would not deliver the Next notification 4:

var observable = Rx.Observable.create(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    observer.next(4); // Is not delivered because it would violate the contract
});

// It is a good idea to wrap any code in subscribe with try/catch block that will 
// deliver an Error notification if it catches an exception:

var observable = Rx.Observable.create(function subscribe(observer) {
    try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    } catch (err) {
        observer.error(err); // delivers an error if it caught one
    }
});

/*************************  Disposing Observable Executions ***************************
    Because Observable Executions may be infinite, and it's common for 
    an Observer to want to abort execution in finite time, we need an 
    API for canceling an execution. Since each execution is exclusive 
    to one Observer only, once the Observer is done receiving values, 
    it has to have a way to stop the execution, in order to avoid
    wasting computation power or memory resources.

    When observable.subscribe is called, the Observer gets attached to 
    the newly created Observable execution. This call also returns an 
    object, the Subscription:
 */

var subscription = observable.subscribe(x => console.log(x));

/**
    The Subscription represents the ongoing execution, and has a minimal 
    API which allows you to cancel that execution. Read more about the 
    Subscription type here. With subscription.unsubscribe() you can cancel 
    the ongoing execution:
 */

var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();

/*
    When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call unsubscribe() to cancel the execution.


*/