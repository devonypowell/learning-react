import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

// parent component
export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined,
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option),
        }));
    };

    handlePick = () => {
        // Math.random() generates a number between 0 and 1, where 1 is not inclusive
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];

        this.setState(() => ({ selectedOption: option }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exist';
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option),
        }));
    };

    handleClearSelectedOption = () => {
        // wipe the state when okay button clicked
        this.setState(() => ({ selectedOption: undefined }));
    };

    componentDidMount() {
        // JSON.parse() could throw an exception, so wrap in try..catch to prevent the code from cashing
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            // handle edge case when localStorage does not have any items
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if prevState does not equal to current state, something changed so update localStorage
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);

            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWIllUnmount!');
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>

                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}
