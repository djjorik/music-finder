import * as React from 'react';
import { connect } from 'react-redux';
import './UserPanel.css';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import Login from './components/Login';
import Register from './components/Register';
import { Link } from 'react-router-dom';
import history from '../Routes/history';
import * as action from '../Actions/Actions';

const api = 'http://localhost:8000';

class UserPanel extends React.Component<any, any> {
    state = {
        name: '',
        password: '',
        openLogin: false,
        isLogged: false,
        loginResult: '',
        isRegistered: false,
        registerResult: '',
        openRegister: false,
    };
    componentDidMount() {
        this.checkAuth();
        history.listen((location) => {
            history.location.pathname = location.pathname;
            this.forceUpdate();
        });
    }

    checkAuth = () => {
        let token = localStorage.getItem('my-token');
        if (token == null) {
          token = '';
        }
        const headers = {
          Authorization: token,
        };
        axios.get(api + '/login-jwt', { headers })
            .then((res) => {
                this.props.auth(true);
            })
            .catch((err) => {
                this.setState({
                    isLogged: false,
                    loginResult: err,
                });
            });
    }

    handleOpenLogin = () => {
        this.setState({
            openLogin: true,
            name: '',
            password: '',
        });
    }

    handleCloseLogin = () => {
        this.setState({
            openLogin: false,
            name: '',
            password: '',
            loginResult: '',
        });
    }

    handleOpenRegister = () => {
        this.setState({
            openRegister: true,
            name: '',
            password: '',
            registerResult: '',
        });
    }

    handleCloseRegister = () => {
        this.setState({
            openRegister: false,
            name: '',
            password: '',
            isRegistered: false,
            registerResult: '',
        });
    }

    registerUser = () => {
        axios.post(api + '/register', {
            username: this.state.name,
            password: this.state.password,
        })
            .then((res) => {
                this.setState({
                    isRegistered: true,
                    registerResult: res.data.status,
                });
                setTimeout(() => { this.handleCloseRegister(); }, 2000);

            })
            .catch((err) => {
                this.setState({
                    isRegistered: false,
                    registerResult: err,
                });
            });
    }

    loginUser = () => {
        axios.post(api + '/login', {
            username: this.state.name,
            password: this.state.password,
        })
            .then((res) => {
                if (res.data.error) {
                    this.setState({
                        isLogged: false,
                        loginResult: res.data.error,
                    });
                } else {
                    const token = 'Bearer' + res.data.token.slice(3);
                    localStorage.setItem('my-token', token);
                    this.props.auth(true);
                    this.handleCloseLogin();
                }
            })
            .catch((err) => {
                this.setState({
                    isLogged: false,
                    loginResult: err,
                });
            });
    }

    inputNameHandler = (event: any) => {
        this.setState({
            name: event.target.value,
        });
    }

    inputPassHandler = (event: any) => {
        this.setState({
            password: event.target.value,
        });
    }

    logout = () => {
        localStorage.clear();
        this.props.auth(false);
        history.push('/');
    }

    render() {
        let navButton = null;
        if (this.props.isAuth === true) {
            if (history.location.pathname !== '/playlist') {
                navButton = <div className="playlist">
                    <Link to="/playlist">
                        <FlatButton
                            label="My playlist"
                            style={{
                                color: '#d6d6d6',
                            }}
                        />
                    </Link>
                </div>;
            } else {
                navButton = <div className="playlist">
                    <Link to="/">
                        <FlatButton
                            label="Home"
                            style={{
                                color: '#d6d6d6',
                            }}
                        />
                    </Link>
                </div>;
            }
        }
        let login = null;
        let register = null;

        if (this.props.isAuth === false) {
            login = <div className="login">
                <FlatButton
                    label="Login"
                    style={{
                        color: '#d6d6d6',
                    }}
                    onClick={this.handleOpenLogin}
                />
            </div>;
            register = <div className="register">
                <FlatButton
                    label="Register"
                    style={{
                        color: '#d6d6d6',
                    }}
                    onClick={this.handleOpenRegister}
                />
            </div>;
        }
        let logout = null;
        if (this.props.isAuth === true) {
            logout = <div className="logout">
                <FlatButton
                    label="Logout"
                    style={{
                        color: '#d6d6d6',
                    }}
                    onClick={this.logout}
                />
            </div>;
        }

        return (
            <div className="UserPanel">
                {navButton}
                {login}
                {register}
                {logout}
                <Login handleCloseLogin={this.handleCloseLogin} loginUser={this.loginUser}
                    openLogin={this.state.openLogin}
                    name={this.state.name} password={this.state.password}
                    inputNameHandler={this.inputNameHandler}
                    inputPassHandler={this.inputPassHandler} isLogged={this.state.isLogged}
                    loginResult={this.state.loginResult} />

                <Register handleCloseRegister={this.handleCloseRegister}
                    registerUser={this.registerUser}
                    openRegister={this.state.openRegister}
                    name={this.state.name} password={this.state.password}
                    inputNameHandler={this.inputNameHandler}
                    inputPassHandler={this.inputPassHandler} isRegistered={this.state.isRegistered}
                    registerResult={this.state.registerResult} />
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    isAuth: state.isAuth,
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        auth: (payload: any) => {
            dispatch(action.isAuth(payload));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
