import { md5 } from 'js-md5';
import * as CFI4 from 'foliate-js/epubcfi.js';
import { S3Client } from '@aws-sdk/client-s3';
import '@aws-sdk/s3-request-presigner';
import 'aws4fetch';
import clsx8 from 'clsx';
import * as React43 from 'react';
import React43__default, { createContext, useContext, useState, useEffect, useRef, Suspense, useCallback, isValidElement } from 'react';
import { create } from 'zustand';
import tinycolor2 from 'tinycolor2';
import Image from 'next/image';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslation$1 } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { MdOutlineHeadphones, MdArrowForwardIos, MdArrowBackIosNew, MdPushPin, MdOutlinePushPin, MdInfoOutline, MdOutlineBookmark, MdOutlineBookmarkAdd, MdZoomOut, MdZoomIn, MdCheck, MdOutlineAutoMode, MdOutlineTextRotationNone, MdTextRotateVertical, MdOutlineLightMode, MdOutlineDarkMode, MdRadioButtonChecked, MdRadioButtonUnchecked, MdBookmarkBorder, MdFastRewind, MdPauseCircle, MdPlayCircle, MdFastForward, MdAlarm } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { IoAccessibilityOutline, IoReload } from 'react-icons/io5';
import { FiSearch, FiMinus, FiPlus, FiChevronUp, FiChevronLeft, FiChevronDown, FiCopy } from 'react-icons/fi';
import { IoIosList } from 'react-icons/io';
import { PiDotsThreeVerticalBold, PiNotePencil, PiPlus, PiHighlighterFill } from 'react-icons/pi';
import { FaSearch, FaChevronDown, FaWikipediaW, FaCheckCircle } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import { TbBoxMargin, TbLayoutSidebarFilled, TbLayoutSidebar, TbSunMoon, TbTextDirectionRtl, TbHexagonLetterD } from 'react-icons/tb';
import { RiArrowRightWideLine, RiArrowLeftWideLine, RiArrowGoForwardLine, RiArrowGoBackLine, RiFontFamily, RiFontSize, RiDashboardLine, RiDeleteBinLine, RiVoiceAiFill } from 'react-icons/ri';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaHeadphones } from 'react-icons/fa6';
import { RxLineHeight, RxSlider } from 'react-icons/rx';
import { VscSymbolColor } from 'react-icons/vsc';
import { CgColorPicker } from 'react-icons/cg';
import { SketchPicker } from 'react-color';
import cssbeautify from 'cssbeautify';
import { BsPencilSquare, BsTranslate } from 'react-icons/bs';
import { Overlayer } from 'foliate-js/overlayer.js';
import { FootnoteHandler } from 'foliate-js/footnotes.js';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils/config.ts
var getMaxInlineSize, getDefaultMaxInlineSize, getDefaultMaxBlockSize;
var init_config = __esm({
  "src/utils/config.ts"() {
    getMaxInlineSize = (viewSettings) => {
      const isScrolled = viewSettings.scrolled;
      const maxColumnCount = viewSettings.maxColumnCount;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      return maxColumnCount === 1 || isScrolled ? Math.max(screenWidth, screenHeight, 720) : viewSettings.maxInlineSize;
    };
    getDefaultMaxInlineSize = () => {
      if (typeof window === "undefined") return 720;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      return screenWidth < screenHeight ? Math.max(screenWidth, 720) : 720;
    };
    getDefaultMaxBlockSize = () => {
      if (typeof window === "undefined") return 1440;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      return Math.max(screenWidth, screenHeight, 1440);
    };
  }
});
var uniqueId, randomMd5, getContentMd5, makeSafeFilename, getUserLang, isCJKEnv, getUserLocale, getOSPlatform, isContentURI, isValidURL, stubTranslation;
var init_misc = __esm({
  "src/utils/misc.ts"() {
    uniqueId = () => Math.random().toString(36).substring(2, 9);
    randomMd5 = () => md5(Math.random().toString());
    getContentMd5 = (content) => md5(JSON.stringify(content));
    makeSafeFilename = (filename, replacement = "_") => {
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
    getUserLang = () => {
      if (typeof window === "undefined") {
        return "en";
      }
      const locale = localStorage?.getItem("i18nextLng") || navigator?.language || "";
      return locale.split("-")[0] || "en";
    };
    isCJKEnv = () => {
      if (typeof window === "undefined") {
        return false;
      }
      const browserLanguage = navigator.language || "";
      const uiLanguage = localStorage?.getItem("i18nextLng") || "";
      const isCJKUI = ["zh", "ja", "ko"].some((lang) => uiLanguage.startsWith(lang));
      const isCJKLocale = ["zh", "ja", "ko"].some((lang) => browserLanguage.startsWith(lang));
      return isCJKLocale || isCJKUI;
    };
    getUserLocale = (lang) => {
      if (typeof window === "undefined") {
        return void 0;
      }
      const languages = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
      const filteredLocales = languages.filter((locale) => locale.startsWith(lang));
      return filteredLocales.length > 0 ? filteredLocales[0] : void 0;
    };
    getOSPlatform = () => {
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
    isContentURI = (uri) => {
      return uri.startsWith("content://");
    };
    isValidURL = (url, allowedSchemes = ["http", "https"]) => {
      try {
        const { protocol } = new URL(url);
        return allowedSchemes.some((scheme) => `${scheme}:` === protocol);
      } catch {
        return false;
      }
    };
    stubTranslation = (key) => {
      return key;
    };
  }
});

// src/services/constants.ts
var LOCAL_BOOKS_SUBDIR, CLOUD_BOOKS_SUBDIR, ALLOWED_FILETYPES, DEFAULT_SYSTEM_SETTINGS, DEFAULT_READSETTINGS, DEFAULT_BOOK_FONT, DEFAULT_BOOK_LAYOUT, DEFAULT_BOOK_STYLE, DEFAULT_MOBILE_VIEW_SETTINGS, DEFAULT_CJK_VIEW_SETTINGS, DEFAULT_VIEW_CONFIG, DEFAULT_TTS_CONFIG, DEFAULT_BOOK_SEARCH_CONFIG, SYSTEM_SETTINGS_VERSION, SERIF_FONTS, CJK_SERIF_FONTS, CJK_SANS_SERIF_FONTS, SANS_SERIF_FONTS, MONOSPACE_FONTS, FALLBACK_FONTS, WINDOWS_FONTS, MACOS_FONTS, LINUX_FONTS, IOS_FONTS, ANDROID_FONTS, CJK_NAMES_PATTENS, CJK_FONTS_PATTENS, BOOK_IDS_SEPARATOR, SYNC_PROGRESS_INTERVAL_SEC, SYNC_NOTES_INTERVAL_SEC, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, ZOOM_STEP, DOUBLE_CLICK_INTERVAL_THRESHOLD_MS, DISABLE_DOUBLE_CLICK_ON_MOBILE, LONG_HOLD_THRESHOLD, HIGHLIGHT_COLOR_HEX, CUSTOM_THEME_TEMPLATES, MIGHT_BE_RTL_LANGS, TRANSLATED_LANGS;
var init_constants = __esm({
  "src/services/constants.ts"() {
    init_config();
    init_misc();
    LOCAL_BOOKS_SUBDIR = "Readest/Books";
    CLOUD_BOOKS_SUBDIR = "Readest/Books";
    ALLOWED_FILETYPES = [
      "epub",
      "mobi",
      "cbz",
      "fb2",
      "fbz"
    ];
    ALLOWED_FILETYPES.map((ext) => `.${ext}`).join(", ");
    DEFAULT_SYSTEM_SETTINGS = {
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
    DEFAULT_READSETTINGS = {
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
    DEFAULT_BOOK_FONT = {
      serifFont: "Bitter",
      sansSerifFont: "Roboto",
      monospaceFont: "Consolas",
      defaultFont: "Serif",
      defaultCJKFont: "LXGW WenKai GB Screen",
      defaultFontSize: 16,
      minimumFontSize: 8,
      fontWeight: 400
    };
    DEFAULT_BOOK_LAYOUT = {
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
    DEFAULT_BOOK_STYLE = {
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
    DEFAULT_MOBILE_VIEW_SETTINGS = {
      fullJustification: false,
      animated: true,
      defaultFont: "Sans-serif"
    };
    DEFAULT_CJK_VIEW_SETTINGS = {
      fullJustification: true,
      textIndent: 2
    };
    DEFAULT_VIEW_CONFIG = {
      sideBarTab: "toc",
      uiLanguage: ""
    };
    DEFAULT_TTS_CONFIG = {
      ttsRate: 1.3,
      ttsVoice: ""
    };
    DEFAULT_BOOK_SEARCH_CONFIG = {
      scope: "book",
      matchCase: false,
      matchWholeWords: false,
      matchDiacritics: false
    };
    SYSTEM_SETTINGS_VERSION = 1;
    SERIF_FONTS = [
      "Bitter",
      "Literata",
      "Merriweather",
      "Vollkorn",
      "Georgia",
      "Times New Roman"
    ];
    CJK_SERIF_FONTS = [stubTranslation("LXGW WenKai GB Screen"), stubTranslation("LXGW WenKai TC")];
    CJK_SANS_SERIF_FONTS = ["Noto Sans SC", "Noto Sans TC"];
    SANS_SERIF_FONTS = ["Roboto", "Noto Sans", "Open Sans", "Helvetica", "Arial"];
    MONOSPACE_FONTS = ["Fira Code", "Lucida Console", "Consolas", "Courier New"];
    FALLBACK_FONTS = ["MiSans L3"];
    WINDOWS_FONTS = [
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
    MACOS_FONTS = [
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
    LINUX_FONTS = [
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
    IOS_FONTS = [
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
    ANDROID_FONTS = [
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
    CJK_NAMES_PATTENS = /[\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;
    CJK_FONTS_PATTENS = new RegExp(
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
    BOOK_IDS_SEPARATOR = "+";
    SYNC_PROGRESS_INTERVAL_SEC = 60;
    SYNC_NOTES_INTERVAL_SEC = 10;
    MAX_ZOOM_LEVEL = 500;
    MIN_ZOOM_LEVEL = 50;
    ZOOM_STEP = 10;
    DOUBLE_CLICK_INTERVAL_THRESHOLD_MS = 250;
    DISABLE_DOUBLE_CLICK_ON_MOBILE = true;
    LONG_HOLD_THRESHOLD = 500;
    HIGHLIGHT_COLOR_HEX = {
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
    CUSTOM_THEME_TEMPLATES = [
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
    MIGHT_BE_RTL_LANGS = [
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
    TRANSLATED_LANGS = {
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
  }
});
var CFI, EXTS, DocumentLoader, getDirection;
var init_document = __esm({
  "src/libs/document.ts"() {
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
    CFI = CFI4;
    EXTS = {
      EPUB: "epub",
      MOBI: "mobi",
      CBZ: "cbz",
      FB2: "fb2",
      FBZ: "fbz"
    };
    DocumentLoader = class {
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
        const { configure, ZipReader, BlobReader, TextWriter, BlobWriter } = await import('@zip.js/zip.js');
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
            const { makeCBZ } = await import('foliate-js/comic-book.js');
            const blob = await this.file.arrayBuffer();
            book = await makeCBZ(blob);
            format = "CBZ";
          } else if (this.isFBZ()) {
            const { makeFB2 } = await import('foliate-js/fb2.js');
            const blob = await this.file.arrayBuffer();
            book = await makeFB2(blob);
            format = "FBZ";
          } else {
            const { EPUB } = await import('foliate-js/epub.js');
            book = await new EPUB(loader).init();
            format = "EPUB";
          }
        } else if (await (await import('foliate-js/mobi.js')).isMOBI(this.file)) {
          const fflate = await import('foliate-js/vendor/fflate.js');
          const { MOBI } = await import('foliate-js/mobi.js');
          book = await new MOBI({ unzlib: fflate.unzlibSync }).open(this.file);
          format = "MOBI";
        } else if (this.isFB2()) {
          const { makeFB2 } = await import('foliate-js/fb2.js');
          book = await makeFB2(this.file);
          format = "FB2";
        }
        return { book, format };
      }
    };
    getDirection = (doc) => {
      const { defaultView } = doc;
      const { writingMode, direction } = defaultView.getComputedStyle(doc.body);
      const vertical = writingMode === "vertical-rl" || writingMode === "vertical-lr";
      const rtl = doc.body.dir === "rtl" || direction === "rtl" || doc.documentElement.dir === "rtl";
      return { vertical, rtl };
    };
  }
});
var S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY;
var init_s3 = __esm({
  "src/utils/s3.ts"() {
    S3_ENDPOINT = process.env["S3_ENDPOINT"] || "";
    S3_REGION = process.env["S3_REGION"] || "auto";
    S3_ACCESS_KEY_ID = process.env["S3_ACCESS_KEY_ID"] || "";
    S3_SECRET_ACCESS_KEY = process.env["S3_SECRET_ACCESS_KEY"] || "";
    new S3Client({
      forcePathStyle: true,
      region: S3_REGION,
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY
      }
    });
  }
});
var init_r2 = __esm({
  "src/utils/r2.ts"() {
  }
});

// src/utils/object.ts
var getStorageType;
var init_object = __esm({
  "src/utils/object.ts"() {
    init_s3();
    init_r2();
    getStorageType = () => {
      if (process.env["NEXT_PUBLIC_OBJECT_STORAGE_TYPE"]) {
        return process.env["NEXT_PUBLIC_OBJECT_STORAGE_TYPE"];
      } else {
        return "r2";
      }
    };
  }
});

// src/utils/rtl.ts
var getDirFromLanguage, getDirFromUILanguage;
var init_rtl = __esm({
  "src/utils/rtl.ts"() {
    init_misc();
    getDirFromLanguage = (lang) => {
      if (!lang) return "auto";
      const rtlLanguages = /* @__PURE__ */ new Set(["ar", "he", "fa", "ur", "dv", "ps", "sd", "yi"]);
      const primaryLang = lang.split("-")[0].toLowerCase();
      return rtlLanguages.has(primaryLang) ? "rtl" : "auto";
    };
    getDirFromUILanguage = () => {
      const lang = getUserLang();
      return getDirFromLanguage(lang);
    };
  }
});

// src/utils/book.ts
var getDir, getLibraryFilename, getRemoteBookFilename, getLocalBookFilename, getCoverFilename, getConfigFilename, getFilename, getBaseFilename, INIT_BOOK_CONFIG, formatLanguageMap, listFormater, getBookLangCode, formatAuthors, formatTitle, formatPublisher, formatLanguage, primaryLanguage, formatDate, formatSubject, getCurrentPage, getBookDirFromWritingMode, getBookDirFromLanguage;
var init_book = __esm({
  "src/utils/book.ts"() {
    init_document();
    init_misc();
    init_object();
    init_rtl();
    getDir = (book) => {
      return `${book.hash}`;
    };
    getLibraryFilename = () => {
      return "library.json";
    };
    getRemoteBookFilename = (book) => {
      if (getStorageType() === "r2") {
        return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
      } else if (getStorageType() === "s3") {
        return `${book.hash}/${book.hash}.${EXTS[book.format]}`;
      } else {
        return "";
      }
    };
    getLocalBookFilename = (book) => {
      return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
    };
    getCoverFilename = (book) => {
      return `${book.hash}/cover.png`;
    };
    getConfigFilename = (book) => {
      return `${book.hash}/config.json`;
    };
    getFilename = (fileOrUri) => {
      if (isValidURL(fileOrUri) || isContentURI(fileOrUri)) {
        fileOrUri = decodeURI(fileOrUri);
      }
      const normalizedPath = fileOrUri.replace(/\\/g, "/");
      const parts = normalizedPath.split("/");
      const lastPart = parts.pop();
      return lastPart.split("?")[0];
    };
    getBaseFilename = (filename) => {
      const normalizedPath = filename.replace(/\\/g, "/");
      const baseName = normalizedPath.split("/").pop()?.split(".").slice(0, -1).join(".") || "";
      return baseName;
    };
    INIT_BOOK_CONFIG = {
      updatedAt: 0
    };
    formatLanguageMap = (x) => {
      const userLang = getUserLang();
      if (!x) return "";
      if (typeof x === "string") return x;
      const keys = Object.keys(x);
      return x[userLang] || x[keys[0]];
    };
    listFormater = (narrow = false, lang = "") => {
      lang = lang ? lang : getUserLang();
      if (narrow) {
        return new Intl.ListFormat("en", { style: "narrow", type: "unit" });
      } else {
        return new Intl.ListFormat(lang, { style: "long", type: "conjunction" });
      }
    };
    getBookLangCode = (lang) => {
      try {
        const bookLang = typeof lang === "string" ? lang : lang?.[0];
        return bookLang ? bookLang.split("-")[0] : "";
      } catch {
        return "";
      }
    };
    formatAuthors = (contributors, bookLang) => {
      const langCode = getBookLangCode(bookLang) || "en";
      return Array.isArray(contributors) ? listFormater(langCode === "zh", langCode).format(
        contributors.map(
          (contributor) => typeof contributor === "string" ? contributor : formatLanguageMap(contributor?.name)
        )
      ) : typeof contributors === "string" ? contributors : formatLanguageMap(contributors?.name);
    };
    formatTitle = (title) => {
      return typeof title === "string" ? title : formatLanguageMap(title);
    };
    formatPublisher = (publisher) => {
      return typeof publisher === "string" ? publisher : formatLanguageMap(publisher);
    };
    formatLanguage = (lang) => {
      return Array.isArray(lang) ? lang.join(", ") : lang;
    };
    primaryLanguage = (lang) => {
      return Array.isArray(lang) ? lang[0] : lang;
    };
    formatDate = (date) => {
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
    formatSubject = (subject) => {
      if (!subject) return "";
      return Array.isArray(subject) ? subject.join(", ") : subject;
    };
    getCurrentPage = (progress) => {
      const { section, pageinfo } = progress;
      return pageinfo ? pageinfo.current + 1 : section ? section.current + 1 : 0;
    };
    getBookDirFromWritingMode = (writingMode) => {
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
    getBookDirFromLanguage = (language) => {
      const lang = primaryLanguage(language) || "";
      return getDirFromLanguage(lang);
    };
  }
});

// src/utils/file.ts
var DeferredBlob, RemoteFile;
var init_file = __esm({
  "src/utils/file.ts"() {
    init_misc();
    DeferredBlob = class _DeferredBlob extends Blob {
      promise;
      constructor(promise, options2) {
        super([], options2);
        this.promise = promise;
      }
      async arrayBuffer() {
        return this.promise;
      }
      slice(start, end, contentType) {
        const slicePromise = this.promise.then((buffer) => {
          const slicedBuffer = buffer.slice(start || 0, end || buffer.byteLength);
          return slicedBuffer;
        });
        return new _DeferredBlob(slicePromise, { type: contentType || this.type });
      }
    };
    RemoteFile = class _RemoteFile extends File {
      url;
      #name;
      #lastModified;
      #size = -1;
      #type = "";
      #cache = /* @__PURE__ */ new Map();
      // LRU cache
      #order = [];
      static MAX_CACHE_CHUNK_SIZE = 1024 * 128;
      static MAX_CACHE_ITEMS_SIZE = 10;
      constructor(url, name, type = "", lastModified = Date.now()) {
        const basename = url.split("/").pop() || "remote-file";
        super([], name || basename, { type, lastModified });
        this.url = url;
        this.#name = name || basename;
        this.#type = type;
        this.#lastModified = lastModified;
      }
      get name() {
        return this.#name;
      }
      get type() {
        return this.#type;
      }
      get size() {
        return this.#size;
      }
      get lastModified() {
        return this.#lastModified;
      }
      async _open_with_head() {
        const response = await fetch(this.url, { method: "HEAD" });
        if (!response.ok) {
          throw new Error(`Failed to fetch file size: ${response.status}`);
        }
        this.#size = Number(response.headers.get("content-length"));
        this.#type = response.headers.get("content-type") || "";
      }
      async _open_with_range() {
        const response = await fetch(this.url, { headers: { Range: `bytes=${0}-${1023}` } });
        if (!response.ok) {
          throw new Error(`Failed to fetch file size: ${response.status}`);
        }
        this.#size = Number(response.headers.get("content-range")?.split("/")[1]);
        this.#type = response.headers.get("content-type") || "";
      }
      async open() {
        if (getOSPlatform() === "android") {
          await this._open_with_range();
        } else {
          await this._open_with_head();
        }
        return Promise.resolve();
      }
      async close() {
        this.#cache.clear();
        this.#order = [];
      }
      async fetchRangePart(start, end) {
        start = Math.max(0, start);
        end = Math.min(this.size - 1, end);
        const response = await fetch(this.url, { headers: { Range: `bytes=${start}-${end}` } });
        if (!response.ok) {
          throw new Error(`Failed to fetch range: ${response.status}`);
        }
        return response.arrayBuffer();
      }
      // inclusive reading of the end: [start, end]
      async fetchRange(start, end) {
        const rangeSize = end - start + 1;
        const MAX_RANGE_LEN = 1024 * 1e3;
        if (rangeSize > MAX_RANGE_LEN) {
          const buffers = [];
          for (let currentStart = start; currentStart <= end; currentStart += MAX_RANGE_LEN) {
            const currentEnd = Math.min(currentStart + MAX_RANGE_LEN - 1, end);
            buffers.push(await this.fetchRangePart(currentStart, currentEnd));
          }
          const totalSize = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
          const combinedBuffer = new Uint8Array(totalSize);
          let offset = 0;
          for (const buffer of buffers) {
            combinedBuffer.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
          }
          return combinedBuffer.buffer;
        } else if (rangeSize > _RemoteFile.MAX_CACHE_CHUNK_SIZE) {
          return this.fetchRangePart(start, end);
        } else {
          let cachedChunkStart = Array.from(this.#cache.keys()).find((chunkStart) => {
            const buffer2 = this.#cache.get(chunkStart);
            const bufferSize = buffer2.byteLength;
            return start >= chunkStart && end <= chunkStart + bufferSize;
          });
          if (cachedChunkStart !== void 0) {
            this.#updateAccessOrder(cachedChunkStart);
            const buffer2 = this.#cache.get(cachedChunkStart);
            const offset2 = start - cachedChunkStart;
            return buffer2.slice(offset2, offset2 + rangeSize);
          }
          cachedChunkStart = await this.#fetchAndCacheChunk(start, end);
          const buffer = this.#cache.get(cachedChunkStart);
          const offset = start - cachedChunkStart;
          return buffer.slice(offset, offset + rangeSize);
        }
      }
      async #fetchAndCacheChunk(start, end) {
        const chunkStart = Math.max(0, start - 1024);
        const chunkEnd = Math.max(end, start + _RemoteFile.MAX_CACHE_CHUNK_SIZE - 1024 - 1);
        this.#cache.set(chunkStart, await this.fetchRangePart(chunkStart, chunkEnd));
        this.#updateAccessOrder(chunkStart);
        this.#ensureCacheSize();
        return chunkStart;
      }
      #updateAccessOrder(chunkStart) {
        const index = this.#order.indexOf(chunkStart);
        if (index > -1) {
          this.#order.splice(index, 1);
        }
        this.#order.unshift(chunkStart);
      }
      #ensureCacheSize() {
        while (this.#cache.size > _RemoteFile.MAX_CACHE_ITEMS_SIZE) {
          const oldestKey = this.#order.pop();
          if (oldestKey !== void 0) {
            this.#cache.delete(oldestKey);
          }
        }
      }
      slice(start = 0, end = this.size, contentType = this.type) {
        const dataPromise = this.fetchRange(start, end - 1);
        return new DeferredBlob(dataPromise, { type: contentType });
      }
      async text() {
        const blob = this.slice(0, this.size);
        return blob.text();
      }
      async arrayBuffer() {
        const blob = this.slice(0, this.size);
        return blob.arrayBuffer();
      }
    };
  }
});
function md5Fingerprint(value) {
  return md5(value).slice(0, 7);
}
async function partialMD5(file) {
  const step = 1024;
  const size = 1024;
  const hasher = md5.create();
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
var init_md5 = __esm({
  "src/utils/md5.ts"() {
  }
});

// src/utils/serializer.ts
var serializeConfig, deserializeConfig;
var init_serializer = __esm({
  "src/utils/serializer.ts"() {
    serializeConfig = (config, globalViewSettings, defaultSearchConfig) => {
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
    deserializeConfig = (str, globalViewSettings, defaultSearchConfig) => {
      const config = JSON.parse(str);
      const { viewSettings, searchConfig } = config;
      config.viewSettings = { ...globalViewSettings, ...viewSettings };
      config.searchConfig = { ...defaultSearchConfig, ...searchConfig };
      config.updatedAt ??= Date.now();
      return config;
    };
  }
});

// src/libs/storage.ts
var createProgressHandler, uploadFile, downloadFile, deleteFile;
var init_storage = __esm({
  "src/libs/storage.ts"() {
    createProgressHandler = (totalFiles, completedFilesRef, onProgress) => {
      return (progress) => {
        const fileProgress = progress.progress / progress.total;
        const overallProgress = (completedFilesRef.count + fileProgress) / totalFiles * 100;
        if (onProgress) {
          onProgress({
            progress: overallProgress,
            total: 100,
            transferSpeed: progress.transferSpeed
          });
        }
      };
    };
    uploadFile = async (file, fileFullPath, onProgress, bookHash) => {
      console.log("File upload skipped in web mode:", file.name);
      if (onProgress) {
        onProgress({ progress: 100, total: 100, transferSpeed: 0 });
      }
      return;
    };
    downloadFile = async (filePath, fileFullPath, onProgress) => {
      console.log("File download skipped in web mode:", filePath);
      if (onProgress) {
        onProgress({ progress: 100, total: 100, transferSpeed: 0 });
      }
      throw new Error("File download skipped in web mode");
    };
    deleteFile = async (filePath) => {
      console.log("File deletion skipped in web mode:", filePath);
      return;
    };
  }
});

// src/utils/txt.ts
var zipWriteOptions, TxtToEpubConverter;
var init_txt = __esm({
  "src/utils/txt.ts"() {
    init_book();
    init_md5();
    zipWriteOptions = {
      lastAccessDate: /* @__PURE__ */ new Date(0),
      lastModDate: /* @__PURE__ */ new Date(0)
    };
    TxtToEpubConverter = class {
      async convert(options2) {
        const { file: txtFile, author: providedAuthor, language: providedLanguage } = options2;
        const fileContent = await txtFile.arrayBuffer();
        const detectedEncoding = this.detectEncoding(fileContent) || "utf-8";
        const decoder = new TextDecoder(detectedEncoding);
        const txtContent = decoder.decode(fileContent).trim();
        const bookTitle = this.extractBookTitle(getBaseFilename(txtFile.name));
        const fileName = `${bookTitle}.epub`;
        const fileHeader = txtContent.slice(0, 1024);
        const authorMatch = fileHeader.match(/[【\[]?作者[】\]]?[:：\s]\s*(.+)\r?\n/) || fileHeader.match(/[【\[]?\s*(.+)\s+著\s*[】\]]?\r?\n/);
        const author = authorMatch ? authorMatch[1].trim() : providedAuthor || "";
        const language = providedLanguage || this.detectLanguage(fileHeader);
        const identifier = await partialMD5(txtFile);
        const metadata = { bookTitle, author, language, identifier };
        let chapters = [];
        for (let i = 4; i >= 3; i--) {
          chapters = this.extractChapters(txtContent, metadata, {
            linesBetweenSegments: i
          });
          if (chapters.length === 0) {
            throw new Error("No chapters detected.");
          } else if (chapters.length > 1) {
            break;
          }
        }
        const blob = await this.createEpub(chapters, metadata);
        return {
          file: new File([blob], fileName),
          bookTitle,
          chapterCount: chapters.length,
          language
        };
      }
      extractChapters(txtContent, metadata, option) {
        const { language } = metadata;
        const { linesBetweenSegments } = option;
        const segmentRegex = new RegExp(`(?:\\r?\\n){${linesBetweenSegments},}|-{4,}\r?
`);
        let chapterRegex;
        if (language === "zh") {
          chapterRegex = /(?:^|\n|\s|《[^》]+》)(第?[一二三四五六七八九十百千万0-9]+[章卷节回讲篇](?:[：:、 　\(\)0-9]+[^\n-]*)?(?!\S)|(?:^|\n|\s|《[^》]+》)[一二三四五六七八九十百千万]+(?:[：:、 　][^\n-]+)(?!\S)|(?:楔子|前言|引言|序言|序章|总论|概论)(?:[：: 　][^\n-]*)?(?!\S))/g;
        } else {
          chapterRegex = /(?:^|\n|\s)(Chapter [0-9]+(?:[: ][^\n]*)?(?!\S)|Part [0-9]+(?:[: ][^\n]*)?(?!\S)|Prologue(?:[: ][^\n]*)?(?!\S)|Introduction(?:[: ][^\n]*)?(?!\S))/g;
        }
        const formatSegment = (segment) => {
          return segment.replace(/-{4,}|_{4,}/g, "\n").split(/\n+/).map((line) => line.trim()).filter((line) => line).join("</p><p>");
        };
        const chapters = [];
        const segments = txtContent.split(segmentRegex);
        for (const segment of segments) {
          const trimmedSegment = segment.replace(/<!--.*?-->/g, "").trim();
          if (!trimmedSegment) continue;
          const segmentChapters = [];
          const matches = trimmedSegment.split(chapterRegex);
          for (let j = 1; j < matches.length; j += 2) {
            const title = matches[j]?.trim() || "";
            const content = matches[j + 1]?.trim() || "";
            let isVolume = false;
            if (language === "zh") {
              isVolume = /第[一二三四五六七八九十百千万0-9]+卷/.test(title);
            } else {
              isVolume = /\b(Part|Volume|Book)\b/i.test(title);
            }
            const headTitle = isVolume ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
            const formattedSegment = formatSegment(content);
            segmentChapters.push({
              title,
              content: `${headTitle}<p>${formattedSegment}</p>`
            });
          }
          if (matches[0] && matches[0].trim()) {
            const initialContent = matches[0].trim();
            const firstLine = initialContent.split("\n")[0].trim();
            const segmentTitle = (firstLine.length > 16 ? initialContent.split(/[\n\s\p{P}]/u)[0].trim() : firstLine) || initialContent.slice(0, 16);
            const formattedSegment = formatSegment(initialContent);
            segmentChapters.unshift({
              title: segmentTitle,
              content: `<h3></h3><p>${formattedSegment}</p>`
            });
          }
          chapters.push(...segmentChapters);
        }
        return chapters;
      }
      async createEpub(chapters, metadata) {
        const { BlobWriter, TextReader, ZipWriter } = await import('@zip.js/zip.js');
        const { bookTitle, author, language, identifier } = metadata;
        const zipWriter = new ZipWriter(new BlobWriter("application/epub+zip"), {
          extendedTimestamp: false
        });
        await zipWriter.add("mimetype", new TextReader("application/epub+zip"), zipWriteOptions);
        const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
    <container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
      <rootfiles>
        <rootfile full-path="content.opf" media-type="application/oebps-package+xml"/>
      </rootfiles>
    </container>`.trim();
        await zipWriter.add("META-INF/container.xml", new TextReader(containerXml), zipWriteOptions);
        const navPoints = chapters.map((chapter, index) => {
          const id = `chapter${index + 1}`;
          const playOrder = index + 1;
          return `
        <navPoint id="navPoint-${id}" playOrder="${playOrder}">
          <navLabel>
            <text>${chapter.title}</text>
          </navLabel>
          <content src="./OEBPS/${id}.xhtml" />
        </navPoint>
      `.trim();
        }).join("\n");
        const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
      <head>
        <meta name="dtb:uid" content="book-id" />
        <meta name="dtb:depth" content="1" />
        <meta name="dtb:totalPageCount" content="0" />
        <meta name="dtb:maxPageNumber" content="0" />
      </head>
      <docTitle>
        <text>${bookTitle}</text>
      </docTitle>
      <docAuthor>
        <text>${author}</text>
      </docAuthor>
      <navMap>
        ${navPoints}
      </navMap>
    </ncx>`.trim();
        await zipWriter.add("toc.ncx", new TextReader(tocNcx), zipWriteOptions);
        const manifest = chapters.map(
          (_, index) => `
      <item id="chap${index + 1}" href="OEBPS/chapter${index + 1}.xhtml" media-type="application/xhtml+xml"/>
    `
        ).join("\n").trim();
        const spine = chapters.map(
          (_, index) => `
      <itemref idref="chap${index + 1}"/>`
        ).join("\n").trim();
        const css = `
      body { line-height: 1.6; font-size: 1em; font-family: 'Arial', sans-serif; text-align: justify; }
      p { text-indent: 2em; margin: 0; }
    `;
        await zipWriter.add("style.css", new TextReader(css), zipWriteOptions);
        for (let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i];
          const chapterContent = `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="zh">
          <head>
            <title>${chapter.title}</title>
            <link rel="stylesheet" type="text/css" href="../style.css"/>
          </head>
          <body>${chapter.content}</body>
        </html>`.trim();
          await zipWriter.add(
            `OEBPS/chapter${i + 1}.xhtml`,
            new TextReader(chapterContent),
            zipWriteOptions
          );
        }
        const tocManifest = `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>`;
        const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
      <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="book-id" version="2.0">
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
          <dc:title>${bookTitle}</dc:title>
          <dc:language>${language}</dc:language>
          <dc:creator>${author}</dc:creator>
          <dc:identifier id="book-id">${identifier}</dc:identifier>
        </metadata>
        <manifest>
          ${manifest}
          ${tocManifest}
        </manifest>
        <spine toc="ncx">
          ${spine}
        </spine>
      </package>`.trim();
        await zipWriter.add("content.opf", new TextReader(contentOpf), zipWriteOptions);
        return await zipWriter.close();
      }
      detectEncoding(buffer) {
        try {
          new TextDecoder("utf-8", { fatal: true }).decode(buffer);
          return "utf-8";
        } catch {
        }
        const headerBytes = new Uint8Array(buffer.slice(0, 4));
        if (headerBytes[0] === 255 && headerBytes[1] === 254) {
          return "utf-16le";
        }
        if (headerBytes[0] === 254 && headerBytes[1] === 255) {
          return "utf-16be";
        }
        if (headerBytes[0] === 239 && headerBytes[1] === 187 && headerBytes[2] === 191) {
          return "utf-8";
        }
        const sample = new Uint8Array(buffer.slice(0, Math.min(1024, buffer.byteLength)));
        let highByteCount = 0;
        for (let i = 0; i < sample.length; i++) {
          if (sample[i] >= 128) {
            highByteCount++;
          }
        }
        const highByteRatio = highByteCount / sample.length;
        if (highByteRatio > 0.3) {
          return "gbk";
        }
        if (highByteRatio > 0.1) {
          let sjisPattern = false;
          for (let i = 0; i < sample.length - 1; i++) {
            const b1 = sample[i];
            const b2 = sample[i + 1];
            if ((b1 >= 129 && b1 <= 159 || b1 >= 224 && b1 <= 252) && (b2 >= 64 && b2 <= 126 || b2 >= 128 && b2 <= 252)) {
              sjisPattern = true;
              break;
            }
          }
          if (sjisPattern) {
            return "shift-jis";
          }
          return "gb18030";
        }
        return "utf-8";
      }
      detectLanguage(fileHeader) {
        const sample = fileHeader;
        let chineseCount = 0;
        for (let i = 0; i < sample.length; i++) {
          const code = sample.charCodeAt(i);
          if (code >= 19968 && code <= 40959 || code >= 13312 && code <= 19903 || code >= 131072 && code <= 173791) {
            chineseCount++;
          }
        }
        if (chineseCount / sample.length > 0.05) {
          return "zh";
        }
        return "en";
      }
      extractBookTitle(filename) {
        const match = filename.match(/《([^》]+)》/);
        return match ? match[1] : filename.split(".")[0];
      }
    };
  }
});

// src/services/errors.ts
var BOOK_FILE_NOT_FOUND_ERROR;
var init_errors = __esm({
  "src/services/errors.ts"() {
    BOOK_FILE_NOT_FOUND_ERROR = "Book file not found";
  }
});

// src/services/appService.ts
var BaseAppService;
var init_appService = __esm({
  "src/services/appService.ts"() {
    init_book();
    init_md5();
    init_document();
    init_constants();
    init_misc();
    init_serializer();
    init_storage();
    init_txt();
    init_errors();
    BaseAppService = class {
      osPlatform = getOSPlatform();
      localBooksDir = "";
      async loadSettings() {
        let settings;
        const { fp, base } = this.resolvePath("settings.json", "Settings");
        try {
          await this.fs.exists(fp, base);
          const txt = await this.fs.readFile(fp, base, "text");
          settings = JSON.parse(txt);
          const version = settings.version ?? 0;
          if (this.isAppDataSandbox || version < SYSTEM_SETTINGS_VERSION) {
            settings.localBooksDir = await this.getInitBooksDir();
            settings.version = SYSTEM_SETTINGS_VERSION;
          }
          settings = { ...DEFAULT_SYSTEM_SETTINGS, ...settings };
          settings.globalReadSettings = { ...DEFAULT_READSETTINGS, ...settings.globalReadSettings };
          settings.globalViewSettings = {
            ...DEFAULT_BOOK_LAYOUT,
            ...DEFAULT_BOOK_STYLE,
            ...DEFAULT_BOOK_FONT,
            ...this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {},
            ...isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {},
            ...DEFAULT_VIEW_CONFIG,
            ...DEFAULT_TTS_CONFIG,
            ...settings.globalViewSettings
          };
        } catch {
          settings = {
            ...DEFAULT_SYSTEM_SETTINGS,
            version: SYSTEM_SETTINGS_VERSION,
            localBooksDir: await this.getInitBooksDir(),
            globalReadSettings: DEFAULT_READSETTINGS,
            globalViewSettings: {
              ...DEFAULT_BOOK_LAYOUT,
              ...DEFAULT_BOOK_STYLE,
              ...DEFAULT_BOOK_FONT,
              ...this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {},
              ...isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {},
              ...DEFAULT_VIEW_CONFIG,
              ...DEFAULT_TTS_CONFIG
            }
          };
          await this.fs.createDir("", "Books", true);
          await this.fs.createDir("", base, true);
          await this.fs.writeFile(fp, base, JSON.stringify(settings));
        }
        this.localBooksDir = settings.localBooksDir;
        const cacheDir = await this.getCacheDir();
        this.fs.getPrefix = (baseDir) => {
          if (baseDir === "Books") {
            return this.localBooksDir;
          } else if (baseDir === "Cache") {
            return cacheDir;
          }
          return null;
        };
        return settings;
      }
      async saveSettings(settings) {
        const { fp, base } = this.resolvePath("settings.json", "Settings");
        await this.fs.createDir("", base, true);
        await this.fs.writeFile(fp, base, JSON.stringify(settings));
      }
      async importBook(file, books, saveBook = true, saveCover = true, overwrite = false, transient = false) {
        try {
          let loadedBook;
          let format;
          let filename;
          let fileobj;
          if (transient && typeof file !== "string") {
            throw new Error("Transient import is only supported for file paths");
          }
          try {
            if (typeof file === "string") {
              filename = getFilename(file);
              fileobj = await this.fs.openFile(file, "None");
            } else {
              filename = file.name;
              fileobj = file;
            }
            if (filename.endsWith(".txt")) {
              const txt2epub = new TxtToEpubConverter();
              ({ file: fileobj } = await txt2epub.convert({ file: fileobj }));
            }
            ({ book: loadedBook, format } = await new DocumentLoader(fileobj).open());
            if (!loadedBook.metadata.title) {
              loadedBook.metadata.title = getBaseFilename(filename);
            }
          } catch (error) {
            console.error(error);
            throw new Error(`Failed to open the book: ${error.message || error}`);
          }
          const hash = await partialMD5(fileobj);
          const existingBook = books.filter((b) => b.hash === hash)[0];
          if (existingBook) {
            if (!transient) {
              existingBook.deletedAt = null;
            }
            existingBook.updatedAt = Date.now();
          }
          const book = {
            hash,
            format,
            title: formatTitle(loadedBook.metadata.title),
            author: formatAuthors(loadedBook.metadata.author, loadedBook.metadata.language),
            createdAt: existingBook ? existingBook.createdAt : Date.now(),
            uploadedAt: existingBook ? existingBook.uploadedAt : null,
            deletedAt: transient ? Date.now() : null,
            downloadedAt: Date.now(),
            updatedAt: Date.now()
          };
          if (existingBook) {
            existingBook.title = book.title;
            existingBook.author = book.author;
          }
          if (!await this.fs.exists(getDir(book), "Books")) {
            await this.fs.createDir(getDir(book), "Books");
          }
          if (saveBook && !transient && (!await this.fs.exists(getLocalBookFilename(book), "Books") || overwrite)) {
            if (typeof file === "string" && isContentURI(file)) {
              await this.fs.copyFile(file, getLocalBookFilename(book), "Books");
            } else if (filename.endsWith(".txt")) {
              await this.fs.writeFile(getLocalBookFilename(book), "Books", fileobj);
            } else if (typeof file === "string" && !isValidURL(file)) {
              await this.fs.copyFile(file, getLocalBookFilename(book), "Books");
            } else {
              await this.fs.writeFile(getLocalBookFilename(book), "Books", fileobj);
            }
          }
          if (saveCover && (!await this.fs.exists(getCoverFilename(book), "Books") || overwrite)) {
            const cover = await loadedBook.getCover();
            if (cover) {
              await this.fs.writeFile(getCoverFilename(book), "Books", await cover.arrayBuffer());
            }
          }
          if (!existingBook) {
            await this.saveBookConfig(book, INIT_BOOK_CONFIG);
            books.splice(0, 0, book);
          }
          if (typeof file === "string") {
            if (isValidURL(file)) {
              book.url = file;
              if (existingBook) existingBook.url = file;
            }
            if (transient) {
              book.filePath = file;
              if (existingBook) existingBook.filePath = file;
            }
          }
          book.coverImageUrl = await this.generateCoverImageUrl(book);
          const f = file;
          if (f && f.close) {
            await f.close();
          }
          return book;
        } catch (error) {
          throw error;
        }
      }
      async deleteBook(book, includingUploaded = false) {
        const fps = [getRemoteBookFilename(book), getCoverFilename(book)];
        const localDeleteFps = [getLocalBookFilename(book), getCoverFilename(book)];
        for (const fp of localDeleteFps) {
          if (await this.fs.exists(fp, "Books")) {
            await this.fs.removeFile(fp, "Books");
          }
        }
        for (const fp of fps) {
          if (includingUploaded) {
            console.log("Deleting uploaded file:", fp);
            const cfp = `${CLOUD_BOOKS_SUBDIR}/${fp}`;
            try {
              deleteFile(cfp);
            } catch (error) {
              console.log("Failed to delete uploaded file:", error);
            }
          }
        }
        book.deletedAt = Date.now();
        book.downloadedAt = null;
        if (includingUploaded) {
          book.uploadedAt = null;
        }
      }
      async uploadFileToCloud(lfp, cfp, handleProgress, hash) {
        console.log("Uploading file:", lfp, "to", cfp);
        const file = await this.fs.openFile(lfp, "Books", cfp);
        const localFullpath = `${this.localBooksDir}/${lfp}`;
        await uploadFile(file, localFullpath, handleProgress, hash);
        const f = file;
        if (f && f.close) {
          await f.close();
        }
      }
      async uploadBook(book, onProgress) {
        let uploaded = false;
        const completedFiles = { count: 0 };
        let toUploadFpCount = 0;
        const coverExist = await this.fs.exists(getCoverFilename(book), "Books");
        let bookFileExist = await this.fs.exists(getLocalBookFilename(book), "Books");
        if (coverExist) {
          toUploadFpCount++;
        }
        if (bookFileExist) {
          toUploadFpCount++;
        }
        if (!bookFileExist && book.url) {
          const fileobj = await this.fs.openFile(book.url, "None");
          await this.fs.writeFile(getLocalBookFilename(book), "Books", await fileobj.arrayBuffer());
          bookFileExist = true;
        }
        const handleProgress = createProgressHandler(toUploadFpCount, completedFiles, onProgress);
        if (coverExist) {
          const lfp = getCoverFilename(book);
          const cfp = `${CLOUD_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
          await this.uploadFileToCloud(lfp, cfp, handleProgress, book.hash);
          uploaded = true;
          completedFiles.count++;
        }
        if (bookFileExist) {
          const lfp = getLocalBookFilename(book);
          const cfp = `${CLOUD_BOOKS_SUBDIR}/${getRemoteBookFilename(book)}`;
          await this.uploadFileToCloud(lfp, cfp, handleProgress, book.hash);
          uploaded = true;
          completedFiles.count++;
        }
        if (uploaded) {
          book.deletedAt = null;
          book.updatedAt = Date.now();
          book.uploadedAt = Date.now();
          book.downloadedAt = Date.now();
        } else {
          throw new Error("Book file not uploaded");
        }
      }
      async downloadCloudFile(lfp, cfp, handleProgress) {
        console.log("Downloading file:", cfp, "to", lfp);
        const localFullpath = `${this.localBooksDir}/${lfp}`;
        const result = await downloadFile(cfp, localFullpath, handleProgress);
        try {
          if (this.appPlatform === "web") {
            const fileobj = result;
            await this.fs.writeFile(lfp, "Books", await fileobj.arrayBuffer());
          }
        } catch {
          console.log("Failed to download file:", cfp);
          throw new Error("Failed to download file");
        }
      }
      async downloadBook(book, onlyCover = false, onProgress) {
        let bookDownloaded = false;
        const completedFiles = { count: 0 };
        let toDownloadFpCount = 0;
        const needDownCover = !await this.fs.exists(getCoverFilename(book), "Books");
        const needDownBook = !onlyCover && !await this.fs.exists(getLocalBookFilename(book), "Books");
        if (needDownCover) {
          toDownloadFpCount++;
        }
        if (needDownBook) {
          toDownloadFpCount++;
        }
        const handleProgress = createProgressHandler(toDownloadFpCount, completedFiles, onProgress);
        if (!await this.fs.exists(getDir(book), "Books")) {
          await this.fs.createDir(getDir(book), "Books");
        }
        if (needDownCover) {
          const lfp = getCoverFilename(book);
          const cfp = `${CLOUD_BOOKS_SUBDIR}/${lfp}`;
          await this.downloadCloudFile(lfp, cfp, handleProgress);
          completedFiles.count++;
        }
        if (needDownBook) {
          const lfp = getLocalBookFilename(book);
          const cfp = `${CLOUD_BOOKS_SUBDIR}/${getRemoteBookFilename(book)}`;
          await this.downloadCloudFile(lfp, cfp, handleProgress);
          const localFullpath = `${this.localBooksDir}/${lfp}`;
          bookDownloaded = await this.fs.exists(localFullpath, "Books");
          completedFiles.count++;
        }
        if (bookDownloaded || !onlyCover && !needDownBook) {
          book.downloadedAt = Date.now();
        }
      }
      async loadBookContent(book, settings) {
        let file;
        const fp = getLocalBookFilename(book);
        if (await this.fs.exists(fp, "Books")) {
          file = await this.fs.openFile(fp, "Books");
        } else if (book.filePath) {
          file = await this.fs.openFile(book.filePath, "None");
        } else if (book.url) {
          file = await this.fs.openFile(book.url, "None");
        } else {
          throw new Error(BOOK_FILE_NOT_FOUND_ERROR);
        }
        return { book, file, config: await this.loadBookConfig(book, settings) };
      }
      async loadBookConfig(book, settings) {
        const { globalViewSettings } = settings;
        try {
          let str = "{}";
          if (await this.fs.exists(getConfigFilename(book), "Books")) {
            str = await this.fs.readFile(getConfigFilename(book), "Books", "text");
          }
          return deserializeConfig(str, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
        } catch {
          return deserializeConfig("{}", globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
        }
      }
      async fetchBookDetails(book, settings) {
        const fp = getLocalBookFilename(book);
        if (!await this.fs.exists(fp, "Books") && book.uploadedAt) {
          await this.downloadBook(book);
        }
        const { file } = await this.loadBookContent(book, settings);
        const bookDoc = (await new DocumentLoader(file).open()).book;
        const f = file;
        if (f && f.close) {
          await f.close();
        }
        return bookDoc.metadata;
      }
      async saveBookConfig(book, config, settings) {
        try {
          console.log(`\u{1F4DD} Saving book config for ${book.hash}`, {
            hasBooknotes: config.booknotes?.length || 0,
            progressPosition: config.progress?.[0] || 0,
            location: config.location?.substring(0, 30) || "none"
          });
          let serializedConfig;
          if (settings) {
            const { globalViewSettings } = settings;
            serializedConfig = serializeConfig(config, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
          } else {
            serializedConfig = JSON.stringify(config);
          }
          const filename = getConfigFilename(book);
          console.log(`\u{1F4BE} Writing to ${filename} in Books directory`);
          await this.fs.writeFile(filename, "Books", serializedConfig);
          console.log(`\u2705 Config successfully saved for ${book.hash}`);
          const exists = await this.fs.exists(filename, "Books");
          console.log(`\u{1F4CA} Verification - File exists check: ${exists ? "\u2705" : "\u274C"}`);
        } catch (error) {
          console.error(`\u274C Error saving book config:`, error);
        }
      }
      async generateCoverImageUrl(book) {
        return this.appPlatform === "web" ? await this.getCoverImageBlobUrl(book) : this.getCoverImageUrl(book);
      }
      async loadLibraryBooks() {
        console.log("Loading library books...");
        let books = [];
        const libraryFilename = getLibraryFilename();
        try {
          const txt = await this.fs.readFile(libraryFilename, "Books", "text");
          books = JSON.parse(txt);
        } catch {
          await this.fs.createDir("", "Books", true);
          await this.fs.writeFile(libraryFilename, "Books", "[]");
        }
        await Promise.all(
          books.map(async (book) => {
            book.coverImageUrl = await this.generateCoverImageUrl(book);
            book.updatedAt ??= book.lastUpdated || Date.now();
            return book;
          })
        );
        return books;
      }
      async saveLibraryBooks(books) {
        const libraryBooks = books.map(({ coverImageUrl, ...rest }) => rest);
        await this.fs.writeFile(getLibraryFilename(), "Books", JSON.stringify(libraryBooks));
      }
    };
  }
});

// src/utils/webFileSystem.ts
var openFileDialog;
var init_webFileSystem = __esm({
  "src/utils/webFileSystem.ts"() {
    openFileDialog = async (options2) => {
      try {
        if ("showOpenFilePicker" in window) {
          const pickerOpts = {
            multiple: options2.multiple || false
          };
          if (options2.filters && options2.filters.length > 0) {
            pickerOpts.types = options2.filters.map((filter) => ({
              description: filter.name,
              accept: {
                "application/octet-stream": filter.extensions.map((ext) => `.${ext}`)
              }
            }));
          }
          if (options2.directory) {
            const dirHandle = await window.showDirectoryPicker();
            return [dirHandle.name];
          } else {
            const fileHandles = await window.showOpenFilePicker(pickerOpts);
            const files = await Promise.all(fileHandles.map(async (handle) => {
              const file = await handle.getFile();
              return URL.createObjectURL(file);
            }));
            return files;
          }
        } else {
          console.warn("File System Access API not available");
          const input = document.createElement("input");
          input.type = "file";
          if (options2.multiple) {
            input.multiple = true;
          }
          if (options2.filters && options2.filters.length > 0) {
            input.accept = options2.filters.flatMap((filter) => filter.extensions.map((ext) => `.${ext}`)).join(",");
          }
          return new Promise((resolve) => {
            input.onchange = () => {
              if (!input.files || input.files.length === 0) {
                resolve(null);
                return;
              }
              const files = Array.from(input.files).map((file) => URL.createObjectURL(file));
              resolve(files);
            };
            input.click();
          });
        }
      } catch (error) {
        console.error("Error opening file dialog:", error);
        return null;
      }
    };
  }
});

// src/services/webAppService.ts
var webAppService_exports = {};
__export(webAppService_exports, {
  WebAppService: () => WebAppService
});
async function openIndexedDB() {
  return new Promise((resolve, reject) => {
    let request;
    try {
      request = indexedDB.open(dbName, dbVersion);
    } catch (error) {
      console.error("Failed to open IndexedDB:", error);
      reject(new Error("Browser storage is unavailable. Your data won't be saved between sessions."));
      return;
    }
    request.onupgradeneeded = () => {
      try {
        const db = request.result;
        console.log("Creating or upgrading IndexedDB stores");
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files", { keyPath: "path" });
          console.log("Created 'files' object store");
        }
      } catch (error) {
        console.error("Error during IndexedDB upgrade:", error);
        reject(error);
      }
    };
    request.onsuccess = () => {
      console.log("IndexedDB opened successfully");
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Error opening IndexedDB:", request.error);
      reject(request.error || new Error("Failed to open IndexedDB"));
    };
  });
}
var resolvePath, dbName, dbVersion, indexedDBFileSystem, WebAppService;
var init_webAppService = __esm({
  "src/services/webAppService.ts"() {
    init_book();
    init_misc();
    init_file();
    init_environment();
    init_appService();
    init_constants();
    init_webFileSystem();
    resolvePath = (fp, base) => {
      switch (base) {
        case "Books":
          return { baseDir: 0, fp: `${LOCAL_BOOKS_SUBDIR}/${fp}`, base };
        case "None":
          return { baseDir: 0, fp, base };
        default:
          return { baseDir: 0, fp: `${base}/${fp}`, base };
      }
    };
    dbName = "AppFileSystem";
    dbVersion = 1;
    indexedDBFileSystem = {
      getURL(path) {
        if (isValidURL(path)) {
          return path;
        } else {
          return URL.createObjectURL(new Blob([path]));
        }
      },
      async getBlobURL(path, base) {
        try {
          const content = await this.readFile(path, base, "binary");
          return URL.createObjectURL(new Blob([content]));
        } catch {
          return path;
        }
      },
      async openFile(path, base, filename) {
        try {
          if (isValidURL(path)) {
            const remoteFile = new RemoteFile(path, filename);
            await remoteFile.open();
            return remoteFile;
          } else {
            const content = await this.readFile(path, base, "binary");
            return new File([content], filename || path.split("/").pop() || "file");
          }
        } catch (error) {
          console.error(`Error opening file ${path}:`, error);
          return new File([], filename || path.split("/").pop() || "empty-file");
        }
      },
      async copyFile(srcPath, dstPath, base) {
        const { fp } = resolvePath(dstPath, base);
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readwrite");
          const store = transaction.objectStore("files");
          const getRequest = store.get(srcPath);
          getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
              store.put({ path: fp, content: data.content });
              resolve();
            } else {
              reject(new Error(`File not found: ${srcPath}`));
            }
          };
          getRequest.onerror = () => reject(getRequest.error);
        });
      },
      async readFile(path, base, mode) {
        const { fp } = resolvePath(path, base);
        const isCoverImage = fp.includes("cover.png");
        if (!isCoverImage) {
          console.log(`\u{1F4D6} Reading file from IndexedDB: ${fp}`);
        }
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readonly");
          const store = transaction.objectStore("files");
          const request = store.get(fp);
          request.onsuccess = async () => {
            if (request.result) {
              if (!isCoverImage) {
                console.log(`\u2705 Found file in IndexedDB: ${fp}`);
              }
              const content = request.result.content;
              if (mode === "text") resolve(content);
              else {
                if (content instanceof Blob) {
                  const arrayBuffer = await content.arrayBuffer();
                  resolve(arrayBuffer);
                } else if (content instanceof ArrayBuffer) {
                  resolve(content);
                } else if (typeof content === "string") {
                  resolve(new TextEncoder().encode(content).buffer);
                } else {
                  console.error(`\u274C Unsupported content type in IndexedDB for ${fp}:`, typeof content);
                  reject(new Error("Unsupported content type in IndexedDB"));
                }
              }
            } else {
              if (isCoverImage) {
                reject(new Error(`File not found: ${fp}`));
              } else {
                console.error(`\u274C File not found in IndexedDB: ${fp}`);
                reject(new Error(`File not found: ${fp}`));
              }
            }
          };
          request.onerror = () => {
            if (!isCoverImage) {
              console.error(`\u274C Error reading file from IndexedDB: ${fp}`, request.error);
            }
            reject(request.error);
          };
        });
      },
      async writeFile(path, base, content) {
        const { fp } = resolvePath(path, base);
        console.log(`\u{1F4DD} Writing file to IndexedDB: ${fp}`);
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readwrite");
          const store = transaction.objectStore("files");
          const putRequest = store.put({ path: fp, content });
          putRequest.onsuccess = () => {
            console.log(`\u2705 Successfully wrote file to IndexedDB: ${fp}`);
            resolve();
          };
          putRequest.onerror = () => {
            console.error(`\u274C Error writing file to IndexedDB: ${fp}`, putRequest.error);
            reject(putRequest.error);
          };
          transaction.oncomplete = () => {
            console.log(`\u2705 Transaction completed for writing file: ${fp}`);
            resolve();
          };
          transaction.onerror = () => {
            console.error(`\u274C Transaction error for writing file: ${fp}`, transaction.error);
            reject(transaction.error);
          };
        });
      },
      async removeFile(path, base) {
        const { fp } = resolvePath(path, base);
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readwrite");
          const store = transaction.objectStore("files");
          store.delete(fp);
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        });
      },
      async createDir() {
      },
      async removeDir() {
      },
      async readDir(path) {
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readonly");
          const store = transaction.objectStore("files");
          const request = store.getAll();
          request.onsuccess = () => {
            const files = request.result;
            resolve(
              files.filter((file) => file.path.startsWith(path)).map((file) => ({ path: file.path, isDir: false }))
            );
          };
          request.onerror = () => reject(request.error);
        });
      },
      async exists(path, base) {
        const { fp } = resolvePath(path, base);
        console.log(`\u{1F50D} Checking if file exists in IndexedDB: ${fp}`);
        const db = await openIndexedDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction("files", "readonly");
          const store = transaction.objectStore("files");
          const request = store.get(fp);
          request.onsuccess = () => {
            const exists = !!request.result;
            console.log(`${exists ? "\u2705" : "\u274C"} File existence check in IndexedDB: ${fp} - ${exists ? "EXISTS" : "NOT FOUND"}`);
            resolve(exists);
          };
          request.onerror = () => {
            console.error(`\u274C Error checking file existence in IndexedDB: ${fp}`, request.error);
            reject(request.error);
          };
        });
      },
      getPrefix() {
        return null;
      }
    };
    WebAppService = class extends BaseAppService {
      fs = indexedDBFileSystem;
      appPlatform = "web";
      isAppDataSandbox = false;
      isMobile = ["android", "ios"].includes(getOSPlatform());
      isAndroidApp = false;
      isIOSApp = false;
      hasTrafficLight = false;
      hasWindow = true;
      hasWindowBar = false;
      hasContextMenu = false;
      hasRoundedWindow = false;
      hasSafeAreaInset = isPWA();
      hasHaptics = false;
      hasSysFontsList = false;
      resolvePath(fp, base) {
        return resolvePath(fp, base);
      }
      async getInitBooksDir() {
        return LOCAL_BOOKS_SUBDIR;
      }
      async getCacheDir() {
        return "Cache";
      }
      async selectDirectory() {
        try {
          const result = await openFileDialog({ directory: true });
          if (result && result.length > 0 && result[0]) {
            return result[0];
          }
          throw new Error("No directory selected");
        } catch (error) {
          console.error("Error selecting directory:", error);
          throw new Error("Directory selection is not fully supported in browser");
        }
      }
      async selectFiles(name, extensions) {
        try {
          const result = await openFileDialog({
            multiple: true,
            filters: [{ name, extensions }]
          });
          if (result && result.length > 0) {
            return result.map((file) => typeof file === "string" ? file : URL.createObjectURL(file));
          }
          return [];
        } catch (error) {
          console.error("Error selecting files:", error);
          throw new Error("File selection failed");
        }
      }
      getCoverImageUrl = (book) => {
        const coverPath = `${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
        try {
          return this.fs.getURL(coverPath);
        } catch {
          console.log(`Unable to load cover for book, using default cover`);
          return "/assets/default-cover.png";
        }
      };
      getCoverImageBlobUrl = async (book) => {
        const coverPath = `${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
        try {
          const exists = await this.fs.exists(coverPath, "None");
          if (!exists) {
            console.log(`Cover image does not exist: ${coverPath}, using default`);
            return "/assets/default-cover.png";
          }
          return await this.fs.getBlobURL(coverPath, "None");
        } catch {
          console.log(`Unable to load blob cover for book, using default cover`);
          return "/assets/default-cover.png";
        }
      };
    };
  }
});

// src/services/environment.ts
var isWebAppPlatform, isPWA, webAppService, getWebAppService, environmentConfig, environment_default;
var init_environment = __esm({
  "src/services/environment.ts"() {
    init_constants();
    isWebAppPlatform = () => true;
    isPWA = () => window.matchMedia("(display-mode: standalone)").matches;
    webAppService = null;
    getWebAppService = async () => {
      if (!webAppService) {
        const { WebAppService: WebAppService2 } = await Promise.resolve().then(() => (init_webAppService(), webAppService_exports));
        webAppService = new WebAppService2();
        await webAppService.loadSettings();
      }
      return webAppService;
    };
    environmentConfig = {
      getAppService: async () => {
        return getWebAppService();
      }
    };
    environment_default = environmentConfig;
  }
});

// i18next-scanner.config.js
var require_i18next_scanner_config = __commonJS({
  "i18next-scanner.config.js"(exports, module) {
    module.exports = {
      input: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.test.{js,jsx,ts,tsx}"],
      output: ".",
      options: {
        debug: false,
        sort: false,
        func: {
          list: ["_"],
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        lngs: [
          "de",
          "ja",
          "es",
          "fr",
          "it",
          "el",
          "ko",
          "uk",
          "pl",
          "pt",
          "ru",
          "tr",
          "hi",
          "id",
          "vi",
          "ar",
          "zh-CN",
          "zh-TW"
        ],
        ns: ["translation"],
        defaultNs: "translation",
        defaultValue: "__STRING_NOT_TRANSLATED__",
        resource: {
          loadPath: "./public/locales/{{lng}}/{{ns}}.json",
          savePath: "./public/locales/{{lng}}/{{ns}}.json",
          jsonIndent: 2,
          lineEnding: "\n"
        },
        keySeparator: false,
        nsSeparator: false,
        interpolation: {
          prefix: "{{",
          suffix: "}}"
        },
        metadata: {},
        allowDynamicKeys: true,
        removeUnusedKeys: true
      }
    };
  }
});

// src/context/EnvContext.tsx
init_environment();
var EnvContext = createContext(void 0);
var EnvProvider = ({ children }) => {
  const [envConfig] = useState(environment_default);
  const [appService, setAppService] = useState(null);
  React43__default.useEffect(() => {
    envConfig.getAppService().then((service) => setAppService(service));
  }, [envConfig]);
  return /* @__PURE__ */ React43__default.createElement(EnvContext.Provider, { value: { envConfig, appService } }, children);
};
var useEnv = () => {
  const context = useContext(EnvContext);
  if (!context) throw new Error("useEnv must be used within EnvProvider");
  return context;
};

// src/utils/style.ts
init_constants();

// src/styles/themes.ts
init_misc();
function srgbToLinear(v) {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function hexToOklch(hexColor) {
  const { r, g, b } = tinycolor2(hexColor).toRgb();
  const R = srgbToLinear(r / 255);
  const G = srgbToLinear(g / 255);
  const B = srgbToLinear(b / 255);
  const l_ = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m_ = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s_ = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  const lPercent = (L * 100).toFixed(4);
  const cValue = C.toFixed(6);
  const hValue = h.toFixed(6);
  return `${lPercent}% ${cValue} ${hValue}`;
}
var getContrastOklch = (hexColor) => {
  return tinycolor2(hexColor).isDark() ? "100% 0 0" : "0% 0 0";
};

// src/styles/themes.ts
var generateLightPalette = ({ bg, fg, primary }) => {
  return {
    "base-100": bg,
    // Main background
    "base-200": tinycolor2(bg).darken(5).toHexString(),
    // Slightly darker
    "base-300": tinycolor2(bg).darken(12).toHexString(),
    // More darker
    "base-content": fg,
    // Main text color
    neutral: tinycolor2(bg).darken(15).desaturate(20).toHexString(),
    // Muted neutral
    "neutral-content": tinycolor2(fg).lighten(20).desaturate(20).toHexString(),
    // Slightly lighter text
    primary,
    secondary: tinycolor2(primary).lighten(20).toHexString(),
    // Lighter secondary
    accent: tinycolor2(primary).analogous()[1].toHexString()
    // Analogous accent
  };
};
var generateDarkPalette = ({ bg, fg, primary }) => {
  return {
    "base-100": bg,
    // Main background
    "base-200": tinycolor2(bg).lighten(5).toHexString(),
    // Slightly lighter
    "base-300": tinycolor2(bg).lighten(12).toHexString(),
    // More lighter
    "base-content": fg,
    // Main text color
    neutral: tinycolor2(bg).lighten(15).desaturate(20).toHexString(),
    // Muted neutral
    "neutral-content": tinycolor2(fg).darken(20).desaturate(20).toHexString(),
    // Darkened text
    primary,
    secondary: tinycolor2(primary).darken(20).toHexString(),
    // Darker secondary
    accent: tinycolor2(primary).triad()[1].toHexString()
    // Triad accent
  };
};
var themes = [
  {
    name: "default",
    label: stubTranslation("Default"),
    colors: {
      light: generateLightPalette({ fg: "#171717", bg: "#ffffff", primary: "#0066cc" }),
      dark: generateDarkPalette({ fg: "#e0e0e0", bg: "#222222", primary: "#77bbee" })
    }
  },
  {
    name: "gray",
    label: stubTranslation("Gray"),
    colors: {
      light: generateLightPalette({ fg: "#222222", bg: "#e0e0e0", primary: "#4488cc" }),
      dark: generateDarkPalette({ fg: "#c6c6c6", bg: "#444444", primary: "#88ccee" })
    }
  },
  {
    name: "sepia",
    label: stubTranslation("Sepia"),
    colors: {
      light: generateLightPalette({ fg: "#5b4636", bg: "#f1e8d0", primary: "#008b8b" }),
      dark: generateDarkPalette({ fg: "#ffd595", bg: "#342e25", primary: "#48d1cc" })
    }
  },
  {
    name: "grass",
    label: stubTranslation("Grass"),
    colors: {
      light: generateLightPalette({ fg: "#232c16", bg: "#d7dbbd", primary: "#177b4d" }),
      dark: generateDarkPalette({ fg: "#d8deba", bg: "#333627", primary: "#a6d608" })
    }
  },
  {
    name: "cherry",
    label: stubTranslation("Cherry"),
    colors: {
      light: generateLightPalette({ fg: "#4e1609", bg: "#f0d1d5", primary: "#de3838" }),
      dark: generateDarkPalette({ fg: "#e5c4c8", bg: "#462f32", primary: "#ff646e" })
    }
  },
  {
    name: "sky",
    label: stubTranslation("Sky"),
    colors: {
      light: generateLightPalette({ fg: "#262d48", bg: "#cedef5", primary: "#2d53e5" }),
      dark: generateDarkPalette({ fg: "#babee1", bg: "#282e47", primary: "#ff646e" })
    }
  },
  {
    name: "solarized",
    label: stubTranslation("Solarized"),
    colors: {
      light: generateLightPalette({ fg: "#586e75", bg: "#fdf6e3", primary: "#268bd2" }),
      dark: generateDarkPalette({ fg: "#93a1a1", bg: "#002b36", primary: "#268bd2" })
    }
  },
  {
    name: "gruvbox",
    label: stubTranslation("Gruvbox"),
    colors: {
      light: generateLightPalette({ fg: "#3c3836", bg: "#fbf1c7", primary: "#076678" }),
      dark: generateDarkPalette({ fg: "#ebdbb2", bg: "#282828", primary: "#83a598" })
    }
  },
  {
    name: "nord",
    label: stubTranslation("Nord"),
    colors: {
      light: generateLightPalette({ fg: "#2e3440", bg: "#eceff4", primary: "#5e81ac" }),
      dark: generateDarkPalette({ fg: "#d8dee9", bg: "#2e3440", primary: "#88c0d0" })
    }
  },
  {
    name: "contrast",
    label: stubTranslation("Contrast"),
    colors: {
      light: generateLightPalette({ fg: "#000000", bg: "#ffffff", primary: "#4488cc" }),
      dark: generateDarkPalette({ fg: "#ffffff", bg: "#000000", primary: "#88ccee" })
    }
  },
  {
    name: "sunset",
    label: stubTranslation("Sunset"),
    colors: {
      light: generateLightPalette({ fg: "#423126", bg: "#fff7f0", primary: "#fe6b64" }),
      dark: generateDarkPalette({ fg: "#f6e1d7", bg: "#3c2b25", primary: "#ff9c94" })
    }
  }
];
var generateCustomThemeVariables = (palette) => {
  return `
    --b1: ${hexToOklch(palette["base-100"])};
    --b2: ${hexToOklch(palette["base-200"])};
    --b3: ${hexToOklch(palette["base-300"])};
    --bc: ${hexToOklch(palette["base-content"])};
    
    --p: ${hexToOklch(palette.primary)};
    --pc: ${getContrastOklch(palette.primary)};
    
    --s: ${hexToOklch(palette.secondary)};
    --sc: ${getContrastOklch(palette.secondary)};
    
    --a: ${hexToOklch(palette.accent)};
    --ac: ${getContrastOklch(palette.accent)};
    
    --n: ${hexToOklch(palette.neutral)};
    --nc: ${hexToOklch(palette["neutral-content"])};
    
    --in: 69.37% 0.047 231;
    --inc: 100% 0 0;
    --su: 78.15% 0.12 160;
    --suc: 100% 0 0;
    --wa: 90.69% 0.123 84;
    --wac: 0% 0 0;
    --er: 70.9% 0.184 22;
    --erc: 100% 0 0;
  `;
};
var applyCustomTheme = (customTheme) => {
  const lightPalette = generateLightPalette(customTheme.colors.light);
  const darkPalette = generateDarkPalette(customTheme.colors.dark);
  const lightThemeName = `${customTheme.name}-light`;
  const darkThemeName = `${customTheme.name}-dark`;
  const css = `
    [data-theme="${lightThemeName}"] {
      ${generateCustomThemeVariables(lightPalette)}
    }
    
    [data-theme="${darkThemeName}"] {
      ${generateCustomThemeVariables(darkPalette)}
    }
    
    :root {
      --${lightThemeName}: 1;
      --${darkThemeName}: 1;
    }
  `;
  const styleElement = document.createElement("style");
  styleElement.id = `theme-${lightThemeName}-styles`;
  styleElement.textContent = css;
  const existingStyle = document.getElementById(styleElement.id);
  if (existingStyle) {
    existingStyle.remove();
  }
  document.head.appendChild(styleElement);
  return {
    light: lightThemeName,
    dark: darkThemeName
  };
};

// src/utils/style.ts
init_misc();
var fontfacesCSS = `/* Basic web fonts, specific font definitions are loaded at runtime */
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
var getFontStyles = (serif, sansSerif, monospace, defaultFont, defaultCJKFont, fontSize, minFontSize, fontWeight, overrideFont, themeCode) => {
  const { fg, primary } = themeCode;
  const lastSerifFonts = ["Georgia", "Times New Roman"];
  const serifFonts = [
    serif,
    ...SERIF_FONTS.filter(
      (font) => font !== serif && font !== defaultCJKFont && !lastSerifFonts.includes(font)
    ),
    ...defaultCJKFont !== serif ? [defaultCJKFont] : [],
    ...CJK_SERIF_FONTS.filter((font) => font !== serif && font !== defaultCJKFont),
    ...lastSerifFonts.filter(
      (font) => SERIF_FONTS.includes(font) && !lastSerifFonts.includes(defaultCJKFont)
    ),
    ...FALLBACK_FONTS
  ];
  const sansSerifFonts = [
    sansSerif,
    ...SANS_SERIF_FONTS.filter((font) => font !== sansSerif && font !== defaultCJKFont),
    ...defaultCJKFont !== sansSerif ? [defaultCJKFont] : [],
    ...CJK_SANS_SERIF_FONTS.filter((font) => font !== sansSerif && font !== defaultCJKFont),
    ...FALLBACK_FONTS
  ];
  const monospaceFonts = [monospace, ...MONOSPACE_FONTS.filter((font) => font !== monospace)];
  const fontStyles = `
    html {
      --serif: ${serifFonts.map((font) => `"${font}"`).join(", ")}, serif;
      --sans-serif: ${sansSerifFonts.map((font) => `"${font}"`).join(", ")}, sans-serif;
      --monospace: ${monospaceFonts.map((font) => `"${font}"`).join(", ")}, monospace;
    }
    html, body {
      font-family: var(${defaultFont.toLowerCase() === "serif" ? "--serif" : "--sans-serif"}) ${overrideFont ? "!important" : ""};
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
      ${overrideFont ? "font-family: revert !important;" : ""}
    }
    a:any-link {
      ${overrideFont ? `color: ${primary};` : ""}
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
      a:link {
        ${overrideFont ? `color: lightblue;` : ""}
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
var getAdditionalFontLinks = () => `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/misans-webfont@1.0.4/misans-l3/misans-l3/result.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-gb-screen@1.0.6/font.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Noto+Sans+TC&display=swap" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" crossorigin="anonymous">
`;
var getAdditionalFontFaces = () => `
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
var getLayoutStyles = (overrideLayout, paragraphMargin, lineSpacing, wordSpacing, letterSpacing, textIndent, justify, hyphenate, zoomLevel, writingMode, vertical, themeCode) => {
  const { bg, fg, primary, isDarkMode } = themeCode;
  const layoutStyle = `
  @namespace epub "http://www.idpf.org/2007/ops";
  html {
    color-scheme: ${isDarkMode ? "dark" : "light"};
    color: ${fg};
  }
  html {
    --theme-bg-color: ${bg};
    --theme-fg-color: ${fg};
    --theme-primary-color: ${primary};
    --default-text-align: ${justify ? "justify" : "start"};
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
    ${writingMode === "auto" ? "" : `writing-mode: ${writingMode} !important;`}
    text-align: var(--default-text-align);
    max-height: unset;
    background-color: var(--theme-bg-color, transparent);
    background: var(--background-set, none);
  }
  body *:not(a):not(#b1):not(#b1 *):not(#b2):not(#b2 *):not(img):not(.bg):not(.bg *):not(.vol):not(.vol *):not(.background):not(.background *) {
    ${bg === "#ffffff" ? "" : `background-color: ${bg} !important;`}
  }
  body {
    overflow: unset;
    zoom: ${zoomLevel};
  }
  svg, img {
    background-color: transparent !important;
  }
  p, li, blockquote, dd {
    line-height: ${lineSpacing} ${overrideLayout ? "!important" : ""};
    word-spacing: ${wordSpacing}px ${overrideLayout ? "!important" : ""};
    letter-spacing: ${letterSpacing}px ${overrideLayout ? "!important" : ""};
    text-indent: ${vertical ? textIndent * 1.2 : textIndent}em;
    text-align: ${overrideLayout ? "var(--default-text-align)" : "inherit"};
    -webkit-hyphens: ${hyphenate ? "auto" : "manual"};
    hyphens: ${hyphenate ? "auto" : "manual"};
    -webkit-hyphenate-limit-before: 3;
    -webkit-hyphenate-limit-after: 2;
    -webkit-hyphenate-limit-lines: 2;
    hanging-punctuation: allow-end last;
    widows: 2;
  }
  p {
    ${vertical ? `margin-left: ${paragraphMargin}em ${overrideLayout ? "!important" : ""};` : ""}
    ${vertical ? `margin-right: ${paragraphMargin}em ${overrideLayout ? "!important" : ""};` : ""}
    ${!vertical ? `margin-top: ${paragraphMargin}em ${overrideLayout ? "!important" : ""};` : ""}
    ${!vertical ? `margin-bottom: ${paragraphMargin}em ${overrideLayout ? "!important" : ""};` : ""}
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
    ${vertical ? "transform: rotate(90deg);" : ""}
    ${vertical ? "transform-origin: center;" : ""}
    ${vertical ? "height: 2em;" : ""}
    ${vertical ? `width: ${lineSpacing}em;` : ""}
    ${vertical ? `vertical-align: unset;` : ""}
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
var getFootnoteStyles = () => `
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
var getThemeCode = () => {
  let themeMode = "auto";
  let themeColor = "default";
  let systemIsDarkMode = false;
  let customThemes = [];
  if (typeof window !== "undefined") {
    themeColor = localStorage.getItem("themeColor") || "default";
    themeMode = localStorage.getItem("themeMode") || "auto";
    customThemes = JSON.parse(localStorage.getItem("customThemes") || "[]");
    systemIsDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const isDarkMode = themeMode === "dark" || themeMode === "auto" && systemIsDarkMode;
  let currentTheme = themes.find((theme) => theme.name === themeColor);
  if (!currentTheme) {
    const customTheme = customThemes.find((theme) => theme.name === themeColor);
    if (customTheme) {
      currentTheme = {
        name: customTheme.name,
        label: customTheme.label,
        colors: {
          light: generateLightPalette(customTheme.colors.light),
          dark: generateDarkPalette(customTheme.colors.dark)
        }
      };
    }
  }
  if (!currentTheme) currentTheme = themes[0];
  const defaultPalette = isDarkMode ? currentTheme.colors.dark : currentTheme.colors.light;
  return {
    bg: defaultPalette["base-100"],
    fg: defaultPalette["base-content"],
    primary: defaultPalette.primary,
    palette: defaultPalette,
    isDarkMode
  };
};
var getStyles = (viewSettings, themeCode) => {
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
    viewSettings.zoomLevel / 100,
    viewSettings.writingMode,
    viewSettings.vertical,
    themeCode
  );
  const isMobile = ["ios", "android"].includes(getOSPlatform());
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
    themeCode
  );
  const userStylesheet = viewSettings.userStylesheet;
  return `${layoutStyles}
${fontStyles}
${fontfacesCSS}
${userStylesheet}`;
};
var mountAdditionalFonts = (document2) => {
  const links = getAdditionalFontLinks();
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(links, "text/html");
  Array.from(parsedDocument.head.children).forEach((child) => {
    if (child.tagName === "LINK") {
      const link = document2.createElement("link");
      link.rel = child.getAttribute("rel") || "";
      link.href = child.getAttribute("href") || "";
      link.crossOrigin = child.getAttribute("crossorigin") || "";
      document2.head.appendChild(link);
    }
  });
  const style = document2.createElement("style");
  style.textContent = getAdditionalFontFaces();
  document2.head.appendChild(style);
};
var transformStylesheet = (css) => {
  return css.replace(/font-size\s*:\s*xx-small/gi, "font-size: 0.6rem").replace(/font-size\s*:\s*x-small/gi, "font-size: 0.75rem").replace(/font-size\s*:\s*small/gi, "font-size: 0.875rem").replace(/font-size\s*:\s*medium/gi, "font-size: 1rem").replace(/font-size\s*:\s*large/gi, "font-size: 1.2rem").replace(/font-size\s*:\s*x-large/gi, "font-size: 1.5rem").replace(/font-size\s*:\s*xx-large/gi, "font-size: 2rem").replace(/font-size\s*:\s*xxx-large/gi, "font-size: 3rem").replace(/font-size\s*:\s*(\d+(?:\.\d+)?)px/gi, (_, px) => {
    const rem = parseFloat(px) / 16;
    return `font-size: ${rem}rem`;
  }).replace(/font-size\s*:\s*(\d+(?:\.\d+)?)pt/gi, (_, pt) => {
    const rem = parseFloat(pt) / 12;
    return `font-size: ${rem}rem`;
  }).replace(/[\s;]color\s*:\s*#000000/gi, "color: var(--theme-fg-color)").replace(/[\s;]color\s*:\s*#000/gi, "color: var(--theme-fg-color)").replace(/[\s;]color\s*:\s*rgb\(0,\s*0,\s*0\)/gi, "color: var(--theme-fg-color)");
};

// src/store/themeStore.ts
init_environment();
var getInitialThemeMode = () => {
  if (typeof window !== "undefined" && localStorage) {
    return localStorage.getItem("themeMode") || "auto";
  }
  return "auto";
};
var getInitialThemeColor = () => {
  if (typeof window !== "undefined" && localStorage) {
    return localStorage.getItem("themeColor") || "default";
  }
  return "default";
};
var useThemeStore = create((set, get) => {
  const initialThemeMode = getInitialThemeMode();
  const initialThemeColor = getInitialThemeColor();
  const systemIsDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = initialThemeMode === "dark" || initialThemeMode === "auto" && systemIsDarkMode;
  const themeCode = getThemeCode();
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const mode = get().themeMode;
      const isDarkMode2 = mode === "dark" || mode === "auto" && mediaQuery.matches;
      set({ systemIsDarkMode: mediaQuery.matches, isDarkMode: isDarkMode2 });
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  }
  return {
    themeMode: initialThemeMode,
    themeColor: initialThemeColor,
    systemIsDarkMode,
    isDarkMode,
    themeCode,
    getIsDarkMode: () => get().isDarkMode,
    setThemeMode: (mode) => {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("themeMode", mode);
      }
      const isDarkMode2 = mode === "dark" || mode === "auto" && get().systemIsDarkMode;
      document.documentElement.setAttribute(
        "data-theme",
        `${get().themeColor}-${isDarkMode2 ? "dark" : "light"}`
      );
      set({ themeMode: mode, isDarkMode: isDarkMode2 });
      set({ themeCode: getThemeCode() });
    },
    setThemeColor: (color) => {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("themeColor", color);
      }
      document.documentElement.setAttribute(
        "data-theme",
        `${color}-${get().isDarkMode ? "dark" : "light"}`
      );
      set({ themeColor: color });
      set({ themeCode: getThemeCode() });
    },
    updateAppTheme: (color) => {
      if (isWebAppPlatform()) {
        const { palette } = get().themeCode;
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette[color]);
      }
    },
    saveCustomTheme: async (envConfig, settings, theme, isDelete) => {
      const customThemes = settings.globalReadSettings.customThemes || [];
      const index = customThemes.findIndex((t) => t.name === theme.name);
      if (isDelete) {
        if (index > -1) {
          customThemes.splice(index, 1);
        }
      } else {
        if (index > -1) {
          customThemes[index] = theme;
        } else {
          customThemes.push(theme);
        }
      }
      settings.globalReadSettings.customThemes = customThemes;
      localStorage.setItem("customThemes", JSON.stringify(customThemes));
      const appService = await envConfig.getAppService();
      await appService.saveSettings(settings);
    }
  };
});
var useSettingsStore = create((set) => ({
  settings: {},
  isFontLayoutSettingsDialogOpen: false,
  isFontLayoutSettingsGlobal: true,
  setSettings: (settings) => set({ settings }),
  saveSettings: async (envConfig, settings) => {
    const appService = await envConfig.getAppService();
    await appService.saveSettings(settings);
  },
  setFontLayoutSettingsDialogOpen: (open) => set({ isFontLayoutSettingsDialogOpen: open }),
  setFontLayoutSettingsGlobal: (global) => set({ isFontLayoutSettingsGlobal: global })
}));

// src/hooks/useTheme.ts
var useTheme = () => {
  const { settings } = useSettingsStore();
  const { themeColor, isDarkMode } = useThemeStore();
  useEffect(() => {
    const customThemes = settings.globalReadSettings?.customThemes ?? [];
    customThemes.forEach((customTheme) => {
      applyCustomTheme(customTheme);
    });
  }, [settings]);
  useEffect(() => {
    const colorScheme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", `${themeColor}-${colorScheme}`);
    document.documentElement.style.setProperty("color-scheme", colorScheme);
  }, [themeColor, isDarkMode]);
};
var useScreenWakeLock = (lock) => {
  const wakeLockRef = useRef(null);
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          wakeLockRef.current.addEventListener("release", () => {
            wakeLockRef.current = null;
          });
          console.log("Wake lock acquired");
        }
      } catch (err) {
        console.info("Failed to acquire wake lock:", err);
      }
    };
    const releaseWakeLock = () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("Wake lock released");
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        releaseWakeLock();
      } else {
        requestWakeLock();
      }
    };
    const handleFocusChange = () => {
      if (document.hasFocus()) {
        requestWakeLock();
      } else {
        releaseWakeLock();
      }
    };
    if (lock) {
      requestWakeLock();
    } else if (wakeLockRef.current) {
      releaseWakeLock();
    }
    if (lock) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocusChange);
      window.addEventListener("blur", handleFocusChange);
    }
    return () => {
      releaseWakeLock();
      if (lock) {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("focus", handleFocusChange);
        window.removeEventListener("blur", handleFocusChange);
      }
    };
  }, [lock]);
};

// src/utils/event.ts
var EventDispatcher = class {
  syncListeners;
  asyncListeners;
  constructor() {
    this.syncListeners = /* @__PURE__ */ new Map();
    this.asyncListeners = /* @__PURE__ */ new Map();
  }
  on(event, callback) {
    if (!this.asyncListeners.has(event)) {
      this.asyncListeners.set(event, /* @__PURE__ */ new Set());
    }
    this.asyncListeners.get(event).add(callback);
  }
  off(event, callback) {
    this.asyncListeners.get(event)?.delete(callback);
  }
  async dispatch(event, detail) {
    const listeners = this.asyncListeners.get(event);
    if (listeners) {
      const customEvent = new CustomEvent(event, { detail });
      for (const listener of listeners) {
        await listener(customEvent);
      }
    }
  }
  onSync(event, callback) {
    if (!this.syncListeners.has(event)) {
      this.syncListeners.set(event, /* @__PURE__ */ new Set());
    }
    this.syncListeners.get(event).add(callback);
  }
  offSync(event, callback) {
    this.syncListeners.get(event)?.delete(callback);
  }
  dispatchSync(event, detail) {
    const listeners = this.syncListeners.get(event);
    if (listeners) {
      const customEvent = new CustomEvent(event, { detail });
      for (const listener of listeners) {
        const consumed = listener(customEvent);
        if (consumed) {
          return true;
        }
      }
    }
    return false;
  }
};
var eventDispatcher = new EventDispatcher();

// src/components/Toast.tsx
var Toast = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toastType = useRef("info");
  const toastTimeout = useRef(5e3);
  const messageClass = useRef("");
  const toastDismissTimeout = useRef(null);
  const toastClassMap = {
    info: "toast-info toast-center toast-middle",
    success: "toast-success toast-top toast-end",
    warning: "toast-warning toast-top toast-end",
    error: "toast-error toast-top toast-end"
  };
  const alertClassMap = {
    info: "alert-primary",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error"
  };
  useEffect(() => {
    if (toastDismissTimeout.current) clearTimeout(toastDismissTimeout.current);
    toastDismissTimeout.current = setTimeout(() => setToastMessage(""), toastTimeout.current);
    return () => {
      if (toastDismissTimeout.current) clearTimeout(toastDismissTimeout.current);
    };
  }, [toastMessage]);
  const handleShowToast = async (event) => {
    const { message, type = "info", timeout, className = "" } = event.detail;
    setToastMessage(message);
    toastType.current = type;
    if (timeout) toastTimeout.current = timeout;
    messageClass.current = className;
  };
  useEffect(() => {
    eventDispatcher.on("toast", handleShowToast);
    return () => {
      eventDispatcher.off("toast", handleShowToast);
    };
  }, []);
  return toastMessage && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "toast toast-center toast-middle z-50 w-auto max-w-screen-sm",
        toastClassMap[toastType.current],
        toastClassMap[toastType.current].includes("toast-top") && "pt-[calc(44px+env(safe-area-inset-top))]"
      )
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "alert flex max-w-80 items-center justify-center border-0",
          alertClassMap[toastType.current]
        )
      },
      /* @__PURE__ */ React43__default.createElement(
        "span",
        {
          className: clsx8(
            "max-h-[50vh] min-w-32 max-w-80",
            "overflow-y-auto whitespace-normal break-words text-center",
            messageClass.current
          )
        },
        toastMessage.split("\n").map((line, idx) => /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, { key: idx }, line || /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, "\xA0"), /* @__PURE__ */ React43__default.createElement("br", null)))
      )
    )
  );
};

// src/utils/nav.ts
init_environment();
init_constants();
var createMockRouter = () => {
  return {
    back: () => console.log("Mock router: back called"),
    forward: () => console.log("Mock router: forward called"),
    refresh: () => console.log("Mock router: refresh called"),
    push: (url) => console.log(`Mock router: push called with url ${url}`),
    replace: (url) => console.log(`Mock router: replace called with url ${url}`),
    prefetch: (url) => console.log(`Mock router: prefetch called with url ${url}`)
  };
};
var navigateToReader = (router, bookIds, queryParams, navOptions) => {
  const ids = bookIds.join(BOOK_IDS_SEPARATOR);
  if (isWebAppPlatform() && !isPWA()) {
    router.push(`/reader/${ids}${queryParams ? `?${queryParams}` : ""}`, navOptions);
  } else {
    const params = new URLSearchParams(queryParams || "");
    params.set("ids", ids);
    router.push(`/reader?${params.toString()}`, navOptions);
  }
};
var redirectToDirectReader = () => {
  window.location.href = "/reader";
  window.location.reload();
};

// src/context/RouterContext.tsx
var AppRouterContext = createContext(null);
var PathnameContext = createContext("/");
var SearchParamsContext = createContext(new URLSearchParams());
function MockNextNavigation({ children }) {
  const mockRouter = createMockRouter();
  return /* @__PURE__ */ React43__default.createElement(AppRouterContext.Provider, { value: mockRouter }, /* @__PURE__ */ React43__default.createElement(PathnameContext.Provider, { value: "/" }, /* @__PURE__ */ React43__default.createElement(SearchParamsContext.Provider, { value: new URLSearchParams() }, children)));
}
function useRouter() {
  const router = useContext(AppRouterContext);
  if (router === null) {
    throw new Error("useRouter must be used within MockNextNavigation");
  }
  return router;
}
function usePathname() {
  const pathname = useContext(PathnameContext);
  if (pathname === null) {
    throw new Error("usePathname must be used within MockNextNavigation");
  }
  return pathname;
}
function useSearchParams() {
  const searchParams = useContext(SearchParamsContext);
  if (searchParams === null) {
    throw new Error("useSearchParams must be used within MockNextNavigation");
  }
  return searchParams;
}
var useBookDataStore = create((set, get) => ({
  booksData: {},
  getBookData: (keyOrId) => {
    const id = keyOrId.split("-")[0];
    return get().booksData[id] || null;
  },
  getConfig: (key) => {
    if (!key) return null;
    const id = key.split("-")[0];
    return get().booksData[id]?.config || null;
  },
  setConfig: (key, partialConfig) => {
    set((state) => {
      const id = key.split("-")[0];
      const config = state.booksData[id]?.config || {};
      Object.assign(config, partialConfig);
      return {
        booksData: {
          ...state.booksData,
          [id]: {
            ...state.booksData[id],
            config
          }
        }
      };
    });
  },
  saveConfig: async (envConfig, bookKey, config, settings) => {
    console.log(`\u{1F4BE} Saving book config for ${bookKey}`, config);
    const appService = await envConfig.getAppService();
    const id = bookKey.split("-")[0];
    if (!id) {
      console.error(`\u274C Invalid book key: ${bookKey}`);
      return;
    }
    const bookData = get().booksData[id];
    if (!bookData || !bookData.book) {
      console.error(`\u274C Book data not found for ${id}`);
      return;
    }
    const book = bookData.book;
    book.progress = config.progress;
    book.updatedAt = Date.now();
    config.updatedAt = Date.now();
    try {
      await appService.saveBookConfig(book, config, settings);
      console.log(`\u2705 Book config saved to storage for ${bookKey}`);
      const books = await appService.loadLibraryBooks();
      const bookIndex = books.findIndex((b) => b.hash === id);
      if (bookIndex >= 0) {
        books[bookIndex] = book;
      } else {
        books.push(book);
      }
      await appService.saveLibraryBooks(books);
      console.log(`\u2705 Book library updated for ${bookKey}`);
    } catch (error) {
      console.error(`\u274C Error saving book config for ${bookKey}:`, error);
    }
  },
  updateBooknotes: (key, booknotes) => {
    let updatedConfig;
    console.log(`\u{1F4DD} Updating booknotes for ${key}`, booknotes.length, "items");
    set((state) => {
      const id = key.split("-")[0];
      const book = state.booksData[id];
      if (!book) {
        console.error(`\u274C Book data not found for ${id}`);
        return state;
      }
      const dedupedBooknotes = Array.from(
        new Map(booknotes.map((item) => [`${item.id}-${item.type}-${item.cfi}`, item])).values()
      );
      console.log(`\u{1F4CA} Deduped booknotes: ${dedupedBooknotes.length} items`);
      updatedConfig = {
        ...book.config,
        updatedAt: Date.now(),
        booknotes: dedupedBooknotes
      };
      console.log(`\u{1F4E6} Storing updated config in memory store`);
      return {
        booksData: {
          ...state.booksData,
          [id]: {
            ...book,
            config: {
              ...book.config,
              updatedAt: Date.now(),
              booknotes: dedupedBooknotes
            }
          }
        }
      };
    });
    return updatedConfig;
  }
}));

// src/store/readerStore.ts
init_document();

// src/utils/toc.ts
init_document();
var findParentPath = (toc, href) => {
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
var findTocItemBS = (toc, cfi) => {
  let left = 0;
  let right = toc.length - 1;
  let result = null;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentCfi = toc[mid].cfi || "";
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
var updateTocID = (items, index = 0) => {
  items.forEach((item) => {
    item.id ??= index++;
    if (item.subitems) {
      index = updateTocID(item.subitems, index);
    }
  });
  return index;
};
var updateTocCFI = (bookDoc, items, sections) => {
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

// src/store/readerStore.ts
var useReaderStore = create((set, get) => ({
  viewStates: {},
  bookKeys: [],
  hoveredBookKey: null,
  setBookKeys: (keys) => set({ bookKeys: keys }),
  setHoveredBookKey: (key) => set({ hoveredBookKey: key }),
  getView: (key) => key && get().viewStates[key]?.view || null,
  setView: (key, view) => set((state) => ({
    viewStates: {
      ...state.viewStates,
      [key]: { ...state.viewStates[key], view }
    }
  })),
  getViews: () => Object.values(get().viewStates).map((state) => state.view),
  getViewsById: (id) => {
    const { viewStates } = get();
    return Object.values(viewStates).filter((state) => state.key.startsWith(id)).map((state) => state.view);
  },
  clearViewState: (key) => {
    set((state) => {
      const viewStates = { ...state.viewStates };
      delete viewStates[key];
      return { viewStates };
    });
  },
  getViewState: (key) => get().viewStates[key] || null,
  initViewState: async (envConfig, id, key, isPrimary = true) => {
    const booksData = useBookDataStore.getState().booksData;
    const bookData = booksData[id];
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: {
          key: "",
          view: null,
          isPrimary: false,
          loading: true,
          error: null,
          progress: null,
          ribbonVisible: false,
          viewSettings: null
        }
      }
    }));
    try {
      if (!bookData) {
        const appService = await envConfig.getAppService();
        const { settings } = useSettingsStore.getState();
        const books = await appService.loadLibraryBooks();
        const book = books.find((b) => b.hash === id);
        if (!book) {
          throw new Error("Book not found");
        }
        const content = await appService.loadBookContent(book, settings);
        const { file, config: config2 } = content;
        console.log("Loading book", key);
        const { book: loadedBookDoc } = await new DocumentLoader(file).open();
        const bookDoc = loadedBookDoc;
        if (bookDoc.toc?.length && bookDoc.sections?.length) {
          updateTocID(bookDoc.toc);
          const sections = bookDoc.sections.reduce((map, section) => {
            map[section.id] = section;
            return map;
          }, {});
          updateTocCFI(bookDoc, bookDoc.toc, sections);
        }
        useBookDataStore.setState((state) => ({
          booksData: {
            ...state.booksData,
            [id]: { id, book, file, config: config2, bookDoc }
          }
        }));
      }
      const booksData2 = useBookDataStore.getState().booksData;
      const config = booksData2[id]?.config;
      const configViewSettings = config.viewSettings;
      set((state) => ({
        viewStates: {
          ...state.viewStates,
          [key]: {
            ...state.viewStates[key],
            key,
            view: null,
            isPrimary,
            loading: false,
            error: null,
            progress: null,
            ribbonVisible: false,
            viewSettings: JSON.parse(JSON.stringify(configViewSettings))
          }
        }
      }));
    } catch (error) {
      console.error(error);
      set((state) => ({
        viewStates: {
          ...state.viewStates,
          [key]: {
            ...state.viewStates[key],
            key: "",
            view: null,
            isPrimary: false,
            loading: false,
            error: "Failed to load book.",
            progress: null,
            ribbonVisible: false,
            viewSettings: null
          }
        }
      }));
    }
  },
  getViewSettings: (key) => get().viewStates[key]?.viewSettings || null,
  setViewSettings: (key, viewSettings) => {
    const id = key.split("-")[0];
    const bookData = useBookDataStore.getState().booksData[id];
    const viewState = get().viewStates[key];
    if (!viewState || !bookData) return;
    if (viewState.isPrimary) {
      useBookDataStore.setState((state) => ({
        booksData: {
          ...state.booksData,
          [id]: {
            ...bookData,
            config: {
              ...bookData.config,
              updatedAt: Date.now(),
              viewSettings
            }
          }
        }
      }));
    }
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: {
          ...state.viewStates[key],
          viewSettings
        }
      }
    }));
  },
  getProgress: (key) => get().viewStates[key]?.progress || null,
  setProgress: (key, location, tocItem, section, pageinfo, range) => set((state) => {
    const id = key.split("-")[0];
    const bookData = useBookDataStore.getState().booksData[id];
    const viewState = state.viewStates[key];
    if (!viewState || !bookData) return state;
    const progress = [(pageinfo.next ?? pageinfo.current) + 1, pageinfo.total];
    const book = bookData.book;
    if (book) {
      book.progress = progress;
      book.updatedAt = Date.now();
    }
    const oldConfig = bookData.config;
    const newConfig = {
      ...bookData.config,
      updatedAt: Date.now(),
      progress,
      location
    };
    useBookDataStore.setState((state2) => ({
      booksData: {
        ...state2.booksData,
        [id]: {
          ...bookData,
          config: viewState.isPrimary ? newConfig : oldConfig
        }
      }
    }));
    return {
      viewStates: {
        ...state.viewStates,
        [key]: {
          ...viewState,
          progress: {
            ...viewState.progress,
            location,
            sectionHref: tocItem?.href,
            sectionLabel: tocItem?.label,
            sectionId: tocItem?.id,
            section,
            pageinfo,
            range
          }
        }
      }
    };
  }),
  setBookmarkRibbonVisibility: (key, visible) => set((state) => ({
    viewStates: {
      ...state.viewStates,
      [key]: {
        ...state.viewStates[key],
        ribbonVisible: visible
      }
    }
  }))
}));
var useSidebarStore = create((set) => ({
  sideBarBookKey: null,
  sideBarWidth: "",
  isSideBarVisible: false,
  isSideBarPinned: false,
  setSideBarBookKey: (key) => set({ sideBarBookKey: key }),
  setSideBarWidth: (width) => set({ sideBarWidth: width }),
  toggleSideBar: () => set((state) => ({ isSideBarVisible: !state.isSideBarVisible })),
  toggleSideBarPin: () => set((state) => ({ isSideBarPinned: !state.isSideBarPinned })),
  setSideBarVisible: (visible) => set({ isSideBarVisible: visible }),
  setSideBarPin: (pinned) => set({ isSideBarPinned: pinned })
}));

// src/utils/webWindow.ts
var handleClose = () => {
  window.close();
};
var handleOnCloseWindow = (callback) => {
  const handler = async (event) => {
    await callback();
    event.preventDefault();
    event.returnValue = "";
  };
  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
};
var handleMinimize = () => {
  console.warn("Window minimize is not supported in web environments");
};
var handleToggleMaximize = () => {
  console.warn("Window maximize is not supported in web environments");
};

// src/app/reader/components/ReaderContent.tsx
init_misc();
init_constants();
init_misc();
var useBooksManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { envConfig } = useEnv();
  const { bookKeys } = useReaderStore();
  const { setBookKeys, initViewState } = useReaderStore();
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const [shouldUpdateSearchParams, setShouldUpdateSearchParams] = useState(false);
  useEffect(() => {
    if (shouldUpdateSearchParams) {
      const ids = bookKeys.map((key) => key.split("-")[0]);
      if (ids) {
        navigateToReader(router, ids, searchParams?.toString() || "", { scroll: false });
      }
      setShouldUpdateSearchParams(false);
    }
  }, [bookKeys, shouldUpdateSearchParams]);
  const appendBook = (id, isPrimary) => {
    const newKey = `${id}-${uniqueId()}`;
    initViewState(envConfig, id, newKey, isPrimary);
    if (!bookKeys.includes(newKey)) {
      const updatedKeys = [...bookKeys, newKey];
      setBookKeys(updatedKeys);
    }
    setSideBarBookKey(newKey);
    setShouldUpdateSearchParams(true);
  };
  const dismissBook = (bookKey) => {
    const updatedKeys = bookKeys.filter((key) => key !== bookKey);
    setBookKeys(updatedKeys);
    setShouldUpdateSearchParams(true);
  };
  const getNextBookKey = (bookKey) => {
    const index = bookKeys.findIndex((key) => key === bookKey);
    const nextIndex = (index + 1) % bookKeys.length;
    return bookKeys[nextIndex];
  };
  return {
    bookKeys,
    appendBook,
    dismissBook,
    getNextBookKey
  };
};
var useBooksManager_default = useBooksManager;
var useNotebookStore = create((set, get) => ({
  notebookWidth: "",
  isNotebookVisible: false,
  isNotebookPinned: false,
  notebookNewAnnotation: null,
  notebookEditAnnotation: null,
  notebookAnnotationDrafts: {},
  setNotebookWidth: (width) => set({ notebookWidth: width }),
  toggleNotebook: () => set((state) => ({ isNotebookVisible: !state.isNotebookVisible })),
  toggleNotebookPin: () => set((state) => ({ isNotebookPinned: !state.isNotebookPinned })),
  setNotebookVisible: (visible) => set({ isNotebookVisible: visible }),
  setNotebookPin: (pinned) => set({ isNotebookPinned: pinned }),
  setNotebookNewAnnotation: (selection) => set({ notebookNewAnnotation: selection }),
  setNotebookEditAnnotation: (note) => set({ notebookEditAnnotation: note }),
  saveNotebookAnnotationDraft: (key, note) => set((state) => ({
    notebookAnnotationDrafts: { ...state.notebookAnnotationDrafts, [key]: note }
  })),
  getNotebookAnnotationDraft: (key) => get().notebookAnnotationDrafts[key]
}));

// src/helpers/shortcuts.ts
var DEFAULT_SHORTCUTS = {
  onSwitchSideBar: ["ctrl+Tab", "opt+Tab", "alt+Tab"],
  onToggleSideBar: ["s"],
  onToggleNotebook: ["n"],
  onToggleSearchBar: ["ctrl+f", "cmd+f"],
  onToggleScrollMode: ["shift+j"],
  onToggleSelectMode: ["shift+s"],
  onOpenFontLayoutSettings: ["shift+f"],
  onReloadPage: ["shift+r"],
  onQuitApp: ["ctrl+q", "cmd+q"],
  onGoLeft: ["ArrowLeft", "PageUp", "h"],
  onGoRight: ["ArrowRight", "PageDown", "l", " "],
  onGoNext: ["ArrowDown", "j"],
  onGoPrev: ["ArrowUp", "k"],
  onGoHalfPageDown: ["shift+ArrowDown", "d"],
  onGoHalfPageUp: ["shift+ArrowUp", "u"],
  onGoBack: ["shift+ArrowLeft", "shift+h"],
  onGoForward: ["shift+ArrowRight", "shift+l"],
  onZoomIn: ["ctrl+=", "cmd+=", "shift+="],
  onZoomOut: ["ctrl+-", "cmd+-", "shift+-"],
  onResetZoom: ["ctrl+0", "cmd+0"],
  onSaveNote: ["ctrl+Enter"],
  onCloseNote: ["Escape"]
};
var loadShortcuts = () => {
  if (typeof localStorage === "undefined") return DEFAULT_SHORTCUTS;
  const customShortcuts = JSON.parse(localStorage.getItem("customShortcuts") || "{}");
  return {
    ...DEFAULT_SHORTCUTS,
    ...customShortcuts
  };
};

// src/hooks/useShortcuts.ts
var useShortcuts = (actions, dependencies = []) => {
  const [shortcuts, setShortcuts] = useState(loadShortcuts);
  useEffect(() => {
    const handleShortcutUpdate = () => {
      setShortcuts(loadShortcuts());
    };
    window.addEventListener("shortcutUpdate", handleShortcutUpdate);
    return () => window.removeEventListener("shortcutUpdate", handleShortcutUpdate);
  }, []);
  const parseShortcut = (shortcut) => {
    const keys = shortcut.toLowerCase().split("+");
    return {
      ctrlKey: keys.includes("ctrl"),
      altKey: keys.includes("alt") || keys.includes("opt"),
      metaKey: keys.includes("meta") || keys.includes("cmd"),
      shiftKey: keys.includes("shift"),
      key: keys.find((k) => !["ctrl", "alt", "opt", "meta", "cmd", "shift"].includes(k))
    };
  };
  const isShortcutMatch = (shortcut, key, ctrlKey, altKey, metaKey, shiftKey) => {
    const parsedShortcut = parseShortcut(shortcut);
    return parsedShortcut.key === key.toLowerCase() && parsedShortcut.ctrlKey === ctrlKey && parsedShortcut.altKey === altKey && parsedShortcut.metaKey === metaKey && parsedShortcut.shiftKey === shiftKey;
  };
  const processKeyEvent = (key, ctrlKey, altKey, metaKey, shiftKey) => {
    if (key === "backspace") return true;
    for (const [actionName, actionHandler] of Object.entries(actions)) {
      const shortcutKey = actionName;
      const handler = actionHandler;
      const shortcutList = shortcuts[shortcutKey];
      if (handler && shortcutList?.some(
        (shortcut) => isShortcutMatch(shortcut, key, ctrlKey, altKey, metaKey, shiftKey)
      )) {
        handler();
        return true;
      }
    }
    return false;
  };
  const unifiedHandleKeyDown = (event) => {
    const activeElement = document.activeElement;
    const isInteractiveElement = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;
    const isNoteEditor = activeElement.tagName === "TEXTAREA" && activeElement.classList.contains("note-editor");
    if (isInteractiveElement && !isNoteEditor) {
      return;
    }
    if (event instanceof KeyboardEvent) {
      const { key, ctrlKey, altKey, metaKey, shiftKey } = event;
      if (isNoteEditor && !(key === "Enter" && ctrlKey || key == "Escape")) {
        return;
      }
      const handled = processKeyEvent(key.toLowerCase(), ctrlKey, altKey, metaKey, shiftKey);
      if (handled) event.preventDefault();
    } else if (event instanceof MessageEvent && event.data && event.data.type === "iframe-keydown") {
      const { key, ctrlKey, altKey, metaKey, shiftKey } = event.data;
      processKeyEvent(key.toLowerCase(), ctrlKey, altKey, metaKey, shiftKey);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", unifiedHandleKeyDown);
    window.addEventListener("message", unifiedHandleKeyDown);
    return () => {
      window.removeEventListener("keydown", unifiedHandleKeyDown);
      window.removeEventListener("message", unifiedHandleKeyDown);
    };
  }, [shortcuts, ...dependencies]);
};
var useShortcuts_default = useShortcuts;

// src/app/reader/hooks/useBookShortcuts.ts
init_constants();
var useBookShortcuts = ({ sideBarBookKey, bookKeys }) => {
  const { getView, getViewSettings, setViewSettings } = useReaderStore();
  const { toggleSideBar, setSideBarBookKey } = useSidebarStore();
  const { setFontLayoutSettingsDialogOpen } = useSettingsStore();
  const { toggleNotebook } = useNotebookStore();
  const { getNextBookKey } = useBooksManager_default();
  const viewSettings = getViewSettings(sideBarBookKey ?? "");
  const fontSize = viewSettings?.defaultFontSize ?? 16;
  const lineHeight = viewSettings?.lineHeight ?? 1.6;
  const distance = fontSize * lineHeight * 3;
  const toggleScrollMode = () => {
    const viewSettings2 = getViewSettings(sideBarBookKey ?? "");
    if (viewSettings2 && sideBarBookKey) {
      viewSettings2.scrolled = !viewSettings2.scrolled;
      setViewSettings(sideBarBookKey, viewSettings2);
      const flowMode = viewSettings2.scrolled ? "scrolled" : "paginated";
      getView(sideBarBookKey)?.renderer.setAttribute("flow", flowMode);
    }
  };
  const switchSideBar = () => {
    if (sideBarBookKey) setSideBarBookKey(getNextBookKey(sideBarBookKey));
  };
  const goLeft = () => {
    getView(sideBarBookKey)?.goLeft();
  };
  const goRight = () => {
    getView(sideBarBookKey)?.goRight();
  };
  const goPrev = () => {
    getView(sideBarBookKey)?.prev(distance);
  };
  const goNext = () => {
    getView(sideBarBookKey)?.next(distance);
  };
  const goBack = () => {
    getView(sideBarBookKey)?.history.back();
  };
  const goHalfPageDown = () => {
    const view = getView(sideBarBookKey);
    const viewSettings2 = getViewSettings(sideBarBookKey ?? "");
    if (view && viewSettings2 && viewSettings2.scrolled) {
      view.next(view.renderer.size / 2);
    }
  };
  const goHalfPageUp = () => {
    const view = getView(sideBarBookKey);
    const viewSettings2 = getViewSettings(sideBarBookKey ?? "");
    if (view && viewSettings2 && viewSettings2.scrolled) {
      view.prev(view.renderer.size / 2);
    }
  };
  const goForward = () => {
    getView(sideBarBookKey)?.history.forward();
  };
  const reloadPage = () => {
    window.location.reload();
  };
  const quitApp = async () => {
    await eventDispatcher.dispatch("quit-app");
    window.close();
  };
  const showSearchBar = () => {
    eventDispatcher.dispatch("search", { term: "" });
  };
  const zoomIn = () => {
    if (!sideBarBookKey) return;
    const view = getView(sideBarBookKey);
    if (!view?.renderer?.setStyles) return;
    const viewSettings2 = getViewSettings(sideBarBookKey);
    const zoomLevel = viewSettings2.zoomLevel + ZOOM_STEP;
    viewSettings2.zoomLevel = Math.min(zoomLevel, MAX_ZOOM_LEVEL);
    setViewSettings(sideBarBookKey, viewSettings2);
    view?.renderer.setStyles?.(getStyles(viewSettings2));
  };
  const zoomOut = () => {
    if (!sideBarBookKey) return;
    const view = getView(sideBarBookKey);
    if (!view?.renderer?.setStyles) return;
    const viewSettings2 = getViewSettings(sideBarBookKey);
    const zoomLevel = viewSettings2.zoomLevel - ZOOM_STEP;
    viewSettings2.zoomLevel = Math.max(zoomLevel, MIN_ZOOM_LEVEL);
    setViewSettings(sideBarBookKey, viewSettings2);
    view?.renderer.setStyles?.(getStyles(viewSettings2));
  };
  const resetZoom = () => {
    if (!sideBarBookKey) return;
    const view = getView(sideBarBookKey);
    if (!view?.renderer?.setStyles) return;
    const viewSettings2 = getViewSettings(sideBarBookKey);
    viewSettings2.zoomLevel = 100;
    setViewSettings(sideBarBookKey, viewSettings2);
    view?.renderer.setStyles?.(getStyles(viewSettings2));
  };
  useShortcuts_default(
    {
      onSwitchSideBar: switchSideBar,
      onToggleSideBar: toggleSideBar,
      onToggleNotebook: toggleNotebook,
      onToggleScrollMode: toggleScrollMode,
      onOpenFontLayoutSettings: () => setFontLayoutSettingsDialogOpen(true),
      onToggleSearchBar: showSearchBar,
      onReloadPage: reloadPage,
      onQuitApp: quitApp,
      onGoLeft: goLeft,
      onGoRight: goRight,
      onGoPrev: goPrev,
      onGoNext: goNext,
      onGoHalfPageDown: goHalfPageDown,
      onGoHalfPageUp: goHalfPageUp,
      onGoBack: goBack,
      onGoForward: goForward,
      onZoomIn: zoomIn,
      onZoomOut: zoomOut,
      onResetZoom: resetZoom
    },
    [sideBarBookKey, bookKeys]
  );
};
var useBookShortcuts_default = useBookShortcuts;

// src/i18n/i18n.ts
var import_i18next_scanner = __toESM(require_i18next_scanner_config());
i18n.use(HttpApi).use(LanguageDetector).use(initReactI18next).init({
  supportedLngs: ["en", ...import_i18next_scanner.options.lngs],
  fallbackLng: {
    "zh-HK": ["zh-TW", "en"],
    kk: ["ru", "en"],
    ky: ["ru", "en"],
    tk: ["ru", "en"],
    uz: ["ru", "en"],
    ug: ["ru", "en"],
    tt: ["ru", "en"],
    default: ["en"]
  },
  ns: import_i18next_scanner.options.ns,
  defaultNS: import_i18next_scanner.options.defaultNs,
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json"
  },
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    caches: ["localStorage"]
  },
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});
i18n.on("languageChanged", (lng) => {
  console.log("Language changed to", lng);
});
var useTranslation = (namespace = "translation") => {
  const { t } = useTranslation$1(namespace);
  return (key, options2 = {}) => t(key, { defaultValue: key, ...options2 });
};

// src/components/BookDetailModal.tsx
init_book();
var Alert = ({ title, message, onCancel, onConfirm }) => {
  const _ = useTranslation();
  return /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("z-[100] flex justify-center px-4") }, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      role: "alert",
      className: clsx8(
        "alert flex items-center justify-between",
        "bg-base-300 rounded-lg border-none p-4 shadow-2xl",
        "w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] xl:max-w-[40vw]"
      )
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React43__default.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        className: "stroke-info h-6 w-6 shrink-0"
      },
      /* @__PURE__ */ React43__default.createElement(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      )
    ), /* @__PURE__ */ React43__default.createElement("div", { className: "" }, /* @__PURE__ */ React43__default.createElement("h3", { className: "font-sm text-base" }, title), /* @__PURE__ */ React43__default.createElement("div", { className: "text-xs" }, message))),
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex flex-wrap items-center justify-center gap-2" }, /* @__PURE__ */ React43__default.createElement("button", { className: "btn btn-sm", onClick: onCancel }, _("Cancel")), /* @__PURE__ */ React43__default.createElement("button", { className: "btn btn-sm btn-warning", onClick: onConfirm }, _("Confirm")))
  ));
};
var Alert_default = Alert;
var Spinner = ({ loading }) => {
  const _ = useTranslation();
  if (!loading) return null;
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "absolute left-1/2 -translate-x-1/2 transform text-center",
        "top-4 pt-[calc(env(safe-area-inset-top)+64px)]"
      ),
      role: "status"
    },
    /* @__PURE__ */ React43__default.createElement("span", { className: "loading loading-dots loading-lg" }),
    /* @__PURE__ */ React43__default.createElement("span", { className: "hidden" }, _("Loading..."))
  );
};
var Spinner_default = Spinner;
var useDrag = (onDragMove, onDragEnd) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const startTime = useRef(0);
  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      isDragging.current = true;
      if ("touches" in e) {
        startY.current = e.touches[0].clientY;
        startX.current = e.touches[0].clientX;
      } else {
        startY.current = e.clientY;
        startX.current = e.clientX;
      }
      startTime.current = performance.now();
      const handleMove = (event) => {
        if (isDragging.current) {
          let deltaX = 0;
          let deltaY = 0;
          let clientX = 0;
          let clientY = 0;
          if ("touches" in event && event.touches.length > 0) {
            const currentTouch = event.touches[0];
            clientX = currentTouch.clientX;
            clientY = currentTouch.clientY;
          } else {
            const evt = event;
            clientX = evt.clientX;
            clientY = evt.clientY;
          }
          deltaX = clientX - lastX.current;
          deltaY = clientY - lastY.current;
          lastX.current = clientX;
          lastY.current = clientY;
          onDragMove({ clientX, clientY, deltaX, deltaY });
        }
      };
      const handleEnd = (event) => {
        isDragging.current = false;
        let deltaX = 0;
        let deltaY = 0;
        let clientX = 0;
        let clientY = 0;
        const endTime = performance.now();
        const deltaT = endTime - startTime.current;
        if ("touches" in event) {
          const currentTouch = event.changedTouches[0];
          clientX = currentTouch.clientX;
          clientY = currentTouch.clientY;
        } else {
          const evt = event;
          clientX = evt.clientX;
          clientY = evt.clientY;
        }
        deltaX = clientX - startX.current;
        deltaY = clientY - startY.current;
        const velocity = deltaY / deltaT;
        if (onDragEnd) {
          onDragEnd({ velocity, deltaT, clientX, clientY, deltaX, deltaY });
        }
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    },
    [onDragMove, onDragEnd]
  );
  return { handleDragStart };
};
var useResponsiveSize = (baseSize) => {
  const isPhone = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
  if (isPhone) return baseSize * 1.25;
  if (isTablet) return baseSize * 1.15;
  return baseSize;
};
var useDefaultIconSize = () => {
  return useResponsiveSize(20);
};

// src/utils/haptics.ts
var VIBRATION_PATTERNS = {
  success: [50],
  warning: [30, 30, 30],
  error: [100, 30, 100],
  heavy: [80],
  medium: [40],
  light: [15],
  selection: [20],
  soft: [10]
};
var impactFeedback = (type) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(VIBRATION_PATTERNS[type]);
  }
};

// src/components/Dialog.tsx
init_rtl();
var VELOCITY_THRESHOLD = 0.5;
var SNAP_THRESHOLD = 0.2;
var Dialog = ({
  id,
  isOpen,
  children,
  snapHeight,
  header,
  title,
  className,
  bgClassName,
  boxClassName,
  contentClassName,
  onClose
}) => {
  const { appService } = useEnv();
  const [isFullHeightInMobile, setIsFullHeightInMobile] = React43__default.useState(!snapHeight);
  const [isRtl] = useState(() => getDirFromUILanguage() === "rtl");
  const iconSize22 = useResponsiveSize(22);
  const isMobile = window.innerWidth < 640;
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleDragMove = (data) => {
    if (!isMobile) return;
    const modal = document.querySelector(".modal-box");
    const overlay = document.querySelector(".overlay");
    const heightFraction = data.clientY / window.innerHeight;
    const newTop = Math.max(0, Math.min(1, heightFraction));
    if (modal && overlay) {
      modal.style.height = "100%";
      modal.style.transform = `translateY(${newTop * 100}%)`;
      overlay.style.opacity = `${1 - heightFraction}`;
      setIsFullHeightInMobile(data.clientY < 44);
      modal.style.transition = `padding-top 0.3s ease-out`;
    }
  };
  const handleDragEnd = (data) => {
    const modal = document.querySelector(".modal-box");
    const overlay = document.querySelector(".overlay");
    if (!modal || !overlay) return;
    const snapUpper = snapHeight ? 1 - snapHeight - SNAP_THRESHOLD : 0.5;
    const snapLower = snapHeight ? 1 - snapHeight + SNAP_THRESHOLD : 0.5;
    if (data.velocity > VELOCITY_THRESHOLD || data.velocity >= 0 && data.clientY >= window.innerHeight * snapLower) {
      const transitionDuration = 0.15 / Math.max(data.velocity, 0.5);
      modal.style.height = "100%";
      modal.style.transition = `transform ${transitionDuration}s ease-out`;
      modal.style.transform = "translateY(100%)";
      overlay.style.transition = `opacity ${transitionDuration}s ease-out`;
      overlay.style.opacity = "0";
      setTimeout(() => {
        onClose();
        modal.style.transform = "translateY(0%)";
      }, 300);
      if (appService?.hasHaptics) {
        impactFeedback("medium");
      }
    } else if (snapHeight && data.clientY > window.innerHeight * snapUpper && data.clientY < window.innerHeight * snapLower) {
      modal.style.transition = `transform 0.3s ease-out`;
      modal.style.transform = `translateY(${(1 - snapHeight) * window.innerHeight}px)`;
      setTimeout(() => {
        modal.style.height = `${snapHeight * 100}%`;
      }, 100);
      if (appService?.hasHaptics) {
        impactFeedback("medium");
      }
    } else {
      setIsFullHeightInMobile(true);
      modal.style.height = "100%";
      modal.style.transition = `transform 0.3s ease-out`;
      modal.style.transform = `translateY(0%)`;
      overlay.style.opacity = "0";
      if (appService?.hasHaptics) {
        impactFeedback("medium");
      }
    }
  };
  const { handleDragStart } = useDrag(handleDragMove, handleDragEnd);
  return /* @__PURE__ */ React43__default.createElement(
    "dialog",
    {
      id: id ?? "dialog",
      open: isOpen,
      className: clsx8(
        "modal sm:min-w-90 z-50 h-full w-full !items-start !bg-transparent sm:w-full sm:!items-center",
        className
      ),
      dir: isRtl ? "rtl" : void 0
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8("overlay fixed inset-0 z-10 bg-black/50 sm:bg-black/20", bgClassName),
        onClick: onClose
      }
    ),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "modal-box settings-content z-20 flex flex-col rounded-none rounded-tl-2xl rounded-tr-2xl p-0 sm:rounded-2xl",
          "h-full max-h-full w-full max-w-full",
          window.innerWidth < window.innerHeight ? "sm:h-[50%] sm:w-3/4" : "sm:h-[65%] sm:w-1/2 sm:max-w-[600px]",
          appService?.hasSafeAreaInset && isFullHeightInMobile && "pt-[env(safe-area-inset-top)] sm:pt-0",
          boxClassName
        ),
        style: snapHeight ? {
          height: `${snapHeight * 100}%`,
          transform: `translateY(${(1 - snapHeight) * window.innerHeight}px)`
        } : {}
      },
      window.innerWidth < 640 && /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: "drag-handle flex h-10 max-h-10 min-h-10 w-full cursor-row-resize items-center justify-center",
          onMouseDown: handleDragStart,
          onTouchStart: handleDragStart
        },
        /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-content/50 h-1 w-10 rounded-full" })
      ),
      /* @__PURE__ */ React43__default.createElement("div", { className: "dialog-header bg-base-100 sticky top-1 z-10 flex items-center justify-between px-4" }, header ? header : /* @__PURE__ */ React43__default.createElement("div", { className: "flex h-11 w-full items-center justify-between" }, /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          tabIndex: -1,
          onClick: onClose,
          className: "btn btn-ghost btn-circle flex h-8 min-h-8 w-8 hover:bg-transparent focus:outline-none sm:hidden"
        },
        isRtl ? /* @__PURE__ */ React43__default.createElement(MdArrowForwardIos, { size: iconSize22 }) : /* @__PURE__ */ React43__default.createElement(MdArrowBackIosNew, { size: iconSize22 })
      ), /* @__PURE__ */ React43__default.createElement("div", { className: "z-15 pointer-events-none absolute inset-0 flex h-11 items-center justify-center" }, /* @__PURE__ */ React43__default.createElement("span", { className: "line-clamp-1 text-center font-bold" }, title ?? "")), /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          tabIndex: -1,
          onClick: onClose,
          className: "bg-base-300/65 btn btn-ghost btn-circle ml-auto hidden h-6 min-h-6 w-6 focus:outline-none sm:flex"
        },
        /* @__PURE__ */ React43__default.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1em",
            height: "1em",
            viewBox: "0 0 24 24"
          },
          /* @__PURE__ */ React43__default.createElement(
            "path",
            {
              fill: "currentColor",
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            }
          )
        )
      ))),
      /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: clsx8(
            "text-base-content my-2 flex-grow overflow-y-auto px-6 sm:px-[10%]",
            contentClassName
          )
        },
        children
      )
    )
  );
};
var Dialog_default = Dialog;

// src/components/BookDetailModal.tsx
var BookDetailModal = ({ book, isOpen, onClose }) => {
  const _ = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [bookMeta, setBookMeta] = useState(null);
  const { envConfig, appService } = useEnv();
  const { settings } = useSettingsStore();
  useEffect(() => {
    const loadingTimeout = setTimeout(() => setLoading(true), 300);
    const fetchBookDetails = async () => {
      const appService2 = await envConfig.getAppService();
      try {
        const details = await appService2.fetchBookDetails(book, settings);
        setBookMeta(details);
      } finally {
        if (loadingTimeout) clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [book]);
  const handleClose2 = () => {
    setBookMeta(null);
    onClose();
  };
  const handleDelete = () => {
    setShowDeleteAlert(true);
  };
  const confirmDelete = async () => {
    await appService?.deleteBook(book, !!book.uploadedAt);
    const books = await appService?.loadLibraryBooks() || [];
    const bookIndex = books.findIndex((b) => b.hash === book.hash);
    if (bookIndex >= 0) {
      books[bookIndex] = { ...book, deletedAt: Date.now() };
      await appService?.saveLibraryBooks(books);
    }
    handleClose2();
    setShowDeleteAlert(false);
  };
  if (!bookMeta)
    return loading && /* @__PURE__ */ React43__default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center" }, /* @__PURE__ */ React43__default.createElement(Spinner_default, { loading: true }));
  return /* @__PURE__ */ React43__default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center" }, /* @__PURE__ */ React43__default.createElement(
    Dialog_default,
    {
      title: _("Book Details"),
      isOpen,
      onClose: handleClose2,
      bgClassName: "sm:bg-black/50",
      boxClassName: "sm:min-w-[480px] sm:h-auto",
      contentClassName: "!px-6 !py-2"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full select-text items-center justify-center" }, /* @__PURE__ */ React43__default.createElement("div", { className: "relative w-full rounded-lg" }, /* @__PURE__ */ React43__default.createElement("div", { className: "mb-10 flex h-40 items-start" }, /* @__PURE__ */ React43__default.createElement("div", { className: "book-cover relative mr-10 aspect-[28/41] h-40 items-end shadow-lg" }, /* @__PURE__ */ React43__default.createElement(
      Image,
      {
        src: book.coverImageUrl,
        alt: formatTitle(book.title),
        fill: true,
        className: "w-10 object-cover",
        onError: (e) => {
          e.target.style.display = "none";
          e.target.nextElementSibling?.classList.remove(
            "invisible"
          );
        }
      }
    ), /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "invisible absolute inset-0 flex items-center justify-center p-1",
          "text-neutral-content rounded-none text-center font-serif text-base font-medium"
        )
      },
      formatTitle(book.title)
    )), /* @__PURE__ */ React43__default.createElement("div", { className: "title-author flex h-40 flex-col justify-between" }, /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement("p", { className: "text-base-content mb-2 line-clamp-2 break-all text-2xl font-bold" }, formatTitle(book.title) || _("Untitled")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content line-clamp-1" }, formatAuthors(book.author, bookMeta.language) || _("Unknown"))), window.innerWidth >= 400 && /* @__PURE__ */ React43__default.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 py-2" }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: "btn rounded-xl bg-red-600 px-4 text-white hover:bg-red-700",
        onClick: handleDelete
      },
      _("Delete")
    ), /* @__PURE__ */ React43__default.createElement("button", { className: "btn btn-disabled bg-primary/25 hover:bg-primary/85 rounded-xl px-4 text-white" }, _("More Info"))))), window.innerWidth < 400 && /* @__PURE__ */ React43__default.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 py-2" }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: "btn rounded bg-red-600 text-white hover:bg-red-700",
        onClick: handleDelete
      },
      _("Delete")
    ), /* @__PURE__ */ React43__default.createElement("button", { className: "btn btn-disabled bg-primary/25 hover:bg-primary/85 rounded px-4 text-white" }, _("More Info"))), /* @__PURE__ */ React43__default.createElement("div", { className: "text-base-content my-4" }, /* @__PURE__ */ React43__default.createElement("div", { className: "mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3" }, /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Publisher:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content line-clamp-1 text-sm" }, formatPublisher(bookMeta.publisher || "") || _("Unknown"))), /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Published:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content max-w-28 text-ellipsis text-sm" }, formatDate(bookMeta.published) || _("Unknown"))), /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Updated:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content text-sm" }, formatDate(book.lastUpdated) || "")), /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Language:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content text-sm" }, formatLanguage(bookMeta.language) || _("Unknown"))), /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Identifier:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content line-clamp-1 text-sm" }, bookMeta.identifier || "N/A")), /* @__PURE__ */ React43__default.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React43__default.createElement("span", { className: "font-bold" }, _("Subjects:")), /* @__PURE__ */ React43__default.createElement("p", { className: "text-neutral-content line-clamp-1 text-sm" }, formatSubject(bookMeta.subject) || _("Unknown")))))))
  ), showDeleteAlert && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "fixed bottom-0 left-0 right-0 z-50 flex justify-center",
        "pb-[calc(env(safe-area-inset-bottom)+16px)]"
      )
    },
    /* @__PURE__ */ React43__default.createElement(
      Alert_default,
      {
        title: _("Confirm Deletion"),
        message: _("Are you sure to delete the selected books?"),
        onCancel: () => {
          setShowDeleteAlert(false);
        },
        onConfirm: confirmDelete
      }
    )
  ));
};
var BookDetailModal_default = BookDetailModal;
init_book();
var useTrafficLightStore = create((set, get) => {
  return {
    appService: void 0,
    isTrafficLightVisible: false,
    shouldShowTrafficLight: false,
    initializeTrafficLightStore: (appService) => {
      set({
        appService,
        isTrafficLightVisible: appService.hasTrafficLight,
        shouldShowTrafficLight: appService.hasTrafficLight
      });
    },
    setTrafficLightVisibility: async (visible) => {
      const isFullscreen = !!document.fullscreenElement;
      set({ isTrafficLightVisible: !isFullscreen && visible, shouldShowTrafficLight: visible });
    },
    initializeTrafficLightListeners: async () => {
      const handleEnterFullScreen = () => {
        set({ isTrafficLightVisible: false });
      };
      const handleExitFullScreen = () => {
        const { shouldShowTrafficLight } = get();
        set({ isTrafficLightVisible: shouldShowTrafficLight });
      };
      document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          handleEnterFullScreen();
        } else {
          handleExitFullScreen();
        }
      });
      const unlistenEnterFullScreen = () => {
        document.removeEventListener("fullscreenchange", handleEnterFullScreen);
      };
      const unlistenExitFullScreen = () => {
        document.removeEventListener("fullscreenchange", handleExitFullScreen);
      };
      set({ unlistenEnterFullScreen, unlistenExitFullScreen });
    },
    cleanupTrafficLightListeners: () => {
      const { unlistenEnterFullScreen, unlistenExitFullScreen } = get();
      if (unlistenEnterFullScreen) unlistenEnterFullScreen();
      if (unlistenExitFullScreen) unlistenExitFullScreen();
      set({ unlistenEnterFullScreen: void 0, unlistenExitFullScreen: void 0 });
    }
  };
});

// src/app/reader/components/sidebar/Header.tsx
var SidebarHeader = ({ isPinned, isSearchBarVisible, onGoToLibrary, onClose, onTogglePin, onToggleSearchBar }) => {
  const { isTrafficLightVisible } = useTrafficLightStore();
  const iconSize14 = useResponsiveSize(14);
  const iconSize18 = useResponsiveSize(18);
  const iconSize22 = useResponsiveSize(22);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "sidebar-header flex h-11 items-center justify-between pe-2",
        isTrafficLightVisible ? "pl-20" : "ps-1.5"
      ),
      dir: "ltr"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center gap-x-8" }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: onClose,
        className: "btn btn-ghost btn-circle flex h-6 min-h-6 w-6 hover:bg-transparent sm:hidden"
      },
      /* @__PURE__ */ React43__default.createElement(MdArrowBackIosNew, { size: iconSize22 })
    ), /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: "btn btn-ghost hidden h-8 min-h-8 w-8 p-0 sm:flex",
        onClick: onGoToLibrary,
        title: "Reload Book"
      },
      /* @__PURE__ */ React43__default.createElement(IoReload, { className: "fill-base-content" })
    )),
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex min-w-24 max-w-32 items-center justify-between sm:size-[70%]" }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: onToggleSearchBar,
        className: clsx8(
          "btn btn-ghost left-0 h-8 min-h-8 w-8 p-0",
          isSearchBarVisible ? "bg-base-300" : ""
        )
      },
      /* @__PURE__ */ React43__default.createElement(FiSearch, { size: iconSize18, className: "text-base-content" })
    ), /* @__PURE__ */ React43__default.createElement("div", { className: "right-0 hidden h-8 w-8 items-center justify-center sm:flex" }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: onTogglePin,
        className: clsx8(
          "sidebar-pin-btn btn btn-ghost btn-circle hidden h-6 min-h-6 w-6 sm:flex",
          isPinned ? "bg-base-300" : "bg-base-300/65"
        )
      },
      isPinned ? /* @__PURE__ */ React43__default.createElement(MdPushPin, { size: iconSize14 }) : /* @__PURE__ */ React43__default.createElement(MdOutlinePushPin, { size: iconSize14 })
    )))
  );
};
var Header_default = SidebarHeader;
init_misc();
var createExpanderIcon = (isExpanded) => {
  return /* @__PURE__ */ React43__default.createElement(
    "svg",
    {
      viewBox: "0 0 8 10",
      width: "8",
      height: "10",
      className: clsx8(
        "text-base-content transform transition-transform",
        isExpanded ? "rotate-90" : "rotate-0"
      ),
      style: { transformOrigin: "center" },
      fill: "currentColor"
    },
    /* @__PURE__ */ React43__default.createElement("polygon", { points: "0 0, 8 5, 0 10" })
  );
};
var TOCItemView = ({ bookKey, item, depth, expandedItems }) => {
  const [isExpanded, setIsExpanded] = useState(expandedItems.includes(item.href || ""));
  const { getView, getProgress } = useReaderStore();
  const progress = getProgress(bookKey);
  const handleToggleExpand = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };
  const handleClickItem = (event) => {
    event.preventDefault();
    eventDispatcher.dispatch("navigate", { bookKey, href: item.href });
    if (item.href) {
      getView(bookKey)?.goTo(item.href);
    }
  };
  const isActive = progress ? progress.sectionHref === item.href : false;
  useEffect(() => {
    setIsExpanded(expandedItems.includes(item.href || ""));
  }, [expandedItems, item.href]);
  return /* @__PURE__ */ React43__default.createElement("li", { className: "w-full", style: { paddingTop: "1px" } }, /* @__PURE__ */ React43__default.createElement(
    "span",
    {
      role: "treeitem",
      tabIndex: -1,
      onClick: item.href ? handleClickItem : void 0,
      style: { paddingInlineStart: `${(depth + 1) * 12}px` },
      "aria-expanded": isExpanded ? "true" : "false",
      "aria-selected": isActive ? "true" : "false",
      "data-href": item.href ? getContentMd5(item.href) : void 0,
      className: `flex w-full cursor-pointer items-center rounded-md py-2 ${isActive ? "bg-base-300/85 hover:bg-base-300" : "sm:hover:bg-base-300/85"}`
    },
    item.subitems && /* @__PURE__ */ React43__default.createElement("span", { onClick: handleToggleExpand, className: "inline-block cursor-pointer" }, createExpanderIcon(isExpanded)),
    /* @__PURE__ */ React43__default.createElement(
      "span",
      {
        className: "ml-2 truncate text-ellipsis",
        style: {
          maxWidth: "calc(100% - 24px)",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }
      },
      item.label
    )
  ), item.subitems && isExpanded && /* @__PURE__ */ React43__default.createElement("ol", { role: "group" }, item.subitems.map((subitem, index) => /* @__PURE__ */ React43__default.createElement(
    TOCItemView,
    {
      bookKey,
      key: `${index}-${subitem.href}`,
      item: subitem,
      depth: depth + 1,
      expandedItems
    }
  ))));
};
var TOCView = ({ bookKey, toc }) => {
  const { getProgress } = useReaderStore();
  const { sideBarBookKey } = useSidebarStore();
  const progress = getProgress(bookKey);
  const [expandedItems, setExpandedItems] = useState([]);
  const viewRef = useRef(null);
  const expandParents = (toc2, href) => {
    const parentPath = findParentPath(toc2, href).map((item) => item.href);
    setExpandedItems(parentPath.filter(Boolean));
  };
  const scrollToProgress = (progress2) => {
    const { sectionHref: currentHref } = progress2;
    const hrefMd5 = currentHref ? getContentMd5(currentHref) : "";
    const currentItem = viewRef.current?.querySelector(`[data-href="${hrefMd5}"]`);
    if (currentItem) {
      const rect = currentItem.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible) {
        currentItem.scrollIntoView({ behavior: "instant", block: "center" });
      }
      currentItem.setAttribute("aria-current", "page");
    }
    if (currentHref) {
      expandParents(toc, currentHref);
    }
  };
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const progress2 = getProgress(bookKey);
      if (progress2 && viewRef.current) {
        scrollToProgress(progress2);
        observer.disconnect();
      }
    });
    if (viewRef.current) {
      observer.observe(viewRef.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, [viewRef]);
  useEffect(() => {
    if (!progress || eventDispatcher.dispatchSync("tts-is-speaking")) return;
    scrollToProgress(progress);
  }, [toc, progress, sideBarBookKey]);
  return /* @__PURE__ */ React43__default.createElement("div", { className: "rounded pt-2" }, /* @__PURE__ */ React43__default.createElement("ul", { role: "tree", ref: viewRef, className: "px-2" }, toc && toc.map((item, index) => /* @__PURE__ */ React43__default.createElement(
    TOCItemView,
    {
      bookKey,
      key: `${index}-${item.href}`,
      item,
      depth: 0,
      expandedItems
    }
  ))));
};
var TOCView_default = TOCView;
var useScrollToItem = (cfi, progress) => {
  const viewRef = useRef(null);
  const [isCurrent, setIsCurrent] = useState(false);
  useEffect(() => {
    if (!viewRef.current || !progress) return;
    const { location } = progress;
    const start = CFI4.collapse(location);
    const end = CFI4.collapse(location, true);
    const isCurrent2 = CFI4.compare(cfi, start) >= 0 && CFI4.compare(cfi, end) <= 0;
    setIsCurrent(isCurrent2);
    if (isCurrent2) {
      const element = viewRef.current;
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      element.setAttribute("aria-current", "page");
    }
  }, [cfi, progress, viewRef]);
  return { isCurrent, viewRef };
};
var useScrollToItem_default = useScrollToItem;

// src/app/reader/components/sidebar/BooknoteItem.tsx
var BooknoteItem = ({ bookKey, item }) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { settings } = useSettingsStore();
  const { getConfig, saveConfig, updateBooknotes } = useBookDataStore();
  const { getProgress, getView, getViewsById } = useReaderStore();
  const { setNotebookEditAnnotation, setNotebookVisible } = useNotebookStore();
  const { text, cfi, note } = item;
  const progress = getProgress(bookKey);
  const { isCurrent, viewRef } = useScrollToItem_default(cfi, progress);
  const handleClickItem = (event) => {
    event.preventDefault();
    eventDispatcher.dispatch("navigate", { bookKey, cfi });
    getView(bookKey)?.goTo(cfi);
    if (note) {
      setNotebookVisible(true);
    }
  };
  const deleteNote = (note2) => {
    if (!bookKey) return;
    const config = getConfig(bookKey);
    if (!config) return;
    const { booknotes = [] } = config;
    booknotes.forEach((item2) => {
      if (item2.id === note2.id) {
        item2.deletedAt = Date.now();
        const views = getViewsById(bookKey.split("-")[0]);
        views.forEach((view) => view?.addAnnotation(item2, true));
      }
    });
    const updatedConfig = updateBooknotes(bookKey, booknotes);
    if (updatedConfig) {
      saveConfig(envConfig, bookKey, updatedConfig, settings);
    }
  };
  const editNote = (note2) => {
    setNotebookVisible(true);
    setNotebookEditAnnotation(note2);
  };
  return /* @__PURE__ */ React43__default.createElement(
    "li",
    {
      ref: viewRef,
      className: clsx8(
        "border-base-300 content group relative my-2 cursor-pointer rounded-lg p-2",
        isCurrent ? "bg-base-300/85 hover:bg-base-300" : "hover:bg-base-300/55 bg-base-100",
        "transition-all duration-300 ease-in-out"
      ),
      tabIndex: 0,
      onClick: handleClickItem
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8("min-h-4 p-0 transition-all duration-300 ease-in-out"),
        style: {
          "--top-override": "0.7rem",
          "--end-override": "0.3rem"
        }
      },
      item.note && /* @__PURE__ */ React43__default.createElement("span", { className: "content font-size-sm font-normal", dir: "auto" }, item.note),
      /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-start" }, item.note && /* @__PURE__ */ React43__default.createElement("div", { className: "my-1 me-2 min-h-full self-stretch border-l-2 border-gray-300" }), /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("content font-size-sm line-clamp-3", item.note && "my-2") }, /* @__PURE__ */ React43__default.createElement(
        "span",
        {
          className: clsx8(
            "inline",
            item.note && "content font-size-xs text-gray-500",
            (item.style === "underline" || item.style === "squiggly") && "underline decoration-2",
            item.style === "highlight" && `bg-${item.color}-500 bg-opacity-40`,
            item.style === "underline" && `decoration-${item.color}-400`,
            item.style === "squiggly" && `decoration-wavy decoration-${item.color}-400`
          )
        },
        text || ""
      )))
    ),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "max-h-0 overflow-hidden p-0 text-xs",
          "transition-[max-height] duration-300 ease-in-out",
          "group-hover:max-h-8 group-hover:overflow-visible"
        ),
        style: {
          "--bottom-override": 0
        },
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: "flex justify-end space-x-3 p-2", dir: "ltr" }, item.note && /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          className: clsx8(
            "btn btn-ghost content settings-content hover:bg-transparent",
            "flex h-4 min-h-4 items-end p-0"
          ),
          onClick: editNote.bind(null, item)
        },
        /* @__PURE__ */ React43__default.createElement(
          "div",
          {
            className: clsx8(
              "align-bottom text-blue-500",
              "transition duration-300 ease-in-out",
              "content font-size-sm",
              "opacity-0 group-hover:opacity-100",
              "hover:text-blue-600"
            )
          },
          _("Edit")
        )
      ), /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          className: clsx8(
            "btn btn-ghost content settings-content hover:bg-transparent",
            "flex h-4 min-h-4 items-end p-0"
          ),
          onClick: deleteNote.bind(null, item)
        },
        /* @__PURE__ */ React43__default.createElement(
          "div",
          {
            className: clsx8(
              "align-bottom text-red-500",
              "transition duration-300 ease-in-out",
              "content font-size-sm",
              "opacity-0 group-hover:opacity-100",
              "hover:text-red-600"
            )
          },
          _("Delete")
        )
      ))
    )
  );
};
var BooknoteItem_default = BooknoteItem;

// src/app/reader/components/sidebar/BooknoteView.tsx
var BooknoteView = ({ type, bookKey, toc }) => {
  const { getConfig } = useBookDataStore();
  const config = getConfig(bookKey);
  const { booknotes: allNotes = [] } = config;
  const booknotes = allNotes.filter((note) => note.type === type && !note.deletedAt);
  const booknoteGroups = {};
  for (const booknote of booknotes) {
    const tocItem = findTocItemBS(toc ?? [], booknote.cfi);
    const href = tocItem?.href || "";
    const label = tocItem?.label || "";
    const id = tocItem?.id || 0;
    if (!booknoteGroups[href]) {
      booknoteGroups[href] = { id, href, label, booknotes: [] };
    }
    booknoteGroups[href].booknotes.push(booknote);
  }
  Object.values(booknoteGroups).forEach((group) => {
    group.booknotes.sort((a, b) => {
      return CFI4.compare(a.cfi, b.cfi);
    });
  });
  const sortedGroups = Object.values(booknoteGroups).sort((a, b) => {
    return a.id - b.id;
  });
  return /* @__PURE__ */ React43__default.createElement("div", { className: "rounded pt-2" }, /* @__PURE__ */ React43__default.createElement("ul", { role: "tree", className: "px-2" }, sortedGroups.map((group) => /* @__PURE__ */ React43__default.createElement("li", { key: group.href, className: "p-2" }, /* @__PURE__ */ React43__default.createElement("h3", { className: "content font-size-base line-clamp-1 font-normal" }, group.label), /* @__PURE__ */ React43__default.createElement("ul", null, group.booknotes.map((item, index) => /* @__PURE__ */ React43__default.createElement(BooknoteItem_default, { key: `${index}-${item.cfi}`, bookKey, item })))))));
};
var BooknoteView_default = BooknoteView;
var TabNavigation = ({ activeTab, onTabChange }) => {
  const _ = useTranslation();
  const tabs = ["toc", "annotations", "bookmarks"];
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8("bottom-tab border-base-300/50 bg-base-200 relative flex w-full border-t"),
      dir: "ltr"
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "bg-base-300 absolute bottom-1.5 start-1 h-[calc(100%-12px)] w-[calc(33.3%-8px)] rounded-lg",
          "transform transition-transform duration-300",
          activeTab === "toc" && "translate-x-0",
          activeTab === "annotations" && "translate-x-[calc(100%+8px)]",
          activeTab === "bookmarks" && "translate-x-[calc(200%+16px)]"
        )
      }
    ),
    tabs.map((tab) => /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        key: tab,
        className: "lg:tooltip lg:tooltip-top z-50 m-1.5 flex-1 cursor-pointer rounded-md p-2",
        "data-tip": tab === "toc" ? _("TOC") : tab === "annotations" ? _("Annotate") : _("Bookmark")
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("flex h-6 items-center"), onClick: () => onTabChange(tab) }, tab === "toc" ? /* @__PURE__ */ React43__default.createElement(IoIosList, { className: "mx-auto" }) : tab === "annotations" ? /* @__PURE__ */ React43__default.createElement(PiNotePencil, { className: "mx-auto" }) : /* @__PURE__ */ React43__default.createElement(MdBookmarkBorder, { className: "mx-auto" }))
    ))
  );
};
var TabNavigation_default = TabNavigation;

// src/app/reader/components/sidebar/Content.tsx
var SidebarContent = ({ bookDoc, sideBarBookKey }) => {
  const { appService } = useEnv();
  const scrollContainerRef = useRef(null);
  const { getConfig, setConfig } = useBookDataStore();
  const config = getConfig(sideBarBookKey);
  const [activeTab, setActiveTab] = useState(config?.viewSettings?.sideBarTab || "toc");
  const [fade, setFade] = useState(false);
  const [targetTab, setTargetTab] = useState(activeTab);
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let scrollTimeout;
    const showScrollbar = () => {
      container.classList.remove("hidden-scrollbar");
    };
    const hideScrollbar = () => {
      container.classList.add("hidden-scrollbar");
    };
    hideScrollbar();
    const handleScroll = () => {
      showScrollbar();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(hideScrollbar, 2e3);
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  useEffect(() => {
    if (!sideBarBookKey) return;
    const config2 = getConfig(sideBarBookKey);
    setActiveTab(config2.viewSettings.sideBarTab);
  }, [sideBarBookKey]);
  const handleTabChange = (tab) => {
    setFade(true);
    const timeout = setTimeout(() => {
      setFade(false);
      setTargetTab(tab);
      setConfig(sideBarBookKey, config2);
      clearTimeout(timeout);
    }, 300);
    setActiveTab(tab);
    const config2 = getConfig(sideBarBookKey);
    config2.viewSettings.sideBarTab = tab;
  };
  return /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "sidebar-content flex min-h-0 flex-grow flex-col shadow-inner",
        "font-sans text-base font-normal sm:text-sm"
      )
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        ref: scrollContainerRef,
        className: clsx8(
          "scroll-container overflow-y-auto transition-opacity duration-300 ease-in-out",
          { "opacity-0": fade, "opacity-100": !fade }
        )
      },
      targetTab === "toc" && bookDoc.toc && /* @__PURE__ */ React43__default.createElement(TOCView_default, { toc: bookDoc.toc, bookKey: sideBarBookKey }),
      targetTab === "annotations" && /* @__PURE__ */ React43__default.createElement(BooknoteView_default, { type: "annotation", toc: bookDoc.toc ?? [], bookKey: sideBarBookKey }),
      targetTab === "bookmarks" && /* @__PURE__ */ React43__default.createElement(BooknoteView_default, { type: "bookmark", toc: bookDoc.toc ?? [], bookKey: sideBarBookKey })
    )
  ), /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "flex-shrink-0",
        appService?.hasSafeAreaInset && "pb-[calc(env(safe-area-inset-bottom)/2)]"
      )
    },
    /* @__PURE__ */ React43__default.createElement(TabNavigation_default, { activeTab, onTabChange: handleTabChange })
  ));
};
var Content_default = SidebarContent;
init_book();
var BookCard = ({ book }) => {
  const { coverImageUrl, title, author } = book;
  const _ = useTranslation();
  const { isDarkMode } = useThemeStore();
  const iconSize18 = useResponsiveSize(18);
  const showBookDetails = () => {
    eventDispatcher.dispatchSync("show-book-details", book);
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: "flex h-20 w-full items-center" }, /* @__PURE__ */ React43__default.createElement(
    Image,
    {
      src: coverImageUrl,
      alt: _("Book Cover"),
      width: 56,
      height: 80,
      className: clsx8(
        "me-4 aspect-auto max-h-16 w-[15%] max-w-12 rounded-sm object-cover shadow-md",
        isDarkMode ? "mix-blend-screen" : "mix-blend-multiply"
      ),
      onError: (e) => {
        e.target.style.display = "none";
      }
    }
  ), /* @__PURE__ */ React43__default.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React43__default.createElement("h4", { className: "line-clamp-2 w-[90%] text-sm font-semibold" }, formatTitle(title)), /* @__PURE__ */ React43__default.createElement("p", { className: "truncate text-xs opacity-75" }, formatAuthors(author))), /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: "btn btn-ghost hover:bg-base-300 h-6 min-h-6 w-6 rounded-full p-0 transition-colors",
      "aria-label": _("More Info")
    },
    /* @__PURE__ */ React43__default.createElement(MdInfoOutline, { size: iconSize18, className: "fill-base-content", onClick: showBookDetails })
  ));
};
var BookCard_default = BookCard;
var useSidebar = (initialWidth, isPinned) => {
  const { settings } = useSettingsStore();
  const {
    sideBarWidth,
    isSideBarVisible,
    isSideBarPinned,
    setSideBarWidth,
    setSideBarVisible,
    setSideBarPin,
    toggleSideBar,
    toggleSideBarPin
  } = useSidebarStore();
  useEffect(() => {
    setSideBarWidth(initialWidth);
    setSideBarPin(isPinned);
    setSideBarVisible(isPinned);
  }, []);
  const handleSideBarResize = (newWidth) => {
    setSideBarWidth(newWidth);
    settings.globalReadSettings.sideBarWidth = newWidth;
  };
  const handleSideBarTogglePin = () => {
    toggleSideBarPin();
    settings.globalReadSettings.isSideBarPinned = !isSideBarPinned;
    if (isSideBarPinned && isSideBarVisible) setSideBarVisible(false);
  };
  return {
    sideBarWidth,
    isSideBarPinned,
    isSideBarVisible,
    handleSideBarResize,
    handleSideBarTogglePin,
    setSideBarVisible,
    toggleSideBar
  };
};
var useSidebar_default = useSidebar;
var Dropdown = ({
  className,
  menuClassName,
  buttonClassName,
  toggleButton,
  children,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };
  const setIsDropdownOpen = (isOpen2) => {
    setIsOpen(isOpen2);
    onToggle?.(isOpen2);
  };
  const childrenWithToggle = isValidElement(children) ? React43__default.cloneElement(children, { setIsDropdownOpen, menuClassName }) : children;
  return /* @__PURE__ */ React43__default.createElement("div", { className: "dropdown-container" }, isOpen && /* @__PURE__ */ React43__default.createElement("div", { className: "fixed inset-0 bg-transparent", onClick: () => setIsDropdownOpen(false) }), /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("dropdown", className) }, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      tabIndex: -1,
      onClick: toggleDropdown,
      className: clsx8("dropdown-toggle", buttonClassName, isOpen && "bg-base-300/50")
    },
    toggleButton
  ), isOpen && childrenWithToggle));
};
var Dropdown_default = Dropdown;
var Option = ({ label, isActive, onClick }) => /* @__PURE__ */ React43__default.createElement(
  "button",
  {
    className: "hover:bg-base-300 flex w-full items-center justify-between rounded-md p-2",
    onClick
  },
  /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${useDefaultIconSize()}px` } }, isActive && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", { className: "ml-2" }, label))
);
var SearchOptions = ({
  searchConfig,
  menuClassName,
  onSearchConfigChanged,
  setIsDropdownOpen
}) => {
  const _ = useTranslation();
  const updateConfig = (key, value) => {
    onSearchConfigChanged({ ...searchConfig, [key]: value });
    setIsDropdownOpen?.(false);
  };
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      tabIndex: 0,
      className: clsx8(
        "book-menu dropdown-content dropdown-center border-base-200 z-20 w-56 border shadow-2xl",
        menuClassName
      )
    },
    /* @__PURE__ */ React43__default.createElement(
      Option,
      {
        label: _("Book"),
        isActive: searchConfig.scope === "book",
        onClick: () => updateConfig("scope", "book")
      }
    ),
    /* @__PURE__ */ React43__default.createElement(
      Option,
      {
        label: _("Chapter"),
        isActive: searchConfig.scope === "section",
        onClick: () => updateConfig("scope", "section")
      }
    ),
    /* @__PURE__ */ React43__default.createElement("hr", { className: "border-base-200 my-1" }),
    /* @__PURE__ */ React43__default.createElement(
      Option,
      {
        label: _("Match Case"),
        isActive: searchConfig.matchCase,
        onClick: () => updateConfig("matchCase", !searchConfig.matchCase)
      }
    ),
    /* @__PURE__ */ React43__default.createElement(
      Option,
      {
        label: _("Match Whole Words"),
        isActive: searchConfig.matchWholeWords,
        onClick: () => updateConfig("matchWholeWords", !searchConfig.matchWholeWords)
      }
    ),
    /* @__PURE__ */ React43__default.createElement(
      Option,
      {
        label: _("Match Diacritics"),
        isActive: searchConfig.matchDiacritics,
        onClick: () => updateConfig("matchDiacritics", !searchConfig.matchDiacritics)
      }
    )
  );
};
var SearchOptions_default = SearchOptions;

// src/app/reader/components/sidebar/SearchBar.tsx
var MINIMUM_SEARCH_TERM_LENGTH_DEFAULT = 2;
var MINIMUM_SEARCH_TERM_LENGTH_CJK = 1;
var SearchBar = ({
  isVisible,
  bookKey,
  searchTerm: term,
  onSearchResultChange
}) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { settings } = useSettingsStore();
  const { getConfig, saveConfig } = useBookDataStore();
  const { getView, getProgress } = useReaderStore();
  const [searchTerm, setSearchTerm] = useState(term);
  const inputRef = useRef(null);
  const view = getView(bookKey);
  const config = getConfig(bookKey);
  const progress = getProgress(bookKey);
  const searchConfig = config.searchConfig;
  const queuedSearchTerm = useRef("");
  const isSearchPending = useRef(false);
  const searchTimeout = useRef(null);
  const iconSize12 = useResponsiveSize(12);
  const iconSize16 = useResponsiveSize(16);
  useEffect(() => {
    handleSearchTermChange(searchTerm);
  }, [bookKey]);
  useEffect(() => {
    setSearchTerm(term);
    handleSearchTermChange(term);
  }, [term]);
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && inputRef.current) {
        inputRef.current.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      if (!isSearchPending.current) {
        handleSearchTermChange(value);
      } else {
        queuedSearchTerm.current = value;
      }
    }, 500);
  };
  const handleSearchConfigChange = (searchConfig2) => {
    config.searchConfig = searchConfig2;
    saveConfig(envConfig, bookKey, config, settings);
    handleSearchTermChange(searchTerm);
  };
  const exceedMinSearchTermLength = (searchTerm2) => {
    const isCJK = /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/.test(searchTerm2);
    const minLength = isCJK ? MINIMUM_SEARCH_TERM_LENGTH_CJK : MINIMUM_SEARCH_TERM_LENGTH_DEFAULT;
    return searchTerm2.length >= minLength;
  };
  const handleSearchTermChange = (term2) => {
    if (exceedMinSearchTermLength(term2)) {
      handleSearch(term2);
    } else {
      resetSearch();
    }
  };
  const handleSearch = async (term2) => {
    console.log("searching for:", term2);
    isSearchPending.current = true;
    const { section } = progress;
    const index = searchConfig.scope === "section" ? section.current : void 0;
    const generator = await view.search({ ...searchConfig, query: term2, index });
    const results = [];
    for await (const result of generator) {
      if (typeof result === "string") {
        if (result === "done") {
          onSearchResultChange([...results]);
          isSearchPending.current = false;
          console.log("search done");
          if (queuedSearchTerm.current !== term2 && exceedMinSearchTermLength(queuedSearchTerm.current)) {
            handleSearch(queuedSearchTerm.current);
          }
        }
      } else {
        if (result.progress) ; else {
          results.push(result);
          onSearchResultChange([...results]);
        }
      }
    }
  };
  const resetSearch = () => {
    onSearchResultChange([]);
    view?.clearSearch();
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: "relative p-2" }, /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-100 flex h-8 items-center rounded-lg" }, /* @__PURE__ */ React43__default.createElement("div", { className: "pl-3" }, /* @__PURE__ */ React43__default.createElement(FaSearch, { size: iconSize16, className: "text-gray-500" })), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      ref: inputRef,
      type: "text",
      value: searchTerm,
      spellCheck: false,
      onChange: handleInputChange,
      placeholder: _("Search..."),
      className: "w-full bg-transparent p-2 font-sans text-sm font-light focus:outline-none"
    }
  ), /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-300 flex h-8 w-8 items-center rounded-r-lg" }, /* @__PURE__ */ React43__default.createElement(
    Dropdown_default,
    {
      className: clsx8(
        window.innerWidth < 640 && "dropdown-end",
        "dropdown-bottom flex justify-center"
      ),
      menuClassName: window.innerWidth < 640 ? "no-triangle mt-1" : "dropdown-center mt-3",
      buttonClassName: "btn btn-ghost h-8 min-h-8 w-8 p-0 rounded-none rounded-r-lg",
      toggleButton: /* @__PURE__ */ React43__default.createElement(FaChevronDown, { size: iconSize12, className: "text-gray-500" })
    },
    /* @__PURE__ */ React43__default.createElement(
      SearchOptions_default,
      {
        searchConfig,
        onSearchConfigChanged: handleSearchConfigChange
      }
    )
  ))));
};
var SearchBar_default = SearchBar;
var SearchResultItem = ({
  bookKey,
  cfi,
  excerpt,
  onSelectResult
}) => {
  const { getProgress } = useReaderStore();
  const progress = getProgress(bookKey);
  const { isCurrent, viewRef } = useScrollToItem_default(cfi, progress);
  return /* @__PURE__ */ React43__default.createElement(
    "li",
    {
      ref: viewRef,
      className: clsx8(
        "my-2 cursor-pointer rounded-lg p-2 text-sm",
        isCurrent ? "bg-base-300 hover:bg-gray-300/70" : "hover:bg-base-300 bg-base-100"
      ),
      onClick: () => onSelectResult(cfi)
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "line-clamp-3" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, excerpt.pre), /* @__PURE__ */ React43__default.createElement("span", { className: "font-semibold" }, excerpt.match), /* @__PURE__ */ React43__default.createElement("span", { className: "" }, excerpt.post))
  );
};
var SearchResults = ({ bookKey, results, onSelectResult }) => {
  return /* @__PURE__ */ React43__default.createElement("div", { className: "search-results overflow-y-auto p-2 font-sans text-sm font-light" }, /* @__PURE__ */ React43__default.createElement("ul", { className: "px-2" }, results.map((result, index) => {
    if ("subitems" in result) {
      return /* @__PURE__ */ React43__default.createElement("ul", { key: `${index}-${result.label}` }, /* @__PURE__ */ React43__default.createElement("h3", { className: "line-clamp-1 font-normal" }, result.label), /* @__PURE__ */ React43__default.createElement("ul", null, result.subitems.map((item, index2) => /* @__PURE__ */ React43__default.createElement(
        SearchResultItem,
        {
          key: `${index2}-${item.cfi}`,
          bookKey,
          cfi: item.cfi,
          excerpt: item.excerpt,
          onSelectResult
        }
      ))));
    } else {
      return /* @__PURE__ */ React43__default.createElement(
        SearchResultItem,
        {
          key: `${index}-${result.cfi}`,
          bookKey,
          cfi: result.cfi,
          excerpt: result.excerpt,
          onSelectResult
        }
      );
    }
  })));
};
var SearchResults_default = SearchResults;

// src/app/reader/components/sidebar/SideBar.tsx
var MIN_SIDEBAR_WIDTH = 0.05;
var MAX_SIDEBAR_WIDTH = 0.45;
var VELOCITY_THRESHOLD2 = 0.5;
var SideBar = ({ onGoToLibrary }) => {
  const { appService } = useEnv();
  const { updateAppTheme } = useThemeStore();
  const { settings } = useSettingsStore();
  const { sideBarBookKey } = useSidebarStore();
  const { getBookData } = useBookDataStore();
  const { getView, getViewSettings } = useReaderStore();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = window.innerWidth < 640;
  const {
    sideBarWidth,
    isSideBarPinned,
    isSideBarVisible,
    setSideBarVisible,
    handleSideBarResize,
    handleSideBarTogglePin
  } = useSidebar_default(
    settings.globalReadSettings.sideBarWidth,
    isMobile ? false : settings.globalReadSettings.isSideBarPinned
  );
  const onSearchEvent = async (event) => {
    const { term } = event.detail;
    setSideBarVisible(true);
    setIsSearchBarVisible(true);
    setSearchTerm(term);
  };
  const onNavigateEvent = async () => {
    const pinButton = document.querySelector(".sidebar-pin-btn");
    const isPinButtonHidden = !pinButton || window.getComputedStyle(pinButton).display === "none";
    if (isPinButtonHidden) {
      setSideBarVisible(false);
    }
  };
  useEffect(() => {
    if (isSideBarVisible) {
      updateAppTheme("base-200");
    } else {
      updateAppTheme("base-100");
    }
  }, [isSideBarVisible]);
  useEffect(() => {
    eventDispatcher.on("search", onSearchEvent);
    eventDispatcher.on("navigate", onNavigateEvent);
    return () => {
      eventDispatcher.off("search", onSearchEvent);
      eventDispatcher.off("navigate", onNavigateEvent);
    };
  }, []);
  const handleVerticalDragMove = (data) => {
    if (!isMobile) return;
    const heightFraction = data.clientY / window.innerHeight;
    const newTop = Math.max(0, Math.min(1, heightFraction));
    const sidebar = document.querySelector(".sidebar-container");
    const overlay = document.querySelector(".overlay");
    if (sidebar && overlay) {
      sidebar.style.top = `${newTop * 100}%`;
      overlay.style.opacity = `${1 - heightFraction}`;
    }
  };
  const handleVerticalDragEnd = (data) => {
    const sidebar = document.querySelector(".sidebar-container");
    const overlay = document.querySelector(".overlay");
    if (!sidebar || !overlay) return;
    if (data.velocity > VELOCITY_THRESHOLD2 || data.velocity >= 0 && data.clientY >= window.innerHeight * 0.5) {
      const transitionDuration = 0.15 / Math.max(data.velocity, 0.5);
      sidebar.style.transition = `top ${transitionDuration}s ease-out`;
      sidebar.style.top = "100%";
      overlay.style.transition = `opacity ${transitionDuration}s ease-out`;
      overlay.style.opacity = "0";
      setTimeout(() => setSideBarVisible(false), 300);
      if (appService?.hasHaptics) {
        impactFeedback("medium");
      }
    } else {
      sidebar.style.transition = "top 0.3s ease-out";
      sidebar.style.top = "0%";
      overlay.style.transition = "opacity 0.3s ease-out";
      overlay.style.opacity = "0.8";
      if (appService?.hasHaptics) {
        impactFeedback("medium");
      }
    }
  };
  const handleHorizontalDragMove = (data) => {
    const widthFraction = data.clientX / window.innerWidth;
    const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, widthFraction));
    handleSideBarResize(`${Math.round(newWidth * 1e4) / 100}%`);
  };
  const { handleDragStart: handleVerticalDragStart } = useDrag(
    handleVerticalDragMove,
    handleVerticalDragEnd
  );
  const { handleDragStart: handleHorizontalDragStart } = useDrag(handleHorizontalDragMove);
  const handleClickOverlay = () => {
    setSideBarVisible(false);
  };
  const handleToggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
    if (isSearchBarVisible) {
      setSearchResults(null);
      setSearchTerm("");
      getView(sideBarBookKey)?.clearSearch();
    }
  };
  useShortcuts_default({ onToggleSearchBar: handleToggleSearchBar }, [sideBarBookKey]);
  const handleSearchResultClick = (cfi) => {
    onNavigateEvent();
    getView(sideBarBookKey)?.goTo(cfi);
  };
  if (!sideBarBookKey) return null;
  const viewSettings = getViewSettings(sideBarBookKey);
  const bookData = getBookData(sideBarBookKey);
  if (!bookData || !bookData.book || !bookData.bookDoc) {
    return null;
  }
  const { book, bookDoc } = bookData;
  const languageDir = getBookDirFromLanguage(bookDoc.metadata.language);
  return isSideBarVisible ? /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "sidebar-container bg-base-200 z-20 flex min-w-60 select-none flex-col",
        appService?.isIOSApp ? "h-[100vh]" : "h-full",
        appService?.hasSafeAreaInset && "pt-[env(safe-area-inset-top)]",
        appService?.hasRoundedWindow && "rounded-window-top-left rounded-window-bottom-left",
        !isSideBarPinned && "shadow-2xl"
      ),
      dir: viewSettings?.rtl && languageDir === "rtl" ? "rtl" : "ltr",
      style: {
        width: `${sideBarWidth}`,
        maxWidth: `${MAX_SIDEBAR_WIDTH * 100}%`,
        position: isSideBarPinned ? "relative" : "absolute"
      }
    },
    /* @__PURE__ */ React43__default.createElement("style", { jsx: true }, `
          @media (max-width: 640px) {
            .sidebar-container {
              width: 100%;
              min-width: 100%;
              border-top-left-radius: 16px;
              border-top-right-radius: 16px;
            }
            .sidebar-container.open {
              top: 0%;
            }
            .overlay {
              transition: opacity 0.3s ease-in-out;
            }
          }
        `),
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex-shrink-0" }, isMobile && /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "drag-handle flex h-10 w-full cursor-row-resize items-center justify-center",
        onMouseDown: handleVerticalDragStart,
        onTouchStart: handleVerticalDragStart
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-content/50 h-1 w-10 rounded-full" })
    ), /* @__PURE__ */ React43__default.createElement(
      Header_default,
      {
        isPinned: isSideBarPinned,
        isSearchBarVisible,
        onGoToLibrary,
        onClose: () => setSideBarVisible(false),
        onTogglePin: handleSideBarTogglePin,
        onToggleSearchBar: handleToggleSearchBar
      }
    ), /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8("search-bar", {
          "search-bar-visible": isSearchBarVisible
        })
      },
      /* @__PURE__ */ React43__default.createElement(
        SearchBar_default,
        {
          isVisible: isSearchBarVisible,
          bookKey: sideBarBookKey,
          searchTerm,
          onSearchResultChange: setSearchResults
        }
      )
    ), /* @__PURE__ */ React43__default.createElement("div", { className: "border-base-300/50 border-b px-3" }, /* @__PURE__ */ React43__default.createElement(BookCard_default, { book }))),
    isSearchBarVisible && searchResults ? /* @__PURE__ */ React43__default.createElement(
      SearchResults_default,
      {
        bookKey: sideBarBookKey,
        results: searchResults,
        onSelectResult: handleSearchResultClick
      }
    ) : /* @__PURE__ */ React43__default.createElement(Content_default, { bookDoc, sideBarBookKey }),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "drag-bar absolute right-0 top-0 h-full w-0.5 cursor-col-resize",
        onMouseDown: handleHorizontalDragStart
      }
    )
  ), !isSideBarPinned && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "overlay fixed inset-0 z-10 bg-black/50 sm:bg-black/20",
      onClick: handleClickOverlay
    }
  )) : null;
};
var SideBar_default = SideBar;
init_misc();
init_book();
var NotebookHeader = ({ isPinned, handleClose: handleClose2, handleTogglePin }) => {
  const _ = useTranslation();
  const iconSize14 = useResponsiveSize(14);
  return /* @__PURE__ */ React43__default.createElement("div", { className: "notebook-header relative flex h-11 items-center px-3", dir: "ltr" }, /* @__PURE__ */ React43__default.createElement("div", { className: "absolute inset-0 flex items-center justify-center space-x-2" }, /* @__PURE__ */ React43__default.createElement(LuNotebookPen, null), /* @__PURE__ */ React43__default.createElement("div", { className: "notebook-title hidden text-sm font-medium sm:flex" }, _("Notebook"))), /* @__PURE__ */ React43__default.createElement("div", { className: "z-10 flex items-center gap-x-4" }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      onClick: handleTogglePin,
      className: clsx8(
        "btn btn-ghost btn-circle hidden h-6 min-h-6 w-6 sm:flex",
        isPinned ? "bg-base-300" : "bg-base-300/65"
      )
    },
    isPinned ? /* @__PURE__ */ React43__default.createElement(MdPushPin, { size: iconSize14 }) : /* @__PURE__ */ React43__default.createElement(MdOutlinePushPin, { size: iconSize14 })
  ), /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      onClick: handleClose2,
      className: "btn btn-ghost btn-circle flex h-6 min-h-6 w-6 hover:bg-transparent sm:hidden"
    },
    /* @__PURE__ */ React43__default.createElement(MdArrowBackIosNew, null)
  ), /* @__PURE__ */ React43__default.createElement("button", { className: "btn btn-ghost left-0 h-8 min-h-8 w-8 p-0" }, /* @__PURE__ */ React43__default.createElement(FiSearch, null))));
};
var Header_default2 = NotebookHeader;
init_md5();
var NoteEditor = ({ onSave, onEdit }) => {
  const _ = useTranslation();
  const {
    notebookNewAnnotation,
    notebookEditAnnotation,
    setNotebookNewAnnotation,
    setNotebookEditAnnotation,
    saveNotebookAnnotationDraft,
    getNotebookAnnotationDraft
  } = useNotebookStore();
  const editorRef = useRef(null);
  const [note, setNote] = React43__default.useState("");
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);
  useEffect(() => {
    if (notebookEditAnnotation) {
      setNote(notebookEditAnnotation.note);
      if (editorRef.current) {
        editorRef.current.value = notebookEditAnnotation.note;
        editorRef.current.focus();
        adjustHeight();
      }
    } else if (notebookNewAnnotation) {
      const noteText = getAnnotationText();
      if (noteText) {
        const draftNote = getNotebookAnnotationDraft(md5Fingerprint(noteText)) || "";
        setNote(draftNote);
        if (editorRef.current) {
          editorRef.current.value = draftNote;
          editorRef.current.focus();
          adjustHeight();
        }
      }
    }
  }, [notebookNewAnnotation, notebookEditAnnotation]);
  const adjustHeight = () => {
    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }
  };
  const getAnnotationText = () => {
    return notebookEditAnnotation?.text || notebookNewAnnotation?.text || "";
  };
  const handleOnChange = (e) => {
    adjustHeight();
    setNote(e.currentTarget.value);
  };
  const handleOnBlur = () => {
    if (editorRef.current && editorRef.current.value) {
      const noteText = getAnnotationText();
      if (noteText) {
        saveNotebookAnnotationDraft(md5Fingerprint(noteText), editorRef.current.value);
      }
    }
  };
  const handleSaveNote = () => {
    if (editorRef.current && notebookNewAnnotation) {
      onSave(notebookNewAnnotation, editorRef.current.value);
    } else if (editorRef.current && notebookEditAnnotation) {
      notebookEditAnnotation.note = editorRef.current.value;
      onEdit(notebookEditAnnotation);
    }
  };
  useShortcuts_default({
    onSaveNote: () => {
      if (editorRef.current && editorRef.current.value) {
        handleSaveNote();
      }
    },
    onCloseNote: () => {
      if (notebookNewAnnotation) {
        setNotebookNewAnnotation(null);
      }
      if (notebookEditAnnotation) {
        setNotebookEditAnnotation(null);
      }
    }
  });
  return /* @__PURE__ */ React43__default.createElement("div", { className: "content note-editor-container bg-base-100 mt-2 rounded-md p-2" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full justify-between space-x-2" }, /* @__PURE__ */ React43__default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React43__default.createElement(
    "textarea",
    {
      className: clsx8(
        "note-editor textarea textarea-ghost min-h-[1em] resize-none !outline-none",
        "inset-0 w-full rounded-none border-0 bg-transparent p-0",
        "content font-size-sm"
      ),
      dir: "auto",
      ref: editorRef,
      value: note,
      rows: 1,
      spellCheck: false,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      placeholder: _("Add your notes here...")
    }
  ))), /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-start pt-2" }, /* @__PURE__ */ React43__default.createElement("div", { className: "mr-2 min-h-full self-stretch border-l-2 border-gray-300" }), /* @__PURE__ */ React43__default.createElement("div", { className: "content font-size-sm line-clamp-3 py-2" }, /* @__PURE__ */ React43__default.createElement("span", { className: "content font-size-xs inline text-gray-500" }, getAnnotationText()))), /* @__PURE__ */ React43__default.createElement("div", { className: "flex justify-end p-2", dir: "ltr" }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: clsx8(
        "content btn btn-ghost font-size-sm hover:bg-transparent",
        "flex h-[1.3em] min-h-[1.3em] items-end p-0",
        editorRef.current && editorRef.current.value ? "" : "btn-disabled !bg-opacity-0"
      ),
      onClick: handleSaveNote
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "font-size-sm pr-1 align-bottom text-blue-500" }, _("Save"))
  )));
};
var NoteEditor_default = NoteEditor;

// src/app/reader/components/notebook/Notebook.tsx
var MIN_NOTEBOOK_WIDTH = 0.15;
var MAX_NOTEBOOK_WIDTH = 0.45;
var Notebook = ({}) => {
  const _ = useTranslation();
  const { updateAppTheme } = useThemeStore();
  const { envConfig, appService } = useEnv();
  const { settings } = useSettingsStore();
  const { sideBarBookKey } = useSidebarStore();
  const { notebookWidth, isNotebookVisible, isNotebookPinned } = useNotebookStore();
  const { notebookNewAnnotation, notebookEditAnnotation, setNotebookPin } = useNotebookStore();
  const { getBookData, getConfig, saveConfig, updateBooknotes } = useBookDataStore();
  const { getView, getViewSettings } = useReaderStore();
  const { setNotebookWidth, setNotebookVisible, toggleNotebookPin } = useNotebookStore();
  const { setNotebookNewAnnotation, setNotebookEditAnnotation } = useNotebookStore();
  const onNavigateEvent = async () => {
    const pinButton = document.querySelector(".sidebar-pin-btn");
    const isPinButtonHidden = !pinButton || window.getComputedStyle(pinButton).display === "none";
    if (isPinButtonHidden) {
      setNotebookVisible(false);
    }
  };
  useEffect(() => {
    if (isNotebookVisible) {
      updateAppTheme("base-200");
    } else {
      updateAppTheme("base-100");
    }
  }, [isNotebookVisible]);
  useEffect(() => {
    setNotebookWidth(settings.globalReadSettings.notebookWidth);
    setNotebookPin(settings.globalReadSettings.isNotebookPinned);
    setNotebookVisible(settings.globalReadSettings.isNotebookPinned);
    eventDispatcher.on("navigate", onNavigateEvent);
    return () => {
      eventDispatcher.off("navigate", onNavigateEvent);
    };
  }, []);
  const handleNotebookResize = (newWidth) => {
    setNotebookWidth(newWidth);
    settings.globalReadSettings.notebookWidth = newWidth;
  };
  const handleTogglePin = () => {
    toggleNotebookPin();
    settings.globalReadSettings.isNotebookPinned = !isNotebookPinned;
  };
  const handleClickOverlay = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNotebookVisible(false);
    setNotebookNewAnnotation(null);
    setNotebookEditAnnotation(null);
  };
  const handleSaveNote = (selection, note) => {
    if (!sideBarBookKey) return;
    const view = getView(sideBarBookKey);
    const config2 = getConfig(sideBarBookKey);
    const cfi = view?.getCFI(selection.index, selection.range);
    if (!cfi) return;
    const { booknotes: annotations = [] } = config2;
    const annotation = {
      id: uniqueId(),
      type: "annotation",
      cfi,
      note,
      text: selection.text,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    annotations.push(annotation);
    const updatedConfig = updateBooknotes(sideBarBookKey, annotations);
    if (updatedConfig) {
      saveConfig(envConfig, sideBarBookKey, updatedConfig, settings);
    }
    setNotebookNewAnnotation(null);
  };
  const handleEditNote = (note, isDelete) => {
    if (!sideBarBookKey) return;
    const config2 = getConfig(sideBarBookKey);
    const { booknotes: annotations = [] } = config2;
    const existingIndex = annotations.findIndex((item) => item.id === note.id);
    if (existingIndex === -1) return;
    if (isDelete) {
      note.deletedAt = Date.now();
    } else {
      note.updatedAt = Date.now();
    }
    annotations[existingIndex] = note;
    const updatedConfig = updateBooknotes(sideBarBookKey, annotations);
    if (updatedConfig) {
      saveConfig(envConfig, sideBarBookKey, updatedConfig, settings);
    }
    setNotebookEditAnnotation(null);
  };
  const onDragMove = (data) => {
    const widthFraction = 1 - data.clientX / window.innerWidth;
    const newWidth = Math.max(MIN_NOTEBOOK_WIDTH, Math.min(MAX_NOTEBOOK_WIDTH, widthFraction));
    handleNotebookResize(`${Math.round(newWidth * 1e4) / 100}%`);
  };
  const { handleDragStart } = useDrag(onDragMove);
  if (!sideBarBookKey) return null;
  const bookData = getBookData(sideBarBookKey);
  const viewSettings = getViewSettings(sideBarBookKey);
  if (!bookData || !bookData.bookDoc) {
    return null;
  }
  const { bookDoc } = bookData;
  const languageDir = getBookDirFromLanguage(bookDoc.metadata.language);
  const config = getConfig(sideBarBookKey);
  const { booknotes: allNotes = [] } = config || {};
  const annotationNotes = allNotes.filter((note) => note.type === "annotation" && note.note && !note.deletedAt).sort((a, b) => b.createdAt - a.createdAt);
  const excerptNotes = allNotes.filter((note) => note.type === "excerpt" && note.text && !note.deletedAt).sort((a, b) => a.createdAt - b.createdAt);
  return isNotebookVisible ? /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, !isNotebookPinned && /* @__PURE__ */ React43__default.createElement("div", { className: "overlay fixed inset-0 z-10 bg-black/20", onClick: handleClickOverlay }), /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "notebook-container bg-base-200 right-0 z-20 min-w-60 select-none",
        "font-sans text-base font-normal sm:text-sm",
        appService?.isIOSApp ? "h-[100vh]" : "h-full",
        appService?.hasSafeAreaInset && "pt-[env(safe-area-inset-top)]",
        appService?.hasRoundedWindow && "rounded-window-top-right rounded-window-bottom-right",
        !isNotebookPinned && "shadow-2xl"
      ),
      dir: viewSettings?.rtl && languageDir === "rtl" ? "rtl" : "ltr",
      style: {
        width: `${notebookWidth}`,
        maxWidth: `${MAX_NOTEBOOK_WIDTH * 100}%`,
        position: isNotebookPinned ? "relative" : "absolute"
      }
    },
    /* @__PURE__ */ React43__default.createElement("style", { jsx: true }, `
          @media (max-width: 640px) {
            .notebook-container {
              width: 100%;
              min-width: 100%;
            }
          }
        `),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "drag-bar absolute left-0 top-0 h-full w-0.5 cursor-col-resize",
        onMouseDown: handleDragStart
      }
    ),
    /* @__PURE__ */ React43__default.createElement(
      Header_default2,
      {
        isPinned: isNotebookPinned,
        handleClose: () => setNotebookVisible(false),
        handleTogglePin
      }
    ),
    /* @__PURE__ */ React43__default.createElement("div", { className: "max-h-[calc(100vh-44px)] overflow-y-auto px-3" }, /* @__PURE__ */ React43__default.createElement("div", { dir: "ltr" }, excerptNotes.length > 0 && /* @__PURE__ */ React43__default.createElement("p", { className: "content font-size-base pt-1" }, _("Excerpts"))), /* @__PURE__ */ React43__default.createElement("ul", { className: "" }, excerptNotes.map((item, index) => /* @__PURE__ */ React43__default.createElement("li", { key: `${index}-${item.id}`, className: "my-2" }, /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        tabIndex: 0,
        className: "collapse-arrow border-base-300 bg-base-100 collapse border"
      },
      /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: "collapse-title font-size-sm h-9 min-h-9 p-2 pe-8 font-medium",
          style: {
            "--top-override": "1.2rem",
            "--end-override": "0.7rem"
          }
        },
        /* @__PURE__ */ React43__default.createElement("p", { className: "line-clamp-1" }, item.text || `Excerpt ${index + 1}`)
      ),
      /* @__PURE__ */ React43__default.createElement("div", { className: "collapse-content font-size-xs select-text px-3 pb-0" }, /* @__PURE__ */ React43__default.createElement("p", { className: "hyphens-auto text-justify" }, item.text), /* @__PURE__ */ React43__default.createElement("div", { className: "flex justify-end", dir: "ltr" }, /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: "font-size-xs cursor-pointer align-bottom text-red-500 hover:text-red-600",
          onClick: handleEditNote.bind(null, item, true)
        },
        _("Delete")
      )))
    )))), /* @__PURE__ */ React43__default.createElement("div", { dir: "ltr" }, (notebookNewAnnotation || annotationNotes.length > 0) && /* @__PURE__ */ React43__default.createElement("p", { className: "content font-size-base pt-1" }, _("Notes"))), (notebookNewAnnotation || notebookEditAnnotation) && /* @__PURE__ */ React43__default.createElement(NoteEditor_default, { onSave: handleSaveNote, onEdit: (item) => handleEditNote(item, false) }), /* @__PURE__ */ React43__default.createElement("ul", null, annotationNotes.map((item, index) => /* @__PURE__ */ React43__default.createElement(BooknoteItem_default, { key: `${index}-${item.cfi}`, bookKey: sideBarBookKey, item }))))
  )) : null;
};
var Notebook_default = Notebook;

// src/app/reader/components/FoliateViewer.tsx
init_document();

// src/types/view.ts
var wrappedFoliateView = (originalView) => {
  const originalAddAnnotation = originalView.addAnnotation.bind(originalView);
  originalView.addAnnotation = (note, remove = false) => {
    const annotation = {
      value: note.cfi,
      ...note
    };
    return originalAddAnnotation(annotation, remove);
  };
  return originalView;
};
var useClickEvent = (bookKey, viewRef, containerRef) => {
  const { appService } = useEnv();
  const { getViewSettings } = useReaderStore();
  const { hoveredBookKey, setHoveredBookKey } = useReaderStore();
  const handleTurnPage = async (msg) => {
    if (msg instanceof MessageEvent) {
      if (msg.data && msg.data.bookKey === bookKey) {
        const viewSettings = getViewSettings(bookKey);
        if (msg.data.type === "iframe-single-click") {
          const viewElement = containerRef.current;
          if (viewElement) {
            const { screenX } = msg.data;
            const viewRect = viewElement.getBoundingClientRect();
            const windowStartX = window.screenX;
            const viewStartX = windowStartX + viewRect.left;
            const viewCenterX = viewStartX + viewRect.width / 2;
            const consumed = eventDispatcher.dispatchSync("iframe-single-click");
            if (!consumed) {
              const centerStartX = viewStartX + viewRect.width * 0.375;
              const centerEndX = viewStartX + viewRect.width * 0.625;
              if (viewSettings.disableClick || screenX >= centerStartX && screenX <= centerEndX) {
                setHoveredBookKey(hoveredBookKey ? null : bookKey);
              } else {
                if (hoveredBookKey) {
                  setHoveredBookKey(null);
                }
                if (!viewSettings.disableClick && screenX >= viewCenterX) {
                  if (viewSettings.swapClickArea) {
                    viewRef.current?.goLeft();
                  } else {
                    viewRef.current?.goRight();
                  }
                } else if (!viewSettings.disableClick && screenX < viewCenterX) {
                  if (viewSettings.swapClickArea) {
                    viewRef.current?.goRight();
                  } else {
                    viewRef.current?.goLeft();
                  }
                }
              }
            }
          }
        } else if (msg.data.type === "iframe-wheel" && !viewSettings.scrolled) {
          const { deltaY } = msg.data;
          if (deltaY > 0) {
            viewRef.current?.next(1);
          } else if (deltaY < 0) {
            viewRef.current?.prev(1);
          }
        } else if (msg.data.type === "iframe-mouseup") {
          if (msg.data.button === 3) {
            viewRef.current?.history.back();
          } else if (msg.data.button === 4) {
            viewRef.current?.history.forward();
          }
        }
      }
    } else {
      const { clientX } = msg;
      const width = window.innerWidth;
      const leftThreshold = width * 0.5;
      const rightThreshold = width * 0.5;
      if (clientX < leftThreshold) {
        viewRef.current?.goLeft();
      } else if (clientX > rightThreshold) {
        viewRef.current?.goRight();
      }
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleTurnPage);
    return () => {
      window.removeEventListener("message", handleTurnPage);
    };
  }, [hoveredBookKey, viewRef]);
  return {
    handleTurnPage
  };
};
var useTouchEvent = (bookKey, viewRef) => {
  const { hoveredBookKey, setHoveredBookKey, getViewSettings } = useReaderStore();
  const viewSettings = getViewSettings(bookKey);
  let touchStart = null;
  let touchEnd = null;
  const onTouchStart = (e) => {
    touchEnd = null;
    const touch = e.targetTouches[0];
    if (!touch) return;
    touchStart = touch;
  };
  const onTouchMove = (e) => {
    if (!touchStart) return;
    const touch = e.targetTouches[0];
    if (touch) {
      touchEnd = touch;
    }
    if (hoveredBookKey && touchEnd) {
      const deltaY = touchEnd.screenY - touchStart.screenY;
      const deltaX = touchEnd.screenX - touchStart.screenX;
      if (!viewSettings.scrolled && !viewSettings.vertical) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          setHoveredBookKey(null);
        }
      } else {
        setHoveredBookKey(null);
      }
    }
  };
  const onTouchEnd = (e) => {
    if (!touchStart) return;
    const touch = e.targetTouches[0];
    if (touch) {
      touchEnd = touch;
    }
    const windowWidth = window.innerWidth;
    if (touchEnd) {
      const deltaY = touchEnd.screenY - touchStart.screenY;
      const deltaX = touchEnd.screenX - touchStart.screenX;
      if (deltaY < -10 && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaX) < windowWidth * 0.3) {
        if (!viewSettings.scrolled && !viewSettings.vertical) {
          setHoveredBookKey(hoveredBookKey ? null : bookKey);
        }
      } else {
        if (hoveredBookKey) {
          setHoveredBookKey(null);
        }
      }
    }
    touchStart = null;
    touchEnd = null;
  };
  const handleTouch = (msg) => {
    if (msg.data && msg.data.bookKey === bookKey) {
      if (msg.data.type === "iframe-touchstart") {
        onTouchStart(msg.data);
      } else if (msg.data.type === "iframe-touchmove") {
        onTouchMove(msg.data);
      } else if (msg.data.type === "iframe-touchend") {
        onTouchEnd(msg.data);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleTouch);
    return () => {
      window.removeEventListener("message", handleTouch);
    };
  }, [hoveredBookKey, viewRef]);
};
var useFoliateEvents = (view, handlers) => {
  const onLoad = handlers?.onLoad;
  const onRelocate = handlers?.onRelocate;
  const onLinkClick = handlers?.onLinkClick;
  const onRendererRelocate = handlers?.onRendererRelocate;
  const onDrawAnnotation = handlers?.onDrawAnnotation;
  const onShowAnnotation = handlers?.onShowAnnotation;
  useEffect(() => {
    if (!view) return;
    if (onLoad) view.addEventListener("load", onLoad);
    if (onRelocate) view.addEventListener("relocate", onRelocate);
    if (onLinkClick) view.addEventListener("link", onLinkClick);
    if (onRendererRelocate) view.renderer.addEventListener("relocate", onRendererRelocate);
    if (onDrawAnnotation) view.addEventListener("draw-annotation", onDrawAnnotation);
    if (onShowAnnotation) view.addEventListener("show-annotation", onShowAnnotation);
    return () => {
      if (onLoad) view.removeEventListener("load", onLoad);
      if (onRelocate) view.removeEventListener("relocate", onRelocate);
      if (onLinkClick) view.removeEventListener("link", onLinkClick);
      if (onRendererRelocate) view.renderer.removeEventListener("relocate", onRendererRelocate);
      if (onDrawAnnotation) view.removeEventListener("draw-annotation", onDrawAnnotation);
      if (onShowAnnotation) view.removeEventListener("show-annotation", onShowAnnotation);
    };
  }, [view]);
};

// src/libs/sync.ts
var SyncClient = class {
  /**
   * Pull incremental changes since a given timestamp (in ms).
   * Returns empty result as authentication is removed.
   */
  async pullChanges(since, type, book) {
    console.log(`Sync pullChanges skipped (no auth) - since: ${since}, type: ${type}, book: ${book}`);
    return {
      books: type === "books" ? [] : null,
      notes: type === "notes" ? [] : null,
      configs: type === "configs" ? [] : null
    };
  }
  /**
   * Push local changes to the server.
   * No-op as authentication is removed.
   */
  async pushChanges(payload) {
    console.log("Sync pushChanges skipped (no auth) - payload:", payload);
    return {
      books: payload.books ? [] : null,
      notes: payload.notes ? [] : null,
      configs: payload.configs ? [] : null
    };
  }
};

// src/context/SyncContext.tsx
var syncClient = new SyncClient();
var SyncContext = createContext({ syncClient });
var SyncProvider = ({ children }) => {
  return /* @__PURE__ */ React43__default.createElement(SyncContext.Provider, { value: { syncClient } }, children);
};
var useSyncContext = () => useContext(SyncContext);

// src/utils/transform.ts
var transformBookConfigFromDB = (dbBookConfig) => {
  const { book_hash, progress, location, search_config, view_settings, updated_at } = dbBookConfig;
  return {
    bookHash: book_hash,
    location,
    progress: progress && JSON.parse(progress),
    searchConfig: search_config && JSON.parse(search_config),
    viewSettings: view_settings && JSON.parse(view_settings),
    updatedAt: new Date(updated_at).getTime()
  };
};
var transformBookFromDB = (dbBook) => {
  const {
    book_hash,
    format,
    title,
    author,
    group_id,
    group_name,
    tags,
    progress,
    created_at,
    updated_at,
    deleted_at,
    uploaded_at
  } = dbBook;
  return {
    hash: book_hash,
    format,
    title,
    author,
    groupId: group_id,
    groupName: group_name,
    tags,
    progress,
    createdAt: new Date(created_at).getTime(),
    updatedAt: new Date(updated_at).getTime(),
    deletedAt: deleted_at ? new Date(deleted_at).getTime() : null,
    uploadedAt: uploaded_at ? new Date(uploaded_at).getTime() : null
  };
};
var transformBookNoteFromDB = (dbBookNote) => {
  const { book_hash, id, type, cfi, text, style, color, note, created_at, updated_at, deleted_at } = dbBookNote;
  return {
    bookHash: book_hash,
    id,
    type,
    cfi,
    text,
    style,
    color,
    note,
    createdAt: new Date(created_at).getTime(),
    updatedAt: new Date(updated_at).getTime(),
    deletedAt: deleted_at ? new Date(deleted_at).getTime() : null
  };
};

// src/hooks/useSync.ts
var transformsFromDB = {
  books: transformBookFromDB,
  notes: transformBookNoteFromDB,
  configs: transformBookConfigFromDB
};
var computeMaxTimestamp = (records) => {
  let maxTime = 0;
  for (const rec of records) {
    if (rec.updated_at) {
      const updatedTime = new Date(rec.updated_at).getTime();
      maxTime = Math.max(maxTime, updatedTime);
    }
    if (rec.deleted_at) {
      const deletedTime = new Date(rec.deleted_at).getTime();
      maxTime = Math.max(maxTime, deletedTime);
    }
  }
  return maxTime;
};
var SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1e3;
function useSync(bookKey) {
  const { settings, setSettings } = useSettingsStore();
  const { getConfig, setConfig } = useBookDataStore();
  const config = bookKey ? getConfig(bookKey) : null;
  const [syncingBooks, setSyncingBooks] = useState(false);
  const [syncingConfigs, setSyncingConfigs] = useState(false);
  const [syncingNotes, setSyncingNotes] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [lastSyncedAtBooks, setLastSyncedAtBooks] = useState(0);
  const [lastSyncedAtConfigs, setLastSyncedAtConfigs] = useState(0);
  const [lastSyncedAtNotes, setLastSyncedAtNotes] = useState(0);
  const lastSyncedAtInited = useRef(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState({
    books: null,
    configs: null,
    notes: null
  });
  const [syncedBooks, setSyncedBooks] = useState(null);
  const [syncedConfigs, setSyncedConfigs] = useState(null);
  const [syncedNotes, setSyncedNotes] = useState(null);
  const { syncClient: syncClient2 } = useSyncContext();
  useEffect(() => {
    if (!settings || !config) return;
    if (lastSyncedAtInited.current) return;
    lastSyncedAtInited.current = true;
    const lastSyncedBooksAt = settings.lastSyncedAtBooks ?? 0;
    const lastSyncedConfigsAt = config?.lastSyncedAtConfig ?? settings.lastSyncedAtConfigs ?? 0;
    const lastSyncedNotesAt = config?.lastSyncedAtNotes ?? settings.lastSyncedAtNotes ?? 0;
    setLastSyncedAtBooks(lastSyncedBooksAt > 0 ? lastSyncedBooksAt - SEVEN_DAYS_IN_MS : 0);
    setLastSyncedAtConfigs(lastSyncedConfigsAt > 0 ? lastSyncedConfigsAt - SEVEN_DAYS_IN_MS : 0);
    setLastSyncedAtNotes(lastSyncedNotesAt > 0 ? lastSyncedNotesAt - SEVEN_DAYS_IN_MS : 0);
  }, [settings, config]);
  const pullChanges = async (type, since, setLastSyncedAt, setSyncing2, bookId) => {
    setSyncing2(true);
    setSyncError(null);
    try {
      const result = await syncClient2.pullChanges(since, type, bookId);
      setSyncResult({ ...syncResult, [type]: result[type] });
      const records = result[type];
      if (!records?.length) return;
      const maxTime = computeMaxTimestamp(records);
      setLastSyncedAt(maxTime);
      const settings2 = useSettingsStore.getState().settings;
      switch (type) {
        case "books":
          settings2.lastSyncedAtBooks = maxTime;
          setSettings(settings2);
          break;
        case "configs":
          if (!bookId) {
            settings2.lastSyncedAtConfigs = maxTime;
            setSettings(settings2);
          } else if (bookKey && config) {
            config.lastSyncedAtConfig = maxTime;
            setConfig(bookKey, config);
          }
          break;
        case "notes":
          if (!bookId) {
            settings2.lastSyncedAtNotes = maxTime;
            setSettings(settings2);
          } else if (bookKey && config) {
            config.lastSyncedAtNotes = maxTime;
            setConfig(bookKey, config);
          }
          break;
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setSyncError(err.message || `Error pulling ${type}`);
      } else {
        setSyncError(`Error pulling ${type}`);
      }
    } finally {
      setSyncing2(false);
    }
  };
  const pushChanges = async (payload) => {
    setSyncing(true);
    setSyncError(null);
    try {
      const result = await syncClient2.pushChanges(payload);
      setSyncResult(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setSyncError(err.message || "Error pushing changes");
      } else {
        setSyncError("Error pushing changes");
      }
    } finally {
      setSyncing(false);
    }
  };
  const syncBooks = async (books, op = "both") => {
    if ((op === "push" || op === "both") && books?.length) {
      await pushChanges({ books });
    }
    if (op === "pull" || op === "both") {
      await pullChanges("books", lastSyncedAtBooks, setLastSyncedAtBooks, setSyncingBooks);
    }
  };
  const syncConfigs = async (bookConfigs, bookId, op = "both") => {
    if ((op === "push" || op === "both") && bookConfigs?.length) {
      await pushChanges({ configs: bookConfigs });
    }
    if (op === "pull" || op === "both") {
      await pullChanges(
        "configs",
        lastSyncedAtConfigs,
        setLastSyncedAtConfigs,
        setSyncingConfigs,
        bookId
      );
    }
  };
  const syncNotes = async (bookNotes, bookId, op = "both") => {
    if ((op === "push" || op === "both") && bookNotes?.length) {
      await pushChanges({ notes: bookNotes });
    }
    if (op === "pull" || op === "both") {
      await pullChanges("notes", lastSyncedAtNotes, setLastSyncedAtNotes, setSyncingNotes, bookId);
    }
  };
  useEffect(() => {
    if (!syncing && syncResult) {
      const { books: dbBooks, configs: dbBookConfigs, notes: dbBookNotes } = syncResult;
      const books = dbBooks?.map(
        (dbBook) => transformsFromDB["books"](dbBook)
      );
      const configs = dbBookConfigs?.map(
        (dbBookConfig) => transformsFromDB["configs"](dbBookConfig)
      );
      const notes = dbBookNotes?.map(
        (dbBookNote) => transformsFromDB["notes"](dbBookNote)
      );
      if (books) setSyncedBooks(books);
      if (configs) setSyncedConfigs(configs);
      if (notes) setSyncedNotes(notes);
    }
  }, [syncResult, syncing]);
  return {
    syncing: syncingBooks || syncingConfigs || syncingNotes,
    syncError,
    syncResult,
    syncedBooks,
    syncedConfigs,
    syncedNotes,
    lastSyncedAtBooks,
    lastSyncedAtNotes,
    lastSyncedAtConfigs,
    pullChanges,
    pushChanges,
    syncBooks,
    syncConfigs,
    syncNotes
  };
}

// src/app/reader/hooks/useProgressSync.ts
init_serializer();
init_document();
init_constants();
var useProgressSync = (bookKey) => {
  const _ = useTranslation();
  const { getConfig, setConfig } = useBookDataStore();
  const { getView, getProgress } = useReaderStore();
  const { settings } = useSettingsStore();
  const { syncedConfigs, syncConfigs } = useSync(bookKey);
  const view = getView(bookKey);
  const config = getConfig(bookKey);
  const progress = getProgress(bookKey);
  const configSynced = useRef(false);
  const firstPulled = useRef(false);
  const pushConfig = (bookKey2, config2) => {
    if (!config2) return;
    const bookHash = bookKey2.split("-")[0];
    const newConfig = { bookHash, ...config2 };
    const compressedConfig = JSON.parse(
      serializeConfig(newConfig, settings.globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG)
    );
    delete compressedConfig.booknotes;
    syncConfigs([compressedConfig], bookHash, "push");
  };
  const pullConfig = (bookKey2) => {
    const bookHash = bookKey2.split("-")[0];
    syncConfigs([], bookHash, "pull");
  };
  const syncConfig = () => {
    if (!configSynced.current) {
      pullConfig(bookKey);
    } else {
      if (config && config.progress && config.progress[0] > 0) {
        pushConfig(bookKey, config);
      }
    }
  };
  const handleSyncBookProgress = (event) => {
    const { bookKey: syncBookKey } = event.detail;
    if (syncBookKey === bookKey) {
      syncConfig();
    }
  };
  useEffect(() => {
    eventDispatcher.on("sync-book-progress", handleSyncBookProgress);
    return () => {
      eventDispatcher.off("sync-book-progress", handleSyncBookProgress);
    };
  }, [bookKey]);
  useEffect(() => {
    if (!progress || firstPulled.current) return;
    firstPulled.current = true;
    pullConfig(bookKey);
    return () => {
      syncConfig();
    };
  }, [progress]);
  const lastProgressSyncTime = useRef(0);
  const syncTimeoutRef = useRef(null);
  useEffect(() => {
    if (!config?.location) return;
    const now = Date.now();
    const timeSinceLastSync = now - lastProgressSyncTime.current;
    if (timeSinceLastSync > SYNC_PROGRESS_INTERVAL_SEC * 1e3) {
      lastProgressSyncTime.current = now;
      syncConfig();
    } else {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(
        () => {
          lastProgressSyncTime.current = Date.now();
          syncTimeoutRef.current = null;
          syncConfig();
        },
        SYNC_PROGRESS_INTERVAL_SEC * 1e3 - timeSinceLastSync
      );
    }
  }, [config]);
  useEffect(() => {
    if (!configSynced.current && syncedConfigs) {
      configSynced.current = true;
      const syncedConfig = syncedConfigs.filter((c) => c.bookHash === bookKey.split("-")[0])[0];
      if (syncedConfig) {
        const configCFI = config?.location;
        const syncedCFI = syncedConfig.location;
        setConfig(bookKey, syncedConfig);
        if (syncedCFI && configCFI) {
          if (CFI.compare(configCFI, syncedCFI) < 0) {
            if (view) {
              view.goTo(syncedCFI);
              eventDispatcher.dispatch("hint", {
                bookKey,
                message: _("Reading Progress Synced")
              });
            }
          }
        }
      }
    }
  }, [syncedConfigs]);
};

// src/utils/throttle.ts
var throttle = (func, delay) => {
  let lastCall = 0;
  let timeout = null;
  let lastArgs = null;
  return (...args) => {
    const now = Date.now();
    const remaining = delay - (now - lastCall);
    const callFunc = () => {
      lastCall = Date.now();
      timeout = null;
      func(...args);
    };
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      callFunc();
    } else {
      lastArgs = args;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          if (lastArgs) {
            func(...lastArgs);
            lastArgs = null;
          }
        }, remaining);
      }
    }
  };
};

// src/app/reader/hooks/useProgressAutoSave.ts
var useProgressAutoSave = (bookKey) => {
  const { envConfig } = useEnv();
  const { getConfig, saveConfig } = useBookDataStore();
  const { getProgress } = useReaderStore();
  const progress = getProgress(bookKey);
  const saveBookConfig = useCallback(
    throttle(async () => {
      const config = getConfig(bookKey);
      const settings = useSettingsStore.getState().settings;
      await saveConfig(envConfig, bookKey, config, settings);
    }, 1e4),
    []
  );
  useEffect(() => {
    saveBookConfig();
  }, [progress, bookKey]);
};

// src/app/reader/components/FoliateViewer.tsx
init_book();
var useUICSS = (bookKey, viewSettings) => {
  const [styleElement, setStyleElement] = useState(null);
  useEffect(() => {
    if (!viewSettings) return;
    if (styleElement) {
      styleElement.remove();
    }
    const rawCSS = viewSettings.userStylesheet || "";
    const newStyleEl = document.createElement("style");
    newStyleEl.textContent = rawCSS.replace("foliate-view", `#foliate-view-${bookKey}`);
    document.head.appendChild(newStyleEl);
    setStyleElement(newStyleEl);
    return () => {
      newStyleEl.remove();
    };
  }, [viewSettings]);
};

// src/app/reader/utils/iframeEventHandlers.ts
init_constants();
init_misc();
var doubleClickEnabled = !DISABLE_DOUBLE_CLICK_ON_MOBILE || !["android", "ios"].includes(getOSPlatform());
var lastClickTime = 0;
var longHoldTimeout = null;
var handleKeydown = (bookKey, event) => {
  if (["Backspace", "ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
  }
  window.postMessage(
    {
      type: "iframe-keydown",
      bookKey,
      key: event.key,
      code: event.code,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey
    },
    "*"
  );
};
var handleMousedown = (bookKey, event) => {
  longHoldTimeout = setTimeout(() => {
    longHoldTimeout = null;
  }, LONG_HOLD_THRESHOLD);
  window.postMessage(
    {
      type: "iframe-mousedown",
      bookKey,
      button: event.button,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY
    },
    "*"
  );
};
var handleMouseup = (bookKey, event) => {
  if ([3, 4].includes(event.button)) {
    event.preventDefault();
  }
  window.postMessage(
    {
      type: "iframe-mouseup",
      bookKey,
      button: event.button,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY
    },
    "*"
  );
};
var handleWheel = (bookKey, event) => {
  window.postMessage(
    {
      type: "iframe-wheel",
      bookKey,
      deltaMode: event.deltaMode,
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      deltaZ: event.deltaZ,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY
    },
    "*"
  );
};
var handleClick = (bookKey, event) => {
  const now = Date.now();
  if (doubleClickEnabled && now - lastClickTime < DOUBLE_CLICK_INTERVAL_THRESHOLD_MS) {
    lastClickTime = now;
    window.postMessage(
      {
        type: "iframe-double-click",
        bookKey,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        offsetX: event.offsetX,
        offsetY: event.offsetY
      },
      "*"
    );
    return;
  }
  lastClickTime = now;
  const postSingleClick = () => {
    let element = event.target;
    while (element) {
      if (["sup", "a", "audio", "video"].includes(element.tagName.toLowerCase())) {
        return;
      }
      if (element.classList.contains("js_readerFooterNote")) {
        eventDispatcher.dispatch("footnote-popup", {
          bookKey,
          element,
          footnote: element.getAttribute("data-wr-footernote") || ""
        });
        return;
      }
      element = element.parentElement;
    }
    if (!longHoldTimeout) {
      return;
    }
    window.postMessage(
      {
        type: "iframe-single-click",
        bookKey,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        offsetX: event.offsetX,
        offsetY: event.offsetY
      },
      "*"
    );
  };
  if (doubleClickEnabled) {
    setTimeout(() => {
      if (Date.now() - lastClickTime >= DOUBLE_CLICK_INTERVAL_THRESHOLD_MS) {
        postSingleClick();
      }
    }, DOUBLE_CLICK_INTERVAL_THRESHOLD_MS);
  } else {
    postSingleClick();
  }
};
var handleTouchEv = (bookKey, event, type) => {
  const touch = event.targetTouches[0];
  const touches = [];
  if (touch) {
    touches.push({
      clientX: touch.clientX,
      clientY: touch.clientY,
      screenX: touch.screenX,
      screenY: touch.screenY
    });
  }
  window.postMessage(
    {
      type,
      bookKey,
      targetTouches: touches
    },
    "*"
  );
};
var handleTouchStart = (bookKey, event) => {
  handleTouchEv(bookKey, event, "iframe-touchstart");
};
var handleTouchMove = (bookKey, event) => {
  handleTouchEv(bookKey, event, "iframe-touchmove");
};
var handleTouchEnd = (bookKey, event) => {
  handleTouchEv(bookKey, event, "iframe-touchend");
};

// src/app/reader/components/FoliateViewer.tsx
init_config();
init_rtl();

// src/services/transformers/translate.ts
var translateTransformer = {
  name: "translate",
  transform: async (ctx) => {
    return ctx.content;
  }
};

// src/services/transformers/punctuation.ts
var punctuationMap = {
  "\u201C": "\uFE43",
  "\u201D": "\uFE44",
  "\u2018": "\uFE41",
  "\u2019": "\uFE42"
};
var punctuationTransformer = {
  name: "punctuation",
  transform: async (ctx) => {
    if (!ctx.content.includes("<html")) return ctx.content;
    const shouldTransform = ctx.viewSettings.vertical === true;
    if (!shouldTransform) return ctx.content;
    let result = ctx.content;
    for (const [original, vertical] of Object.entries(punctuationMap)) {
      result = result.replace(new RegExp(original, "g"), vertical);
    }
    return result;
  }
};

// src/services/transformers/index.ts
var activeTransformers = [
  punctuationTransformer,
  translateTransformer
  // Add more transformers here
];

// src/services/transformService.ts
var transformContent = async (ctx) => {
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

// src/app/reader/components/FoliateViewer.tsx
var FoliateViewer = ({ bookKey, bookDoc, config }) => {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const isViewCreated = useRef(false);
  const { setView: setFoliateView, setProgress } = useReaderStore();
  const { getViewSettings, setViewSettings } = useReaderStore();
  const { themeCode, isDarkMode } = useThemeStore();
  const viewSettings = getViewSettings(bookKey);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setToastMessage(""), 2e3);
    return () => clearTimeout(timer);
  }, [toastMessage]);
  useUICSS(bookKey, viewSettings);
  useProgressSync(bookKey);
  useProgressAutoSave(bookKey);
  const progressRelocateHandler = (event) => {
    const detail = event.detail;
    setProgress(bookKey, detail.cfi, detail.tocItem, detail.section, detail.location, detail.range);
  };
  const docTransformHandler = (event) => {
    const { detail } = event;
    detail.data = Promise.resolve(detail.data).then((data) => {
      const viewSettings2 = getViewSettings(bookKey);
      if (detail.type === "text/css") return transformStylesheet(data);
      if (viewSettings2 && detail.type === "application/xhtml+xml") {
        const ctx = {
          bookKey,
          viewSettings: viewSettings2,
          content: data
        };
        return Promise.resolve(transformContent(ctx));
      }
      return data;
    }).catch((e) => {
      console.error(new Error(`Failed to load ${detail.name}`, { cause: e }));
      return "";
    });
  };
  const docLoadHandler = (event) => {
    const detail = event.detail;
    console.log("doc index loaded:", detail.index);
    if (detail.doc) {
      const writingDir = viewRef.current?.renderer.setStyles && getDirection(detail.doc);
      const viewSettings2 = getViewSettings(bookKey);
      viewSettings2.vertical = writingDir?.vertical || viewSettings2.writingMode.includes("vertical") || false;
      viewSettings2.rtl = writingDir?.rtl || getDirFromUILanguage() === "rtl" || viewSettings2.writingMode.includes("rl") || false;
      setViewSettings(bookKey, { ...viewSettings2 });
      mountAdditionalFonts(detail.doc);
      if (!detail.doc.isEventListenersAdded) {
        detail.doc.isEventListenersAdded = true;
        detail.doc.addEventListener("keydown", handleKeydown.bind(null, bookKey));
        detail.doc.addEventListener("mousedown", handleMousedown.bind(null, bookKey));
        detail.doc.addEventListener("mouseup", handleMouseup.bind(null, bookKey));
        detail.doc.addEventListener("click", handleClick.bind(null, bookKey));
        detail.doc.addEventListener("wheel", handleWheel.bind(null, bookKey));
        detail.doc.addEventListener("touchstart", handleTouchStart.bind(null, bookKey));
        detail.doc.addEventListener("touchmove", handleTouchMove.bind(null, bookKey));
        detail.doc.addEventListener("touchend", handleTouchEnd.bind(null, bookKey));
      }
    }
  };
  const docRelocateHandler = (event) => {
    const detail = event.detail;
    if (detail.reason !== "scroll" && detail.reason !== "page") return;
    if (detail.reason === "scroll") {
      const renderer = viewRef.current?.renderer;
      const viewSettings2 = getViewSettings(bookKey);
      if (renderer && viewSettings2.continuousScroll) {
        if (renderer.start <= 0) {
          viewRef.current?.prev(1);
        } else if (renderer.end + 1 >= renderer.viewSize) {
          viewRef.current?.next(1);
        }
      }
    }
  };
  useTouchEvent(bookKey, viewRef);
  const { handleTurnPage } = useClickEvent(bookKey, viewRef, containerRef);
  useFoliateEvents(viewRef.current, {
    onLoad: docLoadHandler,
    onRelocate: progressRelocateHandler,
    onRendererRelocate: docRelocateHandler
  });
  useEffect(() => {
    if (viewRef.current && viewRef.current.renderer) {
      const viewSettings2 = getViewSettings(bookKey);
      viewRef.current.renderer.setStyles?.(getStyles(viewSettings2));
    }
  }, [themeCode, isDarkMode]);
  useEffect(() => {
    if (isViewCreated.current) return;
    isViewCreated.current = true;
    const openBook = async () => {
      console.log("Opening book", bookKey);
      await import('foliate-js/view.js');
      const view = wrappedFoliateView(document.createElement("foliate-view"));
      view.id = `foliate-view-${bookKey}`;
      document.body.append(view);
      containerRef.current?.appendChild(view);
      const writingMode = viewSettings.writingMode;
      if (writingMode) {
        const settingsDir = getBookDirFromWritingMode(writingMode);
        const languageDir = getBookDirFromLanguage(bookDoc.metadata.language);
        if (settingsDir !== "auto") {
          bookDoc.dir = settingsDir;
        } else if (languageDir !== "auto") {
          bookDoc.dir = languageDir;
        }
      }
      await view.open(bookDoc);
      viewRef.current = view;
      setFoliateView(bookKey, view);
      const { book } = view;
      book.transformTarget?.addEventListener("data", docTransformHandler);
      view.renderer.setStyles?.(getStyles(viewSettings));
      const isScrolled = viewSettings.scrolled;
      const marginPx = viewSettings.marginPx;
      const gapPercent = viewSettings.gapPercent;
      const animated = viewSettings.animated;
      const maxColumnCount = viewSettings.maxColumnCount;
      const maxInlineSize = getMaxInlineSize(viewSettings);
      const maxBlockSize = viewSettings.maxBlockSize;
      if (animated) {
        view.renderer.setAttribute("animated", "");
      } else {
        view.renderer.removeAttribute("animated");
      }
      view.renderer.setAttribute("flow", isScrolled ? "scrolled" : "paginated");
      view.renderer.setAttribute("margin", `${marginPx}px`);
      view.renderer.setAttribute("gap", `${gapPercent}%`);
      view.renderer.setAttribute("max-column-count", maxColumnCount);
      view.renderer.setAttribute("max-inline-size", `${maxInlineSize}px`);
      view.renderer.setAttribute("max-block-size", `${maxBlockSize}px`);
      const lastLocation = config.location;
      if (lastLocation) {
        await view.init({ lastLocation });
      } else {
        await view.goToFraction(0);
      }
    };
    openBook();
  }, []);
  return /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "foliate-viewer h-[100%] w-[100%]",
      onClick: (event) => handleTurnPage(event),
      ref: containerRef
    }
  ));
};
var FoliateViewer_default = FoliateViewer;

// src/utils/grid.ts
var getGridTemplate = (count, aspectRatio) => {
  if (count <= 1) {
    return { columns: "1fr", rows: "1fr" };
  } else if (count === 2) {
    return aspectRatio < 1 ? { columns: "1fr", rows: "1fr 1fr" } : { columns: "1fr 1fr", rows: "1fr" };
  } else if (count === 3 || count === 4) {
    return { columns: "1fr 1fr", rows: "1fr 1fr" };
  } else {
    return { columns: "1fr 1fr 1fr", rows: "1fr 1fr 1fr" };
  }
};
var grid_default = getGridTemplate;
var SectionInfo = ({
  section,
  showDoubleBorder,
  isScrolled,
  isVertical,
  horizontalGap,
  verticalMargin
}) => {
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "sectioninfo absolute flex items-center overflow-hidden",
        isVertical ? "writing-vertical-rl max-h-[85%]" : "top-0 h-[44px]",
        isScrolled && !isVertical && "bg-base-100"
      ),
      style: isVertical ? {
        top: `${verticalMargin * 1.5}px`,
        left: `calc(100% - ${horizontalGap}%)`,
        width: showDoubleBorder ? "32px" : `${horizontalGap}%`,
        height: `calc(100% - ${verticalMargin * 2}px)`
      } : { insetInlineStart: `${horizontalGap}%`, width: `calc(100% - ${horizontalGap * 2}%)` }
    },
    /* @__PURE__ */ React43__default.createElement(
      "h2",
      {
        className: clsx8(
          "text-neutral-content text-center font-sans text-xs font-light",
          isVertical ? "" : "line-clamp-1"
        )
      },
      section || ""
    )
  );
};
var SectionInfo_default = SectionInfo;
var WindowButton = ({ onClick, ariaLabel, id, children }) => /* @__PURE__ */ React43__default.createElement(
  "button",
  {
    id,
    onClick,
    className: "window-button text-base-content/85 hover:text-base-content",
    "aria-label": ariaLabel
  },
  children
);
var WindowButtons = ({
  className,
  headerRef,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  onMinimize,
  onToggleMaximize,
  onClose
}) => {
  const parentRef = useRef(null);
  const { appService } = useEnv();
  useEffect(() => {
    return () => {
    };
  }, []);
  const handleMinimizeClick = async () => {
    if (onMinimize) {
      onMinimize();
    } else {
      handleMinimize();
    }
  };
  const handleMaximizeClick = async () => {
    if (onToggleMaximize) {
      onToggleMaximize();
    } else {
      handleToggleMaximize();
    }
  };
  const handleCloseClick = async () => {
    if (onClose) {
      onClose();
    } else {
      handleClose();
    }
  };
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      ref: parentRef,
      className: clsx8(
        "window-buttons flex h-8 items-center justify-end space-x-2",
        showClose || showMaximize || showMinimize ? "visible" : "hidden",
        className
      )
    },
    showMinimize && appService?.hasWindowBar && /* @__PURE__ */ React43__default.createElement(WindowButton, { onClick: handleMinimizeClick, ariaLabel: "Minimize", id: "titlebar-minimize" }, /* @__PURE__ */ React43__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24" }, /* @__PURE__ */ React43__default.createElement("path", { fill: "currentColor", d: "M20 14H4v-2h16" }))),
    showMaximize && appService?.hasWindowBar && /* @__PURE__ */ React43__default.createElement(WindowButton, { onClick: handleMaximizeClick, ariaLabel: "Maximize/Restore", id: "titlebar-maximize" }, /* @__PURE__ */ React43__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24" }, /* @__PURE__ */ React43__default.createElement("path", { fill: "currentColor", d: "M4 4h16v16H4zm2 4v10h12V8z" }))),
    showClose && (appService?.hasWindowBar || onClose) && /* @__PURE__ */ React43__default.createElement(WindowButton, { onClick: handleCloseClick, ariaLabel: "Close", id: "titlebar-close" }, /* @__PURE__ */ React43__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24" }, /* @__PURE__ */ React43__default.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
      }
    )))
  );
};
var WindowButtons_default = WindowButtons;
var Button = ({
  icon,
  onClick,
  disabled = false,
  tooltip,
  tooltipDirection = "top",
  className
}) => {
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "lg:tooltip z-50 h-8 min-h-8 w-8",
        tooltip && `lg:tooltip-${tooltipDirection}`,
        {
          "tooltip-hidden": !tooltip
        }
      ),
      "data-tip": tooltip
    },
    /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: clsx8(
          "btn btn-ghost h-8 min-h-8 w-8 p-0",
          disabled && "btn-disabled !bg-transparent",
          className
        ),
        onClick: disabled ? void 0 : onClick,
        disabled
      },
      icon
    )
  );
};
var Button_default = Button;

// src/app/reader/components/SidebarToggler.tsx
var SidebarToggler = ({ bookKey }) => {
  const _ = useTranslation();
  const { sideBarBookKey, isSideBarVisible, setSideBarBookKey, toggleSideBar } = useSidebarStore();
  const { setHoveredBookKey } = useReaderStore();
  const handleToggleSidebar = () => {
    if (sideBarBookKey === bookKey) {
      toggleSideBar();
    } else {
      setSideBarBookKey(bookKey);
      if (!isSideBarVisible) toggleSideBar();
    }
    setHoveredBookKey("");
  };
  return /* @__PURE__ */ React43__default.createElement(
    Button_default,
    {
      icon: sideBarBookKey === bookKey && isSideBarVisible ? /* @__PURE__ */ React43__default.createElement(TbLayoutSidebarFilled, { className: "text-base-content" }) : /* @__PURE__ */ React43__default.createElement(TbLayoutSidebar, { className: "text-base-content" }),
      onClick: handleToggleSidebar,
      tooltip: _("Sidebar"),
      tooltipDirection: "bottom"
    }
  );
};
var SidebarToggler_default = SidebarToggler;
init_misc();
init_book();
var BookmarkToggler = ({ bookKey }) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { settings } = useSettingsStore();
  const { getConfig, saveConfig, getBookData, updateBooknotes } = useBookDataStore();
  const { getProgress, setBookmarkRibbonVisibility } = useReaderStore();
  const config = getConfig(bookKey);
  const progress = getProgress(bookKey);
  getBookData(bookKey);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    const { booknotes: bookmarks = [] } = config;
    const { location: cfi, range } = progress;
    if (!cfi) return;
    if (!isBookmarked) {
      setIsBookmarked(true);
      const text = range?.startContainer.textContent?.slice(0, 128) || "";
      const truncatedText = text.length === 128 ? text + "..." : text;
      const bookmark = {
        id: uniqueId(),
        type: "bookmark",
        cfi,
        text: truncatedText ? truncatedText : `${getCurrentPage(progress)}`,
        note: "",
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      const existingBookmark = bookmarks.find(
        (item) => item.type === "bookmark" && item.cfi === cfi
      );
      if (existingBookmark) {
        existingBookmark.deletedAt = null;
        existingBookmark.updatedAt = Date.now();
        existingBookmark.text = bookmark.text;
      } else {
        bookmarks.push(bookmark);
      }
      const updatedConfig = updateBooknotes(bookKey, bookmarks);
      if (updatedConfig) {
        saveConfig(envConfig, bookKey, updatedConfig, settings);
      }
    } else {
      setIsBookmarked(false);
      const start = CFI4.collapse(cfi);
      const end = CFI4.collapse(cfi, true);
      bookmarks.forEach((item) => {
        if (item.type === "bookmark" && CFI4.compare(start, item.cfi) * CFI4.compare(end, item.cfi) <= 0) {
          item.deletedAt = Date.now();
        }
      });
      const updatedConfig = updateBooknotes(bookKey, bookmarks);
      if (updatedConfig) {
        saveConfig(envConfig, bookKey, updatedConfig, settings);
      }
    }
  };
  useEffect(() => {
    const { booknotes = [] } = config || {};
    const { location: cfi } = progress || {};
    if (!cfi) return;
    const start = CFI4.collapse(cfi);
    const end = CFI4.collapse(cfi, true);
    const locationBookmarked = booknotes.filter((booknote) => booknote.type === "bookmark" && !booknote.deletedAt).some((item) => CFI4.compare(start, item.cfi) * CFI4.compare(end, item.cfi) <= 0);
    setIsBookmarked(locationBookmarked);
    setBookmarkRibbonVisibility(bookKey, locationBookmarked);
  }, [config, progress]);
  return /* @__PURE__ */ React43__default.createElement(
    Button_default,
    {
      icon: isBookmarked ? /* @__PURE__ */ React43__default.createElement(MdOutlineBookmark, { className: "text-base-content" }) : /* @__PURE__ */ React43__default.createElement(MdOutlineBookmarkAdd, { className: "text-base-content" }),
      onClick: toggleBookmark,
      tooltip: _("Bookmark"),
      tooltipDirection: "bottom"
    }
  );
};
var BookmarkToggler_default = BookmarkToggler;
var NotebookToggler = ({ bookKey }) => {
  const _ = useTranslation();
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const { isNotebookVisible, toggleNotebook } = useNotebookStore();
  const iconSize16 = useResponsiveSize(16);
  const handleToggleSidebar = () => {
    if (sideBarBookKey === bookKey) {
      toggleNotebook();
    } else {
      setSideBarBookKey(bookKey);
      if (!isNotebookVisible) toggleNotebook();
    }
  };
  return /* @__PURE__ */ React43__default.createElement(
    Button_default,
    {
      icon: sideBarBookKey == bookKey && isNotebookVisible ? /* @__PURE__ */ React43__default.createElement(LuNotebookPen, { size: iconSize16, className: "text-base-content" }) : /* @__PURE__ */ React43__default.createElement(LuNotebookPen, { size: iconSize16, className: "text-base-content" }),
      onClick: handleToggleSidebar,
      tooltip: _("Notebook"),
      tooltipDirection: "bottom"
    }
  );
};
var NotebookToggler_default = NotebookToggler;
var SettingsToggler = () => {
  const _ = useTranslation();
  const { isFontLayoutSettingsDialogOpen, setFontLayoutSettingsDialogOpen } = useSettingsStore();
  const handleToggleSettings = () => {
    setFontLayoutSettingsDialogOpen(!isFontLayoutSettingsDialogOpen);
  };
  return /* @__PURE__ */ React43__default.createElement(
    Button_default,
    {
      icon: /* @__PURE__ */ React43__default.createElement(RiFontSize, { className: "text-base-content" }),
      onClick: handleToggleSettings,
      tooltip: _("Font & Layout"),
      tooltipDirection: "bottom"
    }
  );
};
var SettingsToggler_default = SettingsToggler;

// src/app/reader/components/ViewMenu.tsx
init_constants();
init_config();

// src/app/reader/utils/viewSettingsHelper.ts
var saveViewSettings = async (envConfig, bookKey, key, value, skipGlobal = false, applyStyles = true) => {
  const { settings, isFontLayoutSettingsGlobal, setSettings, saveSettings } = useSettingsStore.getState();
  const { getView, getViewSettings, setViewSettings } = useReaderStore.getState();
  const { getConfig, saveConfig } = useBookDataStore.getState();
  const viewSettings = getViewSettings(bookKey);
  const config = getConfig(bookKey);
  if (viewSettings[key] !== value) {
    viewSettings[key] = value;
    if (applyStyles) {
      const view = getView(bookKey);
      view?.renderer.setStyles?.(getStyles(viewSettings));
    }
  }
  setViewSettings(bookKey, viewSettings);
  if (isFontLayoutSettingsGlobal && !skipGlobal) {
    settings.globalViewSettings[key] = value;
    setSettings(settings);
  }
  await saveConfig(envConfig, bookKey, config, settings);
  await saveSettings(envConfig, settings);
};
var MenuItem = ({
  label,
  labelClass,
  shortcut,
  disabled,
  noIcon = false,
  icon,
  children,
  onClick
}) => {
  const iconSize = useDefaultIconSize();
  const menuButton = /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: clsx8(
        "hover:bg-base-300 text-base-content flex h-10 w-full items-center justify-between rounded-md p-2",
        disabled && "btn-disabled text-gray-400"
      ),
      onClick,
      disabled
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex min-w-0 items-center" }, !noIcon && /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${iconSize}px` } }, icon), /* @__PURE__ */ React43__default.createElement(
      "span",
      {
        className: clsx8("mx-2 flex-1 truncate text-base sm:text-sm", labelClass),
        style: { minWidth: 0 }
      },
      label
    )),
    shortcut && /* @__PURE__ */ React43__default.createElement(
      "kbd",
      {
        className: clsx8(
          "border-base-300/40 bg-base-300/75 text-neutral-content hidden rounded-md border shadow-sm sm:flex",
          "shrink-0 px-1.5 py-0.5 text-xs font-medium"
        )
      },
      shortcut
    )
  );
  if (children) {
    return /* @__PURE__ */ React43__default.createElement("ul", { className: "menu rounded-box m-0 p-0" }, /* @__PURE__ */ React43__default.createElement("li", null, /* @__PURE__ */ React43__default.createElement("details", null, /* @__PURE__ */ React43__default.createElement("summary", { className: "hover:bg-base-300 p-0 pr-3" }, menuButton), children)));
  }
  return menuButton;
};
var MenuItem_default = MenuItem;

// src/app/reader/components/ViewMenu.tsx
var ViewMenu = ({
  bookKey,
  setIsDropdownOpen,
  onSetSettingsDialogOpen
}) => {
  const _ = useTranslation();
  const { envConfig, appService } = useEnv();
  const { getView, getViewSettings, setViewSettings } = useReaderStore();
  const viewSettings = getViewSettings(bookKey);
  const { themeMode, setThemeMode } = useThemeStore();
  const [isScrolledMode, setScrolledMode] = useState(viewSettings.scrolled);
  const [zoomLevel, setZoomLevel] = useState(viewSettings.zoomLevel);
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM_LEVEL));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM_LEVEL));
  const resetZoom = () => setZoomLevel(100);
  const toggleScrolledMode = () => setScrolledMode(!isScrolledMode);
  const openFontLayoutMenu = () => {
    setIsDropdownOpen?.(false);
    onSetSettingsDialogOpen(true);
  };
  const cycleThemeMode = () => {
    const nextMode = themeMode === "auto" ? "light" : themeMode === "light" ? "dark" : "auto";
    setThemeMode(nextMode);
  };
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    }
    setIsDropdownOpen?.(false);
  };
  useEffect(() => {
    if (isScrolledMode === viewSettings.scrolled) return;
    viewSettings.scrolled = isScrolledMode;
    getView(bookKey)?.renderer.setAttribute("flow", isScrolledMode ? "scrolled" : "paginated");
    getView(bookKey)?.renderer.setAttribute(
      "max-inline-size",
      `${getMaxInlineSize(viewSettings)}px`
    );
    getView(bookKey)?.renderer.setStyles?.(getStyles(viewSettings));
    setViewSettings(bookKey, viewSettings);
  }, [isScrolledMode]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "zoomLevel", zoomLevel, true, true);
  }, [zoomLevel]);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      tabIndex: 0,
      className: "view-menu dropdown-content bgcolor-base-200 dropdown-right no-triangle border-base-200 z-20 mt-1 w-72 border shadow-2xl"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("flex items-center justify-between rounded-md") }, /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: zoomOut,
        className: clsx8(
          "hover:bg-base-300 text-base-content rounded-full p-2",
          zoomLevel <= MIN_ZOOM_LEVEL && "btn-disabled text-gray-400"
        )
      },
      /* @__PURE__ */ React43__default.createElement(MdZoomOut, null)
    ), /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: clsx8(
          "hover:bg-base-300 text-base-content h-8 min-h-8 w-[50%] rounded-md p-1 text-center"
        ),
        onClick: resetZoom
      },
      zoomLevel,
      "%"
    ), /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: zoomIn,
        className: clsx8(
          "hover:bg-base-300 text-base-content rounded-full p-2",
          zoomLevel >= MAX_ZOOM_LEVEL && "btn-disabled text-gray-400"
        )
      },
      /* @__PURE__ */ React43__default.createElement(MdZoomIn, null)
    )),
    /* @__PURE__ */ React43__default.createElement("hr", { className: "border-base-300 my-1" }),
    /* @__PURE__ */ React43__default.createElement(MenuItem_default, { label: _("Font & Layout"), shortcut: "Shift+F", onClick: openFontLayoutMenu }),
    /* @__PURE__ */ React43__default.createElement(
      MenuItem_default,
      {
        label: _("Scrolled Mode"),
        shortcut: "Shift+J",
        icon: isScrolledMode ? /* @__PURE__ */ React43__default.createElement(MdCheck, null) : void 0,
        onClick: toggleScrolledMode
      }
    ),
    /* @__PURE__ */ React43__default.createElement("hr", { className: "border-base-300 my-1" }),
    appService?.hasWindow && /* @__PURE__ */ React43__default.createElement(MenuItem_default, { label: _("Fullscreen"), onClick: handleFullScreen }),
    /* @__PURE__ */ React43__default.createElement(
      MenuItem_default,
      {
        label: themeMode === "dark" ? _("Dark Mode") : themeMode === "light" ? _("Light Mode") : _("Auto Mode"),
        icon: themeMode === "dark" ? /* @__PURE__ */ React43__default.createElement(BiMoon, null) : themeMode === "light" ? /* @__PURE__ */ React43__default.createElement(BiSun, null) : /* @__PURE__ */ React43__default.createElement(TbSunMoon, null),
        onClick: cycleThemeMode
      }
    )
  );
};
var ViewMenu_default = ViewMenu;

// src/app/reader/components/HeaderBar.tsx
var HeaderBar = ({
  bookKey,
  bookTitle,
  isTopLeft,
  isHoveredAnim,
  onCloseBook,
  onSetSettingsDialogOpen
}) => {
  const { appService } = useEnv();
  const headerRef = useRef(null);
  const {
    isTrafficLightVisible,
    setTrafficLightVisibility,
    initializeTrafficLightStore,
    initializeTrafficLightListeners,
    cleanupTrafficLightListeners
  } = useTrafficLightStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { hoveredBookKey, setHoveredBookKey, bookKeys } = useReaderStore();
  const { isSideBarVisible } = useSidebarStore();
  const iconSize16 = useResponsiveSize(16);
  const handleToggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
    if (!isOpen) setHoveredBookKey("");
  };
  useEffect(() => {
    if (!appService?.hasTrafficLight) return;
    initializeTrafficLightStore(appService);
    initializeTrafficLightListeners();
    setTrafficLightVisibility(true);
    return () => {
      cleanupTrafficLightListeners();
    };
  }, []);
  useEffect(() => {
    if (!appService?.hasTrafficLight) return;
    setTrafficLightVisibility(isSideBarVisible);
  }, [isSideBarVisible]);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      ref: headerRef,
      className: clsx8(
        `header-bar absolute top-0 z-10 flex h-11 w-full items-center pr-4`,
        isTrafficLightVisible && isTopLeft && !isSideBarVisible ? "pl-16" : "pl-4",
        `shadow-xs bg-base-100 transition-opacity duration-300`,
        appService?.hasRoundedWindow && "rounded-window-top-right",
        !isSideBarVisible && appService?.hasRoundedWindow && "rounded-window-top-left",
        isHoveredAnim && "hover-bar-anim",
        hoveredBookKey === bookKey || isDropdownOpen ? `visible` : `opacity-0`,
        isDropdownOpen && "header-bar-pinned"
      ),
      onMouseEnter: () => setHoveredBookKey(bookKey),
      onMouseLeave: () => setHoveredBookKey("")
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "sidebar-bookmark-toggler bg-base-100 z-20 flex h-full items-center gap-x-4" }, /* @__PURE__ */ React43__default.createElement("div", { className: "hidden sm:flex" }, /* @__PURE__ */ React43__default.createElement(SidebarToggler_default, { bookKey })), /* @__PURE__ */ React43__default.createElement(BookmarkToggler_default, { bookKey })),
    /* @__PURE__ */ React43__default.createElement("div", { className: "header-title z-15 pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "line-clamp-1 max-w-[50%] text-center text-xs font-semibold" }, bookTitle)),
    /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-100 z-20 ml-auto flex h-full items-center space-x-4" }, /* @__PURE__ */ React43__default.createElement(SettingsToggler_default, null), /* @__PURE__ */ React43__default.createElement(NotebookToggler_default, { bookKey }), /* @__PURE__ */ React43__default.createElement(
      Dropdown_default,
      {
        className: "exclude-title-bar-mousedown dropdown-bottom dropdown-end",
        buttonClassName: "btn btn-ghost h-8 min-h-8 w-8 p-0",
        toggleButton: /* @__PURE__ */ React43__default.createElement(PiDotsThreeVerticalBold, { size: iconSize16 }),
        onToggle: handleToggleDropdown
      },
      /* @__PURE__ */ React43__default.createElement(ViewMenu_default, { bookKey, onSetSettingsDialogOpen })
    ), /* @__PURE__ */ React43__default.createElement(
      WindowButtons_default,
      {
        className: "window-buttons flex h-full items-center",
        headerRef,
        showMinimize: bookKeys.length == 1 && !isTrafficLightVisible && appService?.appPlatform !== "web",
        showMaximize: bookKeys.length == 1 && !isTrafficLightVisible && appService?.appPlatform !== "web",
        onClose: () => onCloseBook(bookKey)
      }
    ))
  );
};
var HeaderBar_default = HeaderBar;
var Slider = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  heightPx = 40,
  minLabel = "",
  maxLabel = "",
  bubbleElement,
  bubbleLabel = "",
  className = "",
  minClassName = "",
  maxClassName = "",
  bubbleClassName = "",
  onChange
}) => {
  const safeInitialValue = isNaN(initialValue) ? 50 : initialValue;
  const [value, setValue] = useState(safeInitialValue);
  const [isRtl, setIsRtl] = useState(false);
  const sliderRef = useRef(null);
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };
  useEffect(() => {
    let node = sliderRef.current;
    while (node) {
      if (node.getAttribute("dir") === "rtl") {
        setIsRtl(true);
        break;
      }
      node = node.parentElement;
    }
  }, []);
  useEffect(() => {
    if (!isNaN(initialValue)) {
      setValue(initialValue);
    }
  }, [initialValue]);
  const safeValue = isNaN(value) ? min : value;
  const percentage = (safeValue - min) / (max - min) * 100;
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      ref: sliderRef,
      className: `slider bg-base-200 mx-auto w-full max-w-md rounded-xl ${className}`,
      dir: isRtl ? "rtl" : void 0
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "relative", style: { height: `${heightPx}px` } }, /* @__PURE__ */ React43__default.createElement("div", { className: "bg-base-300/40 absolute h-full w-full rounded-full" }), /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "bg-base-300 absolute h-full rounded-full",
        style: {
          width: percentage > 0 ? `calc(${percentage}% + ${heightPx / 2}px)` : "0px",
          [isRtl ? "right" : "left"]: 0
        }
      }
    ), /* @__PURE__ */ React43__default.createElement("div", { className: "absolute inset-0 flex items-center justify-between px-4 text-sm" }, /* @__PURE__ */ React43__default.createElement("span", { className: `ml-2 ${minClassName}` }, minLabel), /* @__PURE__ */ React43__default.createElement("span", { className: `mr-2 ${maxClassName}` }, maxLabel)), /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "pointer-events-none absolute top-0 z-10",
        style: {
          [isRtl ? "right" : "left"]: `max(${heightPx / 2}px, calc(${percentage}%))`,
          transform: isRtl ? "translateX(calc(50%))" : "translateX(calc(-50%))",
          height: "100%"
        }
      },
      /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: `bg-base-200 flex h-full items-center justify-center rounded-full text-sm shadow-md ${bubbleClassName}`,
          style: { width: `${heightPx}px` }
        },
        bubbleElement || bubbleLabel
      )
    ), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value: isNaN(value) ? min : value,
        className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
        onChange: handleChange
      }
    ))
  );
};
var Slider_default = Slider;

// src/app/reader/components/FooterBar.tsx
var FooterBar = ({
  bookKey,
  bookFormat,
  section,
  pageinfo,
  isHoveredAnim
}) => {
  const _ = useTranslation();
  const { envConfig, appService } = useEnv();
  const { hoveredBookKey, setHoveredBookKey, getView, getProgress, getViewSettings } = useReaderStore();
  const { isSideBarVisible, setSideBarVisible } = useSidebarStore();
  const [actionTab, setActionTab] = React43__default.useState("");
  const sliderHeight = useResponsiveSize(28);
  const tocIconSize = useResponsiveSize(23);
  const fontIconSize = useResponsiveSize(18);
  const marginIconSize = useResponsiveSize(20);
  const view = getView(bookKey);
  const progress = getProgress(bookKey);
  const viewSettings = getViewSettings(bookKey);
  const handleProgressChange = (value) => {
    view?.goToFraction(value / 100);
  };
  const handleFontSizeChange = (value) => {
    saveViewSettings(envConfig, bookKey, "defaultFontSize", value);
  };
  const handleMarginChange = (value) => {
    const marginPx = Math.round(value / 100 * 88);
    const gapPercent = Math.round(value / 100 * 10);
    saveViewSettings(envConfig, bookKey, "marginPx", marginPx, false, false);
    saveViewSettings(envConfig, bookKey, "gapPercent", gapPercent, false, false);
    view?.renderer.setAttribute("margin", `${marginPx}px`);
    view?.renderer.setAttribute("gap", `${gapPercent}%`);
    if (viewSettings?.scrolled) {
      view?.renderer.setAttribute("flow", "scrolled");
    }
  };
  const handleLineHeightChange = (value) => {
    saveViewSettings(envConfig, bookKey, "lineHeight", value / 10);
  };
  const handleGoPrev = () => {
    view?.goLeft();
  };
  const handleGoNext = () => {
    view?.goRight();
  };
  const handleGoBack = () => {
    view?.history.back();
  };
  const handleGoForward = () => {
    view?.history.forward();
  };
  const handleSpeakText = async () => {
    if (!view || !progress) return;
    const { range } = progress;
    if (eventDispatcher.dispatchSync("tts-is-speaking")) {
      eventDispatcher.dispatch("tts-stop", { bookKey });
    } else {
      eventDispatcher.dispatch("tts-speak", { bookKey, range });
    }
  };
  const handleSetActionTab = (tab) => {
    console.log("handleSetActionTab", tab);
    setActionTab(actionTab === tab ? "" : tab);
    if (tab === "tts") {
      setHoveredBookKey("");
      handleSpeakText();
    } else if (tab === "toc") {
      setHoveredBookKey("");
      if (viewSettings) {
        viewSettings.sideBarTab = "toc";
      }
      setSideBarVisible(true);
    } else if (tab === "note") {
      setHoveredBookKey("");
      setSideBarVisible(true);
      if (viewSettings) {
        viewSettings.sideBarTab = "annotations";
      }
    }
  };
  const getMarginProgressValue = (marginPx, gapPercent) => {
    return (marginPx / 88 + gapPercent / 10) * 50;
  };
  const isVisible = hoveredBookKey === bookKey;
  const progressInfo = ["CBZ"].includes(bookFormat) ? section : pageinfo;
  const progressValid = !!progressInfo;
  const progressFraction = progressValid ? ((progressInfo.next ?? progressInfo.current) + 1) / progressInfo.total : 0;
  return /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "absolute bottom-0 left-0 z-10 hidden w-full sm:flex sm:h-[52px]",
        // show scroll bar when vertical and scrolled in desktop
        viewSettings?.vertical && viewSettings?.scrolled && "sm:!bottom-3 sm:!h-7"
      ),
      onMouseEnter: () => !appService?.isMobile && setHoveredBookKey(bookKey),
      onTouchStart: () => !appService?.isMobile && setHoveredBookKey(bookKey)
    }
  ), /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "footer-bar shadow-xs absolute bottom-0 z-50 flex w-full flex-col",
        "sm:h-[52px] sm:justify-center",
        "sm:bg-base-100 border-base-300/50 border sm:border-none",
        "transition-[opacity,transform] duration-300",
        appService?.hasRoundedWindow && "rounded-window-bottom-right",
        !isSideBarVisible && appService?.hasRoundedWindow && "rounded-window-bottom-left",
        isHoveredAnim && "hover-bar-anim",
        // show scroll bar when vertical and scrolled in desktop
        viewSettings?.vertical && viewSettings?.scrolled && "sm:!bottom-3 sm:!h-7",
        isVisible ? `pointer-events-auto translate-y-0 opacity-100` : `pointer-events-none translate-y-full opacity-0 sm:translate-y-0`
      ),
      dir: viewSettings?.rtl ? "rtl" : "ltr",
      onMouseLeave: () => window.innerWidth >= 640 && setHoveredBookKey(""),
      "aria-hidden": !isVisible
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "bg-base-200 absolute bottom-16 flex w-full items-center gap-x-2 px-4 transition-all sm:hidden",
          actionTab === "progress" ? "pointer-events-auto translate-y-0 pb-4 pt-8 ease-out" : "pointer-events-none invisible translate-y-full overflow-hidden pb-0 pt-0 ease-in"
        ),
        style: {
          bottom: appService?.hasSafeAreaInset ? "calc(env(safe-area-inset-bottom) + 64px)" : "64px"
        }
      },
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowRightWideLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowLeftWideLine, null),
          onClick: viewSettings?.rtl ? handleGoNext : handleGoPrev,
          tooltip: viewSettings?.rtl ? _("Go Right") : _("Go Left")
        }
      ),
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowGoForwardLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowGoBackLine, null),
          onClick: handleGoBack,
          tooltip: _("Go Back"),
          disabled: !view?.history.canGoBack
        }
      ),
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowGoBackLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowGoForwardLine, null),
          onClick: handleGoForward,
          tooltip: _("Go Forward"),
          disabled: !view?.history.canGoForward
        }
      ),
      /* @__PURE__ */ React43__default.createElement(
        Slider_default,
        {
          heightPx: sliderHeight,
          bubbleLabel: `${Math.round(progressFraction * 100)}%`,
          initialValue: progressValid && !isNaN(progressFraction) ? Math.round(progressFraction * 100) : 0,
          onChange: (e) => handleProgressChange(e)
        }
      ),
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowLeftWideLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowRightWideLine, null),
          onClick: viewSettings?.rtl ? handleGoPrev : handleGoNext,
          tooltip: viewSettings?.rtl ? _("Go Left") : _("Go Right")
        }
      )
    ),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "bg-base-200 absolute flex w-full flex-col items-center gap-y-8 px-4 transition-all sm:hidden",
          actionTab === "font" ? "pointer-events-auto translate-y-0 pb-4 pt-8 ease-out" : "pointer-events-none invisible translate-y-full overflow-hidden pb-0 pt-0 ease-in"
        ),
        style: {
          bottom: appService?.hasSafeAreaInset ? "calc(env(safe-area-inset-bottom) + 64px)" : "64px"
        }
      },
      /* @__PURE__ */ React43__default.createElement(
        Slider_default,
        {
          initialValue: viewSettings?.defaultFontSize && !isNaN(viewSettings.defaultFontSize) ? viewSettings.defaultFontSize : 16,
          bubbleLabel: `${viewSettings?.defaultFontSize && !isNaN(viewSettings.defaultFontSize) ? viewSettings.defaultFontSize : 16}`,
          minLabel: "A",
          maxLabel: "A",
          minClassName: "text-xs",
          maxClassName: "text-base",
          onChange: handleFontSizeChange,
          min: 8,
          max: 30
        }
      ),
      /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full items-center justify-between gap-x-6" }, /* @__PURE__ */ React43__default.createElement(
        Slider_default,
        {
          initialValue: !isNaN(getMarginProgressValue(
            viewSettings?.marginPx ?? 44,
            viewSettings?.gapPercent ?? 5
          )) ? getMarginProgressValue(
            viewSettings?.marginPx ?? 44,
            viewSettings?.gapPercent ?? 5
          ) : 50,
          bubbleElement: /* @__PURE__ */ React43__default.createElement(TbBoxMargin, { size: marginIconSize }),
          minLabel: _("Small"),
          maxLabel: _("Large"),
          step: 10,
          onChange: handleMarginChange
        }
      ), /* @__PURE__ */ React43__default.createElement(
        Slider_default,
        {
          initialValue: viewSettings?.lineHeight && !isNaN(viewSettings.lineHeight) ? Math.round(viewSettings.lineHeight * 10) : 16,
          bubbleElement: /* @__PURE__ */ React43__default.createElement(RxLineHeight, { size: marginIconSize }),
          minLabel: _("Small"),
          maxLabel: _("Large"),
          min: 8,
          max: 24,
          onChange: handleLineHeightChange
        }
      ))
    ),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "bg-base-200 z-50 mt-auto flex w-full justify-between px-8 py-4 sm:hidden",
          appService?.hasSafeAreaInset && "pb-[calc(env(safe-area-inset-bottom)+16px)]"
        )
      },
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: /* @__PURE__ */ React43__default.createElement(IoIosList, { size: tocIconSize, className: "" }),
          onClick: () => handleSetActionTab("toc")
        }
      ),
      /* @__PURE__ */ React43__default.createElement(Button_default, { icon: /* @__PURE__ */ React43__default.createElement(PiNotePencil, { className: "" }), onClick: () => handleSetActionTab("note") }),
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: /* @__PURE__ */ React43__default.createElement(RxSlider, { className: clsx8(actionTab === "progress" && "text-blue-500") }),
          onClick: () => handleSetActionTab("progress")
        }
      ),
      /* @__PURE__ */ React43__default.createElement(
        Button_default,
        {
          icon: /* @__PURE__ */ React43__default.createElement(
            RiFontFamily,
            {
              size: fontIconSize,
              className: clsx8(actionTab === "font" && "text-blue-500")
            }
          ),
          onClick: () => handleSetActionTab("font")
        }
      ),
      /* @__PURE__ */ React43__default.createElement(Button_default, { icon: /* @__PURE__ */ React43__default.createElement(MdOutlineHeadphones, { className: "" }), onClick: () => handleSetActionTab("tts") })
    ),
    /* @__PURE__ */ React43__default.createElement("div", { className: "hidden w-full items-center gap-x-4 px-4 sm:flex" }, /* @__PURE__ */ React43__default.createElement(
      Button_default,
      {
        icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowRightWideLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowLeftWideLine, null),
        onClick: viewSettings?.rtl ? handleGoNext : handleGoPrev,
        tooltip: viewSettings?.rtl ? _("Go Right") : _("Go Left")
      }
    ), /* @__PURE__ */ React43__default.createElement(
      Button_default,
      {
        icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowGoForwardLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowGoBackLine, null),
        onClick: handleGoBack,
        tooltip: _("Go Back"),
        disabled: !view?.history.canGoBack
      }
    ), /* @__PURE__ */ React43__default.createElement(
      Button_default,
      {
        icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowGoBackLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowGoForwardLine, null),
        onClick: handleGoForward,
        tooltip: _("Go Forward"),
        disabled: !view?.history.canGoForward
      }
    ), /* @__PURE__ */ React43__default.createElement("span", { className: "mx-2 text-center text-sm" }, progressValid ? `${Math.round(progressFraction * 100)}%` : ""), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "range",
        className: "text-base-content mx-2 w-full",
        min: 0,
        max: 100,
        value: progressValid && !isNaN(progressFraction) ? Math.round(progressFraction * 100) : 0,
        onChange: (e) => handleProgressChange(parseInt(e.target.value, 10))
      }
    ), /* @__PURE__ */ React43__default.createElement(Button_default, { icon: /* @__PURE__ */ React43__default.createElement(FaHeadphones, null), onClick: handleSpeakText, tooltip: _("Speak") }), /* @__PURE__ */ React43__default.createElement(
      Button_default,
      {
        icon: viewSettings?.rtl ? /* @__PURE__ */ React43__default.createElement(RiArrowLeftWideLine, null) : /* @__PURE__ */ React43__default.createElement(RiArrowRightWideLine, null),
        onClick: viewSettings?.rtl ? handleGoPrev : handleGoNext,
        tooltip: viewSettings?.rtl ? _("Go Left") : _("Go Right")
      }
    ))
  ));
};
var FooterBar_default = FooterBar;
var PageInfoView = ({
  bookFormat,
  section,
  pageinfo,
  showDoubleBorder,
  isScrolled,
  isVertical,
  horizontalGap,
  verticalMargin
}) => {
  const _ = useTranslation();
  const { appService } = useEnv();
  const isFixedPage = ["CBZ"].includes(bookFormat);
  const pageInfo = isFixedPage ? section ? isVertical ? `${section.current + 1} \xB7 ${section.total}` : `${section.current + 1} / ${section.total}` : "" : pageinfo ? _(isVertical ? "{{currentPage}} \xB7 {{totalPage}}" : "Loc. {{currentPage}} / {{totalPage}}", {
    currentPage: (pageinfo.next ?? pageinfo.current) + 1,
    totalPage: pageinfo.total
  }) : "";
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "pageinfo absolute bottom-0 flex items-center justify-end",
        isVertical ? "writing-vertical-rl" : "h-12 w-full",
        isScrolled && !isVertical && "bg-base-100"
      ),
      style: isVertical ? {
        bottom: `${verticalMargin * 1.5}px`,
        left: showDoubleBorder ? `calc(${horizontalGap}% - 32px)` : 0,
        width: showDoubleBorder ? "32px" : `${horizontalGap}%`,
        height: `calc(100% - ${verticalMargin * 2}px)`
      } : {
        insetInlineEnd: `${horizontalGap}%`,
        paddingBottom: appService?.hasSafeAreaInset ? "env(safe-area-inset-bottom)" : 0
      }
    },
    /* @__PURE__ */ React43__default.createElement("h2", { className: "text-neutral-content text-right font-sans text-xs font-extralight" }, pageInfo)
  );
};
var PageInfo_default = PageInfoView;
var Ribbon = ({}) => {
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "fixed inset-0 z-10 flex w-8 justify-center sm:w-6",
        "h-[calc(env(safe-area-inset-top)+44px)]"
      )
    },
    /* @__PURE__ */ React43__default.createElement(
      "svg",
      {
        width: "100%",
        height: "100%",
        preserveAspectRatio: "none",
        viewBox: "0 0 100 100",
        xmlns: "http://www.w3.org/2000/svg",
        shapeRendering: "geometricPrecision",
        imageRendering: "optimizeQuality"
      },
      /* @__PURE__ */ React43__default.createElement("polygon", { fill: "#F44336", points: "100 100, 50 78, 0 100, 0 0, 100 0" })
    )
  );
};
var Ribbon_default = Ribbon;
init_rtl();

// src/app/reader/components/settings/FontPanel.tsx
init_constants();
init_misc();
var NumberInput = ({
  className,
  label,
  value,
  onChange,
  min,
  max,
  step,
  disabled
}) => {
  const [localValue, setLocalValue] = useState(value);
  const numberStep = step || 1;
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleChange = (e) => {
    const value2 = e.target.value;
    if (value2 === "" || /^[1-9]\d*\.?\d*$|^0?\.?\d*$/.test(value2)) {
      const newValue = value2 === "" ? 0 : parseFloat(value2);
      setLocalValue(newValue);
      if (!isNaN(newValue)) {
        const roundedValue = Math.round(newValue * 10) / 10;
        onChange(Math.max(min, Math.min(max, roundedValue)));
      }
    }
  };
  const increment = () => {
    const newValue = Math.min(max, localValue + numberStep);
    const roundedValue = Math.round(newValue * 10) / 10;
    setLocalValue(roundedValue);
    onChange(roundedValue);
  };
  const decrement = () => {
    const newValue = Math.max(min, localValue - numberStep);
    const roundedValue = Math.round(newValue * 10) / 10;
    setLocalValue(roundedValue);
    onChange(roundedValue);
  };
  const handleOnBlur = () => {
    const newValue = Math.max(min, Math.min(max, localValue));
    setLocalValue(newValue);
    onChange(newValue);
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("config-item", className) }, /* @__PURE__ */ React43__default.createElement("span", { className: "text-base-content" }, label), /* @__PURE__ */ React43__default.createElement("div", { className: "text-base-content flex items-center gap-2" }, /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "text",
      inputMode: "decimal",
      value: localValue,
      onChange: handleChange,
      onBlur: handleOnBlur,
      className: "input input-ghost settings-content text-base-content w-20 max-w-xs rounded border-0 bg-transparent px-3 py-1 text-right !outline-none",
      onFocus: (e) => e.target.select()
    }
  ), /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      onClick: decrement,
      className: `btn btn-circle btn-sm ${value <= min || disabled ? "btn-disabled !bg-opacity-5" : ""}`
    },
    /* @__PURE__ */ React43__default.createElement(FiMinus, { className: "h-4 w-4" })
  ), /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      onClick: increment,
      className: `btn btn-circle btn-sm ${value >= max || disabled ? "btn-disabled !bg-opacity-5" : ""}`
    },
    /* @__PURE__ */ React43__default.createElement(FiPlus, { className: "h-4 w-4" })
  )));
};
var NumberInput_default = NumberInput;
var FontDropdown = ({
  family,
  selected,
  options: options2,
  moreOptions,
  onSelect,
  onGetFontFamily
}) => {
  const _ = useTranslation();
  const iconSize16 = useResponsiveSize(16);
  const defaultIconSize = useDefaultIconSize();
  const allOptions = [...options2, ...moreOptions ?? []];
  const selectedOption = allOptions.find((option) => option.option === selected) ?? allOptions[0];
  return /* @__PURE__ */ React43__default.createElement("div", { className: "dropdown dropdown-top" }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      tabIndex: 0,
      className: "btn btn-sm flex items-center gap-1 px-[20px] font-normal normal-case",
      onClick: (e) => e.currentTarget.focus()
    },
    /* @__PURE__ */ React43__default.createElement("span", { style: { fontFamily: onGetFontFamily(selectedOption.option, family ?? "") } }, selectedOption.label),
    /* @__PURE__ */ React43__default.createElement(FiChevronUp, { size: iconSize16 })
  ), /* @__PURE__ */ React43__default.createElement(
    "ul",
    {
      tabIndex: 0,
      className: clsx8(
        "dropdown-content bgcolor-base-200 no-triangle menu rounded-box absolute right-[-32px] z-[1] mt-4 w-44 shadow sm:right-0",
        moreOptions?.length ? "" : "inline max-h-80 overflow-y-scroll"
      )
    },
    options2.map(({ option, label }) => /* @__PURE__ */ React43__default.createElement("li", { key: option, onClick: () => onSelect(option) }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-0" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, selected === option && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", { style: { fontFamily: onGetFontFamily(option, family ?? "") } }, label || option)))),
    moreOptions && moreOptions.length > 0 && /* @__PURE__ */ React43__default.createElement("li", { className: "dropdown dropdown-left dropdown-top" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-0" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, /* @__PURE__ */ React43__default.createElement(FiChevronLeft, { size: iconSize16 })), /* @__PURE__ */ React43__default.createElement("span", null, _("System Fonts"))), /* @__PURE__ */ React43__default.createElement(
      "ul",
      {
        tabIndex: 0,
        className: clsx8(
          "dropdown-content bgcolor-base-200 menu rounded-box relative z-[1] overflow-y-scroll shadow",
          "!mr-5 mb-[-46px] inline max-h-80 w-[200px] overflow-y-scroll"
        )
      },
      moreOptions.map((option, index) => /* @__PURE__ */ React43__default.createElement("li", { key: `${index}-${option.option}`, onClick: () => onSelect(option.option) }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-2" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, selected === option.option && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", { style: { fontFamily: onGetFontFamily(option.option, family ?? "") } }, option.label || option.option))))
    ))
  ));
};
var FontDropDown_default = FontDropdown;

// src/app/reader/components/settings/FontPanel.tsx
var handleFontFaceFont = (option, family) => {
  return `'${option}', ${family}`;
};
var FontFace = ({
  className,
  family,
  label,
  options: options2,
  moreOptions,
  selected,
  onSelect
}) => {
  const _ = useTranslation();
  return /* @__PURE__ */ React43__default.createElement("div", { className: clsx8("config-item", className) }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, label), /* @__PURE__ */ React43__default.createElement(
    FontDropDown_default,
    {
      family,
      options: options2.map((option) => ({ option, label: _(option) })),
      moreOptions: moreOptions?.map((option) => ({ option, label: option })) ?? [],
      selected,
      onSelect,
      onGetFontFamily: handleFontFaceFont
    }
  ));
};
var FontPanel = ({ bookKey }) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { getView, getViewSettings } = useReaderStore();
  const viewSettings = getViewSettings(bookKey);
  const view = getView(bookKey);
  const fontFamilyOptions = [
    {
      option: "Serif",
      label: _("Serif Font")
    },
    {
      option: "Sans-serif",
      label: _("Sans-Serif Font")
    }
  ];
  const osPlatform = getOSPlatform();
  let defaultSysFonts = [];
  switch (osPlatform) {
    case "macos":
      defaultSysFonts = MACOS_FONTS;
      break;
    case "windows":
      defaultSysFonts = WINDOWS_FONTS;
      break;
    case "linux":
      defaultSysFonts = LINUX_FONTS;
      break;
    case "ios":
      defaultSysFonts = IOS_FONTS;
      break;
    case "android":
      defaultSysFonts = ANDROID_FONTS;
      break;
  }
  const [sysFonts, setSysFonts] = useState(defaultSysFonts);
  const [defaultFontSize, setDefaultFontSize] = useState(viewSettings.defaultFontSize);
  const [minFontSize, setMinFontSize] = useState(viewSettings.minimumFontSize);
  const [overrideFont, setOverrideFont] = useState(viewSettings.overrideFont);
  const [defaultFont, setDefaultFont] = useState(viewSettings.defaultFont);
  const [defaultCJKFont, setDefaultCJKFont] = useState(viewSettings.defaultCJKFont);
  const [serifFont, setSerifFont] = useState(viewSettings.serifFont);
  const [sansSerifFont, setSansSerifFont] = useState(viewSettings.sansSerifFont);
  const [monospaceFont, setMonospaceFont] = useState(viewSettings.monospaceFont);
  const [fontWeight, setFontWeight] = useState(viewSettings.fontWeight);
  const [CJKFonts] = useState(() => {
    return Array.from(/* @__PURE__ */ new Set([...sysFonts, ...CJK_SERIF_FONTS, ...CJK_SANS_SERIF_FONTS])).filter((font) => CJK_FONTS_PATTENS.test(font) || CJK_NAMES_PATTENS.test(font)).sort((a, b) => a.localeCompare(b));
  });
  useEffect(() => {
    setSysFonts([]);
  }, []);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "defaultFont", defaultFont);
  }, [defaultFont]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "defaultCJKFont", defaultCJKFont);
  }, [defaultCJKFont]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "defaultFontSize", defaultFontSize);
  }, [defaultFontSize]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "minimumFontSize", minFontSize);
  }, [minFontSize]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "fontWeight", fontWeight);
  }, [fontWeight]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "serifFont", serifFont);
  }, [serifFont]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "sansSerifFont", sansSerifFont);
  }, [sansSerifFont]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "monospaceFont", monospaceFont);
  }, [monospaceFont]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "overrideFont", overrideFont);
  }, [overrideFont]);
  const handleFontFamilyFont = (option) => {
    switch (option) {
      case "Serif":
        return `'${serifFont}', serif`;
      case "Sans-serif":
        return `'${sansSerifFont}', sans-serif`;
      case "Monospace":
        return `'${monospaceFont}', monospace`;
      default:
        return "";
    }
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: "my-4 w-full space-y-6" }, /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Font Size")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Default Font Size"),
      value: defaultFontSize,
      onChange: setDefaultFontSize,
      min: minFontSize,
      max: 120
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Minimum Font Size"),
      value: minFontSize,
      onChange: setMinFontSize,
      min: 1,
      max: 120
    }
  )))), /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Font Weight")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Font Weight"),
      value: fontWeight,
      onChange: setFontWeight,
      min: 100,
      max: 900,
      step: 100
    }
  )))), /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Font Family")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Default Font")), /* @__PURE__ */ React43__default.createElement(
    FontDropDown_default,
    {
      options: fontFamilyOptions,
      selected: defaultFont,
      onSelect: setDefaultFont,
      onGetFontFamily: handleFontFamilyFont
    }
  )), (isCJKEnv() || view?.language.isCJK) && /* @__PURE__ */ React43__default.createElement(
    FontFace,
    {
      className: "config-item-top",
      family: "serif",
      label: _("CJK Font"),
      options: CJKFonts,
      selected: defaultCJKFont,
      onSelect: setDefaultCJKFont
    }
  ), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Override Book Font")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: overrideFont,
      onChange: () => setOverrideFont(!overrideFont)
    }
  ))))), /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Font Face")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement(
    FontFace,
    {
      className: "config-item-top",
      family: "serif",
      label: _("Serif Font"),
      options: [...SERIF_FONTS, ...CJK_SERIF_FONTS],
      moreOptions: sysFonts,
      selected: serifFont,
      onSelect: setSerifFont
    }
  ), /* @__PURE__ */ React43__default.createElement(
    FontFace,
    {
      family: "sans-serif",
      label: _("Sans-Serif Font"),
      options: [...SANS_SERIF_FONTS, ...CJK_SANS_SERIF_FONTS],
      moreOptions: sysFonts,
      selected: sansSerifFont,
      onSelect: setSansSerifFont
    }
  ), /* @__PURE__ */ React43__default.createElement(
    FontFace,
    {
      className: "config-item-bottom",
      family: "monospace",
      label: _("Monospace Font"),
      options: MONOSPACE_FONTS,
      moreOptions: sysFonts,
      selected: monospaceFont,
      onSelect: setMonospaceFont
    }
  )))));
};
var FontPanel_default = FontPanel;
init_misc();
init_config();
init_book();
init_constants();
var LayoutPanel = ({ bookKey }) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { getView, getViewSettings, setViewSettings } = useReaderStore();
  const { getBookData } = useBookDataStore();
  const view = getView(bookKey);
  const bookData = getBookData(bookKey);
  const viewSettings = getViewSettings(bookKey);
  const [paragraphMargin, setParagraphMargin] = useState(viewSettings.paragraphMargin);
  const [lineHeight, setLineHeight] = useState(viewSettings.lineHeight);
  const [wordSpacing, setWordSpacing] = useState(viewSettings.wordSpacing);
  const [letterSpacing, setLetterSpacing] = useState(viewSettings.letterSpacing);
  const [textIndent, setTextIndent] = useState(viewSettings.textIndent);
  const [fullJustification, setFullJustification] = useState(viewSettings.fullJustification);
  const [hyphenation, setHyphenation] = useState(viewSettings.hyphenation);
  const [marginPx, setMarginPx] = useState(viewSettings.marginPx);
  const [gapPercent, setGapPercent] = useState(viewSettings.gapPercent);
  const [maxColumnCount, setMaxColumnCount] = useState(viewSettings.maxColumnCount);
  const [maxInlineSize, setMaxInlineSize] = useState(viewSettings.maxInlineSize);
  const [maxBlockSize, setMaxBlockSize] = useState(viewSettings.maxBlockSize);
  const [writingMode, setWritingMode] = useState(viewSettings.writingMode);
  const [overrideLayout, setOverrideLayout] = useState(viewSettings.overrideLayout);
  const [isScrolledMode, setScrolledMode] = useState(viewSettings.scrolled);
  const [doubleBorder, setDoubleBorder] = useState(viewSettings.doubleBorder);
  const [borderColor, setBorderColor] = useState(viewSettings.borderColor);
  const [showHeader, setShowHeader] = useState(viewSettings.showHeader);
  const [showFooter, setShowFooter] = useState(viewSettings.showFooter);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "paragraphMargin", paragraphMargin);
  }, [paragraphMargin]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "lineHeight", lineHeight);
  }, [lineHeight]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "wordSpacing", wordSpacing);
  }, [wordSpacing]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "letterSpacing", letterSpacing);
  }, [letterSpacing]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "textIndent", textIndent);
  }, [textIndent]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "fullJustification", fullJustification);
  }, [fullJustification]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "hyphenation", hyphenation);
  }, [hyphenation]);
  useEffect(() => {
    if (marginPx === viewSettings.marginPx) return;
    saveViewSettings(envConfig, bookKey, "marginPx", marginPx, false, false);
    view?.renderer.setAttribute("margin", `${marginPx}px`);
  }, [marginPx]);
  useEffect(() => {
    if (gapPercent === viewSettings.gapPercent) return;
    saveViewSettings(envConfig, bookKey, "gapPercent", gapPercent, false, false);
    view?.renderer.setAttribute("gap", `${gapPercent}%`);
    if (viewSettings.scrolled) {
      view?.renderer.setAttribute("flow", "scrolled");
    }
  }, [gapPercent]);
  useEffect(() => {
    if (maxColumnCount === viewSettings.maxColumnCount) return;
    saveViewSettings(envConfig, bookKey, "maxColumnCount", maxColumnCount, false, false);
    view?.renderer.setAttribute("max-column-count", maxColumnCount);
    view?.renderer.setAttribute("max-inline-size", `${getMaxInlineSize(viewSettings)}px`);
  }, [maxColumnCount]);
  useEffect(() => {
    if (maxInlineSize === viewSettings.maxInlineSize) return;
    saveViewSettings(envConfig, bookKey, "maxInlineSize", maxInlineSize, false, false);
    view?.renderer.setAttribute("max-inline-size", `${getMaxInlineSize(viewSettings)}px`);
  }, [maxInlineSize]);
  useEffect(() => {
    if (maxBlockSize === viewSettings.maxBlockSize) return;
    saveViewSettings(envConfig, bookKey, "maxBlockSize", maxBlockSize, false, false);
    view?.renderer.setAttribute("max-block-size", `${maxBlockSize}px`);
  }, [maxBlockSize]);
  useEffect(() => {
    if (writingMode === viewSettings.writingMode) return;
    const prevWritingMode = viewSettings.writingMode;
    if (writingMode.includes("vertical")) {
      viewSettings.vertical = true;
    } else {
      viewSettings.vertical = false;
    }
    saveViewSettings(envConfig, bookKey, "writingMode", writingMode, true);
    if (view) {
      view.renderer.setStyles?.(getStyles(viewSettings));
      view.book.dir = getBookDirFromWritingMode(writingMode);
    }
    if (prevWritingMode !== writingMode && (["horizontal-rl", "vertical-rl"].includes(writingMode) || ["horizontal-rl", "vertical-rl"].includes(prevWritingMode))) {
      setTimeout(() => window.location.reload(), 100);
    }
  }, [writingMode]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "overrideLayout", overrideLayout);
  }, [overrideLayout]);
  useEffect(() => {
    if (isScrolledMode === viewSettings.scrolled) return;
    saveViewSettings(envConfig, bookKey, "scrolled", isScrolledMode);
    getView(bookKey)?.renderer.setAttribute("flow", isScrolledMode ? "scrolled" : "paginated");
    getView(bookKey)?.renderer.setAttribute(
      "max-inline-size",
      `${getMaxInlineSize(viewSettings)}px`
    );
    getView(bookKey)?.renderer.setStyles?.(getStyles(viewSettings));
  }, [isScrolledMode]);
  useEffect(() => {
    if (doubleBorder === viewSettings.doubleBorder) return;
    if (doubleBorder && viewSettings.vertical) {
      viewSettings.gapPercent = Math.max(
        viewSettings.gapPercent,
        Math.ceil(4800 / window.innerWidth)
      );
      setGapPercent(viewSettings.gapPercent);
      setViewSettings(bookKey, viewSettings);
    }
    saveViewSettings(envConfig, bookKey, "doubleBorder", doubleBorder, false, false);
  }, [doubleBorder]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "borderColor", borderColor, false, false);
  }, [borderColor]);
  useEffect(() => {
    if (showHeader === viewSettings.showHeader) return;
    if (showHeader && !viewSettings.vertical) {
      viewSettings.marginPx = Math.max(viewSettings.marginPx, 44);
      setMarginPx(viewSettings.marginPx);
      setViewSettings(bookKey, viewSettings);
    } else if (showHeader && viewSettings.vertical) {
      viewSettings.gapPercent = Math.max(
        viewSettings.gapPercent,
        Math.ceil(4800 / window.innerWidth)
      );
      setGapPercent(viewSettings.gapPercent);
      setViewSettings(bookKey, viewSettings);
    }
    saveViewSettings(envConfig, bookKey, "showHeader", showHeader, false, false);
  }, [showHeader]);
  useEffect(() => {
    if (showFooter === viewSettings.showFooter) return;
    if (showFooter && !viewSettings.vertical) {
      viewSettings.marginPx = Math.max(viewSettings.marginPx, 44);
      setMarginPx(viewSettings.marginPx);
      setViewSettings(bookKey, viewSettings);
    } else if (showFooter && viewSettings.vertical) {
      viewSettings.gapPercent = Math.max(
        viewSettings.gapPercent,
        Math.ceil(4800 / window.innerWidth)
      );
      setGapPercent(viewSettings.gapPercent);
      setViewSettings(bookKey, viewSettings);
    }
    saveViewSettings(envConfig, bookKey, "showFooter", showFooter, false, false);
  }, [showFooter]);
  const langCode = getBookLangCode(bookData.bookDoc?.metadata?.language);
  const mightBeRTLBook = MIGHT_BE_RTL_LANGS.includes(langCode) || isCJKEnv();
  return /* @__PURE__ */ React43__default.createElement("div", { className: "my-4 w-full space-y-6" }, /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "font-medium" }, _("Scrolled Mode")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: isScrolledMode,
      onChange: () => setScrolledMode(!isScrolledMode)
    }
  ))), mightBeRTLBook && /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "font-medium" }, _("Writing Mode")), /* @__PURE__ */ React43__default.createElement("div", { className: "flex gap-4" }, /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Default") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${writingMode === "auto" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setWritingMode("auto")
    },
    /* @__PURE__ */ React43__default.createElement(MdOutlineAutoMode, null)
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Horizontal Direction") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${writingMode === "horizontal-tb" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setWritingMode("horizontal-tb")
    },
    /* @__PURE__ */ React43__default.createElement(MdOutlineTextRotationNone, null)
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Vertical Direction") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${writingMode === "vertical-rl" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setWritingMode("vertical-rl")
    },
    /* @__PURE__ */ React43__default.createElement(MdTextRotateVertical, null)
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("RTL Direction") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${writingMode === "horizontal-rl" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setWritingMode("horizontal-rl")
    },
    /* @__PURE__ */ React43__default.createElement(TbTextDirectionRtl, null)
  ))))), viewSettings.vertical && /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Border Frame")), /* @__PURE__ */ React43__default.createElement("div", { className: "card bg-base-100 border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Double Border")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: doubleBorder,
      onChange: () => setDoubleBorder(!doubleBorder)
    }
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Border Color")), /* @__PURE__ */ React43__default.createElement("div", { className: "flex gap-4" }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-circle btn-sm bg-red-300 hover:bg-red-500 ${borderColor === "red" ? "btn-active !bg-red-500" : ""}`,
      onClick: () => setBorderColor("red")
    }
  ), /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-circle btn-sm bg-black/50 hover:bg-black ${borderColor === "black" ? "btn-active !bg-black" : ""}`,
      onClick: () => setBorderColor("black")
    }
  )))))), /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Paragraph")), /* @__PURE__ */ React43__default.createElement("div", { className: "card bg-base-100 border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Paragraph Margin"),
      value: paragraphMargin,
      onChange: setParagraphMargin,
      min: 0,
      max: 4,
      step: 0.5
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Line Spacing"),
      value: lineHeight,
      onChange: setLineHeight,
      min: 1,
      max: 3,
      step: 0.1
    }
  ), langCode !== "zh" && /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Word Spacing"),
      value: wordSpacing,
      onChange: setWordSpacing,
      min: -4,
      max: 8,
      step: 0.5
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Letter Spacing"),
      value: letterSpacing,
      onChange: setLetterSpacing,
      min: -2,
      max: 4,
      step: 0.5
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Text Indent"),
      value: textIndent,
      onChange: setTextIndent,
      min: -2,
      max: 4,
      step: 1
    }
  ), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Full Justification")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: fullJustification,
      onChange: () => setFullJustification(!fullJustification)
    }
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Hyphenation")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: hyphenation,
      onChange: () => setHyphenation(!hyphenation)
    }
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Override Book Layout")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: overrideLayout,
      onChange: () => setOverrideLayout(!overrideLayout)
    }
  ))))), /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Page")), /* @__PURE__ */ React43__default.createElement("div", { className: "card bg-base-100 border-base-200 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Show Header")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: showHeader,
      onChange: () => setShowHeader(!showHeader)
    }
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Show Footer")), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "checkbox",
      className: "toggle",
      checked: showFooter,
      onChange: () => setShowFooter(!showFooter)
    }
  )), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Vertical Margins (px)"),
      value: marginPx,
      onChange: setMarginPx,
      min: !viewSettings.vertical && (showFooter || showHeader) ? 44 : 0,
      max: 88,
      step: 4
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Horizontal Margins (%)"),
      value: gapPercent,
      onChange: setGapPercent,
      min: viewSettings.vertical && (showFooter || showHeader) ? Math.ceil(4800 / window.innerWidth) : 0,
      max: 30
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: _("Maximum Number of Columns"),
      value: maxColumnCount,
      onChange: setMaxColumnCount,
      min: 1,
      max: 4
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: viewSettings.vertical ? _("Maximum Column Height") : _("Maximum Column Width"),
      value: maxInlineSize,
      onChange: setMaxInlineSize,
      disabled: maxColumnCount === 1 || viewSettings.scrolled,
      min: 400,
      max: 9999,
      step: 100
    }
  ), /* @__PURE__ */ React43__default.createElement(
    NumberInput_default,
    {
      label: viewSettings.vertical ? _("Maximum Column Width") : _("Maximum Column Height"),
      value: maxBlockSize,
      onChange: setMaxBlockSize,
      disabled: maxColumnCount === 1 || viewSettings.scrolled,
      min: 400,
      max: 9999,
      step: 100
    }
  )))));
};
var LayoutPanel_default = LayoutPanel;
init_md5();
init_constants();
var ColorInput = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  const handlePickerChange = (colorResult) => {
    onChange(colorResult.hex);
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React43__default.createElement("label", { className: "mb-1 block text-sm font-medium" }, label), /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "border-base-200 relative mr-2 flex h-7 w-8 cursor-pointer items-center justify-center overflow-hidden rounded border",
      style: { backgroundColor: value },
      onClick: () => setIsOpen(!isOpen)
    }
  ), /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      className: "bg-base-100 text-base-content border-base-200 min-w-4 max-w-36 flex-1 rounded border p-1 font-mono text-sm"
    }
  )), isOpen && /* @__PURE__ */ React43__default.createElement("div", { ref: pickerRef, className: "relative z-50 mt-2" }, /* @__PURE__ */ React43__default.createElement("div", { className: "absolute" }, /* @__PURE__ */ React43__default.createElement(
    SketchPicker,
    {
      width: "100%",
      color: value,
      onChange: handlePickerChange,
      disableAlpha: true
    }
  ))));
};
var ColorInput_default = ColorInput;

// src/app/reader/components/settings/ThemeEditor.tsx
var ThemeEditor = ({ customTheme, onSave, onDelete, onCancel }) => {
  const _ = useTranslation();
  const { settings } = useSettingsStore();
  const template = CUSTOM_THEME_TEMPLATES[Math.floor(Math.random() * CUSTOM_THEME_TEMPLATES.length)];
  const [lightTextColor, setLightTextColor] = useState(
    customTheme?.colors.light.fg || template.light.fg
  );
  const [lightBackgroundColor, setLightBackgroundColor] = useState(
    customTheme?.colors.light.bg || template.light.bg
  );
  const [darkTextColor, setDarkTextColor] = useState(
    customTheme?.colors.dark.fg || template.dark.fg
  );
  const [darkBackgroundColor, setDarkBackgroundColor] = useState(
    customTheme?.colors.dark.bg || template.dark.bg
  );
  const [themeName, setThemeName] = useState(customTheme?.label || _("Custom"));
  const ThemePreview = ({ textColor, backgroundColor, label }) => /* @__PURE__ */ React.createElement("div", { className: "mb-2 mt-4" }, /* @__PURE__ */ React.createElement("label", { className: "mb-1 block text-sm font-medium" }, label), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "border-base-300 overflow-hidden rounded border p-3",
      style: {
        backgroundColor,
        color: textColor
      }
    },
    /* @__PURE__ */ React.createElement("p", { className: "mb-2 whitespace-pre-line text-sm" }, _(
      "All the world's a stage,\nAnd all the men and women merely players;\nThey have their exits and their entrances,\nAnd one man in his time plays many parts,\nHis acts being seven ages.\n\n\u2014\u200AWilliam Shakespeare"
    ))
  ));
  const getCustomTheme = () => {
    return {
      name: md5Fingerprint(themeName),
      label: themeName,
      colors: {
        light: {
          fg: lightTextColor,
          bg: lightBackgroundColor,
          primary: "#3b82f6"
        },
        dark: {
          fg: darkTextColor,
          bg: darkBackgroundColor,
          primary: "#60a5fa"
        }
      }
    };
  };
  return /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("label", { className: "font-medium" }, _("Custom Theme")), /* @__PURE__ */ React.createElement("div", { className: "flex w-[calc(50%-12px)] justify-between" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "btn btn-ghost btn-sm text-base-content px-2",
      onClick: () => onSave(getCustomTheme())
    },
    _("Save")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: clsx8(
        "btn btn-ghost btn-sm px-2",
        !settings.globalReadSettings.customThemes.find(
          (theme) => theme.name === md5Fingerprint(themeName)
        ) && "btn-disabled"
      ),
      onClick: () => onDelete(getCustomTheme())
    },
    _("Delete")
  ), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm px-2", onClick: onCancel }, _("Cancel")))), /* @__PURE__ */ React.createElement("div", { className: "mb-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("label", { className: "font-medium" }, _("Theme Name")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: themeName,
      onChange: (e) => setThemeName(e.target.value),
      className: "bg-base-100 text-base-content border-base-200 w-[calc(50%-12px)] rounded border p-2 text-sm"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-base-200 rounded-lg p-3" }, /* @__PURE__ */ React.createElement("h3", { className: "mb-3 text-center font-medium" }, _("Light Mode")), /* @__PURE__ */ React.createElement(ColorInput_default, { label: _("Text Color"), value: lightTextColor, onChange: setLightTextColor }), /* @__PURE__ */ React.createElement(
    ColorInput_default,
    {
      label: _("Background Color"),
      value: lightBackgroundColor,
      onChange: setLightBackgroundColor
    }
  ), /* @__PURE__ */ React.createElement(
    ThemePreview,
    {
      textColor: lightTextColor,
      backgroundColor: lightBackgroundColor,
      label: _("Preview")
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-base-300 rounded-lg p-3" }, /* @__PURE__ */ React.createElement("h3", { className: "mb-3 text-center font-medium" }, _("Dark Mode")), /* @__PURE__ */ React.createElement(ColorInput_default, { label: _("Text Color"), value: darkTextColor, onChange: setDarkTextColor }), /* @__PURE__ */ React.createElement(
    ColorInput_default,
    {
      label: _("Background Color"),
      value: darkBackgroundColor,
      onChange: setDarkBackgroundColor
    }
  ), /* @__PURE__ */ React.createElement(
    ThemePreview,
    {
      textColor: darkTextColor,
      backgroundColor: darkBackgroundColor,
      label: _("Preview")
    }
  ))));
};
var ThemeEditor_default = ThemeEditor;

// src/app/reader/components/settings/ColorPanel.tsx
var ColorPanel = ({}) => {
  const _ = useTranslation();
  const { themeMode, themeColor, isDarkMode, setThemeMode, setThemeColor, saveCustomTheme } = useThemeStore();
  const { envConfig } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const iconSize16 = useResponsiveSize(16);
  const iconSize24 = useResponsiveSize(24);
  const [editTheme, setEditTheme] = useState(null);
  const [customThems, setCustomThemes] = useState([]);
  const [showCustomThemeEditor, setShowCustomThemeEditor] = useState(false);
  useEffect(() => {
    const customThemes = settings.globalReadSettings.customThemes ?? [];
    setCustomThemes(
      customThemes.map((customTheme) => ({
        name: customTheme.name,
        label: customTheme.label,
        colors: {
          light: generateLightPalette(customTheme.colors.light),
          dark: generateDarkPalette(customTheme.colors.dark)
        },
        isCustomizale: true
      }))
    );
  }, [settings]);
  const handleSaveCustomTheme = (customTheme) => {
    applyCustomTheme(customTheme);
    saveCustomTheme(envConfig, settings, customTheme);
    setSettings({ ...settings });
    setThemeColor(customTheme.name);
    setShowCustomThemeEditor(false);
  };
  const handleDeleteCustomTheme = (customTheme) => {
    saveCustomTheme(envConfig, settings, customTheme, true);
    setSettings({ ...settings });
    setThemeColor("default");
    setShowCustomThemeEditor(false);
  };
  const handleEditTheme = (name) => {
    const customTheme = settings.globalReadSettings.customThemes.find((t) => t.name === name);
    if (customTheme) {
      setEditTheme(customTheme);
      setShowCustomThemeEditor(true);
    }
  };
  return /* @__PURE__ */ React43__default.createElement("div", { className: "my-4 w-full space-y-6" }, showCustomThemeEditor ? /* @__PURE__ */ React43__default.createElement(
    ThemeEditor_default,
    {
      customTheme: editTheme,
      onSave: handleSaveCustomTheme,
      onDelete: handleDeleteCustomTheme,
      onCancel: () => setShowCustomThemeEditor(false)
    }
  ) : /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "font-medium" }, _("Theme Mode")), /* @__PURE__ */ React43__default.createElement("div", { className: "flex gap-4" }, /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Auto Mode") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${themeMode === "auto" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setThemeMode("auto")
    },
    /* @__PURE__ */ React43__default.createElement(TbSunMoon, null)
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Light Mode") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${themeMode === "light" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setThemeMode("light")
    },
    /* @__PURE__ */ React43__default.createElement(MdOutlineLightMode, null)
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "lg:tooltip lg:tooltip-bottom", "data-tip": _("Dark Mode") }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      className: `btn btn-ghost btn-circle btn-sm ${themeMode === "dark" ? "btn-active bg-base-300" : ""}`,
      onClick: () => setThemeMode("dark")
    },
    /* @__PURE__ */ React43__default.createElement(MdOutlineDarkMode, null)
  )))), /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Theme Color")), /* @__PURE__ */ React43__default.createElement("div", { className: "grid grid-cols-3 gap-4" }, themes.concat(customThems).map(({ name, label, colors: colors2, isCustomizale }) => /* @__PURE__ */ React43__default.createElement(
    "label",
    {
      key: name,
      className: `relative flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-md ${themeColor === name ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`,
      style: {
        backgroundColor: isDarkMode ? colors2.dark["base-100"] : colors2.light["base-100"],
        color: isDarkMode ? colors2.dark["base-content"] : colors2.light["base-content"]
      }
    },
    /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "radio",
        name: "theme",
        value: name,
        checked: themeColor === name,
        onChange: () => setThemeColor(name),
        className: "hidden"
      }
    ),
    themeColor === name ? /* @__PURE__ */ React43__default.createElement(MdRadioButtonChecked, { size: iconSize24 }) : /* @__PURE__ */ React43__default.createElement(MdRadioButtonUnchecked, { size: iconSize24 }),
    /* @__PURE__ */ React43__default.createElement("span", null, _(label)),
    isCustomizale && themeColor === name && /* @__PURE__ */ React43__default.createElement("button", { onClick: () => handleEditTheme(name) }, /* @__PURE__ */ React43__default.createElement(CgColorPicker, { size: iconSize16, className: "absolute right-2 top-2" }))
  )), /* @__PURE__ */ React43__default.createElement(
    "label",
    {
      className: `relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow-md`,
      onClick: () => setShowCustomThemeEditor(true)
    },
    /* @__PURE__ */ React43__default.createElement(PiPlus, { size: iconSize24 }),
    /* @__PURE__ */ React43__default.createElement("span", null, _("Custom"))
  )))));
};
var ColorPanel_default = ColorPanel;
var DialogMenu = ({ toggleDropdown }) => {
  const _ = useTranslation();
  const iconSize = useDefaultIconSize();
  const { isFontLayoutSettingsGlobal, setFontLayoutSettingsGlobal } = useSettingsStore();
  const handleToggleGlobal = () => {
    setFontLayoutSettingsGlobal(!isFontLayoutSettingsGlobal);
    toggleDropdown?.();
  };
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      tabIndex: 0,
      className: "dropdown-content dropdown-right no-triangle border-base-200 z-20 mt-1 border shadow-2xl"
    },
    /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        className: "hover:bg-base-200 text-base-content flex w-full items-center justify-between rounded-md p-2",
        onClick: handleToggleGlobal
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${iconSize}px` } }, isFontLayoutSettingsGlobal && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          className: "lg:tooltip",
          "data-tip": isFontLayoutSettingsGlobal ? _("Apply to All Books") : _("Apply to This Book")
        },
        /* @__PURE__ */ React43__default.createElement("span", { className: "ml-2 whitespace-nowrap" }, _("Global Settings"))
      ))
    )
  );
};
var DialogMenu_default = DialogMenu;
init_constants();

// src/utils/css.ts
var cssValidate = (css) => {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const propertyPattern = /^[\s\n]*[-\w]+\s*:\s*[^;]+;?$/;
  if (!css) return { isValid: false, error: "Empty CSS" };
  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    return { isValid: false, error: "Unbalanced curly braces" };
  }
  const blocks = css.split("}").map((block) => block.trim()).filter(Boolean);
  for (const block of blocks) {
    const parts = block.split("{").map((part) => part.trim());
    if (parts.length !== 2) {
      return { isValid: false, error: "Invalid CSS structure" };
    }
    const [selector, decls] = parts;
    if (!selector) {
      return { isValid: false, error: "Missing selector" };
    }
    if (!decls) {
      return { isValid: false, error: `Missing declarations for selector: ${selector}` };
    }
    const props = decls.split(";").map((prop) => prop.trim()).filter(Boolean);
    if (props.length === 0) {
      return { isValid: false, error: `No valid properties for selector: ${selector}` };
    }
    for (const prop of props) {
      if (!prop.includes(":")) {
        return { isValid: false, error: `Missing property or value: ${prop}` };
      }
      const [name, value] = prop.split(":").map((part) => part.trim());
      if (!name) {
        return { isValid: false, error: `Missing property name: ${prop}` };
      }
      if (!value) {
        return { isValid: false, error: `Missing property value: ${prop}` };
      }
      if (!propertyPattern.test(prop.endsWith(";") ? prop : prop + ";")) {
        return { isValid: false, error: `Invalid property: ${prop}` };
      }
    }
  }
  return { isValid: true, error: null };
};
var css_default = cssValidate;
var DropDown = ({ selected, options: options2, onSelect }) => {
  const iconSize16 = useResponsiveSize(16);
  const defaultIconSize = useDefaultIconSize();
  return /* @__PURE__ */ React43__default.createElement("div", { className: "dropdown dropdown-bottom" }, /* @__PURE__ */ React43__default.createElement(
    "button",
    {
      tabIndex: 0,
      className: "btn btn-sm flex items-center gap-1 px-[20px] font-normal normal-case",
      onClick: (e) => e.currentTarget.focus()
    },
    /* @__PURE__ */ React43__default.createElement("span", null, selected.label),
    /* @__PURE__ */ React43__default.createElement(FiChevronDown, { size: iconSize16 })
  ), /* @__PURE__ */ React43__default.createElement(
    "ul",
    {
      tabIndex: 0,
      className: clsx8(
        "dropdown-content bgcolor-base-200 no-triangle menu rounded-box absolute z-[1] shadow",
        "menu-vertical right-[-32px] mt-2 inline max-h-80 w-44 overflow-y-scroll sm:right-0"
      )
    },
    options2.map(({ option, label }) => /* @__PURE__ */ React43__default.createElement("li", { key: option, onClick: () => onSelect(option) }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-0" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, selected.option === option && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", null, label || option))))
  ));
};
var DropDown_default = DropDown;

// src/app/reader/components/settings/MiscPanel.tsx
var MiscPanel = ({ bookKey }) => {
  const _ = useTranslation();
  const { envConfig, appService } = useEnv();
  const { settings, isFontLayoutSettingsGlobal, setSettings } = useSettingsStore();
  const { getView, getViewSettings, setViewSettings } = useReaderStore();
  const viewSettings = getViewSettings(bookKey);
  const [animated, setAnimated] = useState(viewSettings.animated);
  const [isDisableClick, setIsDisableClick] = useState(viewSettings.disableClick);
  const [swapClickArea, setSwapClickArea] = useState(viewSettings.swapClickArea);
  const [isContinuousScroll, setIsContinuousScroll] = useState(viewSettings.continuousScroll);
  const [draftStylesheet, setDraftStylesheet] = useState(viewSettings.userStylesheet);
  const [draftStylesheetSaved, setDraftStylesheetSaved] = useState(true);
  const [error, setError] = useState(null);
  const [inputFocusInAndroid, setInputFocusInAndroid] = useState(false);
  const textareaRef = useRef(null);
  const handleUserStylesheetChange = (e) => {
    const cssInput = e.target.value;
    setDraftStylesheet(cssInput);
    setDraftStylesheetSaved(false);
    try {
      const { isValid, error: error2 } = css_default(cssInput);
      if (cssInput && !isValid) {
        throw new Error(error2 || "Invalid CSS");
      }
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid CSS: Please check your input.");
      }
      console.log("CSS Error:", err);
    }
  };
  const applyStyles = () => {
    const formattedCSS = cssbeautify(draftStylesheet, {
      indent: "  ",
      openbrace: "end-of-line",
      autosemicolon: true
    });
    setDraftStylesheet(formattedCSS);
    setDraftStylesheetSaved(true);
    viewSettings.userStylesheet = formattedCSS;
    setViewSettings(bookKey, { ...viewSettings });
    if (isFontLayoutSettingsGlobal) {
      settings.globalViewSettings.userStylesheet = formattedCSS;
      setSettings(settings);
    }
    getView(bookKey)?.renderer.setStyles?.(getStyles(viewSettings));
  };
  const handleInput = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const handleInputFocus = () => {
    if (appService?.isAndroidApp) {
      setInputFocusInAndroid(true);
    }
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({
        behavior: "instant",
        block: "center"
      });
    }, 300);
  };
  const handleInputBlur = () => {
    if (appService?.isAndroidApp) {
      setTimeout(() => {
        setInputFocusInAndroid(false);
      }, 100);
    }
  };
  const getCurrentUILangOption = () => {
    const uiLanguage = viewSettings.uiLanguage;
    return {
      option: uiLanguage,
      label: uiLanguage === "" ? _("Auto") : TRANSLATED_LANGS[uiLanguage]
    };
  };
  const getUILangOptions = () => {
    const langs = TRANSLATED_LANGS;
    const options2 = Object.entries(langs).map(([option, label]) => ({ option, label }));
    options2.sort((a, b) => a.label.localeCompare(b.label));
    options2.unshift({ option: "", label: _("Auto") });
    return options2;
  };
  const handleSelectUILang = (option) => {
    saveViewSettings(envConfig, bookKey, "uiLanguage", option, false, false);
    i18n.changeLanguage(option ? option : navigator.language);
  };
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "animated", animated, false, false);
    if (animated) {
      getView(bookKey)?.renderer.setAttribute("animated", "");
    } else {
      getView(bookKey)?.renderer.removeAttribute("animated");
    }
  }, [animated]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "disableClick", isDisableClick, false, false);
  }, [isDisableClick]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "swapClickArea", swapClickArea, false, false);
  }, [swapClickArea]);
  useEffect(() => {
    saveViewSettings(envConfig, bookKey, "continuousScroll", isContinuousScroll, false, false);
  }, [isContinuousScroll]);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "my-4 w-full space-y-6",
        inputFocusInAndroid && "h-[50%] overflow-y-auto pb-[200px]"
      )
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Language")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 bg-base-100 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Language")), /* @__PURE__ */ React43__default.createElement(
      DropDown_default,
      {
        selected: getCurrentUILangOption(),
        options: getUILangOptions(),
        onSelect: handleSelectUILang
      }
    ))))),
    /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Animation")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 bg-base-100 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Paging Animation")), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "checkbox",
        className: "toggle",
        checked: animated,
        onChange: () => setAnimated(!animated)
      }
    ))))),
    /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Behavior")), /* @__PURE__ */ React43__default.createElement("div", { className: "card border-base-200 bg-base-100 border shadow" }, /* @__PURE__ */ React43__default.createElement("div", { className: "divide-base-200 divide-y" }, /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Continuous Scroll")), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "checkbox",
        className: "toggle",
        checked: isContinuousScroll,
        onChange: () => setIsContinuousScroll(!isContinuousScroll)
      }
    )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Disable Click-to-Flip")), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "checkbox",
        className: "toggle",
        checked: isDisableClick,
        onChange: () => setIsDisableClick(!isDisableClick)
      }
    )), /* @__PURE__ */ React43__default.createElement("div", { className: "config-item" }, /* @__PURE__ */ React43__default.createElement("span", { className: "" }, _("Swap Click-to-Flip Area")), /* @__PURE__ */ React43__default.createElement(
      "input",
      {
        type: "checkbox",
        className: "toggle",
        checked: swapClickArea,
        disabled: isDisableClick,
        onChange: () => setSwapClickArea(!swapClickArea)
      }
    ))))),
    /* @__PURE__ */ React43__default.createElement("div", { className: "w-full" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "mb-2 font-medium" }, _("Custom CSS")), /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: `card border-base-200 bg-base-100 border shadow ${error ? "border-red-500" : ""}`
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: "relative p-1" }, /* @__PURE__ */ React43__default.createElement(
        "textarea",
        {
          ref: textareaRef,
          className: clsx8(
            "textarea textarea-ghost h-48 w-full border-0 p-3 text-base !outline-none sm:text-sm",
            "placeholder:text-base-content/70"
          ),
          placeholder: _("Enter your custom CSS here..."),
          spellCheck: "false",
          value: draftStylesheet,
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
          onInput: handleInput,
          onKeyDown: handleInput,
          onKeyUp: handleInput,
          onChange: handleUserStylesheetChange
        }
      ), /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          className: clsx8(
            "btn btn-ghost bg-base-200 absolute bottom-2 right-4 h-8 min-h-8 px-4 py-2",
            draftStylesheetSaved ? "hidden" : "",
            error ? "btn-disabled" : ""
          ),
          onClick: applyStyles,
          disabled: !!error
        },
        _("Apply")
      ))
    ), error && /* @__PURE__ */ React43__default.createElement("p", { className: "mt-1 text-sm text-red-500" }, error))
  );
};
var MiscPanel_default = MiscPanel;

// src/app/reader/components/settings/SettingsDialog.tsx
var SettingsDialog = ({ bookKey }) => {
  const _ = useTranslation();
  const [isRtl] = useState(() => getDirFromUILanguage() === "rtl");
  const [activePanel, setActivePanel] = useState(
    localStorage.getItem("lastConfigPanel") || "Font"
  );
  const { setFontLayoutSettingsDialogOpen } = useSettingsStore();
  const tabConfig = [
    {
      tab: "Font",
      icon: RiFontSize,
      label: _("Font")
    },
    {
      tab: "Layout",
      icon: RiDashboardLine,
      label: _("Layout")
    },
    {
      tab: "Color",
      icon: VscSymbolColor,
      label: _("Color")
    },
    {
      tab: "Misc",
      icon: IoAccessibilityOutline,
      label: _("Misc")
    }
  ];
  const handleSetActivePanel = (tab) => {
    setActivePanel(tab);
    localStorage.setItem("lastConfigPanel", tab);
  };
  const handleClose2 = () => {
    setFontLayoutSettingsDialogOpen(false);
  };
  return /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
    Dialog_default,
    {
      isOpen: true,
      onClose: handleClose2,
      className: "modal-open",
      boxClassName: "sm:min-w-[520px]",
      snapHeight: window.innerWidth < 640 ? 0.7 : void 0,
      header: /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full items-center justify-between" }, /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          tabIndex: -1,
          onClick: handleClose2,
          className: "btn btn-ghost btn-circle flex h-8 min-h-8 w-8 hover:bg-transparent focus:outline-none sm:hidden"
        },
        isRtl ? /* @__PURE__ */ React43__default.createElement(MdArrowForwardIos, null) : /* @__PURE__ */ React43__default.createElement(MdArrowBackIosNew, null)
      ), /* @__PURE__ */ React43__default.createElement("div", { className: "dialog-tabs flex h-10 max-w-[100%] flex-grow items-center gap-2 pl-4" }, tabConfig.map(({ tab, icon: Icon, label }) => /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          key: tab,
          className: clsx8(
            "btn btn-ghost text-base-content btn-sm",
            activePanel === tab ? "btn-active" : ""
          ),
          onClick: () => handleSetActivePanel(tab)
        },
        /* @__PURE__ */ React43__default.createElement(Icon, { className: "mr-0" }),
        window.innerWidth >= 500 ? label : ""
      ))), /* @__PURE__ */ React43__default.createElement("div", { className: "flex h-full items-center justify-end gap-x-2" }, /* @__PURE__ */ React43__default.createElement(
        Dropdown_default,
        {
          className: "dropdown-bottom dropdown-end",
          buttonClassName: "btn btn-ghost h-8 min-h-8 w-8 p-0",
          toggleButton: /* @__PURE__ */ React43__default.createElement(PiDotsThreeVerticalBold, null)
        },
        /* @__PURE__ */ React43__default.createElement(DialogMenu_default, null)
      ), /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          onClick: handleClose2,
          className: "bg-base-300/65 btn btn-ghost btn-circle hidden h-6 min-h-6 w-6 sm:flex"
        },
        /* @__PURE__ */ React43__default.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1em",
            height: "1em",
            viewBox: "0 0 24 24"
          },
          /* @__PURE__ */ React43__default.createElement(
            "path",
            {
              fill: "currentColor",
              d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            }
          )
        )
      )))
    },
    activePanel === "Font" && /* @__PURE__ */ React43__default.createElement(FontPanel_default, { bookKey }),
    activePanel === "Layout" && /* @__PURE__ */ React43__default.createElement(LayoutPanel_default, { bookKey }),
    activePanel === "Color" && /* @__PURE__ */ React43__default.createElement(ColorPanel_default, { bookKey }),
    activePanel === "Misc" && /* @__PURE__ */ React43__default.createElement(MiscPanel_default, { bookKey })
  ));
};
var SettingsDialog_default = SettingsDialog;
init_misc();
init_constants();
var useNotesSync = (bookKey) => {
  const { syncedNotes, syncNotes, lastSyncedAtNotes } = useSync(bookKey);
  const { getConfig, setConfig } = useBookDataStore();
  const config = getConfig(bookKey);
  const bookHash = bookKey.split("-")[0];
  const lastSyncTime = useRef(0);
  const syncTimeoutRef = useRef(null);
  const getNewNotes = () => {
    if (!config?.location) return [];
    const bookNotes = config.booknotes ?? [];
    const newNotes = bookNotes.filter(
      (note) => lastSyncedAtNotes < note.updatedAt || lastSyncedAtNotes < (note.deletedAt ?? 0)
    );
    newNotes.forEach((note) => {
      note.bookHash = bookHash;
    });
    return newNotes;
  };
  useEffect(() => {
    if (!config?.location) return;
    const now = Date.now();
    const timeSinceLastSync = now - lastSyncTime.current;
    if (timeSinceLastSync > SYNC_NOTES_INTERVAL_SEC * 1e3) {
      lastSyncTime.current = now;
      const newNotes = getNewNotes();
      syncNotes(newNotes, bookHash, "both");
    } else {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(
        () => {
          lastSyncTime.current = Date.now();
          const newNotes = getNewNotes();
          syncNotes(newNotes, bookHash, "both");
          syncTimeoutRef.current = null;
        },
        SYNC_NOTES_INTERVAL_SEC * 1e3 - timeSinceLastSync
      );
    }
  }, [config]);
  useEffect(() => {
    const processNewNote = (note) => {
      const oldNotes = config?.booknotes ?? [];
      const existingNote = oldNotes.find((oldNote) => oldNote.id === note.id);
      if (existingNote) {
        if (existingNote.updatedAt < note.updatedAt) {
          return { ...existingNote, ...note };
        } else {
          return { ...note, ...existingNote };
        }
      }
      return note;
    };
    if (syncedNotes?.length && config) {
      const newNotes = syncedNotes.filter((note) => note.bookHash === bookHash);
      if (!newNotes.length) return;
      const oldNotes = config.booknotes ?? [];
      const mergedNotes = [
        ...oldNotes.filter((oldNote) => !newNotes.some((newNote) => newNote.id === oldNote.id)),
        ...newNotes.map(processNewNote)
      ];
      setConfig(bookKey, { booknotes: mergedNotes });
    }
  }, [syncedNotes]);
};

// src/utils/sel.ts
var frameRect = (frame, rect, sx = 1, sy = 1) => {
  const left = sx * rect.left + frame.left;
  const right = sx * rect.right + frame.left;
  const top = sy * rect.top + frame.top;
  const bottom = sy * rect.bottom + frame.top;
  return { left, right, top, bottom };
};
var pointIsInView = ({ x, y }) => x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight;
var getIframeElement = (nodeElement) => {
  let node;
  if (nodeElement && typeof nodeElement === "object" && "tagName" in nodeElement) {
    node = nodeElement;
  } else if (nodeElement && typeof nodeElement === "object" && "collapse" in nodeElement) {
    node = nodeElement.commonAncestorContainer;
  } else {
    node = nodeElement;
  }
  while (node) {
    if (node.nodeType === Node.DOCUMENT_NODE) {
      const doc = node;
      if (doc.defaultView && doc.defaultView.frameElement) {
        return doc.defaultView.frameElement;
      }
    }
    node = node.parentNode;
  }
  return null;
};
var constrainPointWithinRect = (point, rect, padding) => {
  return {
    x: Math.max(padding, Math.min(point.x, rect.right - padding)),
    y: Math.max(padding, Math.min(point.y, rect.bottom - padding))
  };
};
var getPosition = (target, rect, paddingPx2, isVertical = false) => {
  const frameElement = getIframeElement(target);
  const transform = frameElement ? getComputedStyle(frameElement).transform : "";
  const match = transform.match(/matrix\((.+)\)/);
  const [sx, , , sy] = match?.[1]?.split(/\s*,\s*/)?.map((x) => parseFloat(x)) ?? [];
  const frame = frameElement?.getBoundingClientRect() ?? { top: 0, left: 0 };
  const rects = Array.from(target.getClientRects());
  const first = frameRect(frame, rects[0], sx, sy);
  const last = frameRect(frame, rects.at(-1), sx, sy);
  if (isVertical) {
    const leftSpace = first.left - rect.left;
    const rightSpace = rect.right - first.right;
    const dir = leftSpace > rightSpace ? "left" : "right";
    const position = {
      point: constrainPointWithinRect(
        {
          x: dir === "left" ? first.left - rect.left - 6 : first.right - rect.left + 6,
          y: (first.top + first.bottom) / 2 - rect.top
        },
        rect,
        paddingPx2
      ),
      dir
    };
    const inView = pointIsInView(position.point);
    return inView ? position : { point: { x: 0, y: 0 }, dir };
  }
  const start = {
    point: { x: (first.left + first.right) / 2 - rect.left, y: first.top - rect.top - 12 },
    dir: "up"
  };
  const end = {
    point: { x: (last.left + last.right) / 2 - rect.left, y: last.bottom - rect.top + 6 },
    dir: "down"
  };
  const startInView = pointIsInView(start.point);
  const endInView = pointIsInView(end.point);
  if (!startInView && !endInView) return { point: { x: 0, y: 0 } };
  if (!startInView) return end;
  if (!endInView) return start;
  return start.point.y > window.innerHeight - end.point.y ? start : end;
};
var getPopupPosition = (position, boundingReact, popupWidthPx, popupHeightPx, popupPaddingPx) => {
  const popupPoint = { x: 0, y: 0 };
  if (position.dir === "up") {
    popupPoint.x = position.point.x - popupWidthPx / 2;
    popupPoint.y = position.point.y - popupHeightPx;
  } else if (position.dir === "down") {
    popupPoint.x = position.point.x - popupWidthPx / 2;
    popupPoint.y = position.point.y + 6;
  } else if (position.dir === "left") {
    popupPoint.x = position.point.x - popupWidthPx;
    popupPoint.y = position.point.y - popupHeightPx / 2;
  } else if (position.dir === "right") {
    popupPoint.x = position.point.x + 6;
    popupPoint.y = position.point.y - popupHeightPx / 2;
  }
  if (popupPoint.x < popupPaddingPx) {
    popupPoint.x = popupPaddingPx;
  }
  if (popupPoint.y < popupPaddingPx) {
    popupPoint.y = popupPaddingPx;
  }
  if (popupPoint.x + popupWidthPx > boundingReact.right - boundingReact.left - popupPaddingPx) {
    popupPoint.x = boundingReact.right - boundingReact.left - popupPaddingPx - popupWidthPx;
  }
  if (popupPoint.y + popupHeightPx > boundingReact.bottom - boundingReact.top - popupPaddingPx) {
    popupPoint.y = boundingReact.bottom - boundingReact.top - popupPaddingPx - popupHeightPx;
  }
  return { point: popupPoint, dir: position.dir };
};

// src/app/reader/components/annotator/Annotator.tsx
init_constants();

// src/components/Popup.tsx
var Popup = ({
  width,
  height,
  position,
  trianglePosition,
  children,
  className = "",
  triangleClassName = "",
  additionalStyle = {}
}) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
  "div",
  {
    id: "popup-container",
    className: `bg-base-300 absolute rounded-lg font-sans shadow-xl ${className}`,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      left: `${position ? position.point.x : -999}px`,
      top: `${position ? position.point.y : -999}px`,
      ...additionalStyle
    }
  },
  children
), /* @__PURE__ */ React.createElement(
  "div",
  {
    className: `triangle text-base-300 absolute ${triangleClassName}`,
    style: {
      left: trianglePosition?.dir === "left" ? `${trianglePosition.point.x}px` : trianglePosition?.dir === "right" ? `${trianglePosition.point.x}px` : `${trianglePosition ? trianglePosition.point.x : -999}px`,
      top: trianglePosition?.dir === "up" ? `${trianglePosition.point.y}px` : trianglePosition?.dir === "down" ? `${trianglePosition.point.y}px` : `${trianglePosition ? trianglePosition.point.y : -999}px`,
      borderLeft: trianglePosition?.dir === "right" ? "none" : trianglePosition?.dir === "left" ? `6px solid` : "6px solid transparent",
      borderRight: trianglePosition?.dir === "left" ? "none" : trianglePosition?.dir === "right" ? `6px solid` : "6px solid transparent",
      borderTop: trianglePosition?.dir === "down" ? "none" : trianglePosition?.dir === "up" ? `6px solid` : "6px solid transparent",
      borderBottom: trianglePosition?.dir === "up" ? "none" : trianglePosition?.dir === "down" ? `6px solid` : "6px solid transparent",
      transform: trianglePosition?.dir === "left" || trianglePosition?.dir === "right" ? "translateY(-50%)" : "translateX(-50%)"
    }
  }
));
var Popup_default = Popup;
var PopupButton = ({ showTooltip, tooltipText, Icon, onClick }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick2 = () => {
    setButtonClicked(true);
    onClick();
  };
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "lg:tooltip lg:tooltip-bottom",
      "data-tip": !buttonClicked && showTooltip ? tooltipText : null
    },
    /* @__PURE__ */ React43__default.createElement(
      "button",
      {
        onClick: handleClick2,
        className: "flex h-8 min-h-8 w-8 items-center justify-center p-0"
      },
      /* @__PURE__ */ React43__default.createElement(Icon, null)
    )
  );
};
var PopupButton_default = PopupButton;
var styles = ["highlight", "underline", "squiggly"];
var colors = ["red", "violet", "blue", "green", "yellow"];
var HighlightOptions = ({
  style,
  isVertical,
  selectedStyle: _selectedStyle,
  selectedColor: _selectedColor,
  onHandleHighlight
}) => {
  const { settings, setSettings } = useSettingsStore();
  const globalReadSettings = settings.globalReadSettings;
  const [selectedStyle, setSelectedStyle] = React43__default.useState(_selectedStyle);
  const [selectedColor, setSelectedColor] = React43__default.useState(_selectedColor);
  const size16 = useResponsiveSize(16);
  const size18 = useResponsiveSize(18);
  const size28 = useResponsiveSize(28);
  const handleSelectStyle = (style2) => {
    globalReadSettings.highlightStyle = style2;
    setSettings(settings);
    setSelectedStyle(style2);
    setSelectedColor(globalReadSettings.highlightStyles[style2]);
    onHandleHighlight(true);
  };
  const handleSelectColor = (color) => {
    globalReadSettings.highlightStyle = selectedStyle;
    globalReadSettings.highlightStyles[selectedStyle] = color;
    setSettings(settings);
    setSelectedColor(color);
    onHandleHighlight(true);
  };
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "highlight-options absolute flex items-center justify-between",
        isVertical ? "flex-col" : "flex-row"
      ),
      style
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8("flex gap-2", isVertical ? "flex-col" : "flex-row"),
        style: isVertical ? { width: size28 } : { height: size28 }
      },
      styles.map((style2) => /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          key: style2,
          onClick: () => handleSelectStyle(style2),
          className: "flex items-center justify-center rounded-full bg-gray-700 p-0",
          style: { width: size28, height: size28, minHeight: size28 }
        },
        /* @__PURE__ */ React43__default.createElement(
          "div",
          {
            style: { width: size16, height: style2 === "squiggly" ? size18 : size16 },
            className: clsx8(
              "w-4 p-0 text-center leading-none",
              style2 === "highlight" && (selectedStyle === "highlight" ? `bg-${selectedColor}-400` : `bg-gray-300`),
              (style2 === "underline" || style2 === "squiggly") && "text-gray-300 underline decoration-2",
              style2 === "underline" && (selectedStyle === "underline" ? `decoration-${selectedColor}-400` : `decoration-gray-300`),
              style2 === "squiggly" && (selectedStyle === "squiggly" ? `decoration-wavy decoration-${selectedColor}-400` : `decoration-gray-300 decoration-wavy`)
            )
          },
          "A"
        )
      ))
    ),
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "flex items-center justify-center gap-2 rounded-3xl bg-gray-700",
          isVertical ? "flex-col py-2" : "flex-row px-2"
        ),
        style: isVertical ? { width: size28 } : { height: size28 }
      },
      colors.map((color) => /* @__PURE__ */ React43__default.createElement(
        "button",
        {
          key: color,
          onClick: () => handleSelectColor(color),
          style: { width: size16, height: size16 },
          className: clsx8(`rounded-full p-0`, selectedColor !== color && `bg-${color}-400`)
        },
        selectedColor === color && /* @__PURE__ */ React43__default.createElement(FaCheckCircle, { size: size16, className: clsx8(`fill-${color}-400`) })
      ))
    )
  );
};
var HighlightOptions_default = HighlightOptions;

// src/app/reader/components/annotator/AnnotationPopup.tsx
var OPTIONS_HEIGHT_PIX = 28;
var OPTIONS_PADDING_PIX = 16;
var AnnotationPopup = ({
  dir,
  isVertical,
  buttons,
  position,
  trianglePosition,
  highlightOptionsVisible,
  selectedStyle,
  selectedColor,
  popupWidth: popupWidth2,
  popupHeight: popupHeight2,
  onHighlight
}) => {
  const highlightOptionsHeightPx = useResponsiveSize(OPTIONS_HEIGHT_PIX);
  const highlightOptionsPaddingPx = useResponsiveSize(OPTIONS_PADDING_PIX);
  return /* @__PURE__ */ React43__default.createElement("div", { dir }, /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      width: isVertical ? popupHeight2 : popupWidth2,
      height: isVertical ? popupWidth2 : popupHeight2,
      position,
      trianglePosition,
      className: "selection-popup bg-gray-600 text-white",
      triangleClassName: "text-gray-600"
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: clsx8(
          "selection-buttons flex items-center justify-between p-2",
          isVertical ? "flex-col" : "flex-row"
        ),
        style: {
          height: isVertical ? popupWidth2 : popupHeight2
        }
      },
      buttons.map((button, index) => /* @__PURE__ */ React43__default.createElement(
        PopupButton_default,
        {
          key: index,
          showTooltip: !highlightOptionsVisible,
          tooltipText: button.tooltipText,
          Icon: button.Icon,
          onClick: button.onClick
        }
      ))
    )
  ), highlightOptionsVisible && /* @__PURE__ */ React43__default.createElement(
    HighlightOptions_default,
    {
      isVertical,
      style: {
        width: `${isVertical ? popupHeight2 : popupWidth2}px`,
        height: `${isVertical ? popupWidth2 : popupHeight2}px`,
        ...isVertical ? {
          left: `${position.point.x + (highlightOptionsHeightPx + highlightOptionsPaddingPx) * (trianglePosition.dir === "left" ? -1 : 1)}px`,
          top: `${position.point.y}px`
        } : {
          left: `${position.point.x}px`,
          top: `${position.point.y + (highlightOptionsHeightPx + highlightOptionsPaddingPx) * (trianglePosition.dir === "up" ? -1 : 1)}px`
        }
      },
      selectedStyle,
      selectedColor,
      onHandleHighlight: onHighlight
    }
  ));
};
var AnnotationPopup_default = AnnotationPopup;
var WiktionaryPopup = ({
  word,
  lang,
  position,
  trianglePosition,
  popupWidth: popupWidth2,
  popupHeight: popupHeight2
}) => {
  const [lookupWord, setLookupWord] = useState(word);
  const isLookingUp = useRef(false);
  const interceptDictLinks = (definition) => {
    const container = document.createElement("div");
    container.innerHTML = definition;
    const links = container.querySelectorAll('a[rel="mw:WikiLink"]');
    links.forEach((link) => {
      const title = link.getAttribute("title");
      if (title) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          setLookupWord(title);
          isLookingUp.current = false;
        });
        link.className = "text-primary underline cursor-pointer";
      }
    });
    return Array.from(container.childNodes);
  };
  useEffect(() => {
    if (isLookingUp.current) {
      return;
    }
    isLookingUp.current = true;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const fetchDefinitions = async (word2, language) => {
      main.innerHTML = "";
      footer.dataset["state"] = "loading";
      try {
        const response = await fetch(
          `https://en.wiktionary.org/api/rest_v1/page/definition/${word2}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch definitions");
        }
        const json = await response.json();
        const results = language ? json[language] || json["en"] : json[Object.keys(json)[0]];
        if (!results || results.length === 0) {
          throw new Error("No results found");
        }
        const hgroup = document.createElement("hgroup");
        const h1 = document.createElement("h1");
        h1.innerText = word2;
        h1.className = "text-lg font-bold";
        const p = document.createElement("p");
        p.innerText = results[0].language;
        p.className = "text-sm italic opacity-75";
        hgroup.append(h1, p);
        main.append(hgroup);
        results.forEach(({ partOfSpeech, definitions }) => {
          const h2 = document.createElement("h2");
          h2.innerText = partOfSpeech;
          h2.className = "text-base font-semibold mt-4";
          const ol = document.createElement("ol");
          ol.className = "pl-8 list-decimal";
          definitions.forEach(({ definition, examples }) => {
            if (!definition) return;
            const li = document.createElement("li");
            const processedContent = interceptDictLinks(definition);
            li.append(...processedContent);
            if (examples) {
              const ul = document.createElement("ul");
              ul.className = "pl-8 list-disc text-sm italic opacity-75";
              examples.forEach((example) => {
                const exampleLi = document.createElement("li");
                exampleLi.innerHTML = example;
                ul.appendChild(exampleLi);
              });
              li.appendChild(ul);
            }
            ol.appendChild(li);
          });
          main.appendChild(h2);
          main.appendChild(ol);
        });
        footer.dataset["state"] = "loaded";
      } catch (error) {
        console.error(error);
        footer.dataset["state"] = "error";
        const div = document.createElement("div");
        div.className = "flex flex-col items-center justify-center w-full h-full text-center absolute inset-0";
        const h1 = document.createElement("h1");
        h1.innerText = "Error";
        h1.className = "text-lg font-bold";
        const p = document.createElement("p");
        p.innerHTML = `Unable to load the word. Try searching directly on <a href="https://en.wiktionary.org/w/index.php?search=${encodeURIComponent(
          word2
        )}" target="_blank" rel="noopener noreferrer" class="text-primary underline">Wiktionary</a>.`;
        div.append(h1, p);
        main.append(div);
      }
    };
    const langCode = typeof lang === "string" ? lang : lang?.[0];
    fetchDefinitions(lookupWord, langCode);
  }, [lookupWord, lang]);
  return /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      trianglePosition,
      width: popupWidth2,
      height: popupHeight2,
      position,
      className: "select-text"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "flex h-full flex-col" }, /* @__PURE__ */ React43__default.createElement("main", { className: "flex-grow overflow-y-auto p-4 font-sans" }), /* @__PURE__ */ React43__default.createElement("footer", { className: "mt-auto hidden data-[state=loaded]:block data-[state=error]:hidden data-[state=loading]:hidden" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-4 py-2 text-sm opacity-60" }, "Source: Wiktionary (CC BY-SA)")))
  ));
};
var WiktionaryPopup_default = WiktionaryPopup;
var WikipediaPopup = ({
  text,
  lang,
  position,
  trianglePosition,
  popupWidth: popupWidth2,
  popupHeight: popupHeight2
}) => {
  const isLoading = useRef(false);
  useEffect(() => {
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const fetchSummary = async (query, language) => {
      main.innerHTML = "";
      footer.dataset["state"] = "loading";
      try {
        const response = await fetch(
          `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Wikipedia summary");
        }
        const data = await response.json();
        const hgroup = document.createElement("hgroup");
        hgroup.style.color = "white";
        hgroup.style.backgroundPosition = "center center";
        hgroup.style.backgroundSize = "cover";
        hgroup.style.backgroundColor = "rgba(0, 0, 0, .4)";
        hgroup.style.backgroundBlendMode = "darken";
        hgroup.style.borderRadius = "6px";
        hgroup.style.padding = "12px";
        hgroup.style.marginBottom = "12px";
        hgroup.style.minHeight = "100px";
        const h1 = document.createElement("h1");
        h1.innerHTML = data.titles.display;
        h1.className = "text-lg font-bold";
        hgroup.append(h1);
        if (data.description) {
          const description = document.createElement("p");
          description.innerText = data.description;
          hgroup.appendChild(description);
        }
        if (data.thumbnail) {
          hgroup.style.backgroundImage = `url("${data.thumbnail.source}")`;
        }
        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = data.extract_html;
        contentDiv.className = "p-2 text-sm";
        contentDiv.dir = data.dir;
        main.append(hgroup, contentDiv);
        footer.dataset["state"] = "loaded";
      } catch (error) {
        console.error(error);
        const errorDiv = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.innerText = "Error";
        const errorMsg = document.createElement("p");
        errorMsg.innerHTML = `Unable to load the article. Try searching directly on <a href="https://${language}.wikipedia.org/w/index.php?search=${encodeURIComponent(
          query
        )}" target="_blank" rel="noopener noreferrer" class="text-primary underline">Wikipedia</a>.`;
        errorDiv.append(h1, errorMsg);
        main.appendChild(errorDiv);
        footer.dataset["state"] = "error";
      }
    };
    const bookLang = typeof lang === "string" ? lang : lang?.[0];
    const langCode = bookLang ? bookLang.split("-")[0] : "en";
    fetchSummary(text, langCode);
  }, [text, lang]);
  return /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      width: popupWidth2,
      height: popupHeight2,
      position,
      trianglePosition,
      className: "select-text"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "text-base-content flex h-full flex-col pt-2" }, /* @__PURE__ */ React43__default.createElement("main", { className: "flex-grow overflow-y-auto px-2 font-sans" }), /* @__PURE__ */ React43__default.createElement("footer", { className: "mt-auto hidden data-[state=loaded]:block data-[state=error]:hidden data-[state=loading]:hidden" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-4 py-2 text-sm opacity-60" }, "Source: Wikipedia (CC BY-SA)")))
  ));
};
var WikipediaPopup_default = WikipediaPopup;
var LANGUAGES = {
  AUTO: "Auto Detect",
  EN: "English",
  DE: "German",
  FR: "French",
  ES: "Spanish",
  IT: "Italian",
  EL: "Greek",
  PT: "Portuguese",
  NL: "Dutch",
  PL: "Polish",
  UK: "Ukrainian",
  RU: "Russian",
  AR: "Arabic",
  TR: "Turkish",
  ID: "Indonesian",
  KO: "Korean",
  JA: "Japanese",
  "ZH-HANS": "Chinese (Simplified)",
  "ZH-HANT": "Chinese (Traditional)"
};
var DEEPL_API_ENDPOINT = "/api/deepl/translate";
var DeepLPopup = ({
  text,
  position,
  trianglePosition,
  popupWidth: popupWidth2,
  popupHeight: popupHeight2
}) => {
  const _ = useTranslation();
  const { settings, setSettings } = useSettingsStore();
  const [sourceLang, setSourceLang] = useState("AUTO");
  const [targetLang, setTargetLang] = useState(settings.globalReadSettings.translateTargetLang);
  const [translation, setTranslation] = useState(null);
  const [detectedSourceLang, setDetectedSourceLang] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSourceLangChange = (event) => {
    setSourceLang(event.target.value);
  };
  const handleTargetLangChange = (event) => {
    settings.globalReadSettings.translateTargetLang = event.target.value;
    setSettings(settings);
    setTargetLang(event.target.value);
  };
  useEffect(() => {
    const fetchTranslation = async () => {
      setLoading(true);
      setError(null);
      setTranslation(null);
      try {
        const response = await fetch(DEEPL_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: [text],
            target_lang: targetLang.toUpperCase(),
            source_lang: sourceLang === "AUTO" ? void 0 : sourceLang.toUpperCase()
          })
        });
        if (!response.ok) {
          throw new Error("Failed to fetch translation");
        }
        const data = await response.json();
        const translatedText = data.translations[0]?.text;
        const detectedSource = data.translations[0]?.detected_source_language;
        if (!translatedText) {
          throw new Error("No translation found");
        }
        if (sourceLang === "AUTO" && detectedSource) {
          setDetectedSourceLang(detectedSource);
        }
        setTranslation(translatedText);
      } catch (err) {
        console.error(err);
        setError(_("Unable to fetch the translation. Try again later."));
      } finally {
        setLoading(false);
      }
    };
    fetchTranslation();
  }, [text, sourceLang, targetLang]);
  return /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      trianglePosition,
      width: popupWidth2,
      height: popupHeight2,
      position,
      className: "select-text"
    },
    /* @__PURE__ */ React43__default.createElement("div", { className: "text-neutral-content relative h-[50%] overflow-y-auto border-b border-neutral-400/75 p-4 font-sans" }, /* @__PURE__ */ React43__default.createElement("div", { className: "mb-2 flex items-center justify-between" }, /* @__PURE__ */ React43__default.createElement("h1", { className: "text-base font-semibold" }, _("Original Text")), /* @__PURE__ */ React43__default.createElement(
      "select",
      {
        value: sourceLang,
        onChange: handleSourceLangChange,
        className: "select text-neutral-content h-8 min-h-8 rounded-md border-none bg-neutral-200/50 text-sm focus:outline-none focus:ring-0"
      },
      Object.entries(LANGUAGES).map(([code, name]) => {
        return /* @__PURE__ */ React43__default.createElement("option", { key: code, value: code }, detectedSourceLang && sourceLang === "AUTO" && code === "AUTO" ? `${LANGUAGES[detectedSourceLang] || detectedSourceLang} ` + _("(detected)") : name);
      })
    )), /* @__PURE__ */ React43__default.createElement("p", { className: "text-base" }, text)),
    /* @__PURE__ */ React43__default.createElement("div", { className: "text-neutral-content relative h-[50%] overflow-y-auto p-4 font-sans" }, /* @__PURE__ */ React43__default.createElement("div", { className: "mb-2 flex items-center justify-between" }, /* @__PURE__ */ React43__default.createElement("h2", { className: "text-base font-semibold" }, _("Translated Text")), /* @__PURE__ */ React43__default.createElement(
      "select",
      {
        value: targetLang,
        onChange: handleTargetLangChange,
        className: "select text-neutral-content h-8 min-h-8 rounded-md border-none bg-neutral-200/50 text-sm focus:outline-none focus:ring-0"
      },
      Object.entries(LANGUAGES).filter(([code]) => code !== "AUTO").map(([code, name]) => /* @__PURE__ */ React43__default.createElement("option", { key: code, value: code }, name))
    )), loading ? /* @__PURE__ */ React43__default.createElement("p", { className: "text-base italic text-gray-500" }, _("Loading...")) : error ? /* @__PURE__ */ React43__default.createElement("p", { className: "text-base text-red-600" }, error) : /* @__PURE__ */ React43__default.createElement("div", null, /* @__PURE__ */ React43__default.createElement("p", { className: "text-base" }, translation || "No translation available."), /* @__PURE__ */ React43__default.createElement("div", { className: "pt-4 text-sm opacity-60" }, "Translated by DeepL.")))
  ));
};
var DeepLPopup_default = DeepLPopup;

// src/app/reader/components/annotator/Annotator.tsx
var Annotator = ({ bookKey }) => {
  const _ = useTranslation();
  const { envConfig, appService } = useEnv();
  const { settings } = useSettingsStore();
  const { getConfig, saveConfig, getBookData, updateBooknotes } = useBookDataStore();
  const { getProgress, getView, getViewsById, getViewSettings } = useReaderStore();
  const { setNotebookVisible, setNotebookNewAnnotation } = useNotebookStore();
  useNotesSync(bookKey);
  const osPlatform = getOSPlatform();
  const config = getConfig(bookKey);
  const progress = getProgress(bookKey);
  const bookData = getBookData(bookKey);
  const view = getView(bookKey);
  const viewSettings = getViewSettings(bookKey);
  const isShowingPopup = useRef(false);
  const isTextSelected = useRef(false);
  const isUpToShowPopup = useRef(false);
  const isTouchstarted = useRef(false);
  const [selection, setSelection] = useState();
  const [showAnnotPopup, setShowAnnotPopup] = useState(false);
  const [showWiktionaryPopup, setShowWiktionaryPopup] = useState(false);
  const [showWikipediaPopup, setShowWikipediaPopup] = useState(false);
  const [showDeepLPopup, setShowDeepLPopup] = useState(false);
  const [trianglePosition, setTrianglePosition] = useState();
  const [annotPopupPosition, setAnnotPopupPosition] = useState();
  const [dictPopupPosition, setDictPopupPosition] = useState();
  const [translatorPopupPosition, setTranslatorPopupPosition] = useState();
  const [highlightOptionsVisible, setHighlightOptionsVisible] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(
    settings.globalReadSettings.highlightStyle
  );
  const [selectedColor, setSelectedColor] = useState(
    settings.globalReadSettings.highlightStyles[selectedStyle]
  );
  const popupPadding2 = useResponsiveSize(10);
  const maxWidth = window.innerWidth - 2 * popupPadding2;
  const maxHeight = window.innerHeight - 2 * popupPadding2;
  const dictPopupWidth = Math.min(480, maxWidth);
  const dictPopupHeight = Math.min(300, maxHeight);
  const transPopupWidth = Math.min(480, maxWidth);
  const transPopupHeight = Math.min(360, maxHeight);
  const annotPopupWidth = Math.min(useResponsiveSize(300), maxWidth);
  const annotPopupHeight = useResponsiveSize(44);
  const androidSelectionHandlerHeight = 0;
  const onLoad = (event) => {
    const detail = event.detail;
    const { doc, index } = detail;
    const isValidSelection = (sel) => {
      return sel && sel.toString().trim().length > 0 && sel.rangeCount > 0;
    };
    const makeSelection = (sel, rebuildRange = false) => {
      isTextSelected.current = true;
      const range = sel.getRangeAt(0);
      if (rebuildRange) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
      setSelection({ key: bookKey, text: sel.toString(), range, index });
    };
    const makeSelectionOnIOS = (sel) => {
      isTextSelected.current = true;
      const range = sel.getRangeAt(0);
      setTimeout(() => {
        sel.removeAllRanges();
        setTimeout(() => {
          if (!isTextSelected.current) return;
          sel.addRange(range);
          setSelection({ key: bookKey, text: range.toString(), range, index });
        }, 40);
      }, 0);
    };
    const handleSelectionchange = () => {
      if (osPlatform === "ios" || appService?.isIOSApp) return;
      const sel = doc.getSelection();
      if (isValidSelection(sel)) {
        if (osPlatform === "android" && isTouchstarted.current) {
          makeSelection(sel, false);
        }
      } else if (!isUpToShowPopup.current) {
        isTextSelected.current = false;
        setShowAnnotPopup(false);
        setShowWiktionaryPopup(false);
        setShowWikipediaPopup(false);
        setShowDeepLPopup(false);
      }
    };
    const handlePointerup = () => {
      const sel = doc.getSelection();
      if (isValidSelection(sel)) {
        if (osPlatform === "ios" || appService?.isIOSApp) {
          makeSelectionOnIOS(sel);
        } else {
          makeSelection(sel, true);
        }
      }
    };
    const handleTouchstart = () => {
      isTouchstarted.current = true;
    };
    const handleTouchmove = () => {
      setShowAnnotPopup(false);
    };
    const handleTouchend = () => {
      isTouchstarted.current = false;
    };
    detail.doc?.addEventListener("pointerup", handlePointerup);
    detail.doc?.addEventListener("touchstart", handleTouchstart);
    detail.doc?.addEventListener("touchmove", handleTouchmove);
    detail.doc?.addEventListener("touchend", handleTouchend);
    detail.doc?.addEventListener("selectionchange", handleSelectionchange);
    if (appService?.isMobile) {
      detail.doc?.addEventListener("contextmenu", (event2) => {
        event2.preventDefault();
        event2.stopPropagation();
        return false;
      });
    }
  };
  const onDrawAnnotation = (event) => {
    const viewSettings2 = getViewSettings(bookKey);
    const detail = event.detail;
    const { draw, annotation, doc, range } = detail;
    const { style, color } = annotation;
    const hexColor = color ? HIGHLIGHT_COLOR_HEX[color] : color;
    if (style === "highlight") {
      draw(Overlayer.highlight, { color: hexColor });
    } else if (["underline", "squiggly"].includes(style)) {
      const { defaultView } = doc;
      const node = range.startContainer;
      const el = node.nodeType === 1 ? node : node.parentElement;
      const { writingMode, lineHeight, fontSize } = defaultView.getComputedStyle(el);
      const lineHeightValue = parseFloat(lineHeight) || viewSettings2.lineHeight * viewSettings2.defaultFontSize;
      const fontSizeValue = parseFloat(fontSize) || viewSettings2.defaultFontSize;
      const strokeWidth = style === "underline" ? 2 : 4;
      const padding = (lineHeightValue - fontSizeValue - strokeWidth) / 2;
      draw(Overlayer[style], { writingMode, color: hexColor, padding });
    }
  };
  const onShowAnnotation = (event) => {
    const detail = event.detail;
    const { value: cfi, index, range } = detail;
    const { booknotes = [] } = getConfig(bookKey);
    const annotations = booknotes.filter(
      (booknote) => booknote.type === "annotation" && !booknote.deletedAt
    );
    const annotation = annotations.find((annotation2) => annotation2.cfi === cfi);
    if (!annotation) return;
    const selection2 = { key: bookKey, annotated: true, text: annotation.text ?? "", range, index };
    isUpToShowPopup.current = true;
    setSelectedStyle(annotation.style);
    setSelectedColor(annotation.color);
    setSelection(selection2);
  };
  useFoliateEvents(view, { onLoad, onDrawAnnotation, onShowAnnotation });
  const handleDismissPopup = () => {
    setSelection(null);
    setShowAnnotPopup(false);
    setShowWiktionaryPopup(false);
    setShowWikipediaPopup(false);
    setShowDeepLPopup(false);
    isShowingPopup.current = false;
  };
  const handleDismissPopupAndSelection = () => {
    handleDismissPopup();
    view?.deselect();
    isTextSelected.current = false;
  };
  useEffect(() => {
    const handleSingleClick = () => {
      if (isUpToShowPopup.current) {
        isUpToShowPopup.current = false;
        return true;
      }
      if (isTextSelected.current) {
        handleDismissPopupAndSelection();
        return true;
      }
      if (showAnnotPopup || isShowingPopup.current) {
        handleDismissPopup();
        return true;
      }
      return false;
    };
    eventDispatcher.onSync("iframe-single-click", handleSingleClick);
    eventDispatcher.on("export-annotations", handleExportMarkdown);
    return () => {
      eventDispatcher.offSync("iframe-single-click", handleSingleClick);
      eventDispatcher.off("export-annotations", handleExportMarkdown);
    };
  }, []);
  useEffect(() => {
    setHighlightOptionsVisible(!!(selection && selection.annotated));
    if (selection && selection.text.trim().length > 0) {
      const gridFrame = document.querySelector(`#gridcell-${bookKey}`);
      if (!gridFrame) return;
      const rect = gridFrame.getBoundingClientRect();
      const triangPos = getPosition(selection.range, rect, popupPadding2, viewSettings.vertical);
      const annotPopupPos = getPopupPosition(
        triangPos,
        rect,
        viewSettings.vertical ? annotPopupHeight : annotPopupWidth,
        viewSettings.vertical ? annotPopupWidth : annotPopupHeight,
        popupPadding2
      );
      if (isTextSelected.current && annotPopupPos.dir === "down" && osPlatform === "android") {
        triangPos.point.y += androidSelectionHandlerHeight;
        annotPopupPos.point.y += androidSelectionHandlerHeight;
      }
      const dictPopupPos = getPopupPosition(
        triangPos,
        rect,
        dictPopupWidth,
        dictPopupHeight,
        popupPadding2
      );
      const transPopupPos = getPopupPosition(
        triangPos,
        rect,
        transPopupWidth,
        transPopupHeight,
        popupPadding2
      );
      if (triangPos.point.x == 0 || triangPos.point.y == 0) return;
      setShowAnnotPopup(true);
      setAnnotPopupPosition(annotPopupPos);
      setDictPopupPosition(dictPopupPos);
      setTranslatorPopupPosition(transPopupPos);
      setTrianglePosition(triangPos);
      isShowingPopup.current = true;
    }
  }, [selection, bookKey]);
  useEffect(() => {
    if (!progress) return;
    const { location } = progress;
    const start = CFI4.collapse(location);
    const end = CFI4.collapse(location, true);
    const { booknotes = [] } = config;
    const annotations = booknotes.filter(
      (item) => !item.deletedAt && item.type === "annotation" && item.style && CFI4.compare(item.cfi, start) >= 0 && CFI4.compare(item.cfi, end) <= 0
    );
    try {
      Promise.all(annotations.map((annotation) => view?.addAnnotation(annotation)));
    } catch (e) {
      console.error(e);
    }
  }, [progress]);
  const handleCopy = () => {
    if (!selection || !selection.text) return;
    eventDispatcher.dispatch("toast", {
      type: "info",
      message: _("Copied to notebook"),
      className: "whitespace-nowrap",
      timeout: 2e3
    });
    const { booknotes: annotations = [] } = config;
    if (selection) navigator.clipboard?.writeText(selection.text);
    const cfi = view?.getCFI(selection.index, selection.range);
    if (!cfi) return;
    const annotation = {
      id: uniqueId(),
      type: "excerpt",
      cfi,
      text: selection.text,
      note: "",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const existingIndex = annotations.findIndex(
      (annotation2) => annotation2.cfi === cfi && annotation2.type === "excerpt" && !annotation2.deletedAt
    );
    if (existingIndex !== -1) {
      annotations[existingIndex] = annotation;
    } else {
      annotations.push(annotation);
    }
    const updatedConfig = updateBooknotes(bookKey, annotations);
    if (updatedConfig) {
      saveConfig(envConfig, bookKey, updatedConfig, settings);
    }
    handleDismissPopupAndSelection();
    if (!appService?.isMobile) {
      setNotebookVisible(true);
    }
  };
  const handleHighlight = (update = false) => {
    if (!selection || !selection.text) return;
    setHighlightOptionsVisible(true);
    const { booknotes: annotations = [] } = config;
    const cfi = view?.getCFI(selection.index, selection.range);
    if (!cfi) return;
    const style = settings.globalReadSettings.highlightStyle;
    const color = settings.globalReadSettings.highlightStyles[style];
    const annotation = {
      id: uniqueId(),
      type: "annotation",
      cfi,
      style,
      color,
      text: selection.text,
      note: "",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const existingIndex = annotations.findIndex(
      (annotation2) => annotation2.cfi === cfi && annotation2.type === "annotation" && !annotation2.deletedAt
    );
    const views = getViewsById(bookKey.split("-")[0]);
    if (existingIndex !== -1) {
      views.forEach((view2) => view2?.addAnnotation(annotation, true));
      if (update) {
        annotation.id = annotations[existingIndex].id;
        annotations[existingIndex] = annotation;
        views.forEach((view2) => view2?.addAnnotation(annotation));
      } else {
        annotations[existingIndex].deletedAt = Date.now();
        setShowAnnotPopup(false);
      }
    } else {
      annotations.push(annotation);
      views.forEach((view2) => view2?.addAnnotation(annotation));
      setSelection({ ...selection, annotated: true });
    }
    const updatedConfig = updateBooknotes(bookKey, annotations);
    if (updatedConfig) {
      saveConfig(envConfig, bookKey, updatedConfig, settings);
    }
  };
  const handleAnnotate = () => {
    if (!selection || !selection.text) return;
    const { sectionHref: href } = progress;
    selection.href = href;
    handleHighlight(true);
    setNotebookVisible(true);
    setNotebookNewAnnotation(selection);
    handleDismissPopup();
  };
  const handleSearch = () => {
    if (!selection || !selection.text) return;
    setShowAnnotPopup(false);
    eventDispatcher.dispatch("search", { term: selection.text });
  };
  const handleDictionary = () => {
    if (!selection || !selection.text) return;
    setShowAnnotPopup(false);
    setShowWiktionaryPopup(true);
  };
  const handleWikipedia = () => {
    if (!selection || !selection.text) return;
    setShowAnnotPopup(false);
    setShowWikipediaPopup(true);
  };
  const handleTranslation = () => {
    if (!selection || !selection.text) return;
    setShowAnnotPopup(false);
    setShowDeepLPopup(true);
  };
  const handleSpeakText = async () => {
    if (!selection || !selection.text) return;
    setShowAnnotPopup(false);
    eventDispatcher.dispatch("tts-speak", { bookKey, range: selection.range });
  };
  const handleExportMarkdown = (event) => {
    const { bookKey: exportBookKey } = event.detail;
    if (bookKey !== exportBookKey) return;
    const { bookDoc, book } = bookData;
    if (!bookDoc || !book || !bookDoc.toc) return;
    const config2 = getConfig(bookKey);
    const { booknotes: allNotes = [] } = config2;
    const booknotes = allNotes.filter((note) => !note.deletedAt);
    if (booknotes.length === 0) {
      eventDispatcher.dispatch("toast", {
        type: "info",
        message: _("No annotations to export"),
        className: "whitespace-nowrap",
        timeout: 2e3
      });
      return;
    }
    const booknoteGroups = {};
    for (const booknote of booknotes) {
      const tocItem = findTocItemBS(bookDoc.toc ?? [], booknote.cfi);
      const href = tocItem?.href || "";
      const label = tocItem?.label || "";
      const id = tocItem?.id || 0;
      if (!booknoteGroups[href]) {
        booknoteGroups[href] = { id, href, label, booknotes: [] };
      }
      booknoteGroups[href].booknotes.push(booknote);
    }
    Object.values(booknoteGroups).forEach((group) => {
      group.booknotes.sort((a2, b) => {
        return CFI4.compare(a2.cfi, b.cfi);
      });
    });
    const sortedGroups = Object.values(booknoteGroups).sort((a2, b) => {
      return a2.id - b.id;
    });
    const lines = [];
    lines.push(`# ${book.title}`);
    lines.push(`**${_("Author")}**: ${book.author || ""}`);
    lines.push("");
    lines.push(`**${_("Exported from Readest")}**: ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`);
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push(`## ${_("Highlights & Annotations")}`);
    lines.push("");
    for (const group of sortedGroups) {
      const chapterTitle = group.label || _("Untitled");
      lines.push(`### ${chapterTitle}`);
      for (const note of group.booknotes) {
        lines.push(`> "${note.text}"`);
        if (note.note) {
          lines.push(`**${_("Note")}**:: ${note.note}`);
        }
        lines.push("");
      }
      lines.push("---");
      lines.push("");
    }
    const markdownContent = lines.join("\n");
    navigator.clipboard?.writeText(markdownContent);
    eventDispatcher.dispatch("toast", {
      type: "info",
      message: _("Copied to clipboard"),
      className: "whitespace-nowrap",
      timeout: 2e3
    });
    if (appService?.isMobile) return;
    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.title.replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const selectionAnnotated = selection?.annotated;
  const buttons = [
    { tooltipText: _("Copy"), Icon: FiCopy, onClick: handleCopy },
    {
      tooltipText: selectionAnnotated ? _("Delete Highlight") : _("Highlight"),
      Icon: selectionAnnotated ? RiDeleteBinLine : PiHighlighterFill,
      onClick: handleHighlight
    },
    { tooltipText: _("Annotate"), Icon: BsPencilSquare, onClick: handleAnnotate },
    { tooltipText: _("Search"), Icon: FiSearch, onClick: handleSearch },
    { tooltipText: _("Dictionary"), Icon: TbHexagonLetterD, onClick: handleDictionary },
    { tooltipText: _("Wikipedia"), Icon: FaWikipediaW, onClick: handleWikipedia },
    { tooltipText: _("Translate"), Icon: BsTranslate, onClick: handleTranslation },
    { tooltipText: _("Speak"), Icon: FaHeadphones, onClick: handleSpeakText }
  ];
  return /* @__PURE__ */ React43__default.createElement("div", null, showWiktionaryPopup && trianglePosition && dictPopupPosition && /* @__PURE__ */ React43__default.createElement(
    WiktionaryPopup_default,
    {
      word: selection?.text,
      lang: bookData.bookDoc?.metadata.language,
      position: dictPopupPosition,
      trianglePosition,
      popupWidth: dictPopupWidth,
      popupHeight: dictPopupHeight
    }
  ), showWikipediaPopup && trianglePosition && dictPopupPosition && /* @__PURE__ */ React43__default.createElement(
    WikipediaPopup_default,
    {
      text: selection?.text,
      lang: bookData.bookDoc?.metadata.language,
      position: dictPopupPosition,
      trianglePosition,
      popupWidth: dictPopupWidth,
      popupHeight: dictPopupHeight
    }
  ), showDeepLPopup && trianglePosition && translatorPopupPosition && /* @__PURE__ */ React43__default.createElement(
    DeepLPopup_default,
    {
      text: selection?.text,
      position: translatorPopupPosition,
      trianglePosition,
      popupWidth: transPopupWidth,
      popupHeight: transPopupHeight
    }
  ), showAnnotPopup && trianglePosition && annotPopupPosition && /* @__PURE__ */ React43__default.createElement(
    AnnotationPopup_default,
    {
      dir: viewSettings.rtl ? "rtl" : "ltr",
      isVertical: viewSettings.vertical,
      buttons,
      position: annotPopupPosition,
      trianglePosition,
      highlightOptionsVisible,
      selectedStyle,
      selectedColor,
      popupWidth: annotPopupWidth,
      popupHeight: annotPopupHeight,
      onHighlight: handleHighlight
    }
  ));
};
var Annotator_default = Annotator;
var popupWidth = 360;
var popupHeight = 88;
var popupPadding = 10;
var FootnotePopup = ({ bookKey, bookDoc }) => {
  const footnoteRef = useRef(null);
  const footnoteViewRef = useRef(null);
  const [trianglePosition, setTrianglePosition] = useState();
  const [popupPosition, setPopupPosition] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const { getView, getViewSettings } = useReaderStore();
  const view = getView(bookKey);
  const viewSettings = getViewSettings(bookKey);
  const footnoteHandler = new FootnoteHandler();
  const [gridRect, setGridRect] = useState(null);
  const [responsiveWidth, setResponsiveWidth] = useState(popupWidth);
  const [responsiveHeight, setResponsiveHeight] = useState(popupHeight);
  const getResponsivePopupSize = (size, isVertical) => {
    const maxSize = isVertical ? window.innerWidth / 2 : window.innerHeight / 2;
    return Math.min(size, maxSize - popupPadding - 12);
  };
  useEffect(() => {
    const handleBeforeRender = (e) => {
      const detail = e.detail;
      const { view: view2 } = detail;
      view2.addEventListener("link", (e2) => {
        e2.preventDefault();
        const { detail: popupLinkDetail } = e2;
        popupLinkDetail["follow"] = true;
        footnoteHandler.handle(bookDoc, e2)?.catch((err) => {
          console.warn(err);
          getView(bookKey)?.goTo(popupLinkDetail.href);
        });
      });
      footnoteViewRef.current = view2;
      footnoteRef.current?.replaceChildren(view2);
      const { renderer } = view2;
      renderer.setAttribute("flow", "scrolled");
      renderer.setAttribute("margin", "0px");
      renderer.setAttribute("gap", "0%");
      const viewSettings2 = getViewSettings(bookKey);
      const themeCode = getThemeCode();
      const popupTheme = { ...themeCode };
      const popupContainer = document.getElementById("popup-container");
      if (popupContainer) {
        const backgroundColor = getComputedStyle(popupContainer).backgroundColor;
        popupTheme.bg = backgroundColor;
      }
      const mainStyles = getStyles(viewSettings2, popupTheme);
      const footnoteStyles = getFootnoteStyles();
      renderer.setStyles?.(`${mainStyles}
${footnoteStyles}`);
    };
    const handleRender = (e) => {
      const detail = e.detail;
      const { view: view2 } = detail;
      view2.addEventListener("relocate", () => {
        const { renderer } = view2;
        const viewSettings2 = getViewSettings(bookKey);
        if (viewSettings2.vertical) {
          setResponsiveWidth(getResponsivePopupSize(renderer.viewSize, true));
        } else {
          setResponsiveHeight(getResponsivePopupSize(renderer.viewSize, false));
        }
        setShowPopup(true);
      });
    };
    footnoteHandler.addEventListener("before-render", handleBeforeRender);
    footnoteHandler.addEventListener("render", handleRender);
    return () => {
      footnoteHandler.removeEventListener("before-render", handleBeforeRender);
      footnoteHandler.removeEventListener("render", handleRender);
    };
  }, [view]);
  useEffect(() => {
    if (viewSettings.vertical) {
      setResponsiveWidth(popupHeight);
      setResponsiveHeight(Math.max(popupWidth, window.innerHeight / 4));
    } else {
      setResponsiveWidth(Math.max(popupWidth, window.innerWidth / 4));
      setResponsiveHeight(popupHeight);
    }
  }, [viewSettings]);
  useEffect(() => {
    if (trianglePosition && gridRect) {
      const popupPos = getPopupPosition(
        trianglePosition,
        gridRect,
        responsiveWidth,
        responsiveHeight,
        popupPadding
      );
      setPopupPosition(popupPos);
    }
  }, [trianglePosition, gridRect, responsiveWidth, responsiveHeight]);
  const docLinkHandler = async (event) => {
    const detail = event.detail;
    const gridFrame = document.querySelector(`#gridcell-${bookKey}`);
    if (!gridFrame) return;
    const rect = gridFrame.getBoundingClientRect();
    const viewSettings2 = getViewSettings(bookKey);
    const triangPos = getPosition(detail.a, rect, popupPadding, viewSettings2.vertical);
    setGridRect(rect);
    setTrianglePosition(triangPos);
    footnoteHandler.handle(bookDoc, event)?.catch((err) => {
      console.warn(err);
      const detail2 = event.detail;
      view?.goTo(detail2.href);
    });
  };
  const closePopup = () => {
    const view2 = footnoteRef.current?.querySelector("foliate-view");
    view2?.close();
    view2?.remove();
  };
  const handleDismissPopup = () => {
    closePopup();
    setGridRect(null);
    setPopupPosition(null);
    setTrianglePosition(null);
    setShowPopup(false);
  };
  const handleFootnotePopupEvent = (event) => {
    const { element, footnote } = event.detail;
    const gridFrame = document.querySelector(`#gridcell-${bookKey}`);
    if (!gridFrame) return;
    const rect = gridFrame.getBoundingClientRect();
    const viewSettings2 = getViewSettings(bookKey);
    const triangPos = getPosition(element, rect, popupPadding, viewSettings2.vertical);
    if (footnoteRef.current) {
      const elem = document.createElement("p");
      elem.textContent = footnote;
      elem.setAttribute("style", `padding: 1em; hanging-punctuation: allow-end last;`);
      elem.style.visibility = "hidden";
      if (viewSettings2.vertical) {
        elem.style.height = `${responsiveHeight}px`;
      } else {
        elem.style.width = `${responsiveWidth}px`;
      }
      document.body.appendChild(elem);
      const popupSize = elem.getBoundingClientRect();
      if (viewSettings2.vertical) {
        setResponsiveWidth(getResponsivePopupSize(popupSize.width, true));
      } else {
        setResponsiveHeight(getResponsivePopupSize(popupSize.height, false));
      }
      document.body.removeChild(elem);
      elem.style.visibility = "visible";
      footnoteRef.current.replaceChildren(elem);
      setGridRect(rect);
      setTrianglePosition(triangPos);
      setShowPopup(true);
    }
  };
  useFoliateEvents(view, {
    onLinkClick: docLinkHandler
  });
  useEffect(() => {
    window.addEventListener("resize", handleDismissPopup);
    eventDispatcher.on("footnote-popup", handleFootnotePopupEvent);
    return () => {
      window.removeEventListener("resize", handleDismissPopup);
      eventDispatcher.off("footnote-popup", handleFootnotePopupEvent);
    };
  }, []);
  useEffect(() => {
    if (footnoteViewRef.current) {
      footnoteRef.current?.replaceChildren(footnoteViewRef.current);
    }
  }, [footnoteRef]);
  return /* @__PURE__ */ React43__default.createElement("div", null, showPopup && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "fixed inset-0",
      onClick: handleDismissPopup,
      onContextMenu: handleDismissPopup
    }
  ), /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      width: responsiveWidth,
      height: responsiveHeight,
      position: showPopup ? popupPosition : void 0,
      trianglePosition: showPopup ? trianglePosition : void 0,
      className: "select-text overflow-y-auto"
    },
    /* @__PURE__ */ React43__default.createElement(
      "div",
      {
        className: "",
        ref: footnoteRef,
        style: {
          width: `${responsiveWidth}px`,
          height: `${responsiveHeight}px`
        }
      }
    )
  ));
};
var FootnotePopup_default = FootnotePopup;
var HintInfo = ({
  bookKey,
  showDoubleBorder,
  isVertical,
  horizontalGap,
  verticalMargin
}) => {
  const [hintMessage, setHintMessage] = React43__default.useState(null);
  const hintTimeout = useRef(2e3);
  const dismissTimeout = useRef(null);
  const handleShowHint = (event) => {
    const { message, bookKey: hintBookKey, timeout = 2e3 } = event.detail;
    if (hintBookKey !== bookKey) return;
    setHintMessage(message);
    hintTimeout.current = timeout;
  };
  useEffect(() => {
    eventDispatcher.on("hint", handleShowHint);
    return () => {
      eventDispatcher.off("hint", handleShowHint);
    };
  }, []);
  useEffect(() => {
    if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
    dismissTimeout.current = setTimeout(() => setHintMessage(""), hintTimeout.current);
    return () => {
      if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
    };
  }, [hintMessage]);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "hintinfo absolute flex items-center justify-end overflow-hidden",
        hintMessage ? "bg-base-100" : "bg-transparent",
        isVertical ? "writing-vertical-rl max-h-[50%]" : "top-0 h-[44px] max-w-[50%]"
      ),
      style: isVertical ? {
        bottom: `${verticalMargin * 1.5}px`,
        left: `calc(100% - ${horizontalGap}%)`,
        width: showDoubleBorder ? "30px" : `${horizontalGap}%`
      } : { insetInlineEnd: `${horizontalGap}%` }
    },
    /* @__PURE__ */ React43__default.createElement("h2", { className: clsx8("text-neutral-content text-center font-sans text-xs font-light") }, hintMessage || "")
  );
};
var HintInfo_default = HintInfo;

// src/app/reader/components/DoubleBorder.tsx
var paddingPx = 10;
var DoubleBorder = ({
  borderColor,
  horizontalGap,
  verticalMargin,
  showHeader,
  showFooter
}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "borderframe pointer-events-none absolute",
      style: {
        border: `4px solid ${borderColor}`,
        height: `calc(100% - ${verticalMargin * 2}px + ${paddingPx * 2}px)`,
        top: `calc(${verticalMargin}px - ${paddingPx}px)`,
        left: `calc(${horizontalGap}% - ${showFooter ? 32 : 0}px - ${paddingPx}px)`,
        right: `calc(${horizontalGap}% - ${showHeader ? 32 : 0}px - ${paddingPx}px)`
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "borderframe pointer-events-none absolute",
      style: {
        border: `1px solid ${borderColor}`,
        height: `calc(100% - ${verticalMargin * 2}px)`,
        top: `${verticalMargin}px`,
        left: showFooter ? `${horizontalGap}%` : `calc(${horizontalGap}%)`,
        right: showHeader ? `${horizontalGap}%` : `calc(${horizontalGap}%)`
      }
    }
  ), showFooter && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "borderframe pointer-events-none absolute",
      style: {
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
        width: "32px",
        height: `calc(100% - ${verticalMargin * 2}px)`,
        top: `${verticalMargin}px`,
        left: `calc(${horizontalGap}% - 32px)`
      }
    }
  ), showHeader && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "borderframe pointer-events-none absolute",
      style: {
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        width: "32px",
        height: `calc(100% - ${verticalMargin * 2}px)`,
        top: `${verticalMargin}px`,
        left: `calc(100% - ${horizontalGap}%)`
      }
    }
  ));
};
var DoubleBorder_default = DoubleBorder;

// src/app/reader/components/BooksGrid.tsx
var BooksGrid = ({ bookKeys, onCloseBook }) => {
  const { appService } = useEnv();
  const { getConfig, getBookData } = useBookDataStore();
  const { getProgress, getViewState, getViewSettings, hoveredBookKey } = useReaderStore();
  const { isSideBarVisible, sideBarBookKey } = useSidebarStore();
  const { isFontLayoutSettingsDialogOpen, setFontLayoutSettingsDialogOpen } = useSettingsStore();
  const gridTemplate = grid_default(bookKeys.length, window.innerWidth / window.innerHeight);
  useEffect(() => {
    if (!sideBarBookKey) return;
    const bookData = getBookData(sideBarBookKey);
    if (!bookData || !bookData.book) return;
    document.title = bookData.book.title;
  }, [sideBarBookKey]);
  return /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: clsx8(
        "grid h-full flex-grow",
        appService?.hasSafeAreaInset && "pt-[env(safe-area-inset-top)]"
      ),
      style: {
        gridTemplateColumns: gridTemplate.columns,
        gridTemplateRows: gridTemplate.rows
      }
    },
    bookKeys.map((bookKey, index) => {
      const bookData = getBookData(bookKey);
      const config = getConfig(bookKey);
      const progress = getProgress(bookKey);
      const viewSettings = getViewSettings(bookKey);
      const { book, bookDoc } = bookData || {};
      if (!book || !config || !bookDoc || !viewSettings) return null;
      const { section, pageinfo, sectionLabel } = progress || {};
      const isBookmarked = getViewState(bookKey)?.ribbonVisible;
      const horizontalGapPercent = viewSettings.gapPercent;
      const verticalMarginPixels = viewSettings.marginPx;
      return /* @__PURE__ */ React43__default.createElement(
        "div",
        {
          id: `gridcell-${bookKey}`,
          key: bookKey,
          className: clsx8(
            "relative h-full w-full overflow-hidden",
            !isSideBarVisible && appService?.hasRoundedWindow && "rounded-window"
          )
        },
        isBookmarked && !hoveredBookKey && /* @__PURE__ */ React43__default.createElement(Ribbon_default, { width: `${horizontalGapPercent}%` }),
        /* @__PURE__ */ React43__default.createElement(
          HeaderBar_default,
          {
            bookKey,
            bookTitle: book.title,
            isTopLeft: index === 0,
            isHoveredAnim: bookKeys.length > 2,
            onCloseBook,
            onSetSettingsDialogOpen: setFontLayoutSettingsDialogOpen
          }
        ),
        /* @__PURE__ */ React43__default.createElement(FoliateViewer_default, { bookKey, bookDoc, config }),
        viewSettings.vertical && viewSettings.scrolled && /* @__PURE__ */ React43__default.createElement(React43__default.Fragment, null, /* @__PURE__ */ React43__default.createElement(
          "div",
          {
            className: "bg-base-100 absolute left-0 top-0 h-full",
            style: {
              width: `calc(${horizontalGapPercent}%)`,
              height: `calc(100% - ${verticalMarginPixels}px)`
            }
          }
        ), /* @__PURE__ */ React43__default.createElement(
          "div",
          {
            className: "bg-base-100 absolute right-0 top-0 h-full",
            style: {
              width: `calc(${horizontalGapPercent}%)`,
              height: `calc(100% - ${verticalMarginPixels}px)`
            }
          }
        )),
        viewSettings.vertical && viewSettings.doubleBorder && /* @__PURE__ */ React43__default.createElement(
          DoubleBorder_default,
          {
            showHeader: viewSettings.showHeader,
            showFooter: viewSettings.showFooter,
            borderColor: viewSettings.borderColor,
            horizontalGap: horizontalGapPercent,
            verticalMargin: verticalMarginPixels
          }
        ),
        viewSettings.showHeader && /* @__PURE__ */ React43__default.createElement(
          SectionInfo_default,
          {
            section: sectionLabel,
            showDoubleBorder: viewSettings.vertical && viewSettings.doubleBorder,
            isScrolled: viewSettings.scrolled,
            isVertical: viewSettings.vertical,
            horizontalGap: horizontalGapPercent,
            verticalMargin: verticalMarginPixels
          }
        ),
        /* @__PURE__ */ React43__default.createElement(
          HintInfo_default,
          {
            bookKey,
            showDoubleBorder: viewSettings.vertical && viewSettings.doubleBorder,
            isVertical: viewSettings.vertical,
            horizontalGap: horizontalGapPercent,
            verticalMargin: verticalMarginPixels
          }
        ),
        viewSettings.showFooter && /* @__PURE__ */ React43__default.createElement(
          PageInfo_default,
          {
            bookFormat: book.format,
            section,
            pageinfo,
            showDoubleBorder: viewSettings.vertical && viewSettings.doubleBorder,
            isScrolled: viewSettings.scrolled,
            isVertical: viewSettings.vertical,
            horizontalGap: horizontalGapPercent,
            verticalMargin: verticalMarginPixels
          }
        ),
        /* @__PURE__ */ React43__default.createElement(Annotator_default, { bookKey }),
        /* @__PURE__ */ React43__default.createElement(FootnotePopup_default, { bookKey, bookDoc }),
        /* @__PURE__ */ React43__default.createElement(
          FooterBar_default,
          {
            bookKey,
            bookFormat: book.format,
            section,
            pageinfo,
            isHoveredAnim: false
          }
        ),
        isFontLayoutSettingsDialogOpen && /* @__PURE__ */ React43__default.createElement(SettingsDialog_default, { bookKey, config })
      );
    })
  );
};
var BooksGrid_default = BooksGrid;

// src/services/tts/WebSpeechClient.ts
init_misc();

// src/utils/queue.ts
var AsyncQueue = class {
  queue = [];
  resolves = [];
  done = false;
  enqueue(item) {
    this.queue.push(item);
    if (this.resolves.length > 0) {
      const resolve = this.resolves.shift();
      resolve?.();
    }
  }
  finish() {
    this.done = true;
    while (this.resolves.length > 0) {
      const resolve = this.resolves.shift();
      resolve?.();
    }
  }
  async dequeue() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
    if (this.done) {
      return null;
    }
    return new Promise((resolve) => {
      this.resolves.push(() => {
        if (this.queue.length > 0) {
          resolve(this.queue.shift());
        } else {
          resolve(null);
        }
      });
    });
  }
};

// src/utils/ssml.ts
var parseSSMLMarks = (ssml) => {
  ssml = ssml.replace(/<speak[^>]*>/i, "");
  ssml = ssml.replace(/<\/speak>/i, "");
  const markRegex = /<mark\s+name="([^"]+)"\s*\/>/g;
  let plainText = "";
  const marks = [];
  let match;
  while ((match = markRegex.exec(ssml)) !== null) {
    const markTagEndIndex = markRegex.lastIndex;
    const nextMarkIndex = ssml.indexOf("<mark", markTagEndIndex);
    const nextChunk = ssml.slice(
      markTagEndIndex,
      nextMarkIndex !== -1 ? nextMarkIndex : ssml.length
    );
    const cleanedChunk = nextChunk.replace(/<[^>]+>/g, "").replace(/\r\n/g, "  ").replace(/\r/g, " ").replace(/\n/g, " ").trimStart();
    plainText += cleanedChunk;
    const offset = plainText.length - cleanedChunk.length;
    const markName = match[1];
    marks.push({ offset, name: markName, text: cleanedChunk });
  }
  return { plainText, marks };
};
var findSSMLMark = (charIndex, marks) => {
  let left = 0;
  let right = marks.length - 1;
  let result = null;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const mark = marks[mid];
    if (mark.offset <= charIndex) {
      result = mark;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
};
var parseSSMLLang = (ssml) => {
  const match = ssml.match(/xml:lang\s*=\s*"([^"]+)"/);
  if (/[\p{Script=Han}]/u.test(ssml)) {
    return "zh";
  } else if (match && match[1]) {
    const parts = match[1].split("-");
    return parts.length > 1 ? `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}` : parts[0].toLowerCase();
  }
  return null;
};

// src/services/tts/TTSUtils.ts
var TTSUtils = class {
  static LOCAL_STORAGE_KEY = "ttsPreferredVoices";
  static normalizeLanguage(language) {
    if (!language) return "n/a";
    return language.toLowerCase().slice(0, 2);
  }
  static setPreferredVoice(engine, language, voiceId) {
    if (!engine || !language || !voiceId) return;
    const preferences = this.getPreferences();
    const lang = this.normalizeLanguage(language);
    preferences[`${engine}-${lang}`] = voiceId;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(preferences));
  }
  static getPreferredVoice(engine, language) {
    const preferences = this.getPreferences();
    const lang = this.normalizeLanguage(language);
    return preferences[`${engine}-${lang}`] || null;
  }
  static getPreferences() {
    const storedPreferences = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedPreferences ? JSON.parse(storedPreferences) : {};
  }
};

// src/services/tts/WebSpeechClient.ts
var BLACKLISTED_VOICES = [
  "Albert",
  "Bad News",
  "Bahh",
  "Bells",
  "Boing",
  "Bubbles",
  "Cellos",
  "Eddy",
  "Flo",
  "Fred",
  "Good News",
  "Grandma",
  "Grandpa",
  "Jester",
  "Junior",
  "Kathy",
  "Organ",
  "Ralph",
  "Reed",
  "Rocko",
  "Sandy",
  "Shelley",
  "Superstar",
  "Trinoids",
  "Whisper",
  "Wobble",
  "Zarvox"
];
async function* speakWithBoundary(ssml, getRate, getPitch, getVoice) {
  const lang = parseSSMLLang(ssml);
  const { plainText, marks } = parseSSMLMarks(ssml);
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(plainText);
  utterance.rate = getRate();
  utterance.pitch = getPitch();
  const voice = getVoice();
  if (voice) {
    utterance.voice = voice;
  }
  if (lang) {
    utterance.lang = lang;
  }
  const queue = new AsyncQueue();
  utterance.onboundary = (event) => {
    utterance.rate = getRate();
    utterance.pitch = getPitch();
    const voice2 = getVoice();
    if (voice2) {
      utterance.voice = voice2;
    }
    const mark = findSSMLMark(event.charIndex, marks);
    queue.enqueue({
      type: "boundary",
      speaking: true,
      name: event.name,
      mark: mark?.name ?? "",
      charIndex: event.charIndex,
      charLength: event.charLength
    });
  };
  utterance.onend = () => {
    queue.enqueue({ type: "end", speaking: false });
    queue.finish();
  };
  utterance.onerror = (event) => {
    queue.enqueue({ type: "error", speaking: false, error: event.error });
    queue.finish();
  };
  synth.speak(utterance);
  while (true) {
    const ev = await queue.dequeue();
    if (ev === null) {
      break;
    }
    yield ev;
  }
}
async function* speakWithMarks(ssml, getRate, getPitch, getVoice) {
  const { plainText, marks } = parseSSMLMarks(ssml);
  const lang = parseSSMLLang(ssml);
  const isCJK = (lang2) => {
    const cjkLangs = ["zh", "ja", "kr"];
    if (lang2 && cjkLangs.some((cjk) => lang2.startsWith(cjk))) return true;
    return /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(plainText);
  };
  if (!isCJK(lang)) {
    yield* speakWithBoundary(ssml, getRate, getPitch, getVoice);
    return;
  }
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  for (const mark of marks) {
    utterance.text = mark.text;
    utterance.rate = getRate();
    utterance.pitch = getPitch();
    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    if (lang) {
      utterance.lang = lang;
    }
    yield {
      type: "boundary",
      speaking: true,
      name: "sentence",
      mark: mark.name
    };
    const result = await new Promise((resolve) => {
      utterance.onend = () => resolve({ type: "end", speaking: false });
      utterance.onerror = (event) => resolve({
        type: "error",
        speaking: false,
        error: event.error
      });
      synth.speak(utterance);
    });
    yield result;
    if (result.type === "error") {
      break;
    }
  }
}
var WebSpeechClient = class {
  #rate = 1;
  #pitch = 1;
  #voice = null;
  #currentVoiceLang = "";
  #voices = [];
  #synth = window.speechSynthesis;
  available = true;
  async init() {
    if (!this.#synth) {
      this.available = false;
      return this.available;
    }
    await new Promise((resolve) => {
      const populateVoices = () => {
        this.#voices = this.#synth.getVoices();
        if (this.#voices.length > 0) {
          resolve();
        }
      };
      if (this.#synth.getVoices().length > 0) {
        populateVoices();
      } else if (this.#synth.onvoiceschanged !== void 0) {
        this.#synth.onvoiceschanged = populateVoices;
      } else {
        console.warn("Voiceschanged event not supported.");
        resolve();
      }
    });
    return this.available;
  }
  async *speak(ssml, signal, preload = false) {
    if (preload) return;
    const lang = parseSSMLLang(ssml) || "en";
    if (!this.#voice || this.#currentVoiceLang !== lang) {
      const preferredVoiceId = TTSUtils.getPreferredVoice("web-speech", lang);
      const preferredVoice = this.#voices.find((v) => v.voiceURI === preferredVoiceId);
      const voiceId = (await this.getVoices(lang))[0]?.id ?? "";
      this.#voice = preferredVoice ? preferredVoice : this.#voices.find((v) => v.voiceURI === voiceId) || null;
      this.#currentVoiceLang = lang;
    }
    for await (const ev of speakWithMarks(
      ssml,
      () => this.#rate,
      () => this.#pitch,
      () => this.#voice
    )) {
      if (signal.aborted) {
        console.log("TTS aborted");
        yield { code: "error", message: "Aborted" };
        return;
      }
      if (ev.type === "boundary") {
        yield {
          code: "boundary",
          mark: ev.mark ?? "",
          message: `${ev.name ?? "Unknown"} ${ev.charIndex ?? 0}/${ev.charLength ?? 0}`
        };
      } else if (ev.type === "error") {
        yield { code: "error", message: ev.error ?? "Unknown error" };
      } else if (ev.type === "end") {
        yield { code: "end", message: "Speech finished" };
      }
    }
  }
  async pause() {
    this.#synth.pause();
  }
  async resume() {
    this.#synth.resume();
  }
  async stop() {
    this.#synth.cancel();
  }
  async setRate(rate) {
    this.#rate = rate;
  }
  async setPitch(pitch) {
    this.#pitch = pitch;
  }
  async setVoice(voiceId) {
    const selectedVoice = this.#voices.find((v) => v.voiceURI === voiceId);
    if (selectedVoice) {
      this.#voice = selectedVoice;
    }
  }
  async getAllVoices() {
    const voices = this.#voices.map((voice) => {
      return {
        id: voice.voiceURI,
        name: voice.name,
        lang: voice.lang,
        disabled: !this.available
      };
    });
    return voices;
  }
  async getVoices(lang) {
    if (this.#currentVoiceLang) {
      lang = this.#currentVoiceLang;
    }
    const locale = lang === "en" ? getUserLocale(lang) || lang : lang;
    const isValidVoice = (id) => {
      return !id.includes("com.apple") || id.includes("com.apple.voice.compact");
    };
    const isNotBlacklisted = (voice) => {
      return BLACKLISTED_VOICES.some((name) => voice.name.includes(name)) === false;
    };
    const filteredVoices = this.#voices.filter((voice) => voice.lang.startsWith(locale)).filter((voice) => isValidVoice(voice.voiceURI || "")).filter(isNotBlacklisted);
    const seenIds = /* @__PURE__ */ new Set();
    const voices = filteredVoices.map(
      (voice) => ({
        id: voice.voiceURI,
        name: voice.name,
        lang: voice.lang
      })
    ).filter((voice) => {
      if (seenIds.has(voice.id)) {
        return false;
      }
      seenIds.add(voice.id);
      return true;
    });
    voices.forEach((voice) => {
      voice.disabled = !this.available;
    });
    return voices;
  }
  getGranularities() {
    return ["sentence"];
  }
  getVoiceId() {
    return this.#voice?.voiceURI ?? "";
  }
};

// src/services/tts/EdgeTTSClient.ts
init_misc();

// src/libs/edgeTTS.ts
init_misc();

// src/utils/lru.ts
var LRUCache = class {
  capacity;
  map;
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("LRUCache capacity must be greater than 0");
    }
    this.capacity = capacity;
    this.map = /* @__PURE__ */ new Map();
  }
  get(key) {
    if (!this.map.has(key)) {
      return void 0;
    }
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size === this.capacity) {
      const oldestKey = this.map.keys().next().value;
      if (oldestKey) {
        this.map.delete(oldestKey);
      }
    }
    this.map.set(key, value);
  }
  has(key) {
    return this.map.has(key);
  }
  delete(key) {
    return this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
  size() {
    return this.map.size;
  }
  entries() {
    return Array.from(this.map).reverse();
  }
};

// src/libs/edgeTTS.ts
var EDGE_SPEECH_URL = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
var EDGE_API_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
var EDGE_TTS_VOICES = {
  "af-ZA": ["af-ZA-AdriNeural", "af-ZA-WillemNeural"],
  "am-ET": ["am-ET-AmehaNeural", "am-ET-MekdesNeural"],
  "ar-AE": ["ar-AE-FatimaNeural", "ar-AE-HamdanNeural"],
  "ar-BH": ["ar-BH-AliNeural", "ar-BH-LailaNeural"],
  "ar-DZ": ["ar-DZ-AminaNeural", "ar-DZ-IsmaelNeural"],
  "ar-EG": ["ar-EG-SalmaNeural", "ar-EG-ShakirNeural"],
  "ar-IQ": ["ar-IQ-BasselNeural", "ar-IQ-RanaNeural"],
  "ar-JO": ["ar-JO-SanaNeural", "ar-JO-TaimNeural"],
  "ar-KW": ["ar-KW-FahedNeural", "ar-KW-NouraNeural"],
  "ar-LB": ["ar-LB-LaylaNeural", "ar-LB-RamiNeural"],
  "ar-LY": ["ar-LY-ImanNeural", "ar-LY-OmarNeural"],
  "ar-MA": ["ar-MA-JamalNeural", "ar-MA-MounaNeural"],
  "ar-OM": ["ar-OM-AbdullahNeural", "ar-OM-AyshaNeural"],
  "ar-QA": ["ar-QA-AmalNeural", "ar-QA-MoazNeural"],
  "ar-SA": ["ar-SA-HamedNeural", "ar-SA-ZariyahNeural"],
  "ar-SY": ["ar-SY-AmanyNeural", "ar-SY-LaithNeural"],
  "ar-TN": ["ar-TN-HediNeural", "ar-TN-ReemNeural"],
  "ar-YE": ["ar-YE-MaryamNeural", "ar-YE-SalehNeural"],
  "az-AZ": ["az-AZ-BabekNeural", "az-AZ-BanuNeural"],
  "bg-BG": ["bg-BG-BorislavNeural", "bg-BG-KalinaNeural"],
  "bn-BD": ["bn-BD-NabanitaNeural", "bn-BD-PradeepNeural"],
  "bn-IN": ["bn-IN-BashkarNeural", "bn-IN-TanishaaNeural"],
  "bs-BA": ["bs-BA-GoranNeural", "bs-BA-VesnaNeural"],
  "ca-ES": ["ca-ES-EnricNeural", "ca-ES-JoanaNeural"],
  "cs-CZ": ["cs-CZ-AntoninNeural", "cs-CZ-VlastaNeural"],
  "cy-GB": ["cy-GB-AledNeural", "cy-GB-NiaNeural"],
  "da-DK": ["da-DK-ChristelNeural", "da-DK-JeppeNeural"],
  "de-AT": ["de-AT-IngridNeural", "de-AT-JonasNeural"],
  "de-CH": ["de-CH-JanNeural", "de-CH-LeniNeural"],
  "de-DE": [
    "de-DE-AmalaNeural",
    "de-DE-ConradNeural",
    "de-DE-FlorianMultilingualNeural",
    "de-DE-KatjaNeural",
    "de-DE-KillianNeural",
    "de-DE-SeraphinaMultilingualNeural"
  ],
  "el-GR": ["el-GR-AthinaNeural", "el-GR-NestorasNeural"],
  "en-AU": ["en-AU-NatashaNeural", "en-AU-WilliamNeural"],
  "en-CA": ["en-CA-ClaraNeural", "en-CA-LiamNeural"],
  "en-GB": [
    "en-GB-LibbyNeural",
    "en-GB-MaisieNeural",
    "en-GB-RyanNeural",
    "en-GB-SoniaNeural",
    "en-GB-ThomasNeural"
  ],
  "en-HK": ["en-HK-SamNeural", "en-HK-YanNeural"],
  "en-IE": ["en-IE-ConnorNeural", "en-IE-EmilyNeural"],
  "en-IN": ["en-IN-NeerjaExpressiveNeural", "en-IN-NeerjaNeural", "en-IN-PrabhatNeural"],
  "en-KE": ["en-KE-AsiliaNeural", "en-KE-ChilembaNeural"],
  "en-NG": ["en-NG-AbeoNeural", "en-NG-EzinneNeural"],
  "en-NZ": ["en-NZ-MitchellNeural", "en-NZ-MollyNeural"],
  "en-PH": ["en-PH-JamesNeural", "en-PH-RosaNeural"],
  "en-SG": ["en-SG-LunaNeural", "en-SG-WayneNeural"],
  "en-TZ": ["en-TZ-ElimuNeural", "en-TZ-ImaniNeural"],
  "en-US": [
    "en-US-AnaNeural",
    "en-US-AndrewMultilingualNeural",
    "en-US-AndrewNeural",
    "en-US-AriaNeural",
    "en-US-AvaMultilingualNeural",
    "en-US-AvaNeural",
    "en-US-BrianMultilingualNeural",
    "en-US-BrianNeural",
    "en-US-ChristopherNeural",
    "en-US-EmmaMultilingualNeural",
    "en-US-EmmaNeural",
    "en-US-EricNeural",
    "en-US-GuyNeural",
    "en-US-JennyNeural",
    "en-US-MichelleNeural",
    "en-US-RogerNeural",
    "en-US-SteffanNeural"
  ],
  "es-AR": ["es-AR-ElenaNeural", "es-AR-TomasNeural"],
  "es-BO": ["es-BO-MarceloNeural", "es-BO-SofiaNeural"],
  "es-CL": ["es-CL-CatalinaNeural", "es-CL-LorenzoNeural"],
  "es-CO": ["es-CO-GonzaloNeural", "es-CO-SalomeNeural"],
  "es-CR": ["es-CR-JuanNeural", "es-CR-MariaNeural"],
  "es-CU": ["es-CU-BelkysNeural", "es-CU-ManuelNeural"],
  "es-DO": ["es-DO-EmilioNeural", "es-DO-RamonaNeural"],
  "es-EC": ["es-EC-AndreaNeural", "es-EC-LuisNeural"],
  "es-ES": ["es-ES-AlvaroNeural", "es-ES-ElviraNeural", "es-ES-XimenaNeural"],
  "es-US": ["es-US-AlonsoNeural", "es-US-PalomaNeural"],
  "fr-BE": ["fr-BE-CharlineNeural", "fr-BE-GerardNeural"],
  "fr-CA": ["fr-CA-AntoineNeural", "fr-CA-JeanNeural", "fr-CA-SylvieNeural", "fr-CA-ThierryNeural"],
  "fr-CH": ["fr-CH-ArianeNeural", "fr-CH-FabriceNeural"],
  "fr-FR": [
    "fr-FR-DeniseNeural",
    "fr-FR-EloiseNeural",
    "fr-FR-HenriNeural",
    "fr-FR-RemyMultilingualNeural",
    "fr-FR-VivienneMultilingualNeural"
  ],
  "ja-JP": ["ja-JP-KeitaNeural", "ja-JP-NanamiNeural"],
  "ko-KR": ["ko-KR-HyunsuMultilingualNeural", "ko-KR-InJoonNeural", "ko-KR-SunHiNeural"],
  "pt-BR": ["pt-BR-AntonioNeural", "pt-BR-FranciscaNeural", "pt-BR-ThalitaMultilingualNeural"],
  "pt-PT": ["pt-PT-DuarteNeural", "pt-PT-RaquelNeural"],
  "zh-CN": [
    "zh-CN-XiaoxiaoNeural",
    "zh-CN-XiaoyiNeural",
    "zh-CN-YunjianNeural",
    "zh-CN-YunxiNeural",
    "zh-CN-YunxiaNeural",
    "zh-CN-YunyangNeural",
    "zh-CN-liaoning-XiaobeiNeural",
    "zh-CN-shaanxi-XiaoniNeural"
  ],
  "zh-HK": ["zh-HK-HiuGaaiNeural", "zh-HK-HiuMaanNeural", "zh-HK-WanLungNeural"],
  "zh-TW": ["zh-TW-HsiaoChenNeural", "zh-TW-HsiaoYuNeural", "zh-TW-YunJheNeural"]
};
var genVoiceList = (voices) => {
  return Object.entries(voices).flatMap(([lang, voices2]) => {
    return voices2.map((id) => {
      const name = id.replace(`${lang}-`, "").replace("Neural", "");
      return { name, id, lang };
    });
  });
};
var hashPayload = (payload) => {
  const base = JSON.stringify(payload);
  return md5(base);
};
var EdgeSpeechTTS = class _EdgeSpeechTTS {
  static voices = genVoiceList(EDGE_TTS_VOICES);
  static audioCache = new LRUCache(200);
  constructor() {
  }
  async #fetchEdgeSpeechWs({ lang, text, voice, rate }) {
    const connectId = randomMd5();
    const url = `${EDGE_SPEECH_URL}?ConnectionId=${connectId}&TrustedClientToken=${EDGE_API_TOKEN}`;
    const date = (/* @__PURE__ */ new Date()).toString();
    const configHeaders = {
      "Content-Type": "application/json; charset=utf-8",
      Path: "speech.config",
      "X-Timestamp": date
    };
    const contentHeaders = {
      "Content-Type": "application/ssml+xml",
      Path: "ssml",
      "X-RequestId": connectId,
      "X-Timestamp": date
    };
    const configContent = JSON.stringify({
      context: {
        synthesis: {
          audio: {
            metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: true },
            outputFormat: "audio-24khz-48kbitrate-mono-mp3"
          }
        }
      }
    });
    const genSSML = (lang2, text2, voice2, rate2) => {
      return `
        <speak version="1.0" xml:lang="${lang2}">
          <voice name="${voice2}">
            <prosody rate="${rate2}">
              ${text2}
            </prosody>
          </voice>
        </speak>
      `;
    };
    const genSendContent = (headerObj, content2) => {
      let header = "";
      for (const key of Object.keys(headerObj)) {
        header += `${key}: ${headerObj[key]}\r
`;
      }
      return `${header}\r
${content2}`;
    };
    const getHeadersAndData = (message) => {
      const lines = message.split("\n");
      const headers = {};
      let body = "";
      let lineIdx = 0;
      for (lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx].trim();
        if (!line) break;
        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) continue;
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        headers[key] = value;
      }
      for (lineIdx = lineIdx + 1; lineIdx < lines.length; lineIdx++) {
        body += lines[lineIdx] + "\n";
      }
      return { headers, body };
    };
    const ssml = genSSML(lang, text, voice, rate);
    const content = genSendContent(contentHeaders, ssml);
    const config = genSendContent(configHeaders, configContent);
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.binaryType = "arraybuffer";
      let audioData = new ArrayBuffer(0);
      ws.addEventListener("open", () => {
        ws.send(config);
        ws.send(content);
      });
      ws.addEventListener("message", (event) => {
        if (typeof event.data === "string") {
          const { headers } = getHeadersAndData(event.data);
          if (headers["Path"] === "turn.end") {
            ws.close();
            if (!audioData.byteLength) {
              return reject(new Error("No audio data received."));
            }
            const res = new Response(audioData);
            resolve(res);
          }
        } else if (event.data instanceof ArrayBuffer) {
          const dataView = new DataView(event.data);
          const headerLength = dataView.getInt16(0);
          if (event.data.byteLength > headerLength + 2) {
            const newBody = event.data.slice(2 + headerLength);
            const merged = new Uint8Array(audioData.byteLength + newBody.byteLength);
            merged.set(new Uint8Array(audioData), 0);
            merged.set(new Uint8Array(newBody), audioData.byteLength);
            audioData = merged.buffer;
          }
        }
      });
      ws.addEventListener("error", () => {
        ws.close();
        reject(new Error("WebSocket error occurred."));
      });
    });
  }
  async create(payload) {
    return this.#fetchEdgeSpeechWs(payload);
  }
  async createAudio(payload) {
    const cacheKey = hashPayload(payload);
    if (_EdgeSpeechTTS.audioCache.has(cacheKey)) {
      return new Blob([_EdgeSpeechTTS.audioCache.get(cacheKey)], { type: "audio/mpeg" });
    }
    try {
      const res = await this.create(payload);
      const arrayBuffer = await res.arrayBuffer();
      _EdgeSpeechTTS.audioCache.set(cacheKey, arrayBuffer);
      return new Blob([arrayBuffer], { type: "audio/mpeg" });
    } catch (error) {
      throw error;
    }
  }
};

// src/services/tts/EdgeTTSClient.ts
var EdgeTTSClient = class {
  #rate = 1;
  #pitch = 1;
  #voice = null;
  #currentVoiceLang = "";
  #voices = [];
  #edgeTTS;
  #audioElement = null;
  #isPlaying = false;
  #pausedAt = 0;
  #startedAt = 0;
  available = true;
  constructor() {
    this.#edgeTTS = new EdgeSpeechTTS();
  }
  async init() {
    this.#voices = EdgeSpeechTTS.voices;
    try {
      await this.#edgeTTS.create({
        lang: "en",
        text: "test",
        voice: "en-US-AriaNeural",
        rate: 1,
        pitch: 1
      });
      this.available = true;
    } catch {
      this.available = false;
    }
    return this.available;
  }
  getPayload = (lang, text, voiceId) => {
    return { lang, text, voice: voiceId, rate: this.#rate, pitch: this.#pitch };
  };
  async *speak(ssml, signal, preload = false) {
    const { marks } = parseSSMLMarks(ssml);
    const lang = parseSSMLLang(ssml) || "en";
    let voiceId = "en-US-AriaNeural";
    if (!this.#voice || this.#currentVoiceLang !== lang) {
      const preferredVoiceId = TTSUtils.getPreferredVoice("edge-tts", lang);
      const preferredVoice = this.#voices.find((v) => v.id === preferredVoiceId);
      this.#voice = preferredVoice ? preferredVoice : (await this.getVoices(lang))[0] || null;
      this.#currentVoiceLang = lang;
    }
    if (this.#voice) {
      voiceId = this.#voice.id;
    }
    if (preload) {
      const maxImmediate = 2;
      for (let i = 0; i < Math.min(maxImmediate, marks.length); i++) {
        const mark = marks[i];
        await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId)).catch((err) => {
          console.warn("Error preloading mark", i, err);
        });
      }
      if (marks.length > maxImmediate) {
        (async () => {
          for (let i = maxImmediate; i < marks.length; i++) {
            const mark = marks[i];
            try {
              await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId));
            } catch (err) {
              console.warn("Error preloading mark (bg)", i, err);
            }
          }
        })();
      }
      yield {
        code: "end",
        message: "Preload finished"
      };
      return;
    } else {
      await this.stopInternal();
    }
    for (const mark of marks) {
      if (signal.aborted) {
        yield {
          code: "error",
          message: "Aborted"
        };
        break;
      }
      try {
        const blob = await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId));
        const url = URL.createObjectURL(blob);
        this.#audioElement = new Audio(url);
        const audio = this.#audioElement;
        audio.setAttribute("x-webkit-airplay", "deny");
        audio.preload = "auto";
        yield {
          code: "boundary",
          message: `Start chunk: ${mark.name}`,
          mark: mark.name
        };
        const result = await new Promise((resolve) => {
          const cleanUp = () => {
            audio.onended = null;
            audio.onerror = null;
            audio.pause();
            audio.src = "";
            URL.revokeObjectURL(url);
          };
          audio.onended = () => {
            cleanUp();
            if (signal.aborted) {
              resolve({ code: "error", message: "Aborted" });
            } else {
              resolve({ code: "end", message: `Chunk finished: ${mark.name}` });
            }
          };
          audio.onerror = (e) => {
            cleanUp();
            console.warn("Audio playback error:", e);
            resolve({ code: "error", message: "Audio playback error" });
          };
          if (signal.aborted) {
            cleanUp();
            resolve({ code: "error", message: "Aborted" });
            return;
          }
          this.#isPlaying = true;
          audio.play().catch((err) => {
            cleanUp();
            console.error("Failed to play audio:", err);
            resolve({ code: "error", message: "Playback failed: " + err.message });
          });
        });
        yield result;
      } catch (error) {
        if (error instanceof Error && error.message === "No audio data received.") {
          console.warn("No audio data received for:", mark.text);
          yield {
            code: "end",
            message: `Chunk finished: ${mark.name}`
          };
          continue;
        }
        console.log("Error:", error);
        yield {
          code: "error",
          message: error instanceof Error ? error.message : String(error)
        };
        break;
      }
      await this.stopInternal();
    }
  }
  async pause() {
    if (!this.#isPlaying || !this.#audioElement) return;
    this.#pausedAt = this.#audioElement.currentTime - this.#startedAt;
    await this.#audioElement.pause();
    this.#isPlaying = false;
  }
  async resume() {
    if (this.#isPlaying || !this.#audioElement) return;
    await this.#audioElement.play();
    this.#isPlaying = true;
    this.#startedAt = this.#audioElement.currentTime - this.#pausedAt;
  }
  async stop() {
    await this.stopInternal();
  }
  async stopInternal() {
    this.#isPlaying = false;
    this.#pausedAt = 0;
    this.#startedAt = 0;
    if (this.#audioElement) {
      this.#audioElement.pause();
      this.#audioElement.currentTime = 0;
      if (this.#audioElement?.onended) {
        this.#audioElement.onended(new Event("stopped"));
      }
      if (this.#audioElement.src?.startsWith("blob:")) {
        URL.revokeObjectURL(this.#audioElement.src);
      }
      this.#audioElement.src = "";
      this.#audioElement = null;
    }
  }
  async setRate(rate) {
    this.#rate = rate;
  }
  async setPitch(pitch) {
    this.#pitch = pitch;
  }
  async setVoice(voice) {
    const selectedVoice = this.#voices.find((v) => v.id === voice);
    if (selectedVoice) {
      this.#voice = selectedVoice;
    }
  }
  async getAllVoices() {
    this.#voices.forEach((voice) => {
      voice.disabled = !this.available;
    });
    return this.#voices;
  }
  async getVoices(lang) {
    if (this.#currentVoiceLang) {
      lang = this.#currentVoiceLang;
    }
    const locale = lang === "en" ? getUserLocale(lang) || lang : lang;
    const voices = await this.getAllVoices();
    return voices.filter((v) => v.lang.startsWith(locale));
  }
  getGranularities() {
    return ["sentence"];
  }
  getVoiceId() {
    return this.#voice?.id || "";
  }
};

// src/services/tts/TTSController.ts
var TTSController = class extends EventTarget {
  state = "stopped";
  view;
  #nossmlCnt = 0;
  #currentSpeakAbortController = null;
  #currentSpeakPromise = null;
  ttsLang = "";
  ttsRate = 1;
  ttsClient;
  ttsWebClient;
  ttsEdgeClient;
  ttsWebVoices = [];
  ttsEdgeVoices = [];
  constructor(view) {
    super();
    this.ttsWebClient = new WebSpeechClient();
    this.ttsEdgeClient = new EdgeTTSClient();
    this.ttsClient = this.ttsWebClient;
    this.view = view;
  }
  async init() {
    await this.ttsWebClient.init();
    const success = await this.ttsEdgeClient.init();
    if (success) {
      this.ttsClient = this.ttsEdgeClient;
    } else {
      this.ttsClient = this.ttsWebClient;
    }
    this.ttsWebVoices = await this.ttsWebClient.getAllVoices();
    this.ttsEdgeVoices = await this.ttsEdgeClient.getAllVoices();
  }
  async initViewTTS() {
    let granularity = this.view.language.isCJK ? "sentence" : "word";
    const supportedGranularities = this.ttsClient.getGranularities();
    if (!supportedGranularities.includes(granularity)) {
      granularity = supportedGranularities[0];
    }
    await this.view.initTTS(granularity);
  }
  async preloadSSML(ssml) {
    if (!ssml) return;
    const iter = await this.ttsClient.speak(ssml, new AbortController().signal, true);
    for await (const _ of iter) ;
  }
  async preloadNextSSML(count = 2) {
    const tts = this.view.tts;
    if (!tts) return;
    let preloaded = 0;
    for (let i = 0; i < count; i++) {
      const ssml = this.#preprocessSSML(tts.next());
      this.preloadSSML(ssml);
      if (ssml) preloaded++;
    }
    for (let i = 0; i < preloaded; i++) {
      tts.prev();
    }
  }
  #preprocessSSML(ssml) {
    if (!ssml) return;
    ssml = ssml.replace(/[–—]/g, ",").replace(/\.{3,}/g, '<break time="400ms"/>').replace(/·/g, '<break time="200ms"/>');
    return ssml;
  }
  async #speak(ssml) {
    await this.stop();
    this.#currentSpeakAbortController = new AbortController();
    const { signal } = this.#currentSpeakAbortController;
    this.#currentSpeakPromise = new Promise(async (resolve, reject) => {
      try {
        console.log("TTS speak");
        this.state = "playing";
        ssml = this.#preprocessSSML(await ssml);
        await this.preloadSSML(ssml);
        if (!ssml) {
          this.#nossmlCnt++;
          if (this.#nossmlCnt < 10 && this.state === "playing") {
            resolve();
            await this.view.next(1);
            await this.forward();
          }
          return;
        } else {
          this.#nossmlCnt = 0;
        }
        const iter = await this.ttsClient.speak(ssml, signal);
        let lastCode = "boundary";
        for await (const { code, mark } of iter) {
          if (signal.aborted) {
            resolve();
            return;
          }
          if (mark && this.state === "playing") {
            this.view.tts?.setMark(mark);
          }
          lastCode = code;
        }
        if (lastCode === "end" && this.state === "playing") {
          resolve();
          await this.forward();
        }
        resolve();
      } catch (e) {
        if (signal.aborted) {
          resolve();
        } else {
          reject(e);
        }
      } finally {
        this.#currentSpeakAbortController = null;
        this.#currentSpeakPromise = null;
      }
    });
    await this.#currentSpeakPromise.catch((e) => this.error(e));
  }
  async speak(ssml) {
    await this.initViewTTS();
    this.#speak(ssml).catch((e) => this.error(e));
    this.preloadNextSSML();
  }
  play() {
    if (this.state !== "playing") {
      this.start();
    } else {
      this.pause();
    }
  }
  async start() {
    await this.initViewTTS();
    const ssml = this.state.includes("paused") ? this.view.tts?.resume() : this.view.tts?.start();
    if (this.state.includes("paused")) {
      this.resume();
    }
    this.#speak(ssml);
    this.preloadNextSSML();
  }
  async pause() {
    this.state = "paused";
    await this.ttsClient.pause().catch((e) => this.error(e));
  }
  async resume() {
    this.state = "playing";
    await this.ttsClient.resume().catch((e) => this.error(e));
  }
  async stop() {
    if (this.#currentSpeakAbortController) {
      this.#currentSpeakAbortController.abort();
    }
    await this.ttsClient.stop().catch((e) => this.error(e));
    if (this.#currentSpeakPromise) {
      await this.#currentSpeakPromise.catch((e) => this.error(e));
    }
    this.state = "stopped";
  }
  // goto previous sentence
  async backward() {
    await this.initViewTTS();
    if (this.state === "playing") {
      await this.stop();
      this.#speak(this.view.tts?.prev());
    } else {
      await this.stop();
      this.state = "backward-paused";
      this.view.tts?.prev(true);
    }
  }
  // goto next sentence
  async forward() {
    await this.initViewTTS();
    if (this.state === "playing") {
      await this.stop();
      this.#speak(this.view.tts?.next());
      this.preloadNextSSML();
    } else {
      await this.stop();
      this.state = "forward-paused";
      this.view.tts?.next(true);
    }
  }
  async setLang(lang) {
    this.ttsLang = lang;
  }
  async setRate(rate) {
    this.state = "setrate-paused";
    this.ttsRate = rate;
    await this.ttsClient.setRate(this.ttsRate);
  }
  async getVoices(lang) {
    const ttsWebVoices = await this.ttsWebClient.getVoices(lang);
    const ttsEdgeVoices = await this.ttsEdgeClient.getVoices(lang);
    return [...ttsEdgeVoices, ...ttsWebVoices];
  }
  async setVoice(voiceId) {
    this.state = "setvoice-paused";
    const useEdgeTTS = !!this.ttsEdgeVoices.find(
      (voice) => (voiceId === "" || voice.id === voiceId) && !voice.disabled
    );
    if (useEdgeTTS) {
      this.ttsClient = this.ttsEdgeClient;
      await this.ttsClient.setRate(this.ttsRate);
      TTSUtils.setPreferredVoice("edge-tts", this.ttsLang, voiceId);
    } else {
      this.ttsClient = this.ttsWebClient;
      await this.ttsClient.setRate(this.ttsRate);
      TTSUtils.setPreferredVoice("web-speech", this.ttsLang, voiceId);
    }
    await this.ttsClient.setVoice(voiceId);
  }
  getVoiceId() {
    return this.ttsClient.getVoiceId();
  }
  error(e) {
    console.error(e);
    this.state = "stopped";
  }
  async kill() {
    await this.stop();
  }
};

// src/services/tts/TTSData.ts
var SILENCE_DATA = "data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

// src/app/reader/components/tts/TTSControl.tsx
init_misc();

// src/utils/bridge.ts
async function invokeUseBackgroundAudio(request) {
  console.warn("useBackgroundAudio is not supported in web environment");
  if (request.enabled) {
    try {
      console.log("Background audio requested but not fully supported in web");
    } catch (error) {
      console.error("Error with background audio:", error);
    }
  }
}
var getTTSTimeoutOptions = (_) => {
  return [
    {
      label: _("No Timeout"),
      value: 0
    },
    {
      label: _("{{value}} minute", { value: 1 }),
      value: 60
    },
    {
      label: _("{{value}} minutes", { value: 3 }),
      value: 180
    },
    {
      label: _("{{value}} minutes", { value: 5 }),
      value: 300
    },
    {
      label: _("{{value}} minutes", { value: 10 }),
      value: 600
    },
    {
      label: _("{{value}} minutes", { value: 20 }),
      value: 1200
    },
    {
      label: _("{{value}} minutes", { value: 30 }),
      value: 1800
    },
    {
      label: _("{{value}} minutes", { value: 45 }),
      value: 2700
    },
    {
      label: _("{{value}} hour", { value: 1 }),
      value: 3600
    },
    {
      label: _("{{value}} hours", { value: 2 }),
      value: 7200
    },
    {
      label: _("{{value}} hours", { value: 3 }),
      value: 10800
    },
    {
      label: _("{{value}} hours", { value: 4 }),
      value: 14400
    },
    {
      label: _("{{value}} hours", { value: 6 }),
      value: 21600
    },
    {
      label: _("{{value}} hours", { value: 8 }),
      value: 28800
    }
  ];
};
var getCountdownTime = (timeout) => {
  const now = Date.now();
  if (timeout > now) {
    const remainingTime = Math.floor((timeout - now) / 1e3);
    const minutes = Math.floor(remainingTime / 3600) * 60 + Math.floor(remainingTime % 3600 / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return "";
};
var TTSPanel = ({
  bookKey,
  ttsLang,
  isPlaying,
  timeoutOption,
  timeoutTimestamp,
  onTogglePlay,
  onBackward,
  onForward,
  onSetRate,
  onGetVoices,
  onSetVoice,
  onGetVoiceId,
  onSelectTimeout
}) => {
  const _ = useTranslation();
  const { envConfig } = useEnv();
  const { getViewSettings, setViewSettings } = useReaderStore();
  const { settings, setSettings, saveSettings } = useSettingsStore();
  const viewSettings = getViewSettings(bookKey);
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(viewSettings?.ttsRate ?? 1);
  const [selectedVoice, setSelectedVoice] = useState(viewSettings?.ttsVoice ?? "");
  const [timeoutCountdown, setTimeoutCountdown] = useState(() => {
    return getCountdownTime(timeoutTimestamp);
  });
  const defaultIconSize = useDefaultIconSize();
  const iconSize32 = useResponsiveSize(32);
  const iconSize48 = useResponsiveSize(48);
  const handleSetRate = (e) => {
    let newRate = parseFloat(e.target.value);
    newRate = Math.max(0.2, Math.min(3, newRate));
    setRate(newRate);
    onSetRate(newRate);
    const viewSettings2 = getViewSettings(bookKey);
    viewSettings2.ttsRate = newRate;
    settings.globalViewSettings.ttsRate = newRate;
    setViewSettings(bookKey, viewSettings2);
    setSettings(settings);
    saveSettings(envConfig, settings);
  };
  const handleSelectVoice = (voice) => {
    onSetVoice(voice);
    setSelectedVoice(voice);
    const viewSettings2 = getViewSettings(bookKey);
    viewSettings2.ttsVoice = voice;
    setViewSettings(bookKey, viewSettings2);
  };
  const updateTimeout = (timeout) => {
    const now = Date.now();
    if (timeout > 0 && timeout < now) {
      onSelectTimeout(0);
      setTimeoutCountdown("");
    } else if (timeout > 0) {
      setTimeoutCountdown(getCountdownTime(timeout));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      updateTimeout(timeoutTimestamp);
    }, 1e3);
  }, [timeoutTimestamp, timeoutCountdown]);
  useEffect(() => {
    const voiceId = onGetVoiceId();
    setSelectedVoice(voiceId);
  }, []);
  useEffect(() => {
    const fetchVoices = async () => {
      const voices2 = await onGetVoices(ttsLang);
      setVoices(voices2);
    };
    fetchVoices();
  }, [ttsLang]);
  const timeoutOptions = getTTSTimeoutOptions(_);
  return /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full flex-col items-center justify-center gap-2 rounded-2xl p-4" }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex w-full flex-col items-center gap-0.5" }, /* @__PURE__ */ React43__default.createElement(
    "input",
    {
      className: "range",
      type: "range",
      min: 0,
      max: 3,
      step: "0.1",
      value: rate,
      onChange: handleSetRate
    }
  ), /* @__PURE__ */ React43__default.createElement("div", { className: "grid w-full grid-cols-7 text-xs" }, /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "|")), /* @__PURE__ */ React43__default.createElement("div", { className: "grid w-full grid-cols-7 text-xs" }, /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, _("Slow")), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "1.0"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "1.5"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, "2.0"), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }), /* @__PURE__ */ React43__default.createElement("span", { className: "text-center" }, _("Fast")))), /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center justify-between space-x-2" }, /* @__PURE__ */ React43__default.createElement("button", { onClick: onBackward, className: "rounded-full p-1" }, /* @__PURE__ */ React43__default.createElement(MdFastRewind, { size: iconSize32 })), /* @__PURE__ */ React43__default.createElement("button", { onClick: onTogglePlay, className: "rounded-full p-1" }, isPlaying ? /* @__PURE__ */ React43__default.createElement(MdPauseCircle, { size: iconSize48, className: "fill-primary" }) : /* @__PURE__ */ React43__default.createElement(MdPlayCircle, { size: iconSize48, className: "fill-primary" })), /* @__PURE__ */ React43__default.createElement("button", { onClick: onForward, className: "rounded-full p-1" }, /* @__PURE__ */ React43__default.createElement(MdFastForward, { size: iconSize32 })), /* @__PURE__ */ React43__default.createElement("div", { className: "dropdown dropdown-top" }, /* @__PURE__ */ React43__default.createElement("button", { className: "flex flex-col items-center justify-center rounded-full p-1" }, /* @__PURE__ */ React43__default.createElement(MdAlarm, { size: iconSize32 }), timeoutCountdown && /* @__PURE__ */ React43__default.createElement(
    "span",
    {
      className: clsx8(
        "absolute bottom-0 left-1/2 w-12 translate-x-[-50%] translate-y-[80%] px-1",
        "bg-primary/80 text-base-100 rounded-full text-center text-xs"
      )
    },
    timeoutCountdown
  )), /* @__PURE__ */ React43__default.createElement(
    "ul",
    {
      tabIndex: 0,
      className: clsx8(
        "dropdown-content bgcolor-base-200 no-triangle menu menu-vertical rounded-box absolute right-0 z-[1] shadow",
        "mt-4 inline max-h-96 w-[200px] overflow-y-scroll"
      )
    },
    timeoutOptions.map((option, index) => /* @__PURE__ */ React43__default.createElement("li", { key: `${index}-${option.value}`, onClick: () => onSelectTimeout(option.value) }, /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-2" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, timeoutOption === option.value && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", { className: clsx8("text-base sm:text-sm") }, option.label))))
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "dropdown dropdown-top" }, /* @__PURE__ */ React43__default.createElement("button", { tabIndex: 0, className: "rounded-full p-1" }, /* @__PURE__ */ React43__default.createElement(RiVoiceAiFill, { size: iconSize32 })), /* @__PURE__ */ React43__default.createElement(
    "ul",
    {
      tabIndex: 0,
      className: clsx8(
        "dropdown-content bgcolor-base-200 no-triangle menu menu-vertical rounded-box absolute right-0 z-[1] shadow",
        "mt-4 inline max-h-96 w-[250px] overflow-y-scroll"
      )
    },
    voices.map((voice, index) => /* @__PURE__ */ React43__default.createElement(
      "li",
      {
        key: `${index}-${voice.id}`,
        onClick: () => !voice.disabled && handleSelectVoice(voice.id)
      },
      /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-center px-2" }, /* @__PURE__ */ React43__default.createElement("span", { style: { minWidth: `${defaultIconSize}px` } }, selectedVoice === voice.id && /* @__PURE__ */ React43__default.createElement(MdCheck, { className: "text-base-content" })), /* @__PURE__ */ React43__default.createElement("span", { className: clsx8("text-base sm:text-sm", voice.disabled && "text-gray-400") }, voice.name))
    ))
  ))));
};
var TTSPanel_default = TTSPanel;
var TTSIcon2 = ({ isPlaying, onClick }) => {
  const bars = [1, 2, 3, 4];
  return /* @__PURE__ */ React43__default.createElement("div", { className: "relative h-full w-full cursor-pointer", onClick }, /* @__PURE__ */ React43__default.createElement("div", { className: "absolute inset-0 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-violet-500" }, /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "absolute -inset-full bg-gradient-to-r from-blue-500 via-emerald-500 to-violet-500",
      style: {
        animation: isPlaying ? "moveGradient 2s alternate infinite" : "none"
      }
    }
  )), /* @__PURE__ */ React43__default.createElement("div", { className: "absolute inset-0 flex items-center justify-center" }, /* @__PURE__ */ React43__default.createElement("style", null, `
          @keyframes moveGradient {
            0% { transform: translate(0, 0); }
            100% { transform: translate(25%, 25%); }
          }
          @keyframes bounce {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.6); }
          }
        `), /* @__PURE__ */ React43__default.createElement("div", { className: "flex items-end space-x-1" }, bars.map((bar) => /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      key: bar,
      className: "w-1 rounded-t bg-white",
      style: {
        height: "16px",
        animationName: isPlaying ? "bounce" : "none",
        animationDuration: isPlaying ? `${1 + bar * 0.1}s` : "0s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: `${bar * 0.1}s`
      }
    }
  )))));
};
var TTSIcon_default = TTSIcon2;

// src/app/reader/components/tts/TTSControl.tsx
var POPUP_WIDTH = 282;
var POPUP_HEIGHT = 160;
var POPUP_PADDING = 10;
var TTSControl = () => {
  const _ = useTranslation();
  const { appService } = useEnv();
  const { getBookData } = useBookDataStore();
  const { getView, getViewSettings } = useReaderStore();
  const [bookKey, setBookKey] = useState("");
  const [ttsLang, setTtsLang] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState();
  const [trianglePosition, setTrianglePosition] = useState();
  const [timeoutOption, setTimeoutOption] = useState(0);
  const [timeoutTimestamp, setTimeoutTimestamp] = useState(0);
  const [timeoutFunc, setTimeoutFunc] = useState(null);
  const popupWidth2 = useResponsiveSize(POPUP_WIDTH);
  const popupHeight2 = useResponsiveSize(POPUP_HEIGHT);
  const popupPadding2 = useResponsiveSize(POPUP_PADDING);
  const iconRef = useRef(null);
  const ttsControllerRef = useRef(null);
  const unblockerAudioRef = useRef(null);
  const unblockAudio = () => {
    if (unblockerAudioRef.current) return;
    unblockerAudioRef.current = document.createElement("audio");
    unblockerAudioRef.current.setAttribute("x-webkit-airplay", "deny");
    unblockerAudioRef.current.preload = "auto";
    unblockerAudioRef.current.loop = true;
    unblockerAudioRef.current.src = SILENCE_DATA;
    unblockerAudioRef.current.play();
  };
  const releaseUnblockAudio = () => {
    if (!unblockerAudioRef.current) return;
    try {
      unblockerAudioRef.current.pause();
      unblockerAudioRef.current.currentTime = 0;
      unblockerAudioRef.current.removeAttribute("src");
      unblockerAudioRef.current.src = "";
      unblockerAudioRef.current.load();
      unblockerAudioRef.current = null;
      console.log("Unblock audio released");
    } catch (err) {
      console.warn("Error releasing unblock audio:", err);
    }
  };
  useEffect(() => {
    return () => {
      if (ttsControllerRef.current) {
        ttsControllerRef.current.kill();
        ttsControllerRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    eventDispatcher.on("tts-speak", handleTTSSpeak);
    eventDispatcher.on("tts-stop", handleTTSStop);
    eventDispatcher.onSync("tts-is-speaking", handleQueryIsSpeaking);
    return () => {
      eventDispatcher.off("tts-speak", handleTTSSpeak);
      eventDispatcher.off("tts-stop", handleTTSStop);
      eventDispatcher.offSync("tts-is-speaking", handleQueryIsSpeaking);
    };
  }, []);
  const handleTTSSpeak = async (event) => {
    const { bookKey: bookKey2, range } = event.detail;
    const view = getView(bookKey2);
    const viewSettings = getViewSettings(bookKey2);
    const bookData = getBookData(bookKey2);
    if (!view || !viewSettings || !bookData) return;
    setBookKey(bookKey2);
    if (ttsControllerRef.current) {
      ttsControllerRef.current.stop();
      ttsControllerRef.current = null;
    }
    setShowIndicator(true);
    try {
      if (appService?.isIOSApp) {
        await invokeUseBackgroundAudio({ enabled: true });
      }
      if (getOSPlatform() === "ios" || appService?.isIOSApp) {
        unblockAudio();
      }
      const ttsController = new TTSController(view);
      await ttsController.init();
      await ttsController.initViewTTS();
      const ssml = view.tts?.from(range);
      if (ssml) {
        const lang = parseSSMLLang(ssml) || "en";
        setTtsLang(lang);
        setIsPlaying(true);
        ttsController.setLang(lang);
        ttsController.setRate(viewSettings.ttsRate);
        ttsController.setVoice(viewSettings.ttsVoice);
        ttsController.speak(ssml);
        ttsControllerRef.current = ttsController;
      }
    } catch (error) {
      eventDispatcher.dispatch("toast", {
        message: _("TTS not supported in this device"),
        type: "error"
      });
      console.error(error);
    }
  };
  const handleTTSStop = async () => {
    handleStop();
  };
  const handleQueryIsSpeaking = () => {
    return !!ttsControllerRef.current;
  };
  const handleTogglePlay = async () => {
    const ttsController = ttsControllerRef.current;
    if (!ttsController) return;
    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
      await ttsController.pause();
    } else if (isPaused) {
      setIsPlaying(true);
      setIsPaused(false);
      if (ttsController.state === "paused") {
        await ttsController.resume();
      } else {
        await ttsController.start();
      }
    }
  };
  const handleBackward = async () => {
    const ttsController = ttsControllerRef.current;
    if (ttsController) {
      await ttsController.backward();
    }
  };
  const handleForward = async () => {
    const ttsController = ttsControllerRef.current;
    if (ttsController) {
      await ttsController.forward();
    }
  };
  const handleStop = async () => {
    const ttsController = ttsControllerRef.current;
    if (ttsController) {
      await ttsController.stop();
      ttsControllerRef.current = null;
      getView(bookKey)?.deselect();
      setIsPlaying(false);
      setShowPanel(false);
      setShowIndicator(false);
    }
    if (appService?.isIOSApp) {
      await invokeUseBackgroundAudio({ enabled: false });
    }
    if (getOSPlatform() === "ios" || appService?.isIOSApp) {
      releaseUnblockAudio();
    }
  };
  const handleSetRate = useCallback(
    throttle(async (rate) => {
      const ttsController = ttsControllerRef.current;
      if (ttsController) {
        if (ttsController.state === "playing") {
          await ttsController.stop();
          await ttsController.setRate(rate);
          await ttsController.start();
        } else {
          await ttsController.setRate(rate);
        }
      }
    }, 3e3),
    []
  );
  const handleSetVoice = useCallback(
    throttle(async (voice) => {
      const ttsController = ttsControllerRef.current;
      if (ttsController) {
        if (ttsController.state === "playing") {
          await ttsController.stop();
          await ttsController.setVoice(voice);
          await ttsController.start();
        } else {
          await ttsController.setVoice(voice);
        }
      }
    }, 3e3),
    []
  );
  const handleGetVoices = async (lang) => {
    const ttsController = ttsControllerRef.current;
    if (ttsController) {
      return ttsController.getVoices(lang);
    }
    return [];
  };
  const handleGetVoiceId = () => {
    const ttsController = ttsControllerRef.current;
    if (ttsController) {
      return ttsController.getVoiceId();
    }
    return "";
  };
  const handleSelectTimeout = (value) => {
    setTimeoutOption(value);
    if (timeoutFunc) {
      clearTimeout(timeoutFunc);
    }
    if (value > 0) {
      setTimeoutFunc(
        setTimeout(() => {
          handleStop();
        }, value * 1e3)
      );
      setTimeoutTimestamp(Date.now() + value * 1e3);
    } else {
      setTimeoutTimestamp(0);
    }
  };
  const updatePanelPosition = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const windowRect = document.documentElement.getBoundingClientRect();
      const trianglePos = {
        dir: "up",
        point: { x: rect.left + rect.width / 2, y: rect.top - 12 }
      };
      const popupPos = getPopupPosition(
        trianglePos,
        windowRect,
        popupWidth2,
        popupHeight2,
        popupPadding2
      );
      setPanelPosition(popupPos);
      setTrianglePosition(trianglePos);
    }
  };
  const togglePopup = () => {
    updatePanelPosition();
    setShowPanel((prev) => !prev);
  };
  const handleDismissPopup = () => {
    setShowPanel(false);
  };
  return /* @__PURE__ */ React43__default.createElement("div", null, showPanel && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      className: "fixed inset-0",
      onClick: handleDismissPopup,
      onContextMenu: handleDismissPopup
    }
  ), showIndicator && /* @__PURE__ */ React43__default.createElement(
    "div",
    {
      ref: iconRef,
      className: clsx8(
        "fixed right-6 h-12 w-12",
        appService?.hasSafeAreaInset ? "bottom-[calc(env(safe-area-inset-bottom)+70px)]" : "bottom-[70px] sm:bottom-14"
      )
    },
    /* @__PURE__ */ React43__default.createElement(TTSIcon_default, { isPlaying, onClick: togglePopup })
  ), showPanel && panelPosition && trianglePosition && /* @__PURE__ */ React43__default.createElement(
    Popup_default,
    {
      width: popupWidth2,
      height: popupHeight2,
      position: panelPosition,
      trianglePosition,
      className: "bg-base-200 absolute flex shadow-lg"
    },
    /* @__PURE__ */ React43__default.createElement(
      TTSPanel_default,
      {
        bookKey,
        ttsLang,
        isPlaying,
        timeoutOption,
        timeoutTimestamp,
        onTogglePlay: handleTogglePlay,
        onBackward: handleBackward,
        onForward: handleForward,
        onSetRate: handleSetRate,
        onGetVoices: handleGetVoices,
        onSetVoice: handleSetVoice,
        onGetVoiceId: handleGetVoiceId,
        onSelectTimeout: handleSelectTimeout
      }
    )
  ));
};
var TTSControl_default = TTSControl;

// src/app/reader/components/ReaderContent.tsx
var ReaderContent = ({ ids }) => {
  const searchParams = useSearchParams();
  const { envConfig, appService } = useEnv();
  const { bookKeys, dismissBook, getNextBookKey } = useBooksManager_default();
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const { saveSettings } = useSettingsStore();
  const { getConfig, getBookData, saveConfig } = useBookDataStore();
  const { getView, setBookKeys } = useReaderStore();
  const { initViewState, getViewState, clearViewState } = useReaderStore();
  const [showDetailsBook, setShowDetailsBook] = useState(null);
  const isInitiating = useRef(false);
  const [loading, setLoading] = useState(false);
  useBookShortcuts_default({ sideBarBookKey, bookKeys });
  useEffect(() => {
    isInitiating.current = false;
  }, [ids]);
  useEffect(() => {
    if (isInitiating.current) return;
    isInitiating.current = true;
    const bookIds = ids || searchParams?.get("ids") || "";
    const initialIds = bookIds.split(BOOK_IDS_SEPARATOR).filter(Boolean);
    if (initialIds.length === 0) {
      console.log("No book IDs provided, skipping initialization");
      return;
    }
    const initialBookKeys = initialIds.map((id) => `${id}-${uniqueId()}`);
    console.log("Initialize books with keys:", initialBookKeys);
    setBookKeys(initialBookKeys);
    const uniqueIds = /* @__PURE__ */ new Set();
    initialBookKeys.forEach((key, index) => {
      const id = key.split("-")[0];
      const isPrimary = !uniqueIds.has(id);
      uniqueIds.add(id);
      if (!getViewState(key)) {
        initViewState(envConfig, id, key, isPrimary).catch((error) => {
          console.log("Error initializing book", key, error);
        });
        if (index === 0) setSideBarBookKey(key);
      }
    });
    const handleShowBookDetails = (event) => {
      const book = event.detail;
      setShowDetailsBook(book);
      return true;
    };
    eventDispatcher.onSync("show-book-details", handleShowBookDetails);
  }, [ids, searchParams]);
  useEffect(() => {
    const unlisten = handleOnCloseWindow(handleCloseBooks);
    window.addEventListener("beforeunload", handleCloseBooks);
    eventDispatcher.on("quit-app", handleCloseBooks);
    return () => {
      unlisten();
      window.removeEventListener("beforeunload", handleCloseBooks);
      eventDispatcher.off("quit-app", handleCloseBooks);
    };
  }, [bookKeys]);
  const saveBookConfig = async (bookKey) => {
    const config = getConfig(bookKey);
    const { book } = getBookData(bookKey) || {};
    const { isPrimary } = getViewState(bookKey) || {};
    if (isPrimary && book && config) {
      eventDispatcher.dispatch("sync-book-progress", { bookKey });
      const settings = useSettingsStore.getState().settings;
      await saveConfig(envConfig, bookKey, config, settings);
    }
  };
  const saveConfigAndCloseBook = async (bookKey) => {
    console.log("Closing book", bookKey);
    try {
      getView(bookKey)?.close();
      getView(bookKey)?.remove();
    } catch {
      console.info("Error closing book", bookKey);
    }
    eventDispatcher.dispatch("tts-stop", { bookKey });
    await saveBookConfig(bookKey);
    clearViewState(bookKey);
  };
  const handleCloseBooks = async () => {
    const settings = useSettingsStore.getState().settings;
    await Promise.all(bookKeys.map((key) => saveConfigAndCloseBook(key)));
    await saveSettings(envConfig, settings);
  };
  const handleCloseBooksAndReload = () => {
    handleCloseBooks();
    redirectToDirectReader();
  };
  const handleCloseBook = async (bookKey) => {
    saveConfigAndCloseBook(bookKey);
    if (sideBarBookKey === bookKey) {
      setSideBarBookKey(getNextBookKey(sideBarBookKey));
    }
    dismissBook(bookKey);
    if (bookKeys.filter((key) => key !== bookKey).length == 0) {
      redirectToDirectReader();
    }
  };
  if (!bookKeys || bookKeys.length === 0) return null;
  const bookData = getBookData(bookKeys[0]);
  if (!bookData || !bookData.book || !bookData.bookDoc) {
    setTimeout(() => setLoading(true), 300);
    return loading && /* @__PURE__ */ React43.createElement("div", { className: clsx8("hero hero-content", appService?.isIOSApp ? "h-[100vh]" : "h-dvh") }, /* @__PURE__ */ React43.createElement(Spinner_default, { loading: true }));
  }
  return /* @__PURE__ */ React43.createElement("div", { className: clsx8("flex", appService?.isIOSApp ? "h-[100vh]" : "h-dvh") }, /* @__PURE__ */ React43.createElement(SideBar_default, { onGoToLibrary: handleCloseBooksAndReload }), /* @__PURE__ */ React43.createElement(BooksGrid_default, { bookKeys, onCloseBook: handleCloseBook }), /* @__PURE__ */ React43.createElement(TTSControl_default, null), /* @__PURE__ */ React43.createElement(Notebook_default, null), showDetailsBook && /* @__PURE__ */ React43.createElement(
    BookDetailModal_default,
    {
      isOpen: !!showDetailsBook,
      book: showDetailsBook,
      onClose: () => setShowDetailsBook(null)
    }
  ));
};
var ReaderContent_default = ReaderContent;

// src/app/reader/components/Reader.tsx
var Reader = ({ bookUrl = "https://cdn.readest.com/books/the-scarlet-letter.epub" }) => {
  const { envConfig, appService } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const { isSideBarVisible } = useSidebarStore();
  const isInitiating = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookHash, setBookHash] = useState(null);
  const { updateAppTheme } = useThemeStore();
  useTheme();
  useScreenWakeLock(settings.screenWakeLock);
  useEffect(() => {
    updateAppTheme("base-100");
    if (isInitiating.current) return;
    isInitiating.current = true;
    const initSettings = async () => {
      try {
        console.log("\u23F3 Starting book initialization process");
        const appService2 = await envConfig.getAppService();
        console.log("\u23F3 Loading user settings");
        const settings2 = await appService2.loadSettings();
        setSettings(settings2);
        console.log("\u23F3 Fetching book from URL:", bookUrl);
        const response = await fetch(bookUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch book: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        console.log("\u2705 Successfully fetched book content:", blob.size, "bytes");
        const filename = bookUrl.split("/").pop() || "book.epub";
        const file = new File([blob], filename, { type: "application/epub+zip" });
        const arrayBuffer = await file.arrayBuffer();
        const hash = md5(arrayBuffer);
        console.log("\u{1F4CA} Book hash:", hash);
        let books = await appService2.loadLibraryBooks();
        console.log("\u{1F4DA} Current library has", books.length, "books");
        const existingBook = books.find((b) => b.hash === hash);
        if (existingBook) {
          console.log("\u{1F4D5} Book already exists in library:", existingBook);
          setBookHash(existingBook.hash);
        } else {
          console.log("\u{1F4D7} Importing new book");
          const book = await appService2.importBook(
            file,
            books,
            true,
            // Save the book file locally
            true,
            // Save the cover as well
            false,
            // don't overwrite
            false
            // not transient
          );
          if (book) {
            book.url = bookUrl;
            console.log("\u2705 Book successfully imported:", book);
            books = [book, ...books.filter((b) => b.hash !== book.hash)];
            console.log("\u{1F4BE} Saving updated library to storage");
            await appService2.saveLibraryBooks(books);
            setBookHash(book.hash);
          } else {
            throw new Error("Book import returned null");
          }
        }
        await appService2.saveSettings(settings2);
        console.log("\u2705 Book initialization complete");
      } catch (err) {
        console.error("\u274C Error loading book:", err);
        setError(`Error loading book: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
        isInitiating.current = false;
      }
    };
    initSettings();
  }, [bookUrl]);
  if (loading) {
    return /* @__PURE__ */ React43.createElement("div", { className: "hero h-dvh bg-base-100" }, /* @__PURE__ */ React43.createElement("div", { className: "hero-content text-center" }, /* @__PURE__ */ React43.createElement("div", null, /* @__PURE__ */ React43.createElement(Spinner_default, { loading: true }), /* @__PURE__ */ React43.createElement("div", { className: "mt-4 text-base-content" }, "Loading book from URL..."))));
  }
  if (error) {
    return /* @__PURE__ */ React43.createElement("div", { className: "hero h-dvh bg-base-100" }, /* @__PURE__ */ React43.createElement("div", { className: "hero-content text-center" }, /* @__PURE__ */ React43.createElement("div", { className: "max-w-md" }, /* @__PURE__ */ React43.createElement("h1", { className: "text-2xl font-bold text-error" }, "Error"), /* @__PURE__ */ React43.createElement("p", { className: "py-4 text-base-content" }, error), /* @__PURE__ */ React43.createElement(
      "button",
      {
        className: "btn btn-primary",
        onClick: () => window.location.reload()
      },
      "Try Again"
    ))));
  }
  return settings?.globalReadSettings && /* @__PURE__ */ React43.createElement(
    "div",
    {
      className: clsx8(
        `reader-page bg-base-100 text-base-content select-none`,
        !isSideBarVisible && appService?.hasRoundedWindow && "rounded-window"
      )
    },
    /* @__PURE__ */ React43.createElement(Suspense, null, /* @__PURE__ */ React43.createElement(ReaderContent_default, { key: bookHash || "default", ids: bookHash || void 0 }), /* @__PURE__ */ React43.createElement(Toast, null))
  );
};
var Reader_default = Reader;

// src/index.ts
var index_default = Reader_default;

export { AppRouterContext, EnvProvider, FoliateViewer_default as FoliateViewer, FooterBar_default as FooterBar, HeaderBar_default as HeaderBar, MockNextNavigation, PathnameContext, Reader_default as Reader, ReaderContent_default as ReaderContent, SearchParamsContext, SettingsDialog_default as SettingsDialog, SideBar_default as SideBar, SyncProvider, TOCView_default as TOCView, index_default as default, useEnv, usePathname, useRouter, useScreenWakeLock, useSearchParams, useSettingsStore, useSidebarStore, useSyncContext, useTheme, useThemeStore, wrappedFoliateView };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map