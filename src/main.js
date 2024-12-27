
const Containerproductos = document.querySelector(".container-productos");

const Agregarproductos = async () => {
   
    try {
        const response = await fetch('./data.json');
        const products = await response.json();

        renderProducts(products);
    } catch (error) {
        console.error('error al cargar los productos', error);
    }
}

const renderProducts = (products) => {
    
    products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
        <div class="product__container-img">
            <img class="product-img" src="${product.image.thumbnail}" alt="${product.name}">
            <div class="container-button">
                <button class="add-to-cart" id="${index}">
                   
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                            </g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs>
                        </svg>                    
                        <span>Add to Cart</span>
                </button>
                <div class="added" id="${index}">
                    
                        <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                        </svg>
                        <span class="quantity">1</span>
                        <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                        </svg>
                    
                </div>
            </div>        
        </div>
        
         <p>${product.category}</p>
         <h3>${product.name}</h3>
         <p class="price">$${product.price.toFixed(2)}</p>
        
        `
        Containerproductos.appendChild(productElement);
    });
    handleAddToCart()
}

const handleAddToCart = () => {
    const buttonsAddToCart = document.querySelectorAll(".add-to-cart");
    const buttonsAdded = document.querySelectorAll(".added")
    console.log(buttonsAdded)

    buttonsAddToCart.forEach((button) => {
        // Aseguramos que no haya duplicados de eventos
        button.onclick = null;

        button.addEventListener("click", () => {
           button.style.display = "none"
            buttonsAdded.forEach((buttonAdded) => {
                if(button.id == buttonAdded.id){
                    console.log(buttonAdded)
                    buttonAdded.style.display = "flex"
                   
                    handleIncrementDecrement(buttonAdded, button);
                }
            })
               
            
        });
    });
};


const handleIncrementDecrement = (buttonAdded, button) => {
    const incrementButton = buttonAdded.querySelector(".increment");
    const decrementButton = buttonAdded.querySelector(".decrement");
    const quantityElement = buttonAdded.querySelector(".quantity");

    // Restablecer la cantidad a 1 cuando se muestra el botón "Añadido"
    quantityElement.textContent = "1"; // Siempre que se muestra el botón de "Añadido", la cantidad comienza desde 1
    console.log(quantityElement.textContent)
    // Eliminar eventos previos para evitar duplicados
    incrementButton.removeEventListener("click", incrementEvent);
    decrementButton.removeEventListener("click", decrementEvent);

    // Definir los eventos de incremento y decremento
    function incrementEvent() {
        let quantity = parseInt(quantityElement.textContent, 10);
        quantityElement.textContent = quantity + 1; // Incrementar la cantidad
        console.log(quantityElement.textContent)
    }

    function decrementEvent() {
        let quantity = parseInt(quantityElement.textContent, 10);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1; // Decrementar la cantidad
        } else if (quantity === 1) {
            // Cuando la cantidad es 1 y se decrece, restablecemos los botones
            buttonAdded.style.display = "none"; 
            button.style.display = "flex"; 
            quantityElement.textContent = "1";
        }
    }

    // Agregar los nuevos eventos
    incrementButton.addEventListener("click",  incrementEvent);
    decrementButton.addEventListener("click", decrementEvent);
};



// Llamada inicial para cargar los productos
Agregarproductos();
