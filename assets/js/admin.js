const clickedid = JSON.parse(localStorage.getItem("clickedid"))
const hero = document.querySelector(".hero")
const dummyjson = "https://dummyjson.com";

// console.log(x);

async function getProduct() {
    const response = await fetch(`${dummyjson}/products/${clickedid}`)
    const items = await response.json()
    // console.log(items);
    return items
}

async function listProduct() {
    const item = await getProduct()
    console.log(item);
    hero.innerHTML = `
        
    <div class="hero-left">
        <img class="img-big" src="${item.images[0]}" alt="">

        <div class="hero-left-under">
            <img class="img-small" src="${item.images[1]}" alt="">
            <img class="img-small" src="${item.images[2]}" alt="">
            <img class="img-small" src="${item.images[3]}" alt="">
            <img class="img-small" src="${item.images[0]}" alt="">

        </div>
    </div>


    <div class="hero-right">
            <h4>${item.brand}</h4>
            <h1>${item.category}</h1>
            <p>${item.description}</p>
            <div class="hero-right-pricing">
                <div class="before-after-price">
                    <h3 class="afterPrice">${item.price}</h3>
                    <h6 class="beforePrice">${item.price}</h6>
                </div>
                <a href="#" class="discount-btn">${item.discountPercentage}</a>
            </div>

            <div class="hero-right-stock-addToCart">

                <div class="stock">
                    <a href="#" class="stock-down">-</a>
                    <h5 class="updatedstock">0</h5>
                    <a href="#" class="stock-up">+</a>
                </div>

                <div class="basket">
                    <a class="addToBasket"> <img src="assets/img/Shape (2).svg" alt="" > Add to cart</a>
                </div>
            </div>
    </div>
        
        `
    bindEvent()

}


function bindEvent() {
    const discountBtn = document.querySelector(".discount-btn")
    const stockDown = document.querySelector(".stock-down")
    const stockUp = document.querySelector(".stock-up")
    const addToBasket = document.querySelector(".addToBasket")


    discountBtn.addEventListener("click", applyDiscount)
    stockDown.addEventListener("click", productReduce)
    stockUp.addEventListener("click", productIncrease)
    addToBasket.addEventListener("click", addedToCart)
}

function addedToCart() {

}

function productIncrease() {
    const updatedStock = document.querySelector(".updatedstock")
    const discountBtn = document.querySelector(".discount-btn").textContent
    const beforePrice = document.querySelector(".beforePrice")
    const afterPrice = document.querySelector(".afterPrice")


    const priceDiscount = ((100 - discountBtn) / 100) * beforePrice.textContent
    const newStock = parseInt(updatedStock.textContent) + 1
    updatedStock.textContent = `${newStock}`
    beforePrice.textContent = `${(beforePrice.textContent * newStock)}`
    afterPrice.innerHTML = {}

}


function productReduce() {
    const updatedStock = document.querySelector(".updatedstock")
    const discountBtn = document.querySelector(".discount-btn").textContent
    const beforePrice = document.querySelector(".beforePrice")
    const afterPrice = document.querySelector(".afterPrice")
    const priceDiscount = ((100 - discountBtn) / 100) * beforePrice.textContent

    if (updatedStock.textContent > 0)
        updatedStock.textContent = parseInt(updatedStock.textContent) - 1
    console.log("skjdbgfd");
}



function applyDiscount() {



    beforePrice.classList.add("crossOut")
    if (updatedStock === 1 || updatedStock > 1) {

        afterPrice.innerHTML = `
                            ${Math.floor(priceDiscount * updatedStock)}
                          `
        beforePrice.innerHTML = `${beforePrice.textContent * updatedStock}`
    } else {
        afterPrice.innerHTML = `
        ${Math.floor(priceDiscount)}
      `
    }


}

listProduct()