import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/index.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ImageFeed from './components/ImageFeed';
import Profile from './components/Profile/Profile';
import { authenticate } from './store/session';
import ImageEditForm from './components/ImageEditForm';
import MyProfile from './components/MyProfile';


function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path='/home' exact={true} >
                    <ImageFeed />
                </ProtectedRoute>
                <ProtectedRoute path='/images/:imageId' exact={true} >
                    <ImageEditForm />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                    <Redirect from="/" to="/home" />
                </ProtectedRoute>
                <ProtectedRoute path="/my-profile" exact={true}>
                    <MyProfile />
                </ProtectedRoute>
                <ProtectedRoute>
                    <div className="errorpage">NotFound!</div>
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
