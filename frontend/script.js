// FoodPES User - Ordering Page JavaScript

// Application State
let state = {
  menu: [],
  cart: [],
  orders: [], // This will be handled by the backend
  favorites: []
};

// DOM Elements
const elements = {
  menuGrid: document.getElementById('menuGrid'),
  cartCount: document.getElementById('cartCount'),
  cartItemsList: document.getElementById('cartItemsList'),
  cartModal: document.getElementById('cartModal'),
  cartTotalAmount: document.getElementById('cartTotalAmount'),
  noItems: document.getElementById('noItems'),
  placeOrderBtn: document.getElementById('placeOrderBtn'),
  toastContainer: document.getElementById('toastContainer'),
  categoryButtons: document.getElementById('categoryButtons')
};

// Menu data - Mock data for now, would be fetched from backend in a real app
const mockMenu = [
  { id: 1, name: 'Paneer Tikka', description: 'Cubes of soft paneer marinated and grilled to perfection.', price: 10.99, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Paneer+Tikka' },
  { id: 2, name: 'Veg Spring Rolls', description: 'Crispy rolls filled with seasoned vegetables.', price: 7.50, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veg+Spring+Rolls' },
  { id: 3, name: 'Hara Bhara Kebab', description: 'Patties made from spinach, peas, and potatoes.', price: 8.99, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Hara+Bhara+Kebab' },
  { id: 4, name: 'Crispy Corn', description: 'Golden fried corn kernels with a light seasoning.', price: 6.99, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Crispy+Corn' },
  { id: 5, name: 'Masala Peanuts', description: 'Spicy and crunchy roasted peanuts.', price: 4.50, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Masala+Peanuts' },
  { id: 6, name: 'Gobi Manchurian', description: 'Cauliflower florets in a tangy and spicy sauce.', price: 9.50, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Gobi+Manchurian' },
  { id: 7, name: 'Onion Rings', description: 'Classic battered and fried onion rings.', price: 6.00, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Onion+Rings' },
  { id: 8, name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, garlic, and basil.', price: 8.75, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Bruschetta' },
  { id: 9, name: 'Hummus with Pita Bread', description: 'Creamy hummus served with warm pita bread.', price: 9.25, category: 'Starters & Appetizers', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Hummus+with+Pita' },
  { id: 10, name: 'Chicken Tikka', description: 'Tender chicken marinated in spices and yogurt, grilled.', price: 11.99, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Tikka' },
  { id: 11, name: 'Tandoori Chicken', description: 'Chicken marinated in a tandoori masala and roasted.', price: 14.50, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Tandoori+Chicken' },
  { id: 12, name: 'Fish Fry', description: 'Spicy fried fish, a popular street food snack.', price: 13.75, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Fish+Fry' },
  { id: 13, name: 'Chicken Spring Rolls', description: 'Crispy rolls filled with seasoned chicken and vegetables.', price: 8.50, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Spring+Rolls' },
  { id: 14, name: 'Chicken Wings (BBQ)', description: 'Classic chicken wings tossed in a smoky BBQ sauce.', price: 10.00, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=BBQ+Chicken+Wings' },
  { id: 15, name: 'Chicken Wings (Hot & Sour)', description: 'Crispy wings with a spicy and tangy glaze.', price: 10.00, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Hot+and+Sour+Wings' },
  { id: 16, name: 'Prawns Koliwada', description: 'Spicy, deep-fried prawns coated in a red batter.', price: 15.00, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Prawns+Koliwada' },
  { id: 17, name: 'Mutton Seekh Kebab', description: 'Minced mutton kebabs grilled on a skewer.', price: 16.50, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mutton+Seekh+Kebab' },
  { id: 18, name: 'Chili Chicken', description: 'Stir-fried chicken with green chilies and a spicy sauce.', price: 12.99, category: 'Starters & Appetizers', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chili+Chicken' },
  
  // Soups
  { id: 19, name: 'Tomato Soup', description: 'Creamy tomato soup with fresh herbs.', price: 5.50, category: 'Soups', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Tomato+Soup' },
  { id: 20, name: 'Hot & Sour Soup', description: 'A spicy and tangy soup with vegetables.', price: 6.00, category: 'Soups', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Hot+and+Sour+Soup' },
  { id: 21, name: 'Sweet Corn Soup', description: 'A classic mild soup with sweet corn kernels.', price: 6.00, category: 'Soups', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Sweet+Corn+Soup' },
  { id: 22, name: 'Mushroom Soup', description: 'Rich and earthy mushroom soup.', price: 6.50, category: 'Soups', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mushroom+Soup' },
  { id: 23, name: 'Lentil Soup', description: 'A hearty and nutritious lentil soup.', price: 5.75, category: 'Soups', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Lentil+Soup' },
  { id: 24, name: 'Chicken Hot & Sour Soup', description: 'A spicy and tangy soup with chicken and vegetables.', price: 7.00, category: 'Soups', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Hot+and+Sour+Soup' },
  { id: 25, name: 'Chicken Sweet Corn Soup', description: 'A mild soup with chicken and sweet corn.', price: 7.00, category: 'Soups', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Sweet+Corn+Soup' },
  { id: 26, name: 'Chicken Clear Soup', description: 'Light and flavorful broth with tender chicken pieces.', price: 6.50, category: 'Soups', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Clear+Soup' },
  { id: 27, name: 'Seafood Chowder', description: 'A creamy soup with a mix of fresh seafood.', price: 8.50, category: 'Soups', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Seafood+Chowder' },
  
  // Main Course - Indian Vegetarian
  { id: 28, name: 'Paneer Butter Masala', description: 'Creamy tomato and cashew gravy with soft paneer cubes.', price: 13.99, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Paneer+Butter+Masala' },
  { id: 29, name: 'Dal Makhani', description: 'Black lentils slow-cooked with cream and spices.', price: 11.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Dal+Makhani' },
  { id: 30, name: 'Dal Tadka', description: 'Yellow lentils tempered with ghee and spices.', price: 10.99, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Dal+Tadka' },
  { id: 31, name: 'Shahi Paneer', description: 'Paneer in a rich, creamy gravy with nuts.', price: 14.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Shahi+Paneer' },
  { id: 32, name: 'Malai Kofta', description: 'Dumplings made of paneer and potato in a creamy gravy.', price: 15.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Malai+Kofta' },
  { id: 33, name: 'Aloo Gobi', description: 'A classic dry curry of potato and cauliflower.', price: 11.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Aloo+Gobi' },
  { id: 34, name: 'Chole Bhature', description: 'Spicy chickpea curry with fluffy fried bread.', price: 12.99, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chole+Bhature' },
  { id: 35, name: 'Mix Veg Curry', description: 'A medley of vegetables cooked in a spicy curry.', price: 10.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mix+Veg+Curry' },
  
  // Main Course - Indian Non-Vegetarian
  { id: 36, name: 'Butter Chicken', description: 'Tender chicken in a rich, buttery tomato gravy.', price: 16.99, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Butter+Chicken' },
  { id: 37, name: 'Chicken Curry', description: 'A homestyle chicken curry with a blend of spices.', price: 15.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Curry' },
  { id: 38, name: 'Mutton Rogan Josh', description: 'Slow-cooked mutton in a fragrant red curry.', price: 18.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mutton+Rogan+Josh' },
  { id: 39, name: 'Fish Curry (Goan style)', description: 'Tangy and spicy fish curry inspired by Goa.', price: 17.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Goan+Fish+Curry' },
  { id: 40, name: 'Fish Curry (Bengali style)', description: 'Delicate fish curry in a mustard-based gravy.', price: 17.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Bengali+Fish+Curry' },
  { id: 41, name: 'Chicken Chettinad', description: 'Spicy chicken curry from the Chettinad region.', price: 16.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Chettinad' },
  { id: 42, name: 'Prawn Masala', description: 'Prawns cooked in a rich and flavorful gravy.', price: 19.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Prawn+Masala' },
  { id: 43, name: 'Keema Pav', description: 'Spicy minced mutton curry served with soft bread rolls.', price: 14.99, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Keema+Pav' },

  // Main Course - Chinese & Pan-Asian
  { id: 44, name: 'Veg Manchurian', description: 'Vegetable dumplings in a spicy, tangy sauce.', price: 12.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veg+Manchurian' },
  { id: 45, name: 'Schezwan Fried Rice (Veg)', description: 'Stir-fried rice with Schezwan sauce and vegetables.', price: 11.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Schezwan+Fried+Rice+Veg' },
  { id: 46, name: 'Schezwan Fried Rice (Chicken)', description: 'Stir-fried rice with Schezwan sauce and chicken.', price: 12.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Schezwan+Fried+Rice+Chicken' },
  { id: 47, name: 'Hakka Noodles', description: 'Wok-tossed noodles with shredded vegetables.', price: 10.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Hakka+Noodles' },
  { id: 48, name: 'Chowmein', description: 'Stir-fried noodles with a mix of vegetables and soy sauce.', price: 10.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chowmein' },
  { id: 49, name: 'Chicken in Hot Garlic Sauce', description: 'Slices of chicken in a spicy, garlicky sauce.', price: 14.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Hot+Garlic+Sauce' },
  { id: 50, name: 'Chili Paneer Gravy', description: 'Paneer cubes in a spicy and tangy chili gravy.', price: 13.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chili+Paneer+Gravy' },
  { id: 51, name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers.', price: 15.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Kung+Pao+Chicken' },

  // Main Course - Italian & Continental
  { id: 52, name: 'Penne Arrabbiata', description: 'Penne pasta with a spicy tomato sauce.', price: 12.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Penne+Arrabbiata' },
  { id: 53, name: 'Spaghetti Alfredo', description: 'Spaghetti in a creamy Alfredo sauce.', price: 13.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Spaghetti+Alfredo' },
  { id: 54, name: 'Pizza (Margarita)', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', price: 14.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Margarita+Pizza' },
  { id: 55, name: 'Pizza (Veggie Delight)', description: 'Pizza loaded with a variety of fresh vegetables.', price: 15.00, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veggie+Delight+Pizza' },
  { id: 56, name: 'Pizza (Pepperoni)', description: 'Pizza topped with classic pepperoni slices.', price: 16.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Pepperoni+Pizza' },
  { id: 57, name: 'Veg Lasagna', description: 'Layers of pasta, vegetables, and creamy sauce.', price: 14.50, category: 'Main Course', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veg+Lasagna' },
  { id: 58, name: 'Chicken Lasagna', description: 'Layers of pasta, chicken, and rich sauce.', price: 15.50, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Lasagna' },
  { id: 59, name: 'Grilled Fish with Lemon Butter Sauce', description: 'Flaky grilled fish with a zesty lemon butter sauce.', price: 18.99, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Grilled+Fish' },
  { id: 60, name: 'Chicken Steak', description: 'A tender chicken steak served with vegetables.', price: 17.00, category: 'Main Course', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Steak' },
  
  // Breads & Rice
  { id: 61, name: 'Naan (Butter)', description: 'Soft flatbread topped with melted butter.', price: 2.50, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Butter+Naan' },
  { id: 62, name: 'Naan (Garlic)', description: 'Fluffy naan bread flavored with garlic.', price: 3.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Garlic+Naan' },
  { id: 63, name: 'Tandoori Roti', description: 'Whole wheat bread cooked in a tandoor.', price: 2.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Tandoori+Roti' },
  { id: 64, name: 'Kulcha', description: 'A type of fluffy Indian flatbread.', price: 3.50, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Kulcha' },
  { id: 65, name: 'Lachha Paratha', description: 'A multi-layered flaky flatbread.', price: 3.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Lachha+Paratha' },
  { id: 66, name: 'Chapati', description: 'Simple, unleavened Indian flatbread.', price: 1.50, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chapati' },
  { id: 67, name: 'Jeera Rice', description: 'Basmati rice flavored with cumin seeds.', price: 5.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Jeera+Rice' },
  { id: 68, name: 'Plain Rice', description: 'Perfectly steamed basmati rice.', price: 4.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Plain+Rice' },
  { id: 69, name: 'Veg Biryani', description: 'Fragrant basmati rice cooked with mixed vegetables and spices.', price: 14.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veg+Biryani' },
  { id: 70, name: 'Chicken Biryani', description: 'Aromatic basmati rice cooked with chicken and spices.', price: 16.00, category: 'Breads & Rice', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chicken+Biryani' },
  { id: 71, name: 'Mutton Biryani', description: 'A special biryani with tender mutton pieces.', price: 18.00, category: 'Breads & Rice', isVeg: false, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mutton+Biryani' },
  { id: 72, name: 'Veg Pulao', description: 'Rice and vegetables cooked with whole spices.', price: 12.00, category: 'Breads & Rice', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Veg+Pulao' },
  
  // Desserts
  { id: 73, name: 'Gulab Jamun', description: 'Soft, fried milk solids soaked in a sweet syrup.', price: 4.50, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Gulab+Jamun' },
  { id: 74, name: 'Rasgulla', description: 'Spongy cheese balls in a light sugar syrup.', price: 4.00, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Rasgulla' },
  { id: 75, name: 'Gajar Halwa', description: 'Sweet carrot pudding, a winter favorite.', price: 5.00, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Gajar+Halwa' },
  { id: 76, name: 'Phirni', description: 'A creamy rice pudding with a subtle fragrance.', price: 5.50, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Phirni' },
  { id: 77, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey, molten center.', price: 7.99, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chocolate+Lava+Cake' },
  { id: 78, name: 'Brownie with Ice Cream', description: 'Fudgy brownie served with a scoop of vanilla ice cream.', price: 8.50, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Brownie' },
  { id: 79, name: 'Cheesecake', description: 'A rich and creamy slice of New York style cheesecake.', price: 7.00, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Cheesecake' },
  { id: 80, name: 'Pancakes', description: 'Fluffy pancakes with maple syrup and fresh fruit.', price: 6.50, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Pancakes' },
  { id: 81, name: 'Waffles', description: 'Golden waffles served with your choice of topping.', price: 6.50, category: 'Desserts', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Waffles' },

  // Ice Creams
  { id: 82, name: 'Vanilla', description: 'Classic and creamy vanilla ice cream.', price: 4.00, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Vanilla+Ice+Cream' },
  { id: 83, name: 'Chocolate', description: 'Rich and decadent chocolate ice cream.', price: 4.50, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chocolate+Ice+Cream' },
  { id: 84, name: 'Strawberry', description: 'Sweet and fruity strawberry ice cream.', price: 4.00, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Strawberry+Ice+Cream' },
  { id: 85, name: 'Butterscotch', description: 'A classic butterscotch ice cream.', price: 5.00, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Butterscotch+Ice+Cream' },
  { id: 86, name: 'Pistachio', description: 'Nutty pistachio ice cream.', price: 5.00, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Pistachio+Ice+Cream' },
  { id: 87, name: 'Mango', description: 'Refreshing mango flavored ice cream.', price: 4.50, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mango+Ice+Cream' },
  { id: 88, name: 'Cookies & Cream', description: 'Vanilla ice cream with chunks of chocolate cookies.', price: 5.50, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Cookies+and+Cream+Ice+Cream' },
  { id: 89, name: 'Mint Chocolate Chip', description: 'Cool mint ice cream with chocolate chips.', price: 5.50, category: 'Ice Creams', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mint+Chocolate+Chip+Ice+Cream' },

  // Beverages
  { id: 90, name: 'Masala Tea', description: 'Spiced Indian tea with milk and herbs.', price: 3.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Masala+Tea' },
  { id: 91, name: 'Ginger Tea', description: 'A soothing tea with a hint of ginger.', price: 3.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Ginger+Tea' },
  { id: 92, name: 'Espresso', description: 'A strong, concentrated shot of coffee.', price: 4.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Espresso' },
  { id: 93, name: 'Cappuccino', description: 'Espresso with steamed milk foam.', price: 4.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Cappuccino' },
  { id: 94, name: 'Latte', description: 'Espresso with a large amount of steamed milk.', price: 4.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Latte' },
  { id: 95, name: 'Fresh Lime Soda', description: 'A zesty and refreshing lime soda.', price: 4.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Fresh+Lime+Soda' },
  { id: 96, name: 'Lassi (Sweet)', description: 'A sweet yogurt-based drink.', price: 5.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Sweet+Lassi' },
  { id: 97, name: 'Lassi (Salted)', description: 'A salty and tangy yogurt-based drink.', price: 5.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Salted+Lassi' },
  { id: 98, name: 'Lassi (Mango)', description: 'A sweet drink with fresh mango and yogurt.', price: 5.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Mango+Lassi' },
  { id: 99, name: 'Chocolate Milkshake', description: 'Creamy and rich chocolate milkshake.', price: 6.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Chocolate+Milkshake' },
  { id: 100, name: 'Vanilla Milkshake', description: 'A classic, smooth vanilla milkshake.', price: 5.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Vanilla+Milkshake' },
  { id: 101, name: 'Strawberry Milkshake', description: 'A sweet and fruity strawberry milkshake.', price: 5.50, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Strawberry+Milkshake' },
  { id: 102, name: 'Iced Tea (Lemon)', description: 'Refreshing iced tea with a splash of lemon.', price: 4.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Lemon+Iced+Tea' },
  { id: 103, name: 'Iced Tea (Peach)', description: 'Sweet and fruity iced tea with peach flavor.', price: 4.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Peach+Iced+Tea' },
  { id: 104, name: 'Soft Drinks', description: 'Coke, Sprite, Pepsi.', price: 3.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Soft+Drinks' },
  { id: 105, name: 'Juice (Orange)', description: 'Freshly squeezed orange juice.', price: 5.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Orange+Juice' },
  { id: 106, name: 'Juice (Apple)', description: 'Fresh apple juice.', price: 5.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Apple+Juice' },
  { id: 107, name: 'Juice (Watermelon)', description: 'Fresh watermelon juice.', price: 5.00, category: 'Beverages', isVeg: true, imageUrl: 'https://placehold.co/400x300/F0F0F0/000000?text=Watermelon+Juice' },
];

// Initialize application
function init() {
  state.menu = mockMenu;
  loadCart();
  loadFavorites();
  renderCategoryButtons();
  renderMenu();
  renderCart();
  setupEventListeners();
}

// Load cart and favorites from local storage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      state.cart = JSON.parse(savedCart);
  }
}

function loadFavorites() {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
      state.favorites = JSON.parse(savedFavorites);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Modal
  const cartButton = document.querySelector('.cart-button');
  const modalClose = document.querySelector('.modal-close');
  if (cartButton) cartButton.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (elements.cartModal) {
      elements.cartModal.addEventListener('click', (e) => {
          if (e.target === elements.cartModal) {
              closeModal();
          }
      });
  }

  // Cart Actions
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if (placeOrderBtn) placeOrderBtn.addEventListener('click', placeOrder);

  // Add/Remove from cart handlers and quantity change
  document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('button');
      if (!targetBtn) return;

      const itemId = parseInt(targetBtn.dataset.id);

      if (targetBtn.classList.contains('add-to-cart-btn')) {
          const item = state.menu.find(m => m.id === itemId);
          if (item) {
              addItemToCart(item);
          }
      } else if (targetBtn.classList.contains('remove-btn')) {
          removeItemFromCart(itemId);
      } else if (targetBtn.classList.contains('increment-btn')) {
          incrementQuantity(itemId);
      } else if (targetBtn.classList.contains('decrement-btn')) {
          decrementQuantity(itemId);
      } else if (targetBtn.classList.contains('favorite-btn')) {
          toggleFavorite(itemId);
      } else if (targetBtn.classList.contains('category-btn')) {
          const category = targetBtn.dataset.category;
          filterMenu(category);
          document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
          targetBtn.classList.add('active');
      }
  });
}

// Open modal
function openModal() {
  if (elements.cartModal) {
      elements.cartModal.classList.add('active');
  }
}

// Close modal
function closeModal() {
  if (elements.cartModal) {
      elements.cartModal.classList.remove('active');
  }
}

// Render category buttons
function renderCategoryButtons() {
  if (!elements.categoryButtons) {
      console.error("Critical: 'categoryButtons' element is missing from the HTML.");
      return;
  }

  const categories = new Set(state.menu.map(item => item.category));
  let buttonsHtml = `<button class="category-btn active" data-category="All">All</button>`;
  
  categories.forEach(category => {
      buttonsHtml += `<button class="category-btn" data-category="${category}">${category}</button>`;
  });

  elements.categoryButtons.innerHTML = buttonsHtml;
}

// Render menu
function renderMenu(filteredCategory = 'All') {
  if (!elements.menuGrid) {
      console.error("Critical: 'menuGrid' element is missing from the HTML.");
      return;
  }

  let filteredMenu = state.menu;
  if (filteredCategory !== 'All') {
      filteredMenu = state.menu.filter(item => item.category === filteredCategory);
  }
  
  if (filteredMenu.length === 0) {
      elements.menuGrid.innerHTML = `<p class="no-items">No items found in this category.</p>`;
      return;
  }

  elements.menuGrid.innerHTML = filteredMenu.map(item => createMenuCard(item)).join('');
}

// Create menu card HTML
function createMenuCard(item) {
  const isFavorite = state.favorites.includes(item.id);
  const vegIcon = item.isVeg ? 
      `<span class="veg-indicator veg"></span>` :
      `<span class="veg-indicator non-veg"></span>`;
  const favoriteIcon = isFavorite ? 
      `<svg class="heart-icon filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.4 5.4 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.4 5.4 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` :
      `<svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

  return `
      <div class="menu-card">
          <div class="card-image">
              <img src="${item.imageUrl}" alt="${item.name}">
              ${vegIcon}
              <button class="favorite-btn" data-id="${item.id}">
                  ${favoriteIcon}
              </button>
          </div>
          <div class="card-content">
              <div class="card-header">
                  <h3 class="card-title">${item.name}</h3>
              </div>
              <p class="card-description">${item.description}</p>
              <div class="card-footer">
                  <div class="card-price">$${item.price.toFixed(2)}</div>
                  <button class="quantity-btn primary add-to-cart-btn" data-id="${item.id}">
                      <svg class="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
              </div>
          </div>
      </div>
  `;
}

// Filter menu
function filterMenu(category) {
  renderMenu(category);
}

// Render cart
function renderCart() {
  if (!elements.cartItemsList) {
      console.error("Critical: 'cartItemsList' element is missing from the HTML.");
      return;
  }

  if (state.cart.length === 0) {
      elements.cartItemsList.innerHTML = `<p class="no-items">Your cart is empty.</p>`;
      if (elements.placeOrderBtn) elements.placeOrderBtn.disabled = true;
  } else {
      elements.cartItemsList.innerHTML = state.cart.map(item => createCartItem(item)).join('');
      if (elements.placeOrderBtn) elements.placeOrderBtn.disabled = false;
  }
  
  if (elements.cartCount) elements.cartCount.textContent = state.cart.reduce((total, item) => total + item.quantity, 0);
  if (elements.cartTotalAmount) elements.cartTotalAmount.textContent = `$${calculateTotal().toFixed(2)}`;
  
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

// Create cart item HTML
function createCartItem(item) {
  return `
      <div class="cart-item">
          <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-details">$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-actions">
              <div class="quantity-controls">
                  <button class="decrement-btn" data-id="${item.id}">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="increment-btn" data-id="${item.id}">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="remove-btn" data-id="${item.id}">
                  <svg class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
          </div>
      </div>
  `;
}

// Add item to cart
function addItemToCart(item) {
  const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      state.cart.push({ ...item, quantity: 1 });
  }
  renderCart();
  showToast('Item Added', `${item.name} has been added to your cart.`);
}

// Increment quantity
function incrementQuantity(itemId) {
  const item = state.cart.find(cartItem => cartItem.id === itemId);
  if (item) {
      item.quantity++;
      renderCart();
  }
}

// Decrement quantity
function decrementQuantity(itemId) {
  const item = state.cart.find(cartItem => cartItem.id === itemId);
  if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
          // If quantity drops to zero, remove the item
          state.cart = state.cart.filter(cartItem => cartItem.id !== itemId);
          showToast('Item Removed', `An item has been removed from your cart.`);
      } else {
          showToast('Quantity Updated', `The quantity of ${item.name} has been decreased.`);
      }
      renderCart();
  }
}

// Remove item from cart
function removeItemFromCart(itemId) {
  state.cart = state.cart.filter(item => item.id !== itemId);
  renderCart();
  showToast('Item Removed', 'An item has been removed from your cart.');
}

// Clear cart
function clearCart() {
  state.cart = [];
  renderCart();
  showToast('Cart Cleared', 'Your cart is now empty.');
}

// Calculate total
function calculateTotal() {
  return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Toggle favorite
function toggleFavorite(itemId) {
  const index = state.favorites.indexOf(itemId);
  if (index > -1) {
      state.favorites.splice(index, 1);
      showToast('Unfavorited', 'Item removed from your favorites.');
  } else {
      state.favorites.push(itemId);
      showToast('Favorited', 'Item added to your favorites!');
  }
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  const activeCategoryBtn = document.querySelector('.category-btn.active');
  if (activeCategoryBtn) {
      renderMenu(activeCategoryBtn.dataset.category);
  } else {
      renderMenu();
  }
}

// Place order to backend
async function placeOrder() {
  const nameInput = document.getElementById('customerName');
  const emailInput = document.getElementById('customerEmail');
  const tableInput = document.getElementById('tableNumber');

  const name = nameInput ? nameInput.value : null;
  const email = emailInput ? emailInput.value : null;
  const table = tableInput ? parseInt(tableInput.value) : null;

  if (!name || !email || !table) {
      showToast('Error', 'Please fill in all customer details.', 'error');
      return;
  }

  if (state.cart.length === 0) {
      showToast('Error', 'Your cart is empty.', 'error');
      return;
  }

  const orderData = {
      name,
      email,
      table,
      items: state.cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
      total: calculateTotal(),
      status: 'Received',
  };

  try {
      const response = await fetch('https://foodpes-main.onrender.com/api/orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
      });

      if (!response.ok) {
          throw new Error('Failed to place order.');
      }

      const newOrder = await response.json();
      
      showToast('Order Placed!', `Your order has been received.`);
      
      state.cart = [];
      localStorage.removeItem('cart');
      renderCart();
      closeModal();
      
  } catch (error) {
      console.error('Error placing order:', error);
      showToast('Error', 'Could not place order. Please try again.', 'error');
  }
}

// Show toast notification
function showToast(title, description, type = 'success') {
  if (!elements.toastContainer) {
      console.error("Critical: 'toastContainer' element is missing from the HTML.");
      return;
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>' :
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  
  toast.innerHTML = `
      ${icon}
      <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-description">${description}</div>
      </div>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  setTimeout(() => {
      toast.remove();
  }, 5000);
}

// Initialize application
document.addEventListener('DOMContentLoaded', init);
