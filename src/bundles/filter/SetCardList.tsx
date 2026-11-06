import {Grid} from "@mui/material";
import {SetCardContainer} from "./SetCardContainer";
import {Waypoint} from "react-waypoint";
import {EBoxFilter, EBoxSet} from "../../hooks/types";

interface Props {
	sets: EBoxSet[];
	filter?: EBoxFilter;
	onNextPage():void;
}

export const SetCardList = ({sets, filter, onNextPage}:Props) => {
	return <>
		<h3>Sets im Filter {filter && filter.filtername}</h3>
		<Grid container spacing={3} sx={{justifyContent: "space-evenly", alignItems: "stretch"}}>
			{sets && sets.map((set, i) =>
					// MUI-Grid setzt min-width: 0; ohne "auto" schrumpfen die Karten unter ihre feste Breite, statt umzubrechen.
					<Grid key={i} size="grow" sx={{minWidth: "auto"}}>
						<SetCardContainer nummer={i + 1} cardData={set}/>
						{i === sets.length - 10 && (
								<Waypoint onEnter={onNextPage}/>)
						}
					</Grid>)
			}
		</Grid>
	</>
}