const dummyjson = "https://dummyjson.com";
const content = document.querySelector(".content")

async function getFetch(endpoint) {
    const response = await fetch(`${dummyjson}/${endpoint}`)
    const data = await response.json()
    // console.log(data);
    const items = data.products
    return items
}


async function getItems() {
    const items = await getFetch("products")
    console.log(items);
    // const items = data.products

    for (const item of items) {
        // console.log(item);
        content.innerHTML += `

        <a  id="${item.id}"  href="productPage.html" class="homePage">

            <div class="deneme">
            
                <div class="content-img" >

                        <img src="${item.images[0]}" alt="">

                </div>

                <div class="explanation">
                    <h4>${item.title}</h4>
                    <h5>${item.category}</h5>
                </div>

                <h3>${item.rating}</h3>
                <div class="content-stock">
                    <h2>$ ${item.price}</h2>
                    <h6>Stock: ${item.stock}</h6>

                </div>
            </div>
        </a>
        
        
        `
    }
    const homepages = document.querySelectorAll(".homePage")
    for (const homepage of homepages) {

        homepage.addEventListener("click", init)
    }
}


function init() {
    let clickedid = Number(this.id)
    console.log(clickedid);

    localStorage.setItem("clickedid", JSON.stringify(clickedid))
}




getItems()
