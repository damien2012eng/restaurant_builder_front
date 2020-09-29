import React, {Component} from 'react';

class FeatureSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
                return <section className="feature">
                <div className="container">
                    <div className="row">
                    {
                        data.map((item, index)=>(
                            <div className="col s4" key={index}>
                                <div className={"content"}>
                                    <i className={`fa ${item.iconName}`}/>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                            )
                        )
                    }
                    </div>
                </div>
                </section>
            }
}

export default FeatureSection;