// parent component
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        // JSON.parse() could throw an exception, so wrap in try..catch to prevent the code from cashing
        
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            // handle edge case when localStorage does not have any items
            if(options) {
                this.setState(() => ({ options }) );
            }
        } catch (e) {
            // Do nothing
        }

    }

    componentDidUpdate(prevProps, prevState) {
        // if prevState does not equal to current state, something changed so update localStorage
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWIllUnmount!');
    }

    handleDeleteOptions() {
         this.setState(() => ({ options: []}));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick() {
        // Math.random() generates a number between 0 and 1, where 1 is not inclusive
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        
        alert(option);
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exist';
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
      
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button 
                disabled={!props.hasOptions} 
                onClick={props.handlePick}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

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

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {        
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        // es6 syntax; this is equivalent to => return {error: error}
        this.setState(() => ({ error }));

        // wipe input if there is no error
        if(!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name} </p>
//             <p>Age: {props.age} </p>
//         </div>
//     );
// }

// ReactDOM.render(<User name="Devony" age={58} />, document.getElementById('app'));

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));





/*
NOTES:
- you MUST define the render method when inheriting from React.Component
- To use the component in jsx, you use the class Name and enclose it with xml form - <ClassName />
    - the convention to render react component is as follow <ClassName />; Not the the space in the component xml format name
    - you can also use <ClassName></ClassName> to render a component in React. It does the same thing. The first way is more concise though
- React enforce the the name of the component first letter MUST be uppercase. This is how react differentiate 
  component class and regualar html
- Inside of a React component, the render method, can return full fledge jsx
- Whenever you create an event handler inside of a component, you need to override the constructor to ensure that the event handler has access to the this keyword within the context and pass to the super(props). If you don't need to use that this keyword inside of the event handler, then you don't need to override the constructor within that component
- child components can fire events by calling an event handler inisde of the parent component
- props are readonly, so child components cannot change anything within that
- props is another way of saying input in angular... for example, pass down a prop(input) to child components

*Component Props*
 - at the very core, components props allows components in react to communicate with one another
 - the data that get passed into a component is known as *props*
 - react gives us away to get data out of a component using *props* on the this keyword

 *JSX Rules*
 - DOES NOT know how to render JSON objects;
    - only know how to render strings and numbers
 - NEVER renders anything on the screen for boolean values, undefined and null
 - To access a variable inside of jsx, you have to use the JavaScript Expression syntax - {}

 *JavaScript Expression*
 - you can use jsx syntax there as well, like <p>something</p>.
 
 *Arrays in JSX*
 - when working with arrays in jsx, you need to provide the element with a key; is it require in react
    - ex: <p key={someKey}>arrayData</p>

 *Events & Methods*
  - when wiring up and handler for a click event, NEVER call it with parenthesis in the react

 *Method Binding*
  - the this keyword does not get transfer over when you reference a function
  - you can use the bind(objectToBindTo - this keyword context) method on the function to ensure that the this keyword is transferred over
   - bind() method is used to reset the context when using event handlers
   - event handlers looks something like this: this.methodName - not that the opening and closing parenthesis is not there
  - there are a couple of places in JavaScript where we lose the this keyword context, and *event handler* is one of them
 
  *Overidding the Constructor function in a component*
  - to override the constructor function in react, you MUST follow this where you pass the *props* object to the parent class
   - if you don't pass the *props* over to the parent class, you will not have access to the props object
   - this is the way you override a construtor in the subclass, which is the bare minimum
        constructor(props) {
            super(props);
        }
    
  *Component State*
   - create component state in constructor 
   - set component state using this.setState((prevState) => {
       return {
        // set actual state here
       };
   });

  
 
  BEST PRACTICES
- on the return on the render method inside of the React component, it is a good habit to ALWAYS define a root div


*/