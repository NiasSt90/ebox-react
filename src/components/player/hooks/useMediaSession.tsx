import {useEffect} from 'react';

interface Props {
  element: any;
  mediaMetadata: MediaMetadataInit;
  controls?: Partial<Record<MediaSessionAction, MediaSessionActionHandler | null>>;
}

export const useMediaSession = ({
  element,
  mediaMetadata,
  controls,
}: Props) => {
  useEffect(() => {
    if (!element || !('mediaSession' in navigator)) {
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata(mediaMetadata);
    Object.entries(controls ?? {})
        .forEach(([action, handler]) => navigator.mediaSession.setActionHandler(action as MediaSessionAction, handler));
    return () => {
      //TODO: check if necessary to remove the event handlers?
    }
  }, [element,mediaMetadata,controls]);
  return;
};
