import React from 'react';
import ReactDOM from "react-dom"
import './Dropdown.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Dropdown extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            items: this.props.items,
            itemTitle: this.props.itemTitle,
            itemMaximum: this.props.itemMaximum,
            isReady: this.props.isReady
        };

    }
    
    componentDidMount(){ 
        if(this.state.itemTitle.localeCompare("Hour") === 0 || this.state.itemTitle.localeCompare("Minute") === 0){
            this.fillHoursOrMinutes();
        }else{
            this.fillSeconds();
        }
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    fillHoursOrMinutes(){
        var index = (this.state.itemTitle.localeCompare("Hour") === 0 ? 0 : 1);
        var add = (this.state.itemTitle.localeCompare("Hour") === 0 ? 1 : 0);
        var dropdownMenu = document.getElementsByClassName("menuDropdown")[index];

        var items = this.state.items;
        var title = this.state.itemTitle;
        var count = 0;

        for(count = 0; count < items.length; count++){
            var itemWrapper = document.createElement('div');
            var item = document.createElement('h1');

            itemWrapper.classList.add('Dropdown-Item-Wrapper');
            item.classList.add('dropdownItem');

            itemWrapper.id = title + "-" + count;
            item.id = "text-" + title + "-" + count;

            item.textContent = items[count].value + add;

            itemWrapper.appendChild(item);

            dropdownMenu.appendChild(itemWrapper);
        }
    }

    fillSeconds(){
        var dropdownMenu = document.getElementsByClassName("menuDropdown")[2];

        var items = this.state.items;

        items.then((value) => {

            var dropdownMenu = document.getElementsByClassName("menuDropdown")[2];

            var title = this.state.title;
            var count = 0;

            for(count = 0; count < value.length; count++){
                var itemWrapper = document.createElement('div');
                var item = document.createElement('h1');

                itemWrapper.classList.add('Dropdown-Item-Wrapper');

                if(value[count].active && this.state.isReady){
                    item.classList.add('dropdownItem');
                }else{
                    item.classList.add('dropdownItemDisabled');
                }

                itemWrapper.id = title + "-" + count;
                item.id = "text-" + title + "-" + count;

                item.textContent = value[count].value;

                itemWrapper.appendChild(item);

                dropdownMenu.appendChild(itemWrapper);
            }

        });
    }

    
    render(){

        return(
            <div className="dropdownContainer">
                <div className="Dropdown-Menu-Area">
                    <h2 className="menuTitle">{this.props.itemTitle}</h2>
                    <div className="menuDropdown" onClick={this.props.customClick}></div>
                </div>
            </div>
        );
            
    }
}

export default Dropdown;


//"react-router-dom": "^6.0.0-alpha.1",