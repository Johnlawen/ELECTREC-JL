const fs = require('fs');

const files = ['categories.html', 'index.html', 'product.html', 'sales.html', 'contact.html', 'about.html', 'category-products.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update footer links
    content = content.replace(/<a href="#">גופי תלייה<\/a>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי תלייה') + '">גופי תלייה</a>');
    content = content.replace(/<a href="#">גופי צמודי תקרה<\/a>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי צמודי תקרה') + '">גופי צמודי תקרה</a>');
    content = content.replace(/<a href="#">ספוטים ופסי תאורה<\/a>/g, '<a href="category-products.html?category=' + encodeURIComponent('ספוטים ופסי תאורה') + '">ספוטים ופסי תאורה</a>');
    content = content.replace(/<a href="#">גופי קיר<\/a>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי קיר') + '">גופי קיר</a>');
    content = content.replace(/<a href="#">פרופילים ותאורת לד<\/a>/g, '<a href="category-products.html?category=' + encodeURIComponent('פרופילים ותאורת לד') + '">פרופילים ותאורת לד</a>');

    if (file === 'categories.html') {
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">גופי תלייה<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי תלייה') + '" class="cat-card">$1<h3 class="cat-title">גופי תלייה</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">גופי צמודי תקרה<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי צמודי תקרה') + '" class="cat-card">$1<h3 class="cat-title">גופי צמודי תקרה</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">ספוטים ופסי תאורה<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('ספוטים ופסי תאורה') + '" class="cat-card">$1<h3 class="cat-title">ספוטים ופסי תאורה</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">גופי קיר<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('גופי קיר') + '" class="cat-card">$1<h3 class="cat-title">גופי קיר</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">פרופילים ותאורת לד<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('פרופילים ותאורת לד') + '" class="cat-card">$1<h3 class="cat-title">פרופילים ותאורת לד</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">פתרונות מיוחדים<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('פתרונות מיוחדים') + '" class="cat-card">$1<h3 class="cat-title">פתרונות מיוחדים</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">סרט לד ואביזרים<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('סרט לד ואביזרים') + '" class="cat-card">$1<h3 class="cat-title">סרט לד ואביזרים</h3>');
      content = content.replace(/<a href="#" class="cat-card">([\s\S]*?)<h3 class="cat-title">תאורה חכמה<\/h3>/g, '<a href="category-products.html?category=' + encodeURIComponent('תאורה חכמה') + '" class="cat-card">$1<h3 class="cat-title">תאורה חכמה</h3>');
    }

    fs.writeFileSync(file, content, 'utf8');
  }
});
