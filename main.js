let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // Still 3


function update() {
  A2 = A0 + A1
}

// what do we need?
// A way to update the state (A2) whenever A0 or A1 changes




// Let's define some terms:

// Effect (side effect):
// the function that modifies the state of the program


// Dependencies:
// states that their values are used to perform the effect
// the effect is a 'subscriber' to its dependencies


// So again, what do we need (using the defined terms)?
// A magic function that can invoke the effect (update)
// whenever dependencies (A0 or A1) change




whenDepsChange(update)

// whenDepsChange() function has the following tasks:

// 1. Track when a variable is read. E.g. when evaluating the expression A0 + A1, both A0 and A1 are read.

// 2. If a variable is read when there is a currently running effect, make that effect a subscriber to that variable. 
//    E.g. because A0 and A1 are read when update() is being executed, update() becomes a subscriber to both A0 and A1 after the first call.

// 3. Detect when a variable is mutated. E.g. when A0 is assigned a new value, notify all its subscriber effects to re-run.


// ------------------------------------------



function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}


// This will be set right before an effect is about
// to be run. We'll deal with this later.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}

// Effect subscriptions are stored in a global WeakMap<target, Map<key, Set<effect>>> data structure


function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}


function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}


// real world Vue:
import { ref, watchEffect } from 'vue'

const B0 = ref(0)
const B1 = ref(1)
const B2 = ref()

watchEffect(() => {
  // tracks B0 and B1
  B2.value = B0.value + B1.value
})

// triggers the effect
B0.value = 2


// But we dont do this usually!
// The 'computed' way is much better :)

import { ref, computed } from 'vue'

const C0 = ref(0)
const C1 = ref(1)
const C2 = computed(() => C0.value + C1.value)

C0.value = 2

// Internally, computed manages its invalidation and re-computation using a reactive effect.



// A common and useful example of reactive effect? Yes! updating the DOM
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `Count is: ${count.value}`
})

// updates the DOM
count.value++
