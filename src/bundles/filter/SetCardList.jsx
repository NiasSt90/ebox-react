import {Grid} from "@material-ui/core";
import {SetCardContainer} from "./SetCardContainer";
import {Waypoint} from "react-waypoint";

export const SetCardList = ({sets, filterDefinition, onNextPage}) => {
	return <>
		<h3>Sets im Filter {filterDefinition && filterDefinition.filtername}</h3>
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