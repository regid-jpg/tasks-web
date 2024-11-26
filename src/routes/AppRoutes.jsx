// src/routes/AppRoutes.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/welcome/WelcomePage';
import MainTask from '../pages/maintask/MainTask';
import TaskDetails from "../pages/maintask/TaskDetails";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/tasks" element={<MainTask />} />
                <Route path="/task/:id" element={<TaskDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;