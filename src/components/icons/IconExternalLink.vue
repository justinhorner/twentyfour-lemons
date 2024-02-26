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
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :color="color" class="ionicon" viewBox="0 0 512 512"><path d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="36"/></svg>
</template>