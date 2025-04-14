var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils/misc.ts
import { md5 } from "js-md5";
var uniqueId = () => Math.random().toString(36).substring(2, 9);
var randomMd5 = () => md5(Math.random().toString());
var getContentMd5 = (content) => md5(JSON.stringify(content));
var makeSafeFilename = (filename, replacement = "_") => {
  const unsafeCharacters = /[<>:"\/\\|?*\x00-\x1F]/g;
  const reservedFilenames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
  const maxFilenameBytes = 250;
  let safeName = filename.replace(unsafeCharacters, replacement);
  if (reservedFilenames.test(safeName)) {
    safeName = `${safeName}${replacement}`;
  }
  const encoder = new TextEncoder();
  let utf8Bytes = encoder.encode(safeName);
  while (utf8Bytes.length > maxFilenameBytes) {
    safeName = safeName.slice(0, -1);
    utf8Bytes = encoder.encode(safeName);
  }
  return safeName.trim();
};
var getUserLang = () => {
  if (typeof window === "undefined") {
    return "en";
  }
  const locale = localStorage?.getItem("i18nextLng") || navigator?.language || "";
  return locale.split("-")[0] || "en";
};
var isCJKEnv = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const browserLanguage = navigator.language || "";
  const uiLanguage = localStorage?.getItem("i18nextLng") || "";
  const isCJKUI = ["zh", "ja", "ko"].some((lang) => uiLanguage.startsWith(lang));
  const isCJKLocale = ["zh", "ja", "ko"].some((lang) => browserLanguage.startsWith(lang));
  return isCJKLocale || isCJKUI;
};
var getUserLocale = (lang) => {
  if (typeof window === "undefined") {
    return void 0;
  }
  const languages = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  const filteredLocales = languages.filter((locale) => locale.startsWith(lang));
  return filteredLocales.length > 0 ? filteredLocales[0] : void 0;
};
var getOSPlatform = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (userAgent.includes("android")) return "android";
  if (userAgent.includes("macintosh") || userAgent.includes("mac os x")) return "macos";
  if (userAgent.includes("windows nt")) return "windows";
  if (userAgent.includes("linux")) return "linux";
  return "";
};
var isContentURI = (uri) => {
  return uri.startsWith("content://");
};
var isValidURL = (url, allowedSchemes = ["http", "https"]) => {
  try {
    const { protocol } = new URL(url);
    return allowedSchemes.some((scheme) => `${scheme}:` === protocol);
  } catch {
    return false;
  }
};
var stubTranslation = (key) => {
  return key;
};

// src/utils/config.ts
var getMaxInlineSize = (viewSettings) => {
  const isScrolled = viewSettings.scrolled;
  const maxColumnCount = viewSettings.maxColumnCount;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return maxColumnCount === 1 || isScrolled ? Math.max(screenWidth, screenHeight, 720) : viewSettings.maxInlineSize;
};
var getDefaultMaxInlineSize = () => {
  if (typeof window === "undefined") return 720;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return screenWidth < screenHeight ? Math.max(screenWidth, 720) : 720;
};
var getDefaultMaxBlockSize = () => {
  if (typeof window === "undefined") return 1440;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return Math.max(screenWidth, screenHeight, 1440);
};

