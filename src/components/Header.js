import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const Header = ({ userAuth }) => {

    const [adminPage, setAdminPage] = useState(false);
    const [loginPage, setLoginPage] = useState(false);

    let history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.go(0)
    };

    let location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("admin")) {
            setAdminPage(true)
        } else {
            setAdminPage(false)
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname.includes("login")) {
            setLoginPage(true)
        } else {
            setLoginPage(false)
        }
    }, [location]);

    return (
        <div className="flex border-b items-center justify-between border-gray-500 h-4 p-4 py-10 pl-16 pr-16 sticky top-0 z-50 bg-white">
            <div className="flex items-center text-4xl font-bold">
                <Link to={ROUTES.HOME}>Blog.</Link>
            </div>
            {userAuth && (
            <div className="flex">
                <button className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline">
                    <Link to={ROUTES.ADMIN_NEW_POST}>New Post</Link>
                </button>
                {!adminPage &&
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline">
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </button>
                }
                {adminPage &&
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline">
                    <Link to={ROUTES.HOME}>Home</Link>
                </button>
                }
                <button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => logout()}>
                    Logout
                </button>
            </div>
            )}
            {!userAuth && !loginPage && (
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline">
                    <Link to={ROUTES.LOGIN}>Login</Link>
                </button>
            )}
        </div>
    )
}

export default Header;