document.addEventListener('DOMContentLoaded', () => {

  // ─── CART ────────────────────────────────────────────────────────────────────
  const cartBadge = document.querySelector('.cart-badge');
  let cartCount = 0;

  function addToCart(btn) {
    cartCount++;
    if (cartBadge) cartBadge.textContent = cartCount;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
  }

  // ─── RENDER PRODUCT CARD ─────────────────────────────────────────────────────
  function renderProductCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const hasDiscount = p.originalPrice && p.originalPrice > p.price;
    const placeholderImg = 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=400&auto=format&fit=crop';

    card.innerHTML = `
      <button class="wishlist-btn"><i class="ph ph-heart"></i></button>
      <div class="product-img">
        <img src="${p.image || placeholderImg}" alt="${p.name}"
          onerror="this.src='${placeholderImg}'">
        ${p.stock === 0 ? '<div class="out-of-stock-badge">אזל המלאי</div>' : ''}
      </div>
      <h3 class="product-title">${p.name}</h3>
      <div class="product-price-wrap">
        <div class="product-price">₪${Number(p.price).toLocaleString()}</div>
        ${hasDiscount ? `<div class="product-original-price">₪${Number(p.originalPrice).toLocaleString()}</div>` : ''}
      </div>
      <div class="product-actions">
        <button class="btn btn-add-cart" ${p.stock === 0 ? 'disabled' : ''}>
          ${p.stock === 0 ? 'אזל המלאי' : 'הוסף לסל'}
        </button>
        <button class="btn btn-cart-icon" ${p.stock === 0 ? 'disabled' : ''}>
          <i class="ph ph-shopping-cart"></i>
        </button>
      </div>
    `;

    // Wishlist toggle
    const wishBtn = card.querySelector('.wishlist-btn');
    wishBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = wishBtn.querySelector('i');
      const isWished = icon.classList.contains('ph-heart-fill');
      icon.classList.toggle('ph-heart', isWished);
      icon.classList.toggle('ph-heart-fill', !isWished);
      wishBtn.style.color = isWished ? '' : 'var(--primary-red)';
    });

    // Add to cart buttons
    card.querySelectorAll('.btn-add-cart, .btn-cart-icon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!btn.disabled) addToCart(btn);
      });
    });

    return card;
  }

  // ─── LOAD & RENDER FEATURED PRODUCTS FROM API ─────────────────────────────
  const grid = document.getElementById('featured-products-grid');

  if (grid) {
    fetch('/api/store?key=jl_products')
      .then(res => res.json())
      .then(data => {
        const products = data.data;

        // Clear skeleton placeholders
        grid.innerHTML = '';

        if (!products || products.length === 0) {
          grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#666">אין מוצרים להצגה</p>';
          return;
        }

        // Show first 4 products that are in stock (or first 4 if all out)
        const featured = products.slice(0, 4);
        featured.forEach(p => grid.appendChild(renderProductCard(p)));
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#666">שגיאה בטעינת המוצרים</p>';
      });
  }

});
