export type IconType = {
  type: "Ionicons" | "MaterialIcons" | "FontAwesome";
  name: string;
};

export const expoIcons = {
  // Finanças
  cash: { type: "Ionicons", name: "cash-outline" },
  card: { type: "Ionicons", name: "card-outline" },
  wallet: { type: "Ionicons", name: "wallet-outline" },
  bank: { type: "FontAwesome", name: "university" },
  savings: { type: "MaterialIcons", name: "savings" },
  "money-bill": { type: "FontAwesome", name: "money" },

  // Alimentação
  "fast-food": { type: "Ionicons", name: "fast-food-outline" },
  restaurant: { type: "MaterialIcons", name: "restaurant" },
  cafe: { type: "Ionicons", name: "cafe-outline" },
  pizza: { type: "Ionicons", name: "pizza-outline" },
  nutrition: { type: "Ionicons", name: "nutrition-outline" },
  water: { type: "Ionicons", name: "water-outline" },

  // Transporte
  car: { type: "Ionicons", name: "car-outline" },
  bus: { type: "Ionicons", name: "bus-outline" },
  bicycle: { type: "Ionicons", name: "bicycle-outline" },
  train: { type: "MaterialIcons", name: "train" },
  airplane: { type: "Ionicons", name: "airplane-outline" },
  walk: { type: "MaterialIcons", name: "directions-walk" },

  // Esporte e Exercício
  fitness: { type: "Ionicons", name: "fitness-outline" },
  tennisball: { type: "Ionicons", name: "tennisball-outline" },
  "bicycle-sport": { type: "FontAwesome", name: "bicycle" },

  // Saúde e Bem-estar
  medical: { type: "Ionicons", name: "medical-outline" },
  bandage: { type: "Ionicons", name: "bandage-outline" },
  heart: { type: "Ionicons", name: "heart-outline" },
  pulse: { type: "Ionicons", name: "pulse-outline" },
  "fitness-center": { type: "MaterialIcons", name: "fitness-center" },
  "hospital-building": { type: "MaterialIcons", name: "local-hospital" },

  // Farmácia
  medkit: { type: "Ionicons", name: "medkit-outline" },
  pharmacy: { type: "MaterialIcons", name: "local-pharmacy" },
  pill: { type: "MaterialIcons", name: "medication" },
  thermometer: { type: "FontAwesome", name: "thermometer-full" },
  "first-aid": { type: "Ionicons", name: "medkit-outline" },
  prescription: { type: "MaterialIcons", name: "medical-services" },

  // Lazer e Entretenimento
  "game-controller": { type: "Ionicons", name: "game-controller-outline" },
  film: { type: "Ionicons", name: "film-outline" },
  "musical-notes": { type: "Ionicons", name: "musical-notes-outline" },
  book: { type: "Ionicons", name: "book-outline" },
  headset: { type: "Ionicons", name: "headset-outline" },
  ticket: { type: "MaterialIcons", name: "local-play" },

  // Mercado e Compras
  cart: { type: "Ionicons", name: "cart-outline" },
  basket: { type: "Ionicons", name: "basket-outline" },
  pricetag: { type: "Ionicons", name: "pricetag-outline" },
  gift: { type: "Ionicons", name: "gift-outline" },
  store: { type: "MaterialIcons", name: "store" },
  "shopping-bag": { type: "MaterialIcons", name: "shopping-bag" },

  // Animais e Pets
  paw: { type: "Ionicons", name: "paw-outline" },
  fish: { type: "Ionicons", name: "fish-outline" },
} as const;

// Função helper para pegar um ícone
export const getIcon = (name: keyof typeof expoIcons): IconType => {
  return expoIcons[name] || { type: "Ionicons", name: "help-circle-outline" };
};
