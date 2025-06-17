/**
 * Convert a style object to CSS string
 * @param {Object} style - Style object
 * @returns {string} CSS string
 */
export const styleToString = (style) => {
  return Object.keys(style)
    .map((key) => `${key}: ${style[key]};`)
    .join(' ');
};

/**
 * Convert CSS string to style object
 * @param {string} css - CSS string
 * @returns {Object} Style object
 */
export const stringToStyle = (css) => {
  return css
    .split(';')
    .filter(Boolean)
    .reduce((acc, curr) => {
      const [key, value] = curr.split(':').map((str) => str.trim());
      acc[key] = value;
      return acc;
    }, {});
};

/**
 * Convert a pixel value to rem
 * @param {number} px - Pixel value
 * @returns {string} Rem value
 */
export const pxToRem = (px) => {
  return `${px / 16}rem`;
};

/**
 * Convert a rem value to pixels
 * @param {string} rem - Rem value
 * @returns {number} Pixel value
 */
export const remToPx = (rem) => {
  return parseFloat(rem) * 16;
};

/**
 * Get computed style value
 * @param {HTMLElement} element - Target element
 * @param {string} property - CSS property
 * @returns {string} Computed style value
 */
export const getComputedStyle = (element, property) => {
  return window.getComputedStyle(element).getPropertyValue(property);
};

/**
 * Set CSS custom property
 * @param {string} name - Property name
 * @param {string} value - Property value
 * @param {HTMLElement} [element=document.documentElement] - Target element
 */
export const setCSSProperty = (name, value, element = document.documentElement) => {
  element.style.setProperty(name, value);
};

/**
 * Get CSS custom property
 * @param {string} name - Property name
 * @param {HTMLElement} [element=document.documentElement] - Target element
 * @returns {string} Property value
 */
export const getCSSProperty = (name, element = document.documentElement) => {
  return getComputedStyle(element, name);
}; 