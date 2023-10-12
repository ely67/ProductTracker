const { ethers } = require("hardhat")
 
async function main() {
    const ProductTrackerFactory = await ethers.getContractFactory("productTracker")
    console.log("Deploying contract...")
    const ProductTracker = await ProductTrackerFactory.deploy()
    await ProductTracker.deployed()
    console.log(`Deployed contract to: ${ProductTracker.address}`)
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })