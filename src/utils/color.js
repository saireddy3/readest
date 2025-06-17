/**
 * Convert hex color to OKLCH color space
 * @param {string} hex - Hex color code
 * @returns {Object} OKLCH color values
 */
export const hexToOklch = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Convert to linear RGB
  const rL = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gL = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bL = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Convert to XYZ
  const x = 0.4124564 * rL + 0.3575761 * gL + 0.1804375 * bL;
  const y = 0.2126729 * rL + 0.7151522 * gL + 0.0721750 * bL;
  const z = 0.0193339 * rL + 0.1191920 * gL + 0.9503041 * bL;

  // Convert to LCH
  const l = y > 216/24389 ? Math.pow(y, 1/3) : (24389/27 * y + 16)/116;
  const c = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
  const h = Math.atan2(z, x);

  return {
    l: l * 100,
    c: c * 100,
    h: h * 180 / Math.PI
  };
};

/**
 * Get contrast ratio between two OKLCH colors
 * @param {Object} color1 - First OKLCH color
 * @param {Object} color2 - Second OKLCH color
 * @returns {number} Contrast ratio
 */
export const getContrastOklch = (color1, color2) => {
  const l1 = color1.l / 100;
  const l2 = color2.l / 100;
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}; 