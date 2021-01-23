import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const cubeDist = "146px";

//const logoFont =  "'Fredoka One'";
const logoFont1 = "'Orbitron', sans-serif";
const logoFont2 = "'Monoton', cursive;";

const useStyles = makeStyles((theme) => ({
	cube: {
		width: 280,
		height: 280,
		margin: "100px auto 100px auto",
		perspective: 5000,
		transformStyle: "preserve-3d",
		//transform: "rotate3d(-4, -6, 1.65, 54deg)",
		transform: "rotate3d(-4, -10, 1.57, 45deg)",
		position: "relative",
		'& div': {
			width: "100%",
			height: "100%",
			position: "absolute",
			zIndex: 1,
			left: 0,
			top: 0,
			fontFamily: logoFont1,
			fontSize: 48,
			lineHeight: "510px",
			textAlign: "center",
			verticalAlign: "borderBottom",
			fontWeight: "bold",
			textTransform: "uppercase",
			textShadow: "2px 2px 5px grey",
			color: "rgba(0,0,0,0.5)"
		}
	},
	speaker: {
	},
	cubeFaceFront: {
		transform: `rotateY(0deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196 , 0.5)",
	},
	cubeFaceBack: {
		transform: `rotateY(180deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(235, 211, 187 , 0.5)",
	},
	cubeFaceTop: {
		transform: `rotateX(90deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(169, 197, 196 , 0.5)",
		'& div': {
			fontSize: 100,
			transform: "rotateZ(-45deg) translateY(-100px)",
		}
	},
	cubeFaceBottom: {
		transform: `rotateX(-90deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(199, 215, 205 , 0.5)"
	},
	cubeFaceRight: {
		transform: `rotateY(90deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196, 0.5)"
	},
	cubeFaceLeft: {
		transform: `rotateY(-90deg) translateZ(${cubeDist})`,
		border: "2px solid rgba(0,0,0,0.3)",
		background: "rgba(224, 230, 216 , 0.5)"
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
		<svg className="progressOuter" height="300" width="300">
			<circle stroke="rgba(0,0,0,0.8)" r="90" cx="150" cy="120" strokeWidth="40" fill="transparent"/>
			<circle stroke="rgba(100,0,0,0.8)" r="30" cx="150" cy="120" fill="rgba(0,0,0,0.8)"/>
		</svg>;

	return <>
		<div className={classes.cube}>
			<div className={classes.cubeFaceFront}>
				<div className={classes.speaker}>
					{speaker}
				</div>
				<div>Electro</div>
			</div>
			<div className={classes.cubeFaceBack}></div>
			<div className={classes.cubeFaceRight}>
				<div className={classes.speaker}>
					{speaker}
				</div>
				<div>Box</div>
			</div>
			<div className={classes.cubeFaceLeft}></div>
			<div className={classes.cubeFaceTop}>
				<div>WEB</div></div>
			<div className={classes.cubeFaceBottom}></div>
		</div>
		<div className={classes.bottomText}>ElectroBox WEB</div>
	</>
}