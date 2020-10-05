import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import CustomizedInput from "../helper/CustomizedInput";
import {IsEmpty} from '../helper/IsEmpty'

class FeatureAdd extends Component {
    constructor(props){
        console.log("FeatureAdd")
        super (props);
        this.state = {
            formData:{
                title:"",
                icon_url:""
            },
            submitting: false,
            errors: {},
            serverFeedback: ""
        }
    }

    submitHandler = (event)=>{
        event.preventDefault();
        let errors = this.validate(this.state.formData);
        if(IsEmpty(errors)){
            this.setState({
                submitting: true,
                errors:{}
            }, ()=>{    //setState contains two sections: state and callback?
                fetch("http://localhost:8080/v1/features", {
                    method: "POST",
                    body: JSON.stringify(this.state.formData),
                    headers: {
                        "Content-Type":"application/json"
                    }
                }).then(response => response.json()).then(response => {
                    if(response.result){
                        this.setState({
                            serverFeedback: response.result.message,
                            submitting: false,
                            formData:{
                                ...response.result
                            }
                        },()=>{
                            this.props.history.push("/featurelist")
                        })
                    }else{
                        this.setState({
                            submitting:false,
                            serverFeedback:response.result.message
                        })
                    }
                })
            })
        }else{
            this.setState({
                submitting:false,
                serverFeedback:"",
                errors: errors
            })
        }
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

    changeHandler = (event)=>{
        this.setState({
            formData:{
                ...this.state.formData,  //Why need to expand formValue
                [event.target.name]:event.target.value
            }
        }, ()=> {
            this.setState({
                errors: this.validate(this.state.formData)
            })
        })
    }


    render() {
        let {title,icon_url} = this.state.formData;
        //let errors = this.state.errors;
        return (
            <div>
                <h1>Create New Feature</h1>
                <form onSubmit={this.submitHandler}>
                    {this.state.serverFeedback && <h3>{this.state.serverFeedback}</h3>}
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

                    <button type={"submit"} disabled={this.state.submitting}>Add</button>

                </form>

            </div>
        );
    }
}

export default withRouter(FeatureAdd);