const form = document.querySelector(".formElements")
const productList = document.querySelector(".adminProductList")


let eklenenurun = []
let localProducts = []
let sepettekiurunler = []

let img = "https://picsum.photos/200/300"

if (localStorage.getItem("urunler")) {
    sepettekiurunler = JSON.parse(localStorage.getItem("urunler"))
}

let idno = 101

form.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log("sghrdgh");

    const products = {
        id: idno++,
        title: form["urunAdi"].value,
        price: form["urunFiyati"].value,
        brand: form["urunAdi"].value,
        stock: form["stokAdedi"].value,
        category: form["kategori"].value,
        images: img



    }

    eklenenurun.push(products)
    e.target.reset()


    // localStorage.setItem('urunler', JSON.stringify(eklenenurun));
    init()
    bindEvents()
})

function init() {
    productList.innerHTML = ""
    for (const item of eklenenurun) {
        productList.innerHTML += `


        
                <div  id="${item.id}" class="homePage">

                    <div class="contentProductPage">
                    
                        <div class="content-img" >

                                <img src="${item.images}" alt="">

                        </div>

                        <div class="explanation">
                            <h4>${item.title}</h4>
                            <h5>${item.category}</h5>
                        </div>

                        <h3>Rating <span style="font-weight: 700" >${item.rating}</span></h3>

                        <div class="content-stock">
                            <h2>$ ${item.price}</h2>
                            <h6>Stock: ${item.stock}</h6>

                        </div>

                    </div>

                    <div class="admin-addToBasket">
                        <button>Sepete Ekle</button>  
                    </div>
                    </div>
                        
        `

    }
    bindEvents()
}

function bindEvents() {
    const editbtns = document.querySelectorAll(".duzenle")
    const deleteBtns = document.querySelectorAll(".sil")
    const sepeteekle = document.querySelectorAll(".admin-addToBasket button")

    for (const sepet of sepeteekle) {
        sepet.addEventListener("click", urunuSepeteEkle)
    }

    for (const editbtn of editbtns) {
        editbtn.addEventListener("click", editBtn)

    }


    for (const deletebtn of deleteBtns) {
        deletebtn.addEventListener("click", dltBtn)
    }
}

function urunuSepeteEkle() {
    x = JSON.parse(localStorage.getItem("localProduct"))
    console.log(x);
    sepettekiurunler = eklenenurun
    x = sepettekiurunler
    console.log(x);


    localStorage.setItem('urunler', JSON.stringify(sepettekiurunler));


}







function editBtn() {
    let degistirilenUrun = prompt("ne ile değiştirmek istersiniz")

    console.log(this);

    this.parentElement.firstElementChild.firstElementChild.innerText = degistirilenUrun



}


function dltBtn() {
    console.log("erjgnfı");

    const index = eklenenurun.findIndex((urun) => Number(urun.id) === Number(this.parentElement.id))
    if (index !== -1) {
        eklenenurun.splice(index, 1)
    }
}
// init()