


import React from 'react';
import '../App.css';
import api from '../api'
import Header from './Header';
import axios from 'axios';
import Loading from 'react-fullscreen-loading';
import swal from 'sweetalert';
// import Web3 from 'web3';
// import asset from "../abis/Assets.json"
// import Modal from 'react-modal';
// import QRCode from "react-qr-code";
// import { ethers } from "ethers";
// import config from '../config'
// require('dotenv').config()

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';





const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};




class Home extends React.Component {
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
      showModal: false,
      imageName: "",
      newModel: false,
      ethadd: "",
      transHash: "",
      soldstatus: "",
      visible: false,
      loader: false,
      ipfsHash: ""
    };
  }


  async componentDidMount() {
    await this.getAllData()

  }




  //List of all data in table;
  getAllData = async () => {
    axios.get(api.API_URL + 'getalldata').then((listdata) => {
      // console.log("getalldatalist", listdata.data.data)
      this.setState({ dataList: listdata.data.data, soldstatus: listdata.data.data.soldStatus })
    }).catch((errs) => {
      // console.log("alldata_api_catchblock",errs)
    })
  }

  notSoldClick = (data) => {
    // console.log('shomodal=====', data)
    var jwttoken = sessionStorage.getItem("token")
    if (jwttoken) {
      this.props.history.push('/Detail', {
        tokenID: data
      })
    } else {
      swal({ title: "Unauthrized access! Login first", icon: "error" })
    }
  }

  // Curosol---------






  render() {
    return (
      <>
        <Header />
        <div className="container">

          <div style={{ textAlign: "center", marginTop: "75px" }}>
            {this.state.loader ? (<Loading loading background="#ffffff00" loaderColor="#3498db" />) : (

              <div className="main-body">
                {/* Test modal----------------- */}

                <div className="sellers-area">
                  <div className="seller-title">
                    <h3 >New <span>Token 💥</span></h3>
                  </div>
                  <Carousel
                    responsive={responsive}

                  >
                    {this.state.dataList.map(list => (
                      list.soldStatus === "1" ? (

                        <div className="col-sm-3">
                          <div className="assetfield"  >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p>Status:Sold</p>
                            </div>

                          </div>
                        </div>
                      ) : (
                        <div className="col-sm-3">
                          <div className="assetfield" onClick={() => this.notSoldClick(list.tokenId)} >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p className="assetstatus">Status:Not sold</p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </Carousel>
                </div>

                {/* Test modal end----------------- */}


                {/* HOT Nft seller start----------------- */}
                <div className="sellers-area">
                  <div className="seller-title">
                    <h3 >Hot <span>NFT 🔥</span></h3>
                  </div>
                  <Carousel
                    responsive={responsive}
                  >
                    {this.state.dataList.map(list => (
                      list.soldStatus === "1" ? (

                        <div className="col-sm-3">
                          <div className="assetfield"  >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p>Status:Sold</p>
                            </div>

                          </div>
                        </div>
                      ) : (
                        <div className="col-sm-3">
                          <div className="assetfield" onClick={() => this.notSoldClick(list.tokenId)} >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p className="assetstatus">Status:Not sold</p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </Carousel>
                </div>
                {/* HOT Nft seller end----------------- */}
                {/* Explore area start--------- */}
                <div className="sellers-area explore-section" style={{ marginTop: "20px" }}>
                  <div className="seller-title">

                    <div className="row">
                      <div className="col-sm-3">
                        <h3 >Explore ⚡<span> </span></h3>
                      </div>
                      <div className="col-sm-9">
                        <ul class="nav explore-menu">
                          <li class="nav-item">
                            <a class="nav-link active" href="#">All</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">📸 Photography</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">🎵 Music</a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="assetarea row">

                    {this.state.dataList.map(list => (
                      list.soldStatus === "1" ? (

                        <div className="col-sm-3">
                          <div className="assetfield"  >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p>Status:Sold</p>
                            </div>

                          </div>
                        </div>
                      ) : (
                        <div className="col-sm-3">
                          <div className="assetfield" onClick={() => this.notSoldClick(list.tokenId)} >
                            <div className="assetimage">
                              <img style={{ height: 200, width: 200 }} src={api.IPFS_URL + list.ipfsHash} alt="" />
                            </div>
                            <div className="assetdetail">
                              <h3 className="assetname">{list.assetName}</h3>
                              <p>Price: {list.price}</p>
                              <p className="assetstatus">Status:Not sold</p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
                {/* Explore area end--------- */}

              </div>


            )}
          </div>


        </div>
      </>
    )
  }
}




export default Home;
