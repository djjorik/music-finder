import * as React from 'react';
import './SearchBlock.css';

const searchBlock = (props: any) => {
    let results = <span>Лучшие треки</span>;
    if (props.searchedTitle) {
        results = <span>{props.searchedTitle}</span>;
    }
    return (
        <div className="searchBlock">
            <div className="input-container">
                <input type="text" placeholder="Поиск треков" value={props.value} onChange={props.onChanged} />
            </div>
            <div className="title">
                <span>Last.fm /</span>
            </div>
            <div className="subtitle">
                {results}
            </div>
        </div>
    );
};

export default searchBlock;