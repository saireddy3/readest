import { useEffect, useRef, useCallback } from 'react';
import { eventDispatcher } from '../../../utils/event';

export const useLocationChangeTracking = (onLocationChange, sessionKey, trackConsumption, bookId, bookType, instanceNumber) => {
  const lastLocationRef = useRef(null);
  const sessionStartTimeRef = useRef(null);
  const lastConsumptionTimeRef = useRef(null);
  const consumptionTimeoutRef = useRef(null);
  
  // Initialize session start time
  useEffect(() => {
    if (sessionKey && !sessionStartTimeRef.current) {
      sessionStartTimeRef.current = Date.now();
    }
  }, [sessionKey]);
  // Calculate session duration
  const getSessionDuration = useCallback(() => {
    if (!sessionStartTimeRef.current) return 0;
    return Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
  }, []);

  // Send consumption event
  const sendConsumptionEvent = useCallback((locationData) => {
    if (!sessionKey || !trackConsumption) return;

    const sessionDuration = getSessionDuration();
    
    trackConsumption({
      variables: {
        contentContext: {
          uuid: bookId,
          type: bookType || 'BOOK',
        },
        eventContext: {
          action: 'CONSUMED',
          sessionId: sessionKey,
          instanceNumber: instanceNumber,
          sessionDurationSeconds: sessionDuration,
          positionType: 'CFI',
          startPos: locationData.start || '',
          endPos: locationData.end || '',
          sectionKey: locationData.total || '',
          sectionChangeCount: locationData.total || '',
          
        },
      },
    });
  }, [sessionKey, trackConsumption, bookId, bookType, getSessionDuration, instanceNumber]);

  // Handle location changes with throttling
  const handleLocationChange = useCallback((locationData) => {
    // Call the original onLocationChange callback
    if (onLocationChange) {
      onLocationChange(locationData);
    }

    // Check if location has actually changed
    const currentLocation = `${locationData.start}-${locationData.end}`;
    if (lastLocationRef.current === currentLocation) {
      return;
    }
    lastLocationRef.current = currentLocation;

    // Clear existing timeout
    if (consumptionTimeoutRef.current) {
      clearTimeout(consumptionTimeoutRef.current);
    }

    // Send consumption event with throttling (every 30 seconds)
    const now = Date.now();
    if (!lastConsumptionTimeRef.current || (now - lastConsumptionTimeRef.current) > 30000) {
      sendConsumptionEvent(locationData);
      lastConsumptionTimeRef.current = now;
    } else {
      // Schedule consumption event for later
      consumptionTimeoutRef.current = setTimeout(() => {
        sendConsumptionEvent(locationData);
        lastConsumptionTimeRef.current = Date.now();
      }, 30000 - (now - lastConsumptionTimeRef.current));
    }
  }, [onLocationChange, sendConsumptionEvent]);

  // Set up event listener
  useEffect(() => {
    const handleProgressRelocated = (event) => {
      const { detail } = event;
      const { cfi, tocItem, section, range } = detail;
      
      const locationData = {
        total: section?.href || '',
        chapterRef: tocItem?.href || '',
        start: cfi || '',
        end: range?.end || cfi || '',
        method: 'INTERACTIVE',
        page_uri: window.location.href,
        duration: 0,
      };

      handleLocationChange(locationData);
    };

    eventDispatcher.on('progress-relocated', handleProgressRelocated);

    return () => {
      eventDispatcher.off('progress-relocated', handleProgressRelocated);
      if (consumptionTimeoutRef.current) {
        clearTimeout(consumptionTimeoutRef.current);
      }
    };
  }, [handleLocationChange]);

  // Send final consumption event on unmount
  useEffect(() => {
    return () => {
      if (sessionKey && trackConsumption && lastLocationRef.current) {
        sendConsumptionEvent({
          start: '0',
          end: '100',
          href: '',
          chapterRef: '',
          method: 'COMPLETED',
          page_uri: window.location.href,
          duration: getSessionDuration(),
        });
      }
    };
  }, [sessionKey, trackConsumption, sendConsumptionEvent, getSessionDuration]);

  return {
    sendConsumptionEvent,
    getSessionDuration,
  };
}; 