const cards = [
    {
      id: 1,
      name: "Samsung S21",
      image: "https://www.comeros.com.ar/wp-content/uploads/2022/12/Comeros-SAMSUNG-SM-G990UZADXAA-206303.jpg",
      price: 300000,
    },
    {
      id: 2,
      name: "Iphone 13",
      image: "https://http2.mlstatic.com/D_NQ_NP_654080-MLA47781882564_102021-O.jpg",
      price: 600000,
    },
    {
      id: 3,
      name: "Xiaomi Mi 11",
      image: "https://images.fravega.com/f1000/4f4174b60c137e34fc6e011c9a9e135e.jpg",
      price: 250000,
    },
    {
      id: 4,
      name: "OnePlus 9 Pro",
      image: "https://m.media-amazon.com/images/I/31rl15N5SwS._SL500_.jpg",
      price: 200000,
    },
    {
      id: 5,
      name: "Google Pixel 6",
      image: "https://http2.mlstatic.com/D_NQ_NP_721184-MLA50145146433_052022-O.jpg",
      price: 198000,
    },
    {
      id: 6,
      name: "Motorola edge 30",
      image: "https://armoto.vtexassets.com/arquivos/ids/163066-800-auto?v=638101338413870000&width=800&height=auto&aspect=true",
      price: 149999,
    },
  ];
  
  function renderCards(searchValue) {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";
  
    const filteredCards = cards.filter((card) => {
      const cardName = card.name.toLowerCase();
      const searchTerm = searchValue.toLowerCase();
      return cardName.includes(searchTerm);
    });
  
    filteredCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
  
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardElement.appendChild(cardImage);
  
      const cardName = document.createElement("h2");
      cardName.textContent = card.name;
      cardElement.appendChild(cardName);
  
      const cardPrice = document.createElement("h3");
      cardPrice.textContent = `$${card.price.toFixed(2)}`;
      cardElement.appendChild(cardPrice);
  
      const cardButton = document.createElement("button");
      cardButton.textContent = "Añadir al carrito";
      cardButton.addEventListener("click", () => {
        addToCart(card);
      });
      cardElement.appendChild(cardButton);
  
      cardsContainer.appendChild(cardElement);
    });
  }
  
  function addToCart(card) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existingItemIndex = cart.findIndex((item) => item.id === card.id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
    } else {
      cart.push({ id: card.id, name: card.name, price: card.price, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  
    const cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
  
  window.addEventListener("load", () => {
    renderCards("");
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const cartButton = document.querySelector(".cart-button");
    const cartQuantity = document.querySelector(".cart-quantity");
  
    cartQuantity.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  
    cartButton.addEventListener("click", () => {
      console.log(cart);
    });
  
    const searchVar = document.getElementById("searchvar");
    searchVar.addEventListener("keyup", (event) => {
      renderCards(event.target.value);
    });
  });