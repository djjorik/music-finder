import * as React from 'react';

const searchBlock = (props: any) => {
    
    return (
        <div>
            <input type="text" placeholder="Search" value={props.value} onChange={props.onChanged}/>
        </div>
    );
}; 

export default searchBlock;