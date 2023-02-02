const products = [
    {
      id:1,
      title: "Mackbook",
      image: "https://demo.opencart.com/image/cache/catalog/demo/macbook_1-200x200.jpg",
      description: "Intel Core 2 Duo processor Powered by an Intel Core 2 Duo processor at speeds up to 2.1.",
      price: 600
    },
    {
      id:2,
      title: "iphone",
      image: "https://demo.opencart.com/image/cache/catalog/demo/iphone_1-200x200.jpg",
      description: "iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a nam..",
      price: 123
    },
    {
      id:3,
      title: "apple cinema",
      image: "https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-200x200.jpg",
      description: "The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed sp",
      price: 110
    },
    {
      id:4,
      title: "Epson",
      image: "https://demo.opencart.com/image/cache/catalog/demo/canon_eos_5d_1-200x200.jpg",
      description: "Canon's press material for the EOS 5D states that it 'defines (a) new D-SLR category', while we'r",
      price: 98
    },
  ];
  

  const selectedProductIds =[]
  const productsElement = document.getElementById("products");
  
  const productsModified = products.map(function(product) {
          product.priceModified = product.price.toFixed(2);
          return product;
  })
  
  
  renderProductCards(productsModified)
  
  function renderProductCards(products) {
    let productCards = "";
    for (let i = 0; i < products.length; i++) {
      productCards = productCards + renderProductCard(products[i]);;
    }
    productsElement.innerHTML = productCards;
    captureFavoriteButtonClick();
  }
  
  function renderProductCard(product) {
    return `<div class="col-12 col-md-4 col-lg-3">
  <div class="card">
      <img src="${product.image}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <div>
        <strong><span class="material-icons-outlined">
        currency_rupee
        </span>${product.priceModified}</strong>
        </div>
        <div class="btn-group w-100" role="group" aria-label="Basic example">
          <button type="button" class="btn"><span class="material-icons-outlined">
              shopping_cart
              </span></button>
          <button type="button" class="btn btn-favorite" data-id=${product.id}><span class="material-icons-outlined">
              favorite_border
              </span></button>
          <button type="button" class="btn"><span class="material-icons-outlined">
              compare_arrows
              </span></button>
        </div>
      </div>
    </div>
  </div>`;
  }
  
  
  const search$ = document.getElementById("search");
search$.addEventListener("keyup", function(event) {
    const term = search$.value
    const termLowercase = term.toLowerCase();
    const productFiltered = productsModified.filter(function(product) {
        const titleLowerCased = product.title.toLowerCase();
        return titleLowerCased.indexOf(termLowercase)  != -1;
    });
    renderProductCards(productFiltered)
})

function captureFavoriteButtonClick() {
  const products$ =document.getElementById("products")
  const favoriteButton$ = document.querySelectorAll(".btn-favorite")
  favoriteButton$.forEach(function(btn$) {
    btn$.addEventListener("click", function(event) {
      const target =event.target
      const favoriteBtn$ =target.closest(".btn-favorite")
      const selectedId = favoriteBtn$.getAttribute("data-id")
      const selectedProductIndex = selectedProductIds.indexOf(selectedId)
      
      const icon$ = btn$.querySelector(".material-icons-outlined")
      if (selectedProductIndex != -1) { // products already selected 
          selectedProductIds.splice(selectedProductIndex,1)
          icon$.innerText = "favorite_border"
      } else {
        //product is not selected
        selectedProductIds.push(selectedId)
        icon$.innerText = "favorite"
        
      }
      console.log(selectedProductIds)
      const wishlistCounter$ = document.getElementById("wishlistCounter");
      wishlistCounter$.innerText = selectedProductIds.length;
     
      
    })
  })
}