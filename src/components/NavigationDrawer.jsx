import {useState} from "react";
import {useTheme} from '@mui/material/styles';
import {Box, Switch, Tooltip} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreIcon from "@mui/icons-material/MoreVert";
import {NavigationListContainer} from "./NavigationListContainer";
import UserInfo from "./UserInfo";
import {useAtom} from "jotai";
import {darkStateAtom, pageTitleAtom, showToolbarSearchAtom, toolbarSearchInputAtom} from "../context/atoms";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from '@mui/icons-material/Lock';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import useAuthService from "../hooks/useAuthService";
import {Link, useNavigate} from "react-router";
import {ToolbarSearch} from "./ToolbarSearch";
import settings, {appVersion} from "../settings";
import {useServiceWorker} from "../ServiceWorkerProvider";

const drawerWidth = 240;

// Zahlen bei margin/padding interpretiert sx als Theme-Abstände, deshalb Pixelwerte als String.
const styles = {
	root: {
		display: 'flex',
	},
	appBar: theme => ({
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}),
	appBarShift: theme => ({
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	menuButton: {
		mr: 2,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		'& .MuiDrawer-paper': {
			width: drawerWidth,
		},
	},
	title: {
		display: {xs: 'none', sm: 'block'},
	},
	sectionDesktop: {
		display: {xs: 'none', md: 'flex'},
	},
	sectionMobile: {
		display: {xs: 'flex', md: 'none'},
	},
	drawerHeader: theme => ({
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	}),
	content: theme => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
	}),
	contentShift: theme => ({
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
};

export default function PersistentDrawerLeft(props) {
	const navigate = useNavigate();
	const authService = useAuthService();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [pageTitle] = useAtom(pageTitleAtom);
	const [showToolbarSearch] = useAtom(showToolbarSearchAtom);
	const [,setToolbarSearchInput] = useAtom(toolbarSearchInputAtom);
	const [darkState,setDarkState] = useAtom(darkStateAtom);
	const serviceWorker = useServiceWorker();



	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleMobileMenuOpen = () => {
	}

	return (
			<Box sx={styles.root}>
				<AppBar position="fixed" sx={[styles.appBar, open && styles.appBarShift]}>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
										sx={[styles.menuButton, open && styles.hide]}>
							<MenuIcon />
						</IconButton>

						<Typography sx={styles.title} variant="h6" noWrap>{pageTitle}</Typography>
						{showToolbarSearch && <ToolbarSearch onSearch={setToolbarSearchInput}/>}
						<Box sx={{flexGrow: 1}}/>

						<Box sx={styles.sectionDesktop}>
							{serviceWorker.assetsUpdateReady &&
							 <Tooltip title="Neue App-Version verfügbar...">
								 <IconButton edge="end" onClick={() => serviceWorker.updateAssets()}>
									 <SystemUpdateIcon htmlColor={"white"} />
								 </IconButton>
							 </Tooltip>
							}
							<Tooltip title="Theme wechseln">
								<Switch checked={darkState}
										  icon={<Brightness7/>} checkedIcon={<Brightness4 />}
										  onChange={() => setDarkState(!darkState)}/>
							</Tooltip>
							{!authService.isAuthenticated &&
							 <Tooltip title="Anmelden..."><IconButton edge="end" component={Link} to="/login">
								 <LockOpenIcon htmlColor={"white"}/></IconButton>
							 </Tooltip>
							}
							{authService.isAuthenticated &&
							 <Tooltip title={"Angemeldet als " + authService.user.name + " auf " + settings.REST_API_URL}>
								 <IconButton edge="end" onClick={() => authService.signout(() => navigate('/'))}>
									 <LockIcon htmlColor={"white"} />
								 </IconButton>
							 </Tooltip>
							}
						</Box>

						<Box sx={styles.sectionMobile}>
							{serviceWorker.assetsUpdateReady &&
							 <IconButton edge="end" onClick={() => serviceWorker.updateAssets()}>
								 <SystemUpdateIcon htmlColor={"white"} />
							 </IconButton>
							}
							<IconButton onClick={handleMobileMenuOpen} color="inherit">
								<MoreIcon/>
								{/*TODO: ...Menu muss noch  implementiert werden*/}
							</IconButton>
						</Box>
					</Toolbar>

				</AppBar>

				<Drawer sx={styles.drawer} variant="persistent" anchor="left" open={open}>
					<Box sx={styles.drawerHeader}>
						<Box>
							<UserInfo/>
							<Box sx={{fontSize: 10}}>{appVersion}</Box>
						</Box>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</Box>
					<Divider />
					<NavigationListContainer/>
				</Drawer>

				<Box component="main" sx={[styles.content, open && styles.contentShift]}>
					<Box sx={styles.drawerHeader} />
					{props.children}
				</Box>
			</Box>
	);
}
