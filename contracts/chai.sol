// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Chai { // Fixed: Capital "C" vayo aba JavaScript factory le bhetcha
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }
    
    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // Fixed: function name 'byChai' lai 'buyChai' banाइयो scripts sanga match garna
    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}

 