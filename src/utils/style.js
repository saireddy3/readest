import {
  MONOSPACE_FONTS,
  SANS_SERIF_FONTS,
  SERIF_FONTS,
  FALLBACK_FONTS,
  CJK_SANS_SERIF_FONTS,
  CJK_SERIF_FONTS,
} from '../services/constants';
import {
  themes,
  generateLightPalette,
  generateDarkPalette,
} from '../styles/themes';
import { getOSPlatform } from './misc.js';

// Embedded fonts CSS instead of using raw-loader
const fontfacesCSS = `/* Basic web fonts, specific font definitions are loaded at runtime */
@font-face {
  font-family: 'Literata';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Literata');
}
@font-face {
  font-family: 'Bitter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Bitter');
}
@font-face {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Fira Code');
}`;

/**
 * Get font styles CSS
 * @param {string} serif - Serif font family
 * @param {string} sansSerif - Sans-serif font family
 * @param {string} monospace - Monospace font family
 * @param {string} defaultFont - Default font family
 * @param {string} defaultCJKFont - Default CJK font family
 * @param {number} fontSize - Font size in pixels
 * @param {number} minFontSize - Minimum font size in pixels
 * @param {number} fontWeight - Font weight
 * @param {boolean} overrideFont - Whether to override font settings
 * @param {import('../types/book').ThemeCode} themeCode - Theme code
 * @returns {string} Font styles CSS
 */
const getFontStyles = (
  serif,
  sansSerif,
  monospace,
  defaultFont,
  defaultCJKFont,
  fontSize,
  minFontSize,
  fontWeight,
  overrideFont,
  themeCode,
) => {
  const { fg, primary } = themeCode;
  const lastSerifFonts = ['Georgia', 'Times New Roman'];
  const serifFonts = [
    serif,
    ...SERIF_FONTS.filter(
      (font) => font !== serif && font !== defaultCJKFont && !lastSerifFonts.includes(font),
    ),
    ...(defaultCJKFont !== serif ? [defaultCJKFont] : []),
    ...CJK_SERIF_FONTS.filter((font) => font !== serif && font !== defaultCJKFont),
    ...lastSerifFonts.filter(
      (font) => SERIF_FONTS.includes(font) && !lastSerifFonts.includes(defaultCJKFont),
    ),
    ...FALLBACK_FONTS,
  ];
  const sansSerifFonts = [
    sansSerif,
    ...SANS_SERIF_FONTS.filter((font) => font !== sansSerif && font !== defaultCJKFont),
    ...(defaultCJKFont !== sansSerif ? [defaultCJKFont] : []),
    ...CJK_SANS_SERIF_FONTS.filter((font) => font !== sansSerif && font !== defaultCJKFont),
    ...FALLBACK_FONTS,
  ];
  const monospaceFonts = [monospace, ...MONOSPACE_FONTS.filter((font) => font !== monospace)];
  const fontStyles = `
    html {
      --serif: ${serifFonts.map((font) => `"${font}"`).join(', ')}, serif;
      --sans-serif: ${sansSerifFonts.map((font) => `"${font}"`).join(', ')}, sans-serif;
      --monospace: ${monospaceFonts.map((font) => `"${font}"`).join(', ')}, monospace;
    }
    html, body {
      font-family: var(${defaultFont.toLowerCase() === 'serif' ? '--serif' : '--sans-serif'}) ${overrideFont ? '!important' : ''};
      font-size: ${fontSize}px !important;
      font-weight: ${fontWeight};
    }
    font[size="1"] {
      font-size: ${minFontSize}px;
    }
    font[size="2"] {
      font-size: ${minFontSize * 1.5}px;
    }
    font[size="3"] {
      font-size: ${fontSize}px;
    }
    font[size="4"] {
      font-size: ${fontSize * 1.2}px;
    }
    font[size="5"] {
      font-size: ${fontSize * 1.5}px;
    }
    font[size="6"] {
      font-size: ${fontSize * 2}px;
    }
    font[size="7"] {
      font-size: ${fontSize * 3}px;
    }
    body * {
      ${overrideFont ? 'font-family: revert !important;' : ''}
    }
    a:any-link {
      ${overrideFont ? `color: ${primary};` : ''}
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
      a:link {
        ${overrideFont ? `color: lightblue;` : ''}
      }
    }
    /* override inline hardcoded text color */
    *[style*="color: rgb(0,0,0)"], *[style*="color: rgb(0, 0, 0)"],
    *[style*="color: #000"], *[style*="color: #000000"], *[style*="color: black"],
    *[style*="color:rgb(0,0,0)"], *[style*="color:rgb(0, 0, 0)"],
    *[style*="color:#000"], *[style*="color:#000000"], *[style*="color:black"] {
      color: ${fg} !important;
    }
  `;
  return fontStyles;
};

