<template>
  <div class="panel">
    <div class="head">
      <slot name="head"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="fotter">
      <slot name="footter"></slot>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.panel {
  background-color: #fff;
  box-shadow: 0 0 1px rgb(0 0 0 / 50%);
  border-radius: 4px;
}

.head {
  padding: 20px 10px;
  background-color: #ddd;
  box-shadow: 0 1px 1px rgb(0 0 0 / 30%);
  display: flex;
  align-items: center;
}
</style>