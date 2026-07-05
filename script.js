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
      <a href="product.html?id=${p.id}" style="text-decoration: none; color: inherit;">
        <div class="product-img">
          <img src="${p.image || placeholderImg}" alt="${p.name}"
            onerror="this.src='${placeholderImg}'">
          ${p.stock === 0 ? '<div class="out-of-stock-badge">אזל המלאי</div>' : ''}
        </div>
        <h3 class="product-title">${p.name}</h3>
      </a>
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

  // ─── LOAD & RENDER PRODUCT DETAILS (product.html) ─────────────────────────
  const productDetailContainer = document.getElementById('product-detail-container');
  if (productDetailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
      productDetailContainer.innerHTML = '<div class="text-center" style="padding: 4rem 0;"><h2>מוצר לא נמצא</h2><a href="index.html" class="btn btn-primary" style="margin-top:2rem">חזרה לדף הבית</a></div>';
      return;
    }

    fetch('/api/store?key=jl_products')
      .then(res => res.json())
      .then(data => {
        const products = data.data;
        const p = products.find(prod => prod.id === productId);

        if (!p) {
          productDetailContainer.innerHTML = '<div class="text-center" style="padding: 4rem 0;"><h2>מוצר לא נמצא</h2><a href="index.html" class="btn btn-primary" style="margin-top:2rem">חזרה לדף הבית</a></div>';
          return;
        }

        const images = (p.images && p.images.length > 0) ? p.images : [p.image || 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=400&auto=format&fit=crop'];
        const hasDiscount = p.originalPrice && p.originalPrice > p.price;

        productDetailContainer.innerHTML = `
          <div class="product-detail-grid">
            <div class="product-gallery">
              <div class="main-image-wrap">
                <img id="main-product-img" src="${images[0]}" alt="${p.name}">
              </div>
              ${images.length > 1 ? `
              <div class="thumbnails">
                ${images.map((img, idx) => `
                  <div class="thumbnail ${idx === 0 ? 'active' : ''}" onclick="document.getElementById('main-product-img').src='${img}'; document.querySelectorAll('.thumbnail').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                    <img src="${img}" alt="Thumbnail">
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
            
            <div class="product-info">
              <h1>${p.name}</h1>
              <div style="color: var(--text-muted); font-size: 1.1rem; margin-top:-0.5rem; margin-bottom: 1rem;">קטגוריה: ${p.category || 'כללי'}</div>
              
              <div class="price">
                <span>₪${Number(p.price).toLocaleString()}</span>
                ${hasDiscount ? `<span class="original-price">₪${Number(p.originalPrice).toLocaleString()}</span>` : ''}
              </div>
              
              ${p.stock === 0 ? '<div style="color:var(--primary-red);font-weight:700;font-size:1.1rem;margin:1rem 0">אזל המלאי</div>' : `<div style="color:#16a34a;font-weight:700;margin:1rem 0">✓ במלאי (${p.stock} יחידות)</div>`}
              
              <p class="desc">${p.description ? p.description.replace(/\\n/g, '<br>') : 'אין תיאור למוצר זה.'}</p>
              
              <div style="display:flex; gap:1rem; margin-top:2rem;">
                <button class="btn btn-primary" style="flex:1;font-size:1.2rem;padding:1rem" ${p.stock === 0 ? 'disabled' : ''} onclick="this.textContent='נוסף לסל ✓'; setTimeout(()=>this.textContent='הוסף לסל', 2000);">
                  <i class="ph ph-shopping-cart" style="margin-left:0.5rem"></i> ${p.stock === 0 ? 'אזל המלאי' : 'הוסף לסל'}
                </button>
                <button class="btn btn-outline" style="width:60px;display:flex;align-items:center;justify-content:center;font-size:1.5rem">
                  <i class="ph ph-heart"></i>
                </button>
              </div>
              
              <div style="margin-top: 3rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                <div style="display:flex; gap:1rem; align-items:center; color: var(--text-muted);">
                  <i class="ph ph-truck" style="font-size: 1.5rem"></i>
                  <span>משלוח מהיר עד הבית (3-5 ימי עסקים)</span>
                </div>
                <div style="display:flex; gap:1rem; align-items:center; color: var(--text-muted); margin-top: 1rem;">
                  <i class="ph ph-shield-check" style="font-size: 1.5rem"></i>
                  <span>אחריות לשנה על כל גופי התאורה</span>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .catch(err => {
        console.error(err);
        productDetailContainer.innerHTML = '<p class="text-center">אירעה שגיאה בטעינת המוצר.</p>';
      });
  }

});
