import PersistentDrawerLeft from "./components/NavigationDrawer";
import {Navigate, Route, Routes, useMatch, useParams} from "react-router";
import {Home} from "./bundles/home/Home";
import LoginDialog from "./bundles/login/LoginDialog";
import {RequireAuth} from "./bundles/common/RequireAuth";
import {SetCardListContainer} from "./bundles/filter/SetCardListContainer";
import {SetDetailContainer} from "./bundles/set/SetDetailContainer";
import {PlayingContainer} from "./bundles/playing/PlayingContainer";
import {LastGoodVotedContainer} from "./bundles/lastgood/LastGoodVotedContainer";
import {NotifierMessageContainer} from "./bundles/common/NotifierMessageContainer";
import {EBoxPlayerContainer} from "./components/player/EBoxPlayerContainer";
import {LoadingIndicator} from "./bundles/common/LoadingIndicator";
import {Logo} from "./components/Logo";
import {Box} from "@mui/material";

// Eigener key je Filter-ID, damit beim Wechsel zwischen Filtern der komplette Listen-State neu beginnt.
const FilterPage = () => {
	const {id} = useParams();
	return <SetCardListContainer key={id ?? 'empty'}/>;
}

// Eigener key je Set, damit beim Wechsel (z. B. aus dem Player) kein alter Stand stehen bleibt.
const SetDetailPage = () => {
	const {nid} = useParams();
	return <SetDetailContainer key={nid}/>;
}

export const AppPageRouter = () => {
	const logoMatch = useMatch("/logo");
	return <>
		{logoMatch ?
			<Box sx={{p: 4}}><Logo/></Box> :
			<PersistentDrawerLeft>
				<Routes>
					<Route path="/" element={<Navigate to="/home" replace/>}/>
					<Route path="/home" element={<Home/>}/>
					<Route path="/login" element={<LoginDialog/>}/>
					<Route path="/filter/:id" element={<RequireAuth><FilterPage/></RequireAuth>}/>
					<Route path="/set/:nid" element={<RequireAuth><SetDetailPage/></RequireAuth>}/>
					<Route path="/playing" element={<RequireAuth><PlayingContainer/></RequireAuth>}/>
					<Route path="/lastgood" element={<RequireAuth><LastGoodVotedContainer/></RequireAuth>}/>
				</Routes>
				<NotifierMessageContainer/>
				<EBoxPlayerContainer/>
			</PersistentDrawerLeft>
		}
		<LoadingIndicator/>
	</>
}