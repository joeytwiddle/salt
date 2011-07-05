# Flow
by Bemi Faison

version X.X (nextgen)
(7/4/11)

## NextGen Branch (EXPERIMENTAL)


## DESCRIPTION

Flow is a JavaScript framework that lets you define and execute related functions. Flow is designed to reduce code complexity, redundancy, and concurrency, for confident web development.

The NextGen branch is an extensible version of Flow, which will serve as a platform for rich customizations.

### Packages

The Flow platform, will support customization through modules called _packages_. The goal of this refactoring effort is to support the core API of the "master" branch, via an extendable framework.

#### Customization

Packages will allow you to customize the following:

* Parsing of the program object
  * Determine which keys are invalid
  * Determine which keys are components (of a state)
  * Determine how states are structured
* Override the value returned from instantiating a Flow _(Redacted)_
* Customize the Flow instance
* Respond when Flow navigates a program
  * Before navigating
  * When navigation is halted
  * When navigation completes
* Respond when any state is traversed
* Provide methods to program functions

#### Data and Namespace Sandboxing (and Sharing)

Packages will obviate worries over namespace and object actions. Each will have it's own proxy to the flow instance and each program state. Additions and (most) edits to these objects, would only impact the instigating package. As well, every package may leverage another's, by way of accessing it's properties and methods.

## FILES

* flow-min.js - Flow framework and dependencies (minified with [UglifyJS](http://marijnhaverbeke.nl/uglifyjs) )
* src/ - Directory containing the source code
* src-test/ - Test suite
* LICENSE - The legal terms and conditions under which this software may be used
* README.md - This readme file

## INSTALLATION

**The "nextgen" branch is not recommended for use at this time.**

## USAGE

_Full documentation on the master branch is available in the [Flow wiki](http://github.com/bemson/Flow/wiki/)._

See `src/flow.pkgs.core.js` for an example of a working package.

### Defining Packages

The following demonstrates how to define a Flow package:

```js

// define a package (returns a package-definition-function)
var D = Flow.pkg('debug'); // `D` is a function

// specify which keys will become components (or attributes) of a state
D.dataKey = /^#/;

// specify which keys will be ignored during compilation
D.invalidKey = /\$/;


// add custom properties to each state
D.initState = function (state) {
  var pkg = this,
    arrayOfAllStates = pkg._Flow.states;
  state.customDebugProperty = "State #"state.index + " in " + arrayOfAllStates.length;
};

// add private/sandboxed properties to each Flow and it's states
D.init = function () {
  // init vars
  var pkg = this; // scope is a sandboxed clone of the true Flow instance
  // define properties with any label, except "flow" and "proxy" (these are reserved and will be overwritten)
  pkg.callsToApiMethods = 0;
  // add custom properties to each cloned state in this flow
  pkg.states.forEach(function (state) {
    state.randomId = Math.random();
  });
}
// prototype methods for package instances (created for each Flow instance)
D.prototype.incrementApiCallCount = function () {
  this.callsToApiMethods++;
}

// do something before any flow begins traversing it's program states
D.onStart = function () {
  var pkg = this, // alias the function scope
    flow, // the internal api for accessing the flow
    current = pkg.states[flow.currentIndex], // the current state - customized according to it's init method
    target = pkg.states[flow.targetIndex]; // the target state - customized according to it's init method
  console.log('Starting from "',current.name,'", and going to state "', target.name,'"');
};

// do something after a flow stops traversing it's program states
D.onStop = function () {
  var pkg = this, // alias the function scope
    flow, // the internal api for accessing the flow
    current = pkg.states[flow.currentIndex], // the current state - customized according to it's init method
    target = pkg.states[flow.targetIndex]; // the target state - customized according to it's init method
  console.log('Stopped at "',current.name,'", and ', (target ? 'done' : 'incomplete'));
};

// do something after a flow reaches it's target state in it's program
D.onFinish = function () {
  var pkg = this, // alias the function scope
    flow, // the internal api for accessing the flow
    current = pkg.states[flow.currentIndex]; // the current state - customized according to it's init method
  console.log('Reached the state "',current.name,'"');
};

// do something when states are traversed - as each flow navigates it's program
D.onTraverse = function (moveInt) {
  var pkg = this, // alias the function scope
    state = pkg.states[flow.currentIndex], // the current state (being traversed)
    msg = "Traversing ";
  switch (moveInt) {
    case 0:
      msg += "into";
    break;
    case 1:
      msg += "on";
    break;
    case 2:
      msg += "out of";
    break;
    case 3:
      msg += "over";
    break;
    case 4:
      msg += "backwards-over";
    break;
  }
  console.log(msg + " the " + state.name + "state, whose random id is: " + state.randomId);
}

// provide a method that the public flow proxy will contain
D.api.log = function () {
  // init vars
  var proxy = this, // scope is the public proxy, containing all api methods from every package
    pkg = D(proxy); // retrieve the package-instance (sandbox) associated with this flow
  // invoke methods prototyped to the package-instance
  pkg.incrementApiCallCount();
  console.log("The current state is ", pkg.states[pkg.flow.currentIndex].name, ", and the 'debug' API has been called ", pkg.callsToApiMethods, " times.");
};

// api methods can call other package's api methods
D.api.doOtherPackageMethod = function () {
  // init vars
  var proxy = this, // public flow proxy
    pkg = D(proxy); // corresponding package-sandbox
  // invoke methods prototyped to the package-instance
  pkg.incrementApiCallCount();
  // the scope can call other packages via the `pkgs` object
  proxy.pkgs.someOtherPkg.anApiMethod();
  // the package does the same, via it's reference to the flow proxy
  pkg.proxy.pkgs.someOtherPkg.anApiMethod();
};

```

### Accessing Package API Methods

Below demonstrates how a program function can access a package method.

```js
// create a new flow instance
var myFlow = new Flow();
// check to see if the debug package has defined API methods...
if (myFlow.pkgs.debug) {
  // make implied call to this method - a new package could override this method-name, via the prototype-chain
  flow.log();
  // make explicit call to the same method, by targeting it's package first
  flow.pkgs.debug.log();
}
```

## LICENSE

Flow is available under the terms of the [MIT-License](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright 2011, Bemi Faison
