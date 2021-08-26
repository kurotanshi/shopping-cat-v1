<template>
  <div class="row items">
    <div class="col-sm-2" v-for="c in cats" :key="c">
      <div class="card" data-product-id="624946E">
        <img :src="`/images/${c.photo}`" class="card-img-top" :alt="c.name" />
        <div class="card-body">
          <h5 class="title card-title fw-light fs-6">{{ c.name }}</h5>
          <p class="price">${{ c.price }}</p>
          <button class="btn btn-sm btn-warning fw-light" @click="addToCart(c)">
            <i class="fas fa-cat"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed } from "vue";

  export default {
    setup(props, context) {
      const cats = ref([]);

      const addToCart = (item) => {
        context.emit("add", item);
      };

      fetch("/cat.json")
        .then((res) => res.json())
        .then((data) => {
          cats.value = data;
        });

      return {
        cats,
        addToCart,
      };
    },
  };
</script>
