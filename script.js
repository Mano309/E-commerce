document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));

            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
        });
    });
});
    
document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { id: 1, name: "Laptop", price: 899.99, image: "laptop.jpeg", category: "electronics" },
        { id: 2, name: "Smartphone", price: 499.99, image: "phone.jpeg", category: "electronics" },
        { id: 3, name: "Headphones", price: 79.99, image: "headset.jpeg", category: "accessories"},
        { id: 4, name: "TV", price: 399.99, image: "tv.jpeg", category: "electronics" },
        { id: 5, name: "Smartwatch", price: 199.99, image: "watch.jpeg", category: "accessories" },
        { id: 6, name: "Camera", price: 599.99, image: "camera.jpeg", category: "electronics" },
        { id: 7, name: "Monitor", price: 299.99, image: "monitor.jpeg", category: "electronics" },
        { id: 8, name: "Keyboard", price: 49.99, image: "keyboard.jpeg", category: "accessories" },
        { id: 9, name: "Mouse", price: 29.99, image: "mouse.jpeg", category: "accessories" },
        { id: 10, name: "Printer", price: 199.99, image: "printer.jpeg", category: "electronics" },
        { id: 11, name: "Router", price: 89.99, image: "router.jpeg", category: "electronics" },
        { id: 12, name: "Speaker", price: 129.99, image: "speaker.jpeg", category: "accessories" }
    ];
    
    const productList = document.getElementById("product-list");
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
    
    function displayProducts(filteredProducts) {
        productList.innerHTML = "";
        filteredProducts.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("col-md-4", "mb-4");
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-success buy-now" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Buy Now</button>
                        <button class="btn btn-outline-danger add-to-wishlist" data-id="${product.id}">♡</button>
                        
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
        const addToCartButtons = productList.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", function() {
                const productId = parseInt(this.getAttribute("data-id"));
                const product = products.find(p => p.id === productId);
                if (product) {
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];
                    const existingProduct = cart.find(item => item.id === productId);
                    if (existingProduct) {
                        existingProduct.quantity++;
                    } else {
                        cart.push({ ...product, quantity: 1 });
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(`${product.name} has been added to your cart!`);
                }
            });
        });
        
        document.querySelectorAll(".buy-now").forEach(button => {
            button.addEventListener("click", function() {
                const product = {
                    id: this.dataset.id,
                    name: this.dataset.name,
                    price: parseFloat(this.dataset.price),
                    image: this.dataset.image,
                    quantity: 1
                };
                localStorage.setItem("checkout", JSON.stringify([product]));
                window.location.href = "checkout.html";
            });
        });
    }

    function filterAndSortProducts() {
        let filteredProducts = products.filter(product => 
            categoryFilter.value === "all" || product.category === categoryFilter.value
        );
        
        if (sortFilter.value === "price-low") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortFilter.value === "price-high") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        
        displayProducts(filteredProducts);
    }

    categoryFilter.addEventListener("change", filterAndSortProducts);
    sortFilter.addEventListener("change", filterAndSortProducts);
    searchBar.addEventListener("input", function() {
        const query = searchBar.value.toLowerCase();
        displayProducts(products.filter(product => product.name.toLowerCase().includes(query)));
    });
    
    displayProducts(products);    
});

