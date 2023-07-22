<script setup lang="ts">

import { ref, reactive } from "vue";
import ListHeader from "@/components/list-header.vue";
import Modal from "@/components/modal.vue";
import ProductDetail from "./product-detail.vue";
import ProductList from "./product-list.vue";

type Product = {
  id: number;
  name: string;
  description: string;
};

const emptyProduct: Product = {
  id: 0,
  name: "",
  description: "",
};

const errorMessage = ref("");
const productToDelete = ref(emptyProduct);
const message = ref("");
const routePath = ref("/products");
const selected = ref(emptyProduct);
const showModal = ref(false);
const title = ref("Products");



async function created() {
    await getProducts();
  },

  computed: {
    ...mapGetters("products", { products: "products" }),
  },

    ...mapActions("products", [
      "getProductsAction",
      "deleteProductAction",
      "addProductAction",
      "updateProductAction",
    ]),

const askToDelete = (product: Product) => {
      productToDelete.value = product;
      showModal.value = true;
      if (productToDelete.value.name) {
        message.value = `Would you like to delete ${productToDelete.value.name}?`;
        console.log(message.value);
      }
    },

const clear = () => {
      selected.value = emptyProduct;
    };

const closeModal = () => {
      showModal.value = false;
    }

const deleteProduct = () => {
      closeModal();
      if (productToDelete && productToDelete.value.name) {
        console.log(
          `You said you want to delete ${productToDelete.value.name}`
        );
        deleteProductAction(productToDelete);
      }
      clear();
    };

const enableAddMode = () => {
    async getProducts() {
      try {
        await getProductsAction();
      } catch (error) {
        errorMessage.value = "Unauthorized";
      }
      clear();
    }
  };

const save = (product: Product) => {
      console.log("product changed", product);
      if (product.id) {
        updateProductAction(product);
      } else {
        addProductAction(product);
      }
    };

const select = (product: Product) => {
      selected.value = product;
    },
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getProducts"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="products">
        <ProductList
          v-if="!selected"
          :products="products"
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
