import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const cubeDist = "102px";

//const logoFont =  "'Fredoka One'";
const logoFont1 = "'Orbitron', sans-serif";
const logoFont2 = "'Monoton', cursive;";

const useStyles = makeStyles((theme) => ({
	root: {
		perspective: 1000,
		//perspectiveOrigin: "50% -120%",
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
		'& div': {//cube-faces
			width: "100%",
			height: "100%",
			position: "absolute",
			fontFamily: logoFont1,
			fontSize: 30,
			fontWeight: "bold",
			textTransform: "uppercase",
			textShadow: "2px 2px 5px grey",
			color: "rgba(0,0,0,0.5)",
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			'& span': {
				alignSelf: "flex-end"
			}
		}
	},
	cubeFaceFront: {
		transform: `rotateY(0deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196 , 0.5)",
		//backfaceVisibility: "hidden",
		'& span': {
			alignSelf: "flex-end"
		}
	},
	cubeFaceBack: {
		transform: `rotateY(180deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(235, 211, 187 , 0.5)",
		//backfaceVisibility: "hidden",
		'& span': {
			//transform: "rotateY(180deg)",
			color: "rgba(0,0,0,0.1)",
			textShadow: "2px 2px 6px grey",
		}
	},
	cubeFaceTop: {
		transform: `rotateX(90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(169, 197, 196 , 0.5)",
		//backfaceVisibility: "hidden",
	},
	cubeFaceBottom: {
		transform: `rotateX(-90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(0, 0, 0 , 0.5)",
		//backfaceVisibility: "hidden",
	},
	cubeFaceRight: {
		transform: `rotateY(90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(238, 234, 196, 0.5)",
		display: "flex",
		justifyContent: "center",
		//backfaceVisibility: "hidden",
		'& span': {
			alignSelf: "flex-end"
		}
	},
	cubeFaceLeft: {
		transform: `rotateY(-90deg) translateZ(${cubeDist})`,
		border: "5px solid rgba(0,0,0,0.3)",
		background: "rgba(224, 230, 216 , 0.5)",
		//backfaceVisibility: "hidden",
		'& span': {
			//transform: "rotateY(180deg)",
			color: "rgba(0,0,0,0.1)",
			textShadow: "2px 2px 6px grey",
		}
	},
	shadow: {},
	bottomText: {
		fontFamily: logoFont2,
		fontSize: 50,
		textAlign: "center",
	}
}));

export const Logo = () => {
	const classes = useStyles();
	const speaker =
		<svg height="100%" width="100%">
			<circle stroke="rgba(0,0,0,0.8)" r="65" cx="100" cy="80" strokeWidth="15" fill="transparent"/>
			<circle stroke="rgba(100,0,0,0.8)" r="25" cx="100" cy="80" fill="rgba(0,0,0,0.8)"/>
		</svg>;
	const shadow =
		<svg height="40" width="100%">
			<defs>
				<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
					<stop offset="0%" style={{stopColor:"rgb(120,120,120)", stopOpacity:1}} />
					<stop offset="100%" style={{stopColor:"rgb(0,0,0)", stopOpacity:0}} />
				</radialGradient>
			</defs>
			<ellipse cx="50%" cy="15" rx="50%" ry="15" fill="url(#grad1)"/>
		</svg>
	return <>
		<div className={classes.root}>
			<div className={classes.cube}>
				<div className={classes.cubeFaceFront}>
					<div>{speaker}</div>
					<span>Electro</span>
				</div>
				<div className={classes.cubeFaceBack}>
					<span>Electro</span>
				</div>
				<div className={classes.cubeFaceRight}>
					<div>{speaker}</div>
					<span>Box</span>
				</div>
				<div className={classes.cubeFaceLeft}>
					<span>Box</span>
				</div>
				<div className={classes.cubeFaceTop}/>
				<div className={classes.cubeFaceBottom}/>
			</div>
			<div className={classes.shadow}>{shadow}</div>
			<div className={classes.bottomText}>WEB</div>
		</div>
	</>
}