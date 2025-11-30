# MoodReads Design Document

## Overview

MoodReads is a client-side web application built with modern web technologies that provides mood-based book recommendations with dynamic theming and premium animations. The application emphasizes emotional intelligence, aesthetic polish, and delightful user interactions.

The system architecture follows a component-based approach with clear separation between UI presentation, state management, theme logic, and recommendation data. All functionality runs in the browser without requiring a backend server, making it lightweight and easily deployable.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Mood Selector│  │ Message Panel│  │ Results Panel│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Application State                      │
│  • Current Mood                                          │
│  • Easter Egg Unlocked Status                           │
│  • Current Recommendations                              │
└─────────────────────────────────────────────────────────┘
                           │
        ┏━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━┓
        ▼                                    ▼
┌──────────────────┐              ┌──────────────────┐
│  Theme Manager   │              │ Recommendation   │
│                  │              │     Engine       │
│ • Apply Themes   │              │                  │
│ • Transitions    │              │ • Get Books      │
└──────────────────┘              │ • Filter by Mood │
                                  └──────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Styling with CSS custom properties for theming, animations, and transitions
- **Vanilla JavaScript (ES6+)**: Application logic without framework dependencies
- **Local Storage**: Session persistence for easter egg unlock state

### Design Principles

1. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactivity
2. **Mobile-First**: Design starts with mobile constraints, scales up to desktop
3. **Performance**: Minimal dependencies, optimized animations, lazy loading where applicable
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## Components and Interfaces

### 1. Mood Selector Component

**Responsibility**: Displays mood options and handles user selection

**Interface**:
```javascript
class MoodSelector {
  constructor(containerElement, onMoodChange)
  render()
  setActiveMood(moodId)
  unlockEasterEgg()
}
```

**Key Behaviors**:
- Renders mood buttons with icons and labels
- Highlights active mood
- Emits mood change events
- Handles easter egg unlock sequence (e.g., triple-click on logo or konami code)

### 2. Theme Manager

**Responsibility**: Applies and transitions between mood-based themes

**Interface**:
```javascript
class ThemeManager {
  constructor()
  applyTheme(moodId)
  getThemeConfig(moodId)
}
```

**Theme Configuration Structure**:
```javascript
{
  moodId: string,
  colors: {
    background: string,
    primary: string,
    secondary: string,
    text: string,
    accent: string
  },
  transitionDuration: number // milliseconds
}
```

**Key Behaviors**:
- Applies CSS custom properties to root element
- Manages smooth transitions between themes
- Provides theme configurations for each mood

### 3. Message Panel Component

**Responsibility**: Displays contextual motivational messages

**Interface**:
```javascript
class MessagePanel {
  constructor(containerElement)
  showMessage(moodId)
  getMessage(moodId)
}
```

**Key Behaviors**:
- Retrieves mood-specific messages
- Animates message appearance
- Updates message when mood changes

### 4. Results Panel Component

**Responsibility**: Displays book recommendations with animations

**Interface**:
```javascript
class ResultsPanel {
  constructor(containerElement)
  displayBooks(books)
  clear()
  animateBookCard(cardElement, index)
}
```

**Key Behaviors**:
- Creates book card elements
- Applies staggered fade-in and slide-up animations
- Handles hover interactions
- Clears previous results

### 5. Recommendation Engine

**Responsibility**: Provides book recommendations based on mood

**Interface**:
```javascript
class RecommendationEngine {
  constructor()
  getRecommendations(moodId)
  getBooksByMood(moodId)
}
```

**Key Behaviors**:
- Maintains curated book database
- Filters books by mood category
- Returns formatted recommendation objects

### 6. Application Controller

**Responsibility**: Coordinates all components and manages application state

**Interface**:
```javascript
class MoodReadsApp {
  constructor()
  init()
  handleMoodChange(moodId)
  checkEasterEggUnlock()
  saveState()
  loadState()
}
```

**Key Behaviors**:
- Initializes all components
- Handles mood selection events
- Coordinates theme changes and recommendation updates
- Manages session state persistence

## Data Models

### Mood

```javascript
{
  id: string,           // e.g., "dark", "cozy", "heartbreaking", "motivational", "chaotic"
  label: string,        // Display name
  icon: string,         // Icon identifier or emoji
  isEasterEgg: boolean  // Whether this is the hidden mood
}
```

### Book

```javascript
{
  id: string,
  title: string,
  author: string,
  description: string,
  moods: string[],      // Array of mood IDs this book matches
  coverColor: string    // Optional: for visual variety
}
```

### Theme Configuration

```javascript
{
  moodId: string,
  colors: {
    background: string,
    primary: string,
    secondary: string,
    text: string,
    accent: string
  },
  transitionDuration: number
}
```

### Motivational Message

