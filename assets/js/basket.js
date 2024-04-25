let localProducts = []
const myDialog = qs(".myDialog");
const shoppingBasket = qs(".shoppingBasket");
const basketDetails = qs(".basketDetails")
let cartTotal = qs(".cartTotal")

const bins = document.querySelectorAll(".bin")


for (const bin of bins) {
    bin.addEventListener("click", deleteCart)
}


if (!localStorage.getItem("localProduct")) {
    localStorage.setItem("localProduct", JSON.stringify(localProducts));
}



let idno = 1

function deleteCart() {
    console.log("ndfıjvbf");
    const findProduct = localProducts.find(product => product.id == this.parentElement.id);
    console.log(findProduct);
}

function totalCart() {

    if (totalNumber == 0) {
        cartTotal.style.display = "none"
    } else {
        cartTotal.style.display = "block"
        cartTotal.textContent = `${totalNumber}`
    }
}

function addedToCart() {
    totalCart()

    myDialog.showModal();

    const afterPrice = qs(".afterPrice").textContent
    const title = qs(".title").textContent
    const imgSrc = qs("#imgSmall").src;



    const productList = {
        id: idno++,
        firstPrice: afterPrice,
        totalPrice: totalNumber * afterPrice,
        adi: title,
        stock: totalNumber,
        image: imgSrc


    }

    localProducts.push(productList)

    console.log(localProducts);

    localStorage.setItem('localProduct', JSON.stringify(localProducts));


}





// sepete tiklandiginda sepet detaylarini gösteren fonksiyon
function showCart() {
    console.log("dfkgno");
    shoppingBasket.classList.toggle("active")
    basketDetails.innerHTML = ""

    for (const localProduct of localProducts) {

        basketDetails.innerHTML += `
        <div class="shoppingBasket-one">

        <img class="shoppingCartimg" src="${localProduct.image}" alt="">

                   <div class="basketDetails-one">
                       <h4>${localProduct.adi}</h4>
                       <div class="basketDetails-one-first">
                       <h3 id="${localProduct.id}" >
                       $${localProduct.firstPrice} X  ${localProduct.stock}
                 </h3>

                 <h6>
                       $${localProduct.totalPrice}
                 </h6>
                       </div>
                   </div>

                   <img class="bin" src="assets/img/bin.svg" alt="">

                  
        </div>
        
        `
    }

    // console.log(urunListesi);
}