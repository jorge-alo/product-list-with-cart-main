import { handleCarts } from "./handleCarts";

export const handleIncrementDecrement = (buttonAdded, button, products) => {
    const incrementButton = buttonAdded.querySelector(".increment");
    const decrementButton = buttonAdded.querySelector(".decrement");
    const quantityElement = buttonAdded.querySelector(".quantity");

   quantityElement.textContent = 1
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