const { getContractAddress } = require("ethers/lib/utils")
const { run } = require("hardhat")

const verify = async (getContractAddress) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: getContractAddress,
        })
    } catch (e) {
        if (e.message.toLowerCase(),includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

module.experts = { verify }