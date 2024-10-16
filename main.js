// Do you know about object getters and setters

const obj = {
  value: 1
}

console.log(obj.value) // 1

obj.value = 2

console.log(obj.value) // 2

function alaki() {
  console.log('alaki is called')
}

const obj2 = {
  _value: 1,
  get value() {
    console.log('getter is called')
    return this._value
  },
  set value(newValue) {
    console.log('setter is called')
    this._value = newValue
  }
}

obj2.value
obj2.value = 3







// Vue2
const count = ref(0);
// Log the count when it changes
effect(() => {
  console.log(`Count: ${count.value}`);
});
// Simulate button clicks
function increment() {
  count.value++;
}
function decrement() {
  count.value--;
}
function reset() {
  count.value = 0;
}
// Example usage
increment(); // Logs: Count: 1
increment(); // Logs: Count: 2
decrement(); // Logs: Count: 1
reset(); // Logs: Count: 0

function ref(initialValue) {
  const r = {
    get value() {
      track(r, 'value');
      return initialValue;
    },
    set value(newValue) {
      initialValue = newValue;
      trigger(r, 'value');
    },
  };
  return r;
}

let activeEffect;
const targetMap = new Map();
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }


  function effect(fn) {
    const effect = () => {
      activeEffect = effect;
      try {
        fn();
      } finally {
        activeEffect = null;
      }
    };
    effect();
    return effect;
  }
