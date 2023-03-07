import { defineStore } from "pinia";


export const useSettingsStore = defineStore("settingsStore", {
	persist: true,
	state: () => ({
		goal: 2000,
	}),
	getters: {
    getGoal: (state) => state.goal,
  },
	actions: {
		updateGoal(goal) {
			this.goal = goal;
		},
	},
});
