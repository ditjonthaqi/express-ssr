import { createUseStyles } from "react-jss";
import { Route, Routes, redirect } from "react-router-dom";

export const App = () => {
    return (
        <Routes>
            <Route path="*" element={<div>404</div>} />
            {/* @ts-ignore */}
            <Route path="/" element={<Diti></Diti>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    );
}

const useStyles = createUseStyles(
    {
        root: {
            backgroundColor: "red",
        }
    },
)

const Diti = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} onClick={console.log}>hello</div>
    )
}