import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterText: "",
            likesKids: false
        }
    }
    handleTextChange = event => {
        this.setState({
            filterText: event.target.value,
        });
    }
    handleCheckboxChange = event => {
        this.setState({
            likesKids: event.target.checked,
        });
    }
    render () {

        const kitties = this.props.kitties.filter(cat => {

            if (this.state.likesKids && !cat.likesKids){
                return false;
            } else if (this.state.filterText.length > 0 && cat.name.indexOf(this.state.filterText) === -1) {
                return false;
            }
            return true;
        });
        return (
            <div>
                <Title />
                <SearchBar onTextChange={this.handleTextChange} onCheckboxChange={this.handleCheckboxChange} />
                <CatTable kitties={kitties}/>
            </div>
        )
    }
};

class Title extends React.Component {
    render(){
        return (
            <div id="title">
                <h1>CAT SHELTER APP</h1>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    render(){
        return (
            <form>
                <input type="text" placeholder="Search by the name..." onChange={this.props.onTextChange} value= {this.props.filterText} />
                <p><input type="checkbox" onChange={this.props.onCheckboxChange} /> Only show kitties that likes kids</p>
            </form>
        )
    };
}

class CatTable extends React.Component {
    render() {
        const rows = [];
        let lastCategory = null;

        this.props.kitties.forEach(kitty => {

            if (kitty.category !== lastCategory) {
                rows.push(<CatCategoryRow category= { kitty.category }  key= { kitty.category } />);
            }
            rows.push(<CatRow kitty={kitty} key={kitty.name} />);
            lastCategory = kitty.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th></tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class CatRow extends React.Component {
    render() {
        const name = this.props.kitty.likesKids ?
            this.props.kitty.name : <span style={{color: 'red'}}> {this.props.kitty.name} </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.kitty.age}</td>
            </tr>
        );
    }
}

class CatCategoryRow extends React.Component {
    render() {
        return (
            <tr className="sex">
                <th colSpan="2">{this.props.category}</th>
            </tr>
        );
    }
}

document.addEventListener('DOMContentLoaded',
    function(){

        const kitties = [
            {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
            {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
            {category: "male", age: "2", likesKids: false, name: "Grumpy"},
            {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
            {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
            {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
        ];


        ReactDOM.render(
            <App kitties={kitties} />,
            document.getElementById('app')
        );
    });

