import { defineStore } from 'pinia';
import { getFoods } from '../indexedDB';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    foods: [],
  }),
  getters: {
    getFooods: (state) => state.foods,
  },
  actions: {
    //fetch products from indexedDB
    async fetchTodaysFoods(){
      const foods = await getFoods();
      this.foods = foods;
    },
  },
});
