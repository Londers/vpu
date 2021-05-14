import React, {SyntheticEvent, useState} from "react"
import './AuthorizationDialog.sass'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Form, Field} from 'react-final-form'
import {InputAdornment, makeStyles, TextField} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1)
        }
    }
}))

function AuthorizationDialog(props: {
    setLogged: Function
}) {
    const classes = useStyles();

    const [open, setOpen] = useState(true)
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        login: '',
        password: '',
        showPassword: false
    });

    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    const handleAuth = () => {
        // alert('WINNER WINNER CHICKEN DINNER')
        setOpen(false)
        props.setLogged(true)
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async (values: { login: string, password: string }) => {
        await sleep(300)
        window.alert(JSON.stringify(values))
        if (values.login === 'Londers') {
            setError(false)
            handleAuth()
        } else {
            setError(true)
        }
    }

    const handleChange = (prop: string) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.currentTarget.valueAsNumber});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={onSubmit}>
            {props => (
                <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                    <DialogContent>
                        <form onSubmit={props.handleSubmit} className={classes.root}>
                            <Field
                                id="login"
                                name="login"
                                type="text"
                                render={props => {
                                    return (
                                        <TextField label="Логин"
                                                   required={true}
                                                   error={error}
                                                   {...props.input}/>
                                    )
                                }}
                            />
                            <Field
                                id="password"
                                name="password"
                                type={values.showPassword ? 'text' : 'password'}
                                // value={values.password}
                                onChange={handleChange('password')}
                                render={props => {
                                    return (
                                        <TextField label="Пароль"
                                                   required={true}
                                                   error={error}
                                                   InputProps={{
                                                       endAdornment:
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {values.showPassword ? <Visibility/> :
                                                                       <VisibilityOff/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                   }}
                                                   {...props.input}
                                        />
                                    )
                                }}
                            />
                            <p hidden={!error} style={{color: 'red'}}>Неверный логин и/или пароль</p>
                            <Button type="submit" variant="contained" color="primary">Подтвердить</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </Form>
    )
}

export default AuthorizationDialog