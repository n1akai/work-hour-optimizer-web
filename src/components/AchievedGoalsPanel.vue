<template>
  <base-panel>
    <template #head><target-icon width="20px" /> Achieved Goals</template>
    <template #default>
      <div class="input-wrapper">
        <input type="text" placeholder="What I've achieved..." v-model="goal">
        <button type="button" @click="addGoal" :disabled="isBtnDisabled">Add</button>
      </div>
      <TransitionGroup name="list" tag="ul">
        <li v-for="(goal, index) in acheivedGoals" :key="index"><check-icon fill="#fff" width="22px" /> {{
          goal }}
          <close-icon fill="#fff" width="22px" @click="removeGoal(index)" />
        </li>
      </TransitionGroup>
    </template>
  </base-panel>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import BasePanel from './UI/BasePanel.vue';
import TargetIcon from './icons/TargetIcon.vue';
import CheckIcon from './icons/CheckIcon.vue';
import CloseIcon from './icons/CloseIcon.vue';

// Refs
const goal = ref("");
const acheivedGoals = ref([]);
const isBtnDisabled = ref(true);

// onMounted
onMounted(() => {
  getGoalsFromLocalStorage();
});

// Wachts
watch(goal, (n) => {
  if (n.length == 0) {
    isBtnDisabled.value = true;
  } else {
    isBtnDisabled.value = false;
  }
});

// Functions
const addGoal = () => {
  acheivedGoals.value.push(goal.value);
  saveInLocal();
};

const removeGoal = (index) => {
  acheivedGoals.value.splice(index, 1);
  saveInLocal();
};

const getGoalsFromLocalStorage = () => {
  const todayID = getTodayId();
  acheivedGoals.value = JSON.parse(localStorage.getItem("data"))[todayID].acheivedGoals;
};

const saveInLocal = () => {
  const todayID = getTodayId();
  const allDays = JSON.parse(localStorage.getItem("data"));
  allDays[todayID].acheivedGoals = acheivedGoals.value;
  localStorage.setItem("data", JSON.stringify(allDays));
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
button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.input-wrapper {
  box-shadow: 0 1px 1px rgb(0 0 0 / 20%);
  padding: 20px;
}

.input-wrapper input {
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #ddd;
  outline-color: var(--primary);
  font-family: inherit;
}

.input-wrapper span {
  font-size: 12px;
  color: rgb(0 0 0 / 50%);
  padding-left: 5px;
}

ul {
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
}

ul li {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--sucess);
  color: #fff;
  border-radius: 999px;
  margin: 5px 0;
}

.list-enter-from {
  animation: append-animation .3s;
}

.list-leave-to {
  animation: remove-animation .3s forwards;
}

@keyframes append-animation {
  from {
    transform: translate(100%);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes remove-animation {
  from {
    opacity: 1;
  }

  to {
    background-color: var(--danger);
    opacity: 0;
  }
}

ul li svg:last-child {
  display: block;
  margin-left: auto;
  cursor: pointer;
}

button {
  cursor: pointer;
  border: unset;
  box-shadow: 0 0 4px rgb(0 0 0 / 50%);
  background-color: var(--primary);
  border-radius: 4px;
  padding: 4px 20px;
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 5px;
  color: #fff;
  font-family: inherit;
}

.no-goals {
  padding: 16px;
}
</style>