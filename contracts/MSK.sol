//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
//chainlink
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "hardhat/console.sol";


contract MSK is ERC1155, Ownable, VRFConsumerBase {



    //NFT Levels
    uint256 public constant Basic = 1;
    uint256 public constant Influencer = 2;
    uint256 public constant Pimpfluencer = 3;

    //seed
    uint256 private seed; //seed used to randomize

    //chainlink
    uint256 internal fee;
    uint256 public randomResult;
    bytes32 internal keyHash;

    string public NFT =  'ipfs://QmV97nzpk4Dibf3FSewLJm1a53nzArXbbW5f75sXRF4ZT7/';  
                             

    mapping(address => mapping (uint256 => uint256))  public tokenBalance;
    

    constructor() 
        ERC1155(NFT)
        VRFConsumerBase(
             0x8C7382F9D8f56b33781fE506E897a4F1e2d17255,
             0x326C977E6efc84E512bB9C30f76E30c160eD06FB 
              )  public {

        //chainlink
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK
    }

    //Events
    event NFTMinted(uint256 tokenId, address receiver, uint256 mintedAmount);

    //event RandomNumber(uint256 randomReturn);



    // got to figure out to to gameplay this
    // Mint NFT
    function mintNFT(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zer0");
        // uint256 random = randomize();
        // console.log("random" , random);

         if(randomResult > 90){
            _mint(msg.sender, Pimpfluencer, _amount, "");
            tokenBalance[msg.sender][Pimpfluencer] += _amount;
            emit NFTMinted(Pimpfluencer, msg.sender, _amount);
         }else if (randomResult >=70 && randomResult <=90) {
             _mint(msg.sender, Influencer, _amount, "");
            tokenBalance[msg.sender][Influencer] += _amount;
            emit NFTMinted(Influencer, msg.sender, _amount);
         } else {
             _mint(msg.sender, Basic, _amount, "");
            tokenBalance[msg.sender][Basic] += _amount;
            emit NFTMinted(Basic, msg.sender, _amount);
         }
    }


    function name() public pure returns (string memory) {
        return "Mark Social Kontext";
    }

    function symbol() public pure returns (string memory) {
        return "MSK";
    }  

    // random section
    function randomize() private returns(uint256) {
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        seed = randomNumber;
        return seed;
    } 

    function startCLRandom() public onlyOwner {
        getRandomNumber();
    } 


    // chainlink
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness % 100;
    }
    
    //function to pull out extra link
    function withdrawLink() public onlyOwner {
        require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
    } 

    // URI overide for number schemes
    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                NFT,
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

}
