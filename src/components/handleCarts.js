import { Agregarproductos } from "./agregarProductos";
import { handleAddToCart } from "./handleAddToCart";
import { updateCartSummary } from "./updateCartSummary";


let array = [];
export const handleCarts = (products, quantityElement, buttonAdded, productImg) => {
    
    if (!buttonAdded || !buttonAdded.id) {
        console.error("buttonAdded no es válido o no tiene un 'id'");
        return;
    }

    const sectionCartContainerEmpty = document.querySelector(".section-cart__container-empty");
    const items = document.querySelector(".section-cart__container-items");

    sectionCartContainerEmpty.style.display = "none";

    // Obtener el producto correspondiente
    const productId = buttonAdded.id;
    const product = products[productId];

    if (!product) {
        console.error("Producto no encontrado");
        return;
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = array.find(item => item.name === product.name);

    if (existingProduct) {
        const productElement = document.querySelector(`.section-cart__product[data-id="${product.name}"]`);
        if (productElement) {
            const cantProductElement = productElement.querySelector(".cant");
            const totalPrice = productElement.querySelector(".total-price");

            let currentQuantity = parseInt(cantProductElement.textContent, 10);

            if (parseInt(quantityElement, 10) === 0) {
                currentQuantity -= 1;

                if (currentQuantity <= 0) {
                    // Eliminar del carrito y del DOM si la cantidad es <= 0
                    array = array.filter(item => item.name !== product.name);
                    productElement.remove();
                } else {
                    // Actualizar cantidad y precio
                    cantProductElement.textContent = `${currentQuantity} `;
                    totalPrice.textContent = (currentQuantity * parseFloat(product.price)).toFixed(2);
                }
            } else {
                // Actualizar cantidad y precio si se incrementa la cantidad
                cantProductElement.textContent = `${quantityElement} `;
                totalPrice.textContent = (parseInt(quantityElement, 10) * parseFloat(product.price)).toFixed(2);
            }
        }
    } else {
        // Agregar el producto al carrito

        array.push({ ...product, quantity: parseInt(quantityElement, 10) });

        // Crear nuevo producto en el DOM
        const itemProduct = document.createElement("DIV");
        itemProduct.classList.add("section-cart__product");
        itemProduct.setAttribute("data-id", product.name);

        itemProduct.innerHTML = `
            <div class="section-cart__product__container">
                <h3>${product.name}</h3>
                <span class="cant">${quantityElement}
                </span><span class="x">x</span>
                <span class="product-price">@ ${product.price.toFixed(2)}</span>
                <span class="total-price">${(parseInt(quantityElement, 10) * parseFloat(product.price)).toFixed(2)}</span>
            </div>
            <svg class="icono-remove" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
        `;

        items.appendChild(itemProduct);

        // Añadir evento al ícono de eliminar
        const iconoRemove = itemProduct.querySelector(".icono-remove");
        iconoRemove.addEventListener("click", () => {
            // Restablecer cantidad en el array
            const productIndex = array.findIndex(item => item.name === product.name);
            if (productIndex !== -1) {
                array[productIndex].quantity = 1; // Restablecer la cantidad inicial
            }

            // Eliminar del array
            array = array.filter(item => item.name !== product.name);

            // Eliminar del DOM
            itemProduct.remove();

            
            // Restaurar el botón de "add-to-cart"
            const addButton = document.querySelector(`.add-to-cart[id="${buttonAdded.id}"]`);
            const addedButton = document.querySelector(`.added[id="${buttonAdded.id}"]`);
            if (addButton && addedButton) {
                addButton.style.display = "flex";
                addedButton.style.display = "none";
                productImg.style.border = "none"
            }

            // Actualizar el total y el título del carrito
            updateCartSummary();
        });
    }


    // Verificar si ya existe el contenedor del total
    let orderTotal = document.querySelector(".container-total");

    if (!orderTotal) {
        // Crear el contenedor del total si no existe
        orderTotal = document.createElement("DIV");
        orderTotal.classList.add("container-total");
        orderTotal.innerHTML = `
            <div class="container-total__order">
                <h3>Order Total</h3>
                <p class="pTotal">$0.00</p>
            </div>
            
            <div class="container-carbon">
            <p>This is a <b>carbon-neutral</b> delivery</p>
            </div>
            <div class="container-total__contaienr-button">
            <button class="container-total__button">Confirm Order</button>
            </div>           
        `;
        const wrapper = document.createElement("DIV")
        wrapper.classList.add("wrapper")
        const butonConfirm = orderTotal.querySelector(".container-total__button")
        const containerConfirm = document.createElement("DIV");
        containerConfirm.classList.add("container-confirm")
        containerConfirm.innerHTML = `
                <svg class="container-confirm__icono" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
                </svg>
                <h3>Order Confirmed</h3>
                <p>We hope you enjoy your food!</p>
                <div class="container-confirm__container-total"></div>
                <button class="container-confirm__button">Start New Order</button>
                `


        butonConfirm.addEventListener("click", () => {
            // Asegúrate de que `array` no esté vacío
            if (!array || array.length === 0) {
                console.error("No hay productos en el carrito.");
                return;
            }

            // Agregar `containerConfirm` al `wrapper` y luego al cuerpo
            wrapper.appendChild(containerConfirm);
            document.body.appendChild(wrapper);

            // Seleccionar `containerConfirmContainerTotal` después de agregarlo al DOM
            const containerConfirmContainerTotal = containerConfirm.querySelector(".container-confirm__container-total");

            if (!containerConfirmContainerTotal) {
                console.error("El contenedor para los datos confirmados no se encontró.");
                return;
            }

            // Limpiar cualquier contenido previo en el contenedor
            containerConfirmContainerTotal.innerHTML = "";

            // Agregar productos al contenedor de confirmación
            const cant = document.querySelectorAll(".cant");
            array.forEach((product, index) => {
                const containerConfirmContainerDatos = document.createElement("DIV");
                containerConfirmContainerDatos.classList.add("container-confirm__datos");
                containerConfirmContainerDatos.innerHTML = `
                            <div class="container-confirm__container-img">
                                <img src="${product.image.mobile}" alt="${product.name}">
                            </div>
                            <div class="container-confirm__container-datos">
                                <div class="container-datos__datos">
                                    <h3>${product.name}</h3>
                                    <div class="container-datos__cantyprice">
                                        <span class="cant">${cant[index].textContent}x</span>
                                        <span class="product-price">@ $${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <span class="total-price">$${(parseInt(cant[index].textContent) * product.price).toFixed(2)}</span>
                            </div>
                        `;
                containerConfirmContainerTotal.appendChild(containerConfirmContainerDatos);
            });
            // Evento para iniciar una nueva orden
            const startNewOrderButton = containerConfirm.querySelector(".container-confirm__button");
            startNewOrderButton.addEventListener("click", () => {
                // Vaciar el array del carrito
                array = [];

                // Limpiar los productos del contenedor del carrito
                const itemsContainer = document.querySelector(".section-cart__container-items");
                itemsContainer.innerHTML = "";

                // Restablecer el mensaje de carrito vacío
                const sectionCartContainerEmpty = document.querySelector(".section-cart__container-empty");
                sectionCartContainerEmpty.style.display = "block";

                // Remover el contenedor de confirmación
                wrapper.remove();

                const buttonAddToCarts = document.querySelectorAll(".add-to-cart")
                const buttonAdded = document.querySelectorAll(".added")
                buttonAddToCarts.forEach(buttonAdd => buttonAdd.style.display = "flex")
                buttonAdded.forEach(buttonAdded => buttonAdded.style.display = "none")

                // Actualizar el total del carrito
                updateCartSummary();






               



                handleAddToCart(products)
            });
        });;


    }

    // Asegurarse de que el contenedor total esté al final
    items.appendChild(orderTotal);

    // Calcular y actualizar el total
    updateCartSummary();
}