<template>
  <main style="margin: 0 auto;font-size: 4rem; color: white;">
    <div>
      <span style="">{{ count }}</span>

      <div>
        <button style="font-size: 1.5rem;" @click="increase">+</button>
        <button style="font-size: 1.5rem; margin-left: 5px;" @click="decrease">-</button>
        <button style="font-size: 1.5rem; margin-left: 5px;" @click="reset">reset</button>
      </div>
    </div>

    <div style="margin-top: 5rem;">
      <div>
        <input style="font-size: 2rem;" type="text" v-model="user.name">
      </div>
      <div>
        <input style="font-size: 2rem;" type="text" v-model="user.age">
      </div>
      {{ user.name }} : {{ user.age }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef, shallowReactive } from 'vue'

const count = ref(1)

function increase () {
  count.value = count.value++
}

function decrease () {
  count.value = count.value--
}

function reset () {
  count.value = 1
}

const user = reactive({
  name: 'ali',
  age: 29,
  details: {
    state: 'Esfahan',
    city: 'Khomeini shahr',
    mobile: {
      brand: 'Nokia',
      model: 'N79',
      productionYear: 2010
    }
  }
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
