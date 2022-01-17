import './loginstyle.css'
function Login(){
    return(
        <div>
            <div className = "Login">
            <h1>
                Login
            </h1>
            <input type = "text" placeholder = "Email"/>
            <input type = "text" placeholder = "Password"/>
            <button>Login</button>
            <p>Forget Password</p>
            <p>Haven't Signup ?</p>
            </div>
        </div>
    )
}
export default Login;