import {useEffect} from 'react';

interface Props {
  element: any;
  mediaMetadata: MediaMetadata;
  controls?: { [action in MediaSessionAction]?: ((e: MediaSessionActionDetails) => void) | null };
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
    // @ts-ignore
    navigator.mediaSession.metadata = new MediaMetadata(mediaMetadata);
    // @ts-ignore
    Object.keys(controls)
        // @ts-ignore
        .forEach((c) => navigator.mediaSession.setActionHandler(c, controls[c]));
    return () => {
      //TODO: check if necessary to remove the event handlers?
    }
  }, [element,mediaMetadata,controls]);
  return;
};
