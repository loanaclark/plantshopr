const plants = [
        { id: 1, name: 'Fiddle Leaf Fig', category: 'Ferns', price: 35, img: 'https://via.placeholder.com/100?text=Fiddle+Leaf+Fig' },
        { id: 2, name: 'Snake Plant', category: 'Succulents', price: 25, img: 'https://via.placeholder.com/100?text=Snake+Plant' },
        { id: 3, name: 'Monstera', category: 'Ferns', price: 40, img: 'https://via.placeholder.com/100?text=Monstera' },
        { id: 4, name: 'Aloe Vera', category: 'Succulents', price: 20, img: 'https://via.placeholder.com/100?text=Aloe+Vera' },
        { id: 5, name: 'Peace Lily', category: 'Flowering', price: 30, img: 'https://via.placeholder.com/100?text=Peace+Lily' },
        { id: 6, name: 'Orchid', category: 'Flowering', price: 50, img: 'https://via.placeholder.com/100?text=Orchid' },
    ];

    
    let cart = [];


    const sections = {
        landing: document.getElementById('landing'),
        products: document.getElementById('products'),
        cart: document.getElementById('cart'),
    };
    const cartCountSpan = document.getElementById('cart-count');
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsSpan = document.getElementById('total-items');
    const totalPriceSpan = document.getElementById('total-price');

    document.getElementById('btn-get-started').addEventListener('click', () => {
        showSection('products');
    });
    document.getElementById('nav-products').addEventListener('click', e => {
        e.preventDefault();
        showSection('products');
    });
    document.getElementById('nav-cart').addEventListener('click', e => {
        e.preventDefault();
        showSection('cart');
    });
    document.getElementById('continue-btn').addEventListener('click', () => {
        showSection('products');
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Coming Soon!');
    });
    
    function showSection(name) {
        for (const key in sections) {
        if (key === name) {
            sections[key].classList.add('active');
        } else {
            sections[key].classList.remove('active');
        }
        }
        if (name === 'products') {
        renderProducts();
        } else if (name === 'cart') {
        renderCart();
        }
    }

    function renderProducts() {
        productsContainer.innerHTML = '';

    
        const categories = [...new Set(plants.map(p => p.category))];

        categories.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category';

        const catTitle = document.createElement('h3');
        catTitle.textContent = category;
        catDiv.appendChild(catTitle);

        const prodList = document.createElement('div');
        prodList.className = 'products-list';

        plants.filter(p => p.category === category).forEach(plant => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const img = document.createElement('img');
            img.src = plant.img;
            img.alt = plant.name;
            card.appendChild(img);

            const name = document.createElement('h4');
            name.textContent = plant.name;
            card.appendChild(name);

            const price = document.createElement('p');
            price.textContent = `$${plant.price}`;
            card.appendChild(price);

            const btn = document.createElement('button');
            btn.textContent = isInCart(plant.id) ? 'Added' : 'Add to Cart';
            btn.disabled = isInCart(plant.id);
            btn.addEventListener('click', () => {
            addToCart(plant.id);
            btn.textContent = 'Added';
            btn.disabled = true;
            });
            card.appendChild(btn);

            prodList.appendChild(card);
        });

        catDiv.appendChild(prodList);
        productsContainer.appendChild(catDiv);
        });
    }

    function isInCart(productId) {
        return cart.some(item => item.id === productId);
    }

    function addToCart(productId) {
        const product = plants.find(p => p.id === productId);
        if (!product) return;
        if (!isInCart(productId)) {
        cart.push({ ...product, quantity: 1 });
        updateCartCount();
        }
    }

    function updateCartCount() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalCount;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
        cartItemsContainer.textContent = 'Your cart is empty.';
        totalItemsSpan.textContent = 0;
        totalPriceSpan.textContent = '0.00';
        return;
        }
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        cartItem.appendChild(img);

        const details = document.createElement('div');
        details.className = 'cart-item-details';

        const name = document.createElement('h4');
        name.textContent = item.name;
        details.appendChild(name);

        const unitPrice = document.createElement('p');
        unitPrice.textContent = `Unit Price: $${item.price}`;
        details.appendChild(unitPrice);

        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${item.quantity}`;
        details.appendChild(quantity);

        cartItem.appendChild(details);

        const controls = document.createElement('div');
        controls.className = 'cart-item-controls';

        const incBtn = document.createElement('button');
        incBtn.textContent = '+';
        incBtn.addEventListener('click', () => {
            item.quantity++;
            updateCartCount();
            renderCart();
        });
        controls.appendChild(incBtn);

        const decBtn = document.createElement('button');
        decBtn.textContent = '-';
        decBtn.disabled = item.quantity <= 1;
        decBtn.addEventListener('click', () => {
            if (item.quantity > 1) {
            item.quantity--;
            updateCartCount();
            renderCart();
            }
        });
        controls.appendChild(decBtn);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete';
        delBtn.addEventListener('click', () => {
            cart = cart.filter(i => i.id !== item.id);
            updateCartCount();
            renderCart();
            renderProducts(); 
        });
        controls.appendChild(delBtn);

        cartItem.appendChild(controls);
        cartItemsContainer.appendChild(cartItem);
        });

        totalItemsSpan.textContent = totalItems;
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }


    showSection('landing');
    updateCartCount();
