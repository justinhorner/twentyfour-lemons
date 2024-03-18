<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    color: {
        type: String,
        default: '#63E6BE'
    }
  }
}
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :color="color" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M256 96V56M256 456v-40"/><path d="M256 112a144 144 0 10144 144 144 144 0 00-144-144z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M416 256h40M56 256h40"/></svg>
</template>