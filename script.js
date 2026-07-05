document.addEventListener('DOMContentLoaded', () => {
  // Wishlist toggle
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('i');
      if (icon.classList.contains('ph-heart')) {
        icon.classList.remove('ph-heart');
        icon.classList.add('ph-heart-fill');
        btn.style.color = 'var(--primary-red)';
      } else {
        icon.classList.remove('ph-heart-fill');
        icon.classList.add('ph-heart');
        btn.style.color = 'var(--text-muted)';
      }
    });
  });

  // Add to cart functionality
  const addToCartBtns = document.querySelectorAll('.btn-add-cart, .btn-cart-icon');
  const cartBadge = document.querySelector('.cart-badge');
  let cartCount = 0;

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      cartBadge.textContent = cartCount;
      
      // Optional: Add a simple animation or toast notification here
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 150);
    });
  });
});
