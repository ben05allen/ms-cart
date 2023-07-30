import { ref } from "vue";
import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  function addProduct(newProduct: Product): void {
    products.value.push(newProduct);
  }

  function updateProduct(changedProduct: Product): void {
    const index = products.value.findIndex(
      (product) => product.id === changedProduct.id
    );
    products.value.splice(index, 1, changedProduct);
  }

  function getProducts(): Product[] {
    return products.value;
  }

  function deleteProduct(deleteProduct: Product): void {
    const index = products.value.findIndex(
      (product) => product.id === deleteProduct.id
    );
    products.value.splice(index, 1);
  }

  return { products, addProduct, updateProduct, getProducts, deleteProduct };
});
