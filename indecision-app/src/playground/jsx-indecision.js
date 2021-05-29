console.log('App.js is running on port 8080!');

// JSX - JavaScript XML
// This is how react renders things to the browser
// the browser does not understand JSX, so we have to use Babel to compile the code down to what the browser can understand

const app = {
    title: 'Indecision',
    subtitle: 'Put your life in the hands of a computer',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
};

const onRemoveAll = () => {
    app.options = [];
    render();
}

const onMakeDecision = () => {
    // Math.random() generates a number between 0 and 1, where 1 is not inclusive
    const randomNum = Math.floor(Math.random() * app.options.length);
    
    const option = app.options[randomNum];

    alert(option);
};

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                   app.options.map((option) => <li key={option}>{option}</li>)
                }
            </ol>
    
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('app');

// initialize the app
render();

