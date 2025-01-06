

  // Función para actualizar el total y el título del carrito
    export function updateCartSummary() {
        const arrayCartProducts = document.querySelectorAll(".total-price");
        const sectionCartTitle = document.querySelector(".section-cart__title");
        const sectionCartContainerEmpty = document.querySelector(".section-cart__container-empty");
        const items = document.querySelector(".section-cart__container-items");
        let total = 0;

        arrayCartProducts.forEach((precio) => {
            total += parseFloat(precio.textContent);
        });

        const pTotal = document.querySelector(".pTotal");
        pTotal.textContent = `$${total.toFixed(2)}`;

        // Actualizar título del carrito
        const totalItems = Array.from(document.querySelectorAll(".section-cart__product .cant"))
            .reduce((acc, span) => acc + parseInt(span.textContent, 10), 0);

        sectionCartTitle.textContent = `Your Cart (${totalItems})`;

        // Mostrar contenedor vacío si no hay productos
        if (totalItems === 0) {
            sectionCartContainerEmpty.style.display = "block";
            items.style.display = "none";
        } else {
            sectionCartContainerEmpty.style.display = "none";
            items.style.display = "block";
        }
    }
