import * as React from 'react';
import React__default, { ReactNode } from 'react';
import * as zustand from 'zustand';

interface ReaderProps {
    bookUrl?: string;
}
declare const Reader: React.FC<ReaderProps>;

declare const ReaderContent: React.FC<{
    ids?: string;
}>;

declare const SideBar: React__default.FC<{
    onGoToLibrary: () => void;
}>;

type BookFormat = 'EPUB' | 'MOBI' | 'CBZ' | 'FB2' | 'FBZ';
type BookNoteType = 'bookmark' | 'annotation' | 'excerpt';
type HighlightStyle = 'highlight' | 'underline' | 'squiggly';
type HighlightColor = 'red' | 'yellow' | 'green' | 'blue' | 'violet';
interface Book {
    url?: string;
    filePath?: string;
    hash: string;
    format: BookFormat;
    title: string;
    author: string;
    group?: string;
    groupId?: string;
    groupName?: string;
    tags?: string[];
    coverImageUrl?: string | null;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number | null;
    uploadedAt?: number | null;
    downloadedAt?: number | null;
    lastUpdated?: number;
    progress?: [number, number];
}
interface BookGroupType {
    id: string;
    name: string;
}
interface PageInfo {
    current: number;
    next?: number;
    total: number;
}
interface BookNote {
    bookHash?: string;
    id: string;
    type: BookNoteType;
    cfi: string;
    text?: string;
    style?: HighlightStyle;
    color?: HighlightColor;
    note: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number | null;
}
interface BooknoteGroup {
    id: number;
    href: string;
    label: string;
    booknotes: BookNote[];
}
type WritingMode = 'auto' | 'horizontal-tb' | 'horizontal-rl' | 'vertical-rl';
interface BookLayout {
    marginPx: number;
    gapPercent: number;
    scrolled: boolean;
    disableClick: boolean;
    swapClickArea: boolean;
    continuousScroll: boolean;
    maxColumnCount: number;
    maxInlineSize: number;
    maxBlockSize: number;
    animated: boolean;
    writingMode: WritingMode;
    vertical: boolean;
    rtl: boolean;
    doubleBorder: boolean;
    borderColor: string;
    showHeader: boolean;
    showFooter: boolean;
}
interface BookStyle {
    zoomLevel: number;
    paragraphMargin: number;
    lineHeight: number;
    wordSpacing: number;
    letterSpacing: number;
    textIndent: number;
    fullJustification: boolean;
    hyphenation: boolean;
    invert: boolean;
    theme: string;
    overrideFont: boolean;
    overrideLayout: boolean;
    userStylesheet: string;
}
interface BookFont {
    serifFont: string;
    sansSerifFont: string;
    monospaceFont: string;
    defaultFont: string;
    defaultCJKFont: string;
    defaultFontSize: number;
    minimumFontSize: number;
    fontWeight: number;
}
interface ViewConfig {
    sideBarTab: string;
    uiLanguage: string;
}
interface TTSConfig {
    ttsRate: number;
    ttsVoice: string;
}
interface ViewSettings extends BookLayout, BookStyle, BookFont, ViewConfig, TTSConfig {
}
interface BookProgress {
    location: string;
    sectionId: number;
    sectionHref: string;
    sectionLabel: string;
    section: PageInfo;
    pageinfo: PageInfo;
    range: Range;
}
interface BookSearchConfig {
    scope: 'book' | 'section';
    matchCase: boolean;
    matchWholeWords: boolean;
    matchDiacritics: boolean;
    index?: number;
    query?: string;
}
interface SearchExcerpt {
    pre: string;
    match: string;
    post: string;
}
interface BookSearchMatch {
    cfi: string;
    excerpt: SearchExcerpt;
}
interface BookSearchResult {
    label: string;
    subitems: BookSearchMatch[];
    progress?: number;
}
interface BookConfig {
    bookHash?: string;
    progress?: [number, number];
    location?: string;
    booknotes?: BookNote[];
    searchConfig?: Partial<BookSearchConfig>;
    viewSettings?: Partial<ViewSettings>;
    lastSyncedAtConfig?: number;
    lastSyncedAtNotes?: number;
    updatedAt: number;
}
interface BookDataRecord {
    id: string;
    book_hash: string;
    user_id: string;
    updated_at: number | null;
    deleted_at: number | null;
}
interface BooksGroup {
    id: string;
    name: string;
    books: Book[];
    updatedAt: number;
}
interface BookContent {
    book: Book;
    file: File;
    config: BookConfig;
}

interface LanguageMap {
    [key: string]: string;
}
interface Contributor {
    name: LanguageMap;
}

