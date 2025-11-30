/**
 * ResultsPanel Component
 * 
 * Displays book recommendations with animations and glass-effect styling.
 * Handles rendering book cards, animations, and hover interactions.
 */

export class ResultsPanel {
  /**
   * Create a ResultsPanel instance
   * @param {HTMLElement} containerElement - The DOM element to render results into
   */
  constructor(containerElement) {
    if (!containerElement) {
      throw new Error('ResultsPanel requires a container element');
    }
    this.container = containerElement;
    
    // Track active animation timeouts for cancellation
    this.activeAnimations = [];
    
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
  }

  /**
   * Display a list of books with animations
   * @param {Array} books - Array of book objects with title, author, description
   */
  displayBooks(books) {
    console.log('=== RESULTS PANEL DEBUG ===');
    console.log('displayBooks called with:', books);
    console.log('Container element:', this.container);
    
    // Cancel any in-progress animations from previous mood selection
    this.cancelAnimations();
    
    // Clear previous results
    this.clear();

    // Validate input
    if (!books || !Array.isArray(books) || books.length === 0) {
      console.log('No books provided, showing empty state');
      this.showEmptyState();
      return;
    }

    // Validate and filter books before rendering
    const validBooks = books.filter(book => this.validateBook(book));
    console.log('Valid books after filtering:', validBooks.length);
    
    // If no valid books after filtering, show empty state
    if (validBooks.length === 0) {
      console.log('No valid books after filtering');
      this.showEmptyState('Some books had incomplete data. Please try a different mood.');
      return;
    }
    
    // Log warning if some books were filtered out
    if (validBooks.length < books.length) {
      console.warn(`Filtered out ${books.length - validBooks.length} invalid book(s) with missing data`);
    }

    // Create and append book cards
    console.log('Creating book cards...');
    validBooks.forEach((book, index) => {
      console.log(`Creating card ${index + 1}:`, book.title);
      const card = this.createBookCard(book);
      this.container.appendChild(card);
      console.log('Card appended to container');
      
      // Trigger animation after a brief delay to ensure DOM is ready
      requestAnimationFrame(() => {
        this.animateBookCard(card, index);
      });
    });
    console.log('All cards created and appended');
  }

  /**
   * Create a book card element
   * @param {Object} book - Book object with title, author, description
   * @returns {HTMLElement} Book card element
   */
  createBookCard(book) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Book: ${book.title} by ${book.author}`);
    card.setAttribute('tabindex', '0');

    const title = document.createElement('h3');
    title.className = 'book-card__title';
    title.textContent = book.title;

    const author = document.createElement('p');
    author.className = 'book-card__author';
    author.textContent = `by ${book.author}`;

    const description = document.createElement('p');
    description.className = 'book-card__description';
    description.textContent = book.description;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(description);

    return card;
  }

  /**
   * Animate a book card with fade-in and slide-up effects
   * @param {HTMLElement} cardElement - The card element to animate
   * @param {number} index - The index of the card for staggered timing
   */
  animateBookCard(cardElement, index) {
    // Respect reduced motion preference - skip animations
    if (this.prefersReducedMotion) {
      cardElement.classList.add('book-card--animate');
      return;
    }
    
    // Calculate staggered delay (50-150ms per card)
    const baseDelay = 50;
    const maxDelay = 150;
    const delayRange = maxDelay - baseDelay;
    const staggerDelay = baseDelay + (index * delayRange / Math.max(1, index));
    
    // Use will-change for performance hint
    cardElement.style.willChange = 'opacity, transform';
    
    // Trigger animation after stagger delay
    const timeoutId = setTimeout(() => {
      cardElement.classList.add('book-card--animate');
      
      // Remove will-change after animation completes (500ms animation duration)
      setTimeout(() => {
        cardElement.style.willChange = 'auto';
      }, 500);
    }, staggerDelay);
    
    // Track timeout for cancellation
    this.activeAnimations.push(timeoutId);
  }

  /**
   * Clear all book cards from the results panel
   */
  clear() {
    // Cancel any pending animations before clearing
    this.cancelAnimations();
    this.container.innerHTML = '';
  }

  /**
   * Cancel all in-progress animations
   * Used when rapidly switching moods to prevent animation queue buildup
   */
  cancelAnimations() {
    this.activeAnimations.forEach(timeoutId => clearTimeout(timeoutId));
    this.activeAnimations = [];
  }

  /**
   * Show empty state message when no books are available
   * @param {string} message - Optional custom message to display
   */
  showEmptyState(message = 'No recommendations found. Try selecting a different mood!') {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'results-panel__empty';
    emptyMessage.textContent = message;
    this.container.appendChild(emptyMessage);
  }

  /**
   * Validate that a book object has all required fields
   * @param {Object} book - Book object to validate
   * @returns {boolean} True if book is valid
   */
  validateBook(book) {
    if (!book || typeof book !== 'object') {
      console.warn('Invalid book object:', book);
      return false;
    }

    // Check for required fields
    const requiredFields = ['title', 'author', 'description'];
    const missingFields = requiredFields.filter(field => {
      const value = book[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    if (missingFields.length > 0) {
      console.warn(`Book missing required fields: ${missingFields.join(', ')}`, book);
      return false;
    }

    return true;
  }
}
