let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

// Product divs
const products = document.querySelectorAll(".product");

// Vegetables array
let vegetables = [
  // Initial veggies
];

// Add click listener to products
products.forEach((product) => {
  product.addEventListener("click", addVeggie);
});

function addVeggie() {
  // Get data from product div
  const name = this.querySelector("h6").textContent;
  const image = this.querySelector("img").src;
  const rating = this.querySelector(".product-rating");
  const salePriceElement = rating.querySelector("h6");

  // Get text content
  const textContent = salePriceElement.textContent;

  // Split and get sale price
  // Regex to match both prices
  const regex = /\$(\d+\.\d+)\$(\d+\.\d+)/;

  const matches = textContent.match(regex);

  // Get prices from match groups
  const originalPrice = matches[1];
  const salePrice = matches[2];

  console.log(originalPrice); // "20.00"
  console.log(salePrice); // "13.00"// "sale price here"
  // Create new veggie object
  const newVeggie = {
    name: name,
    quantity: 1,
    image: image,
    salePrice: salePrice,
  };

  // Generate card
  const card = generateCard(newVeggie);

  // Add to DOM
  list.appendChild(card);

  // Add to veggies array
  vegetables.push(newVeggie);
}

// Rest of generateCard function and forEach loop
// to initally load cards
// Get the ul element
const list = document.querySelector(".listCard");

// Create a function to generate veggies cards
function generateCard(veggie) {
  const li = document.createElement("li");

  // Card contents
  li.innerHTML = `
    <div><img src="${veggie.image}" alt=""/></div>
    <div><p>${veggie.name}</p></div>
    <div><p id="veggie-price">$${veggie.salePrice || 0}</p></div>
    <div>
        <button class="decrease">-</button>
        <div class="count"><p>Quantity: ${veggie.quantity}</p></div>
        <button class="increase">+</button>
    </div>
  `;
  //Update the number of items in the cart
  quantity.innerHTML = "Cart(" + Number(vegetables.length + 1) + ")";
  // Attach event listeners
  const decreaseBtn = li.querySelector(".decrease");
  const increaseBtn = li.querySelector(".increase");

  decreaseBtn.addEventListener("click", () => {
    veggie.quantity--;

    if (veggie.quantity === 0) {
      // Remove card if 0
      list.removeChild(li);
    } else {
      // Just update quantity
      li.querySelector(".count p").textContent = `Quantity: ${veggie.quantity}`;
      updateTotalPrice(li, veggie);
    }
  });

  increaseBtn.addEventListener("click", () => {
    veggie.quantity++;
    li.querySelector(".count p").textContent = `Quantity: ${veggie.quantity}`;
    updateTotalPrice(li, veggie);
  });
 
  return li;
}

// Update total price
function updateTotalPrice(li, veggie) {
  const price = li.querySelector("#veggie-price");
  price.textContent = `$${Number(veggie.quantity * veggie.salePrice).toFixed(
    2
  )}`;
}

// Generate cards
vegetables.forEach((veggie) => {
  // Check if name exists
  const exists = vegetables.some((v) => v.name === veggie.name);

  const card = generateCard(veggie);
  list.appendChild(card);
});
