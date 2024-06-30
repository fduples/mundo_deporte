/*Obtenemos los productos de la api*/

async function fetchProducts() {
    try {
        const id = Math.floor(Math.random() * 20);
        const response = await fetch(
          "https://fakestoreapi.com/products/",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data[id]);
        //Modify title
        // console.log(document.querySelector(".product-title h2"));
        document.querySelector(".product-title h2").innerHTML=data[id].title;
        //modify image
        document.querySelector(".product-img img").src=data[id].image;
        //modify price
        document.querySelector(".product-price h2").innerHTML="$"+parseInt(30*data[id].price);
        //modify description
        document.querySelector(".product-desription > p").innerHTML=data[id].description;
        //modify quantity
        document.querySelector(".product-quantity > p").innerHTML=id +" disponibles";

      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
      document.querySelector(".new-products").style.display="block";
  }
fetchProducts();

/* Funcion para decrementar la cantidad de productos*/
function less()
{
    let counter=document.querySelector("input");
    let quantity=document.querySelector(".product-quantity p");
    
    if (counter.value>1){
        counter.value=parseInt(counter.value)-1;
    }
}

/* Funcion para incrementar la cantidad de productos*/
function more()
{
    let counter=document.querySelector("input");
    let quantity=document.querySelector(".product-quantity p");

    if (counter.value < parseInt(quantity.innerHTML.split(" ")[0])){
        counter.value=parseInt(counter.value)+1;
    }
}

