/**
 * MessagePanel Component
 * 
 * Displays contextual motivational messages based on the selected mood.
 * Provides emotional support and acknowledgment for the user's current state.
 */

class MessagePanel {
  /**
   * @param {HTMLElement} containerElement - The DOM element to render messages into
   */
  constructor(containerElement) {
    this.container = containerElement;
    
    // Check for reduced motion preference (with fallback for test environments)
    this.prefersReducedMotion = false;
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Listen for changes to motion preference
      const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionMediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
    }
    
    this.messages = {
      dark: "Sometimes we need to embrace the shadows. Here are some books that understand the beauty in darkness.",
      cozy: "Time to curl up with something warm and comforting. These books are like a hug for your soul.",
      heartbreaking: "It's okay to feel deeply. These stories honor your emotions and offer paths toward healing.",
      motivational: "You're ready to conquer the world! These books will fuel your fire and inspire your journey.",
      chaotic: "EMBRACE THE CHAOS! Reality is overrated anyway. These books are delightfully unhinged. 🤪"
    };
  }

  /**
   * Get the message for a specific mood
   * @param {string} moodId - The mood identifier
   * @returns {string} The message for the mood, or empty string if not found
   */
  getMessage(moodId) {
    return this.messages[moodId] || '';
  }

  /**
   * Display a message for the given mood with animation
   * @param {string} moodId - The mood identifier
   */
  showMessage(moodId) {
    const message = this.getMessage(moodId);
    
    if (!message) {
      this.container.innerHTML = '';
      return;
    }

    // Remove existing animation class if present
    this.container.classList.remove('message-panel--animate');
    
    // Set the message content
    this.container.textContent = message;
    
    // Skip animation if reduced motion is preferred
    if (this.prefersReducedMotion) {
      // Make visible immediately without animation
      this.container.style.opacity = '1';
      this.container.style.transform = 'translateY(0)';
    } else {
      // Force reflow to restart animation
      void this.container.offsetWidth;
      
      // Add animation class
      this.container.classList.add('message-panel--animate');
    }
  }
}

export default MessagePanel;
