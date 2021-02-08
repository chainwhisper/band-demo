window.addEventListener('load', function () {

    window.web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.ninicoin.io/"));

})

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

async function getBNBPrice() {
    var bandAddr = "0xf5d5f2fcf50ff26b97eb0baafbc14734aedfba27";
    console.log(web3.version)
    const priceFeed = new web3.eth.Contract(bandInterfaceABI, bandAddr);

    priceFeed.methods.getReferenceData("BNB","USD").call()
    .then((price) => {
        // Do something with roundData
        console.log("Latest Round Data", price.rate)
        console.log(timeConverter(price.lastUpdatedBase));

        try {
            adjustedPrice =  price.rate / Math.pow(10,  18)
            document.getElementById("output").innerHTML = adjustedPrice;
            document.getElementById("output").innerHTML += " USD";
            document.getElementById("date").innerHTML = timeConverter(price.lastUpdatedBase);

        } catch (error) {
            document.getElementById("output").innerHTML = error;
        }
    });

}
// async function getPrice() {
//     var address, contractAddress, contractABI, tokenConztract, decimals, balance, name, symbol, adjustedBalance
//     address = document.getElementById("address").value
//     contractAddress = document.getElementById("contractAddress").value
//     contractABI = band_oracle_abi

//     tokenContract = web3.eth.contract(contractABI).at(contractAddress)

//     decimals = promisify(cb => tokenContract.decimals(cb))
//     balance = promisify(cb => tokenContract.balanceOf(address, cb))
//     name = promisify(cb => tokenContract.name(cb))
//     symbol = promisify(cb => tokenContract.symbol(cb))

//     try {
//         adjustedBalance = await balance / Math.pow(10, await decimals)
//         document.getElementById("output2").innerHTML = adjustedBalance;
//         document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")";
//     } catch (error) {
//         document.getElementById("output2").innerHTML = error;
//     }
// }
