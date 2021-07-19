import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import './App.sass';
import MainPage from './Pages/mainPage/MainPage';
import UsersPage from './Pages/usersPage/UsersPage';
import AboutPage from './Pages/aboutPage/AboutPage';
import {useDispatch, useSelector} from 'react-redux';
import {AppBar, ButtonBase, createStyles, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import {loggedOut, wsClose, wsConnect, wsError, wsMessage, wsOpen} from './redux/actions';
import wsImitation from "./Components/WebSoscketImitation";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logout: {
            fontSize: 'large',
        },
        appBarLinks: {
            color: 'white',
            textDecoration: 'auto',
        },
    }),
);

function App() {
    const classes = useStyles();
    const logged = useSelector((state: { auth: { logged: boolean } }) => state.auth.logged)
    const dispatch = useDispatch()

    const host = `wss://${window.location.hostname}/MainPageW`
    useEffect(() => {
        // const ws = new WebSocket(host)

        // ws.onopen = (evt) => dispatch(wsOpen({evt}))
        // ws.onclose = (evt) => dispatch(wsClose({evt}))
        // ws.onerror = (evt) => dispatch(wsError({evt}))
        // ws.onmessage = (evt) => dispatch(wsMessage({evt}))

        const wsImitate = new wsImitation(host, dispatch)

        dispatch(wsConnect({ws: wsImitate}))
    }, [dispatch, host]);

    const handleClick = () => {
        dispatch(loggedOut())
    }

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static" hidden={!logged}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.appBarLinks}>Home</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/about" className={classes.appBarLinks}>About</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/users" className={classes.appBarLinks}>Users</Link>
                        </Typography>
                        <ButtonBase color="primary" onClick={handleClick} className={classes.logout}>
                            Выйти</ButtonBase>
                    </Toolbar>
                </AppBar>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        {logged ? <AboutPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/users">
                        {logged ? <UsersPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/">
                        <MainPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
