import React from 'react';
import axios from 'axios';
import api from '../api'
import config from '../config'
import '../App.css';
// import Modal from 'react-modal';
// import QRCode from "react-qr-code";
import { ethers } from "ethers";
import Web3 from 'web3';
import Loading from 'react-fullscreen-loading';
import swal from 'sweetalert';
import asset from "../abis/Assets.json"
import Header from '../Components/Header'


// Modal custom style
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',

//     }
// };
const contractAddress = config.Contract_address


class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            selectedFile: null,
            assetName: "",
            price: "",
            description: "",
            tokenId: "",
            dataList: [],
            imageName: "",
            newModel: false,
            ethadd: "",
            transHash: "",
            soldstatus: "",
            visible: false,
            loader: false,
            ipfsHash: "",
            web3: '',
            tokenOwner: ""
        };
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    };

    componentDidMount() {
        var jwttoken = sessionStorage.getItem('token')
        // console.log("jwttoken", jwttoken, " nftTokenIdNumber ", this.props.location.state.tokenID)
        if (jwttoken) {
            this.setState({ tokenId: this.props.location.state.tokenID })
            const config = {
                headers: {
                    'authtoken': jwttoken,
                }
            }
            axios.post(api.API_URL + 'getsingledata', { "tokenId": this.props.location.state.tokenID }, config).then((respo) => {
                // console.log("========respo", respo)
                this.setState({
                    ipfsHash: respo.data.data.ipfsHash,
                    price: respo.data.data.price,
                    assetName: respo.data.data.assetName,
                    description: respo.data.data.description
                })
            }).catch((er) => {
                // console.log('er', er)
            })
        } else {
            swal({ title: "Unauthorized Access", icon: "error" })
            this.props.history.push("/")
        }
    }


    loadBlockchainData = async () => {
        try {
            const web3 = window.web3
            // Load account
            const accounts = await web3.eth.getAccounts()
            this.setState({ web3: web3, account: accounts[0] })
            const abi = asset
            const contract = new web3.eth.Contract(abi, contractAddress)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({ totalSupply })
            // Load asset
            // console.log("totalsupply&contract", totalSupply, contract)

        } catch (err) {
            // console.log("error", err)
        }

    }


    loadWeb3 = async () => {
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
        } catch (err) {
            swal({ title: "please install metamask", icon: "error" })
        }
    };

    buyToken = () => {
        this.setState({ loader: true })
        var self = this;
        const ethaddress = "0x1dC1f4b7959aB8955836282E28524DE41A9975Bd"
        this.setState({ ethadd: ethaddress })
        var price = (this.state.price).toString();
        const { web3 } = window
        this.state.contract.methods.ownerOf(this.state.tokenId).call().then((tokenOwner) => {
            web3.eth.getAccounts(function (error, result) {
                // console.log("accounts result", result[0], tokenOwner);
                if (tokenOwner === result[0]) {
                    swal({ title: "token owner and token buyer can't be same", icon: "error" })
                    self.setState({ loader: false })
                } else {
                    web3.eth.sendTransaction(
                        {
                            from: result[0],
                            to: ethaddress,
                            value: web3.utils.toWei(price, 'ether'),
                            data: ""
                        }, function (err, transactionHash) {
                            if (!err)
                                // console.log("transhash", transactionHash);
                            if (transactionHash) {
                                self.paymentMethod(transactionHash, result[0]);
                            }
                        });
                }
            });
        }).catch((err) => {
            self.setState({ loader: false })
        })
    }

    // handleHash = (event) => {
    //     this.setState({ transHash: event.target.value })
    //   }

    // closeModalNew = () => {
    //     this.setState({ newModel: false })
    // }

    paymentMethod = (transhash, receiverAdd) => {
        var token = sessionStorage.getItem('token');
        let assetname = this.state.assetName
        var txhash = transhash;
        var payamout = this.state.price;
        var payaddr = receiverAdd;
        var tokenid = this.state.tokenId;
        // console.log(txhash, "hash&tokenid", tokenid);
        const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/f99366737d854f5e91ab29dad087fcd5');

        provider.getTransaction(txhash).then((transaction) => {
            // console.log("transdetails", transaction.from, transaction.to);
            let paidprice = transaction.value.toString() / 1E18;
            // let sendtoadd = transaction.to;
            if (payamout !== paidprice) {
                swal({ title: "Please pay required amount.", icon: "error" })
                this.setState({ loader: false })
            } else {
                const options = {
                    headers: { 'authtoken': token }
                };
                axios.post(api.API_URL + 'paymentdetail', {
                    "assetName": assetname,
                    "tokenId": tokenid,
                    "newOwnerAddrs": payaddr,
                    "boughtTokenHash": txhash,
                    "tokenPrice": payamout,
                }, options).then((datas) => {
                    // console.log('datas', datas)
                    if (datas.data.status) {
                        this.setState({ loader: false })
                        swal({ title: "Token bought success", icon: "success" }).then((respd) => {
                            this.props.history.push("/");
                        })
                    } else {
                        swal({ title: "Tranfering failed.", icon: "error" })
                        this.setState({ loader: false })
                    }
                }).catch((errss) => {
                    // console.log('catchblock', errss)
                    this.setState({ loader: false })
                })
            }
        });
    }


    render() {
        // console.log('this.props', this.props.location.state)
        return (
            <>
                <Header />
                <div className="container">
                    {this.state.loader ? (<Loading loading background="#ffffff00" loaderColor="#3498db" />) : (
                        <div className="singlemodaldetail">
                            <div class="row">
                                <div className="col-sm-8">
                                    <div className="imagesection">
                                        <img src={api.IPFS_URL + this.state.ipfsHash} alt="" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="detailsection">
                                        <div className="sidedetail">
                                            <h3>{this.state.assetName}</h3>
                                            <div className="pricebox"><h3>{this.state.price}ETH</h3></div>
                                            <div className="descriptionbox"><p>{this.state.description}</p></div>
                                        </div>
                                        <div className="bidsection">
                                            <button className="btn btn-primary" onClick={this.buyToken}>Buy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {/* 
                    <Modal
                        isOpen={this.state.newModel}
                        style={customStyles}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                    >

                        <div className="paymentmodal">
                            <div className="paysection">
                                <h1>Ethereum Address</h1>
                                <div className="qrcode-area">
                                    <QRCode value={this.state.ethadd} />
                                </div>
                                <p>{this.state.ethadd}</p>
                                <p>Amount To Pay: {this.state.price}ETH</p>
                                <p>Enter Your Transection Hash</p>
                                <input type="text" placeholder="Transection Hash" onChange={this.handleHash}></input>

                                <div className="bidsection">
                                    <button onClick={this.paymentMethod}>I Have Paid</button>
                                </div>
                            </div>
                        </div>
                        <button className="closemodal" onClick={this.closeModalNew}>X</button>
                    </Modal> */}
                </div>

            </>

        )
    };
};



export default Details;
