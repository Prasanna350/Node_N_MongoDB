import "./index.css"

const CommonFormUI = (props) => (

    <div className = "form-body-bg">
                <div  className = "form-card-bg">
                <div className="form-blog-icon-Card">
                    <h1 className="form-blog-logo-b">D</h1>
                    <h1 className="form-blog-logo-name">Demo</h1>
                </div>
                <h1 className="form-greeting-msg">Welcome to the Application!!</h1>
                {props.children}
            </div>
            </div>

)

export default CommonFormUI