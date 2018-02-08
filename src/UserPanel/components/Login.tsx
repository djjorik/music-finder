import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './Login.css';

const login = (props: any) => {
    const actions = [
        <FlatButton
            label="Cancel"
            style={{
                color: '#d6d6d6',
            }}
            onClick={props.handleCloseLogin}
        />,
        <FlatButton
            label="Login"
            style={{
                color: '#d6d6d6',
            }}
            keyboardFocused={true}
            onClick={props.loginUser}
        />,
    ];

    let content = <Dialog
                actions={actions}
                modal={false}
                bodyStyle={{ backgroundColor: '#262728', color: '#d6d6d6' }}
                actionsContainerStyle={{ backgroundColor: '#262728', color: '#d6d6d6' }}
                open={props.openLogin}
                onRequestClose={props.handleCloseLogin}
            >
                <div className="title">
                    <h3>Welcome, type your name and password to enter.</h3>
                </div>
                <div className="input-container">
                    <input className="input-name" type="text" placeholder="name" value={props.name}
                        onChange={(event: any) => { props.inputNameHandler(event); }} />
                    <input className="input-password" type="text" placeholder="password"
                        value={props.password}
                        onChange={(event: any) => { props.inputPassHandler(event); }} />
                </div>
            </Dialog>;
    
    if (props.isLogged) {
        content = <div>
            <h3>{props.loginResult}</h3>
        </div>;
    }

    return (
        <div >
           {content}
        </div>
    );
};

export default login;
