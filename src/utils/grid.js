/**
 * Calculate the number of columns for a grid based on container width and item width
 * @param {number} containerWidth - Width of the container
 * @param {number} itemWidth - Width of each item
 * @returns {number} Number of columns
 */
export const calculateColumns = (containerWidth, itemWidth) => {
  return Math.max(1, Math.floor(containerWidth / itemWidth));
};

/**
 * Get grid template configuration for books layout
 * @param {number} count - Number of books to display
 * @param {number} aspectRatio - Container aspect ratio (width/height)
 * @returns {{columns: string, rows: string}} Grid template configuration
 */
const getGridTemplate = (count, aspectRatio) => {
  if (count === 1) {
    return {
      columns: '1fr',
      rows: '1fr'
    };
  }

  if (count === 2) {
    // For 2 books, use horizontal layout if wide screen, vertical if tall screen
    return aspectRatio >= 1 ? {
      columns: '1fr 1fr',
      rows: '1fr'
    } : {
      columns: '1fr',
      rows: '1fr 1fr'
    };
  }

  if (count === 3) {
    // For 3 books, use 2x2 grid with first book spanning 2 cells if wide screen
    // Use 3x1 grid if tall screen
    return aspectRatio >= 1 ? {
      columns: '1fr 1fr',
      rows: '1fr 1fr'
    } : {
      columns: '1fr',
      rows: '1fr 1fr 1fr'
    };
  }

  // For 4 or more books, use 2x2 grid
  return {
    columns: '1fr 1fr',
    rows: '1fr 1fr'
  };
};

export default getGridTemplate; 