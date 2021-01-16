import {useAtom} from "jotai";
import {loadingAtom, notifyMessageAtom, userAtom} from "../context/atoms";
import {useCallback, useMemo} from "react";
import {junkiesApi} from "../api/JunkiesApi";
import {defaultImageUrl} from "./useArtistDetails";
import {EBoxSet, EBoxVote, JunkiesService, NotifyMessage} from "./types";
import {mapEBoxVoteToNumber, mapNumberToEBoxVote} from "../bundles/common/helper";

//convert from json format to our own EBoxSet format (reduced)
function mapFromJsonSetlist(api: any, jsonSetList: Array<any>): EBoxSet[] {
    return jsonSetList.map((set: any, index, agg: EBoxSet[]) => {
        return {
            nid: set.nid,
            title: set.title,
            artists: set.artists.map((a: any) => a.artistnid),
            duration: new Date(set.duration * 1000),
            created: new Date(set.setcreated * 1000),
            ...set.lastheard && {lastheard: new Date(set.lastheard * 1000)},

            bookmarked: set.bookmarked,
            myVote: mapNumberToEBoxVote(Number.parseInt(set.votes?.my)),
            ...set.taxonomy && {genres: Object.values(set.taxonomy).map((t: any) => ({name: t.name, tid: t.tid}))},

            tracks: set.trackinfo.map((track: any) => {
                return {
                    nid: set.nid,
                    title: track.title || set.title,
                    artist: track.artist,
                    url: api.buildTrackUrl(set.nid, track.downloadfilename),
                }
            }),
            artistDetails: [{
                nid: 0,
                name: "unbekannt",
                artwork: {
                    small: defaultImageUrl,
                    large: defaultImageUrl,
                    extralarge: defaultImageUrl,
                    mega: defaultImageUrl
                }
            }],
            x: 11
        } as EBoxSet
    });
}

export const useJunkiesService = (): JunkiesService => {
    const [user] = useAtom(userAtom);
    const [, setLoading] = useAtom(loadingAtom);
    const [, setNotifyMessage] = useAtom(notifyMessageAtom);
    const showError = useCallback((error) => {
        console.log(error);
        setNotifyMessage({
            message: error.message,
            severity: "error",
            autohide: 10000
        } as NotifyMessage)
    }, [setNotifyMessage]);

    return useMemo(() => {
        return {
            buildTrackUrl: (nid: number, downloadfilename: string) => {
                return junkiesApi(user).buildTrackUrl(nid, downloadfilename);
            },

            filterlist: (filterid: number) => {
                return junkiesApi(user).filterlist(filterid)
                    .then(result => result.filters)
                    .catch(showError)
            },

            setlist: (searchParams: any) => {
                setLoading(true)
                return junkiesApi(user).setlist(searchParams)
                    .then(sets => mapFromJsonSetlist(junkiesApi(user), sets))
                    .finally(() => setLoading(false))
            },

            playinform: (nid: number) => {
                return junkiesApi(user).playinform(nid).catch(showError)
            },

            vote: (nid: number, vote: EBoxVote) => {
                return junkiesApi(user).vote(nid, mapEBoxVoteToNumber(vote)).catch(showError)
            },

            bookmark: (nid: number, createBookmark: boolean) => {
                if (createBookmark) {
                    return junkiesApi(user).addbookmark(nid).catch(showError);
                }
                return junkiesApi(user).delbookmark(nid).catch(showError)
            },

            createComment: (nid: number, text: string) => {
                return junkiesApi(user).createComment(nid, text)
                    .catch(showError);
            }
        }
    }, [user, showError, setLoading]);
};
