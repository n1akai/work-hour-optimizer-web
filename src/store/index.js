import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      leftTime: 6 * 3600,
      break: 15 * 60,
      acheivedGoals: [],
      isPlaying: false,
      isBreakTime: false,
    };
  },
  getters: {
    getIsPlaying(state) {
      return state.isPlaying;
    },
    getLeftTime(state) {
      return state.leftTime;
    },
    getBreak(state) {
      return state.break;
    },
    getIsBreakTime(state) {
      return state.isBreakTime;
    },
    getAcheivedGoals(state) {
      return state.acheivedGoals;
    },
  },
  mutations: {
    changeLeftTime(state, payload) {
      state.leftTime = payload.newLeftTime;
    },
    changePlayingState(state, payload) {
      state.isPlaying = payload.state;
    },
    applyLocalData(state) {
      const d = new Date();
      const data = JSON.parse(localStorage.getItem("data"));
      if (data) {
        const todaysWork = data.find(
          (el) =>
            el.id === `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        );

        if (todaysWork) {
          state.leftTime = todaysWork.leftTime;
          state.break = todaysWork.breakTime;
          state.acheivedGoals = todaysWork.acheivedGoals;
        }
      }
    },
    saveInLocal(state) {
      const d = new Date();
      const data = JSON.parse(localStorage.getItem("data")) || [];
      const todaysWorkIndex = data.findIndex(
        (el) =>
          el.id === `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
      );
      if (todaysWorkIndex >= 0) {
        if (state.leftTime === 0) {
          data[todaysWorkIndex].leftTime = 0;
          data[todaysWorkIndex].isDone = true;
        } else {
          data[todaysWorkIndex].leftTime = state.leftTime;
          data[todaysWorkIndex].breakTime = state.break;
          data[todaysWorkIndex].acheivedGoals = state.acheivedGoals;
        }
      } else {
        const currentCountDownInfo = {
          id: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
          isDone: false,
          leftTime: state.leftTime,
          breakTime: state.break,
          acheivedGoals: state.acheivedGoals,
        };
        data.push(currentCountDownInfo);
      }
      localStorage.setItem("data", JSON.stringify(data));
    },
    addGoal(state, payload) {
      state.acheivedGoals.push(payload.goal);
    },
    removeGoal(state, payload) {
      state.acheivedGoals.splice(payload.goalIndex, 1);
    },
  },
});

export default store;
