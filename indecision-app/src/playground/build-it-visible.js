class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        };
    }

    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });

    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>{this.state.visibility ? 'Hide details' : 'Show details'}</button>
                {
                    this.state.visibility && (
                        <div>
                            <p>Hey. These are some details you can now see!</p>
                        </div>   
                    )
                }
            </div>
            
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));


// let show = false;

// const onShowDetails = () => {
//     show = !show;
//     render();
// };

// const render = () => {
//     // show the Visibility Text
//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={onShowDetails}>{!show ? 'Show details' : 'Hide details'}</button>
//             <p> {show && 'Hey. These are some details you can see!'} </p>
//         </div>
//     );
//     const appRoot = document.getElementById('app');
//     ReactDOM.render(template, appRoot);
// }

// render();
