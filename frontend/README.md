# FoodPES Restaurant - HTML/CSS/JS Version

This is a vanilla HTML, CSS, and JavaScript version of the FoodPES restaurant ordering system, converted from the original React application.

## 🚀 Features

### Customer Interface (`index.html`)
- **Menu Browsing**: Browse menu items by category
- **Shopping Cart**: Add/remove items with quantity management
- **Favorites System**: Save favorite menu items
- **Order Placement**: Place orders with customer information
- **Responsive Design**: Mobile-friendly interface

### Admin Interface (`admin.html`)
- **Order Management**: View and track incoming orders
- **Status Updates**: Mark orders as Received → Preparing → Served
- **Order Details**: Customer info, table number, items, and totals
- **Real-time Updates**: Order status tracking with visual indicators

## 📁 File Structure

```
foodpes/
├── index.html              # Main customer interface
├── admin.html              # Admin order management
├── styles.css              # All CSS styles
├── script.js               # Customer interface JavaScript
├── admin-script.js         # Admin interface JavaScript


└── README.md               # This file
```

## 🎨 Design System

- **Color Scheme**: Warm burgundy primary with gold secondary
- **Typography**: Modern system fonts with proper hierarchy
- **Shadows**: Elegant, soft, and card-specific shadow variants
- **Responsive**: Mobile-first design with breakpoints
- **Icons**: SVG icons for better scalability

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: ES6+ features, Local Storage API
- **SVG Icons**: Scalable vector graphics

## 🚀 How to Use

1. **Open `index.html`** in a web browser to access the customer interface
2. **Open `admin.html`** in a web browser to access the admin interface
3. **No server required** - works with file:// protocol

## 📱 Features

### Customer Features
- Browse 15 menu items across 8 categories
- Add items to cart with quantity control
- Save favorite items
- Place orders with customer details
- View order confirmation

### Admin Features
- View all incoming orders
- Update order status (Received → Preparing → Served)
- See customer information and order details
- Track order totals and timestamps

## 💾 Data Storage

- **Local Storage**: Cart, favorites, and orders are stored locally
- **No Database**: All data persists in browser's local storage
- **Cross-Tab Sync**: Orders sync between customer and admin interfaces

## 🎯 Key Differences from React Version

1. **No Build Process**: Direct HTML/CSS/JS files
2. **No Dependencies**: Pure vanilla JavaScript
3. **Simplified State**: Basic object-based state management
4. **Direct DOM Manipulation**: No virtual DOM
5. **File-based**: No bundling or compilation needed

## 🔧 Customization

- **Colors**: Modify CSS custom properties in `:root`
- **Menu Items**: Edit the `menuData` array in `script.js`
- **Styling**: Update classes in `styles.css`
- **Functionality**: Modify functions in JavaScript files

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎉 Ready to Use

Simply open `index.html` in any modern web browser to start using the FoodPES restaurant system!

