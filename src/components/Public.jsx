import { Link } from 'react-router-dom'
import {useEffect} from "react"
import {setCredential} from "../features/auth/authSlice"
import {useDispatch} from "react-redux"
import useAuth from "../hooks/useAuth"
const Public = () => {
  const dispatch = useDispatch()
  
  
  useEffect(()=>{
    //const token = localStorage.getItem("token")
  //  alert(token)
  //  dispatch(setCredential(token))
  },[])
  
  
  
  
  
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Dan D. Repairs<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                    <a href="tel:09160125602"
                    className="text-yellow-400">09160125602</a>
                </address>
                <br />
                <p>Owner: Dan Davidson</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
                <br/>
                <Link to="/texting">Texting</Link>
                <br/>
                <Link to="/dash">Dashboard</Link>
            </footer>
        </section>

    )
    return content
}
export default Public