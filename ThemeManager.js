/**
 * ThemeManager - Manages theme configurations and transitions
 * 
 * Responsible for applying mood-based themes by updating CSS custom properties
 * and handling smooth transitions between themes.
 */

class ThemeManager {
  constructor() {
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
    
    this.themes = {
      neutral: {
        moodId: 'neutral',
        colors: {
          background: '#f5f5f5',
          primary: '#333333',
          secondary: '#666666',
          text: '#222222',
          accent: '#8b7fb8',
          cardBg: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(0, 0, 0, 0.1)'
        },
        transitionDuration: 400
      },
      dark: {
        moodId: 'dark',
        colors: {
          background: '#0a1128',
          primary: '#1e3a5f',
          secondary: '#2e5090',
          text: '#e0e7ff',
          accent: '#00d9ff',
          cardBg: 'rgba(30, 58, 95, 0.6)',
          border: 'rgba(0, 217, 255, 0.3)'
        },
        transitionDuration: 500
      },
      cozy: {
        moodId: 'cozy',
        colors: {
          background: '#faf8f3',
          primary: '#8b7355',
          secondary: '#a0826d',
          text: '#3e2723',
          accent: '#d4a574',
          cardBg: 'rgba(244, 236, 224, 0.9)',
          border: 'rgba(139, 115, 85, 0.2)'
        },
        transitionDuration: 400
      },
      heartbreaking: {
        moodId: 'heartbreaking',
        colors: {
          background: '#e8eaf6',
          primary: '#5c6bc0',
          secondary: '#7986cb',
          text: '#37474f',
          accent: '#9fa8da',
          cardBg: 'rgba(197, 202, 233, 0.7)',
          border: 'rgba(92, 107, 192, 0.2)'
        },
        transitionDuration: 450
      },
      motivational: {
        moodId: 'motivational',
        colors: {
          background: '#fffde7',
          primary: '#f57f17',
          secondary: '#fbc02d',
          text: '#33691e',
          accent: '#ffeb3b',
          cardBg: 'rgba(255, 249, 196, 0.9)',
          border: 'rgba(245, 127, 23, 0.2)'
        },
        transitionDuration: 400
      },
      chaotic: {
        moodId: 'chaotic',
        colors: {
          background: '#1a0033',
          primary: '#ff00ff',
          secondary: '#00ff00',
          text: '#ffff00',
          accent: '#00ffff',
          cardBg: 'rgba(255, 0, 255, 0.2)',
          border: 'rgba(0, 255, 255, 0.5)'
        },
        transitionDuration: 300
      }
    };
  }

  /**
   * Get theme configuration for a specific mood
   * @param {string} moodId - The mood identifier
   * @returns {Object} Theme configuration object
   */
  getThemeConfig(moodId) {
    return this.themes[moodId] || this.themes.neutral;
  }

  /**
   * Apply a theme by updating CSS custom properties
   * @param {string} moodId - The mood identifier
   */
  applyTheme(moodId) {
    const theme = this.getThemeConfig(moodId);
    const root = document.documentElement;

    // Respect reduced motion preference - use instant transitions
    const transitionDuration = this.prefersReducedMotion ? 0 : theme.transitionDuration;
    
    // Update transition duration first
    root.style.setProperty('--transition-duration', `${transitionDuration}ms`);

    // Update color custom properties
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-card-bg', theme.colors.cardBg);
    root.style.setProperty('--color-border', theme.colors.border);
  }
}

export default ThemeManager;
