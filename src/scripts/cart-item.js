class CartItem {
  constructor({ id, name, price, quantity = 1 }) {
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
  }

  increment(n = 1) {
    this.quantity += n
  }

  get total() {
    return this.price * this.quantity
  }
}

export default CartItem
