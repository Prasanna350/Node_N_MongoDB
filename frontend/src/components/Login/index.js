import {Component} from "react"
import {Link,Navigate} from "react-router-dom"
import "./index.css"
import Cookies from "js-cookie"
import CommonFormUI from "../CommonFormUI"

class Login extends Component{
    state = {username:"",password:"",errorMsg:"",isLogin : false}

    onSuccessLogin = (data) => {
        const {jwtToken} = data 
        Cookies.set("jwt_token",jwtToken,{
            expires: 30,
            path: '/',
          })
        this.setState({isLogin : true})
    }

    onSubmitLogin = async(event) => {
        event.preventDefault()
        const {username,password} = this.state;
        const userDetails = {username,password}
        const url = `https://node-n-mongo-db.vercel.app/login`
        const options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok) {
            this.onSuccessLogin(data)
        }else{
            this.setState({errorMsg:`*${data.errorMsg}`})
        }
    }

    onChangeUsername = (event) => {
        this.setState({username:event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password : event.target.value})
    }
    
    render(){
        const {username,password,errorMsg} = this.state
        const jwtToken = Cookies.get("jwt_token")
        if (jwtToken !== undefined){
           return <Navigate to = "/"/>
        }

        return(
            <CommonFormUI>
                <form onSubmit={this.onSubmitLogin}>
                <p className="form-request-msg">Please Login into your account</p>
                <div className="form-input-field-card">
                    <label className="form-input-label">Email or Username *</label>
                    <input 
                        className = "form-input-ele" 
                        type = "text" 
                        placeholder = "Enter your email or username" 
                        value={username} 
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-input-field-card">
                    <label className="form-input-label">Password *</label>
                    <input 
                        type = "password" 
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {this.onChangePassword} 
                        className = "form-input-ele"
                    />
                </div>
                <button type="submit" className="log-sig-btn">Login</button>
                <p className="error-msg">{errorMsg}</p>
                <div>
                    <p>Didn't have an Account?</p>
                    <Link to="/signup">Create An Account</Link>
                </div>
            </form>
            </CommonFormUI> 
            
        )
    }
    

}
export default Login
