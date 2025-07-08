document.addEventListener('DOMContentLoaded', () => {
    let listProducts = [];
    let listCart = [];

    // Fetch products from JSON file
    const fetchProducts = () => {
        return fetch('product.json')
            .then(response => response.json())
            .then(data => {
                listProducts = data;
            });
    };

    // Retrieve cart data from localStorage
    const checkCart = () => {
        if (localStorage.getItem('cart')) {
            listCart = JSON.parse(localStorage.getItem('cart'));
        }
    };

    // Update HTML with cart data
    const addCartToHTML = () => {
        const listCartHTML = document.querySelector('.returnCart .list');
        listCartHTML.innerHTML = '';
        const totalQuantityHTML = document.querySelector('.totalQuantity');
        const totalPriceHTML = document.querySelector('.totalPrice');

        let totalQuantity = 0;
        let totalPrice = 0;

        if (listCart.length > 0) {
            listCart.forEach(cart => {
                const product = listProducts.find(p => p.id == cart.product_id);
                if (product) {
                    const itemTotalPrice = product.price * cart.quantity;
                    totalQuantity += cart.quantity;
                    totalPrice += itemTotalPrice;

                    const newP = document.createElement('div');
                    newP.classList.add('item');
                    newP.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="price">RS ${product.price}/1</div>
                        </div>
                        <div class="quantity">${cart.quantity}</div>
                        <div class="returnPrice">RS ${itemTotalPrice}</div>
                    `;
                    listCartHTML.appendChild(newP);
                }
            });
        }
        totalQuantityHTML.innerText = totalQuantity;
        totalPriceHTML.innerText = 'RS ' + totalPrice;
    };

    // Initialize page
    const init = async () => {
        await fetchProducts();
        checkCart();
        addCartToHTML();
    };

    init();

    // Handle checkout button click
    document.querySelector('.buttonCheckout').addEventListener('click', () => {
        // Optionally handle form submission or checkout logic here
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart'); // Clear the cart after checkout
    });
});
