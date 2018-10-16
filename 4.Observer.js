/**
    An Observer is a consumer of values delivered by an Observable. Observers are 
    simply a set of callbacks, one for each type of notification delivered by 
    the Observable: next, error, and complete. 
 */

var observer = {
    next: x => console.info(`Observer got a next value ${x}`),
    error: err => console.info(`Observer got an error ${err}`),
    complete: () => console.info(`observer got a complete notification`)
}

/*
    Observers are just objects with three callbacks, one for each type of 
    notification that an Observable may deliver.
*/

/**
    Observers in RxJS may also be partial. If you don't provide one of the 
    callbacks, the execution of the Observable will still happen normally, 
    except some types of notifications will be ignored, because they don't 
    have a corresponding callback in the Observer.
 */

var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
};