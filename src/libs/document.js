import * as epubcfi from '@skillsoft/foliate-js/epubcfi.js';

// A groupBy polyfill for foliate-js
Object.groupBy ??= (iterable, callbackfn) => {
  const obj = Object.create(null);
  let i = 0;
  for (const value of iterable) {
    const key = callbackfn(value, i++);
    if (key in obj) {
      obj[key].push(value);
    } else {
      obj[key] = [value];
    }
  }
  return obj;
};

Map.groupBy ??= (iterable, callbackfn) => {
  const map = new Map();
  let i = 0;
  for (const value of iterable) {
    const key = callbackfn(value, i++),
      list = map.get(key);
    if (list) {
      list.push(value);
    } else {
      map.set(key, [value]);
    }
  }
  return map;
};

export const CFI = epubcfi;

/**
 * @typedef {Object} TOCItem
 * @property {number} id
 * @property {string} label
 * @property {string} href
 * @property {string} [cfi]
 * @property {TOCItem[]} [subitems]
 */

/**
 * @typedef {Object} SectionItem
 * @property {string} id
 * @property {string} cfi
 * @property {number} size
 */

/**
 * @typedef {Object} BookDoc
 * @property {Object} metadata
 * @property {string|Object} metadata.title - NOTE: the title and author fields should be formatted
 * @property {string|Object} metadata.author
 * @property {string|string[]} metadata.language
 * @property {string} [metadata.editor]
 * @property {string} [metadata.publisher]
 * @property {string} [metadata.published]
 * @property {string} [metadata.description]
 * @property {string[]} [metadata.subject]
 * @property {string} [metadata.identifier]
 * @property {string} dir
 * @property {TOCItem[]} [toc]
 * @property {SectionItem[]} [sections]
 * @property {EventTarget} [transformTarget]
 * @property {function(string): Array<string|number>} splitTOCHref
 * @property {function(): Promise<Blob|null>} getCover
 */

/**
 * @enum {string}
 */
export const SupportedFileFormats = {
  EPUB: 'epub',
  MOBI: 'mobi',
  CBZ: 'cbz',
  FB2: 'fb2',
  FBZ: 'fbz',
};

export const EXTS = {
  EPUB: 'epub',
  MOBI: 'mobi',
  CBZ: 'cbz',
  FB2: 'fb2',
  FBZ: 'fbz',
};

export class DocumentLoader {
  /**
   * @param {File} file
   */
  constructor(file) {
    this.file = file;
  }

  /**
   * @private
   * @returns {Promise<boolean>}
   */
  async isZip() {
    const signature = new Uint8Array(await this.file.slice(0, 4).arrayBuffer());
    return signature[0] === 0x50 && signature[1] === 0x4b && signature[2] === 0x03 && signature[3] === 0x04;
  }

  /**
   * @private
   * @returns {Promise<Object>}
   */
  async makeZipLoader() {
    const getComment = async () => {
      const EOCD_SIGNATURE = [0x50, 0x4b, 0x05, 0x06];
      const maxEOCDSearch = 1024 * 64;

      const sliceSize = Math.min(maxEOCDSearch, this.file.size);
      const tail = await this.file.slice(this.file.size - sliceSize, this.file.size).arrayBuffer();
      const bytes = new Uint8Array(tail);

      for (let i = bytes.length - 22; i >= 0; i--) {
        if (
          bytes[i] === EOCD_SIGNATURE[0] &&
          bytes[i + 1] === EOCD_SIGNATURE[1] &&
          bytes[i + 2] === EOCD_SIGNATURE[2] &&
          bytes[i + 3] === EOCD_SIGNATURE[3]
        ) {
          const commentLength = bytes[i + 20] + (bytes[i + 21] << 8);
          const commentStart = i + 22;
          const commentBytes = bytes.slice(commentStart, commentStart + commentLength);
          return new TextDecoder().decode(commentBytes);
        }
      }

      return null;
    };

    const { configure, ZipReader, BlobReader, TextWriter, BlobWriter } = await import(
      '@zip.js/zip.js'
    );
    configure({ useWebWorkers: false });
    const reader = new ZipReader(new BlobReader(this.file));
    const entries = await reader.getEntries();
    const map = new Map(entries.map((entry) => [entry.filename, entry]));
    const load =
      (f) =>
      (name, ...args) =>
        map.has(name) ? f(map.get(name), ...args) : null;

    const loadText = load((entry) =>
      entry.getData ? entry.getData(new TextWriter()) : null,
    );
    const loadBlob = load((entry, type) =>
      entry.getData ? entry.getData(new BlobWriter(type)) : null,
    );
    const getSize = (name) => map.get(name)?.uncompressedSize ?? 0;

    return { entries, loadText, loadBlob, getSize, getComment, sha1: undefined };
  }

  /**
   * @private
   * @returns {boolean}
   */
  isCBZ() {
    return (
      this.file.type === 'application/vnd.comicbook+zip' || this.file.name.endsWith(`.${EXTS.CBZ}`)
    );
  }

  /**
   * @private
   * @returns {boolean}
   */
  isFB2() {
    return (
      this.file.type === 'application/x-fictionbook+xml' || this.file.name.endsWith(`.${EXTS.FB2}`)
    );
  }

  /**
   * @private
   * @returns {boolean}
   */
  isFBZ() {
    return (
      this.file.type === 'application/x-zip-compressed-fb2' ||
      this.file.name.endsWith('.fb2.zip') ||
      this.file.name.endsWith(`.${EXTS.FBZ}`)
    );
  }

  /**
   * @returns {Promise<{book: BookDoc, format: string}>}
   */
  async open() {
    let format = 'EPUB';
    let book = null;

    if (await this.isZip()) {
      const loader = await this.makeZipLoader();
      if (this.isCBZ()) {
        const { makeCBZ } = await import('@skillsoft/foliate-js/comic-book.js');
        const blob = await this.file.arrayBuffer();
        book = await makeCBZ(blob);
        format = 'CBZ';
      } else if (this.isFBZ()) {
        const { makeFB2 } = await import('@skillsoft/foliate-js/fb2.js');
        const blob = await this.file.arrayBuffer();
        book = await makeFB2(blob);
        format = 'FBZ';
      } else {
        const { EPUB } = await import('@skillsoft/foliate-js/epub.js');
        book = await new EPUB(loader).init();
        format = 'EPUB';
      }
          } else if (await (await import('@skillsoft/foliate-js/mobi.js')).isMOBI(this.file)) {
        const fflate = await import('@skillsoft/foliate-js/vendor/fflate.js');
        const { MOBI } = await import('@skillsoft/foliate-js/mobi.js');
      book = await new MOBI({ unzlib: fflate.unzlibSync }).open(this.file);
      format = 'MOBI';
    } else if (this.isFB2()) {
              const { makeFB2 } = await import('@skillsoft/foliate-js/fb2.js');
      book = await makeFB2(this.file);
      format = 'FB2';
    }
    return { book, format };
  }
}

/**
 * @param {Document} doc
 * @returns {{vertical: boolean, rtl: boolean}}
 */
export const getDirection = (doc) => {
  const { defaultView } = doc;
  const { writingMode, direction } = defaultView.getComputedStyle(doc.body);
  const vertical = writingMode === 'vertical-rl' || writingMode === 'vertical-lr';
  const rtl = doc.body.dir === 'rtl' || direction === 'rtl' || doc.documentElement.dir === 'rtl';
  return { vertical, rtl };
}; 