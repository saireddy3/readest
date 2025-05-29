import { useEffect, useState } from 'react';
import { loadShortcuts } from '../helpers/shortcuts';

const useShortcuts = (actions, dependencies = []) => {
  const [shortcuts, setShortcuts] = useState(loadShortcuts);

  useEffect(() => {
    const handleShortcutUpdate = () => {
      setShortcuts(loadShortcuts());
    };

    window.addEventListener('shortcutUpdate', handleShortcutUpdate);
    return () => window.removeEventListener('shortcutUpdate', handleShortcutUpdate);
  }, []);

  const parseShortcut = (shortcut) => {
    const keys = shortcut.toLowerCase().split('+');
    return {
      ctrlKey: keys.includes('ctrl'),
      altKey: keys.includes('alt') || keys.includes('opt'),
      metaKey: keys.includes('meta') || keys.includes('cmd'),
      shiftKey: keys.includes('shift'),
      key: keys.find((k) => !['ctrl', 'alt', 'opt', 'meta', 'cmd', 'shift'].includes(k)),
    };
  };

  const isShortcutMatch = (
    shortcut,
    key,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  ) => {
    const parsedShortcut = parseShortcut(shortcut);
    return (
      parsedShortcut.key === key.toLowerCase() &&
      parsedShortcut.ctrlKey === ctrlKey &&
      parsedShortcut.altKey === altKey &&
      parsedShortcut.metaKey === metaKey &&
      parsedShortcut.shiftKey === shiftKey
    );
  };

  const processKeyEvent = (
    key,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  ) => {
    // FIXME: This is a temporary fix to disable Back button navigation
    if (key === 'backspace') return true;
    for (const [actionName, actionHandler] of Object.entries(actions)) {
      const shortcutKey = actionName;
      const handler = actionHandler;
      const shortcutList = shortcuts[shortcutKey];
      if (
        handler &&
        shortcutList?.some((shortcut) =>
          isShortcutMatch(shortcut, key, ctrlKey, altKey, metaKey, shiftKey),
        )
      ) {
        handler();
        return true;
      }
    }
    return false;
  };

  const unifiedHandleKeyDown = (event) => {
    // Check if the focus is on an input, textarea, or contenteditable element
    const activeElement = document.activeElement;
    const isInteractiveElement =
      (activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable);

    const isNoteEditor = (activeElement.tagName === 'TEXTAREA' && activeElement.classList.contains('note-editor'))

    if (isInteractiveElement && !isNoteEditor) {
      return; // Skip handling if the user is typing in an input, textarea, or contenteditable
    }

    if (event instanceof KeyboardEvent) {
      const { key, ctrlKey, altKey, metaKey, shiftKey } = event;

      if (isNoteEditor && !((key === "Enter" && ctrlKey) || (key == "Escape"))) {
        return;
      }

      const handled = processKeyEvent(key.toLowerCase(), ctrlKey, altKey, metaKey, shiftKey);
      if (handled) event.preventDefault();
    } else if (
      event instanceof MessageEvent &&
      event.data &&
      event.data.type === 'iframe-keydown'
    ) {
      const { key, ctrlKey, altKey, metaKey, shiftKey } = event.data;
      processKeyEvent(key.toLowerCase(), ctrlKey, altKey, metaKey, shiftKey);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', unifiedHandleKeyDown);
    window.addEventListener('message', unifiedHandleKeyDown);

    return () => {
      window.removeEventListener('keydown', unifiedHandleKeyDown);
      window.removeEventListener('message', unifiedHandleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcuts, ...dependencies]);
};

export default useShortcuts; 