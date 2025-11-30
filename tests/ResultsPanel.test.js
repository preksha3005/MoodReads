/**
 * ResultsPanel Unit Tests
 * 
 * Tests for the ResultsPanel component functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResultsPanel } from '../ResultsPanel.js';

describe('ResultsPanel', () => {
  let container;
  let resultsPanel;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    container.id = 'results-panel';
    document.body.appendChild(container);
    resultsPanel = new ResultsPanel(container);
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
  });

  describe('Constructor', () => {
    it('should throw error if no container element provided', () => {
      expect(() => new ResultsPanel(null)).toThrow('ResultsPanel requires a container element');
    });

    it('should initialize with a container element', () => {
      expect(resultsPanel.container).toBe(container);
    });
  });

  describe('displayBooks', () => {
    it('should display book cards for valid books array', () => {
      const books = [
        {
          title: 'Test Book 1',
          author: 'Author 1',
          description: 'Description 1'
        },
        {
          title: 'Test Book 2',
          author: 'Author 2',
          description: 'Description 2'
        }
      ];

      resultsPanel.displayBooks(books);

      const cards = container.querySelectorAll('.book-card');
      expect(cards.length).toBe(2);
    });

    it('should show empty state for empty array', () => {
      resultsPanel.displayBooks([]);

      const emptyMessage = container.querySelector('.results-panel__empty');
      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage.textContent).toContain('No recommendations found');
    });

    it('should show empty state for null input', () => {
      resultsPanel.displayBooks(null);

      const emptyMessage = container.querySelector('.results-panel__empty');
      expect(emptyMessage).toBeTruthy();
    });

    it('should clear previous results before displaying new ones', () => {
      const books1 = [
        { title: 'Book 1', author: 'Author 1', description: 'Desc 1' }
      ];
      const books2 = [
        { title: 'Book 2', author: 'Author 2', description: 'Desc 2' },
        { title: 'Book 3', author: 'Author 3', description: 'Desc 3' }
      ];

      resultsPanel.displayBooks(books1);
      expect(container.querySelectorAll('.book-card').length).toBe(1);

      resultsPanel.displayBooks(books2);
      expect(container.querySelectorAll('.book-card').length).toBe(2);
    });
  });

  describe('createBookCard', () => {
    it('should create a book card with title, author, and description', () => {
      const book = {
        title: 'The Night Circus',
        author: 'Erin Morgenstern',
        description: 'A magical competition between two young illusionists'
      };

      const card = resultsPanel.createBookCard(book);

      expect(card.className).toBe('book-card');
      expect(card.querySelector('.book-card__title').textContent).toBe('The Night Circus');
      expect(card.querySelector('.book-card__author').textContent).toBe('by Erin Morgenstern');
      expect(card.querySelector('.book-card__description').textContent).toBe('A magical competition between two young illusionists');
    });

    it('should have proper ARIA attributes', () => {
      const book = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description'
      };

      const card = resultsPanel.createBookCard(book);

      expect(card.getAttribute('role')).toBe('article');
      expect(card.getAttribute('aria-label')).toContain('Test Book');
      expect(card.getAttribute('aria-label')).toContain('Test Author');
    });
  });

  describe('clear', () => {
    it('should remove all book cards from container', () => {
      const books = [
        { title: 'Book 1', author: 'Author 1', description: 'Desc 1' },
        { title: 'Book 2', author: 'Author 2', description: 'Desc 2' }
      ];

      resultsPanel.displayBooks(books);
      expect(container.querySelectorAll('.book-card').length).toBe(2);

      resultsPanel.clear();
      expect(container.innerHTML).toBe('');
    });
  });

  describe('animateBookCard', () => {
    it('should set initial opacity and transform', () => {
      const card = document.createElement('div');
      card.className = 'book-card';
      
      resultsPanel.animateBookCard(card, 0);

      expect(card.style.opacity).toBe('0');
      expect(card.style.transform).toBe('translateY(20px)');
    });

    it('should add animation class after delay', (done) => {
      const card = document.createElement('div');
      card.className = 'book-card';
      
      resultsPanel.animateBookCard(card, 0);

      // Check that animation class is added after delay
      setTimeout(() => {
        expect(card.classList.contains('book-card--animate')).toBe(true);
        done();
      }, 100);
    });
  });
});
