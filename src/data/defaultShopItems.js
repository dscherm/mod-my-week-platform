import defaultClothingItems from './defaultClothingItems';

// Default reward shop items seeded for new classes
const rewardItems = [
  {
    name: 'Candy',
    description: 'A piece of candy from the teacher\'s stash',
    cost: 45,
    icon: '🍬',
    isActive: true
  },
  {
    name: 'Gaming Break (15 min)',
    description: '15 minutes of free gaming time during class',
    cost: 100,
    icon: '🎮',
    isActive: true
  },
  {
    name: 'Period Break',
    description: 'A full period of free time — you earned it!',
    cost: 800,
    icon: '🏖️',
    isActive: true
  }
];

const defaultShopItems = [...rewardItems, ...defaultClothingItems];

export default defaultShopItems;
