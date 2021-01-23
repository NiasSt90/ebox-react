import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const cubeDist = "102px";

//const logoFont =  "'Fredoka One'";
const logoFont1 = "'Orbitron', sans-serif";
const logoFont2 = "'Monoton', cursive;";

const useStyles = makeStyles((theme) => ({
	root: {
		perspective: 1000,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	cube: {
		width: "200px",
		height: "200px",
		margin: "60px auto 60px auto",
		transformStyle: "preserve-3d",
		//transform: "rotate3d(-4, -6, 1.65, 54deg)",
		//transform: "rotate3d(-4, -10, 1.57, 45deg)",
		//transform: "rotate3d(1.1, -3.2, -0.5, 45deg)",
		//transform: "rotate3d(1, 0, 0, 25deg) rotate3d(0, -1, 0, 45deg)",
		transform: "rotate3d(1, 0, 0, 25deg) rotate3d(0, -1, 0, 35deg)",
		position: "relative",
		'& div': {
			width: "100%",
			height: "100%",
			position: "absolute",
			fontFamily: logoFont1,
			fontSize: 30,
			fontWeight: "bold",
			textTransform: "uppercase",
			textShadow: "2px 2px 5px grey",
			color: "rgba(0,0,0,0.5)"
		}
	},
	cubeFaceFront: {
		transform: `rotateY(0deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196 , 0.5)",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		'& span': {
			alignSelf: "flex-end"
		}
	},
	cubeFaceBack: {
		transform: `rotateY(180deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(235, 211, 187 , 0.5)",
	},
	cubeFaceTop: {
		transform: `rotateX(90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(169, 197, 196 , 0.5)",
	},
	cubeFaceBottom: {
		transform: `rotateX(-90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(0, 0, 0 , 0.3)"
	},
	cubeFaceRight: {
		transform: `rotateY(90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196, 0.5)",
		display: "flex",
		justifyContent: "center",
		'& span': {
			alignSelf: "flex-end"
		}
	},
	cubeFaceLeft: {
		transform: `rotateY(-90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(224, 230, 216 , 0.5)"
	},
	shadow: {
	},
	bottomText: {
		fontFamily: logoFont2,
		fontSize: 50,
		textAlign: "center",
	}
}));

export const Logo = () => {
	const classes = useStyles();
	const speaker =
		<svg className="progressOuter" height="100%" width="100%">
			<circle stroke="rgba(0,0,0,0.8)" r="65" cx="100" cy="80" strokeWidth="15" fill="transparent"/>
			<circle stroke="rgba(100,0,0,0.8)" r="25" cx="100" cy="80" fill="rgba(0,0,0,0.8)"/>
		</svg>;
	const shadow = <svg className="progressOuter" height="40" width="100%">
		<ellipse cx="50%" cy="15" rx="40%" ry="12" fill="rgba(0,0,0,0.7)" strokeWidth="3" stroke="grey"/>
	</svg>
	return <>
		<div className={classes.root}>
			<div className={classes.cube}>
				<div className={classes.cubeFaceFront}>
					<div>{speaker}</div>
					<span>Electro</span>
				</div>
				<div className={classes.cubeFaceBack}/>
				<div className={classes.cubeFaceRight}>
					<div>{speaker}</div>
					<span>Box</span>
				</div>
				<div className={classes.cubeFaceLeft}/>
				<div className={classes.cubeFaceTop}/>
				<div className={classes.cubeFaceBottom}/>
			</div>
			<div className={classes.shadow}>{shadow}</div>
			<div className={classes.bottomText}>WEB</div>
		</div>
	</>
}