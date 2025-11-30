/**
 * MoodReads - Main Application Entry Point
 * 
 * This is the main controller for the MoodReads application.
 * It coordinates all components and manages application state.
 */

import { MoodSelector } from './MoodSelector.js';
import { EasterEggUnlock } from './EasterEggUnlock.js';
import ThemeManager from './ThemeManager.js';
import MessagePanel from './MessagePanel.js';
import { ResultsPanel } from './ResultsPanel.js';
import RecommendationEngine from './RecommendationEngine.js';

/**
 * MoodReadsApp - Main Application Controller
 * 
 * Coordinates all components and manages application state.
 * Handles mood selection events and updates theme, messages, and recommendations.
 */
class MoodReadsApp {
  constructor() {
    this.moodSelector = null;
    this.themeManager = null;
    this.messagePanel = null;
    this.resultsPanel = null;
    this.recommendationEngine = null;
    this.easterEggUnlock = null;
  }

  /**
   * Initialize the application and all components
   */
  init() {
    // Get container elements
    const moodSelectorContainer = document.getElementById('mood-selector');
    const messagePanelContainer = document.getElementById('message-panel');
    const resultsPanelContainer = document.getElementById('results-panel');
    const logoElement = document.getElementById('logo');

    // Validate required elements exist
    if (!moodSelectorContainer || !messagePanelContainer || !resultsPanelContainer || !logoElement) {
      console.error('Required DOM elements not found');
      return;
    }

    // Initialize all components
    this.themeManager = new ThemeManager();
    this.messagePanel = new MessagePanel(messagePanelContainer);
    this.resultsPanel = new ResultsPanel(resultsPanelContainer);
    this.recommendationEngine = new RecommendationEngine();

    // Initialize MoodSelector with mood change handler
    this.moodSelector = new MoodSelector(moodSelectorContainer, (moodId) => {
      this.handleMoodChange(moodId);
    });

    // Initialize Easter Egg Unlock
    this.easterEggUnlock = new EasterEggUnlock(logoElement, () => {
      console.log('Easter egg unlocked! Chaotic Gremlin Mode activated!');
      this.moodSelector.unlockEasterEgg();
    });

    // Apply default neutral theme on load
    this.themeManager.applyTheme('neutral');

    // Render initial mood selector
    this.moodSelector.render();

    console.log('MoodReads application initialized');
  }

  /**
   * Handle mood change events
   * Coordinates theme changes, message updates, and recommendation display
   * @param {string} moodId - The selected mood identifier
   */
  handleMoodChange(moodId) {
    console.log('=== MOOD CHANGE DEBUG ===');
    console.log('Mood changed to:', moodId);

    try {
      // Update theme
      console.log('Applying theme...');
      this.themeManager.applyTheme(moodId);

      // Update message
      console.log('Showing message...');
      this.messagePanel.showMessage(moodId);

      // Get and display recommendations
      console.log('Getting recommendations...');
      const recommendations = this.recommendationEngine.getRecommendations(moodId);
      console.log('Recommendations received:', recommendations);
      console.log('Number of recommendations:', recommendations.length);
      
      console.log('Displaying books...');
      this.resultsPanel.displayBooks(recommendations);
      console.log('Books displayed successfully');
    } catch (error) {
      console.error('Error handling mood change:', error);
      console.error('Error stack:', error.stack);
      // Display error message to user
      this.resultsPanel.clear();
      this.resultsPanel.showEmptyState('Oops! Something went wrong. Please try again.');
    }
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new MoodReadsApp();
  app.init();
});
