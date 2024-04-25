let localProducts = []
const myDialog = qs(".myDialog");
const shoppingBasket = qs(".shoppingBasket");
const basketDetails = qs(".basketDetails-one-first")
const bin = qs(".bin")
let cartTotal = qs(".cartTotal")



if (!localStorage.getItem("localProduct")) {
    localStorage.setItem("localProduct", JSON.stringify(localProduct));
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

    for (const localProduct of localProducts) {

        basketDetails.innerHTML = `

                    <h3>
                          $${localProduct.firstPrice} X  ${localProduct.stock}
                    </h3>

                    <h6>
                          $${localProduct.totalPrice}
                    </h6>
        
        `
    }

    // console.log(urunListesi);
}