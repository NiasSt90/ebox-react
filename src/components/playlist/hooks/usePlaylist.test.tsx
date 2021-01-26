import {usePlaylist} from "./usePlaylist";
import {AllTheProviders} from "../../../setupTests";
import {EBoxArtist, EBoxSet, EBoxTrack} from "../../../hooks/types";
import {act, renderHook} from '@testing-library/react-hooks'

const set:EBoxSet = {
	nid:1, title: "title", artists:[1], duration: new Date(2*3600), created: new Date(),
	bookmarked:true, myVote: "good",
	tracks:[ {title:"trackTitle", artist:"TrackArtist", nid: 1, url: "http://localhost/1"} as EBoxTrack ],
	artistDetails:[
		{nid:10, djid: 11, name: "DJ-Name", artwork:{	small:"url_small",mega:"mega"	}} as EBoxArtist
	]
}


test('usePlaylist - initial state', () => {
	const {result} = renderHook(() => usePlaylist(), {wrapper: AllTheProviders})
	// initial state check
	expect(result.current.state.currentTrack).toBeNull();
	expect(result.current.state.repeat).toEqual("none")
	expect(result.current.controls.hasNext()).toEqual(false);
})

test('usePlaylist - replace/add sets', () => {
	const {result} = renderHook(() => usePlaylist(), {wrapper: AllTheProviders})
	// replace set -> currentTrack should be set
	act(() => {
		result.current.controls.replace(set);
	})
	expect(result.current.state.currentTrack).toEqual({
		nid: 1, url: "http://localhost/1", title: "trackTitle", artist: "TrackArtist", myVote: "good",
		artwork: {small: "url_small", mega: "mega"}
	})
	expect(result.current.controls.curPos()).toEqual(1)
	expect(result.current.controls.length()).toEqual(1)
	expect(result.current.controls.hasNext()).toEqual(false);

	// add second set -> length + curPos check
	act(() => {
		result.current.controls.addAll({...set, nid: 2});
	})
	expect(result.current.controls.curPos()).toEqual(1)
	expect(result.current.controls.length()).toEqual(2)
	expect(result.current.controls.hasNext()).toEqual(true);
})

test('usePlaylist - repeat', () => {
	const {result} = renderHook(() => usePlaylist(), {wrapper: AllTheProviders})

	//all
	act(() => {
		result.current.controls.setRepeat("all");
	});
	expect(result.current.controls.hasNext()).toEqual(false);

})