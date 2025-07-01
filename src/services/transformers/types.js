/**
 * @typedef {import('@/types/book').ViewSettings} ViewSettings
 */

/**
 * @typedef {Object} TransformContext
 * @property {string} bookKey - The book key
 * @property {ViewSettings} viewSettings - The view settings
 * @property {string} content - The content to transform
 */

/**
 * @typedef {Object} Transformer
 * @property {string} name - The transformer name
 * @property {function(TransformContext): Promise<string>} transform - The transform function
 */

export {}; 