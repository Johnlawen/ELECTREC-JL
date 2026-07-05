// ─── PIN LOGIN ────────────────────────────────────────────────────────────────
const ADMIN_PIN = '1234';
let currentPin = '';

function enterPin(digit) {
  if (currentPin.length >= 4) return;
  currentPin += digit;
  updatePinDots();
  document.getElementById('pin-error').textContent = '';
  if (currentPin.length === 4) {
    setTimeout(submitPin, 150);
  }
}

function clearPin() {
  currentPin = currentPin.slice(0, -1);
  updatePinDots();
  document.getElementById('pin-error').textContent = '';
}

function updatePinDots() {
  const dots = document.querySelectorAll('#pin-dots span');
  dots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < currentPin.length);
  });
}

function submitPin() {
  if (currentPin === ADMIN_PIN) {
    document.getElementById('login-overlay').classList.add('hidden');
    document.getElementById('admin-content').classList.add('visible');
    loadDataAndRender();
  } else {
    const box = document.querySelector('.login-box');
    document.getElementById('pin-error').textContent = 'קוד שגוי, נסה שוב';
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 400);
    currentPin = '';
    updatePinDots();
  }
}

// Also support keyboard number input
document.addEventListener('keydown', (e) => {
  if (document.getElementById('login-overlay').classList.contains('hidden')) return;
  if (e.key >= '0' && e.key <= '9') enterPin(e.key);
  if (e.key === 'Backspace') clearPin();
  if (e.key === 'Enter') submitPin();
});

// ─── DATA STORE ───────────────────────────────────────────────────────────────

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'גוף תאורה תלוי דגם ספרולה', price: 1790, originalPrice: 0, stock: 12, category: 'תלייה', description: 'גוף תאורה מעוצב עם עיצוב מודרני ומרשים', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'גוף תאורה תלוי דגם קוואדרו', price: 1690, originalPrice: 0, stock: 8, category: 'תלייה', description: 'עיצוב ריבועי מינימליסטי', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3b5?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'גוף תאורה תלוי דגם לונה', price: 990, originalPrice: 1490, stock: 3, category: 'תלייה', description: 'גוף עגול עם אפקט ירח', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'גוף תאורה תלוי דגם אורפיט', price: 1290, originalPrice: 0, stock: 0, category: 'תלייה', description: 'גוף מרשים לחדרי אוכל', image: 'https://images.unsplash.com/photo-1524061614234-8449637d56ce?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'גוף צמודי תקרה LED', price: 443, originalPrice: 590, stock: 25, category: 'תקרה', description: 'LED חסכוני ובהיר', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'גוף קיר דגם קוביה', price: 247, originalPrice: 290, stock: 15, category: 'קיר', description: 'גוף קיר מינימליסטי לכל חלל', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5e89?q=80&w=400&auto=format&fit=crop' },
];

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'גופי תלייה', icon: 'ph-circles-three', description: 'מגוון עשיר של גופי תלייה מעוצבים', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'גופי צמודי תקרה', icon: 'ph-circle', description: 'עיצוב מודרני, תאורה אחידה ומרשימה', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3b5?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'ספוטים ופסי תאורה', icon: 'ph-webcam', description: 'כוון את האור בדיוק למקום הנכון', image: 'https://images.unsplash.com/photo-1524061614234-8449637d56ce?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'גופי קיר', icon: 'ph-square', description: 'תאורה מעוצבת לכל חלל', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'פרופילים ותאורת לד', icon: 'ph-lines-x', description: 'פתרונות תאורה אינטגרליים', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop' }
];

let localProducts = null;
let localOrders = null;
let localCategories = null;

function getProducts() {
  return localProducts || DEFAULT_PRODUCTS;
}

async function saveProducts(products) {
  localProducts = products;
  // Save to Upstash asynchronously
  try {
    await fetch('https://electrec-jl.vercel.app/api/store?key=jl_products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch (err) {
    console.error("Failed to save products:", err);
  }
}

function getOrders() {
  return localOrders || [];
}

async function saveOrders(orders) {
  localOrders = orders;
  // Save to Upstash asynchronously
  try {
    await fetch('https://electrec-jl.vercel.app/api/store?key=jl_orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders)
    });
  } catch (err) {
    console.error("Failed to save orders:", err);
  }
}

