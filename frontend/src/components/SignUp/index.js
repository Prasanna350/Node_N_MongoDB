import { Component } from "react";
import {Link,Navigate} from "react-router-dom"
import CommonFormUI from "../CommonFormUI";
import Cookies from "js-cookie"
import "./index.css"

class SignUp extends Component{
    state = {username:"",password:"",errorMsg:"",isRegistered : false}

    onSuccessfulRegistration = () => {
        this.setState({isRegistered:true})
    }

    onSubmitSignUp = async(event) => {
        event.preventDefault()
        
        const {username,password} = this.state 
        const userDetails = {username,password};
        const url = `https://node-n-mongo-db.vercel.app/register`
        const options = {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(userDetails),
        }
        const response = await fetch(url,options)
        
        if (response.ok){
            this.onSuccessfulRegistration()
        }else{
            const errorData = await response.text();
            this.setState({errorMsg:errorData})
        }
    }

    onChangeUsernameInSignUp = event => {
        this.setState({username:event.target.value})
    }

    onChangePasswordInSignUp = event => {
        this.setState({password:event.target.value})
    }

    render(){
        const {username,password,errorMsg,isRegistered} = this.state
        if (isRegistered){
            return <Navigate to = "/login"/>
        }
        const jwtToken = Cookies.get("jwt_token")
        if (jwtToken !== undefined){
            return <Navigate to = "/"/>
        }
        return(
            <CommonFormUI>
            <form onSubmit={this.onSubmitSignUp}>
            <p className="form-request-msg">Please SignUp into New account</p>
                <div className="form-input-field-card">
                    <label className="form-input-label">Email or Username</label>
                    <input 
                        className = "form-input-ele" 
                        type = "text" 
                        placeholder = "Enter your email or username" 
                        value={username} 
                        onChange={this.onChangeUsernameInSignUp}
                    />
                </div>
                <div className="form-input-field-card">
                    <label className="form-input-label">Password *</label>
                    <input 
                        type = "password" 
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {this.onChangePasswordInSignUp} 
                        className = "form-input-ele"
                    />
                </div>
                <button type="submit" className="log-sig-btn">SignUp</button>
                <p className="error-msg">{errorMsg}</p>
                <div>
                    <p>Already have an Account?</p>
                    <Link to="/login">Login</Link>
                </div>
                
            </form>
            </CommonFormUI>
        )
    }
}

export default SignUp
