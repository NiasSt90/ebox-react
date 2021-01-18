import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {PlaylistItem} from "../../hooks/types";
import {ChangeEvent, useState} from "react";

interface Props {
    open: boolean;
    item: PlaylistItem;
    handleClose: () => void;
    handleComment: (text: string, item: PlaylistItem) => void;
}

export const CommentDialog: React.FC<Props> = ({open,item,handleClose,handleComment}:Props) => {
    const [ value, setValue ] = useState<string>("");
    const handleInputChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    return <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose}>
        <DialogTitle>Kommentar</DialogTitle>
        <DialogContent>
            <DialogContentText data-testid="title">{item.title}/{item.artist}</DialogContentText>
            <TextField inputProps={{"data-testid":"input"}} autoFocus multiline={true} fullWidth margin="dense" rows={3} rowsMax={5}
                       label="dein Kommentar" type="text" value={value} onChange={handleInputChange}/>
        </DialogContent>
        <DialogActions>
            <Button data-testid="cancel" onClick={handleClose} color="primary">Abbrechen</Button>
            <Button data-testid="submit" disabled={value === ""}
                onClick={() => handleComment(value as string, item)} color="primary">Hinzufügen</Button>
        </DialogActions>
    </Dialog>
}