// Although React is not directly used in this file, it is still needed because the jsx gets converted over to React.CreateElement()
import React from 'react';

// child component to Options component
const Option = (props) => (
  <div className="option">
    <p className="option__text">{props.count}. {props.optionText}</p>
    <button
      onClick={(e) => {
        props.handleDeleteOption(props.optionText);
      }}
      className="button button--link"
    >
      remove
    </button>
  </div>
);

export default Option;
