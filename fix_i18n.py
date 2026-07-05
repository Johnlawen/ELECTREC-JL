import os

html_files = ["index.html", "categories.html", "sales.html", "contact.html", "about.html", "product.html"]

def replace_all(content, replacements):
    for old, new in replacements:
        content = content.replace(old, new)
    return content

replacements = [
    (
        '<input type="text" placeholder="חיפוש מוצרים...">',
        '<input type="text" data-i18n-placeholder="searchPlaceholder" placeholder="חיפוש מוצרים...">'
    ),
    (
        '<li><a href="index.html">דף הבית</a></li>',
        '<li><a href="index.html" data-i18n="navHome">דף הבית</a></li>'
    ),
    (
        '<li><a href="index.html" class="active">דף הבית</a></li>',
        '<li><a href="index.html" class="active" data-i18n="navHome">דף הבית</a></li>'
    ),
    (
        '<li><a href="categories.html">קטגוריות</a></li>',
        '<li><a href="categories.html" data-i18n="navCategories">קטגוריות</a></li>'
    ),
    (
        '<li><a href="categories.html" class="active">קטגוריות</a></li>',
        '<li><a href="categories.html" class="active" data-i18n="navCategories">קטגוריות</a></li>'
    ),
    (
        '<li><a href="sales.html">מבצעים</a></li>',
        '<li><a href="sales.html" data-i18n="navSales">מבצעים</a></li>'
    ),
    (
        '<li><a href="sales.html" class="active">מבצעים</a></li>',
        '<li><a href="sales.html" class="active" data-i18n="navSales">מבצעים</a></li>'
    ),
    (
        '<li><a href="contact.html">צור קשר</a></li>',
        '<li><a href="contact.html" data-i18n="navContact">צור קשר</a></li>'
    ),
    (
        '<li><a href="contact.html" class="active">צור קשר</a></li>',
        '<li><a href="contact.html" class="active" data-i18n="navContact">צור קשר</a></li>'
    ),
    (
        '<li><a href="about.html">אודותינו</a></li>',
        '<li><a href="about.html" data-i18n="navAbout">אודותינו</a></li>'
    ),
    (
        '<li><a href="about.html" class="active">אודותינו</a></li>',
        '<li><a href="about.html" class="active" data-i18n="navAbout">אודותינו</a></li>'
    ),
    (
        '<p>יבוא ושיווק גופי תאורה מעוצבים לבתים, משרדים ופרויקטים</p>',
        '<p data-i18n="footerImport">יבוא ושיווק גופי תאורה מעוצבים לבתים, משרדים ופרויקטים</p>'
    ),
    (
        '<h4>קטגוריות</h4>',
        '<h4 data-i18n="footerCats">קטגוריות</h4>'
    ),
    (
        '<h4>מידע</h4>',
        '<h4 data-i18n="footerInfo">מידע</h4>'
    ),
    (
        '<li><a href="#">אודותינו</a></li>',
        '<li><a href="#" data-i18n="footerAbout">אודותינו</a></li>'
    ),
    (
        '<li><a href="#">פרויקטים</a></li>',
        '<li><a href="#" data-i18n="footerProjects">פרויקטים</a></li>'
    ),
    (
        '<li><a href="#">שאלות נפוצות</a></li>',
        '<li><a href="#" data-i18n="footerFAQ">שאלות נפוצות</a></li>'
    ),
    (
        '<li><a href="#">מדיניות החזרות</a></li>',
        '<li><a href="#" data-i18n="footerReturns">מדיניות החזרות</a></li>'
    ),
    (
        '<li><a href="#">תנאי שימוש</a></li>',
        '<li><a href="#" data-i18n="footerTerms">תנאי שימוש</a></li>'
    ),
    (
        '<h4>צור קשר</h4>',
        '<h4 data-i18n="footerContact">צור קשר</h4>'
    ),
    (
        '<p>&copy; 2024 חשמל ג\'יי.אל לאון בע"מ. כל הזכויות שמורות.</p>',
        '<p data-i18n="footerCopyright">&copy; 2024 חשמל ג\'יי.אל לאון בע"מ. כל הזכויות שמורות.</p>'
    )
]

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content = replace_all(content, replacements)
        if content != new_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")

print("Done")
