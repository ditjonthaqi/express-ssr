import { Route, Routes } from "react-router-dom";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    );
}