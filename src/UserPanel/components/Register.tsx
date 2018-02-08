import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './Register.css';

const register = (props: any) => {
    const actions = [
        <FlatButton
            label="Cancel"
            style={{
                color: '#d6d6d6',
            }}
            onClick={props.handleCloseRegister}
        />,
        <FlatButton
            label="Register"
            style={{
                color: '#d6d6d6',
            }}
            keyboardFocused={true}
            onClick={props.registerUser}
        />,
    ];

    let content = <div>
        <div className="title">
            <h3>Welcome, type your name and password to join.</h3>
        </div>
        <div className="input-container">
            <input className="input-name" type="text" placeholder="name" value={props.name}
                onChange={(event: any) => { props.inputNameHandler(event); }} />
            <input className="input-password" type="text" placeholder="password"
                value={props.password}
                onChange={(event: any) => { props.inputPassHandler(event); }} />
        </div>
    </div>;

    if (props.isRegistered) {
        content = <h3>{props.registerResult}</h3>;
    }

    return (
        <div >
            <Dialog
                actions={props.isRegistered ? undefined : actions}
                modal={false}
                bodyStyle={{ backgroundColor: '#262728', color: '#d6d6d6' }}
                actionsContainerStyle={{ backgroundColor: '#262728', color: '#d6d6d6' }}
                open={props.openRegister}
                onRequestClose={props.handleCloseRegister}
            >
                {content}
            </Dialog>
        </div>
    );
};

export default register;
