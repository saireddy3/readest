# Location Change Tracking

The Readest project now includes comprehensive location change tracking functionality that integrates with content consumption systems, similar to the BookView component in the front project.

## Features

- **Real-time location tracking**: Monitors user progress through the book
- **Content consumption reporting**: Automatically reports consumption events to tracking systems
- **Session management**: Tracks reading sessions with duration and progress
- **Throttled reporting**: Prevents excessive API calls by throttling consumption events
- **CFI-based positioning**: Uses EPUB CFI (Content Fragment Identifier) for precise location tracking

## Usage

### Basic Usage

```jsx
import { Reader } from '@skillsoft/book-reader';

<Reader 
  bookUrl="https://example.com/book.epub"
  onLocationChange={(locationData) => {
    console.log('Location changed:', locationData);
  }}
/>
```

### With Consumption Tracking

```jsx
import { Reader } from '@skillsoft/book-reader';

<Reader 
  bookUrl="https://example.com/book.epub"
  sessionKey="session-123"
  trackConsumption={(variables) => {
    // Send to your consumption tracking system
    consumptionAPI.report(variables);
  }}
  bookId="book-456"
  bookType="BOOK"
  onLocationChange={(locationData) => {
    // Handle location changes
  }}
/>
```

## Location Data Format

The `onLocationChange` callback receives location data in the following format:

```javascript
{
  href: "chapter1.xhtml",           // Section href
  chapterRef: "chapter1",           // Chapter reference
  start: "epubcfi(/6/4[chapter1]!/4/2/1:0)",  // Start CFI
  end: "epubcfi(/6/4[chapter1]!/4/2/1:100)",  // End CFI
  method: "INTERACTIVE",            // Interaction method
  page_uri: "https://app.com/reader", // Current page URL
  duration: 0                       // Duration (calculated by consuming app)
}
```

## Consumption Event Format

The `trackConsumption` function receives consumption data in the following format:

```javascript
{
  variables: {
    contentContext: {
      uuid: "book-456",
      type: "BOOK"
    },
    eventContext: {
      action: "CONSUMED",
      sessionId: "session-123",
      sessionDurationSeconds: 120,
      positionType: "CFI",
      startPos: "epubcfi(/6/4[chapter1]!/4/2/1:0)",
      endPos: "epubcfi(/6/4[chapter1]!/4/2/1:100)",
      sectionKey: "chapter1.xhtml",
      page_uri: "https://app.com/reader"
    }
  }
}
```

## Implementation Details

### Event System

The location tracking uses an event-driven architecture:

1. **Progress Relocation Events**: Dispatched when the user navigates through the book
2. **Throttled Consumption**: Events are throttled to prevent excessive API calls (30-second intervals)
3. **Session Management**: Tracks session start time and duration
4. **Final Reporting**: Sends final consumption event on component unmount

### Hooks

- `useLocationChangeTracking`: Main hook that handles location changes and consumption tracking
- `useProgressSync`: Existing hook for syncing progress across devices
- `useProgressAutoSave`: Existing hook for auto-saving progress

### Integration Points

- **FoliateViewer**: Dispatches `progress-relocated` events
- **Reader**: Listens for events and calls external callbacks
- **External Systems**: Receive consumption data via `trackConsumption` callback

## Configuration

### Throttling

Consumption events are throttled to prevent excessive API calls. The default interval is 30 seconds, but this can be adjusted in the `useLocationChangeTracking` hook.

### Session Management

Sessions are automatically managed based on the `sessionKey` prop. The session start time is recorded when the component mounts, and duration is calculated for each consumption event.

### CFI Tracking

The system uses EPUB CFI (Content Fragment Identifier) for precise location tracking, which provides accurate positioning within the book content.

## Migration from BookView

This implementation provides similar functionality to the BookView component's consumption tracking:

- ✅ Real-time location tracking
- ✅ Session duration calculation
- ✅ Throttled consumption reporting
- ✅ CFI-based positioning
- ✅ Final consumption reporting
- ✅ Integration with external tracking systems

The main difference is that this implementation is built into the Readest project and uses a more modern event-driven architecture. 