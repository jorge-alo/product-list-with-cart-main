
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
    handleAddToCart(products)
}

const handleAddToCart = (products) => {
    const buttonsAddToCart = document.querySelectorAll(".add-to-cart");
    const buttonsAdded = document.querySelectorAll(".added");

    buttonsAddToCart.forEach((button) => {
        // Aseguramos que no haya duplicados de eventos
        button.onclick = null;

        button.addEventListener("click", () => {
            button.style.display = "none"
            buttonsAdded.forEach((buttonAdded) => {
                if (button.id == buttonAdded.id) {
                    buttonAdded.style.display = "flex"

                    handleIncrementDecrement(buttonAdded, button, products);

                }
            })


        });
    });
};

const handleCarts = (products, quantityElement, buttonAdded) => {
    if (!buttonAdded || !buttonAdded.id) {
        console.error("buttonAdded no es válido o no tiene un 'id'");
        return;
    }

    const sectionCartTitle = document.querySelector(".section-cart__title");
    const sectionCartContainerEmpty = document.querySelector(".section-cart__container-empty");
    const items = document.querySelector(".section-cart__container-items");

    let array = [];
    sectionCartContainerEmpty.style.display = "none";

    // Añadir el producto al array si no existe
    products.forEach((product, index) => {
        if (buttonAdded.id == index) {
            const productExists = array.some(item => item.name === product.name);
            if (!productExists) {
                array = [...array, product];
            }
        }
    });

    array.forEach((product) => {
        const existingProduct = document.querySelector(`.section-cart__product[data-id="${product.name}"]`);

        if (existingProduct) {
            const cantProductElement = existingProduct.querySelector(".cant");
            const totalPrice = existingProduct.querySelector(".total-price");

            let currentQuantity = parseInt(cantProductElement.textContent, 10);

            if (parseInt(quantityElement, 10) === 0) {
                currentQuantity -= 1;

                if (currentQuantity <= 0) {
                    // Eliminar del carrito y del DOM si la cantidad es <= 0
                    array = array.filter(item => item.name !== product.name);
                    existingProduct.remove();
                } else {
                    // Actualizar cantidad y precio
                    cantProductElement.textContent = currentQuantity;
                    totalPrice.textContent = (currentQuantity * parseFloat(product.price)).toFixed(2);
                }
            } else {
                // Actualizar cantidad y precio si se incrementa la cantidad
                cantProductElement.textContent = quantityElement;
                totalPrice.textContent = (parseInt(quantityElement, 10) * parseFloat(product.price)).toFixed(2);
            }
        } else {
            // Crear nuevo producto si no existe
            const itemProduct = document.createElement("DIV");
            itemProduct.classList.add("section-cart__product");
            itemProduct.setAttribute("data-id", product.name);

            itemProduct.innerHTML = `
                <div class="section-cart__product__container">
                <h3>${product.name}</h3>
                <span class="cant">${quantityElement}x</span>
                <span class="product-price">@ ${product.price.toFixed(2)}</span>
                <span class="total-price">${(parseInt(quantityElement, 10) * parseFloat(product.price)).toFixed(2)}</span>
                </div>
                <svg class="icono-remove" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                `;

            items.appendChild(itemProduct);
        }
    });

    // Actualizar título del carrito
    const totalItems = Array.from(document.querySelectorAll(".section-cart__product .cant"))
        .reduce((acc, span) => acc + parseInt(span.textContent, 10), 0);

    sectionCartTitle.textContent = `Your Cart (${totalItems})`;

    // Mostrar contenedor vacío si no hay productos
    if (totalItems === 0) {
        sectionCartContainerEmpty.style.display = "block";
        items.style.display = "none";
    } else {
        items.style.display = "block";
    }
};


const handleIncrementDecrement = (buttonAdded, button, products) => {
    const incrementButton = buttonAdded.querySelector(".increment");
    const decrementButton = buttonAdded.querySelector(".decrement");
    const quantityElement = buttonAdded.querySelector(".quantity");

    // Restablecer la cantidad a 1 cuando se muestra el botón "Añadido"
    quantityElement.textContent = "1";
    handleCarts(products, quantityElement.textContent, buttonAdded);
    // Remover cualquier evento previo para evitar duplicados
    incrementButton.replaceWith(incrementButton.cloneNode(true));
    decrementButton.replaceWith(decrementButton.cloneNode(true));

    const newIncrementButton = buttonAdded.querySelector(".increment");
    const newDecrementButton = buttonAdded.querySelector(".decrement");

    // Definir los eventos de incremento y decremento
    function incrementEvent() {
        let quantity = parseInt(quantityElement.textContent, 10);
        quantityElement.textContent = quantity + 1; // Incrementar la cantidad
        handleCarts(products, quantityElement.textContent, buttonAdded)
    }

    function decrementEvent() {
        let quantity = parseInt(quantityElement.textContent, 10);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1; // Decrementar la cantidad
            handleCarts(products, quantityElement.textContent, buttonAdded)
        } else if (quantity === 1) {
            // Cuando la cantidad es 1 y se decrece, restablecemos los botones
            buttonAdded.style.display = "none";
            button.style.display = "flex";
            quantityElement.textContent = "1";
            handleCarts(products, 0, buttonAdded)
        }
    }

    // Agregar los nuevos eventos
    newIncrementButton.addEventListener("click", incrementEvent);
    newDecrementButton.addEventListener("click", decrementEvent);
};



// Llamada inicial para cargar los productos
Agregarproductos();
