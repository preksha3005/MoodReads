/**
 * Mood Data Structure
 * 
 * Defines all available moods including standard moods and the hidden easter egg mood.
 * Each mood has an id, label, icon, and isEasterEgg flag.
 */

const moods = [
  {
    id: 'dark',
    label: 'Dark',
    icon: '🌙',
    isEasterEgg: false
  },
  {
    id: 'cozy',
    label: 'Cozy',
    icon: '☕',
    isEasterEgg: false
  },
  {
    id: 'heartbreaking',
    label: 'Heartbreaking',
    icon: '💔',
    isEasterEgg: false
  },
  {
    id: 'motivational',
    label: 'Motivational',
    icon: '⚡',
    isEasterEgg: false
  },
  {
    id: 'chaotic',
    label: 'Chaotic Gremlin Mode',
    icon: '🤪',
    isEasterEgg: true
  }
];

/**
 * Get all moods (including easter egg)
 * @returns {Array} Array of all mood objects
 */
export function getAllMoods() {
  return moods;
}

/**
 * Get only standard moods (excluding easter egg)
 * @returns {Array} Array of standard mood objects
 */
export function getStandardMoods() {
  return moods.filter(mood => !mood.isEasterEgg);
}

/**
 * Get a specific mood by id
 * @param {string} moodId - The mood identifier
 * @returns {Object|undefined} Mood object or undefined if not found
 */
export function getMoodById(moodId) {
  return moods.find(mood => mood.id === moodId);
}

/**
 * Get the easter egg mood
 * @returns {Object|undefined} Easter egg mood object
 */
export function getEasterEggMood() {
  return moods.find(mood => mood.isEasterEgg);
}

export default moods;
