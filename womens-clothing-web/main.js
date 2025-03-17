// Product data 
const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500",
        category: "dresses"
    },
    {
        id: 2,
        name: "Classic Blazer",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
        category: "office-wear"
    },
    {
        id: 3,
        name: "Elegant Evening Gown",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
        category: "dresses"
    },
    {
        id: 4,
        name: "Summer Collection Set",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "sets"
    },
    {
        id: 5,
        name: "Casual Denim Set",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500",
        category: "casual"
    },
    {
        id: 6,
        name: "Bohemian Maxi Dress",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "dresses"
    }
];

// DOM Elements
const userIcon = document.getElementById('userIcon');
const authModal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-forms form');
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.querySelector('.close-cart-modal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const categoryFilter = document.getElementById('categoryFilter');

// Cart functionality
let cart = [];

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function updateCartDisplay() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
        </div>
    `).join('');
    cartTotal.textContent = total.toFixed(2);
}

// Cart Modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Authentication Modal
userIcon.addEventListener('click', () => {
    authModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Auth Tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        const formId = tab.dataset.tab + 'Form';
        document.getElementById(formId).classList.add('active');
    });
});

// Product Display
function displayProducts(filtered = false) {
    const selectedCategory = categoryFilter?.value;
    const displayedProducts = filtered && selectedCategory !== 'all' 
        ? products.filter(p => p.category === selectedCategory)
        : products;

    productGrid.innerHTML = displayedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="wishlist-btn"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Product added to cart!');
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
        showNotification('Product removed from cart!');
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification('Thank you for subscribing!');
    e.target.reset();
});

// Category Filter
if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        displayProducts(true);
    });
}

// Initialize
displayProducts();
updateCartCount();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .section-title, .feature-card').forEach(element => {
    observer.observe(element);
});