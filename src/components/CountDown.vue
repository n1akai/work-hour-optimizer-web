<template>
  <div class="countdown-controls">
    <div class="countdown">
      <div class="main">
        {{ counterAsTime }}
      </div>
      <div class="break">
        {{ breakCounterAsTime }}
      </div>
    </div>
    <div class="controls">
      <button type="button" v-if="!isPlaying" @click="play"><play-icon width="20px"></play-icon></button>
      <button type="button" v-else @click="pause"><pause-icon width="20px"></pause-icon></button>
      <button type="button" @click="breakToggle"><break-icon width="20px"></break-icon> Break</button>
    </div>
  </div>
</template>
<script setup>
import PlayIcon from "./icons/PlayIcon.vue";
import BreakIcon from "./icons/BreakIcon.vue";
import PauseIcon from "./icons/PauseIcon.vue";
import { ref, computed, watch, onMounted } from "vue";
// Refs
const counter = ref(6000000);
const breakCounter = ref(150000);
const isPlaying = ref(false);
const intervalId = ref();
const isBreakTime = ref(false);

// onMounted

onMounted(() => {
  if (localStorage.getItem("settings")) {
    const settings = JSON.parse(localStorage.getItem("settings"));
    counter.value = settings.counter;
    breakCounter.value = settings.breakCounter;
  }
  const todayId = getTodayId();
  const allDays = JSON.parse(localStorage.getItem("data"));
  if (allDays) {
    const today = allDays[todayId];
    if (today) {
      counter.value = today.counter;
      breakCounter.value = today.breakCounter;
    } else {
      allDays[todayId] = {
        counter: counter.value,
        breakCounter: breakCounter.value,
        acheivedGoals: []
      };
      localStorage.setItem("data", JSON.stringify(allDays));
    }
  } else {
    const allDays = {};
    allDays[todayId] = {
      counter: counter.value,
      breakCounter: breakCounter.value,
      acheivedGoals: []
    };
    localStorage.setItem("data", JSON.stringify(allDays));
  }

});

// Computed
const counterAsTime = computed(() => {
  return timeFormater(counter.value);
});

const breakCounterAsTime = computed(() => {
  return timeFormater(breakCounter.value);
});

// Wachts
watch([counter, breakCounter], () => {
  saveInLocal();
});

// Functions
const play = () => {
  isPlaying.value = true;
  if (isBreakTime.value) {
    breakToggle();
  }
  countDownTimer(counter);
};

const pause = () => {
  isPlaying.value = false;
  clearInterval(intervalId.value);
};

const breakToggle = () => {
  isBreakTime.value = !isBreakTime.value;
  if (isBreakTime.value) {
    if (isPlaying.value) {
      pause();
    }
    countDownTimer(breakCounter);
  } else {
    clearInterval(intervalId.value);
  }

};

const countDownTimer = (ref) => {
  let startTime = new Date().getTime();
  intervalId.value = setInterval(() => {
    const spendedTime = new Date().getTime() - startTime;
    ref.value -= spendedTime;
    startTime += spendedTime;
  }, 500);
};

const saveInLocal = () => {
  const todayId = getTodayId();
  const allDays = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {};

  allDays[todayId].counter = counter.value;
  allDays[todayId].breakCounter = breakCounter.value;

  localStorage.setItem("data", JSON.stringify(allDays));
};

const timeFormater = (ms) => {
  const checkTime = (t) => t < 10 ? "0" + t : t;
  const d = new Date(ms);
  const h = checkTime(d.getHours());
  const m = checkTime(d.getMinutes());
  const s = checkTime(d.getSeconds());
  return `${h}:${m}:${s}`;
};

const getTodayId = () => {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};
</script>
<style scoped>
.countdown {
  padding: 40px;
  text-align: center;
  box-shadow: 0 0 4px rgb(0 0 0 / 20%);
  border-radius: 10px;
}

.main {
  font-size: 86px;
}

.break {
  font-size: 22px;
}

.main,
.break {
  font-family: 'Space Mono', monospace;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

button {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: unset;
  box-shadow: 0 0 4px rgb(0 0 0 / 50%);
  background-color: #fff;
  padding: 5px 7px;
  border-radius: 4px;
  margin: 0 10px;
  font-family: inherit;
}
</style>