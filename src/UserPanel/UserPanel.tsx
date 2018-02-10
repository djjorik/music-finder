import * as React from 'react';
import { connect } from 'react-redux';
import './UserPanel.css';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import Login from './components/Login';
import Register from './components/Register';
import { Link } from 'react-router-dom';
import history from '../Routes/history';

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
        history.listen((location) => {
            console.log(location.pathname);
            console.log(history.location.pathname);
            // if (location.pathname !== history.location.pathname) {
                console.log('WTF SYKA');
                history.location.pathname = location.pathname;
                this.forceUpdate();
            // }
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
        console.log('wtf');
        this.setState({
            openLogin: false,
            name: '',
            password: '',
        });
    }

    handleOpenRegister = () => {
        this.setState({
            openRegister: true,
            name: '',
            password: '',
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
        axios.post(api + '/user', {
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
                console.warn(err);
            });
    }

    loginUser = () => {
        axios.post(api + '/login', {
            username: this.state.name,
            password: this.state.password,
        })
            .then((res) => {
                const token = 'Bearer' + res.data.token.slice(3);
                localStorage.setItem('my-token', token);
                console.log(localStorage.getItem('my-token'));
                setTimeout(() => { this.handleCloseLogin(); }, 2000);
                console.log(res);
            })
            .catch((err) => {
                console.warn(err);
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



    render() {
        let navButton = null;
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
        return (
            <div className="UserPanel">
                <div className="login">
                    <FlatButton
                        label="Login"
                        style={{
                            color: '#d6d6d6',
                        }}
                        onClick={this.handleOpenLogin}
                    />
                </div>
                <div className="register">
                    <FlatButton
                        label="Register"
                        style={{
                            color: '#d6d6d6',
                        }}
                        onClick={this.handleOpenRegister}
                    />
                </div>
                {/* <div className="playlist">
                    <Link to="/playlist">
                        <FlatButton
                            label="My playlist"
                            style={{
                                color: '#d6d6d6',
                            }}
                        />
                    </Link>
                </div> */}
                {navButton}
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
    loadedVideos: state.loadedVideos,
    videoId: state.videoId,
    queryYoutube: state.queryYoutube,
});

export default connect(mapStateToProps)(UserPanel);