/**
 * Get additional font links
 * @returns {string} Additional font links HTML
 */
const getAdditionalFontLinks = () => `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/misans-webfont@1.0.4/misans-l3/misans-l3/result.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-gb-screen@1.0.6/font.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Noto+Sans+TC&display=swap" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" crossorigin="anonymous">
`;

/**
 * Get additional font faces CSS
 * @returns {string} Additional font faces CSS
 */
const getAdditionalFontFaces = () => `
  @font-face {
    font-family: "FangSong";
    font-display: swap;
    src: local("Fang Song"), local("FangSong"), local("Noto Serif CJK"), local("Source Han Serif SC VF"), url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.eot");
    src: url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.eot?#iefix") format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.woff2") format("woff2"),
    url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.woff") format("woff"),
    url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.ttf") format("truetype"),
    url("https://db.onlinewebfonts.com/t/2ecbfe1d9bfc191c6f15c0ccc23cbd43.svg#FangSong") format("svg");
  }
  @font-face {
    font-family: "Kaiti";
    font-display: swap;
    src: local("Kai"), local("KaiTi"), local("AR PL UKai"), local("LXGW WenKai GB Screen"), url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.eot");
    src: url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/1ee9941f1b8c128110ca4307dda59917.svg#STKaiti")format("svg");
  }
  @font-face {
    font-family: "Heiti";
    font-display: swap;
    src: local("Hei"), local("SimHei"), local("WenQuanYi Zen Hei"), local("Source Han Sans SC VF"), url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.eot");
    src: url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/a4948b9d43a91468825a5251df1ec58d.svg#WenQuanYi Micro Hei")format("svg");
  }
  @font-face {
    font-family: "XiHeiti";
    font-display: swap;
    src: local("PingFang SC"), local("Microsoft YaHei"), local("WenQuanYi Micro Hei"), local("FZHei-B01"), url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.eot");
    src: url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/4f0b783ba4a1b381fc7e7af81ecab481.svg#STHeiti J Light")format("svg");
}
`;

/**
 * Get layout styles CSS
 * @param {boolean} overrideLayout - Whether to override layout settings
 * @param {number} paragraphMargin - Paragraph margin in em
 * @param {number} lineSpacing - Line spacing
 * @param {number} wordSpacing - Word spacing in pixels
 * @param {number} letterSpacing - Letter spacing in pixels
 * @param {number} textIndent - Text indent in em
 * @param {boolean} justify - Whether to justify text
 * @param {boolean} hyphenate - Whether to enable hyphenation
 * @param {number} zoomLevel - Zoom level
 * @param {string} writingMode - Writing mode
 * @param {boolean} vertical - Whether text is vertical
 * @param {import('../types/book').ThemeCode} themeCode - Theme code
 * @returns {string} Layout styles CSS
 */
