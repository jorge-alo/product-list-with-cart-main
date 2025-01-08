import { handleIncrementDecrement } from "./handleIncrementDecrement";

export const handleAddToCart = (products) => {
    const buttonsAddToCart = document.querySelectorAll(".add-to-cart");
    const buttonsAdded = document.querySelectorAll(".added");
    const productImg = document.querySelectorAll(".product-img")
    buttonsAddToCart.forEach((button) => {
        button.addEventListener("click", () => {            
            button.style.display = "none"         
                buttonsAdded.forEach((buttonAdded) => {
                    if (button.id == buttonAdded.id) {
                        buttonAdded.style.display = "flex"
                        productImg[buttonAdded.id].style.border = "1px solid hsl(14, 86%, 42%)"
                        const indexProductImg = productImg[buttonAdded.id]
                        handleIncrementDecrement(buttonAdded, button, products, productImg[buttonAdded.id]);
                    }
                })
        });
    });
};