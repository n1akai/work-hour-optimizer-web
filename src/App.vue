<template>
  <div id="home">
    <streak-days></streak-days>
    <the-main></the-main>
  </div>
</template>
<script>
import StreakDays from './components/StreakDays.vue';
import TheMain from "./components/TheMain.vue";
export default {
  components: {
    StreakDays,
    TheMain
  },
  mounted() {
    this.$store.commit("applyLocalData");
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  --primary: #2196F3;
  --sucess: #009688;
  --danger: #F44336;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: #222222;
  font-family: 'Poppins', sans-serif;
}

ul {
  list-style: none;
}

a {
  color: unset;
  text-decoration: unset;
}

#home {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}

@media (min-width: 768px) {
  #home {
    flex-direction: row;
  }
}

svg {
  margin: 0 3px;
  color: var(--primary)
}
</style>