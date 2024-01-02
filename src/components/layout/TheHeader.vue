<template>
  <div class="header">
    <div class="today">Today: {{ today }} {{ time }}</div>
    <div class="icons">
      <div class="light-dark">
        <light-dark-icon width="26px" height="26px"></light-dark-icon>
      </div>
      <div class="settings">
        <cog-icon width="26px" height="26px"></cog-icon>
      </div>
    </div>
  </div>
</template>
<script>
import LightDarkIcon from "../icons/LightDarkIcon.vue";
import CogIcon from "../icons/CogIcon.vue";
export default {
  data() {
    return {
      today: "",
      time: "",
    };
  },
  components: {
    LightDarkIcon,
    CogIcon
  },
  created() {
    this.getToday();
    this.getTime();
    setInterval(this.getTime, 1000);
  },
  methods: {
    getToday() {
      const date = new Date();
      const day = date.getDay();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.today = `${day}/${month}/${year}`;
    },
    getTime() {
      const date = new Date();
      const hour = String(date.getHours()).padStart(2, 0);
      const minute = String(date.getMinutes()).padStart(2, 0);
      const second = String(date.getSeconds()).padStart(2, 0);
      this.time = `${hour}:${minute}:${second}`;
    }
  }
};
</script>
<style scoped>
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.today {
  font-weight: bold;
}

.icons {
  display: flex;
}

.icons>div {
  margin: 0 5px;
  cursor: pointer;
}
</style>