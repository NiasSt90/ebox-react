export interface NotifyMessage {
    message: string;
    severity: "success"|"info"|"warning"|"error";
    autohide: number;
}

export interface JunkiesService {
    buildTrackUrl(nid: number, downloadfilename: string):string;
    filterlist(id: number):Promise<EBoxFilter[]>;
    setlist(searchParams: any):Promise<EBoxSet[]>;
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
    artwork: {[size in ArtistImageSizes]?: string}
}

type EBoxVote = "good"|"neutral"|"bad"|"canceled";

export interface EBoxTrack {
    nid: number;
    title: string;
    artist?: string;
    url: string;
}
export interface EBoxSet {
    nid: number;
    title: string;
    duration: Date;
    created: Date;
    lastheard?: Date;
    bookmarked: boolean;
    genres?: EBoxGenre[];
    artists: number[];
    artistDetails: EBoxArtist[];
    tracks: EBoxTrack[];
}

export interface PlaylistItem {
    nid: number;
    url: string;
    title: string;
    artist?: string;
    artwork: {[size in ArtistImageSizes]?: string}
}