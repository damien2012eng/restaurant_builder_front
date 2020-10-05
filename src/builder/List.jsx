import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

class List extends Component {

    constructor(props){
        super (props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/v1/features")
            .then(response => response.json())
            .then(response =>{
                this.setState({
                    data: response.result
                })
            })
    }

    renderRows(){
        return this.state.data.map((todo,index) =>{
            return (
                <tr key={index}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.icon_url}</td>
                    <td>
                        <Link to={`/editfeatures/${todo.id}`}>Edit</Link> {" | "}
                        <a href="#" onClick={()=>{
                            if(window.confirm("Please confirm you want to delete this record" + todo.id)){
                                    fetch("http://localhost:8080/v1/features/"+todo.id, {
                                        method: "DELETE",
                                        body: JSON.stringify(this.state.formData),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(response => response.json).then(response => console.log(response))
                            }else{
                                //cancel action
                            }
                        }}>Delete</a>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/addfeatures">Add New Features</Link>
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Icon</th>
                    </tr>
                    </thead>

                    <tbody id="feature-body">
                        {this.state.data.length > 0 && this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(List);