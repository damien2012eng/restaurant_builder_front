import React, {Component} from 'react';

class FeatureEditSection extends Component {
    constructor(props){
        super (props);
        this.state = {
            formData: {
                title: 'Wifi',
                iconUrl: ''
            }
        }
    }

    changeHandler = (event) =>{
        event.preventDefault();
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]:event.target.value
            }
        })
    }

/*    submitHandler= (event) =>{
        console.log(this.state.formData)
        //todo: fetch()
    }

    componentDidMount() {
        let {data} = this.props;
        this.setState({formData:data})
    }*/


    render() {
        let {formData} = this.state;
        console.log(formData)
        return (
            <div className="container">
                <h1>Feature Section </h1>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" onChange={this.changeHandler}
                                   id="title" placeholder="Input title" value={formData.title}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="iconUrl">iconUrl</label>
                            <input type="text" className="form-control" name="iconUrl" onChange={this.changeHandler}
                                   id="iconUrl" placeholder="Input iconUrl" value={formData.iconUrl}/>
                        </div>
                        <button className={'btn btn-primary'} type={'submit'}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default FeatureEditSection;