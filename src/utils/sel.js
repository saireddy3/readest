/**
 * @typedef {Object} Frame
 * @property {number} top
 * @property {number} left
 */

/**
 * @typedef {Object} Rect
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {'up'|'down'|'left'|'right'} PositionDir
 */

/**
 * @typedef {Object} Position
 * @property {Point} point
 * @property {PositionDir} [dir]
 */

/**
 * @typedef {Object} TextSelection
 * @property {string} key
 * @property {string} text
 * @property {Range} range
 * @property {number} index
 * @property {string} [href]
 * @property {boolean} [annotated]
 */

/**
 * Calculate frame-relative rectangle coordinates
 * @param {Frame} frame - Frame coordinates
 * @param {Rect} rect - Rectangle coordinates
 * @param {number} [sx=1] - X scale factor
 * @param {number} [sy=1] - Y scale factor
 * @returns {Rect} Frame-relative rectangle
 */
const frameRect = (frame, rect, sx = 1, sy = 1) => {
  const left = sx * rect.left + frame.left;
  const right = sx * rect.right + frame.left;
  const top = sy * rect.top + frame.top;
  const bottom = sy * rect.bottom + frame.top;
  return { left, right, top, bottom };
};

/**
 * Check if point is within viewport
 * @param {Point} point - Point to check
 * @returns {boolean} True if point is in view
 */
const pointIsInView = ({ x, y }) =>
  x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight;

/**
 * Get iframe element containing node
 * @param {Range|Element} nodeElement - Node to find iframe for
 * @returns {HTMLIFrameElement|null} Containing iframe or null
 */
const getIframeElement = (nodeElement) => {
  let node;
  if (nodeElement && typeof nodeElement === 'object' && 'tagName' in nodeElement) {
    node = nodeElement;
  } else if (nodeElement && typeof nodeElement === 'object' && 'collapse' in nodeElement) {
    node = nodeElement.commonAncestorContainer;
  } else {
    node = nodeElement;
  }
  while (node) {
    if (node.nodeType === Node.DOCUMENT_NODE) {
      const doc = node;
      if (doc.defaultView && doc.defaultView.frameElement) {
        return doc.defaultView.frameElement;
      }
    }
    node = node.parentNode;
  }

  return null;
};

/**
 * Constrain point within rectangle bounds
 * @param {Point} point - Point to constrain
 * @param {Rect} rect - Bounding rectangle
 * @param {number} padding - Padding from edges
 * @returns {Point} Constrained point
 */
const constrainPointWithinRect = (point, rect, padding) => {
  return {
    x: Math.max(padding, Math.min(point.x, rect.right - padding)),
    y: Math.max(padding, Math.min(point.y, rect.bottom - padding)),
  };
};

/**
 * Get position for selection or element
 * @param {Range|Element} target - Target range or element
 * @param {Rect} rect - Bounding rectangle
 * @param {number} paddingPx - Padding in pixels
 * @param {boolean} [isVertical=false] - Whether text is vertical
 * @returns {Position} Calculated position
 */
export const getPosition = (target, rect, paddingPx, isVertical = false) => {
  const frameElement = getIframeElement(target);
  const transform = frameElement ? getComputedStyle(frameElement).transform : '';
  const match = transform.match(/matrix\((.+)\)/);
  const [sx, , , sy] = match?.[1]?.split(/\s*,\s*/)?.map((x) => parseFloat(x)) ?? [];

  const frame = frameElement?.getBoundingClientRect() ?? { top: 0, left: 0 };
  const rects = Array.from(target.getClientRects());
  const first = frameRect(frame, rects[0], sx, sy);
  const last = frameRect(frame, rects.at(-1), sx, sy);

  if (isVertical) {
    const leftSpace = first.left - rect.left;
    const rightSpace = rect.right - first.right;
    const dir = leftSpace > rightSpace ? 'left' : 'right';
    const position = {
      point: constrainPointWithinRect(
        {
          x: dir === 'left' ? first.left - rect.left - 6 : first.right - rect.left + 6,
          y: (first.top + first.bottom) / 2 - rect.top,
        },
        rect,
        paddingPx,
      ),
      dir,
    };
    const inView = pointIsInView(position.point);
    return inView ? position : { point: { x: 0, y: 0 }, dir };
  }

  const start = {
    point: { x: (first.left + first.right) / 2 - rect.left, y: first.top - rect.top - 12 },
    dir: 'up',
  };
  const end = {
    point: { x: (last.left + last.right) / 2 - rect.left, y: last.bottom - rect.top + 6 },
    dir: 'down',
  };
  const startInView = pointIsInView(start.point);
  const endInView = pointIsInView(end.point);
  if (!startInView && !endInView) return { point: { x: 0, y: 0 } };
  if (!startInView) return end;
  if (!endInView) return start;
  return start.point.y > window.innerHeight - end.point.y ? start : end;
};

/**
 * Get popup position based on target position
 * @param {Position} position - Target position
 * @param {Rect} boundingReact - Bounding rectangle
 * @param {number} popupWidthPx - Popup width in pixels
 * @param {number} popupHeightPx - Popup height in pixels
 * @param {number} popupPaddingPx - Popup padding in pixels
 * @returns {Position} Calculated popup position
 */
export const getPopupPosition = (
  position,
  boundingReact,
  popupWidthPx,
  popupHeightPx,
  popupPaddingPx,
) => {
  const popupPoint = { x: 0, y: 0 };
  if (position.dir === 'up') {
    popupPoint.x = position.point.x - popupWidthPx / 2;
    popupPoint.y = position.point.y - popupHeightPx;
  } else if (position.dir === 'down') {
    popupPoint.x = position.point.x - popupWidthPx / 2;
    popupPoint.y = position.point.y + 6;
  } else if (position.dir === 'left') {
    popupPoint.x = position.point.x - popupWidthPx;
    popupPoint.y = position.point.y - popupHeightPx / 2;
  } else if (position.dir === 'right') {
    popupPoint.x = position.point.x + 6;
    popupPoint.y = position.point.y - popupHeightPx / 2;
  }

  if (popupPoint.x < popupPaddingPx) {
    popupPoint.x = popupPaddingPx;
  }
  if (popupPoint.y < popupPaddingPx) {
    popupPoint.y = popupPaddingPx;
  }
  if (popupPoint.x + popupWidthPx > boundingReact.right - boundingReact.left - popupPaddingPx) {
    popupPoint.x = boundingReact.right - boundingReact.left - popupPaddingPx - popupWidthPx;
  }
  if (popupPoint.y + popupHeightPx > boundingReact.bottom - boundingReact.top - popupPaddingPx) {
    popupPoint.y = boundingReact.bottom - boundingReact.top - popupPaddingPx - popupHeightPx;
  }

  return { point: popupPoint, dir: position.dir };
}; 