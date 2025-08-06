'use client';

import { useState, useEffect, useMemo } from 'react';
import { getDistance } from 'geolib';
import type { FoodItem, UserLocation } from '../lib/types';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="text-yellow-500">
        ★
      </span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400">
        ★
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

  return <div className="flex">{stars}</div>;
};

const FoodCard = ({ food }: { food: FoodItem }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 pr-2">{food.name}</h3>
        <div className="flex items-center flex-shrink-0">
          <StarRating rating={food.rating} />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {food.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex-grow">
        {food.distance !== undefined && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
            🗺️ {food.distance.toFixed(1)} km away
          </p>
        )}
      </div>

      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(food.name + ' Bengaluru')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors text-sm w-full text-center font-medium"
      >
        View on Map
      </a>
    </div>
  </div>
);

// Helper component for a single food item in the list view
const FoodListItem = ({ food }: { food: FoodItem }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{food.name}</h3>
        {food.distance !== undefined && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            🗺️ {food.distance.toFixed(1)} km away
          </p>
        )}
      </div>
      <div className="flex items-center flex-shrink-0 self-start sm:self-center">
        <StarRating rating={food.rating} />
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {food.rating.toFixed(1)}
        </span>
      </div>
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(food.name + ' Bengaluru')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors text-sm flex-shrink-0 mt-2 sm:mt-0 font-medium"
      >
        Map
      </a>
    </div>
  </div>
);

interface FoodLeaderboardProps {
  initialFoods: FoodItem[];
}

export default function FoodLeaderboard({ initialFoods }: FoodLeaderboardProps) {
  const [foodsWithDistance, setFoodsWithDistance] = useState<FoodItem[]>(initialFoods);
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [groupByFood, setGroupByFood] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setLocationError(null);
        setFoodsWithDistance(
          initialFoods.map((food) => ({
            ...food,
            distance:
              getDistance(location, { latitude: food.latitude, longitude: food.longitude }) / 1000,
          }))
        );
      },
      () => {
        setLocationError('Unable to get your location. Distance sorting is disabled.');
      }
    );
  }, [initialFoods]);

  const filteredAndSortedFoods = useMemo(() => {
    const filtered = foodsWithDistance.filter(
      (food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'distance' && a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return 0;
    });
  }, [foodsWithDistance, searchTerm, sortBy]);

  const getBaseFoodName = (foodName: string) => {
    return foodName.split('(')[0].split('@')[0].trim();
  };

  const groupedFoods = useMemo(() => {
    if (!groupByFood) return null;
    return filteredAndSortedFoods.reduce((groups: { [key: string]: FoodItem[] }, food) => {
      const baseName = food.category || getBaseFoodName(food.name);
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(food);
      return groups;
    }, {});
  }, [filteredAndSortedFoods, groupByFood]);

  const filteredAverageRating = useMemo(() => {
    if (filteredAndSortedFoods.length === 0) return 0;
    return (
      filteredAndSortedFoods.reduce((sum, food) => sum + food.rating, 0) /
      filteredAndSortedFoods.length
    );
  }, [filteredAndSortedFoods]);

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search foods or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />

        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance')}
            className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userLocation}
          >
            <option value="rating">Sort by Rating</option>
            <option value="distance" disabled={!userLocation}>
              Sort by Distance
            </option>
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? '📋 List' : '⊞ Grid'}
          </button>

          <button
            onClick={() => setGroupByFood(!groupByFood)}
            className={`px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
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
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">{locationError}</p>
        </div>
      )}
      {userLocation && !locationError && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-200 text-sm">
            📍 Location detected! Showing distances from your current location.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <span>
          Showing: {filteredAndSortedFoods.length} of {initialFoods.length} foods
        </span>
        {filteredAndSortedFoods.length > 0 && (
          <span>Average Rating: {filteredAverageRating.toFixed(1)} ⭐</span>
        )}
      </div>

      <main>
        {filteredAndSortedFoods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No food places found matching your search.
            </p>
          </div>
        ) : groupedFoods ? (
          <div className="space-y-8">
            {Object.entries(groupedFoods)
              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
              .map(([baseFoodName, foodItems]) => (
                <div
                  key={baseFoodName}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    {baseFoodName}
                    <span className="ml-3 text-sm font-normal text-gray-600 dark:text-gray-400">
                      ({foodItems.length} location{foodItems.length > 1 ? 's' : ''})
                    </span>
                  </h3>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {foodItems.map((food) => (
                        <FoodCard key={food.name} food={food} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {foodItems.map((food) => (
                        <FoodListItem key={food.name} food={food} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAndSortedFoods.map((food) => (
              <FoodCard key={food.name} food={food} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedFoods.map((food) => (
              <FoodListItem key={food.name} food={food} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
