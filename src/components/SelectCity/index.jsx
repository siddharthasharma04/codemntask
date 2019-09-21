import React from 'react';
import {Link} from 'react-router-dom';
import './select-city.scss';


class SelectCity extends React.Component {
    constructor(props){
        super(props);
        this.data = [
            {
                img:'images/bg1.jpg',
                name:"ALANZIA",
                src:'/city/1'
            },
            {
                img:'images/bg2.jpg',
                name:"MOKAPSA",
                src:'/city/2'
            }
        ];
        this.heading = "Select City";
    }

    render(){
        return (
            <div className="select-city-container">
                <h1>{this.heading}</h1>
                <ul>
                    {this.data.map((d,i)=>
                        (<li key={i}><Link to={d.src}>
                                <img src={d.img} alt={d.name}/>
                                <p>{d.name}</p>
                            </Link>
                        </li>)
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default SelectCity;