<template>
  <base-panel>
    <template #head><chart-bar-icon width="18px" /> Stats</template>
    <template #default>
      <ul>
        <li><span>Total Streak Days</span>: 1</li>
        <li><span>Total Hours</span>: 100</li>
        <li><span>Longest Session</span>: 9 Hours</li>
      </ul>
    </template>
  </base-panel>
</template>
<script>
import BasePanel from './UI/BasePanel.vue';
import ChartBarIcon from './icons/ChartBarIcon.vue';
export default {
  components: {
    BasePanel,
    ChartBarIcon
  }
}
</script>
<style scoped>
ul {
  padding: 16px;
}

ul li {
  padding: 10px 20px;
  background-color: var(--primary);
  color: #fff;
  border-radius: 999px;
  margin: 10px 0;
}

ul li span {
  font-weight: bold;
}
</style>