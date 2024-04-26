const clickedid = JSON.parse(localStorage.getItem("clickedid"))
const dummyjson = "https://dummyjson.com";
const hero = qs(".hero");

let totalNumber = 0




function qs(selector) {
    const element = document.querySelector(selector)
    return element;

}


function bindEvents(selector, eventType, cbFunction) {
    const element = qs(selector)
    element.addEventListener(eventType, cbFunction)
    return element;

}


// tiklanan urune fetch atıldı

async function getProduct() {
    const response = await fetch(`${dummyjson}/products/${clickedid}`)
    const items = await response.json()
    // console.log(items);
    return items
}


// tiklanan urunun detayları listelendi

async function listProduct() {
    const item = await getProduct()
    console.log(item);
    hero.innerHTML = `
        
    <div data-id="${item.id}" class="hero-left">
        <img class="img-big" src="${item.images[0]}" alt="">

        <div class="hero-left-under">
            <img id="imgSmall" class="img-small" src="${item.images[1]}" alt="">
            <img class="img-small" src="${item.images[2]}" alt="">
            <img class="img-small" src="${item.images[3]}" alt="">
            <img class="img-small" src="${item.images[0]}" alt="">

        </div>
    </div>


    <div class="hero-right">
            <h4 class="brand">${item.brand}</h4>
            <h1 class="title">${item.title}</h1>
            <p>${item.description}</p>
            <div class="hero-right-pricing">
                <div class="before-after-price">
                    <h3 class="afterPrice">${item.price}</h3>
                    <h6 class="beforePrice">${item.price}</h6>
                </div>
                <a href="#" class="dscnt">${item.discountPercentage}</a>
            </div>

            <div class="hero-right-stock-addToCart">

                <div class="stock">
                    <a href="#" class="stock-down">-</a>
                    <h5 class="updatedstock">${totalNumber}</h5>
                    <a href="#" class="stock-up">+</a>
                </div>

                <div class="basket">
                    <a class="addToBasket"> <img src="assets/img/Shape (2).svg" alt="" > Add to cart</a>
                </div>
            </div>
    </div>
        
        `
    sale()
    bindEvents(".stock-down", "click", productReduce)
    bindEvents(".stock-up", "click", productIncrease)
    bindEvents(".addToBasket", "click", addedToCart)
    bindEvents(".shoppingCart", "click", showCart)
    bindEvents(".myDialog-close-btn", "click", closeModal)


}




// sepete eklenen urun modalını kapatmak icin fonksiyon

function closeModal() {

    myDialog.close();

}





//indirim

function sale() {
    const saleprice = qs(".afterPrice")
    const beforeprice = qs(".beforePrice")
    const discount = qs(".dscnt").textContent


    let salePrice = Math.floor(((100 - discount) / 100) * beforeprice.textContent)

    saleprice.innerHTML = `${salePrice}`

    beforeprice.classList.add("crossOut")

}






// urun arttırma butonu icin fonksiyon

async function productIncrease() {

    const updatedStock = qs(".updatedstock")

    totalNumber++

    updatedStock.innerHTML = `${totalNumber}`



}



// urun azaltma butonu icin fonksiyon

async function productReduce() {

    const updatedStock = document.querySelector(".updatedstock")


    if (totalNumber > 0) {
        totalNumber--

    }

    updatedStock.textContent = `${totalNumber}`


}



listProduct()