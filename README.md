# MoodReads — A Mood-Based Book Recommender Built Using Kiro SPEC

MoodReads is a simple, focused micro-tool that recommends books based on the user’s mood. The project was built for the AI for Bharat Week 1 Micro-Tool Challenge and demonstrates how Kiro SPEC can be used to rapidly generate components, apply themes, manage tasks, and maintain consistency across a multi-file JavaScript project.

The tool provides mood-driven theme changes, curated book recommendations, a motivational message panel, soft animations, an easter egg mode, and a responsive UI. All core features were designed and implemented using Kiro through structured requirements, design, and SPEC-driven development.

---

## Features

### Mood Selector
Users can choose from five moods: Dark, Cozy, Heartbreaking, Motivational, and Chaotic Gremlin Mode. Each mood has its own icon, label, and theme.

### Dynamic Themes
Each mood applies a unique aesthetic to the interface:

- Dark: deep navy background with neon accent  
- Cozy: cream and beige  
- Heartbreaking: muted blues and soft greys  
- Motivational: bright yellows and white  
- Chaotic: lime green and purple  

Themes transition smoothly using CSS variables and animation classes.

### Book Recommendation Engine
A curated dataset of twenty books is mapped to different moods. Recommendations are filtered through the `RecommendationEngine` and rendered through animated book cards.

### Message Panel
Each mood displays a short, mood-specific message to enhance the emotional feel of the recommendation experience.

### Soft Animations
Book cards fade and slide into view to create a polished, responsive experience. Hover effects are subtle and consistent across screen sizes.

### Easter Egg Mode
A triple-click on the MoodReads logo unlocks “Chaotic Gremlin Mode,” which intentionally applies a chaotic theme and presents unconventional book recommendations.

### Responsive Layout
CSS breakpoints ensure that the interface works well on mobile, tablet, and desktop devices.

---

## Project Structure
```
MoodReads/
│
├── .kiro/
│ └── specs/
│ └── moodreads/
│ ├── requirements.md
│ ├── design.md
│ └── tasks.md
│
├── index.html
├── styles.css
├── app.js
│
├── MoodSelector.js
├── ThemeManager.js
├── MessagePanel.js
├── ResultsPanel.js
│
├── RecommendationEngine.js
├── bookDatabase.js
├── moodData.js
│
├── EasterEggUnlock.js
│
├── dist/
├── node_modules/
│
├── tests/
│ ├── MessagePanel.test.js
│ ├── ResultsPanel.test.js
│ └── responsive.test.js
│
├── vitest.config.js
├── package.json
│
└── docs/
├── ACCESSIBILITY-TEST-RESULTS.md
├── BUILD-SUMMARY.md
├── PERFORMANCE-OPTIMIZATION.md
├── TASK-4-IMPLEMENTATION.md
└── TASK-12-COMPLETION-SUMMARY.md
```
