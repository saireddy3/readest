/**
 * @typedef {import('./types').Transformer} Transformer
 */

const punctuationMap = {
  '"': '﹃',
  '"': '﹄',
  "'": '﹁',
  "'": '﹂',
};

/**
 * @type {Transformer}
 */
export const punctuationTransformer = {
  name: 'punctuation',

  /**
   * @param {import('./types').TransformContext} ctx
   * @returns {Promise<string>}
   */
  transform: async (ctx) => {
    if (!ctx.content.includes('<html')) return ctx.content;

    const shouldTransform = ctx.viewSettings.vertical === true;
    if (!shouldTransform) return ctx.content;

    let result = ctx.content;
    for (const [original, vertical] of Object.entries(punctuationMap)) {
      result = result.replace(new RegExp(original, 'g'), vertical);
    }

    return result;
  },
}; 