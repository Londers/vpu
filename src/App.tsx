import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import './App.sass';
import MainPage from './Components/mainPage/MainPage';
import UsersPage from './Components/usersPage/UsersPage';
import AboutPage from './Components/aboutPage/AboutPage';
import {useDispatch, useSelector} from 'react-redux';
import {AppBar, ButtonBase, createStyles, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import {loggedOut} from './redux/actions';

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
    const logged = useSelector((state: { logged: boolean }) => state.logged)
    const dispatch = useDispatch()

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
                            Выйти из пользователя</ButtonBase>
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
