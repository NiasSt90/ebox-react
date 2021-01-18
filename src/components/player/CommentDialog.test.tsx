import {act, fireEvent, render, RenderResult} from "@testing-library/react";
import {CommentDialog} from "./CommentDialog";
import {PlaylistItem} from "../../hooks/types";
import userEvent from "@testing-library/user-event";

test("show comment dialog for a set", () => {
	const item: PlaylistItem = {nid: 1, title: "SET_TITLE", myVote: "good", artist: "ARTIST", url: "url", artwork: {}};
	const handleClose = jest.fn();
	const handleComment = jest.fn();
	const container = render(<CommentDialog open={true} item={item} handleClose={handleClose} handleComment={handleComment}/>);
	let titleElement = container.getByTestId("title");
	let inputElement = container.getByTestId("input");
	let submitElement = container.getByTestId("submit");
	let cancelElement = container.getByTestId("cancel");
	expect(submitElement).toBeDisabled();
	expect(titleElement?.innerHTML).toEqual("SET_TITLE/ARTIST");

	act(() => {
		fireEvent.change(inputElement!, {target: { value: "Mein Kommentar zu dem Set"}})
	});
	expect(submitElement).toBeEnabled();

	act(() => {
		fireEvent.click(cancelElement!)
	});
	expect(handleClose).toBeCalledTimes(1);

	act(() => {
		fireEvent.click(submitElement!)
	});
	expect(handleComment).toBeCalledWith("Mein Kommentar zu dem Set", item);
});
