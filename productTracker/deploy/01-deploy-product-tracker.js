const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("---------------------------------------------")
    log("Deploying ProductTracker and waiting for confirmation")
    const productTracker = await deploy("productTracker", {
        from: deployer,
        log: true,
        waitConfirmation: network.config.blockConfirmations || 1,
    })
    log(`productTracker at ${productTracker.address}`)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(productTracker.address)
    // }
}

module.exports.tags = ["all", "producttracker"]