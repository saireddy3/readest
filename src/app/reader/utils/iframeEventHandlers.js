import {
  DISABLE_DOUBLE_CLICK_ON_MOBILE,
  DOUBLE_CLICK_INTERVAL_THRESHOLD_MS,
  LONG_HOLD_THRESHOLD,
} from '../../../services/constants';
import { eventDispatcher } from '../../../utils/event';
import { getOSPlatform } from '../../../utils/misc';

// Initialize doubleClickEnabled in a way that works with SSR
const doubleClickEnabled = typeof window === 'undefined' ? 
  true : // Default value during SSR
  !DISABLE_DOUBLE_CLICK_ON_MOBILE || !['android', 'ios'].includes(getOSPlatform());

let lastClickTime = 0;
let longHoldTimeout = null;

export const handleKeydown = (bookKey, event) => {
  if (["Backspace", "ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
  }
  window.postMessage(
    {
      type: 'iframe-keydown',
      bookKey,
      key: event.key,
      code: event.code,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
    },
    '*',
  );
};

export const handleMousedown = (bookKey, event) => {
  longHoldTimeout = setTimeout(() => {
    longHoldTimeout = null;
  }, LONG_HOLD_THRESHOLD);

  window.postMessage(
    {
      type: 'iframe-mousedown',
      bookKey,
      button: event.button,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
    },
    '*',
  );
};

export const handleMouseup = (bookKey, event) => {
  // we will handle mouse back and forward buttons ourselves
  if ([3, 4].includes(event.button)) {
    event.preventDefault();
  }
  window.postMessage(
    {
      type: 'iframe-mouseup',
      bookKey,
      button: event.button,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
    },
    '*',
  );
};

export const handleWheel = (bookKey, event) => {
  window.postMessage(
    {
      type: 'iframe-wheel',
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
      offsetY: event.offsetY,
    },
    '*',
  );
};

export const handleClick = (bookKey, event) => {
  const now = Date.now();

  if (doubleClickEnabled && now - lastClickTime < DOUBLE_CLICK_INTERVAL_THRESHOLD_MS) {
    lastClickTime = now;
    window.postMessage(
      {
        type: 'iframe-double-click',
        bookKey,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      },
      '*',
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
      if (element.classList.contains('js_readerFooterNote')) {
        eventDispatcher.dispatch('footnote-popup', {
          bookKey,
          element,
          footnote: element.getAttribute('data-wr-footernote') || '',
        });
        return;
      }
      element = element.parentElement;
    }

    // if long hold is detected, we don't want to send single click event
    if (!longHoldTimeout) {
      return;
    }

    window.postMessage(
      {
        type: 'iframe-single-click',
        bookKey,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      },
      '*',
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

const handleTouchEv = (bookKey, event, type) => {
  const touch = event.targetTouches[0];
  const touches = [];
  if (touch) {
    touches.push({
      clientX: touch.clientX,
      clientY: touch.clientY,
      screenX: touch.screenX,
      screenY: touch.screenY,
    });
  }
  window.postMessage(
    {
      type: type,
      bookKey,
      targetTouches: touches,
    },
    '*',
  );
};

export const handleTouchStart = (bookKey, event) => {
  handleTouchEv(bookKey, event, 'iframe-touchstart');
};

export const handleTouchMove = (bookKey, event) => {
  handleTouchEv(bookKey, event, 'iframe-touchmove');
};

export const handleTouchEnd = (bookKey, event) => {
  handleTouchEv(bookKey, event, 'iframe-touchend');
}; 