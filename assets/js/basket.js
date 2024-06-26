const myDialog = qs(".myDialog");
const shoppingBasket = qs(".shoppingBasket");
const basketDetails = qs(".basketDetails")
let cartTotal = qs(".cartTotal")


let localProducts = JSON.parse(localStorage.getItem("localProduct")) || [];

if (!localStorage.getItem("localProduct")) {
    localStorage.setItem("localProduct", JSON.stringify(localProducts));
}

if (!localStorage.getItem("totalNumber")) {
    localStorage.setItem("totalNumber", JSON.stringify(totalNumber));
}





// function deleteCart() {
//     console.log("nfdjgnf");
//     // const findProduct = localProducts.find(product => product.id == this.parentElement.id);
//     // console.log(findProduct);
// }

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
    const idno = this.parentElement.parentElement.parentElement.parentElement.children[0].dataset.id;
    const afterPrice = qs(".afterPrice").textContent
    const title = qs(".title").textContent
    const imgSrc = qs("#imgSmall").src;
    const existingProductIndex = localProducts.findIndex(product => product.id === idno);


    if (existingProductIndex !== -1) {
        // Ürün sepette var, adet sayısını artır
        localProducts[existingProductIndex].stock = Number(totalNumber);
        localProducts[existingProductIndex].totalPrice = Number(totalNumber * afterPrice);
    } else {
        // Ürün sepette yok, yeni ürün olarak ekle
        const productList = {
            id: idno,
            firstPrice: afterPrice,
            totalPrice: parseInt(totalNumber * afterPrice),
            adi: title,
            stock: totalNumber,
            image: imgSrc
        };

        localProducts.push(productList);
    }


    localStorage.setItem('totalNumber', totalNumber);
    localStorage.setItem('localProduct', JSON.stringify(localProducts));
}





// sepete tiklandiginda sepet detaylarini gösteren fonksiyon
function showCart() {
    console.log(localProducts);
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
                                 $${localProduct.firstPrice} X  ${totalNumber}
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

    const bins = document.querySelectorAll(".bin")


    for (const bin of bins) {

        bin.addEventListener("click", function () {
            const clear = this.parentElement
            localProducts = []
            clear.remove()
            if (cartTotal.style.display = "block") {

                cartTotal.style.display = "none"
            }
            // console.log(id);
        })
        // localProducts = JSON.parse(localStorage.getItem("localProduct")) || [];
    }

    // console.log(urunListesi);
}