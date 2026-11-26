export type MenuCategory =
  | 'All'
  | 'Noodles'
  | 'Rice'
  | 'Pasta'
  | 'Pizza & Bites'
  | 'Coffee & Shakes';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  description: string;
  image: string;
  isVeg: true;
  badge?: 'Bestseller' | "Chef's Pick";
  signature?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Noodles',
  'Rice',
  'Pasta',
  'Pizza & Bites',
  'Coffee & Shakes',
];

export const MENU_ITEMS: MenuItem[] = [
  // Noodles
  {
    id: 'veg-chowmein',
    name: 'Veg Chowmein',
    category: 'Noodles',
    price: 80,
    description:
      'Classic street-style wok-tossed noodles with crisp cabbage, bell peppers, and smoky soy glaze.',
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'hakka-noodles',
    name: 'Hakka Noodles',
    category: 'Noodles',
    price: 90,
    description:
      'Silky thin noodles stir-fried on high flame with julienned garden veggies and white pepper.',
    image:
      'https://images.unsplash.com/photo-1569058242276-0bc3e078cf86?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'chilli-garlic-noodles',
    name: 'Chilli Garlic Noodles',
    category: 'Noodles',
    price: 100,
    description:
      'Aromatic roasted garlic, crushed red chillies, and spring onions folded into fiery noodles.',
    image:
      'https://images.unsplash.com/photo-1635685296916-95acaf58471f?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'schezwan-chowmein',
    name: 'Schezwan Chowmein',
    category: 'Noodles',
    price: 100,
    description:
      'Our bold house-spiced Schezwan sauce tossed with smoky noodles and crunchy veggies.',
    image:
      'https://images.unsplash.com/photo-1789990662414-f607ba6405f3?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    badge: 'Bestseller',
    signature: true,
  },
  {
    id: 'paneer-chowmein',
    name: 'Paneer Chowmein',
    category: 'Noodles',
    price: 120,
    description:
      'Golden seared paneer cubes tossed with peppery chowmein, charred capsicum, and scallions.',
    image:
      'https://images.unsplash.com/photo-1569058242276-0bc3e078cf86?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },

  // Rice
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    category: 'Rice',
    price: 90,
    description:
      'Fluffy long-grain rice wok-tossed with sweet corn, carrots, beans, and toasted sesame.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'chilli-garlic-rice',
    name: 'Chilli Garlic Rice',
    category: 'Rice',
    price: 100,
    description:
      'Crisp golden garlic chips and mild red chilli spice wok-tossed through fragrant rice.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'paneer-rice',
    name: 'Paneer Rice',
    category: 'Rice',
    price: 120,
    description:
      'Hearty fried rice loaded with soft spiced paneer cubes, crunchy greens, and savory aromatics.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'schezwan-rice',
    name: 'Schezwan Rice',
    category: 'Rice',
    price: 100,
    description:
      'Zesty red Schezwan rice finished with spring onion greens and signature wok char.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'triple-fried-rice',
    name: 'Triple Fried Rice',
    category: 'Rice',
    price: 140,
    description:
      'A rich trio of spiced Schezwan rice, crispy noodles, and savory Manchurian gravy.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    signature: true,
  },
  {
    id: 'manchurian-fried-rice',
    name: 'Manchurian Fried Rice',
    category: 'Rice',
    price: 130,
    description:
      'Crispy veg Manchurian dumplings folded into sizzling soy-garlic fried rice.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },

  // Pasta
  {
    id: 'red-sauce-pasta',
    name: 'Red Sauce Pasta',
    category: 'Pasta',
    price: 110,
    description:
      'Al-dente penne simmered in slow-cooked spiced tomato basil arrabbiata and herbs.',
    image:
      'https://images.unsplash.com/photo-1781332144863-62a26093b4bd?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'white-sauce-pasta',
    name: 'White Sauce Pasta',
    category: 'Pasta',
    price: 120,
    description:
      'Velvety garlic-butter cream sauce coating penne, sweet corn, olives, and melted cheese.',
    image:
      'https://images.unsplash.com/photo-1702827762413-5e65a63cf700?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'pink-sauce-pasta',
    name: 'Pink Sauce Pasta',
    category: 'Pasta',
    price: 130,
    description:
      'The best of both worlds—tangy tomato marinara swirled with silky parmesan cream.',
    image:
      'https://images.unsplash.com/photo-1785031803726-bf08b6d1d8ed?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    badge: "Chef's Pick",
    signature: true,
  },

  // Pizza & Bites
  {
    id: 'classic-margherita-pizza',
    name: 'Classic Margherita Pizza',
    category: 'Pizza & Bites',
    price: 140,
    description:
      'Crisp baked crust topped with tangy pizza sauce, bubbling mozzarella, and oregano.',
    image:
      'https://images.unsplash.com/photo-1784133347373-34d8fb24d7fa?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'farmhouse-loaded-pizza',
    name: 'Farmhouse Loaded Pizza',
    category: 'Pizza & Bites',
    price: 180,
    description:
      'Generously layered with onion, bell pepper, sweet corn, mushrooms, olives, and extra cheese.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    signature: true,
  },
  {
    id: 'crispy-veg-burger',
    name: 'Crispy Veg Burger',
    category: 'Pizza & Bites',
    price: 70,
    description:
      'Crunchy golden herb-potato patty with melted cheese slice, crisp lettuce, and house mayo.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'grilled-cheese-sandwich',
    name: 'Grilled Cheese Sandwich',
    category: 'Pizza & Bites',
    price: 80,
    description:
      'Butter-toasted bread stuffed with molten cheese, crisp capsicum, and café green chutney.',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },

  // Coffee & Shakes
  {
    id: 'classic-hot-coffee',
    name: 'Classic Hot Coffee',
    category: 'Coffee & Shakes',
    price: 40,
    description:
      'Frothy, comforting roasted café coffee steamed to warm perfection with cocoa dust.',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'Coffee & Shakes',
    price: 80,
    description:
      'Tall, velvety blended iced coffee crowned with rich chocolate swirl and thick froth.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    signature: true,
  },
  {
    id: 'chocolate-oreo-shake',
    name: 'Chocolate Oreo Shake',
    category: 'Coffee & Shakes',
    price: 110,
    description:
      'Creamy Belgian-style chocolate milkshake blitzed with crushed Oreo cookies and fudge.',
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
    signature: true,
  },
  {
    id: 'special-masala-tea',
    name: 'Special Masala Tea',
    category: 'Coffee & Shakes',
    price: 30,
    description:
      'Slow-brewed cardamom, ginger, and aromatic Indian chai spice in a steaming café cup.',
    image:
      'https://images.unsplash.com/photo-1628702774354-f09e4a167a8e?auto=format&fit=crop&w=1200&q=85',
    isVeg: true,
  },
];
