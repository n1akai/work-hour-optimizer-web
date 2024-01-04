<template>
  <base-panel>
    <template #head><chart-bar-icon width="18px" /> Stats</template>
    <template #default>
      <ul>
        <li><span>Total Streak Days</span>: {{ streakDays }}</li>
        <li><span>Total Hours</span>: {{ totalHours }}</li>
        <li><span>Longest Session</span>: {{ longestSession }} Hours</li>
      </ul>
    </template>
  </base-panel>
</template>
<script setup>
import { ref } from "vue";
import BasePanel from './UI/BasePanel.vue';
import ChartBarIcon from './icons/ChartBarIcon.vue';
const streakDays = ref(0);
const totalHours = ref(0);
const longestSession = ref(0);
const allDays = JSON.parse(localStorage.getItem("data"));

const millsToHours = (m) => {
  return Math.floor(m / 1000 / 3600);
};
for (const day in allDays) {
  longestSession.value = -1;
  if (longestSession.value < allDays[day].totalTime) {
    longestSession.value = millsToHours(allDays[day].totalTime);
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