const getLayoutStyles = (
  overrideLayout,
  paragraphMargin,
  lineSpacing,
  wordSpacing,
  letterSpacing,
  textIndent,
  justify,
  hyphenate,
  zoomLevel,
  writingMode,
  vertical,
  themeCode,
) => {
  const { bg, fg, primary, isDarkMode } = themeCode;
  const layoutStyle = `
  @namespace epub "http://www.idpf.org/2007/ops";
  html {
    color-scheme: ${isDarkMode ? 'dark' : 'light'};
    color: ${fg};
  }
  html {
    --theme-bg-color: ${bg};
    --theme-fg-color: ${fg};
    --theme-primary-color: ${primary};
    --default-text-align: ${justify ? 'justify' : 'start'};
    hanging-punctuation: allow-end last;
    orphans: 2;
    widows: 2;
  }
  [align="left"] { text-align: left; }
  [align="right"] { text-align: right; }
  [align="center"] { text-align: center; }
  [align="justify"] { text-align: justify; }
  :is(hgroup, header) p {
      text-align: unset;
      hyphens: unset;
  }
  pre {
      white-space: pre-wrap !important;
      tab-size: 2;
  }
  html[has-background], body[has-background] {
    --background-set: var(--theme-bg-color);
  }
  html, body {
    color: ${fg};
    ${writingMode === 'auto' ? '' : `writing-mode: ${writingMode} !important;`}
    text-align: var(--default-text-align);
    max-height: unset;
    background-color: var(--theme-bg-color, transparent);
    background: var(--background-set, none);
  }
  body *:not(a):not(#b1):not(#b1 *):not(#b2):not(#b2 *):not(img):not(.bg):not(.bg *):not(.vol):not(.vol *):not(.background):not(.background *) {
    ${bg === '#ffffff' ? '' : `background-color: ${bg} !important;`}
  }
  body {
    overflow: unset;
    zoom: ${zoomLevel};
  }
  svg, img {
    background-color: transparent !important;
  }
  p, li, blockquote, dd {
    line-height: ${lineSpacing} ${overrideLayout ? '!important' : ''};
    word-spacing: ${wordSpacing}px ${overrideLayout ? '!important' : ''};
    letter-spacing: ${letterSpacing}px ${overrideLayout ? '!important' : ''};
    text-indent: ${vertical ? textIndent * 1.2 : textIndent}em;
    text-align: ${overrideLayout ? 'var(--default-text-align)' : 'inherit'};
    -webkit-hyphens: ${hyphenate ? 'auto' : 'manual'};
    hyphens: ${hyphenate ? 'auto' : 'manual'};
    -webkit-hyphenate-limit-before: 3;
    -webkit-hyphenate-limit-after: 2;
    -webkit-hyphenate-limit-lines: 2;
    hanging-punctuation: allow-end last;
    widows: 2;
  }
  p {
    ${vertical ? `margin-left: ${paragraphMargin}em ${overrideLayout ? '!important' : ''};` : ''}
    ${vertical ? `margin-right: ${paragraphMargin}em ${overrideLayout ? '!important' : ''};` : ''}
    ${!vertical ? `margin-top: ${paragraphMargin}em ${overrideLayout ? '!important' : ''};` : ''}
    ${!vertical ? `margin-bottom: ${paragraphMargin}em ${overrideLayout ? '!important' : ''};` : ''}
  }
  li, p:has(> :is(img, video, font, h1, h2, h3, h4, h5, table)) {
    text-indent: 0 !important;
  }
  /* prevent the above from overriding the align attribute */
  [align="left"] { text-align: left; }
  [align="right"] { text-align: right; }
  [align="center"] { text-align: center; }
  [align="justify"] { text-align: justify; }

  pre {
    white-space: pre-wrap !important;
  }
  aside[epub|type~="endnote"],
  aside[epub|type~="footnote"],
  aside[epub|type~="note"],
  aside[epub|type~="rearnote"] {
    display: none;
  }

  img.pi {
    ${vertical ? 'transform: rotate(90deg);' : ''}
    ${vertical ? 'transform-origin: center;' : ''}
    ${vertical ? 'height: 2em;' : ''}
    ${vertical ? `width: ${lineSpacing}em;` : ''}
    ${vertical ? `vertical-align: unset;` : ''}
  }

  aside[epub|type~="footnote"] {
    display: none;
  }

  .duokan-footnote-content,
  .duokan-footnote-item {
    display: none;
  }

  /* Now begins really dirty hacks to fix some badly designed epubs */
  .calibre {
    color: unset;
  }

  .chapterHeader {
    border-color: unset;
  }
`;
  return layoutStyle;
};

/**
 * Get footnote styles CSS
 * @returns {string} Footnote styles CSS
 */
export const getFootnoteStyles = () => `
  .duokan-footnote-content,
  .duokan-footnote-item {
    display: block !important;
  }

  body {
    padding: 1em !important;
  }

  a:any-link {
    text-decoration: none;
  }

  ol {
    margin: 0;
    padding: 0;
  }

  p, li, blockquote, dd {
    margin: unset !important;
    text-indent: unset !important;
  }
`;

/**
 * Get theme code
 * @returns {import('../types/book').ThemeCode} Theme code
 */
export const getThemeCode = () => {
  let themeMode = 'auto';
  let themeColor = 'default';
  let systemIsDarkMode = false;
  let customThemes = [];
  if (typeof window !== 'undefined') {
    themeColor = localStorage.getItem('themeColor') || 'default';
    themeMode = localStorage.getItem('themeMode') || 'auto';
    customThemes = JSON.parse(localStorage.getItem('customThemes') || '[]');
    systemIsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && systemIsDarkMode);
  let currentTheme = themes.find((theme) => theme.name === themeColor);
  if (!currentTheme) {
    const customTheme = customThemes.find((theme) => theme.name === themeColor);
    if (customTheme) {
      currentTheme = {
        name: customTheme.name,
        label: customTheme.label,
        colors: {
          light: generateLightPalette(customTheme.colors.light),
          dark: generateDarkPalette(customTheme.colors.dark),
        },
      };
    }
  }
  if (!currentTheme) currentTheme = themes[0];
  const defaultPalette = isDarkMode ? currentTheme.colors.dark : currentTheme.colors.light;
  return {
    bg: defaultPalette['base-100'],
    fg: defaultPalette['base-content'],
    primary: defaultPalette.primary,
    palette: defaultPalette,
    isDarkMode,
  };
};

