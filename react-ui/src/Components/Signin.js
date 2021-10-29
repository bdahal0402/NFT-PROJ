import React from 'react';
import axios from 'axios';
import api from '../api'
import swal from 'sweetalert';





class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            hidden: true,
            token: ""
        }
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    signin = () => {
        if (this.state.email === "" || this.state.email === null) {
            return swal({ title: "Enter your email address", icon: "error" })
        } else if (this.state.password === "" || this.state.password === null) {
            return swal({ title: "Enter your password", icon: "error" })
        } else {
            let userToken;
            let fullName;
            axios.post('/users/login', {
                "email": this.state.email,
                "password": this.state.password,
            }).then((response) => {
                if (response.status === 200) {
                    userToken = response.data.token;
                    fullName = response.data.fullName;

                    this.setState({ token: userToken });
                    localStorage.setItem('token', userToken);
                    localStorage.setItem('fullName', fullName);
                    localStorage.setItem('userEmail', this.state.email);
                    swal({ title: "Logged in successfully!", icon: "success" });
                    setTimeout(function () {
                        window.location.href = './';
                    }, 2000);
                }
            }, error => {
                console.log(error);
                if (error.response.data === "unverified") {
                    localStorage.setItem('verificationEmail', this.state.email);
                    swal({ title: "Your email is not verified yet!", icon: "warning" })
                    setTimeout(function () {
                        window.location.href = './VerifyEmail';
                    }, 2000);
                }
                else {
                    return swal({ title: error.response.data, icon: "error" })
                }
            });
        }
    }


    render() {
        return (
            <>
                <div className="main-body">
                    <div className="container h-100 ">
                        <div className="formContent">
                            <h1>Login</h1>
                            <div>
                                <input type="text" name="login" placeholder="Enter email" value={this.state.email} onChange={this.handleEmail}></input>

                                <div className="pas-field">
                                    <input type={this.state.hidden ? 'password' : 'text'} name="login" placeholder="Enter password" value={this.state.password} onChange={this.handlePassword}></input>
                                    <i class="fa fa-eye" aria-hidden="true" onClick={this.toggleShow}></i>
                                </div>
                                <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.signin}></input>

                            </div>
                            <div id="formFooter">
                                <p>Don't have an account? <a className="underlineHover" href="/Signup">Signup</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


export default Signin;