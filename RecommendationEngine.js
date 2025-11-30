/**
 * RecommendationEngine - Provides book recommendations based on mood
 * 
 * Responsible for filtering books from the database by mood category
 * and ensuring minimum recommendation counts are met.
 */

import { getBooksByMood } from './bookDatabase.js';

class RecommendationEngine {
  constructor() {
    // Minimum number of recommendations to return per mood
    this.minRecommendations = 3;
  }

  /**
   * Get book recommendations for a specific mood
   * @param {string} moodId - The mood identifier
   * @returns {Array} Array of book recommendation objects
   */
  getRecommendations(moodId) {
    // Validate mood ID
    if (!moodId || typeof moodId !== 'string') {
      console.error('Invalid mood ID provided to getRecommendations:', moodId);
      return [];
    }

    try {
      const books = getBooksByMood(moodId);
      
      // Handle empty results
      if (!books || books.length === 0) {
        console.warn(`No books found for mood "${moodId}"`);
        return [];
      }
      
      // Ensure we have at least the minimum number of recommendations
      if (books.length < this.minRecommendations) {
        console.warn(`Warning: Only ${books.length} books found for mood "${moodId}". Expected at least ${this.minRecommendations}.`);
      }
      
      return books;
    } catch (error) {
      console.error(`Error getting recommendations for mood "${moodId}":`, error);
      return [];
    }
  }

  /**
   * Get books filtered by mood (alias for getRecommendations)
   * @param {string} moodId - The mood identifier
   * @returns {Array} Array of book objects matching the mood
   */
  getBooksByMood(moodId) {
    return this.getRecommendations(moodId);
  }
}

export default RecommendationEngine;
