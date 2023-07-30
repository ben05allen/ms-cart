<script setup lang="ts">
import { ref } from "vue";
import { useProductsStore } from "@/stores/products";
import ListHeader from "@/components/list-header.vue";
import Modal from "@/components/modal.vue";
import ProductDetail from "./product-detail.vue";
import ProductList from "./product-list.vue";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

const productsStore = useProductsStore();

let errorMessage = "";
let message = "";
let routePath = "/products";
const selected = ref<Product | null>(null);
const productToDelete = ref<Product | null>(null);
const showModal = ref(false);
let title = "Products";

const askToDelete = (product: Product) => {
  productToDelete.value = product;
  showModal.value = true;
  if (productToDelete.value.name) {
    message = `Would you like to delete ${productToDelete.value.name}?`;
    console.log(message);
  }
};

const clear = () => {
  selected.value = null;
};

const closeModal = () => {
  showModal.value = false;
};

const deleteProduct = () => {
  closeModal();
  if (productToDelete.value && productToDelete.value.name) {
    console.log(`You said you want to delete ${productToDelete.value.name}`);
    productsStore.deleteProduct(productToDelete.value);
  }
  clear();
};

const enableAddMode = () => {
  try {
    productsStore.getProducts();
  } catch (error) {
    errorMessage = "Unauthorized";
  }
  clear();
};

const save = (product: Product) => {
  console.log("product changed", product);
  if (product.id) {
    productsStore.updateProduct(product);
  } else {
    productsStore.addProduct(product);
  }
};

const select = (product: Product) => {
  selected.value = product;
};
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="productsStore.getProducts"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="productsStore.products">
        <ProductList
          v-if="!selected"
          :products="productsStore.products"
          :errorMessage="errorMessage"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></ProductList>
        <ProductDetail
          v-if="selected"
          :product="selected"
          @unselect="clear"
          @save="save"
        ></ProductDetail>
      </div>
    </div>

    <Modal
      class="modal-product"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteProduct"
    ></Modal>
  </div>
</template>
