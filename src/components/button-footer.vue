<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {},
  },
  className: {
    type: String,
    default: () => "",
  },
  label: {
    type: String,
    default: () => "",
  },
  dataIndex: {
    type: Number,
    default: () => null,
  },
  dataId: {
    type: Number,
  },
  iconClasses: {
    type: String,
    default: () => "",
  },
});

const emits = defineEmits(["clicked"]);

const handleClick = () => {
  emits("clicked", props.item);
};
</script>

<template>
  <button
    class="link card-footer-item"
    :class="props.className"
    :aria-label="props.label"
    tabindex="0"
    @click="handleClick"
    :data-index="props.dataIndex"
    :data-id="props.dataId"
  >
    <i :class="props.iconClasses"></i>
    <span>{{ props.label }}</span>
  </button>
</template>
