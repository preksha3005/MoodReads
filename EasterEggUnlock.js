/**
 * Easter Egg Unlock Mechanism
 * 
 * Handles the detection of the secret unlock sequence (triple-click on logo)
 * and triggers the easter egg unlock callback.
 */

export class EasterEggUnlock {
  /**
   * @param {HTMLElement} triggerElement - The element to attach the unlock listener to (e.g., logo)
   * @param {Function} onUnlock - Callback function called when easter egg is unlocked
   */
  constructor(triggerElement, onUnlock) {
    this.triggerElement = triggerElement;
    this.onUnlock = onUnlock;
    this.clickCount = 0;
    this.clickTimer = null;
    this.clickTimeout = 2000; // 2 seconds to complete triple-click
    
    this.init();
  }

  /**
   * Initialize the easter egg unlock listener
   */
  init() {
    if (!this.triggerElement) {
      console.warn('EasterEggUnlock: No trigger element provided');
      return;
    }
    
    this.triggerElement.addEventListener('click', this.handleClick.bind(this));
    
    // Add visual hint on hover (subtle)
    this.triggerElement.style.cursor = 'pointer';
    this.triggerElement.title = 'Something magical might happen...';
  }

  /**
   * Handle click events on the trigger element
   */
  handleClick() {
    this.clickCount++;
    
    // Clear existing timer
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }
    
    // Check if triple-click achieved
    if (this.clickCount >= 3) {
      this.unlock();
      this.reset();
    } else {
      // Set timer to reset click count after timeout
      this.clickTimer = setTimeout(() => {
        this.reset();
      }, this.clickTimeout);
    }
  }

  /**
   * Trigger the easter egg unlock
   */
  unlock() {
    // Check if already unlocked
    const alreadyUnlocked = this.isStorageUnlocked();
    
    if (!alreadyUnlocked) {
      // Store unlock state (gracefully handle storage failures)
      this.setStorageUnlocked(true);
      
      // Add visual feedback
      this.showUnlockFeedback();
      
      // Call unlock callback
      if (this.onUnlock) {
        this.onUnlock();
      }
    }
  }

  /**
   * Safely check if easter egg is unlocked in storage
   * @returns {boolean} True if unlocked, false if not or if storage unavailable
   */
  isStorageUnlocked() {
    try {
      return sessionStorage.getItem('easterEggUnlocked') === 'true';
    } catch (error) {
      console.warn('sessionStorage unavailable, easter egg state will not persist:', error);
      return false;
    }
  }

  /**
   * Safely set easter egg unlock state in storage
   * @param {boolean} unlocked - Whether the easter egg is unlocked
   */
  setStorageUnlocked(unlocked) {
    try {
      sessionStorage.setItem('easterEggUnlocked', unlocked ? 'true' : 'false');
    } catch (error) {
      // Gracefully degrade - continue without persistence
      console.warn('Failed to save easter egg state to sessionStorage:', error);
      console.info('Easter egg will remain unlocked for this session but will not persist on reload');
    }
  }

  /**
   * Show visual feedback when easter egg is unlocked
   */
  showUnlockFeedback() {
    // Add a temporary animation class
    this.triggerElement.classList.add('easter-egg-unlocked');
    
    // Remove the class after animation completes
    setTimeout(() => {
      this.triggerElement.classList.remove('easter-egg-unlocked');
    }, 1000);
  }

  /**
   * Reset click counter
   */
  reset() {
    this.clickCount = 0;
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
    }
  }

  /**
   * Check if easter egg is currently unlocked
   * @returns {boolean} True if unlocked
   */
  static isUnlocked() {
    try {
      return sessionStorage.getItem('easterEggUnlocked') === 'true';
    } catch (error) {
      console.warn('sessionStorage unavailable:', error);
      return false;
    }
  }

  /**
   * Manually unlock the easter egg (for testing)
   */
  static forceUnlock() {
    try {
      sessionStorage.setItem('easterEggUnlocked', 'true');
    } catch (error) {
      console.warn('Failed to force unlock easter egg:', error);
    }
  }

  /**
   * Reset the easter egg lock state (for testing)
   */
  static reset() {
    try {
      sessionStorage.removeItem('easterEggUnlocked');
    } catch (error) {
      console.warn('Failed to reset easter egg state:', error);
    }
  }
}

export default EasterEggUnlock;
