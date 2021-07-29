pragma solidity ^0.5.0;

contract Adoption {
    address[16] public adopters;
    struct Card {
        string firstName;
        string lastName;
        string dob;
    }
    Card card;
    Card[] private cardArr;
    function addData(string memory yes, string memory no, string memory ay) public {
        card = Card(yes,no,ay);
        cardArr.push(card);
    }
    uint public timesClicked;
    address[16] clickers;
    string[16] public info;
    uint public infoIndex;

    function addInfo() public returns (uint) {
        timesClicked++;
        if(timesClicked == 16) {
            timesClicked = 0;
        }
        clickers[timesClicked] = msg.sender;
        return timesClicked;
    }

    function checkInfoExists(string memory data) public view returns (bool) {
        for (uint i = 0; i < 16; i++) {
            if(keccak256(bytes(data)) == keccak256(bytes(info[i]))) {
                return true;
            }
        }
        return false;
    }

    function getLast() public view returns (string memory) {
        string memory data = info[info.length];
        return data;
    }

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    function clickMe(string memory petId) public returns (uint) {
        
        timesClicked++;
        if(timesClicked == 16) {
            timesClicked = 0;
        }
        clickers[timesClicked] = msg.sender;
        infoIndex++;
        if(infoIndex == 16) {
            infoIndex = 0;
        }
        uint data = 5;
        info[infoIndex] = petId;
        return data;
    }

    function clickMe2() public returns (uint) {
        timesClicked++;
        if(timesClicked == 16) {
            timesClicked = 0;
        }
        clickers[timesClicked] = msg.sender;
        return timesClicked;
    }
    
    function getClicker() public view returns (address[16] memory) {
        return clickers;
    }

    function getCount() public view returns (uint) {
        return timesClicked;
    }

    function getAd() public view returns (address[16] memory) {
        return adopters;
    }
}