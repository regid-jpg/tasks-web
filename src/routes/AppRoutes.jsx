// src/routes/AppRoutes.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/welcome/WelcomePage';
import MainTask from '../pages/maintask/MainTask';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/tasks" element={<MainTask />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;