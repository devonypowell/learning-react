// Although React is not directly used in this file, it is still needed because the jsx gets converted over to React.CreateElement()
import React from 'react';

// child component to Options component
const Option = (props) => {
    return (
        <div>              
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                remove
            </button>
        </div>
    );
}

export default Option;

