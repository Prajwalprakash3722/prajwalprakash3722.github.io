/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDistance } from 'geolib';
import foodsData from '../data/foods.json';

interface FoodItem {
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
  distance?: number;
  category?: string;
}

interface FoodData {
  [category: string]: {
    name: string;
    rating: number;
    latitude: number;
    longitude: number;
  }[];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export default function Foods() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [groupByFood, setGroupByFood] = useState(true);

  useEffect(() => {
    const foodArray: FoodItem[] = [];
    Object.entries(foodsData as FoodData).forEach(([category, items]) => {
      items.forEach((item) => {
        foodArray.push({
          ...item,
          category: category,
        });
      });
    });
    setFoods(foodArray);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError('Unable to get your location. Distance sorting disabled.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const foodsWithDistance = foods.map((food) => {
        const distance =
          getDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: food.latitude, longitude: food.longitude }
          ) / 1000;
        return { ...food, distance };
      });
      setFoods(foodsWithDistance);
    }
  }, [userLocation]);

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (food.category && food.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getBaseFoodName = (foodName: string) => {
    return foodName.split('(')[0].split('@')[0].trim();
  };

  const groupedFoods = filteredFoods.reduce((groups: { [key: string]: FoodItem[] }, food) => {
    const baseName = food.category || getBaseFoodName(food.name);
    if (!groups[baseName]) {
      groups[baseName] = [];
    }
    groups[baseName].push(food);
    return groups;
  }, {});

  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'distance' && a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }
    return 0;
  });

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">
          ☆
        </span>
      );
    }

    return stars;
  };

  const FoodCard = ({ food }: { food: FoodItem }) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{food.name}</h3>
          <div className="flex items-center">
            {renderStars(food.rating)}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{food.rating}</span>
          </div>
        </div>

        {food.distance !== undefined && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
            🗺️ {food.distance.toFixed(1)} km away
          </p>
        )}

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(food.name + ' Bengaluru')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm"
        >
          View on Map
        </a>
      </div>
    </div>
  );

  const FoodListItem = ({ food }: { food: FoodItem }) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex justify-between items-center shadow hover:shadow-lg transition-shadow duration-300">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{food.name}</h3>
          <div className="flex items-center ml-4">
            {renderStars(food.rating)}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{food.rating}</span>
          </div>
        </div>
        {food.distance !== undefined && (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            🗺️ {food.distance.toFixed(1)} km away
          </p>
        )}
      </div>
      <div className="flex-shrink-0 ml-4">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(food.name + ' Bengaluru')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm"
        >
          Map
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Food Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              My personal ranking of the best food experiences across India
            </p>
          </div>
          <Link href="/">
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              ← Back to Home
            </span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search foods or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={sortBy === 'distance' && !userLocation}
            >
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
            </select>

            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              {viewMode === 'grid' ? '📋' : '⊞'}
            </button>

            <button
              onClick={() => setGroupByFood(!groupByFood)}
              className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm transition-colors ${
                groupByFood
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              title="Group similar foods together"
            >
              Group
            </button>
          </div>
        </div>

        {locationError && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">{locationError}</p>
          </div>
        )}

        {userLocation && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
            <p className="text-green-800 dark:text-green-200 text-sm">
              Location detected! Sorting based on your current location.
            </p>
          </div>
        )}

        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span>Total: {sortedFoods.length} foods</span>
          <span>
            Average Rating:{' '}
            {(sortedFoods.reduce((sum, food) => sum + food.rating, 0) / sortedFoods.length).toFixed(
              1
            )}
          </span>
        </div>
      </header>

      <main>
        {sortedFoods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No foods found matching your search.</p>
          </div>
        ) : groupByFood ? (
          <div className="space-y-8">
            {Object.entries(groupedFoods).map(([baseFoodName, foodItems]) => (
              <div
                key={baseFoodName}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/30"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  {baseFoodName}
                  <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({foodItems.length} location{foodItems.length > 1 ? 's' : ''})
                  </span>
                </h3>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foodItems
                      .sort((a, b) => b.rating - a.rating)
                      .map((food) => (
                        <FoodCard key={food.name} food={food} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {foodItems
                      .sort((a, b) => b.rating - a.rating)
                      .map((food) => (
                        <FoodListItem key={food.name} food={food} />
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFoods.map((food) => (
              <FoodCard key={food.name} food={food} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFoods.map((food) => (
              <FoodListItem key={food.name} food={food} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
