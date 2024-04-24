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
    // const discountBtn = document.querySelector(".discount-btn")
    const stockDown = document.querySelector(".stock-down")
    const stockUp = document.querySelector(".stock-up")
    const addToBasket = document.querySelector(".addToBasket")


    // discountBtn.addEventListener("click", applyDiscount)
    stockDown.addEventListener("click", productReduce)
    stockUp.addEventListener("click", productIncrease)
    addToBasket.addEventListener("click", addedToCart)
}

function addedToCart() {

}

async function productIncrease() {
    const item = await getProduct()
    const itemPrice = item.price

    const updatedStock = document.querySelector(".updatedstock")
    const discountBtn = document.querySelector(".discount-btn").textContent
    const beforePrice = document.querySelector(".beforePrice")
    const afterPrice = document.querySelector(".afterPrice")

    const newStock = parseInt(updatedStock.textContent) + 1

    beforePrice.textContent = `${(itemPrice * newStock)}`

    const priceDiscount = ((100 - discountBtn) / 100) * beforePrice.textContent

    updatedStock.textContent = `${newStock}`

    afterPrice.innerHTML = `${parseInt(priceDiscount)}`


    beforePrice.classList.add("crossOut")
}


async function productReduce() {
    const item = await getProduct()
    const itemPrice = item.price
    console.log(itemPrice);


    const updatedStock = document.querySelector(".updatedstock")
    const beforePrice = document.querySelector(".beforePrice")
    const afterPrice = document.querySelector(".afterPrice")
    console.log(afterPrice.textContent);
    const discountBtn = document.querySelector(".discount-btn").textContent

    const priceDiscount = ((100 - discountBtn) / 100)
    console.log(priceDiscount);


    const newStock = parseInt(updatedStock.textContent) - 1


    if (updatedStock.textContent >= 1) {
        updatedStock.textContent = `${newStock}`
        beforePrice.textContent = `${(beforePrice.textContent - itemPrice)}`
        afterPrice.innerHTML = `${afterPrice.textContent - itemPrice}`

    }
    if (newStock === 0) {
        updatedStock.textContent = `${newStock}`
        beforePrice.textContent = `${itemPrice}`;
        afterPrice.textContent = `${Math.floor(((100 - discountBtn) / 100) * itemPrice)}`;
    }




}



// function applyDiscount() {



//     beforePrice.classList.add("crossOut")
//     if (updatedStock === 1 || updatedStock > 1) {

//         afterPrice.innerHTML = `
//                             ${Math.floor(priceDiscount * updatedStock)}
//                           `
//         beforePrice.innerHTML = `${beforePrice.textContent * updatedStock}`
//     } else {
//         afterPrice.innerHTML = `
//         ${Math.floor(priceDiscount)}
//       `
//     }


// }

listProduct()