import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"
// 實作寫在這裡！

import axios from "axios"
import Cart from "./cart"

const cart = new Cart()

function renderItems(items) {
  const cartList = document.querySelector("tbody")
  cartList.innerHTML = ""

  // items
  items.forEach((item) => {
    const t = createCartItem(item)
    cartList.insertAdjacentHTML("beforeend", t)
  })

  // total
  const totalEl = document.querySelector(".total-price")
  totalEl.innerHTML = "$" + cart.total
}

function addToCart(cat) {
  cart.addItem(cat)
  renderItems(cart.items)
}

function setCatCartEvent(cats) {
  const btns = document.querySelectorAll(".card .btn")
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      addToCart(cats[i])
    })
  })
}

function createCartItem(item) {
  const { id, name, price, quantity, total } = item

  const el = `<tr id="${id}">
      <td>${name}</td>
      <td><input type="number" class="quantity" value="${quantity}" /></td>
      <td>$${price}</td>
      <td>$${total}</td>
      <td>
        <button class="remove-item-btn btn btn-danger btn-sm">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>`
  return el
}

function createCatCard({ id, name, price, photo }) {
  const el = `<div class="col-sm-2">
            <div class="card" data-product-id="${id}">
              <img src="" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="title card-title fs-6 fw-light">${name}</h5>
                <p class="price">$${price}</p>
                <button class="btn btn-sm btn-warning fw-light">
                  <i class="fas fa-cat"></i>
                </button>
              </div>
            </div>
          </div>`
  return el
}

document.addEventListener("DOMContentLoaded", () => {
  // 抓 api
  const endPoint =
    "https://raw.githubusercontent.com/5xTraining/shopping-cat-v1/main/data/cats.json"

  const itemList = document.querySelector(".items")

  axios
    .get(endPoint)
    .then(({ data }) => {
      data.forEach((c) => {
        let cat = createCatCard(c)
        itemList.insertAdjacentHTML("beforeend", cat)
      })

      setCatCartEvent(data)
    })
    .catch((err) => {
      console.log(err)
    })
})
