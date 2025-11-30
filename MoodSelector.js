/**
 * MoodSelector Component
 * 
 * Displays mood options and handles user selection.
 * Manages active mood highlighting and easter egg visibility.
 */

import { getStandardMoods, getAllMoods } from './moodData.js';

export class MoodSelector {
  /**
   * @param {HTMLElement} containerElement - The DOM element to render the mood selector into
   * @param {Function} onMoodChange - Callback function called when mood changes (receives moodId)
   */
  constructor(containerElement, onMoodChange) {
    this.container = containerElement;
    this.onMoodChange = onMoodChange;
    this.activeMoodId = null;
    this.easterEggUnlocked = false;
    
    // Check if easter egg was previously unlocked in this session
    this.checkEasterEggStatus();
  }

  /**
   * Check sessionStorage for easter egg unlock status
   */
  checkEasterEggStatus() {
    const unlocked = sessionStorage.getItem('easterEggUnlocked');
    if (unlocked === 'true') {
      this.easterEggUnlocked = true;
    }
  }

  /**
   * Render the mood selector buttons
   */
  render() {
    // Clear existing content
    this.container.innerHTML = '';
    
    // Get moods to display (standard moods + easter egg if unlocked)
    const moodsToDisplay = this.easterEggUnlocked 
      ? getAllMoods() 
      : getStandardMoods();
    
    // Create and append mood buttons
    moodsToDisplay.forEach(mood => {
      const button = this.createMoodButton(mood);
      this.container.appendChild(button);
    });
  }

  /**
   * Create a mood button element
   * @param {Object} mood - Mood object with id, label, icon
   * @returns {HTMLElement} Button element
   */
  createMoodButton(mood) {
    const button = document.createElement('button');
    button.className = 'mood-button';
    button.dataset.moodId = mood.id;
    button.setAttribute('aria-label', `Select ${mood.label} mood`);
    button.setAttribute('role', 'button');
    
    // Add active class if this is the active mood
    if (this.activeMoodId === mood.id) {
      button.classList.add('mood-button--active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.setAttribute('aria-pressed', 'false');
    }
    
    // Create button content
    const icon = document.createElement('span');
    icon.className = 'mood-button__icon';
    icon.textContent = mood.icon;
    icon.setAttribute('aria-hidden', 'true');
    
    const label = document.createElement('span');
    label.className = 'mood-button__label';
    label.textContent = mood.label;
    
    button.appendChild(icon);
    button.appendChild(label);
    
    // Add click event listener
    button.addEventListener('click', () => this.handleMoodClick(mood.id));
    
    return button;
  }

  /**
   * Handle mood button click
   * @param {string} moodId - The id of the clicked mood
   */
  handleMoodClick(moodId) {
    this.setActiveMood(moodId);
    
    // Emit mood change event
    if (this.onMoodChange) {
      this.onMoodChange(moodId);
    }
  }

  /**
   * Set the active mood and update UI
   * @param {string} moodId - The id of the mood to set as active
   */
  setActiveMood(moodId) {
    this.activeMoodId = moodId;
    
    // Update all buttons to reflect active state
    const buttons = this.container.querySelectorAll('.mood-button');
    buttons.forEach(button => {
      const buttonMoodId = button.dataset.moodId;
      if (buttonMoodId === moodId) {
        button.classList.add('mood-button--active');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('mood-button--active');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Unlock the easter egg mood and re-render
   */
  unlockEasterEgg() {
    if (!this.easterEggUnlocked) {
      this.easterEggUnlocked = true;
      sessionStorage.setItem('easterEggUnlocked', 'true');
      this.render();
    }
  }

  /**
   * Get the currently active mood id
   * @returns {string|null} Active mood id or null
   */
  getActiveMood() {
    return this.activeMoodId;
  }
}

export default MoodSelector;
