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

    function clickMe() public returns (uint) {
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
}