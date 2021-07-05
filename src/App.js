import { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import * as ROUTES from './constants/routes';
import ProtectedRoute from './helpers/ProtectedRoute';

const Admin = lazy(() => import('./screens/Admin'));
const AdminEditPost = lazy(() => import('./screens/AdminEditPost'));
const AdminNewPost = lazy(() => import('./screens/AdminNewPost'));
const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Login'));
const NotFound = lazy(() => import('./screens/NotFound'));
const Post = lazy(() => import('./screens/Post'));
const Signup = lazy(() => import('./screens/Signup'));

const App = () => {

  const [userAuth, setUserAuth] = useState(() => {
    const user = localStorage.getItem("userAuth");
    return !!user;
  });

  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Header userAuth={userAuth} />
        <Switch>
          <Route path={ROUTES.HOME} component={Home} exact />
          <Route path={ROUTES.POST} component={Post} exact />
          <Route path={ROUTES.LOGIN} component={Login} exact />
          <Route path={ROUTES.SIGNUP} component={Signup} exact />
          <ProtectedRoute userAuth={userAuth} path={ROUTES.ADMIN} exact>
            <Admin />
          </ProtectedRoute>
          <ProtectedRoute userAuth={userAuth} path={ROUTES.ADMIN_NEW_POST} exact>
            <AdminNewPost />
          </ProtectedRoute>
          <ProtectedRoute userAuth={userAuth} path={ROUTES.ADMIN_EDIT_POST} exact>
            <AdminEditPost />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;