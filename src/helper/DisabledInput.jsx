import React, {Component} from 'react';

class CustomizedInput extends Component {
    render() {
        const {errors="", label="", name="", value="",onChange} = this.props;
        let inputValidationClassName = "form-control";
        if(value){
            if(errors[name]){
                inputValidationClassName += "is-invalid"
            }else{
                inputValidationClassName += "is-valid"
            }
        }
        return (
            <div className={"form-group"}>
                <label className="form-label">{label}</label>
                <input type="text" name={name} value={value} className={inputValidationClassName} onChange={onChange} disabled/>
                {errors[name] && <div >
                    {errors[name]}
                </div>}
            </div>
        )
    }
}

export default CustomizedInput;