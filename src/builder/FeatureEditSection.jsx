import React, {Component} from 'react';
import {IsEmpty} from '../helper/IsEmpty'
import CustomizedInput from "../helper/CustomizedInput";
import {Link, withRouter} from "react-router-dom";

class FeatureEditSection extends Component {
    constructor(props){
        console.log("Constructor")
        super (props);
        this.state = {
            formData: {
                title: 'Wifi',
                icon_url: ''
            },
            submitting: false,
            errors: {},
            serverFeedback:""
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/v1/features/" + this.props.match.params.id, {
            method: "GET",
        }).then(response => response.json()).then(response => {
            this.setState({
                ...this.state,
                formData: {
                    ...response.result
                }
            })
        })
    }

    changeHandler = (event) =>{
        event.preventDefault();
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value
            }
        }, ()=>{
                this.setState({
                    errors:this.validate(this.state.formData)
                })
        })
        console.log(this.state.formData);
    }

    validate =(values) =>{
        const errors = {};
        const {title = "", icon_url = ""} = values;
        if(title.trim() === ""){
            errors.title = "title cannot be empty";
        }
        if(icon_url.trim() === ""){
            errors.icon_url = "iconUrl cannot be empty"
        }
        return errors;
    }

    submitHandler= (event) =>{
        console.log("Submit Handler")
        console.log(this.props);
        event.preventDefault();
        const errors = this.validate(this.state.formData);
        if(IsEmpty(errors)){
            this.setState({
                submitting:true,
                serverFeedback:"",
            }, ()=>{
                fetch("http://localhost:8080/v1/features/"+ this.props.match.params.id, {
                    method: "POST",
                    body: JSON.stringify(this.state.formData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response=>response.json()).then(response => {
                    if(response.result){
                        this.setState({
                            serverFeedback:response.result.message,
                            submitting: false,
                            formData:{
                                ...response.result
                            }
                        })
                    }else{
                        this.setState({
                            submitting: false,
                            serverFeedback: response.message,
                            errors:errors
                        })
                    }
                })
            })
        }else{

        }
    }

    render() {
        console.log("Render")
        let {title,icon_url} = this.state.formData;
        return (
            <div className="container">
                <h1>Feature Section </h1>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        {this.state.serverFeedback && <h3 className={'text-danger'}>{this.state.serverFeedback}</h3>}
                        <CustomizedInput
                            name={"title"}
                            label={"Title"}
                            error={"errors"}
                            value={title}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"icon_url"}
                            label={"Icon URL"}
                            error={"errors"}
                            value={icon_url}
                            onChange={this.changeHandler}
                        />

                        <button className={'btn btn-primary'} type={'submit'}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(FeatureEditSection);