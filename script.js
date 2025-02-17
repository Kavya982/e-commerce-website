
const products = [
    { id: 1, title: 'Laptop', description: 'A high-performance laptop', price: 1000, category: 'electronics', image: 'path/to/laptop.jpg' },
    { id: 2, title: 'T-shirt', description: 'A stylish cotton T-shirt', price: 20, category: 'fashion', image: 'path/to/tshirt.jpg' },
    { id: 3, title: 'Smartphone', description: 'Latest model smartphone', price: 500, category: 'electronics', image: 'path/to/smartphone.jpg' },
    { id: 4, title: 'Jacket', description: 'Warm and comfortable jacket', price: 60, category: 'fashion', image: 'path/to/jacket.jpg' },
];


let cart = [];


function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}


function searchProducts() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
}


function filterProducts() {
    const category = document.getElementById('filter').value;
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; 

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });

    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.onclick = checkout;
    cartItems.appendChild(checkoutButton);
}


function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = {
        products: [...cart],
        date: new Date().toLocaleString(),
    };
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    alert('Order placed successfully!');
    cart = []; 
    updateCart();
    displayOrderHistory(); 
}


function displayOrderHistory() {
    const orderHistoryContainer = document.getElementById('orderHistory');
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    orderHistoryContainer.innerHTML = ''; // Clear existing order history

    if (orderHistory.length === 0) {
        orderHistoryContainer.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }

    orderHistory.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');
        orderElement.innerHTML = `
            <h3>Order Date: ${order.date}</h3>
            <ul>
                ${order.products.map(product => `<li>${product.title} - $${product.price}</li>`).join('')}
            </ul>
        `;
        orderHistoryContainer.appendChild(orderElement);
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    displayOrderHistory();
});