// src/services/constants.ts
var LOCAL_BOOKS_SUBDIR = "Readest/Books";
var CLOUD_BOOKS_SUBDIR = "Readest/Books";
var ALLOWED_FILETYPES = [
  "epub",
  "mobi",
  "cbz",
  "fb2",
  "fbz"
];
var FILE_ACCEPT_FORMATS = ALLOWED_FILETYPES.map((ext) => `.${ext}`).join(", ");
var DEFAULT_SYSTEM_SETTINGS = {
  keepLogin: false,
  autoUpload: true,
  alwaysOnTop: false,
  autoCheckUpdates: true,
  screenWakeLock: true,
  autoImportBooksOnOpen: false,
  lastSyncedAtBooks: 0,
  lastSyncedAtConfigs: 0,
  lastSyncedAtNotes: 0
};
var DEFAULT_READSETTINGS = {
  sideBarWidth: "15%",
  isSideBarPinned: true,
  notebookWidth: "25%",
  isNotebookPinned: false,
  autohideCursor: true,
  translateTargetLang: "EN",
  customThemes: [],
  highlightStyle: "highlight",
  highlightStyles: {
    highlight: "yellow",
    underline: "green",
    squiggly: "blue"
  }
};
var DEFAULT_BOOK_FONT = {
  serifFont: "Bitter",
  sansSerifFont: "Roboto",
  monospaceFont: "Consolas",
  defaultFont: "Serif",
  defaultCJKFont: "LXGW WenKai GB Screen",
  defaultFontSize: 16,
  minimumFontSize: 8,
  fontWeight: 400
};
var DEFAULT_BOOK_LAYOUT = {
  marginPx: 44,
  gapPercent: 5,
  scrolled: false,
  disableClick: false,
  swapClickArea: false,
  continuousScroll: false,
  maxColumnCount: 2,
  maxInlineSize: getDefaultMaxInlineSize(),
  maxBlockSize: getDefaultMaxBlockSize(),
  animated: false,
  writingMode: "auto",
  vertical: false,
  rtl: false,
  doubleBorder: false,
  borderColor: "red",
  showHeader: true,
  showFooter: true
};
var DEFAULT_BOOK_STYLE = {
  zoomLevel: 100,
  paragraphMargin: 1,
  lineHeight: 1.6,
  wordSpacing: 0,
  letterSpacing: 0,
  textIndent: 0,
  fullJustification: true,
  hyphenation: true,
  invert: false,
  theme: "light",
  overrideFont: false,
  overrideLayout: true,
  userStylesheet: ""
};
var DEFAULT_MOBILE_VIEW_SETTINGS = {
  fullJustification: false,
  animated: true,
  defaultFont: "Sans-serif"
};
var DEFAULT_CJK_VIEW_SETTINGS = {
  fullJustification: true,
  textIndent: 2
};
var DEFAULT_VIEW_CONFIG = {
  sideBarTab: "toc",
  uiLanguage: ""
};
var DEFAULT_TTS_CONFIG = {
  ttsRate: 1.3,
  ttsVoice: ""
};
var DEFAULT_BOOK_SEARCH_CONFIG = {
  scope: "book",
  matchCase: false,
  matchWholeWords: false,
  matchDiacritics: false
};
var SYSTEM_SETTINGS_VERSION = 1;
var SERIF_FONTS = [
  "Bitter",
  "Literata",
  "Merriweather",
  "Vollkorn",
  "Georgia",
  "Times New Roman"
];
var CJK_SERIF_FONTS = [stubTranslation("LXGW WenKai GB Screen"), stubTranslation("LXGW WenKai TC")];
var CJK_SANS_SERIF_FONTS = ["Noto Sans SC", "Noto Sans TC"];
var SANS_SERIF_FONTS = ["Roboto", "Noto Sans", "Open Sans", "Helvetica", "Arial"];
var MONOSPACE_FONTS = ["Fira Code", "Lucida Console", "Consolas", "Courier New"];
var FALLBACK_FONTS = ["MiSans L3"];
var WINDOWS_FONTS = [
  "Arial",
  "Arial Black",
  "Bahnschrift",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Ebrima",
  "FangSong",
  "Franklin Gothic Medium",
  "Gabriola",
  "Gadugi",
  "Georgia",
  "Heiti",
  "HoloLens MDL2 Assets",
  "Impact",
  "Ink Free",
  "Javanese Text",
  "KaiTi",
  "Leelawadee UI",
  "Lucida Console",
  "Lucida Sans Unicode",
  "LXGW WenKai GB Screen",
  "LXGW WenKai TC",
  "Malgun Gothic",
  "Marlett",
  "Microsoft Himalaya",
  "Microsoft JhengHei",
  "Microsoft New Tai Lue",
  "Microsoft PhagsPa",
  "Microsoft Sans Serif",
  "Microsoft Tai Le",
  "Microsoft YaHei",
  "Microsoft Yi Baiti",
  "MingLiU",
  "MingLiU-ExtB",
  "Mongolian Baiti",
  "MS Gothic",
  "MS Mincho",
  "MV Boli",
  "Myanmar Text",
  "Nirmala UI",
  "Noto Serif JP",
  "NSimSun",
  "Palatino Linotype",
  "PMingLiU",
  "Segoe MDL2 Assets",
  "Segoe Print",
  "Segoe Script",
  "Segoe UI",
  "Segoe UI Historic",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "SimHei",
  "SimSun",
  "SimSun-ExtB",
  "Sitka",
  "Sylfaen",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "XiHeiti",
  "Yu Gothic",
  "Yu Mincho"
];
var MACOS_FONTS = [
  "American Typewriter",
  "Andale Mono",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Arial Unicode MS",
  "Avenir",
  "Avenir Next",
  "Avenir Next Condensed",
  "Baskerville",
  "BiauKai",
  "Big Caslon",
  "Bodoni 72",
  "Bodoni 72 Oldstyle",
  "Bodoni 72 Smallcaps",
  "Bradley Hand",
  "Brush Script MT",
  "Chalkboard",
  "Chalkboard SE",
  "Chalkduster",
  "Charter",
  "Cochin",
  "Comic Sans MS",
  "Copperplate",
  "Courier",
  "Courier New",
  "Didot",
  "DIN Alternate",
  "DIN Condensed",
  "FangSong",
  "Futura",
  "Geneva",
  "Georgia",
  "Gill Sans",
  "Heiti SC",
  "Heiti TC",
  "Helvetica",
  "Helvetica Neue",
  "Herculanum",
  "Hiragino Sans",
  "Hiragino Mincho",
  "Hoefler Text",
  "Impact",
  "Kaiti SC",
  "Kaiti TC",
  "Kozuka Gothic Pro",
  "Kozuka Mincho Pro",
  "Lucida Grande",
  "Luminari",
  "LXGW WenKai GB Screen",
  "LXGW WenKai TC",
  "Marker Felt",
  "Menlo",
  "Microsoft Sans Serif",
  "Monaco",
  "Noteworthy",
  "Noto Serif JP",
  "Optima",
  "Palatino",
  "Papyrus",
  "PingFang HK",
  "PingFang SC",
  "PingFang TC",
  "Phosphate",
  "Rockwell",
  "Savoye LET",
  "SignPainter",
  "Skia",
  "Snell Roundhand",
  "Songti SC",
  "Songti TC",
  "STFangsong",
  "STKaiti",
  "STSong",
  "STXihei",
  "Tahoma",
  "Times",
  "Times New Roman",
  "Trattatello",
  "Trebuchet MS",
  "Verdana",
  "XiHeiti",
  "Yu Mincho",
  "Zapfino"
];
var LINUX_FONTS = [
  "Arial",
  "Cantarell",
  "Comic Sans MS",
  "Courier New",
  "DejaVu Sans",
  "DejaVu Sans Mono",
  "DejaVu Serif",
  "Droid Sans",
  "Droid Sans Mono",
  "FangSong",
  "FreeMono",
  "FreeSans",
  "FreeSerif",
  "Georgia",
  "Heiti",
  "Impact",
  "Kaiti",
  "Liberation Mono",
  "Liberation Sans",
  "Liberation Serif",
  "LXGW WenKai GB Screen",
  "LXGW WenKai TC",
  "Noto Mono",
  "Noto Sans",
  "Noto Sans JP",
  "Noto Sans CJK SC",
  "Noto Sans CJK TC",
  "Noto Serif",
  "Noto Serif JP",
  "Noto Serif CJK SC",
  "Noto Serif CJK TC",
  "Open Sans",
  "Poppins",
  "Sazanami Gothic",
  "Sazanami Mincho",
  "Source Han Sans",
  "Source Han Serif",
  "Times New Roman",
  "Ubuntu",
  "Ubuntu Mono",
  "WenQuanYi Micro Hei",
  "WenQuanYi Zen Hei",
  "XiHeiti"
];
var IOS_FONTS = [
  "Avenir",
  "Avenir Next",
  "Courier",
  "Courier New",
  "FangSong",
  "Georgia",
  "Heiti",
  "Helvetica",
  "Helvetica Neue",
  "Hiragino Mincho",
  "Hiragino Sans",
  "Kaiti",
  "LXGW WenKai GB Screen",
  "LXGW WenKai TC",
  "Palatino",
  "PingFang SC",
  "PingFang TC",
  "San Francisco",
  "SF Pro Display",
  "SF Pro Rounded",
  "SF Pro Text",
  "Songti",
  "Times New Roman",
  "Verdana",
  "XiHeiti"
];
var ANDROID_FONTS = [
  "Arial",
  "Droid Sans",
  "Droid Serif",
  "FangSong",
  "FZLanTingHei",
  "Georgia",
  "Heiti",
  "Kaiti",
  "LXGW WenKai GB Screen",
  "LXGW WenKai TC",
  "Noto Sans",
  "Noto Sans CJK",
  "Noto Sans JP",
  "Noto Serif",
  "Noto Serif CJK",
  "Noto Serif JP",
  "PingFang SC",
  "Roboto",
  "Source Han Sans",
  "Source Han Serif",
  "STHeiti",
  "STSong",
  "Tahoma",
  "Verdana",
  "XiHeiti"
];
var CJK_NAMES_PATTENS = /[\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;
var CJK_FONTS_PATTENS = new RegExp(
  [
    "CJK",
    "TC$",
    "SC$",
    "HK",
    "JP",
    "TW",
    "Sim",
    "Kai",
    "Hei",
    "Yan",
    "Min",
    "Yuan",
    "Song",
    "Ming",
    "FZ",
    "FangZheng",
    "WenQuanYi",
    "PingFang",
    "Hiragino",
    "Meiryo",
    "Source\\s?Han",
    "Yu\\s?Gothic",
    "Yu\\s?Mincho",
    "Mincho",
    "Gothic",
    "Nanum",
    "Malgun",
    "Gulim",
    "Dotum",
    "Batang",
    "Gungsuh",
    "OPPO sans",
    "MiSans",
    "Fallback"
  ].join("|"),
  "i"
);
var BOOK_IDS_SEPARATOR = "+";
var SYNC_PROGRESS_INTERVAL_SEC = 60;
var SYNC_NOTES_INTERVAL_SEC = 10;
var CHECK_UPDATE_INTERVAL_SEC = 24 * 60 * 60;
var MAX_ZOOM_LEVEL = 500;
var MIN_ZOOM_LEVEL = 50;
var ZOOM_STEP = 10;
var DEFAULT_STORAGE_QUOTA = {
  free: 500 * 1024 * 1024,
  plus: 2 * 1024 * 1024 * 1024,
  pro: 10 * 1024 * 1024 * 1024
};
var DOUBLE_CLICK_INTERVAL_THRESHOLD_MS = 250;
var DISABLE_DOUBLE_CLICK_ON_MOBILE = true;
var LONG_HOLD_THRESHOLD = 500;
var HIGHLIGHT_COLOR_HEX = {
  red: "#f87171",
  // red-400
  yellow: "#facc15",
  // yellow-400
  green: "#4ade80",
  // green-400
  blue: "#60a5fa",
  // blue-400
  violet: "#a78bfa"
  // violet-400
};
var CUSTOM_THEME_TEMPLATES = [
  {
    light: {
      fg: "#2b2b2b",
      bg: "#f3f3f3",
      primary: "#3c5a72"
    },
    dark: {
      fg: "#d0d0d0",
      bg: "#1a1c1f",
      primary: "#486e8a"
    }
  },
  {
    light: {
      fg: "#3f2f3c",
      bg: "#f5ecf8",
      primary: "#7b5291"
    },
    dark: {
      fg: "#d6cadd",
      bg: "#3a2c3d",
      primary: "#bda0cc"
    }
  },
  {
    light: {
      fg: "#2b2b2b",
      bg: "#defcd9",
      primary: "#00796b"
    },
    dark: {
      fg: "#c8e6c9",
      bg: "#273c33",
      primary: "#26a69a"
    }
  }
];
var MIGHT_BE_RTL_LANGS = [
  "zh",
  "ja",
  "ko",
  "ar",
  "he",
  "fa",
  "ur",
  "dv",
  "ps",
  "sd",
  "yi",
  ""
];
var TRANSLATED_LANGS = {
  en: "English",
  fr: "Fran\xE7ais",
  de: "Deutsch",
  it: "Italiano",
  ja: "\u65E5\u672C\u8A9E",
  ko: "\uD55C\uAD6D\uC5B4",
  es: "Espa\xF1ol",
  pt: "Portugu\xEAs",
  ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  el: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
  uk: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  pl: "Polski",
  tr: "T\xFCrk\xE7e",
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940",
  id: "Bahasa Indonesia",
  vi: "Ti\u1EBFng Vi\u1EC7t",
  "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
  "zh-TW": "\u6B63\u9AD4\u4E2D\u6587"
};

// src/libs/document.ts
import * as epubcfi from "foliate-js/epubcfi.js";
Object.groupBy ??= (iterable, callbackfn) => {
  const obj = /* @__PURE__ */ Object.create(null);
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
  const map = /* @__PURE__ */ new Map();
  let i = 0;
  for (const value of iterable) {
    const key = callbackfn(value, i++), list = map.get(key);
    if (list) {
      list.push(value);
    } else {
      map.set(key, [value]);
    }
  }
  return map;
};
var CFI = epubcfi;
var EXTS = {
  EPUB: "epub",
  PDF: "pdf",
  MOBI: "mobi",
  CBZ: "cbz",
  FB2: "fb2",
  FBZ: "fbz"
};
var DocumentLoader = class {
  file;
  constructor(file) {
    this.file = file;
  }
  async isZip() {
    const signature = new Uint8Array(await this.file.slice(0, 4).arrayBuffer());
    return signature[0] === 80 && signature[1] === 75 && signature[2] === 3 && signature[3] === 4;
  }
  async makeZipLoader() {
    const getComment = async () => {
      const EOCD_SIGNATURE = [80, 75, 5, 6];
      const maxEOCDSearch = 1024 * 64;
      const sliceSize = Math.min(maxEOCDSearch, this.file.size);
      const tail = await this.file.slice(this.file.size - sliceSize, this.file.size).arrayBuffer();
      const bytes = new Uint8Array(tail);
      for (let i = bytes.length - 22; i >= 0; i--) {
        if (bytes[i] === EOCD_SIGNATURE[0] && bytes[i + 1] === EOCD_SIGNATURE[1] && bytes[i + 2] === EOCD_SIGNATURE[2] && bytes[i + 3] === EOCD_SIGNATURE[3]) {
          const commentLength = bytes[i + 20] + (bytes[i + 21] << 8);
          const commentStart = i + 22;
          const commentBytes = bytes.slice(commentStart, commentStart + commentLength);
          return new TextDecoder().decode(commentBytes);
        }
      }
      return null;
    };
    const { configure, ZipReader, BlobReader, TextWriter, BlobWriter } = await import("@zip.js/zip.js");
    configure({ useWebWorkers: false });
    const reader = new ZipReader(new BlobReader(this.file));
    const entries = await reader.getEntries();
    const map = new Map(entries.map((entry) => [entry.filename, entry]));
    const load = (f) => (name, ...args) => map.has(name) ? f(map.get(name), ...args) : null;
    const loadText = load(
      (entry) => entry.getData ? entry.getData(new TextWriter()) : null
    );
    const loadBlob = load(
      (entry, type) => entry.getData ? entry.getData(new BlobWriter(type)) : null
    );
    const getSize = (name) => map.get(name)?.uncompressedSize ?? 0;
    return { entries, loadText, loadBlob, getSize, getComment, sha1: void 0 };
  }
  isCBZ() {
    return this.file.type === "application/vnd.comicbook+zip" || this.file.name.endsWith(`.${EXTS.CBZ}`);
  }
  isFB2() {
    return this.file.type === "application/x-fictionbook+xml" || this.file.name.endsWith(`.${EXTS.FB2}`);
  }
  isFBZ() {
    return this.file.type === "application/x-zip-compressed-fb2" || this.file.name.endsWith(".fb2.zip") || this.file.name.endsWith(`.${EXTS.FBZ}`);
  }
  async open() {
    let format = "EPUB";
    let book = null;
    if (await this.isZip()) {
      const loader = await this.makeZipLoader();
      if (this.isCBZ()) {
        const { makeCBZ } = await import("foliate-js/comic-book.js");
        const blob = await this.file.arrayBuffer();
        book = await makeCBZ(blob);
        format = "CBZ";
      } else if (this.isFBZ()) {
        const { makeFB2 } = await import("foliate-js/fb2.js");
        const blob = await this.file.arrayBuffer();
        book = await makeFB2(blob);
        format = "FBZ";
      } else {
        const { EPUB } = await import("foliate-js/epub.js");
        book = await new EPUB(loader).init();
        format = "EPUB";
      }
    } else if (await (await import("foliate-js/mobi.js")).isMOBI(this.file)) {
      const fflate = await import("foliate-js/vendor/fflate.js");
      const { MOBI } = await import("foliate-js/mobi.js");
      book = await new MOBI({ unzlib: fflate.unzlibSync }).open(this.file);
      format = "MOBI";
    } else if (this.isFB2()) {
      const { makeFB2 } = await import("foliate-js/fb2.js");
      book = await makeFB2(this.file);
      format = "FB2";
    }
    return { book, format };
  }
};
var getDirection = (doc) => {
  const { defaultView } = doc;
  const { writingMode, direction } = defaultView.getComputedStyle(doc.body);
  const vertical = writingMode === "vertical-rl" || writingMode === "vertical-lr";
  const rtl = doc.body.dir === "rtl" || direction === "rtl" || doc.documentElement.dir === "rtl";
  return { vertical, rtl };
};

// src/utils/s3.ts
import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
var S3_ENDPOINT = process.env["S3_ENDPOINT"] || "";
var S3_REGION = process.env["S3_REGION"] || "auto";
var S3_ACCESS_KEY_ID = process.env["S3_ACCESS_KEY_ID"] || "";
var S3_SECRET_ACCESS_KEY = process.env["S3_SECRET_ACCESS_KEY"] || "";
var s3Client = new S3Client({
  forcePathStyle: true,
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  }
});

