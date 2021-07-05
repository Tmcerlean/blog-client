import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ProtectedRoute = ({ userAuth, children, ...rest }) => {

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (userAuth && userAuth !== null) {
                    // Using cloneElement to add / modify the props of its children.
                    return React.cloneElement(children, { userAuth });
                }
                
                if (!userAuth || userAuth === null) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                }
                return null;
            }}
        />
    )
}

export default ProtectedRoute;