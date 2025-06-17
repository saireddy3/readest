import { CFI } from '@/libs/document';

/**
 * Find the path to a TOC item by href
 * @param {Array<Object>} toc - Table of contents array
 * @param {string} href - Target href to find
 * @returns {Array<Object>} Path of TOC items leading to target
 */
export const findParentPath = (toc, href) => {
  for (const item of toc) {
    if (item.href === href) {
      return [item];
    }
    if (item.subitems) {
      const path = findParentPath(item.subitems, href);
      if (path.length) {
        return [item, ...path];
      }
    }
  }
  return [];
};

/**
 * Find a TOC item using binary search by CFI
 * @param {Array<Object>} toc - Table of contents array
 * @param {string} cfi - CFI to find
 * @returns {Object|null} Matching TOC item or null
 */
export const findTocItemBS = (toc, cfi) => {
  let left = 0;
  let right = toc.length - 1;
  let result = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentCfi = toc[mid]?.cfi || '';
    const comparison = CFI.compare(currentCfi, cfi);
    if (comparison === 0) {
      return toc[mid];
    } else if (comparison < 0) {
      result = toc[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};

/**
 * Update TOC item IDs
 * @param {Array<Object>} items - TOC items to update
 * @param {number} [index=0] - Starting index
 * @returns {number} Next available index
 */
export const updateTocID = (items, index = 0) => {
  items.forEach((item) => {
    item.id ??= index++;
    if (item.subitems) {
      index = updateTocID(item.subitems, index);
    }
  });
  return index;
};

/**
 * Update TOC CFIs based on sections
 * @param {Object} bookDoc - Book document object
 * @param {Array<Object>} items - TOC items to update
 * @param {Object<string, Object>} sections - Map of section IDs to section items
 */
export const updateTocCFI = (bookDoc, items, sections) => {
  items.forEach((item) => {
    if (item.href) {
      const id = bookDoc.splitTOCHref(item.href)[0];
      const section = sections[id];
      if (section) {
        item.cfi = section.cfi;
      }
    }
    if (item.subitems) {
      updateTocCFI(bookDoc, item.subitems, sections);
    }
  });
}; 