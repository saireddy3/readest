// Export constants
export const BookFormat = {
  EPUB: 'EPUB',
  MOBI: 'MOBI',
  CBZ: 'CBZ',
  FB2: 'FB2',
  FBZ: 'FBZ'
};

export const BookNoteType = {
  BOOKMARK: 'bookmark',
  ANNOTATION: 'annotation',
  EXCERPT: 'excerpt'
};

export const HighlightStyle = {
  HIGHLIGHT: 'highlight',
  UNDERLINE: 'underline',
  SQUIGGLY: 'squiggly'
};

export const HighlightColor = {
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  VIOLET: 'violet'
};

export const WritingMode = {
  AUTO: 'auto',
  HORIZONTAL_TB: 'horizontal-tb',
  HORIZONTAL_RL: 'horizontal-rl',
  VERTICAL_RL: 'vertical-rl'
};

// Export interfaces as JSDoc comments for documentation
/**
 * @typedef {Object} Book
 * @property {string} [url] - URL for remote books
 * @property {string} [filePath] - File path for local books
 * @property {string} hash
 * @property {BookFormat} format
 * @property {string} title
 * @property {string} author
 * @property {string} [group] - Deprecated in favor of groupId and groupName
 * @property {string} [groupId]
 * @property {string} [groupName]
 * @property {string[]} [tags]
 * @property {string|null} [coverImageUrl]
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {number|null} [deletedAt]
 * @property {number|null} [uploadedAt]
 * @property {number|null} [downloadedAt]
 * @property {number} [lastUpdated] - Deprecated in favor of updatedAt
 * @property {[number, number]} [progress] - [current, total], 1-based page number
 */

/**
 * @typedef {Object} BookGroupType
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} PageInfo
 * @property {number} current
 * @property {number} [next]
 * @property {number} total
 */

/**
 * @typedef {Object} BookNote
 * @property {string} [bookHash]
 * @property {string} id
 * @property {BookNoteType} type
 * @property {string} cfi
 * @property {string} [text]
 * @property {HighlightStyle} [style]
 * @property {HighlightColor} [color]
 * @property {string} note
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {number|null} [deletedAt]
 */

/**
 * @typedef {Object} BooknoteGroup
 * @property {number} id
 * @property {string} href
 * @property {string} label
 * @property {BookNote[]} booknotes
 */

/**
 * @typedef {Object} BookLayout
 * @property {number} marginPx
 * @property {number} gapPercent
 * @property {boolean} scrolled
 * @property {boolean} disableClick
 * @property {boolean} swapClickArea
 * @property {boolean} continuousScroll
 * @property {number} maxColumnCount
 * @property {number} maxInlineSize
 * @property {number} maxBlockSize
 * @property {boolean} animated
 * @property {WritingMode} writingMode
 * @property {boolean} vertical
 * @property {boolean} rtl
 * @property {boolean} doubleBorder
 * @property {string} borderColor
 * @property {boolean} showHeader
 * @property {boolean} showFooter
 */

/**
 * @typedef {Object} BookStyle
 * @property {number} zoomLevel
 * @property {number} paragraphMargin
 * @property {number} lineHeight
 * @property {number} wordSpacing
 * @property {number} letterSpacing
 * @property {number} textIndent
 * @property {boolean} fullJustification
 * @property {boolean} hyphenation
 * @property {boolean} invert
 * @property {string} theme
 * @property {boolean} overrideFont
 * @property {boolean} overrideLayout
 * @property {string} userStylesheet
 */

/**
 * @typedef {Object} BookFont
 * @property {string} serifFont
 * @property {string} sansSerifFont
 * @property {string} monospaceFont
 * @property {string} defaultFont
 * @property {string} defaultCJKFont
 * @property {number} defaultFontSize
 * @property {number} minimumFontSize
 * @property {number} fontWeight
 */

/**
 * @typedef {Object} ViewConfig
 * @property {string} sideBarTab
 * @property {string} uiLanguage
 */

/**
 * @typedef {Object} TTSConfig
 * @property {number} ttsRate
 * @property {string} ttsVoice
 */

/**
 * @typedef {Object} ViewSettings
 * @property {BookLayout} layout
 * @property {BookStyle} style
 * @property {BookFont} font
 * @property {ViewConfig} config
 * @property {TTSConfig} tts
 */

/**
 * @typedef {Object} BookProgress
 * @property {string} location
 * @property {number} sectionId
 * @property {string} sectionHref
 * @property {string} sectionLabel
 * @property {PageInfo} section
 * @property {PageInfo} pageinfo
 * @property {Range} range
 */

/**
 * @typedef {Object} BookSearchConfig
 * @property {'book'|'section'} scope
 * @property {boolean} matchCase
 * @property {boolean} matchWholeWords
 * @property {boolean} matchDiacritics
 * @property {number} [index]
 * @property {string} [query]
 */

/**
 * @typedef {Object} SearchExcerpt
 * @property {string} pre
 * @property {string} match
 * @property {string} post
 */

/**
 * @typedef {Object} BookSearchMatch
 * @property {string} cfi
 * @property {SearchExcerpt} excerpt
 */

/**
 * @typedef {Object} BookSearchResult
 * @property {string} label
 * @property {BookSearchMatch[]} subitems
 * @property {number} [progress]
 */

/**
 * @typedef {Object} BookConfig
 * @property {string} [bookHash]
 * @property {[number, number]} [progress] - [current pagenum, total pagenum], 1-based page number
 * @property {string} [location]
 * @property {BookNote[]} [booknotes]
 * @property {Partial<BookSearchConfig>} [searchConfig]
 * @property {Partial<ViewSettings>} [viewSettings]
 * @property {number} [lastSyncedAtConfig]
 * @property {number} [lastSyncedAtNotes]
 * @property {number} updatedAt
 */

/**
 * @typedef {Object} BookDataRecord
 * @property {string} id
 * @property {string} book_hash
 * @property {string} user_id
 * @property {number|null} updated_at
 * @property {number|null} deleted_at
 */

/**
 * @typedef {Object} BooksGroup
 * @property {string} id
 * @property {string} name
 * @property {Book[]} books
 * @property {number} updatedAt
 */

/**
 * @typedef {Object} BookContent
 * @property {Book} book
 * @property {File} file
 * @property {BookConfig} config
 */ 