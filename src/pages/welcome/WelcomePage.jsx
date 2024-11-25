// src/pages/WelcomePage.jsx

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate('/tasks'); // Navigate to MainTask
    };

    return (
        <>
            <div className="background"></div>
            <div className="welcome-container">
                <h1 className="welcome-heading">Welcome to osTicket System</h1>
                <Button
                    type="primary"
                    className="welcome-button"
                    onClick={handleProceed}
                >
                    Proceed →
                </Button>
            </div>
        </>
    );
};

export default WelcomePage;
