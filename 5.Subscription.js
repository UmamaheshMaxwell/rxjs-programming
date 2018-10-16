/**
    A Subscription is an object that represents a disposable resource, 
    usually the execution of an Observable. A Subscription has one 
    important method, unsubscribe, that takes no argument and just 
    disposes the resource held by the subscription. In previous 
    versions of RxJS, Subscription was called "Disposable".
 */

var observable = Rx.Observable.interval(1000);
var subscription = observable.subscribe((x) => { console.log(x) })
    // This cancels the ongoing Observable execution which
    // was started by calling subscribe with an Observer.

subscription.unsubscribe();

/*
    A Subscription essentially just has an unsubscribe() function to release 
    resources or cancel Observable executions.
 */

/*
   Subscriptions can also be put together, so that a call to an unsubscribe() 
   of one Subscription may unsubscribe multiple Subscriptions. You can do this
   by "adding" one subscription into another:
*/

var observable1 = Rx.Observable.interval(4000);
var observable2 = Rx.Observable.interval(3000);

var subscription1 = observable1.subscribe((x) => { console.log(x) })
var subscription2 = observable2.subscribe((y) => { console.log(y) })

subscription1.add(subscription2);

// Unsubscribes BOTH subscription and childSubscription
subscription1.unsubscribe();

/*
    Subscriptions also have a remove(otherSubscription) method, in order to 
    undo the addition of a child Subscription.
*/

subscription1.remove(subscription2)