function getNextProductId() {
  const products = getProducts();
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

function getCategories() {
  return localCategories || DEFAULT_CATEGORIES;
}

async function saveCategories(categories) {
  localCategories = categories;
  try {
    await fetch('https://electrec-jl.vercel.app/api/store?key=jl_categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories)
    });
  } catch (err) {
    console.error("Failed to save categories:", err);
  }
}

// ─── INIT DATA FROM UPSTASH ──────────────────────────────────────────────────
async function loadDataAndRender() {
  showToast('טוען נתונים מהשרת...');
  try {
    const pRes = await fetch('https://electrec-jl.vercel.app/api/store?key=jl_products');
    const pData = await pRes.json();
    if (pData && pData.data && pData.data.length > 0) {
      localProducts = pData.data;
    } else {
      localProducts = DEFAULT_PRODUCTS;
      saveProducts(localProducts); // seed
    }

    const oRes = await fetch('https://electrec-jl.vercel.app/api/store?key=jl_orders');
    const oData = await oRes.json();
    if (oData && oData.data && oData.data.length > 0) {
      localOrders = oData.data;
    } else {
      seedDemoOrders();
    }

    const cRes = await fetch('https://electrec-jl.vercel.app/api/store?key=jl_categories');
    const cData = await cRes.json();
    if (cData && cData.data && cData.data.length > 0) {
      localCategories = cData.data;
    } else {
      localCategories = DEFAULT_CATEGORIES;
      saveCategories(localCategories); // seed
    }
  } catch (e) {
    console.error("Failed to load data from Upstash", e);
    localProducts = DEFAULT_PRODUCTS;
    localOrders = [];
    localCategories = DEFAULT_CATEGORIES;
  }
  
  renderDashboard();
  if (currentSection === 'products') renderProducts();
  if (currentSection === 'orders') renderOrders();
  if (currentSection === 'categories') renderCategories();
  if (currentSection === 'sales') renderSales();
}

