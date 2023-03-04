import { defineStore } from 'pinia';
import axios from 'axios';
import { getFoods } from '../indexedDB';

const query = 'https://world.openfoodfacts.org/api/v0/product/'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    foods: [],
    product: {},
    barcode: '',
  }),
  getters: {
    getProduct: (state) => state.product,
    getFooods: (state) => state.foods,
  },
  actions: {
    async fetchProduct(){
      const response = await axios.get(`${query}${this.barcode}.json`);
      console.log(response);
      this.product = response.data;
    },
    //fetch products from indexedDB
    async fetchTodaysFoods(){
      const foods = await getFoods();
      this.foods = foods;
    }
  },
});