/**
 * Get styles CSS
 * @param {import('../types/book').ViewSettings} viewSettings - View settings
 * @param {import('../types/book').ThemeCode} [themeCode] - Theme code
 * @returns {string} Styles CSS
 */
export const getStyles = (viewSettings, themeCode) => {
  if (!themeCode) {
    themeCode = getThemeCode();
  }
  const layoutStyles = getLayoutStyles(
    viewSettings.overrideLayout,
    viewSettings.paragraphMargin,
    viewSettings.lineHeight,
    viewSettings.wordSpacing,
    viewSettings.letterSpacing,
    viewSettings.textIndent,
    viewSettings.fullJustification,
    viewSettings.hyphenation,
    viewSettings.zoomLevel / 100.0,
    viewSettings.writingMode,
    viewSettings.vertical,
    themeCode,
  );
  // scale the font size on-the-fly so that we can sync the same font size on different devices
  const isMobile = ['ios', 'android'].includes(getOSPlatform());
  const fontScale = isMobile ? 1.25 : 1;
  const fontStyles = getFontStyles(
    viewSettings.serifFont,
    viewSettings.sansSerifFont,
    viewSettings.monospaceFont,
    viewSettings.defaultFont,
    viewSettings.defaultCJKFont,
    viewSettings.defaultFontSize * fontScale,
    viewSettings.minimumFontSize,
    viewSettings.fontWeight,
    viewSettings.overrideFont,
    themeCode,
  );
  const userStylesheet = viewSettings.userStylesheet;
  return `${layoutStyles}\n${fontStyles}\n${fontfacesCSS}\n${userStylesheet}`;
};

/**
 * Mount additional fonts to document
 * @param {Document} document - Document to mount fonts to
 */
export const mountAdditionalFonts = (document) => {
  const links = getAdditionalFontLinks();

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(links, 'text/html');

  Array.from(parsedDocument.head.children).forEach((child) => {
    if (child.tagName === 'LINK') {
      const link = document.createElement('link');
      link.rel = child.getAttribute('rel') || '';
      link.href = child.getAttribute('href') || '';
      link.crossOrigin = child.getAttribute('crossorigin') || '';

      document.head.appendChild(link);
    }
  });

  const style = document.createElement('style');
  style.textContent = getAdditionalFontFaces();
  document.head.appendChild(style);
};

/**
 * Transform stylesheet CSS
 * @param {string} css - CSS to transform
 * @returns {string} Transformed CSS
 */
export const transformStylesheet = (css) => {
  // replace absolute font sizes with rem units
  // replace hardcoded colors
  return css
    .replace(/font-size\s*:\s*xx-small/gi, 'font-size: 0.6rem')
    .replace(/font-size\s*:\s*x-small/gi, 'font-size: 0.75rem')
    .replace(/font-size\s*:\s*small/gi, 'font-size: 0.875rem')
    .replace(/font-size\s*:\s*medium/gi, 'font-size: 1rem')
    .replace(/font-size\s*:\s*large/gi, 'font-size: 1.2rem')
    .replace(/font-size\s*:\s*x-large/gi, 'font-size: 1.5rem')
    .replace(/font-size\s*:\s*xx-large/gi, 'font-size: 2rem')
    .replace(/font-size\s*:\s*xxx-large/gi, 'font-size: 3rem')
    .replace(/font-size\s*:\s*(\d+(?:\.\d+)?)px/gi, (_, px) => {
      const rem = parseFloat(px) / 16;
      return `font-size: ${rem}rem`;
    })
    .replace(/font-size\s*:\s*(\d+(?:\.\d+)?)pt/gi, (_, pt) => {
      const rem = parseFloat(pt) / 12;
      return `font-size: ${rem}rem`;
    })
    .replace(/[\s;]color\s*:\s*#000000/gi, 'color: var(--theme-fg-color)')
    .replace(/[\s;]color\s*:\s*#000/gi, 'color: var(--theme-fg-color)')
    .replace(/[\s;]color\s*:\s*rgb\(0,\s*0,\s*0\)/gi, 'color: var(--theme-fg-color)');
}; 