interface TOCItem {
    id: number;
    label: string;
    href: string;
    cfi?: string;
    subitems?: TOCItem[];
}
interface SectionItem {
    id: string;
    cfi: string;
    size: number;
}
interface BookDoc {
    metadata: {
        title: string | LanguageMap;
        author: string | Contributor;
        language: string | string[];
        editor?: string;
        publisher?: string;
        published?: string;
        description?: string;
        subject?: string[];
        identifier?: string;
    };
    dir: string;
    toc?: Array<TOCItem>;
    sections?: Array<SectionItem>;
    transformTarget?: EventTarget;
    splitTOCHref(href: string): Array<string | number>;
    getCover(): Promise<Blob | null>;
}

declare const TOCView: React__default.FC<{
    bookKey: string;
    toc: TOCItem[];
}>;

declare const SettingsDialog: React__default.FC<{
    bookKey: string;
    config: BookConfig;
}>;

declare const FoliateViewer: React__default.FC<{
    bookKey: string;
    bookDoc: BookDoc;
    config: BookConfig;
}>;

interface HeaderBarProps {
    bookKey: string;
    bookTitle: string;
    isTopLeft: boolean;
    isHoveredAnim: boolean;
    onCloseBook: (bookKey: string) => void;
    onSetSettingsDialogOpen: (open: boolean) => void;
}
declare const HeaderBar: React__default.FC<HeaderBarProps>;

interface FooterBarProps {
    bookKey: string;
    bookFormat: string;
    section?: PageInfo;
    pageinfo?: PageInfo;
    isHoveredAnim: boolean;
}
declare const FooterBar: React__default.FC<FooterBarProps>;

declare const useTheme: () => void;

declare const useScreenWakeLock: (lock: boolean) => void;

type BaseColor = {
    bg: string;
    fg: string;
    primary: string;
};
type ThemeMode = 'auto' | 'light' | 'dark';
type Palette = {
    'base-100': string;
    'base-200': string;
    'base-300': string;
    'base-content': string;
    neutral: string;
    'neutral-content': string;
    primary: string;
    secondary: string;
    accent: string;
};
type CustomTheme = {
    name: string;
    label: string;
    colors: {
        light: BaseColor;
        dark: BaseColor;
    };
};

type ThemeType = 'light' | 'dark' | 'auto';
interface ReadSettings {
    sideBarWidth: string;
    isSideBarPinned: boolean;
    notebookWidth: string;
    isNotebookPinned: boolean;
    autohideCursor: boolean;
    translateTargetLang: string;
    highlightStyle: HighlightStyle;
    highlightStyles: Record<HighlightStyle, HighlightColor>;
    customThemes: CustomTheme[];
}
interface SystemSettings {
    version: number;
    localBooksDir: string;
    keepLogin: boolean;
    autoUpload: boolean;
    alwaysOnTop: boolean;
    autoCheckUpdates: boolean;
    screenWakeLock: boolean;
    autoImportBooksOnOpen: boolean;
    lastSyncedAtBooks: number;
    lastSyncedAtConfigs: number;
    lastSyncedAtNotes: number;
    globalReadSettings: ReadSettings;
    globalViewSettings: ViewSettings;
}

interface ProgressPayload {
    progress: number;
    total: number;
    transferSpeed: number;
}
type ProgressHandler = (progress: ProgressPayload) => void;

