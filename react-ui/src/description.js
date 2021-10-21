import React, { Component } from 'react';





class Description extends React.Component {
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





  render() {
    return (
        <>
        <div>
            <h1>Description</h1>
        </div>
        </>
    )
  }
};

export default Description;
