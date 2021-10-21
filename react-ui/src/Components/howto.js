import React from 'react';
import Header from './Header';



class Howto extends React.Component {

    // handleClick(event) {
    //     console.log('Click happened');
    //     var x = document.getElementById("collaps-detail");
    //     if (x.style.display === "none") {
    //         x.style.display = "block";
    //     } else {
    //         x.style.display = "none";
    //     }
        
    // }


    render() {

        return (
            <>
            <Header />
                <div className="container">
                    <div className="question-area">
                    <h1>FAQ</h1>
                    <h3>Marketplace</h3>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p1"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">NFT? ERC-721 tokens?</h4>
                        </div>
                        <div id="p1" class="collapse">
                            <p>NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain. NFTs are unique digital items such as collectibles or artworks or game items. As an artist, by tokenizing your work you both ensure that it is unique and brand it as your work. The actual ownership is blockchain-managed.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p2"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">What does “minting” mean?</h4>
                        </div>
                        <div id="p2" class="collapse">
                            <p>The process of tokenizing your work and creating an NFT (see above).</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p3"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">Can I create an NFT on rarible.com without putting it on sale?</h4>
                        </div>
                        <div id="p3" class="collapse">
                            <p>Yes, you can and it is up to you if you decide to sell it later or not.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p4"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">Can I change the price of an already created collectible?</h4>
                        </div>
                        <div id="p4" class="collapse">
                            <p>Absolutely, you can lower the price free of transaction costs at any time. You just need to sign the signature request via your wallet.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p5"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">Can I gift or send a collectible to someone?</h4>
                        </div>
                        <div id="p5" class="collapse">
                            <p>Yes, just go on the detail page of a collectible you own, open the “...” menu and select “transfer token”</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p6"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">What does “burn a token” mean?</h4>
                        </div>
                        <div id="p6" class="collapse">
                            <p>The ERC-721 standard does not only allow the creation of NFTs, but also includes a possibility to destroy them - i.e. burning the token.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p7"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">Do you have an OpenSea integration?</h4>
                        </div>
                        <div id="p7" class="collapse">
                            <p>Yes, you can view the collectibles you have created on rarible.com on OpenSea and manage them there as well. Additionally, it is possible to list your collectibles on OpenSea not only in $ETH but also in $RARI.</p>
                        </div>

                    </div>
                   
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p8"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">What is “unlockable content”?</h4>
                        </div>
                        <div id="p8" class="collapse">
                            <p>As a content creator, you can add unlockable content to your collectibles, that only becomes visible after a transfer of ownership (i.e. selling or gifting your NFT). Artists use this feature to include high res files, making ofs. videos, secret messages etc.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p9"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">How does the royalty system work?</h4>
                        </div>
                        <div id="p9" class="collapse">
                            <p>Whenever you create a collectible you can set a certain percentage as royalty for secondary sales. Example: You create a digital painting and sell it for 0.2 ETH, the royalty is 10 percent. Your buyer then sells your painting at a higher price point for 0.5 ETH. Here, the royalty system kicks in. As the original content creator you receive 10% of that sale, being 0.05 ETH.</p>
                            <p>NB: Royalties set on OpenSea don’t carry over to rarible.com at the moment. However, the team is working on a cross-platform royalties implementation.</p>

                        </div>

                    </div>
                    
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p10"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">Can I report an artwork or collectible?</h4>
                        </div>
                        <div id="p10" class="collapse">
                            <p>Yes, go on the detail page of the token you want to report, click on the “...” button and select “Report”.</p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p11"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">What is verification? </h4>
                        </div>
                        <div id="p11" class="collapse">
                            <p>Verified badges are granted to creators and collectors that show enough proof of authenticity and active dedication to the marketplace. We are looking at multiple factors such as active social media presence and following, dialogue with community members,number of minted and sold items. </p>
                        </div>

                    </div>
                    <div className="collaps-container">
                        <div className="collaps-title">
                            <span data-toggle="collapse" data-target="#p12"><i class="fas fa-chevron-right"></i></span>
                            <h4 className="clickable-heading">It's been a while and I don't get verified. Why? </h4>
                        </div>
                        <div id="p12" class="collapse">
                           
                           <p>If you're not verified within a week since submitting your request, most likely you didn't provide enough information, or your Rarible account is not active enough.</p>
                            <p>Please note that the team reserves the right to not grant the verified badges without further explanation, as we receive hundreds of requests on a daily basis.</p>
                            <p>Please note that the team reserves the right to not grant the verified badges without further explanation, as we receive hundreds of requests on a daily basis.</p>
                            <p>Good luck! </p>
                            
                        </div>

                    </div>
                    </div>



                </div>
            </>
        )
    }




}
export default Howto;