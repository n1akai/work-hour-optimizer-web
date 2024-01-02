<template>
  <div class="main-counter">
    <the-header></the-header>
    <welcome-msg></welcome-msg>
    <div class="wrapper">
      <stats-panel></stats-panel>
      <count-down></count-down>
      <achieved-goals-panel></achieved-goals-panel>
    </div>
  </div>
</template>
<script>
import TheHeader from "./layout/TheHeader.vue";
import WelcomeMsg from "./WelcomeMsg.vue";
import CountDown from "./CountDown.vue";
import StatsPanel from "./StatsPanel.vue";
import AchievedGoalsPanel from "./AchievedGoalsPanel.vue";
export default {
  components: {
    TheHeader,
    WelcomeMsg,
    CountDown,
    StatsPanel,
    AchievedGoalsPanel
  }
}
</script>
<style scoped>
div.main-counter {
  flex-basis: 80%;
}

.wrapper {
  display: flex;
  align-items: flex-start;
}

.wrapper>div {
  flex-grow: 1;
  margin: 0 10px;
}
</style>