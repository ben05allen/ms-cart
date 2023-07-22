<script setup lang="ts">
import ButtonFooter from "@/components/button-footer.vue";
import CardContent from "@/components/card-content.vue";

type Product = {
  id: number;
  name: string;
  description: string;
  quantity: number;
};

const props = defineProps({
  products: {
    type: Array<Product>,
    default: () => [],
  },
  errorMessage: {
    type: String,
    default: () => "",
  },
});

const emits = defineEmits(["deleted", "selected"]);

const deleteProduct = (product: Product) => {
  console.log(`You tried to delete ${product.name}`);
  emits("deleted", product);
};

const selectProduct = (product: Product) => {
  console.log(`You tried to select ${product.name}`);
  emits("selected", product);
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!products.length && !errorMessage">Loading data ...</div>
    <ul class="list">
      <li
        v-for="(product, index) in products"
        :key="product.id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :name="product.name"
            :description="product.description"
          />
          <footer class="card-footer">
            <ButtonFooter
              class="delete-item"
              iconClasses="fas fa-trash"
              @clicked="deleteProduct"
              label="Delete"
              :dataIndex="index"
              :dataId="product.id"
              :item="product"
            />
            <ButtonFooter
              class="edit-item"
              iconClasses="fas fa-edit"
              @clicked="selectProduct"
              label="Edit"
              :dataIndex="index"
              :dataId="product.id"
              :item="product"
            />
          </footer>
        </div>
      </li>
    </ul>
  </div>
</template>
