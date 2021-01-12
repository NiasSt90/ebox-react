import {Grid} from "@material-ui/core";
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
		<Grid container spacing={3} direction="row" justify="space-evenly" alignItems="stretch">
			{sets && sets.map((set, i) =>
					<Grid key={i} item xs>
						<SetCardContainer nummer={i + 1} cardData={set}/>
						{i === sets.length - 10 && (
								<Waypoint onEnter={onNextPage}/>)
						}
					</Grid>)
			}
		</Grid>
	</>
}