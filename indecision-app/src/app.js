// parent component
class IndecisionApp extends React.Component {
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        const options = ['Thing One', 'Thing Two', 'Thing Three'];

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action />
                <Options options={options} />
                <AddOption />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    handlePick() {
        alert('handlePick');
    }

    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component {
    // override the constructor to ensure that the event handler has access to the this keyword within the context
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    handleRemoveAll() {
        console.log(this.props.options);
        // alert('Some message!');
    }

    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option} />)
                }
            </div>
        );
    }
}

// child component to Options component
class Option extends React.Component {
    render() {
        return (
            <div>              
                {this.props.optionText}
            </div>
        );
    }
}

class AddOption extends React.Component {
    handleAddOption(e) {        
        e.preventDefault();
        const option = e.target.elements.option.value.trim();

        if(option) {
            alert('Option added!');
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

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
   - 
 
  BEST PRACTICES
- on the return on the render method inside of the React component, it is a good habit to ALWAYS define a root div


*/