App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
  // Modern dapp browsers...
  if (window.ethereum) {
    App.web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markClicked();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-clickMe', App.handleClickMe);
    $(document).on('click', '.btn-enterInfo', App.handleEnterInfo);
    $(document).on('click', '.btn-checkInfo', App.handleCheckInfo);
  },

  markClicked: function() {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

  
    
      return adoptionInstance.getAdopters.call();
    }).then(function(clickers) {
      for (i = 0; i < clickers.length; i++) {
        if (clickers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-click').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  greet: async function() {
    document.getElementById("greeting").innerHTML = "Bonjour";
    return await instance.getCount();
  },

  handleClickMe: function(event) {
    console.log("clicked");
    event.preventDefault();

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        //console.log(instance.timesClicked.call());
        instance.timesClicked.call().then(function(res) {
          console.log(res.c[0]);
          document.getElementById("greeting").innerHTML = res.c[0];
        });


        //let count = instance.clickMe({from: account});
        //document.getElementById("greeting").innerHTML = "Bonjour";



        // Execute adopt as a transaction by sending account
        return adoptionInstance.clickMe({from: account});
      }).then(function(result) {
        console.log(result);
        return App.markClicked();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleEnterInfo: function(event) {
    console.log("entered");
    event.preventDefault();

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        //console.log(instance.timesClicked.call());
        instance.timesClicked.call().then(function(res) {
          console.log(res.c[0]);
          console.log(document.getElementById("fn").value.toString());
          console.log(document.getElementById("ln").value.toString());
          console.log(document.getElementById("date").value.toString());
        });

        let fullInfo = document.getElementById("fn").value.toString();
        fullInfo = fullInfo.concat(document.getElementById("ln").value.toString());
        fullInfo = fullInfo.concat(document.getElementById("date").value.toString());

        console.log(fullInfo);


        //let count = instance.clickMe({from: account});
        //document.getElementById("greeting").innerHTML = "Bonjour";

        

        // Execute adopt as a transaction by sending account
        return adoptionInstance.clickMe(fullInfo,{from: account});
      }).then(function(result) {
        console.log(result);
        return App.markClicked();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleCheckInfo: function(event) {
    console.log("checked");
    event.preventDefault();

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        //console.log(instance.timesClicked.call());
        instance.timesClicked.call().then(function(res) {
          console.log(res.c[0]);
          //document.getElementById("greeting").innerHTML = res.c[0];
          //console.log(document.getElementById("info").value.toString());
        });

        let checkingInfo = document.getElementById("firstCheck").value.toString();
        checkingInfo = checkingInfo.concat(document.getElementById("lastCheck").value.toString());
        checkingInfo = checkingInfo.concat(document.getElementById("dateCheck").value.toString());
        console.log(checkingInfo);

        instance.checkInfoExists.call(checkingInfo).then(function(res) {
          console.log(res);
          if(res) {
            document.getElementById("isFound").innerHTML = "VACCINATED";
          }
          else {
            document.getElementById("isFound").innerHTML = "NOT IN RECORDS/NOT VACCINATED";
          }
        });

        //this doesn't actually return anything



        //let count = instance.clickMe({from: account});
        //document.getElementById("greeting").innerHTML = "Bonjour";

        

        // Execute adopt as a transaction by sending account
        //return adoptionInstance.clickMe(checking);
      }).then(function(result) {
        //console.log(result);
        return App.markClicked();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
