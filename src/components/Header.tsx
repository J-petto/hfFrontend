import '../css/Header.css';
import {Link} from "react-router-dom"; // 스타일을 적용하려면 반드시 import 해야 합니다.

const Header = () => {
  return (
    <header>
      <div className="container">
        <h1>My Application</h1>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;