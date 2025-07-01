/**
 * @typedef {import('./types').Transformer} Transformer
 */

/**
 * @type {Transformer}
 */
export const translateTransformer = {
  name: 'translate',

  /**
   * @param {import('./types').TransformContext} ctx
   * @returns {Promise<string>}
   */
  transform: async (ctx) => {
    return ctx.content;
  },
}; 