(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();function w(){const o=document.querySelectorAll(".total-price"),n=document.querySelector(".section-cart__title"),c=document.querySelector(".section-cart__container-empty"),r=document.querySelector(".section-cart__container-items");let e=0;o.forEach(s=>{e+=parseFloat(s.textContent)});const t=document.querySelector(".pTotal");if(t==null){n.textContent="Your Cart (0)";return}t.textContent=`$${e.toFixed(2)}`;const i=Array.from(document.querySelectorAll(".section-cart__product .cant")).reduce((s,v)=>s+parseInt(v.textContent,10),0);n.textContent=`Your Cart (${i})`,i===0?(c.style.display="block",r.style.display="none"):(c.style.display="none",r.style.display="block")}let d=[];const x=(o,n,c,r)=>{if(!c||!c.id){console.error("buttonAdded no es válido o no tiene un 'id'");return}const e=document.querySelector(".section-cart__container-empty"),t=document.querySelector(".section-cart__container-items");e.style.display="none";const i=c.id,s=o[i];if(!s){console.error("Producto no encontrado");return}if(d.find(a=>a.name===s.name)){const a=document.querySelector(`.section-cart__product[data-id="${s.name}"]`);if(a){const l=a.querySelector(".cant"),p=a.querySelector(".total-price");let u=parseInt(l.textContent,10);parseInt(n,10)===0?(u-=1,u<=0?(d=d.filter(f=>f.name!==s.name),a.remove()):(l.textContent=`${u} `,p.textContent=(u*parseFloat(s.price)).toFixed(2))):(l.textContent=`${n} `,p.textContent=(parseInt(n,10)*parseFloat(s.price)).toFixed(2))}}else{d.push({...s,quantity:parseInt(n,10)});const a=document.createElement("DIV");a.classList.add("section-cart__product"),a.setAttribute("data-id",s.name),a.innerHTML=`
            <div class="section-cart__product__container">
                <h3>${s.name}</h3>
                <span class="cant">${n}
                </span><span class="x">x</span>
                <span class="product-price">@ ${s.price.toFixed(2)}</span>
                <span class="total-price">${(parseInt(n,10)*parseFloat(s.price)).toFixed(2)}</span>
            </div>
            <svg class="icono-remove" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
        `,t.appendChild(a),a.querySelector(".icono-remove").addEventListener("click",()=>{const p=d.findIndex(_=>_.name===s.name);p!==-1&&(d[p].quantity=1),d=d.filter(_=>_.name!==s.name),a.remove();const u=document.querySelector(`.add-to-cart[id="${c.id}"]`),f=document.querySelector(`.added[id="${c.id}"]`);u&&f&&(u.style.display="flex",f.style.display="none",r.style.border="none"),w()})}let m=document.querySelector(".container-total");if(!m){m=document.createElement("DIV"),m.classList.add("container-total"),m.innerHTML=`
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
        `;const a=document.createElement("DIV");a.classList.add("wrapper");const l=m.querySelector(".container-total__button"),p=document.createElement("DIV");p.classList.add("container-confirm"),p.innerHTML=`
                <svg class="container-confirm__icono" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
                </svg>
                <h3>Order Confirmed</h3>
                <p>We hope you enjoy your food!</p>
                <div class="container-confirm__container-total"></div>
                <button class="container-confirm__button">Start New Order</button>
                `,l.addEventListener("click",()=>{if(!d||d.length===0){console.error("No hay productos en el carrito.");return}a.appendChild(p),document.body.appendChild(a);const u=p.querySelector(".container-confirm__container-total");if(!u){console.error("El contenedor para los datos confirmados no se encontró.");return}u.innerHTML="";const f=document.querySelectorAll(".cant");d.forEach((y,g)=>{const h=document.createElement("DIV");h.classList.add("container-confirm__datos"),h.innerHTML=`
                            <div class="container-confirm__container-img">
                                <img src="${y.image.mobile}" alt="${y.name}">
                            </div>
                            <div class="container-confirm__container-datos">
                                <div class="container-datos__datos">
                                    <h3>${y.name}</h3>
                                    <div class="container-datos__cantyprice">
                                        <span class="cant">${f[g].textContent}x</span>
                                        <span class="product-price">@ $${y.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <span class="total-price">$${(parseInt(f[g].textContent)*y.price).toFixed(2)}</span>
                            </div>
                        `,u.appendChild(h)}),p.querySelector(".container-confirm__button").addEventListener("click",()=>{d=[];const y=document.querySelector(".section-cart__container-items");y.innerHTML="";const g=document.querySelector(".section-cart__container-empty");g.style.display="block",a.remove();const h=document.querySelectorAll(".add-to-cart"),S=document.querySelectorAll(".added"),L=document.querySelectorAll(".product-img");h.forEach(C=>C.style.display="flex"),S.forEach(C=>C.style.display="none"),L.forEach(C=>C.style.border="none"),w(),q(o)})})}t.appendChild(m),w()},$=(o,n,c,r)=>{const e=o.querySelector(".increment"),t=o.querySelector(".decrement"),i=o.querySelector(".quantity");i.textContent=1,x(c,i.textContent,o,r),e.replaceWith(e.cloneNode(!0)),t.replaceWith(t.cloneNode(!0));const s=o.querySelector(".increment"),v=o.querySelector(".decrement");function m(){let l=parseInt(i.textContent,10);i.textContent=l+1,x(c,i.textContent,o,r)}function a(){let l=parseInt(i.textContent,10);l>1?(i.textContent=l-1,x(c,i.textContent,o,r)):l===1&&(o.style.display="none",n.style.display="flex",i.textContent="1",r.style.border="none",x(c,0,o,r))}s.addEventListener("click",m),v.addEventListener("click",a)},q=o=>{const n=document.querySelectorAll(".add-to-cart"),c=document.querySelectorAll(".added"),r=document.querySelectorAll(".product-img");n.forEach(e=>{e.addEventListener("click",()=>{e.style.display="none",c.forEach(t=>{e.id==t.id&&(t.style.display="flex",r[t.id].style.border="1px solid hsl(14, 86%, 42%)",r[t.id],$(t,e,o,r[t.id]))})})})},E=document.querySelector(".container-productos"),I=async()=>{try{const n=await(await fetch("data.json")).json();M(n)}catch(o){console.error("error al cargar los productos",o)}},M=o=>{o.forEach((n,c)=>{const r=document.createElement("div");r.classList.add("product"),r.innerHTML=`
        <div class="product__container-img">
            <img class="product-img" src="${n.image.thumbnail}" name=${n.name} alt="${n.name}">
            <div class="container-button">
                <button class="add-to-cart" id="${c}">
                   
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                            </g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs>
                        </svg>                    
                        <span>Add to Cart</span>
                </button>
                <div class="added" id="${c}">
                    
                        <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                            <path class="pathDecrement" fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                        </svg>
                        <span class="quantity">1</span>
                        <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                        </svg>
                    
                </div>
            </div>        
        </div>
        
         <p>${n.category}</p>
         <h3>${n.name}</h3>
         <p class="price">$${n.price.toFixed(2)}</p>
        
        `,E.appendChild(r)}),q(o)};I();