type AppPlatform = 'web';
type BaseDir = 'Books' | 'Settings' | 'Data' | 'Log' | 'Cache' | 'None';
interface FileSystem {
    getURL(path: string): string;
    getBlobURL(path: string, base: BaseDir): Promise<string>;
    openFile(path: string, base: BaseDir, filename?: string): Promise<File>;
    copyFile(srcPath: string, dstPath: string, base: BaseDir): Promise<void>;
    readFile(path: string, base: BaseDir, mode: 'text' | 'binary'): Promise<string | ArrayBuffer>;
    writeFile(path: string, base: BaseDir, content: string | ArrayBuffer | File): Promise<void>;
    removeFile(path: string, base: BaseDir): Promise<void>;
    readDir(path: string, base: BaseDir): Promise<{
        path: string;
        isDir: boolean;
    }[]>;
    createDir(path: string, base: BaseDir, recursive?: boolean): Promise<void>;
    removeDir(path: string, base: BaseDir, recursive?: boolean): Promise<void>;
    exists(path: string, base: BaseDir): Promise<boolean>;
    getPrefix(base: BaseDir): string | null;
}
interface AppService {
    fs: FileSystem;
    osPlatform: string;
    appPlatform: AppPlatform;
    hasTrafficLight: boolean;
    hasWindow: boolean;
    hasWindowBar: boolean;
    hasContextMenu: boolean;
    hasRoundedWindow: boolean;
    hasSafeAreaInset: boolean;
    hasHaptics: boolean;
    hasSysFontsList: boolean;
    isMobile: boolean;
    isAppDataSandbox: boolean;
    isAndroidApp: boolean;
    isIOSApp: boolean;
    selectDirectory(): Promise<string>;
    selectFiles(name: string, extensions: string[]): Promise<string[]>;
    loadSettings(): Promise<SystemSettings>;
    saveSettings(settings: SystemSettings): Promise<void>;
    importBook(file: string | File, books: Book[], saveBook?: boolean, saveCover?: boolean, overwrite?: boolean, transient?: boolean): Promise<Book | null>;
    deleteBook(book: Book, includingUploaded?: boolean): Promise<void>;
    uploadBook(book: Book, onProgress?: ProgressHandler): Promise<void>;
    downloadBook(book: Book, onlyCover?: boolean, onProgress?: ProgressHandler): Promise<void>;
    loadBookConfig(book: Book, settings: SystemSettings): Promise<BookConfig>;
    fetchBookDetails(book: Book, settings: SystemSettings): Promise<BookDoc['metadata']>;
    saveBookConfig(book: Book, config: BookConfig, settings?: SystemSettings): Promise<void>;
    loadBookContent(book: Book, settings: SystemSettings): Promise<BookContent>;
    loadLibraryBooks(): Promise<Book[]>;
    saveLibraryBooks(books: Book[]): Promise<void>;
    getCoverImageUrl(book: Book): string;
    getCoverImageBlobUrl(book: Book): Promise<string>;
    generateCoverImageUrl(book: Book): Promise<string>;
}

declare global {
    interface Window {
        __READEST_CLI_ACCESS?: boolean;
        __READEST_UPDATER_ACCESS?: boolean;
    }
}
interface EnvConfigType {
    getAppService: () => Promise<AppService>;
}

interface EnvContextType {
    envConfig: EnvConfigType;
    appService: AppService | null;
}
declare const EnvProvider: ({ children }: {
    children: ReactNode;
}) => React__default.JSX.Element;
declare const useEnv: () => EnvContextType;

type RouterType = {
    back: () => void;
    forward: () => void;
    refresh: () => void;
    push: (url: string, options?: {
        scroll?: boolean;
    }) => void;
    replace: (url: string, options?: {
        scroll?: boolean;
    }) => void;
    prefetch: (url: string) => void;
};

declare const AppRouterContext: React__default.Context<RouterType | null>;
declare const PathnameContext: React__default.Context<string>;
declare const SearchParamsContext: React__default.Context<URLSearchParams>;

