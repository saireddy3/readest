# API Documentation - @saireddy3/book-reader

## Overview

The `@saireddy3/book-reader` package provides a comprehensive React component library for building e-book reading applications. It supports EPUB formats and provides a rich reading experience with customizable themes, annotations, and more.

## Installation

```bash
npm install @saireddy3/book-reader@latest
```

## Basic Usage

```javascript
import { Reader } from '@saireddy3/book-reader';
import '@saireddy3/book-reader/dist/index.css';

function App() {
  return (
    <div className="App">
      <Reader />
    </div>
  );
}
```

## Components

### Reader

The main component that renders the e-book reader interface.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `string` | `'light'` | Theme for the reader (`'light'`, `'dark'`, or custom theme name) |
| `locale` | `string` | `'en'` | Language locale for internationalization |
| `onBookLoad` | `function` | `undefined` | Callback fired when a book is loaded |
| `onProgress` | `function` | `undefined` | Callback fired when reading progress changes |
| `onAnnotation` | `function` | `undefined` | Callback fired when annotations are created/updated |
| `defaultBook` | `string` | `undefined` | URL or path to default book to load |
| `settings` | `object` | `{}` | Default reader settings |

#### Example

```javascript
<Reader
  theme="dark"
  locale="en"
  onBookLoad={(book) => console.log('Book loaded:', book)}
  onProgress={(progress) => console.log('Progress:', progress)}
  defaultBook="/path/to/book.epub"
  settings={{
    fontSize: 16,
    fontFamily: 'serif',
    lineHeight: 1.5
  }}
/>
```

### ReaderContent

A lower-level component for rendering book content without the full UI.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `book` | `object` | `required` | Book object containing EPUB data |
| `settings` | `object` | `{}` | Reader settings |
| `onProgress` | `function` | `undefined` | Progress callback |

### Sidebar

Component for displaying table of contents, bookmarks, and notes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `book` | `object` | `required` | Book object |
| `isOpen` | `boolean` | `false` | Whether sidebar is open |
| `onClose` | `function` | `undefined` | Callback for closing sidebar |
| `activeTab` | `string` | `'toc'` | Active tab (`'toc'`, `'bookmarks'`, `'notes'`) |

## Hooks

### useReader

Hook for managing reader state and functionality.

```javascript
import { useReader } from '@saireddy3/book-reader';

function CustomReader() {
  const {
    book,
    currentChapter,
    progress,
    settings,
    loadBook,
    nextChapter,
    prevChapter,
    updateSettings
  } = useReader();

  // Your component logic
}
```

### useAnnotations

Hook for managing annotations and highlights.

```javascript
import { useAnnotations } from '@saireddy3/book-reader';

function AnnotationManager() {
  const {
    annotations,
    highlights,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    addHighlight,
    removeHighlight
  } = useAnnotations();

  // Your component logic
}
```

## Theming

### Built-in Themes

- `light` - Default light theme
- `dark` - Dark theme
- `sepia` - Sepia theme for reduced eye strain

### Custom Themes

You can create custom themes by extending the base theme:

```javascript
import { createTheme } from '@saireddy3/book-reader';

const customTheme = createTheme({
  name: 'custom',
  colors: {
    background: '#f5f5f5',
    text: '#333333',
    primary: '#0066cc',
    secondary: '#666666'
  },
  fonts: {
    body: 'Georgia, serif',
    heading: 'Arial, sans-serif'
  }
});
```

## Settings

The reader supports various customization options:

```javascript
const settings = {
  // Typography
  fontSize: 16,           // Font size in px
  fontFamily: 'serif',    // Font family
  lineHeight: 1.5,        // Line height
  
  // Layout
  columnWidth: 600,       // Column width in px
  pageMargins: 20,        // Page margins in px
  
  // Behavior
  autoSave: true,         // Auto-save reading progress
  smoothScrolling: true,  // Enable smooth scrolling
  
  // Accessibility
  highContrast: false,    // High contrast mode
  fontSize: 'large',      // Font size for accessibility
  
  // Features
  ttsEnabled: true,       // Text-to-speech
  annotationsEnabled: true, // Annotations
  bookmarksEnabled: true  // Bookmarks
};
```

## Events

### Book Loading Events

```javascript
<Reader
  onBookLoad={(book) => {
    console.log('Book loaded:', book.title);
  }}
  onLoadError={(error) => {
    console.error('Failed to load book:', error);
  }}
/>
```

### Reading Progress Events

```javascript
<Reader
  onProgress={(progress) => {
    console.log('Reading progress:', progress);
    // progress: { chapter: 1, page: 5, percentage: 25 }
  }}
  onChapterChange={(chapter) => {
    console.log('Chapter changed:', chapter);
  }}
/>
```

### Annotation Events

```javascript
<Reader
  onAnnotation={(annotation) => {
    console.log('Annotation created:', annotation);
  }}
  onHighlight={(highlight) => {
    console.log('Text highlighted:', highlight);
  }}
/>
```

## TypeScript Support

The package includes TypeScript definitions:

```typescript
import { Reader, ReaderProps, BookData, ReaderSettings } from '@saireddy3/book-reader';

interface CustomReaderProps extends ReaderProps {
  customProp: string;
}

const MyReader: React.FC<CustomReaderProps> = ({ customProp, ...props }) => {
  return <Reader {...props} />;
};
```

## Error Handling

```javascript
<Reader
  onError={(error) => {
    console.error('Reader error:', error);
    // Handle error (show toast, fallback UI, etc.)
  }}
  onLoadError={(error) => {
    console.error('Book load error:', error);
    // Handle book loading errors
  }}
/>
```

## Performance Optimization

For better performance with large books:

```javascript
<Reader
  settings={{
    virtualScrolling: true,  // Enable virtual scrolling
    lazyLoading: true,       // Lazy load chapters
    chunkSize: 10,          // Load chapters in chunks
    cacheSize: 100          // Cache size in MB
  }}
/>
```

## Accessibility

The reader includes built-in accessibility features:

```javascript
<Reader
  settings={{
    highContrast: true,
    fontSize: 'large',
    screenReaderSupport: true,
    keyboardNavigation: true,
    focusIndicators: true
  }}
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- React 18+
- foliate-js 1.0.1+
- i18next 24.0.0+
- zustand 5.0.0+

## License

MIT License - see LICENSE file for details. 