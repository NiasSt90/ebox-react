import {renderHook} from "@testing-library/react";
import {useJunkiesService} from "./useJunkiesService";

// userAtom ruft beim ersten Lesen connect auf; hier ein fester angemeldeter Nutzer
vi.mock("../context/atoms", async () => {
	const {atom} = await import("jotai");
	return {userAtom: atom({token: "t"}), loadingAtom: atom(false), notifyMessageAtom: atom(null)};
});

const mxlnode = (nid: number, extra: object = {}) => ({
	nid: String(nid), title: "Set " + nid, setcreated: "1790967900", duration: 3600, bookmarked: false,
	votes: {my: null, avg: null, count: "0", all: [], sum: 0}, comments: [], trackinfo: [], artists: [], ...extra,
});

const antworte = (json: unknown) => vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(json)));

afterEach(() => vi.restoreAllMocks());

test("vote liefert das Set aus der Antwort, ohne neu zu laden", async () => {
	const fetch = antworte(mxlnode(2001, {votes: {my: "5", avg: 5, count: "1", all: [], sum: 1}}));
	const {result} = renderHook(() => useJunkiesService());
	const set = await result.current.vote(2001, "good");
	expect(set?.nid).toBe(2001);
	expect(set?.myVote).toBe("good");
	expect(fetch).toHaveBeenCalledTimes(1);
});

test("bookmark nimmt das passende Set aus der Liste", async () => {
	antworte([mxlnode(7), mxlnode(2001, {bookmarked: true})]);
	const {result} = renderHook(() => useJunkiesService());
	const set = await result.current.bookmark(2001, true);
	expect(set?.nid).toBe(2001);
	expect(set?.bookmarked).toBe(true);
});

test("ohne Set in der Antwort: undefined", async () => {
	antworte([]);
	const {result} = renderHook(() => useJunkiesService());
	expect(await result.current.bookmark(2001, false)).toBeUndefined();
});
