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
        <div>
        <a  id="${item.id}"  href="productPage.html" class="homePage">
            <img src="${item.images[0]}" alt="">
            <h4>${item.brand}</h4>
            <h3>${item.category}</h3>
            <h2>${item.price}</h2>
        </a>
        
        </div>
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
