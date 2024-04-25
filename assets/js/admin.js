const clickedid = JSON.parse(localStorage.getItem("clickedid"))
const dummyjson = "https://dummyjson.com";

const hero = qs(".hero");
const mmyDialog = qs(".myDialog");
const shoppingBasket = qs(".shoppingBasket");




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
        
    <div class="hero-left">
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
                <a href="#" class="pricing-discount">${item.discountPercentage}</a>
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
    sale()
    bindEvents(".stock-down", "click", productReduce)
    bindEvents(".stock-up", "click", productIncrease)
    bindEvents(".addToBasket", "click", addedToCart)
    bindEvents(".shoppingCart", "click", showCart)
    bindEvents(".myDialog-close-btn", "click", closeModal)

    // bindEvents()

}




// sepete eklenen urun modalını kapatmak icin fonksiyon

function closeModal() {
    mmyDialog.close();
}





// sepete tiklandiginda sepet detaylarini gösteren fonksiyon
function showCart() {
    console.log("dfkgno");
    const urunListesi = JSON.parse(localStorage.getItem('urunListesi'))
    shoppingBasket.style.display = "block"
    shoppingBasket.innerHTML = `
    <h5>Cart</h5>

    <div class="basketDetails">
        <img class="shoppingCartimg" src="assets/img/Rectangle Copy 2.png" alt="">

        <div class="basketDetails-one">
            <h4>Fall Limited Edition Sneakers</h4>
            <div class="basketDetails-one-first">
                <h3>$ ${urunListesi.firstPrice} X  ${urunListesi.stock}</h3>
                <h6>$${urunListesi.price}</h6>
            </div>
        </div>

        <img src="assets/img/bin.svg" alt="">
    </div>
    <div class="checkOut">
        <a href="#">Checkout</a>

    </div>
    `

    // console.log(urunListesi);
}


function sale() {
    const saleprice = qs(".afterPrice")
    const beforeprice = qs(".beforePrice")

    const discount = qs(".pricing-discount").textContent

    let salePrice = Math.floor(((100 - discount) / 100) * beforeprice.textContent)

    saleprice.innerHTML = `${salePrice}`
    beforeprice.classList.add("crossOut")

}




// sepete eklenen urun detaylari local storagea kaydedildi


async function addedToCart() {
    const discountBtn = document.querySelector(".pricing-discount").textContent
    const item = await getProduct()
    const itemPrice = Math.floor(((100 - discountBtn) / 100) * item.price)
    mmyDialog.showModal();
    const afterPrice = document.querySelector(".afterPrice").textContent
    const updatedStock = document.querySelector(".updatedstock").textContent
    const title = document.querySelector(".title").textContent
    const imgSrc = document.querySelector("#imgSmall").src;
    console.log(imgSrc);



    const urunListesi = {
        firstPrice: itemPrice,
        price: afterPrice,
        adi: title,
        stock: updatedStock,
        image: imgSrc

    }

    localStorage.setItem('urunListesi', JSON.stringify(urunListesi));

    console.log(urunListesi);

}



// urun arttırma butonu icin fonksiyon

async function productIncrease() {

    const updatedStock = qs(".updatedstock")
    const beforePrice = qs(".beforePrice")

    const newStock = parseInt(updatedStock.textContent) + 1

    updatedStock.textContent = `${newStock}`

}



// urun azaltma butonu icin fonksiyon

async function productReduce() {

    const updatedStock = document.querySelector(".updatedstock")
    const newStock = parseInt(updatedStock.textContent) - 1


    if (updatedStock.textContent >= 1) {
        updatedStock.textContent = `${newStock}`


    }
    if (newStock === 0) {
        updatedStock.textContent = `${newStock}`

    }




}




listProduct()