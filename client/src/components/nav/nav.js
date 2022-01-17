import './nav.css'
import logo from '../../logo.svg'
function Nav(){
    return(
        <div className='Nav'>
            <nav>
                <h1>KU</h1>
                <ul>
                    <li><img src = {logo}/></li>
                    <li>Routine</li>
                    <li>Notices</li>
                    <li><button className = "loginsignu[">Login | Signup</button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Nav;