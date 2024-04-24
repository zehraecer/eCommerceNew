const clickedid = JSON.parse(localStorage.getItem("clickedid"))
const hero = document.querySelector(".hero")
const dummyjson = "https://dummyjson.com";
const mmyDialog = document.querySelector(".myDialog")
const shoppingBasket = document.querySelector(".shoppingBasket")


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
    bindEvents()

}




// butonlar icin fonksiyon 
function bindEvents() {
    // const discountBtn = document.querySelector(".discount-btn")
    const stockDown = document.querySelector(".stock-down")
    const stockUp = document.querySelector(".stock-up")
    const addToBasket = document.querySelector(".addToBasket")
    const shoppingCart = document.querySelector(".shoppingCart")
    const myDialogCloseBtn = document.querySelector(".myDialog-close-btn")



    // discountBtn.addEventListener("click", applyDiscount)
    stockDown.addEventListener("click", productReduce)
    stockUp.addEventListener("click", productIncrease)
    addToBasket.addEventListener("click", addedToCart)
    shoppingCart.addEventListener("click", showCart)
    myDialogCloseBtn.addEventListener("click", closeModal)
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

    // if (urunListesi.length == 0) {
    //     shoppingBasket.innerHTML = `
    // <h5>Cart</h5>

    // <div class="basketDetails">
    //      <h4>Sepetiniz Boş</h4>

    // </div>
    // `
    // }

    console.log(urunListesi);
}




// sepete eklenen urun detaylari local storagea kaydedildi
async function addedToCart() {
    const discountBtn = document.querySelector(".discount-btn").textContent
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



// urun azaltma butonu icin fonksiyon

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




listProduct()