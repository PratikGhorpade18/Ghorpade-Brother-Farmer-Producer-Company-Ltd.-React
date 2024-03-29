import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../../constants/APIUrl";

import { postAPICall } from "../../APIMethods/APIMethods";
 
 import  "../loginpage/Login.css";
 
function Login() {
    const initialValues = {
        username: "",   
        password: "",
    };
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        postAPICall(Url.login, formValues)
         .then((data) => { 
            console.log(data);
            if (data.jwtToken) {
               sessionStorage.setItem('Authorize', data.jwtToken);
                  navigate("home"); 
            } else { 
                alert("Invalid username or password");
            }
        })
        .catch((error) => {
            alert("Something went wrong");
        });
    };
    return (
<div className="login-wrapper">
<div className="login-container"> 
            <div className="login-img">  
         
            </div>
            <div className="login-form">
          <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formValues.username}
                                onChange={handleChange}
                            /> 
                        </div>
                        <div className="field">
                            <label>Password</label>
                           <input type="password" 
                                name="password"
                                placeholder="Enter your password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="fluid ui button blue" type="submit">Submit</button>
                    </div>
                </form>
                <div className="text">
                    Don't have an account? <span>Sign Up</span>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;
