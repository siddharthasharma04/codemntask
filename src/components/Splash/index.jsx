import React from 'react';
import './splash.scss';
import {Redirect} from 'react-router-dom';

class Splash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
          };
        console.log(props);
        setTimeout(()=>this.setState({ redirect: true }),3000);
    }

    render(){
        return (
            this.state.redirect?
                <Redirect to="/city" />:
                <div className="loader">
                    <img src="/images/loader.svg" alt="Loader"/>
                </div>
            
        );
    }
}

export default Splash;