function seedDemoOrders() {
  const demoOrders = [
    { id: 'ORD-001', customer: { name: 'דוד לוי', phone: '052-1234567', email: 'david@example.com', address: 'רחוב הרצל 10, תל אביב' }, items: [{ productId: 1, name: 'גוף תאורה תלוי דגם ספרולה', price: 1790, qty: 1, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=400&auto=format&fit=crop' }], total: 1790, status: 'pending', date: new Date(Date.now() - 3600000).toISOString() },
    { id: 'ORD-002', customer: { name: 'שרה כהן', phone: '054-9876543', email: 'sara@example.com', address: 'שדרות בן גוריון 5, חיפה' }, items: [{ productId: 5, name: 'גוף צמודי תקרה LED', price: 443, qty: 2, image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=400&auto=format&fit=crop' }], total: 886, status: 'approved', date: new Date(Date.now() - 86400000).toISOString() },
  ];
  saveOrders(demoOrders);
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
let currentSection = 'dashboard';

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const section = item.dataset.section;
    switchSection(section);
  });
});

function switchSection(section) {
  currentSection = section;
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${section}`).classList.add('active');
  const titles = { dashboard: 'לוח בקרה', products: 'ניהול מוצרים', orders: 'ניהול הזמנות', categories: 'ניהול קטגוריות', sales: 'ניהול מבצעים' };
  document.getElementById('page-title').textContent = titles[section];
  const btn = document.getElementById('topbar-action-btn');
  btn.style.display = section === 'products' ? 'flex' : 'none';
  if (section === 'dashboard') renderDashboard();
  if (section === 'products') renderProducts();
  if (section === 'orders') renderOrders();
  if (section === 'categories') renderCategories();
  if (section === 'sales') renderSales();
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function renderDashboard() {
  const products = getProducts();
  const orders = getOrders();
  const pending = orders.filter(o => o.status === 'pending');
  const approved = orders.filter(o => o.status === 'approved');
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);

  document.getElementById('stat-products').textContent = products.length;
  document.getElementById('stat-pending').textContent = pending.length;
  document.getElementById('stat-approved').textContent = approved.length;
  document.getElementById('stat-lowstock').textContent = lowStock.length;
  updateBadges();

  // Recent orders
  const recentEl = document.getElementById('recent-orders-list');
  if (orders.length === 0) { recentEl.innerHTML = '<p class="empty-msg">אין הזמנות עדיין</p>'; }
  else {
    recentEl.innerHTML = orders.slice(-5).reverse().map(o => `
      <div class="recent-order-row">
        <span><strong>${o.id}</strong> — ${o.customer.name}</span>
        <span class="order-status status-${o.status}">${statusLabel(o.status)}</span>
        <span>₪${o.total.toLocaleString()}</span>
      </div>`).join('');
  }

  // Low stock
  const lowEl = document.getElementById('low-stock-list');
  if (lowStock.length === 0) { lowEl.innerHTML = '<p class="empty-msg">מלאי תקין בכל המוצרים</p>'; }
  else {
    lowEl.innerHTML = lowStock.map(p => `
      <div class="low-stock-row">
        <span>${p.name}</span>
        <span class="stock-badge stock-low">${p.stock} נותרו</span>
      </div>`).join('');
  }
}

function updateBadges() {
  const products = getProducts();
  const orders = getOrders();
  document.getElementById('products-count').textContent = products.length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const badge = document.getElementById('orders-count');
  badge.textContent = pending;
  badge.style.display = pending > 0 ? 'inline' : 'none';
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function renderProducts(filter = '') {
  const products = getProducts().filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.category.includes(filter)
  );
  const grid = document.getElementById('products-admin-grid');
  if (products.length === 0) {
    grid.innerHTML = '<p class="empty-msg" style="grid-column:1/-1;text-align:center;padding:3rem 0">לא נמצאו מוצרים</p>';
    return;
  }
  grid.innerHTML = products.map(p => `
    <div class="product-admin-card">
      <div class="product-admin-img">
        <img src="${p.image || 'https://via.placeholder.com/260x180?text=No+Image'}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/260x180?text=No+Image'">
      </div>
      <div class="product-admin-body">
        <div class="product-admin-name">${p.name}</div>
        <div class="product-admin-meta">
          <span class="product-price">₪${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span style="text-decoration:line-through;color:#94a3b8">₪${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span class="stock-badge ${stockClass(p.stock)}">${stockText(p.stock)}</span>
          <span style="font-size:0.82rem;color:#94a3b8">${p.category}</span>
        </div>
      </div>
      <div class="product-admin-actions">
        <button class="btn-icon" onclick="openEditProductModal(${p.id})">
          <i class="ph ph-pencil"></i> עריכה
        </button>
        <button class="btn-icon danger" onclick="openDeleteModal(${p.id}, 'product')">
          <i class="ph ph-trash"></i> מחיקה
        </button>
      </div>
    </div>`).join('');
}

function filterProducts() {
  renderProducts(document.getElementById('product-search').value);
}

function stockClass(s) { return s === 0 ? 'stock-out' : s <= 5 ? 'stock-low' : 'stock-ok'; }
function stockText(s) { return s === 0 ? 'אזל המלאי' : s <= 5 ? `${s} נותרו` : `${s} במלאי`; }

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────
let currentProductImages = [];

function renderImagePreviews() {
  const container = document.getElementById('p-image-previews');
  container.innerHTML = currentProductImages.map((src, idx) => `
    <div class="image-preview-item">
      <img src="${src}">
      <button class="image-preview-remove" onclick="removeProductImage(event, ${idx})"><i class="ph ph-x"></i></button>
    </div>
  `).join('');
}

function removeProductImage(e, idx) {
  e.preventDefault();
  e.stopPropagation();
  currentProductImages.splice(idx, 1);
  renderImagePreviews();
}

// Handle file selection and compression
function handleImageFiles(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 800;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        currentProductImages.push(dataUrl);
        renderImagePreviews();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Drag & Drop Listeners
const dropzone = document.getElementById('p-image-dropzone');
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  handleImageFiles(e.dataTransfer.files);
});
document.getElementById('p-image-input').addEventListener('change', (e) => {
  handleImageFiles(e.target.files);
  e.target.value = ''; // reset
});

function openAddProductModal() {
  document.getElementById('modal-title').textContent = 'הוסף מוצר חדש';
  document.getElementById('edit-product-id').value = '';
  ['p-name','p-price','p-original-price','p-stock','p-description','p-colors','p-sizes','p-sku','p-light-type','p-power','p-color-temp','p-voltage','p-material','p-warranty'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('p-category').value = 'תלייה';
  currentProductImages = [];
  renderImagePreviews();
  document.getElementById('product-modal').classList.add('open');
}
function openEditProductModal(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  document.getElementById('modal-title').textContent = 'עריכת מוצר';
  document.getElementById('edit-product-id').value = id;
  document.getElementById('p-name').value = product.name;
  document.getElementById('p-price').value = product.price;
  document.getElementById('p-original-price').value = product.originalPrice || '';
  document.getElementById('p-stock').value = product.stock;
  document.getElementById('p-category').value = product.category;
  document.getElementById('p-description').value = product.description || '';
  document.getElementById('p-colors').value = product.colors ? product.colors.join(', ') : '';
  document.getElementById('p-sizes').value = product.sizes ? product.sizes.join(', ') : '';
  document.getElementById('p-sku').value = product.sku || '';
  document.getElementById('p-light-type').value = product.lightType || '';
  document.getElementById('p-power').value = product.power || '';
  document.getElementById('p-color-temp').value = product.colorTemp || '';
  document.getElementById('p-voltage').value = product.voltage || '';
  document.getElementById('p-material').value = product.material || '';
  document.getElementById('p-warranty').value = product.warranty || '';
  
  // Load images
  if (product.images && product.images.length > 0) {
    currentProductImages = [...product.images];
  } else if (product.image) {
    currentProductImages = [product.image];
  } else {
    currentProductImages = [];
  }
  renderImagePreviews();
  
  document.getElementById('product-modal').classList.add('open');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('open');
}

function saveProduct() {
  const name = document.getElementById('p-name').value.trim();
  const price = parseFloat(document.getElementById('p-price').value);
  const stock = parseInt(document.getElementById('p-stock').value);
  if (!name || isNaN(price) || isNaN(stock)) { showToast('אנא מלא את כל השדות החובה'); return; }
  const products = getProducts();
  const editId = document.getElementById('edit-product-id').value;
  
  const colorsStr = document.getElementById('p-colors').value.trim();
  const sizesStr = document.getElementById('p-sizes').value.trim();
  const colors = colorsStr ? colorsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
  const sizes = sizesStr ? sizesStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  const productData = {
    name, price, stock,
    originalPrice: parseFloat(document.getElementById('p-original-price').value) || 0,
    category: document.getElementById('p-category').value,
    description: document.getElementById('p-description').value.trim(),
    images: currentProductImages,
    image: currentProductImages.length > 0 ? currentProductImages[0] : '',
    colors,
    sizes,
    sku: document.getElementById('p-sku').value.trim(),
    lightType: document.getElementById('p-light-type').value.trim(),
    power: document.getElementById('p-power').value.trim(),
    colorTemp: document.getElementById('p-color-temp').value.trim(),
    voltage: document.getElementById('p-voltage').value.trim(),
    material: document.getElementById('p-material').value.trim(),
    warranty: document.getElementById('p-warranty').value.trim()
  };
  if (editId) {
    const idx = products.findIndex(p => p.id === parseInt(editId));
    if (idx !== -1) products[idx] = { ...products[idx], ...productData };
    showToast('המוצר עודכן בהצלחה ✓');
  } else {
    products.push({ id: getNextProductId(), ...productData });
    showToast('המוצר נוסף בהצלחה ✓');
  }
  saveProducts(products);
  closeProductModal();
  renderProducts();
  if (currentSection === 'sales') renderSales();
  updateBadges();
}

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────
let deleteTargetId = null;
let deleteTargetType = 'product';

function openDeleteModal(id, type = 'product') { 
  deleteTargetId = id; 
  deleteTargetType = type;
  document.getElementById('delete-modal').classList.add('open'); 
}

function closeDeleteModal() { 
  deleteTargetId = null; 
  document.getElementById('delete-modal').classList.remove('open'); 
}

function confirmDelete() {
  if (!deleteTargetId) return;
  
  if (deleteTargetType === 'product') {
    const products = getProducts().filter(p => p.id !== deleteTargetId);
    saveProducts(products);
    renderProducts();
    if (currentSection === 'sales') renderSales();
    updateBadges();
    showToast('המוצר נמחק');
  } else if (deleteTargetType === 'category') {
    const cats = getCategories().filter(c => c.id !== deleteTargetId);
    saveCategories(cats);
    renderCategories();
    showToast('הקטגוריה נמחקה');
  }
  closeDeleteModal();
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
function renderCategories() {
  const cats = getCategories();
  const grid = document.getElementById('categories-admin-grid');
  if (cats.length === 0) {
    grid.innerHTML = '<p class="empty-msg" style="grid-column:1/-1;text-align:center;padding:3rem 0">לא נמצאו קטגוריות</p>';
    return;
  }
  grid.innerHTML = cats.map(c => `
    <div class="product-admin-card">
      <div class="product-admin-img" style="height:120px">
        <img src="${c.image || 'https://via.placeholder.com/260x180?text=No+Image'}" onerror="this.src='https://via.placeholder.com/260x180?text=No+Image'">
      </div>
      <div class="product-admin-body">
        <div class="product-admin-name" style="display:flex;align-items:center;gap:0.5rem">
          <i class="ph ${c.icon}" style="font-size:1.2rem;color:var(--primary-red)"></i> ${c.name}
        </div>
        <div class="product-admin-meta" style="font-size:0.8rem;color:var(--text-muted)">${c.description}</div>
      </div>
      <div class="product-admin-actions">
        <button class="btn-icon" onclick="openEditCategoryModal(${c.id})"><i class="ph ph-pencil"></i> עריכה</button>
        <button class="btn-icon danger" onclick="openDeleteModal(${c.id}, 'category')"><i class="ph ph-trash"></i> מחיקה</button>
      </div>
    </div>`).join('');
}

// ─── CATEGORIES MODAL LOGIC ────────────────────────────────────────────────
let currentCategoryImages = [];

function renderCategoryPreviews() {
  const container = document.getElementById('c-image-previews');
  container.innerHTML = currentCategoryImages.map((src, idx) => `
    <div class="image-preview-item">
      <img src="${src}">
      <button class="image-preview-remove" onclick="removeCategoryImage(event, ${idx})"><i class="ph ph-x"></i></button>
    </div>
  `).join('');
}

function removeCategoryImage(e, idx) {
  e.preventDefault();
  e.stopPropagation();
  currentCategoryImages.splice(idx, 1);
  renderCategoryPreviews();
}

function handleCategoryFiles(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 800;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        currentCategoryImages = [dataUrl]; // Only keep one image for category
        renderCategoryPreviews();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const catDropzone = document.getElementById('c-image-dropzone');
catDropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  catDropzone.classList.add('dragover');
});
catDropzone.addEventListener('dragleave', () => catDropzone.classList.remove('dragover'));
catDropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  catDropzone.classList.remove('dragover');
  handleCategoryFiles(e.dataTransfer.files);
});
document.getElementById('c-image-input').addEventListener('change', (e) => {
  handleCategoryFiles(e.target.files);
  e.target.value = '';
});

function openAddCategoryModal() {
  document.getElementById('cat-modal-title').textContent = 'הוסף קטגוריה חדשה';
  document.getElementById('edit-category-id').value = '';
  ['c-name','c-icon','c-description'].forEach(id => document.getElementById(id).value = '');
  currentCategoryImages = [];
  renderCategoryPreviews();
  document.getElementById('category-modal').classList.add('open');
}

function openEditCategoryModal(id) {
  const cat = getCategories().find(c => c.id === id);
  if (!cat) return;
  document.getElementById('cat-modal-title').textContent = 'עריכת קטגוריה';
  document.getElementById('edit-category-id').value = id;
  document.getElementById('c-name').value = cat.name;
  document.getElementById('c-icon').value = cat.icon || '';
  document.getElementById('c-description').value = cat.description || '';
  
  if (cat.image) {
    currentCategoryImages = [cat.image];
  } else {
    currentCategoryImages = [];
  }
  renderCategoryPreviews();
  
  document.getElementById('category-modal').classList.add('open');
}

function closeCategoryModal() {
  document.getElementById('category-modal').classList.remove('open');
}

function saveCategory() {
  const name = document.getElementById('c-name').value.trim();
  if (!name) { showToast('שם קטגוריה חובה'); return; }
  const cats = getCategories();
  const editId = document.getElementById('edit-category-id').value;
  const catData = {
    name,
    icon: document.getElementById('c-icon').value.trim() || 'ph-folder',
    description: document.getElementById('c-description').value.trim(),
    image: currentCategoryImages.length > 0 ? currentCategoryImages[0] : ''
  };
  if (editId) {
    const idx = cats.findIndex(c => c.id === parseInt(editId));
    if (idx !== -1) cats[idx] = { ...cats[idx], ...catData };
    showToast('הקטגוריה עודכנה ✓');
  } else {
    const newId = cats.length > 0 ? Math.max(...cats.map(c => c.id)) + 1 : 1;
    cats.push({ id: newId, ...catData });
    showToast('קטגוריה חדשה נוספה ✓');
  }
  saveCategories(cats);
  closeCategoryModal();
  renderCategories();
}

// ─── SALES ──────────────────────────────────────────────────────────────
function renderSales() {
  // Sales are products with originalPrice > price
  const sales = getProducts().filter(p => p.originalPrice > p.price);
  const grid = document.getElementById('sales-admin-grid');
  if (sales.length === 0) {
    grid.innerHTML = '<p class="empty-msg" style="grid-column:1/-1;text-align:center;padding:3rem 0">אין מוצרים במבצע כרגע.<br>כדי להוסיף מוצר למבצע, ערוך את המוצר בניהול המוצרים והוסף "מחיר לפני הנחה".</p>';
    return;
  }
  grid.innerHTML = sales.map(p => {
    const discount = Math.round((1 - (p.price / p.originalPrice)) * 100);
    return `
    <div class="product-admin-card">
      <div class="product-admin-img">
        <div style="position:absolute;top:10px;right:10px;background:var(--primary-red);color:white;padding:2px 8px;border-radius:12px;font-weight:bold;font-size:0.8rem;z-index:2">${discount}%-</div>
        <img src="${p.image || 'https://via.placeholder.com/260x180?text=No+Image'}" onerror="this.src='https://via.placeholder.com/260x180?text=No+Image'">
      </div>
      <div class="product-admin-body">
        <div class="product-admin-name">${p.name}</div>
        <div class="product-admin-meta">
          <span class="product-price">₪${p.price.toLocaleString()}</span>
          <span style="text-decoration:line-through;color:#94a3b8">₪${p.originalPrice.toLocaleString()}</span>
        </div>
      </div>
      <div class="product-admin-actions">
        <button class="btn-icon" onclick="openEditProductModal(${p.id})"><i class="ph ph-pencil"></i> שנה מחיר/מבצע</button>
      </div>
    </div>`
  }).join('');
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────
let currentOrderFilter = 'all';

function filterOrders(filter, btn) {
  currentOrderFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderOrders();
}

function renderOrders() {
  let orders = getOrders();
  if (currentOrderFilter !== 'all') orders = orders.filter(o => o.status === currentOrderFilter);
  orders = [...orders].reverse();
  const list = document.getElementById('orders-list');
  if (orders.length === 0) { list.innerHTML = '<p class="empty-msg">אין הזמנות להצגה</p>'; return; }
  list.innerHTML = orders.map(o => `
    <div class="order-card ${o.status}" onclick="openOrderModal('${o.id}')">
      <span class="order-id">${o.id}</span>
      <div class="order-customer">
        <strong>${o.customer.name}</strong>
        <span>${o.customer.phone}</span>
      </div>
      <span class="order-total">₪${o.total.toLocaleString()}</span>
      <span class="order-status status-${o.status}">${statusLabel(o.status)}</span>
      <span class="order-date">${formatDate(o.date)}</span>
    </div>`).join('');
}

function openOrderModal(orderId) {
  const order = getOrders().find(o => o.id === orderId);
  if (!order) return;
  document.getElementById('order-modal-body').innerHTML = `
    <div>
      <div class="order-detail-row"><strong>מספר הזמנה</strong><span>${order.id}</span></div>
      <div class="order-detail-row"><strong>שם לקוח</strong><span>${order.customer.name}</span></div>
      <div class="order-detail-row"><strong>טלפון</strong><span>${order.customer.phone}</span></div>
      <div class="order-detail-row"><strong>אימייל</strong><span>${order.customer.email || '-'}</span></div>
      <div class="order-detail-row"><strong>כתובת</strong><span>${order.customer.address || '-'}</span></div>
      <div class="order-detail-row"><strong>סטטוס</strong><span class="order-status status-${order.status}">${statusLabel(order.status)}</span></div>
      <div class="order-detail-row"><strong>תאריך</strong><span>${formatDate(order.date)}</span></div>
      <div class="order-detail-row"><strong>סה"כ</strong><span style="font-weight:800;color:#b91c1c">₪${order.total.toLocaleString()}</span></div>
    </div>
    <div class="order-items-list">
      <h4 style="margin:1rem 0 0.5rem;font-size:0.95rem">מוצרים שהוזמנו</h4>
      ${order.items.map(item => `
        <div class="order-item-row">
          <img src="${item.image || ''}" onerror="this.style.display='none'" alt="${item.name}">
          <div class="order-item-info">
            <strong>${item.name}</strong>
            <span>כמות: ${item.qty} | ₪${item.price.toLocaleString()} ליחידה</span>
          </div>
          <span style="font-weight:700">₪${(item.price * item.qty).toLocaleString()}</span>
        </div>`).join('')}
    </div>`;

  const footer = document.getElementById('order-modal-footer');
  if (order.status === 'pending') {
    footer.innerHTML = `
      <button class="btn-admin-secondary" onclick="closeOrderModal()">סגור</button>
      <button class="btn-danger" onclick="updateOrderStatus('${order.id}','rejected')">דחה הזמנה</button>
      <button class="btn-admin-primary" onclick="updateOrderStatus('${order.id}','approved')"><i class="ph ph-check"></i> אשר הזמנה</button>`;
  } else {
    footer.innerHTML = `
      <button class="btn-admin-secondary" onclick="closeOrderModal()">סגור</button>
      ${order.status !== 'pending' ? `<button class="btn-admin-secondary" onclick="updateOrderStatus('${order.id}','pending')">החזר לממתין</button>` : ''}`;
  }
  document.getElementById('order-modal').classList.add('open');
}
function closeOrderModal() { document.getElementById('order-modal').classList.remove('open'); }

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) orders[idx].status = newStatus;
  saveOrders(orders);
  closeOrderModal();
  renderOrders();
  updateBadges();
  const labels = { approved: 'ההזמנה אושרה ✓', rejected: 'ההזמנה נדחתה', pending: 'ההזמנה הוחזרה לממתין' };
  showToast(labels[newStatus] || 'עודכן');
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function statusLabel(s) { return { pending: 'ממתין', approved: 'אושר', rejected: 'נדחה' }[s] || s; }
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('he-IL', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' });
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
// Data is now loaded dynamically in loadDataAndRender() when the user logs in.
