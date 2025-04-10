# Direct Book Reader

A simplified version of Readest that directly loads ebooks from URLs, bypassing the library interface.

## Features

- Direct book loading from URLs
- Full-featured EPUB reader
- Text-to-speech capabilities
- Annotations and highlights
- Search functionality
- Responsive design for all devices

## How to Use

1. The app will automatically load the book specified in the URL constant.
2. To change the book URL, edit the `BOOK_URL` constant in the `/app/direct-reader/page.tsx` file.
3. The default book URL is: `https://cdn.readest.com/books/this-side-of-paradise.epub`

## Available Books

The following books are available from the cdn.readest.com server:

- https://cdn.readest.com/books/a-room-of-one-s-own.epub
- https://cdn.readest.com/books/hamlet.epub
- https://cdn.readest.com/books/meditations.epub
- https://cdn.readest.com/books/the-great-gatsby.epub
- https://cdn.readest.com/books/the-scarlet-letter.epub
- https://cdn.readest.com/books/this-side-of-paradise.epub

## Development

### Running the App

```bash
npm run dev
```

### Building the App

```bash
npm run build
npm start
```

## Technology Stack

- Next.js
- React
- Zustand for state management
- Foliate.js for EPUB rendering

## Note

This is a simplified version focused exclusively on the direct book reader functionality. The library management features have been removed to provide a streamlined reading experience. 