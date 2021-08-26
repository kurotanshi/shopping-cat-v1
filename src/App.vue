<template>
  <main>
    <headerBlock />

    <section class="container mt-4">
      <!-- 六隻貓 -->
      <itemList :shoppingCart="shoppingCart" @add="addToCart" />
      <hr />

      <!-- 購物車 -->
      <shoppingCart
        :shoppingCart="shoppingCart"
        @remove="removeFromCart"
        @empty="emptyCart"
      />
    </section>
  </main>
</template>

<script>
  import { ref } from "vue";

  import headerBlock from "./components/header.vue";
  import itemList from "./components/itemList.vue";
  import shoppingCart from "./components/shoppingCart.vue";

  export default {
    components: {
      headerBlock,
      itemList,
      shoppingCart,
    },
    setup() {
      const shoppingCart = ref([]);

      const addToCart = (item) => {
        // 代表購物車內有一樣的商品
        const targetItem = shoppingCart.value.filter((d) => d.id === item.id);

        if (targetItem.length > 0) {
          targetItem[0].qty++;
        } else {
          // 新增商品到購物車
          shoppingCart.value.push({
            ...item,
            qty: 1,
          });
        }
      };

      const removeFromCart = (item) => {
        shoppingCart.value = shoppingCart.value.filter((d) => d.id !== item.id);
      };

      const emptyCart = () => {
        shoppingCart.value.length = 0;
      };

      return {
        shoppingCart,
        addToCart,
        removeFromCart,
        emptyCart,
      };
    },
  };
</script>
