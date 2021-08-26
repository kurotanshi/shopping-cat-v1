<template>
  <section class="cart">
    <h2>購物車</h2>
    <table class="table cart-item-table">
      <thead>
        <tr>
          <th scope="col">項目</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
          <th scope="col">小計</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in shoppingCart" :key="cart">
          <td>{{ cart.name }}</td>
          <td><input type="number" class="quantity" v-model="cart.qty" /></td>
          <td>${{ cart.price }}</td>
          <td>${{ cart.price * cart.qty }}</td>
          <td>
            <button
              @click="removeFromCart(cart)"
              class="remove-item-btn btn btn-danger btn-sm"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2"></td>
          <td>總價</td>
          <td>
            <span class="total-price">${{ totalPrice }}</span>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>

    <button @click="emptyCart" class="btn btn-lg btn-success empty-cart">
      <i class="fas fa-baby-carriage"></i> 清空購物車
    </button>
  </section>
</template>

<script>
  import { computed } from "vue";

  export default {
    props: {
      shoppingCart: Array,
    },
    setup(props, context) {
      const shoppingCart = computed(() => {
        return props.shoppingCart;
      });

      const removeFromCart = (item) => {
        //shoppingCart.value = shoppingCart.value.filter((d) => d.id !== item.id);
        context.emit("remove", item);
      };

      const emptyCart = () => {
        //shoppingCart.value.length = 0;
        context.emit("empty");
      };

      const totalPrice = computed(() => {
        return shoppingCart.value.reduce((sum, item) => {
          return Math.floor((sum + item.qty * item.price) * 100) / 100;
        }, 0);
      });

      return {
        removeFromCart,
        emptyCart,
        totalPrice,
      };
    },
  };
</script>
