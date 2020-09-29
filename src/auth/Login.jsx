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
                password: ""
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
                fetch("http://localhost:8080/v1/login", {
                    method: "POST",
                    body: JSON.stringify(this.state.formValue),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response=>response.json()).then(response => {
                    if(response.result){
                        console.log(response);
                        localStorage.setItem("token",response.result)

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
        const {username = "", password = ""} = values;
        if(username.trim() === ""){
            errors.username = "username cannot be empty";
        }
        if(password.trim() === ""){
            errors.password = "password cannot be empty";
        }
        if(password.trim() !== "" && password.trim().length < 5){
            errors.password = "password format invalid";
        }
        return errors;
    }

    render(){
        console.log('render')
        const {username, password} = this.state.formValue;
        const errors = this.state.errors;
        return (
            <div className='container'>
                <h1 className={'mt-3'}>Login Form </h1>
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

                                <button type={'submit'} disabled={this.state.submitting} className={'btn btn-primary'}>Login</button>
                            </form>

                            <Link to="/register">New to here? </Link>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Register);