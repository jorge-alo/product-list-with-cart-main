import { handleIncrementDecrement } from "./handleIncrementDecrement";

export const handleAddToCart = (products) => {
    const buttonsAddToCart = document.querySelectorAll(".add-to-cart");
    const buttonsAdded = document.querySelectorAll(".added");

    buttonsAddToCart.forEach((button) => {
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