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
  clear: () => void;
  /**
   * @param callback callback to call if play "ended", for example: call next() on playlist...
   */
  setEndedCallback: (callback: (event:Event) => void) => void;
}

