import React from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Logo from '../images/nlogo.jpg';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let provider = null;
let web3 = null;
let accounts = null;
let walletId = null;


const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "e126b9c0a29a41da860bf6527a3cdf88"
        }
    }
};

async function disconnectWallet(remoteDisconnect) {
    walletId = null;
    provider = null;
    if (remoteDisconnect) {
        toast("Wallet was disconnected remotely, try connecting again.", { theme: 'light', hideProgressBar: 'true', type: 'error' });
    }
    else {
        toast("Wallet disconnected!", { theme: 'light', hideProgressBar: 'true', type: 'info' });
    }
    sessionStorage.clear()
    setTimeout(function () {
        window.location.reload()
    }, 1000);
}

async function showWalletConnect() {
    if (!provider) {
        const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions
        });
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
    }

    // Subscribe to provider disconnection
    provider.on("disconnect", () => {
        disconnectWallet(true);
    });

    if (walletId == null) {
        accounts = await web3.eth.getAccounts();
        walletId = accounts[0].toLowerCase();
        toast("Wallet connected!", { theme: 'light', hideProgressBar: 'true', type: 'success' });
        sessionStorage.setItem("walletId", walletId);
        setTimeout(function () {
            window.location.reload()
        }, 1000);
    }
}

function Header() {
    walletId = sessionStorage.getItem("walletId");

    const history = useHistory();

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

                        <li>
                            {walletId != null ? (
                                <div>
                                    <input id="connectedAccount" style={{ border: 0, width: '200%' }} value={walletId} disabled />
                                    <br /><button className="btn blue-btn" onClick={() => { disconnectWallet(false) }}>Logout</button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn blue-btn" onClick={showWalletConnect}>Connect Wallet</button>
                                </div>
                            )}
                        </li>

                    </ul>
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
}

export default Header;