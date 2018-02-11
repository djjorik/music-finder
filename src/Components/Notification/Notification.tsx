import * as React from 'react';
import './Notification.css';

interface INotification {
    notify: String;
}

const notification = (props: INotification) => {
    let notify = <div className="notification hidden"></div>;
    if (props.notify !== '') {
        notify = <div className="notification" >
            <span>{props.notify}</span>
        </div>;
    }
    return (
        <div>
            {notify}
        </div>
    );
};

export default notification;
