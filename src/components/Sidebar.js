import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('sidebar-overlay')) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Меню
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              О продукте
            </Link>
          </li>
          <li>
            <Link to="/materials" onClick={toggleSidebar}>
              Обучающие материалы
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;