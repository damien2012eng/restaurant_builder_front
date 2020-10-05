import React, {Component} from 'react';
import FeatureSection from "./FeatureSection";
import {Link, withRouter} from "react-router-dom";

const FakeData = {
    head:{

    },
    feature:[
        {
            title: "Free Wifi",
            iconName: "fa-wifi",
            iconUrl: ""
        },
        {
            title: "Free Wifi",
            iconName: "fa-phone",
            iconUrl: ""
        },
        {
            title: "Free Wifi",
            iconName: "fa-wifi",
            iconUrl: ""
        }
    ],
    menu:[

    ]
}

class Landing extends Component {
    constructor(props){
        super (props);
        this.state = {
            landingData: null
        }
    };

    componentDidMount(){
        //todo:fetch landing by id
        this.setState({
            landingData: FakeData
        })
    }

    render() {
        let {landingData} = this.state;
        if(!landingData){
            return (<p>loading...</p>)
        }
        return (
            <div className="landing_page">
                <FeatureSection data={landingData?.feature}/>
            </div>
        );
    }
}

export default withRouter(Landing);