import React, {Component} from 'react';
import {isEmpty} from '../helper/isEmpty'
import CustomizedInput from '../helper/CustomizedInput'
import {Link, withRouter} from "react-router-dom";


class Register extends Component {
    constructor(props){
        super (props);
        console.log('constructor');
        this.state = {
            formValue:{
                username:"",
                password: "",
                rePassword: ""
            },
            submitting: false,
            errors: {},
            serverFeedback:""
        }
    }

    submitHandler = (event)=>{
        console.log(this.props);
        event.preventDefault();
        const errors = this.validate(this.state.formValue);
        if(isEmpty(errors)){
            this.setState({
                submitting: true,
                serverFeedback:"",
                errors:{}
            }, ()=>{
                fetch("http://localhost:8080/v1/register", {
                    method: "POST",
                    body: JSON.stringify(this.state.formValue),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response=>response.json()).then(response => {
                    if(response.result){
                        console.alert("Congratulations");
                        this.setState({
                            serverFeedback:response.result.message,
                            submitting: false,
                            formValue:{
                                ...response.result
                            }
                        })
                    }else{
                        this.setState({
                            submitting: false,
                            serverFeedback:response.message,
                            errors: errors
                        })
                    }
                })
            })
        }
    }

    changeHandler= (event)=>{
        console.log('changeHandler');
        this.setState({
            formValue:{
                ...this.state.formValue,
                [event.target.name]:event.target.value
            }
        }, ()=>{
            this.setState({
                errors:this.validate(this.state.formValue)
            })
        })
    }

    validate = (values) => {
        console.log('validate');
        const errors = {};
        const {username = "", password = "", rePassword = ""} = values;
        if(username.trim() === ""){
            errors.username = "username cannot be empty";
        }
        if(password.trim() === ""){
            errors.password = "password cannot be empty";
        }
        if(rePassword.trim() === ""){
            errors.rePassword = "password cannot be empty";
        }
        if(password.trim() !== "" && password.trim().length < 5){
            errors.password = "password format invalid";
        }
        if(rePassword.trim() !== password.trim()){
            errors.rePassword = "Two passwords have to match with each other";
        }
        return errors;
    }

    render(){
        console.log('render')
        const {username, password, rePassword} = this.state.formValue;
        const errors = this.state.errors;
        return (
            <div className='container'>
                <h1 className={'mt-3'}>Register </h1>
                <div className="d-flex flex-column justify-content-center">
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <form onSubmit={this.submitHandler}>
                                {this.state.serverFeedback && <h3 className={'text-danger'}>{this.state.serverFeedback}</h3>}
                                <CustomizedInput
                                    name={'username'}
                                    label={'Username'}
                                    errors={errors}
                                    value={username}
                                    onChange={this.changeHandler}
                                />

                                <CustomizedInput
                                    name={'password'}
                                    label={'Password'}
                                    errors={errors}
                                    value={password}
                                    onChange={this.changeHandler}
                                />

                                <CustomizedInput
                                    name={'rePassword'}
                                    label={'Re-enter password'}
                                    errors={errors}
                                    value={rePassword}
                                    onChange={this.changeHandler}
                                />

                                <button type={'submit'} disabled={this.state.submitting} className={'btn btn-primary'}>Register</button>
                            </form>
                            <Link to="/login">Already have an account? </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Register);