import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  DarkThemeToggle,
  Tooltip,
} from "flowbite-react";
import { FiSun, FiMoon, FiPlus, FiList, FiBriefcase } from "react-icons/fi";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        toast.error("Couldn't log out");
      });
  };

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4">
        <Navbar fluid rounded className="bg-transparent dark:bg-gray-800 py-4">
          <Navbar.Brand as={Link} to="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              VisaMaster
            </span>
          </Navbar.Brand>

          <div className="flex items-center gap-4 md:order-2">
            <Tooltip
              content={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
            </Tooltip>

            {user ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt={user?.displayName}
                    img={user?.photoURL}
                    rounded
                    className="border-2 border-blue-500 dark:border-blue-400"
                  />
                }
                className="dark:bg-gray-700 dark:border-gray-600"
              >
                <Dropdown.Header className="dark:bg-gray-700">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {user?.displayName}
                  </span>
                  <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </Dropdown.Header>

                <Link to="/add-visa">
                  <Dropdown.Item
                    icon={FiPlus}
                    className="dark:hover:bg-gray-600"
                  >
                    Add Visa
                  </Dropdown.Item>
                </Link>

                <Link to="/my-added-visas">
                  <Dropdown.Item
                    icon={FiList}
                    className="dark:hover:bg-gray-600"
                  >
                    My Added Visas
                  </Dropdown.Item>
                </Link>

                <Link to="/my-visa-applications">
                  <Dropdown.Item
                    icon={FiBriefcase}
                    className="dark:hover:bg-gray-600"
                  >
                    My Applications
                  </Dropdown.Item>
                </Link>

                <Dropdown.Divider className="dark:border-gray-600" />
                <Dropdown.Item
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-600"
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/login">
                <Button gradientDuoTone="purpleToBlue" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <Navbar.Toggle className="ml-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" />
          </div>

          <Navbar.Collapse className="md:!block">
            <Navbar.Link
              as={Link}
              to="/"
              active={pathname === "/"}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:border-0 md:hover:bg-transparent"
            >
              Home
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/all-visas"
              active={pathname === "/all-visas"}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:border-0 md:hover:bg-transparent"
            >
              All Visas
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    </header>
  );
};

export default Header;
