import './loginstyle.css'
function Signup(){
    return(
        <div>
            <div className = "Login">
            <h1>
                Login
            </h1>
            <input type = "text" placeholder = "Full Name"/>
            <input type = "text" placeholder = "Contact number"/>
            <input type = "text" placeholder = "Date Of Birth YYYY/MM/DD"/>
            <input type = "text" placeholder = "Year *yr *sem"/>
            <input type = "text" placeholder = "Email"/>
            <input type = "text" placeholder = "Password"/>
            <input type = "text" placeholder = "Confirm Password"/>
            <button>Signup</button>
            </div>
        </div>
    )
}
export default Signup;