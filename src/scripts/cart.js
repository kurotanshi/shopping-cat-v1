import CartItem from "./cart-item"

class Cart {
  constructor() {
    this.items = []
  }

  addItem(cat) {
    const foundItem = this.items.find((item) => item.id === cat.id)

    if (foundItem) {
      foundItem.increment()
    } else {
      const item = new CartItem(cat)
      this.items.push(item)
    }
  }

  get total() {
    return this.items.reduce((acc, item) => {
      return acc + item.total
    }, 0)
  }
}

export default Cart
