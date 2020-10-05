import React from 'react';
import logo from './logo.svg';
import './App.css';
import FeatureEditSection from "./builder/FeatureEditSection.jsx"
import {Link, withRouter} from "react-router-dom";

const FakeData = {
  headSection:{

  },
  featureSection: [
    {
      title: 'Free Wifi',
      iconUrl: '',
    }
  ],
  menuSection:{

  }
}

function App() {
  return (
      <div className="restaurant_page landing">
        <div className='text-center mb-3'>
          <button className={'btn btn-primary'}>Edit Head Section</button>
        </div>
        <hr/>

        <FeatureEditSection data={FakeData.featureSection}/>
        <hr/>

        <div className='text-center mb-3'>
          <button className={'btn btn-primary'}>Edit Menu Section</button>
        </div>
      </div>

  );
}

export default withRouter(App);
