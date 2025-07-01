/**
 * @typedef {import('./transformers/types.js').TransformContext} TransformContext
 */

import { activeTransformers } from './transformers/index.js';

/**
 * @param {TransformContext} ctx
 * @returns {Promise<string>}
 */
export const transformContent = async (ctx) => {
  let transformed = ctx.content;

  for (const transformer of activeTransformers) {
    try {
      transformed = await transformer.transform({ ...ctx, content: transformed });
    } catch (error) {
      console.warn(`Error in transformer ${transformer.name}:`, error);
    }
  }

  return transformed;
}; 