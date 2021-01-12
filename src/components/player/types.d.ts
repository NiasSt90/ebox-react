import {PlaylistItem} from "../../hooks/types";

export interface AudioState {
  buffered: {
    start: number;
    end: number;
  };
  time: number;
  duration: number;
  paused: boolean;
  waiting: boolean;
  endedCallback: (event: Event) => void;
}

export interface AudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
  seek: (time: number) => void;
  /**
   * @param callback callback to call if play "ended", for example: call next() on playlist...
   */
  setEndedCallback: (callback: (event:Event) => void) => void;
}

export interface PlaylistControls {
  addAll: (EBoxSet) => void;
  replace: (EBoxSet) => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  curPos: () => number;
  length: () => number;
}

type PlaylistRepeat = "single" | "none" | "all";
export interface PlaylistState {
  currentTrack: PlaylistItem|null;
  repeat: PlaylistRepeat;
  shuffle: boolean;
}

