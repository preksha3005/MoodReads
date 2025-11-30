/**
 * Responsive Design Unit Tests
 * 
 * Tests for responsive breakpoints and layout adaptations
 * Requirements: 7.1, 7.2, 7.3
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Responsive Breakpoints', () => {
  let cssContent;

  beforeEach(() => {
    // Read the CSS file to check for media query rules
    cssContent = readFileSync(join(process.cwd(), 'styles.css'), 'utf-8');
  });

  /**
   * Test mobile breakpoint applies mobile layout
   * Requirements: 7.1
   */
  describe('Mobile breakpoint (< 768px)', () => {
    it('should have mobile media query defined', () => {
      // Check for mobile breakpoint
      expect(cssContent).toMatch(/@media\s*\(max-width:\s*767px\)/);
    });

    it('should stack mood buttons vertically on mobile', () => {
      // Check for flex-direction: column in mobile breakpoint
      const mobileSection = cssContent.match(/@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\n\}/);
      expect(mobileSection).toBeTruthy();
      
      const mobileStyles = mobileSection[0];
      expect(mobileStyles).toMatch(/\.mood-selector[\s\S]*?flex-direction:\s*column/);
    });

    it('should use single column for book cards on mobile', () => {
      // Check for single column grid in mobile breakpoint
      const mobileSection = cssContent.match(/@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\n\}/);
      expect(mobileSection).toBeTruthy();
      
      const mobileStyles = mobileSection[0];
      expect(mobileStyles).toMatch(/\.results-panel[\s\S]*?grid-template-columns:\s*1fr/);
    });

    it('should optimize spacing and typography for mobile', () => {
      const mobileSection = cssContent.match(/@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\n\}/);
      expect(mobileSection).toBeTruthy();
      
      const mobileStyles = mobileSection[0];
      // Check for adjusted padding
      expect(mobileStyles).toMatch(/\.main-content[\s\S]*?padding/);
      // Check for adjusted font sizes
      expect(mobileStyles).toMatch(/\.section-title[\s\S]*?font-size/);
    });
  });

  /**
   * Test tablet breakpoint applies tablet layout
   * Requirements: 7.2
   */
  describe('Tablet breakpoint (768px - 1024px)', () => {
    it('should have tablet media query defined', () => {
      // Check for tablet breakpoint
      expect(cssContent).toMatch(/@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)/);
    });

    it('should use grid layout for mood buttons on tablet', () => {
      // Check for grid display in tablet breakpoint
      const tabletSection = cssContent.match(/@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)\s*\{[\s\S]*?\n\}/);
      expect(tabletSection).toBeTruthy();
      
      const tabletStyles = tabletSection[0];
      expect(tabletStyles).toMatch(/\.mood-selector[\s\S]*?display:\s*grid/);
      expect(tabletStyles).toMatch(/\.mood-selector[\s\S]*?grid-template-columns:\s*repeat\(2,\s*1fr\)/);
    });

    it('should use two columns for book cards on tablet', () => {
      // Check for 2-column grid in tablet breakpoint
      const tabletSection = cssContent.match(/@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023px\)\s*\{[\s\S]*?\n\}/);
      expect(tabletSection).toBeTruthy();
      
      const tabletStyles = tabletSection[0];
      expect(tabletStyles).toMatch(/\.results-panel[\s\S]*?grid-template-columns:\s*repeat\(2,\s*1fr\)/);
    });
  });

  /**
   * Test desktop breakpoint applies desktop layout
   * Requirements: 7.3
   */
  describe('Desktop breakpoint (> 1024px)', () => {
    it('should have desktop media query defined', () => {
      // Check for desktop breakpoint
      expect(cssContent).toMatch(/@media\s*\(min-width:\s*1024px\)/);
    });

    it('should use three columns for book cards on desktop', () => {
      // Check for 3-column grid in desktop breakpoint
      const desktopSection = cssContent.match(/@media\s*\(min-width:\s*1024px\)\s*\{[\s\S]*?\n\}/);
      expect(desktopSection).toBeTruthy();
      
      const desktopStyles = desktopSection[0];
      expect(desktopStyles).toMatch(/\.results-panel[\s\S]*?grid-template-columns:\s*repeat\(3,\s*1fr\)/);
    });

    it('should apply max-width constraint on desktop', () => {
      // Check for max-width in desktop breakpoint
      const desktopSection = cssContent.match(/@media\s*\(min-width:\s*1024px\)\s*\{[\s\S]*?\n\}/);
      expect(desktopSection).toBeTruthy();
      
      const desktopStyles = desktopSection[0];
      expect(desktopStyles).toMatch(/\.main-content[\s\S]*?max-width:\s*1200px/);
    });

    it('should optimize layout for large screens', () => {
      const desktopSection = cssContent.match(/@media\s*\(min-width:\s*1024px\)\s*\{[\s\S]*?\n\}/);
      expect(desktopSection).toBeTruthy();
      
      const desktopStyles = desktopSection[0];
      // Check for optimized spacing
      expect(desktopStyles).toMatch(/\.mood-selector[\s\S]*?max-width/);
      // Check for enhanced typography
      expect(desktopStyles).toMatch(/\.section-title[\s\S]*?font-size/);
    });
  });
});
