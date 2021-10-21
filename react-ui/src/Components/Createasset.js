import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import asset from "../abis/Assets.json"
import api from '../api'
import config from '../config'
import Loading from 'react-fullscreen-loading';
import swal from 'sweetalert';
import Header from './Header';


const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var contractAddress = config.Contract_address



class Createassets extends React.Component {
    constructor(props) {
        super(props);
        this.generateNftToken = this.generateNftToken.bind(this);
        this.state = {
            selectedFile: null,
            assetName: "",
            price: "",
            description: "",
            tokenId: "",
            ipfsHash: "",
            loader: false,
            imagepreview: ""
        }

    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    };

    loadBlockchainData = async () => {
        console.log(",hgfcf", contractAddress)
        try {
            const web3 = window.web3
            // Load account
            const accounts = await web3.eth.getAccounts()
            this.setState({ account: accounts[0] })
            const abi = asset
            const contract = new web3.eth.Contract(abi, contractAddress)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({ totalSupply })
            // Load asset
            console.log("totalsupply&contract", totalSupply, contract)

        } catch (err) {
            console.log("loadBlockchainData=catchblock", err)
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
            // console.log("loadweb3catchblock", err)
            swal({ title: "please install metamask", icon: "error" })
        }


    };

    handleAssetName = (event) => {
        this.setState({ assetName: event.target.value })
    }

    handlePrice = (event) => {
        this.setState({ price: event.target.value })
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
            imagepreview: URL.createObjectURL(event.target.files[0])
        });
    };

    handleDes = (event) => {
        this.setState({ description: event.target.value })
    }

    generateNftToken = async () => {

        const ownerethaddress = "0x93b8d57D2CECdC0Fd485CFCD7fB965D575445DcB"

        var email = localStorage.getItem("currentUserEmail")
        var token = sessionStorage.getItem('token')
        var self = this;
        console.log("jwttoken=", token,email)
        if (this.state.assetName === "" || this.state.assetName === null) {
            return swal({ title: "Enter your asset name", icon: "error" });
        } else if (this.state.price === "" || this.state.price === null) {
            return swal({ title: "Enter your pay amount", icon: "error" })
        } else if (this.state.selectedFile === "" || this.state.selectedFile === null) {
            return swal({ title: "please select your assets image", icon: "error" })
        } else if (this.state.description === "" || this.state.description === null) {
            return swal({ title: "Enter description", icon: "error" })
        } else {
            this.setState({ loader: true })
            var file = this.state.selectedFile
            let reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            try {
                reader.onloadend = async () => {
                    // console.log("clicked reader ipfs", reader)
                    const buffer = await Buffer.from(reader.result);
                    await ipfs.add(buffer, async (err, ipfsHash) => {
                        // console.log("imagehash&err", err, ipfsHash[0].hash);
                        //setState by setting ipfsHash to ipfsHash[0].hash 
                        this.setState({ ipfsHash: ipfsHash[0].hash });
                        // const options = {
                        //     headers: { 'authtoken': token }
                        // };

                        const newTokenID = await self.state.contract.methods.getTokenId().call()


                        console.log('getTokenidresponse', newTokenID)

                        console.log("elsecase")

                        var tokenId = newTokenID
                        self.state.contract.methods.mint(this.state.assetName, this.state.ipfsHash).send({ from: this.state.account })
                            .once('receipt', (receipt) => {
                                console.log("receipt==========", receipt)
                                this.setState({ loader: false })
                                swal({
                                    title: "Do you want to list your token for Selling?",
                                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((yes) => {
                                        this.setState({ loader: true })
                                        if (yes) {
                                            console.log("ssssssxxxx", ownerethaddress, tokenId);
                                            self.state.contract.methods.approve(ownerethaddress, tokenId).send({ from: this.state.account })
                                                .once('receipt', (receipts) => {
                                                    console.log("reciepts ====>", receipts)
                                                    this.setState({ loader: false })
                                                    swal({ title: "Your token has been added to list!", icon: "success" });
                                                    const data = new FormData()
                                                    data.append("assetName", this.state.assetName);
                                                    data.append("price", this.state.price);
                                                    data.append("description", this.state.description);
                                                    data.append("owner", this.state.account);
                                                    data.append("tokenId", tokenId)
                                                    data.append("ipfsHash", this.state.ipfsHash)
                                                    // console.log("ipfshashstate", this.state.ipfsHash)
                                                    let url = api.API_URL + "uploadImage";
                                                    const config = {
                                                        headers: {
                                                            'content-type': 'multipart/form-data',
                                                            'authtoken': token,
                                                        }
                                                    }
                                                    axios.post(url, data, config)
                                                        .then((result) => {
                                                            console.log("resultDataupload_image", result);
                                                            this.setState({ loader: false })
                                                            this.props.history.push("/")
                                                        }).catch((errr) => {
                                                            this.setState({ loader: false })
                                                        })
                                                })
                                        }
                                        else {

                                            let url = api.API_URL + "tokennotlist";
                                            const config = {
                                                headers: {
                                                    'authtoken': token,
                                                }
                                            }

                                            axios.post(url, {
                                                "assetName": this.state.assetName,
                                                "price": this.state.price,
                                                "description": this.state.description,
                                                "owner": this.state.account,
                                                "tokenId": tokenId,
                                                "ipfsHash": this.state.ipfsHash,
                                                "email":email
                                            }, config)
                                                .then((resultdata) => {
                                                    console.log("resultDataupload_image", resultdata);
                                                    this.setState({ loader: false })
                                                    swal({ title: "Thanks for Generating Tokens", icon: "info" });
                                                    this.props.history.push("/")
                                                }).catch((errr) => {
                                                    this.setState({ loader: false })
                                                })
                                        }
                                    });
                            }).catch((errror) => {
                                console.log("metamask", errror)
                                this.setState({ loader: false })
                            })
                    })
                }
            }
            catch (exception) {
                // console.log('exec', exception)
                this.setState({ loader: false })
            }
        }
    };

    render() {
        return (
            <>
                <Header />
                {this.state.loader ? (<Loading loading background="#ffffff00" loaderColor="#3498db" />) : (
                    <div className={'generatenftarea'}>
                        <h1>Create your collection</h1>
                        <table className="">
                            <tr>
                                <td><input type="text" placeholder="Asset Name" value={this.state.assetName} onChange={this.handleAssetName} /></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="Price" value={this.state.price} onChange={this.handlePrice} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center" }}>
                                    <label className="custom-file-select">
                                        {this.state.selectedFile ? (
                                            <img src={this.state.imagepreview} alt="" />
                                        ) : (
                                            <i class="fas fa-image"></i>
                                        )}
                                        <input type="file" className="" placeholder="Upload your img" onChange={this.onFileChange} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDes} /></td>
                            </tr>
                            <tr>
                            </tr>
                        </table>
                        <input type="submit" className="fadeIn fourth" value="Generate Nft" onClick={this.generateNftToken}></input>
                    </div>
                )}
            </>
        )
    }
}

export default Createassets;