```javascript
{
  moodId: string,
  message: string
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to avoid redundancy:
- Animation properties (3.1, 3.2, 3.3) test overlapping aspects of book card presentation and can be combined
- Mood-specific theme examples (2.1-2.4) validate the same mechanism and can be tested with one property plus examples
- Mood-specific message examples (4.2-4.5) are covered by the general property 4.1
- Recommendation content properties can be consolidated to avoid testing the same data completeness multiple times

### Properties

Property 1: Mood selection triggers recommendations
*For any* valid mood selection, clicking a mood button should update the application state and trigger the recommendation engine to return books
**Validates: Requirements 1.2**

Property 2: Active mood visual feedback
*For any* mood selection, the selected mood button should have visual indicators (CSS classes or attributes) that distinguish it from unselected moods
**Validates: Requirements 1.3**

Property 3: Mood switching updates state
*For any* sequence of mood selections, switching from one mood to another should update the active mood state and regenerate recommendations
**Validates: Requirements 1.5**

Property 4: Theme transition timing
*For any* pair of mood themes, transitioning between them should complete within 300-600 milliseconds
**Validates: Requirements 2.5**

Property 5: Book card presentation
*For any* list of book recommendations, each book card should have fade-in animation, slide-up animation, and shadow styling applied
**Validates: Requirements 3.1, 3.2, 3.3**

Property 6: Animation stagger timing
*For any* list of multiple book cards, each card's animation delay should be staggered by 50-150 milliseconds relative to the previous card
**Validates: Requirements 3.4**

Property 7: Book card hover feedback
*For any* book card, hovering over it should trigger visual style changes (transform, shadow, or opacity)
**Validates: Requirements 3.5**

Property 8: Mood messages exist
*For any* mood selection, the system should display a non-empty contextual message
**Validates: Requirements 4.1**

Property 9: Easter egg persistence
*For any* session, once the easter egg is unlocked, the unlock state should persist in local storage and remain accessible until the session ends
**Validates: Requirements 5.5**

Property 10: Book card styling consistency
*For any* book card rendered, it should have rounded corners and glass-effect CSS properties applied
**Validates: Requirements 6.3**

Property 11: Responsive reflow
*For any* viewport width, the application should not display horizontal scrollbars
**Validates: Requirements 7.4**

Property 12: Touch target sizing
*For any* interactive element (buttons, cards), the minimum touch target dimensions should be at least 44x44 pixels
**Validates: Requirements 7.5**

Property 13: Minimum recommendation count
*For any* mood selection, the recommendation engine should return at least three book recommendations
**Validates: Requirements 8.1**

Property 14: Recommendation data completeness
*For any* book recommendation returned, it should include non-empty title, author, and description fields
**Validates: Requirements 8.2**

## Error Handling

### User Input Errors

**Invalid Mood Selection**:
- If an invalid mood ID is provided, default to neutral theme
- Log warning to console for debugging
- Display fallback message to user

**Missing Recommendation Data**:
- If recommendation engine returns empty results, display friendly "no books found" message
- Provide option to try different mood
- Log error for monitoring

### State Management Errors

**Local Storage Failures**:
- If local storage is unavailable or quota exceeded, continue without persistence
- Gracefully degrade easter egg unlock to session-only memory
- Display no error to user (silent failure)

**Theme Application Errors**:
- If CSS custom properties fail to apply, fall back to default theme
- Ensure text remains readable with fallback colors
- Log error for debugging

### Animation Errors

**Performance Issues**:
- If device has reduced motion preferences, disable animations
- Respect `prefers-reduced-motion` media query
- Maintain functionality without animations

**Animation Timing Conflicts**:
- If rapid mood switching occurs, cancel in-progress animations
- Apply latest theme immediately
- Prevent animation queue buildup

### Data Errors

**Malformed Book Data**:
- Validate book objects before rendering
- Skip books with missing required fields
- Log validation errors
- Continue rendering valid books

**Empty Mood Categories**:
- If a mood has no associated books, display apologetic message
- Suggest alternative moods
- Log warning for content curation

## Testing Strategy

### Unit Testing

MoodReads will use **Vitest** as the testing framework for unit tests, providing fast execution and modern JavaScript support.

**Unit Test Coverage**:

1. **Component Initialization**:
   - Test that MoodSelector renders correct number of mood buttons
   - Test that default theme is applied on app load
   - Test that logo and branding elements are present

2. **Theme Manager**:
   - Test that Dark mood applies correct color scheme
   - Test that Cozy mood applies correct color scheme
   - Test that Heartbreaking mood applies correct color scheme
   - Test that Motivational mood applies correct color scheme

3. **Message Panel**:
   - Test that Heartbreaking mood displays healing message
   - Test that Motivational mood displays encouraging message
   - Test that Dark mood displays validating message
   - Test that Cozy mood displays comforting message

4. **Easter Egg**:
   - Test that easter egg unlock sequence activates Chaotic Gremlin Mode
   - Test that Chaotic Gremlin Mode displays three absurd books
   - Test that Chaotic Gremlin Mode applies chaotic theme

5. **Recommendation Engine**:
   - Test that Dark mood returns dark/gothic themed books
   - Test that Cozy mood returns comforting themed books
   - Test that Heartbreaking mood returns emotional depth books
   - Test that Motivational mood returns inspiring books

6. **Responsive Behavior**:
   - Test that mobile breakpoint (< 768px) applies mobile layout
   - Test that tablet breakpoint (768-1024px) applies tablet layout
   - Test that desktop breakpoint (> 1024px) applies desktop layout

7. **Branding Elements**:
   - Test that logo with book and sparkle is rendered
   - Test that header has pastel gradient styling

### Property-Based Testing

MoodReads will use **fast-check** as the property-based testing library for JavaScript, which provides powerful generators and shrinking capabilities.

**Configuration**:
- Each property-based test will run a minimum of 100 iterations
- Tests will use appropriate generators for mood IDs, book lists, and viewport dimensions
- Each test will be tagged with a comment referencing the design document property

**Property Test Coverage**:

Each correctness property listed above will be implemented as a single property-based test:

1. **Property 1** - Generate random mood selections, verify state updates and recommendation calls
2. **Property 2** - Generate random mood selections, verify active state indicators
3. **Property 3** - Generate random mood sequences, verify state transitions
4. **Property 4** - Generate random theme pairs, measure transition duration
5. **Property 5** - Generate random book lists, verify all cards have animations and shadows
6. **Property 6** - Generate random book lists, verify stagger timing
7. **Property 7** - Generate random book cards, simulate hover, verify style changes
8. **Property 8** - Generate random mood selections, verify non-empty messages
9. **Property 9** - Test unlock persistence across simulated page reloads
10. **Property 10** - Generate random book cards, verify styling properties
11. **Property 11** - Generate random viewport widths, verify no horizontal scroll
12. **Property 12** - Verify all interactive elements meet 44x44px minimum
13. **Property 13** - Generate random mood selections, verify >= 3 recommendations
14. **Property 14** - Generate random mood selections, verify all books have complete data

**Generator Strategy**:
- Mood ID generator: randomly select from valid mood IDs
- Book list generator: create arrays of book objects with random but valid data
- Viewport dimension generator: create random widths across mobile/tablet/desktop ranges
- Theme pair generator: create pairs of different mood IDs for transition testing

### Integration Testing

**End-to-End User Flows**:
1. Load app → select mood → verify theme changes → verify recommendations appear
2. Select mood → hover over book card → verify interaction feedback
3. Unlock easter egg → verify Chaotic Gremlin Mode available → select it → verify absurd books
4. Resize viewport → verify responsive layout changes
5. Switch between multiple moods rapidly → verify no animation conflicts

### Accessibility Testing

**Manual Testing Checklist**:
- Keyboard navigation through all mood buttons
- Screen reader announces mood selections and book titles
- Color contrast meets WCAG AA standards for all themes
- Focus indicators visible on all interactive elements
- Reduced motion preference disables animations

### Performance Testing

**Metrics to Monitor**:
- Initial page load time < 2 seconds
- Theme transition smoothness (60fps target)
- Animation performance on mobile devices
- Memory usage remains stable during mood switching

## Implementation Notes

### CSS Custom Properties for Theming

Use CSS custom properties (variables) for all theme-related values:

```css
:root {
  --color-background: #ffffff;
  --color-primary: #000000;
  --color-secondary: #666666;
  --color-text: #333333;
  --color-accent: #0066cc;
  --transition-duration: 400ms;
}
```

JavaScript updates these properties when mood changes, allowing CSS to handle the visual transitions.

### Animation Performance

Use `transform` and `opacity` for animations (GPU-accelerated):
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly and only during active animations
- Remove `will-change` after animation completes

### Book Data Structure

Store book data in a JavaScript module for easy maintenance:

```javascript
export const bookDatabase = [
  {
    id: 'book-1',
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    description: 'A magical competition between two young illusionists',
    moods: ['dark', 'cozy'],
    coverColor: '#2c1810'
  },
  // ... more books
];
```

### Easter Egg Implementation

Suggested unlock mechanism: Triple-click the logo within 2 seconds, or implement a simple konami code variant. Store unlock state in `sessionStorage`:

```javascript
sessionStorage.setItem('easterEggUnlocked', 'true');
```

### Responsive Breakpoints

```css
/* Mobile: default styles */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Glass Effect Styling

Achieve glass morphism effect with:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

## Deployment Considerations

### Static Hosting

Application can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static file hosting service

### Browser Compatibility

Target modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Optimization

- Minify CSS and JavaScript for production
- Optimize any image assets (logo, icons)
- Use system fonts or load web fonts asynchronously
- Implement lazy loading for book cover images if added later

### SEO Considerations

- Include meta tags for social sharing
- Add descriptive title and meta description
- Use semantic HTML for better crawlability
- Consider adding structured data for book recommendations