declare function MockNextNavigation({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
declare function useRouter(): RouterType;
declare function usePathname(): string;
declare function useSearchParams(): URLSearchParams;

type SyncType = 'books' | 'configs' | 'notes';
interface BookRecord extends BookDataRecord, Book {
}
interface BookConfigRecord extends BookDataRecord, BookConfig {
}
interface BookNoteRecord extends BookDataRecord, BookNote {
}
interface SyncResult {
    books: BookRecord[] | null;
    notes: BookNoteRecord[] | null;
    configs: BookConfigRecord[] | null;
}
interface SyncData {
    books?: Partial<BookRecord>[];
    notes?: Partial<BookNoteRecord>[];
    configs?: Partial<BookConfigRecord>[];
}
declare class SyncClient {
    /**
     * Pull incremental changes since a given timestamp (in ms).
     * Returns empty result as authentication is removed.
     */
    pullChanges(since: number, type?: SyncType, book?: string): Promise<SyncResult>;
    /**
     * Push local changes to the server.
     * No-op as authentication is removed.
     */
    pushChanges(payload: SyncData): Promise<SyncResult>;
}

interface SyncContextType {
    syncClient: SyncClient;
}
declare const SyncProvider: React__default.FC<{
    children: React__default.ReactNode;
}>;
declare const useSyncContext: () => SyncContextType;

interface SettingsState {
    settings: SystemSettings;
    isFontLayoutSettingsDialogOpen: boolean;
    isFontLayoutSettingsGlobal: boolean;
    setSettings: (settings: SystemSettings) => void;
    saveSettings: (envConfig: EnvConfigType, settings: SystemSettings) => void;
    setFontLayoutSettingsDialogOpen: (open: boolean) => void;
    setFontLayoutSettingsGlobal: (global: boolean) => void;
}
declare const useSettingsStore: zustand.UseBoundStore<zustand.StoreApi<SettingsState>>;

interface ThemeCode {
    bg: string;
    fg: string;
    primary: string;
    palette: Palette;
    isDarkMode: boolean;
}

interface ThemeState {
    themeMode: ThemeMode;
    themeColor: string;
    systemIsDarkMode: boolean;
    themeCode: ThemeCode;
    isDarkMode: boolean;
    getIsDarkMode: () => boolean;
    setThemeMode: (mode: ThemeMode) => void;
    setThemeColor: (color: string) => void;
    updateAppTheme: (color: keyof Palette) => void;
    saveCustomTheme: (envConfig: EnvConfigType, settings: SystemSettings, theme: CustomTheme, isDelete?: boolean) => void;
}
declare const useThemeStore: zustand.UseBoundStore<zustand.StoreApi<ThemeState>>;

interface SidebarState {
    sideBarBookKey: string | null;
    sideBarWidth: string;
    isSideBarVisible: boolean;
    isSideBarPinned: boolean;
    setSideBarBookKey: (key: string) => void;
    setSideBarWidth: (width: string) => void;
    toggleSideBar: () => void;
    toggleSideBarPin: () => void;
    setSideBarVisible: (visible: boolean) => void;
    setSideBarPin: (pinned: boolean) => void;
}
declare const useSidebarStore: zustand.UseBoundStore<zustand.StoreApi<SidebarState>>;

type TTSGranularity = 'sentence' | 'word';
interface FoliateView extends HTMLElement {
    open: (book: BookDoc) => Promise<void>;
    close: () => void;
    init: (options: {
        lastLocation: string;
    }) => void;
    goTo: (href: string) => void;
    goToFraction: (fraction: number) => void;
    prev: (distance: number) => void;
    next: (distance: number) => void;
    goLeft: () => void;
    goRight: () => void;
    getCFI: (index: number, range: Range) => string;
    addAnnotation: (note: BookNote, remove?: boolean) => {
        index: number;
        label: string;
    };
    search: (config: BookSearchConfig) => AsyncGenerator<BookSearchResult | string, void, void>;
    clearSearch: () => void;
    select: (target: string | number | {
        fraction: number;
    }) => void;
    deselect: () => void;
    initTTS: (granularity?: TTSGranularity) => Promise<void>;
    book: BookDoc;
    tts: any | null;
    language: {
        locale?: string;
        isCJK?: boolean;
    };
    history: {
        canGoBack: boolean;
        canGoForward: boolean;
        back: () => void;
        forward: () => void;
        clear: () => void;
    };
    renderer: {
        scrolled?: boolean;
        size: number;
        viewSize: number;
        start: number;
        end: number;
        setAttribute: (name: string, value: string | number) => void;
        removeAttribute: (name: string) => void;
        next: () => Promise<void>;
        prev: () => Promise<void>;
        goTo?: (params: {
            index: number;
            anchor: number;
        }) => void;
        setStyles?: (css: string) => void;
        getContents: () => {
            doc: Document;
            index?: number;
        }[];
        addEventListener: (type: string, listener: EventListener) => void;
        removeEventListener: (type: string, listener: EventListener) => void;
    };
}
declare const wrappedFoliateView: (originalView: FoliateView) => FoliateView;

interface DBBook {
    user_id: string;
    book_hash: string;
    format: string;
    title: string;
    author: string;
    group_id?: string;
    group_name?: string;
    tags?: string[];
    progress?: [number, number];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    uploaded_at?: string | null;
}
interface DBBookConfig {
    user_id: string;
    book_hash: string;
    location?: string;
    progress?: string;
    search_config?: string;
    view_settings?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}
interface DBBookNote {
    user_id: string;
    book_hash: string;
    id: string;
    type: string;
    cfi: string;
    text?: string;
    style?: string;
    color?: string;
    note: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export { type AppPlatform, AppRouterContext, type AppService, type BaseDir, type Book, type BookConfig, type BookContent, type BookDataRecord, type BookFont, type BookFormat, type BookGroupType, type BookLayout, type BookNote, type BookNoteType, type BookProgress, type BookSearchConfig, type BookSearchMatch, type BookSearchResult, type BookStyle, type BooknoteGroup, type BooksGroup, type DBBook, type DBBookConfig, type DBBookNote, EnvProvider, type FileSystem, type FoliateView, FoliateViewer, FooterBar, HeaderBar, type HighlightColor, type HighlightStyle, MockNextNavigation, type PageInfo, PathnameContext, type ReadSettings, Reader, ReaderContent, type SearchExcerpt, SearchParamsContext, SettingsDialog, SideBar, SyncProvider, type SystemSettings, TOCView, type TTSConfig, type TTSGranularity, type ThemeType, type ViewConfig, type ViewSettings, type WritingMode, Reader as default, useEnv, usePathname, useRouter, useScreenWakeLock, useSearchParams, useSettingsStore, useSidebarStore, useSyncContext, useTheme, useThemeStore, wrappedFoliateView };
