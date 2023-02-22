import { defineStore } from 'pinia';
import axios from 'axios';

const query = 'https://world.openfoodfacts.org/api/v0/product/'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    product: {},
    barcode: '',
  }),
  getters: {
    getProduct: (state) => state.product,
  },
  actions: {
    addProduct(product) {
      const productData = {
        barcode: this.product.barcode,
        name: productD 
      }
      this.products.push(product);
    },
    async fetchProduct(){
      const response = await axios.get(query + this.barcode + '.json');
      console.log(response);
      this.product = response.data;
    }
  },
});
