var openShopping = document.querySelector(".shopping");
var closeShopping = document.querySelector(".closeShopping");
var list = document.querySelector(".list");
var listCard = document.querySelector(".listCard");
var body = document.querySelector("body");
var total = document.querySelector(".total");
var quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

var products = [
  {
    id: 1,
    name: "CƠM NHẬT BẢN",
    image: "1.PNG",
    price: 120000,
  },
  {
    id: 2,
    name: "GÀ TÂY THỔ NHĨ KỲ",
    image: "2.PNG",
    price: 300000,
  },
  {
    id: 3,
    name: "SALAH CÁ NGỪ",
    image: "3.PNG",
    price: 220000,
  },
  {
    id: 4,
    name: "SÚP BÍ NHẬT BẢN",
    image: "4.PNG",
    price: 99000,
  },
  {
    id: 5,
    name: "SALAH MIX",
    image: "5.PNG",
    price: 69000,
  },
  {
    id: 6,
    name: "PIZZA Ý",
    image: "6.PNG",
    price: 250000,
  },
];

var listCards = [];

function initApp() {
  products.forEach((value, key) => {
    var newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  var count = 0;
  var totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      var newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
