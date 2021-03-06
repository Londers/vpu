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
import AccountsPage from './Pages/aboutPage/AccountsPage';
import {useDispatch, useSelector} from 'react-redux';
import {AppBar, ButtonBase, createStyles, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import {
    loggedOut,
    wsClose,
    wsCloseImm, wsConnect,
    wsConnectImm, wsError,
    wsErrorImm, wsMessage,
    wsMessageImm,
    wsOpen,
    wsOpenImm
} from './redux/actions';
import wsImitation from "./Components/WebSoscketImitation";
import CrossesPage from "./Pages/crossesPage/CrossesPage";
import LogsPage from "./Pages/logsPage/LogsPage";

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

    const host = `wss://${window.location.hostname}:4444/MainPageW`
    useEffect(() => {
        const ws = new WebSocket(host)

        ws.onopen = (evt) => dispatch(wsOpen({evt}))
        ws.onclose = (evt) => dispatch(wsClose({evt}))
        ws.onerror = (evt) => dispatch(wsError({evt}))
        ws.onmessage = (evt) => dispatch(wsMessage({evt}))

        // const wsImitate = new wsImitation(host, dispatch)
        // dispatch(wsConnectImm({ws: wsImitate}))

        dispatch(wsConnect({ws: ws}))
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
                            <Link to="/" className={classes.appBarLinks}>Phones</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/accounts" className={classes.appBarLinks}>Accounts</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/crosses" className={classes.appBarLinks}>Crosses</Link>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/logs" className={classes.appBarLinks}>Logs</Link>
                        </Typography>
                        <ButtonBase color="primary" onClick={handleClick} className={classes.logout}>
                            ??????????</ButtonBase>
                    </Toolbar>
                </AppBar>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/accounts">
                        {logged ? <AccountsPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/crosses">
                        {logged ? <CrossesPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/logs">
                        {logged ? <LogsPage/> : <Redirect to="/"/>}
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
