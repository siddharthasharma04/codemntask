import React from 'react';
import MainView from '../MainView/index';
import './root-view.scss';

class RootView extends React.Component {
    constructor(props){
        super(props);
        this.data = {
            name:"This is from Main View"
        };
    }
   

    render(){
        return (
            <div className="wrapper">
                <MainView data={this.data} />
            </div>
            );
    }
}

export default RootView;