// src/utils/r2.ts
import { AwsClient } from "aws4fetch";

// src/utils/object.ts
var getStorageType = () => {
  if (process.env["NEXT_PUBLIC_OBJECT_STORAGE_TYPE"]) {
    return process.env["NEXT_PUBLIC_OBJECT_STORAGE_TYPE"];
  } else {
    return "r2";
  }
};

// src/utils/rtl.ts
var getDirFromLanguage = (lang) => {
  if (!lang) return "auto";
  const rtlLanguages = /* @__PURE__ */ new Set(["ar", "he", "fa", "ur", "dv", "ps", "sd", "yi"]);
  const primaryLang = lang.split("-")[0].toLowerCase();
  return rtlLanguages.has(primaryLang) ? "rtl" : "auto";
};
var getDirFromUILanguage = () => {
  const lang = getUserLang();
  return getDirFromLanguage(lang);
};

// src/utils/book.ts
var getDir = (book) => {
  return `${book.hash}`;
};
var getLibraryFilename = () => {
  return "library.json";
};
var getRemoteBookFilename = (book) => {
  if (getStorageType() === "r2") {
    return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
  } else if (getStorageType() === "s3") {
    return `${book.hash}/${book.hash}.${EXTS[book.format]}`;
  } else {
    return "";
  }
};
var getLocalBookFilename = (book) => {
  return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
};
var getCoverFilename = (book) => {
  return `${book.hash}/cover.png`;
};
var getConfigFilename = (book) => {
  return `${book.hash}/config.json`;
};
var getFilename = (fileOrUri) => {
  if (isValidURL(fileOrUri) || isContentURI(fileOrUri)) {
    fileOrUri = decodeURI(fileOrUri);
  }
  const normalizedPath = fileOrUri.replace(/\\/g, "/");
  const parts = normalizedPath.split("/");
  const lastPart = parts.pop();
  return lastPart.split("?")[0];
};
var getBaseFilename = (filename) => {
  const normalizedPath = filename.replace(/\\/g, "/");
  const baseName = normalizedPath.split("/").pop()?.split(".").slice(0, -1).join(".") || "";
  return baseName;
};
var INIT_BOOK_CONFIG = {
  updatedAt: 0
};
var formatLanguageMap = (x) => {
  const userLang = getUserLang();
  if (!x) return "";
  if (typeof x === "string") return x;
  const keys = Object.keys(x);
  return x[userLang] || x[keys[0]];
};
var listFormater = (narrow = false, lang = "") => {
  lang = lang ? lang : getUserLang();
  if (narrow) {
    return new Intl.ListFormat("en", { style: "narrow", type: "unit" });
  } else {
    return new Intl.ListFormat(lang, { style: "long", type: "conjunction" });
  }
};
var getBookLangCode = (lang) => {
  try {
    const bookLang = typeof lang === "string" ? lang : lang?.[0];
    return bookLang ? bookLang.split("-")[0] : "";
  } catch {
    return "";
  }
};
var formatAuthors = (contributors, bookLang) => {
  const langCode = getBookLangCode(bookLang) || "en";
  return Array.isArray(contributors) ? listFormater(langCode === "zh", langCode).format(
    contributors.map(
      (contributor) => typeof contributor === "string" ? contributor : formatLanguageMap(contributor?.name)
    )
  ) : typeof contributors === "string" ? contributors : formatLanguageMap(contributors?.name);
};
var formatTitle = (title) => {
  return typeof title === "string" ? title : formatLanguageMap(title);
};
var formatPublisher = (publisher) => {
  return typeof publisher === "string" ? publisher : formatLanguageMap(publisher);
};
var formatLanguage = (lang) => {
  return Array.isArray(lang) ? lang.join(", ") : lang;
};
var primaryLanguage = (lang) => {
  return Array.isArray(lang) ? lang[0] : lang;
};
var formatDate = (date) => {
  if (!date) return;
  const userLang = getUserLang();
  try {
    return new Date(date).toLocaleDateString(userLang, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return;
  }
};
var formatSubject = (subject) => {
  if (!subject) return "";
  return Array.isArray(subject) ? subject.join(", ") : subject;
};
var getCurrentPage = (book, progress) => {
  const bookFormat = book.format;
  const { section, pageinfo } = progress;
  return bookFormat === "PDF" ? section ? section.current + 1 : 0 : pageinfo ? pageinfo.current + 1 : 0;
};
var getBookDirFromWritingMode = (writingMode) => {
  switch (writingMode) {
    case "horizontal-tb":
      return "ltr";
    case "horizontal-rl":
    case "vertical-rl":
      return "rtl";
    default:
      return "auto";
  }
};
var getBookDirFromLanguage = (language) => {
  const lang = primaryLanguage(language) || "";
  return getDirFromLanguage(lang);
};

// src/services/environment.ts
var isWebAppPlatform = () => true;
var isPWA = () => window.matchMedia("(display-mode: standalone)").matches;

// src/utils/md5.ts
import { md5 as md52 } from "js-md5";
function md5Fingerprint(value) {
  return md52(value).slice(0, 7);
}
async function partialMD5(file) {
  const step = 1024;
  const size = 1024;
  const hasher = md52.create();
  for (let i = -1; i <= 10; i++) {
    const start = Math.min(file.size, step << 2 * i);
    const end = Math.min(start + size, file.size);
    if (start >= file.size) break;
    const blobSlice = file.slice(start, end);
    const arrayBuffer = await blobSlice.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    hasher.update(uint8Array);
  }
  return hasher.hex();
}

// src/utils/serializer.ts
var serializeConfig = (config, globalViewSettings, defaultSearchConfig) => {
  config = JSON.parse(JSON.stringify(config));
  const viewSettings = config.viewSettings;
  const searchConfig = config.searchConfig;
  config.viewSettings = Object.entries(viewSettings).reduce(
    (acc, [key, value]) => {
      if (globalViewSettings[key] !== value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  config.searchConfig = Object.entries(searchConfig).reduce(
    (acc, [key, value]) => {
      if (defaultSearchConfig[key] !== value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  return JSON.stringify(config);
};
var deserializeConfig = (str, globalViewSettings, defaultSearchConfig) => {
  const config = JSON.parse(str);
  const { viewSettings, searchConfig } = config;
  config.viewSettings = { ...globalViewSettings, ...viewSettings };
  config.searchConfig = { ...defaultSearchConfig, ...searchConfig };
  config.updatedAt ??= Date.now();
  return config;
};

export {
  __commonJS,
  __toESM,
  getMaxInlineSize,
  uniqueId,
  randomMd5,
  getContentMd5,
  isCJKEnv,
  getUserLocale,
  getOSPlatform,
  isContentURI,
  isValidURL,
  stubTranslation,
  LOCAL_BOOKS_SUBDIR,
  CLOUD_BOOKS_SUBDIR,
  DEFAULT_SYSTEM_SETTINGS,
  DEFAULT_READSETTINGS,
  DEFAULT_BOOK_FONT,
  DEFAULT_BOOK_LAYOUT,
  DEFAULT_BOOK_STYLE,
  DEFAULT_MOBILE_VIEW_SETTINGS,
  DEFAULT_CJK_VIEW_SETTINGS,
  DEFAULT_VIEW_CONFIG,
  DEFAULT_TTS_CONFIG,
  DEFAULT_BOOK_SEARCH_CONFIG,
  SYSTEM_SETTINGS_VERSION,
  SERIF_FONTS,
  CJK_SERIF_FONTS,
  CJK_SANS_SERIF_FONTS,
  SANS_SERIF_FONTS,
  MONOSPACE_FONTS,
  FALLBACK_FONTS,
  WINDOWS_FONTS,
  MACOS_FONTS,
  LINUX_FONTS,
  IOS_FONTS,
  ANDROID_FONTS,
  CJK_NAMES_PATTENS,
  CJK_FONTS_PATTENS,
  BOOK_IDS_SEPARATOR,
  SYNC_PROGRESS_INTERVAL_SEC,
  SYNC_NOTES_INTERVAL_SEC,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  ZOOM_STEP,
  DOUBLE_CLICK_INTERVAL_THRESHOLD_MS,
  DISABLE_DOUBLE_CLICK_ON_MOBILE,
  LONG_HOLD_THRESHOLD,
  HIGHLIGHT_COLOR_HEX,
  CUSTOM_THEME_TEMPLATES,
  MIGHT_BE_RTL_LANGS,
  TRANSLATED_LANGS,
  CFI,
  DocumentLoader,
  getDirection,
  getDirFromUILanguage,
  getDir,
  getLibraryFilename,
  getRemoteBookFilename,
  getLocalBookFilename,
  getCoverFilename,
  getConfigFilename,
  getFilename,
  getBaseFilename,
  INIT_BOOK_CONFIG,
  getBookLangCode,
  formatAuthors,
  formatTitle,
  formatPublisher,
  formatLanguage,
  formatDate,
  formatSubject,
  getCurrentPage,
  getBookDirFromWritingMode,
  getBookDirFromLanguage,
  md5Fingerprint,
  partialMD5,
  serializeConfig,
  deserializeConfig,
  isWebAppPlatform,
  isPWA
};
//# sourceMappingURL=chunk-ZVRKOA2O.mjs.map