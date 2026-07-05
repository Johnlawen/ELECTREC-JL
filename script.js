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
    
    const allImages = (p.images && p.images.length > 0) ? p.images : [p.image || placeholderImg];
    const firstImg = allImages[0];
    const secondImg = allImages.length > 1 ? allImages[1] : null;

    card.innerHTML = `
      <div class="card-clickable-area" style="cursor:pointer;" onclick="window.location.href='product?id=${p.id}'">
        <div class="product-img">
          <img src="${firstImg}" alt="${p.name}" class="primary-img" onerror="this.src='${placeholderImg}'">
          ${secondImg ? `<img src="${secondImg}" alt="${p.name}" class="secondary-img" onerror="this.src='${placeholderImg}'">` : ''}
          ${p.stock === 0 ? '<div class="out-of-stock-badge">אזל המלאי</div>' : ''}
        </div>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-price-wrap">
          <div class="product-price">₪${Number(p.price).toLocaleString()}</div>
          ${hasDiscount ? `<div class="product-original-price">₪${Number(p.originalPrice).toLocaleString()}</div>` : ''}
        </div>
      </div>
      <button class="wishlist-btn"><i class="ph ph-heart"></i></button>
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
        e.stopPropagation();
        if (!btn.disabled) addToCart(btn);
      });
    });

    return card;
  }

  // ─── LOAD & RENDER FEATURED PRODUCTS FROM API ─────────────────────────────
  const grid = document.getElementById('featured-products-grid');

  if (grid) {
    fetch('https://electrec-jl.vercel.app/api/store?key=jl_products')
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

  // ─── LOAD & RENDER SALES PAGE (sales.html) ─────────────────────────────────
  const salesGrid = document.querySelector('.sales-grid');
  if (salesGrid && window.location.pathname.includes('sales')) {
    fetch('https://electrec-jl.vercel.app/api/store?key=jl_products')
      .then(res => res.json())
      .then(data => {
        const products = data.data;
        salesGrid.innerHTML = ''; // Clear hardcoded
        
        if (!products || products.length === 0) {
          salesGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#666">אין מבצעים כרגע</p>';
          return;
        }

        const salesProducts = products.filter(p => p.originalPrice > p.price);
        
        if (salesProducts.length === 0) {
          salesGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#666">אין מבצעים כרגע</p>';
          return;
        }

        salesProducts.forEach(p => {
          // Wrap them in our standard product card or the sale card styling
          // For consistency, we can use renderProductCard but maybe tweak styling if needed,
          // but renderProductCard works perfectly.
          const card = renderProductCard(p);
          salesGrid.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Failed to load sales:', err);
        salesGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#666">שגיאה בטעינת מבצעים</p>';
      });
  }

  // ─── LOAD & RENDER CATEGORIES PAGE (categories.html) ──────────────────────
  const catGrid = document.querySelector('.category-cards-grid');
  if (catGrid && window.location.pathname.includes('categories')) {
    fetch('https://electrec-jl.vercel.app/api/store?key=jl_categories')
      .then(res => res.json())
      .then(data => {
        const cats = data.data;
        if (!cats || cats.length === 0) return; // leave hardcoded if empty
        
        catGrid.innerHTML = cats.map(c => `
          <a href="#" class="cat-card">
            <div class="cat-card-img">
              <img src="${c.image || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${c.name}">
            </div>
            <div class="cat-card-content">
              <div class="cat-card-header">
                <div class="cat-title-wrap">
                  <i class="ph ${c.icon || 'ph-folder'} cat-icon"></i>
                  <h3 class="cat-title">${c.name}</h3>
                </div>
                <i class="ph ph-caret-left cat-arrow"></i>
              </div>
              <p class="cat-desc">${c.description || ''}</p>
            </div>
          </a>
        `).join('');
      })
      .catch(err => console.error('Failed to load categories:', err));
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

    fetch('https://electrec-jl.vercel.app/api/store?key=jl_products')
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

        const colorMap = {
          'שחור': '#000000',
          'זהב': '#eab308',
          'לבן': '#ffffff',
          'כסף': '#c0c0c0',
          'ברונזה': '#cd7f32',
          'אפור': '#808080',
          'עץ': '#8b5a2b',
          'קפה': '#6f4e37',
          'שקוף': 'rgba(255,255,255,0.4)'
        };

        const getColorStyle = (c) => {
          const clean = c.trim();
          const hex = colorMap[clean] || '#cbd5e1';
          const border = clean === 'לבן' ? 'border: 1px solid #cbd5e1;' : '';
          return `background-color: ${hex}; ${border}`;
        };

        productDetailContainer.innerHTML = `
          <div class="breadcrumb-nav">
            <a href="index.html">דף הבית</a>
            <i class="ph ph-caret-left"></i>
            <a href="categories.html">${p.category || 'כללי'}</a>
            <i class="ph ph-caret-left"></i>
            <span class="current">${p.name}</span>
          </div>

          <div class="product-top-grid">
            <div class="product-images-section">
              ${images.length > 1 ? `
              <div class="thumbnail-list">
                ${images.map((img, idx) => `
                  <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="document.getElementById('main-product-img').src='${img}'; document.querySelectorAll('.thumb-item').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                    <img src="${img}" alt="Thumbnail">
                  </div>
                `).join('')}
              </div>
              ` : `
              <div class="thumbnail-list">
                <div class="thumb-item active"><img src="${images[0]}" alt="Thumbnail"></div>
              </div>
              `}
              <div class="main-image">
                <img id="main-product-img" src="${images[0]}" alt="${p.name}">
              </div>
            </div>
            
            <div class="product-info-section">
              <div class="wishlist-icon-top">
                <i class="ph ph-heart"></i>
              </div>
              
              <div class="category-tag">${p.category || 'כללי'}</div>
              <h1 class="product-main-title">${p.name}</h1>
              
              <div class="product-reviews">
                <div class="stars">
                  <i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i>
                </div>
                <span class="review-count">(24 ביקורות)</span>
              </div>

              <p class="product-short-desc">${p.description ? p.description.replace(/\\n/g, '<br>') : 'גוף תאורה מעוצב ואיכותי, מתאים למגוון חללים להשלמת המראה המודרני.'}</p>

              <div class="product-price-row">
                ${hasDiscount ? `<div class="discount-badge">-${Math.round((1 - p.price/p.originalPrice)*100)}%</div>` : ''}
                <div class="current-price">₪${Number(p.price).toLocaleString()}</div>
                ${hasDiscount ? `<div class="old-price">₪${Number(p.originalPrice).toLocaleString()}</div>` : ''}
              </div>
              <div class="tax-shipping-note">כולל מע"מ | משלוח חינם לכל הארץ</div>

              <div class="divider"></div>

              ${p.colors && p.colors.length > 0 ? `
              <div class="variant-group">
                <label>צבע גוף תאורה</label>
                <div class="variant-options colors">
                  ${p.colors.map((c, idx) => `
                    <button class="variant-btn ${idx === 0 ? 'active' : ''}" onclick="document.querySelectorAll('.variant-options.colors .variant-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');">
                      <span class="color-dot" style="${getColorStyle(c)}"></span> ${c}
                    </button>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              
              ${p.sizes && p.sizes.length > 0 ? `
              <div class="variant-group">
                <label>מידה</label>
                <div class="variant-options sizes">
                  ${p.sizes.map((s, idx) => `
                    <button class="variant-btn ${idx === 0 ? 'active' : ''}" onclick="document.querySelectorAll('.variant-options.sizes .variant-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');">
                      ${s}
                    </button>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              ${p.stock === 0 ? '<div style="color:var(--primary-red);font-weight:700;font-size:1.1rem;margin:1rem 0">אזל המלאי</div>' : ''}

              <div class="quantity-add-row">
                 <div class="quantity-selector">
                   <button class="qty-btn" onclick="let inp=this.nextElementSibling; if(inp.value>1)inp.value--">-</button>
                   <input type="text" value="1" class="qty-input" readonly>
                   <button class="qty-btn" onclick="let inp=this.previousElementSibling; inp.value++">+</button>
                 </div>
                 <button class="btn-add-main" ${p.stock === 0 ? 'disabled' : ''} onclick="this.innerHTML='<i class=\\'ph ph-check\\'></i> נוסף לסל'; setTimeout(()=>this.innerHTML='<i class=\\'ph ph-shopping-cart\\'></i> הוסף לסל', 2000);">
                   <i class="ph ph-shopping-cart"></i> ${p.stock === 0 ? 'אזל המלאי' : 'הוסף לסל'}
                 </button>
              </div>
              <button class="btn-buy-now" ${p.stock === 0 ? 'disabled' : ''}>קנה עכשיו</button>

              <div class="trust-badges-box">
                <div class="trust-badge">
                  <i class="ph ph-truck"></i>
                  <div class="trust-text">
                    <strong>משלוח מהיר</strong>
                    <span>לכל חלקי הארץ</span>
                  </div>
                </div>
                <div class="trust-badge">
                  <i class="ph ph-shield-check"></i>
                  <div class="trust-text">
                    <strong>אחריות מלאה</strong>
                    <span>שקט נפשי</span>
                  </div>
                </div>
                <div class="trust-badge">
                  <i class="ph ph-diamond"></i>
                  <div class="trust-text">
                    <strong>איכות ללא פשרות</strong>
                    <span>חומרים מובחרים</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="product-bottom-grid">
            <div class="technical-details">
              <h3>פרטים טכניים</h3>
              <div class="tech-table">
                <div class="tech-row"><span>מק"ט</span><strong>${p.sku || `JL-${p.id}`}</strong></div>
                ${p.lightType ? `<div class="tech-row"><span>סוג תאורה</span><strong>${p.lightType}</strong></div>` : ''}
                ${p.power ? `<div class="tech-row"><span>הספק</span><strong>${p.power}</strong></div>` : ''}
                ${p.colorTemp ? `<div class="tech-row"><span>גוון אור</span><strong>${p.colorTemp}</strong></div>` : ''}
                ${p.voltage ? `<div class="tech-row"><span>מתח</span><strong>${p.voltage}</strong></div>` : ''}
                ${p.material ? `<div class="tech-row"><span>חומר</span><strong>${p.material}</strong></div>` : ''}
                ${p.warranty ? `<div class="tech-row"><span>אחריות</span><strong>${p.warranty}</strong></div>` : ''}
              </div>
            </div>

            <div class="product-bottom-section">
              <div class="product-tabs-header">
                <button class="tab-btn active" onclick="document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active'); document.getElementById('tab-desc').style.display='block'; document.getElementById('tab-ship').style.display='none';">תיאור המוצר</button>
                <button class="tab-btn" onclick="document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active'); document.getElementById('tab-desc').style.display='none'; document.getElementById('tab-ship').style.display='block';">משלוחים והחזרות</button>
              </div>
              <div class="tab-content" id="tab-desc">
                <p>${p.description ? p.description.replace(/\\n/g, '<br>') : 'גוף תאורה מעוצב ואיכותי להשלמת המראה המודרני בחלל החדר. עשוי חומרים עמידים עם פיזור אור אחיד ונעים.'}</p>
                <p style="margin-top:1rem;">לקבלת הצעת מחיר לכמויות גדולות או לפרויקטים, ניתן ליצור קשר עם שירות הלקוחות שלנו.</p>
              </div>
              <div class="tab-content" id="tab-ship" style="display:none;">
                <p><strong>משלוח עד הבית:</strong><br>חינם להזמנות מעל 500 ₪. זמן אספקה עד 5 ימי עסקים.</p>
                <p style="margin-top:1rem;"><strong>איסוף עצמי:</strong><br>ניתן לאסוף מהסניף שלנו בנצרת בתאום מראש.</p>
                <p style="margin-top:1rem;"><strong>החזרות:</strong><br>ניתן להחזיר מוצר באריזתו המקורית תוך 14 יום מקבלתו.</p>
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
