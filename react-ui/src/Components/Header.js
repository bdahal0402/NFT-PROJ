import React from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Logo from '../images/nlogo.jpg';
// import Howto from './howto';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

let provider = null;
let web3 = null;
let accounts = null;


const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "e126b9c0a29a41da860bf6527a3cdf88" // required
        }
    }
};
var jwttoken;

async function showWalletConnect() {
    if (!provider) {
        const web3Modal = new Web3Modal({
            cacheProvider: true, // optional
            providerOptions // required
        });
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
    }

    // Subscribe to provider disconnection
    provider.on("disconnect", () => {
        swal({ title: "Wallet connection closed", icon: "error" });
        document.getElementById('connectedAccount').style = "border:0;";
        document.getElementById('connectedAccount').value = "";
    });

    if (!accounts) {
        accounts = await web3.eth.getAccounts();
        swal({ title: "Connected to wallet!", icon: "success" })
        document.getElementById('connectedAccount').value = "CONNECTED: " + accounts[0].toLowerCase();
        document.getElementById('connectedAccount').style = "border:0;";
    }
}

function Header() {
    jwttoken = sessionStorage.getItem("token")
    // console.log("inside header==========", jwttoken);
    const history = useHistory();
    const login = () => {
        history.push("/Signin");
    }
    const logout = () => {
        sessionStorage.clear()
        window.location.reload()
    }
    const generateasset = () => {
        // console.log("towen header", jwttoken);
        if (jwttoken) {
            history.push("/Createassets")
        } else {
            return swal({ title: "Please login!", icon: "error" })
        }
    }



    return (
        <div className="topheader">
            <nav className="navbar navbar-expand-lg nav-custom-style fixed-top">
                <div className="container">
                    <div className="d-flex justify-content-end justify-content-lg-start pt-1 pt-lg-0">
                        <a className="navbar-brand" href="/">
                            <img src={Logo} alt="logo" />
                        </a>
                    </div>
                    <div class="p-1 bg-light rounded rounded-pill shadow-sm search-box">
                        <div class="input-group">
                            <input type="search" placeholder="Search by creator, collectible or collection" aria-describedby="button-addon1" class="form-control border-0 bg-light"></input>
                            <div class="input-group-append">
                                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <ul class="nav header-menu">
                        <li class="nav-item">
                            <a class="nav-link" href="/" >Explore</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/howto" target="_blank">How it works</a>
                        </li>

                    </ul>
                    <div className="collapse navbar-collapse justify-content-end navMenu">
                        {jwttoken != null ? (
                            <div>
                                <button className="btn blue-btn" onClick={logout}>Logout</button>
                                <button style={{ marginLeft: 20 }} className="btn border-btn" onClick={generateasset}>Generate asset</button>
                            </div>
                        ) : (
                            <div>
                                <button className="btn blue-btn" onClick={showWalletConnect}>Connect Wallet</button>
                                <input id="connectedAccount" style={{ border: 0, visibility: 'hidden', width: '150px' }} disabled />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;