import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';




class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPass: "",
            hidden: true,
        }
    }

    handleusername = (event) => {
        this.setState({ username: event.target.value })
    }

    handleemail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlepassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleconfirmpass = (event) => {
        this.setState({ confirmPass: event.target.value })
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }


    signup = () => {
        if (this.state.username === "" || this.state.username === null) {
            return swal({ title: 'Enter your username', icon: "error" })
        } else if (this.state.email === "" || this.state.email === null) {
            return swal({ title: "Enter your email address", icon: "error" })
        } else if (this.state.password === "" || this.state.password === null) {
            swal({ title: 'Enter your password', icon: "error" })
        } else if (this.state.confirmPass === "" || this.state.confirmPass === null) {
            swal({ title: 'Confirm your pasword', icon: "error" })
        } else if (this.state.confirmPass !== this.state.password) {
            swal({ title: "Password and confirm Password don't match", icon: "error" })
        } else {
            axios.post('/users/add', {
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password,
                "confirm_password": this.state.confirmPass
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    swal({ title: 'Signed up successfully!\nConfirmation email sent!', icon: "success" });
                    setTimeout(function () {
                        window.location.href = './Signin';
                    }, 2000);
                }
            }, error => {
                swal({ title: error.response.data, icon: "error" });
            });
        }
    }


    render() {
        return (
            <>
                <div className="main-body">
                    <div className="container h-100 ">

                        <div className="formContent">
                            <h1>Sign Up</h1>
                            <div>
                                <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleusername}></input>
                                <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleemail}></input>

                                <div className="pas-field">
                                    <input type={this.state.hidden ? 'password' : 'text'} placeholder="password" value={this.state.password} onChange={this.handlepassword}></input>
                                    <i class="fa fa-eye" aria-hidden="true" onClick={this.toggleShow}></i>
                                </div>
                                <div className="pas-field">
                                    <input type={this.state.hidden ? 'password' : 'text'} placeholder="Confirm password" value={this.state.confirmPass} onChange={this.handleconfirmpass}></input>
                                    <i class="fa fa-eye" aria-hidden="true" onClick={this.toggleShow}></i>
                                </div>
                                <input type="submit" className="fadeIn fourth" value="Sign Up" onClick={this.signup}></input>
                            </div>
                            <div id="formFooter">
                                <p>Already registered <a className="underlineHover" href="/Signin">Sign In</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


export default Signup;