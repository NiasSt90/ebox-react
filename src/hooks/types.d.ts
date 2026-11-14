export interface NotifyMessage {
    message: string;
    severity: "success"|"info"|"warning"|"error";
    autohide: number;
}

export interface JunkiesService {
    buildTrackUrl(nid: number, downloadfilename: string):string;
    filterlist(id: number):Promise<EBoxFilter[]>;
    setlist(searchParams: any):Promise<EBoxSet[]>;
    /** ein Set mit allen Details; undefined, wenn es nicht (mehr) aktiv ist */
    set(nid: number):Promise<EBoxSet|undefined>;
    /** „Gerade gehört“: Plays der letzten 120 min, neueste zuerst */
    playing():Promise<EBoxPlay[]>;
    playinform(nid: number):Promise;
    vote(nid: number, vote: EBoxVote):Promise;
    bookmark(nid: number, createBookmark: boolean): Promise;
    createComment(nid: number, text: string): Promise;
}

export interface EBoxFilter {
    filterid: number;
    filtername: string;
}

export interface EBoxSearchParams {
    page: number;
    filterid?:number;
    s?: string;
    /** Basisfilter, z. B. 12 = zuletzt gut bewertet */
    votings?: number;
}

export interface EBoxGenre {
    tid: number;
    name: string;
}

type ArtistImageSizes = "small"|"large"|"extralarge"|"mega";

export interface EBoxArtist {
    nid: number;
    djid: number;
    name: string;
    /** Kurz-Bio von last.fm als reiner Text */
    bio?: string;
    country?: string;
    artwork: {[size in ArtistImageSizes]?: string}
}

export type EBoxVote = "good"|"neutral"|"bad"|"canceled";

export interface EBoxTrack {
    nid: number;
    title: string;
    artist?: string;
    url: string;
    /** Sekunden */
    duration?: number;
}

/** ein Vote eines Nutzers (1–5) */
export interface EBoxUserVote {
    uid: number;
    name: string;
    vote: number;
    timestamp: Date;
}

export interface EBoxVotes {
    /** Schnitt aller Votes, ohne Votes undefined */
    avg?: number;
    count: number;
    all: EBoxUserVote[];
    /** wer das Set als erster gut bewertet hat */
    firstGood?: EBoxUserVote;
}

export interface EBoxPlay {
    timestamp: Date;
    uid: number;
    name: string;
    /** Client, der den Play gemeldet hat (App-Version, "XBMC", …) */
    caller: string;
    set: EBoxSet;
}

export interface EBoxComment {
    cid: number;
    pid: number;
    uid: number;
    name: string;
    subject: string;
    /** reiner Text (Tags entfernt) */
    text: string;
    timestamp: Date;
    /** Drupal-Thread-Schlüssel ("01/", "01.00/"), Tiefe = Anzahl Punkte */
    thread: string;
}
export interface EBoxSet {
    nid: number;
    title: string;
    duration: Date;
    created: Date;
    lastheard?: Date;
    bookmarked: boolean;
    myVote?: EBoxVote;
    genres?: EBoxGenre[];
    artists: number[];
    artistDetails: EBoxArtist[];
    tracks: EBoxTrack[];
    votes?: EBoxVotes;
    comments?: EBoxComment[];
    /** Name des ersten Artists aus dem Set (ohne artistinfo-Aufruf) */
    djName?: string;
}

export interface PlaylistItem {
    nid: number;
    url: string;
    title: string;
    artist?: string;
    myVote?: EBoxVote;
    artwork: {[size in ArtistImageSizes]?: string}
}