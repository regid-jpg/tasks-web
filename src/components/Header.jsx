
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import intellicareLogo from '../assets/intellicare.png';

const { Header } = Layout;

const HeaderComponent = () => {
    const menuItems = [
        { label: 'Dashboard', key: 'dashboard' },
        { label: 'Users', key: 'users' },
        {
            label: (
                <Dropdown
                    overlay={
                        <Menu
                            items={[
                                { label: 'Open', key: 'open' },
                                { label: 'Closed', key: 'closed' },
                            ]}
                        />
                    }
                >
                    <span>
                        Tasks <DownOutlined />
                    </span>
                </Dropdown>
            ),
            key: 'tasks',
        },
        { label: 'Tickets', key: 'tickets' },
        { label: 'Knowledgebase', key: 'knowledgebase' },
    ];

    return (
        <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#DCDCDC' }}>
            {/* Adjusted logo size */}
            <div style={{ marginRight: '20px' }}>
                <img
                    src={intellicareLogo}
                    alt="Logo"
                    style={{ height: '30px', width: 'auto' }} // Adjusted height to fit better
                />
            </div>
            <Menu
                theme="grey"
                mode="horizontal"
                items={menuItems}
                style={{ flex: 1 }}
            />
            <div style={{ color: 'black', fontSize: '1rem' }}>Welcome, User</div>
        </Header>
    );
};

export default HeaderComponent;
