import React, {Component} from 'react';
import {IsEmpty} from '../helper/IsEmpty'
import CustomizedInput from "../helper/CustomizedInput";
import {Link, withRouter} from "react-router-dom";
import DisabledInput from "../helper/DisabledInput";

class Profile extends Component {
    constructor(props){
        console.log("Constructor")
        super (props);
        this.state = {
            formData: {
                username: '',
                password: '',
                email:'',
                description: '',
                address: '',
                phoneNumber: ''
            },
            submitting: false,
            errors: {},
            serverFeedback:""
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/v1/profile/" + this.props.match.params.id, {
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
        const {username = "", password = "", email="", description="",address="",phoneNumber=null} = values;
        if(password.trim() === ""){
            errors.password = "password cannot be empty"
        }
        if(email.trim() === ""){
            errors.email = "email cannot be empty";
        }
        if(description.trim() === ""){
            errors.description = "description cannot be empty";
        }
        if(address.trim() === ""){
            errors.address = "address cannot be empty";
        }
        if(phoneNumber.trim() === ""){
            errors.phoneNumber = "phoneNumber cannot be empty";
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
                fetch("http://localhost:8080/v1/profile/"+ this.props.match.params.id, {
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
        let {username,password, address, email, description, phoneNumber} = this.state.formData;
        return (
            <div className="container">
                <h1>Feature Section </h1>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        {this.state.serverFeedback && <h3 className={'text-danger'}>{this.state.serverFeedback}</h3>}
                        <DisabledInput
                            name={"username"}
                            label={"Username"}
                            error={"errors"}
                            value={username}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"password"}
                            label={"Password"}
                            error={"errors"}
                            value={password}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"address"}
                            label={"Address"}
                            error={"errors"}
                            value={address}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"email"}
                            label={"Email"}
                            error={"errors"}
                            value={email}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"description"}
                            label={"Description"}
                            error={"errors"}
                            value={description}
                            onChange={this.changeHandler}
                        />

                        <CustomizedInput
                            name={"phoneNumber"}
                            label={"Phone Number"}
                            error={"errors"}
                            value={phoneNumber}
                            onChange={this.changeHandler}
                        />

                        <button className={'btn btn-primary'} type={'submit'}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);