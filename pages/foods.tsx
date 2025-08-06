import Link from 'next/link';
import foodsData from '../data/foods.json';
import type { FoodData, FoodItem } from '../lib/types';
import FoodLeaderboard from '../components/food-leaderboard';

function getFoods(): FoodItem[] {
  const foodArray: FoodItem[] = [];
  Object.entries(foodsData as FoodData).forEach(([category, items]) => {
    items.forEach((item) => {
      foodArray.push({
        ...item,
        category: category,
      });
    });
  });
  return foodArray;
}

export default function FoodsPage() {
  const foods = getFoods();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <header className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              🍽️ Food Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              My personal ranking of the best food experiences
            </p>
          </div>
          <Link href="/">
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-sm whitespace-nowrap ml-4">
              ← Home
            </span>
          </Link>
        </div>
      </header>
      <FoodLeaderboard initialFoods={foods} />
    </div>
  );
}
