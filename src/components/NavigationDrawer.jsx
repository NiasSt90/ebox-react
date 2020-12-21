import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Box, fade} from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import ClearIcon from '@material-ui/icons/Clear';
import {NavigationListContainer} from "./NavigationListContainer";
import UserInfo from "./UserInfo";
import {useAtom} from "jotai";
import {darkStateAtom, pageTitleAtom, showToolbarSearchAtom, toolbarSearchInputAtom} from "../context/atoms";
import {InputBase, Switch, Tooltip} from "@material-ui/core";
import {ArrowBack, Brightness4, Brightness7} from "@material-ui/icons";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from '@material-ui/icons/Lock';
import useAuthService from "../hooks/AuthService";
import {Link, useHistory} from "react-router-dom";
import {ToolbarSearch} from "./ToolbarSearch";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function PersistentDrawerLeft(props) {
	const classes = useStyles();
	const history = useHistory();
	const authService = useAuthService();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [pageTitle] = useAtom(pageTitleAtom);
	const [showToolbarSearch] = useAtom(showToolbarSearchAtom);
	const [,setToolbarSearchInput] = useAtom(toolbarSearchInputAtom);
	const [darkState,setDarkState] = useAtom(darkStateAtom);



	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleMobileMenuOpen = () => {
	}

	return (
			<div className={classes.root}>
				<AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
										className={clsx(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>

						<Typography className={classes.title} variant="h6" noWrap>{pageTitle}</Typography>
						{showToolbarSearch && <ToolbarSearch onSearch={setToolbarSearchInput}/>}
						<Box flexGrow={1}/>

						<div className={classes.sectionDesktop}>
							<Tooltip title="Theme wechseln">
								<Switch checked={darkState}
										  icon={<Brightness7/>} checkedIcon={<Brightness4 />}
										  onChange={() => setDarkState(!darkState)}/>
							</Tooltip>
							{!authService.isAuthenticated &&
							 <Tooltip title="Anmelden..."><IconButton edge="end" component={Link} to="/login">
								 <LockOpenIcon/></IconButton>
							 </Tooltip>
							}
							{authService.isAuthenticated &&
							 <Tooltip title={"Angemeldet als " + authService.user.name}>
								 <IconButton edge="end" onClick={() => authService.signout(() => history.push('/'))}>
									 <LockIcon htmlColor={"white"} />
								 </IconButton>
							 </Tooltip>
							}
						</div>

						<div className={classes.sectionMobile}>
							<IconButton onClick={handleMobileMenuOpen} color="inherit">
								<MoreIcon/>
								{/*TODO: ...Menu muss noch  implementiert werden*/}
							</IconButton>
						</div>
					</Toolbar>

				</AppBar>

				<Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}
						classes={{paper: classes.drawerPaper,}}>
					<div className={classes.drawerHeader}>
						<UserInfo/>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<NavigationListContainer/>
				</Drawer>

				<main className={clsx(classes.content, {[classes.contentShift]: open,})}>
					<div className={classes.drawerHeader} />
					{props.children}
				</main>
			</div>
	);
}
