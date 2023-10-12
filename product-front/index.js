import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const addProductButton = document.getElementById("addProductButton");
const getProductButton = document.getElementById("getProductButton");
const modifyProductButton = document.getElementById("modifyProductButton")
const removeProductButton = document.getElementById("removeProductButton");
const getProductsCountButton = document.getElementById("getProductsCountButton");
const productInfoDiv = document.getElementById("productInfo");

connectButton.onclick = connect;
addProductButton.onclick = addProduct;
getProductButton.onclick = getProduct;
removeProductButton.onclick = removeProduct;
modifyProductButton.onclick = modifyProduct;
getProductsCountButton.onclick = getProductCount;



async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function addProduct() {
    const productName = document.getElementById("productName").value;
    const productCode = parseInt(document.getElementById("productCode").value);
    const tag = document.getElementById("tag").value;
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
          const transactoinResponse = await contract.addProduct(productName, productCode, tag)
          await transactoinResponse.wait()
          console.log("Product added successfully!")
        
        } catch (error) {
        console.log(error);
        }
    } else {
         addProductButton.innerHTML = "Please install MetaMask";
        }
}

async function getProduct() {
    const productCode = document.getElementById("getProductCode").value;
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const product = await contract.getProduct(productCode);
            productInfoDiv.innerHTML = `
                <p><strong>Creator:</strong> ${product.creator}</p>
                <p><strong>Product Name:</strong> ${product.productName}</p>
                <p><strong>Entry Date:</strong> ${new Date(product.entryDate * 1000)}</p>
                <p><strong>Tag:</strong> ${product.tag}</p>
            `;
        } catch (error) {
            productInfoDiv.innerHTML = `Error: ${error.message}`;
          }
    } else {
        getProductButton.innerHTML = "Please install MetaMask";
      }
}

async function modifyProduct() {
  // Get values from HTML input elements
  const productCodeToModify = parseInt(document.getElementById("productCodeToModify").value);
  const newProductName = document.getElementById("newProductName").value;
  const newTag = document.getElementById("newTag").value;

  // Check if MetaMask (window.ethereum) is available
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      // Call the modifyProduct function on the contract
      const transactionResponse = await contract.modifyProduct(productCodeToModify, newProductName, newTag);
      await transactionResponse.wait();
      console.log("Product modified successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    // If MetaMask is not available, display a message
    modifyProductButton.innerHTML ="Please install MetaMask";
  }
}


async function removeProduct() {
    const removeProductCode = document.getElementById("removeProductCode").value;
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
        const transactoinResponse = await contract.removeProduct(removeProductCode);
        await transactoinResponse.wait();
        //console.log(`Product with code ${productCodeToRemove} removed successfully!`);
        console.log("Product removed successfully!");
    } catch (error) {
        console.log(error);
      }
    } else {
        removeProductButton.innerHTML = "Please install MetaMask";
      }
}

async function getProductCount() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.getProductCount();
      console.log("Product Count:", transactionResponse.toString())
      return transactionResponse;
    } catch (error) {
      console.log(error);
      }
    } else {
        getProductsCountButton.innerHTML = "Please install MetaMask";
    }
    
}




