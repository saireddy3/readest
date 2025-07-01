/**
 * @typedef {import('./types').Transformer} Transformer
 */

import { translateTransformer } from './translate.js';
import { punctuationTransformer } from './punctuation.js';

/**
 * @type {Transformer[]}
 */
export const activeTransformers = [
  punctuationTransformer,
  translateTransformer,
  // Add more transformers here
]; 