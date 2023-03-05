import { defineStore, createPinia  } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useSettingsStore = defineStore("settingsStore", {
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
  persist: true,
});
