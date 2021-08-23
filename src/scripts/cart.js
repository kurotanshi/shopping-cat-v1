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

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  updateQuantity(id, quantity) {
    const foundItem = this.items.find((item) => item.id === id)

    if (foundItem) {
      foundItem.setQuantity(quantity)
    }
  }

  get total() {
    let result = this.items.reduce((acc, item) => {
      return acc + item.total
    }, 0)

    return Math.floor(result * 100) / 100
  }
}

export default Cart
