# Product Tracker Contract

The Product Tracker Contract is a Solidity smart contract that allows tracking and management of products on the Ethereum blockchain. Each product is uniquely identified by its product code and can be associated with tags. The contract owner has the ability to add, modify, remove products.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

- **Author**: Elyas Sarjoughi
- **License**: MIT License

## Demo
Check out a brief demo of the "Product Tracker Contract" to see it in action:
https://drive.google.com/file/d/1A6t6ZYShhUJ0ROFgzMLDqGbLGCxhRg8s/view?usp=sharing

## Prerequisites

Before running the project locally, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) 
- [Yarn](https://yarnpkg.com/) (a fast and reliable dependency manager)
- [Hardhat](https://hardhat.org/) (a development environment )

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>



1. Navigate to the project directory:
   cd product-tracker-contract

2. Install project dependencies:
   yarn install

3. Create a `.env` file in the project root and configure the following environment variables:

   # PRIVATE_KEY: Your Ethereum account private key for deploying the contract.
   # ETHERSCAN_API_KEY (optional): Your Etherscan API key for contract verification.
   Example .env file:
   # PRIVATE_KEY=your-private-key-goes-here
   # ETHERSCAN_API_KEY=your-etherscan-api-key-goes-here

## Usage
Compiling the Smart Contract
Compile the Solidity smart contract using Hardhat:

`npx hardhat compile`

Running Tests
Run the tests to ensure the smart contract functions correctly:
`npx hardhat test`

Deploying the Smart Contract
To deploy the smart contract to a local Hardhat network, run:
`npx hardhat run scripts/Product.js --network localhost`

Replace `localhost` with the name of the desired network from your Hardhat configuration.

Interacting with the Contract
You can interact with the deployed contract using Hardhat's console:
`npx hardhat console --network localhost`

Now you can call contract functions using the Hardhat console.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add a new feature'`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Open a pull request on the original repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
   
You can replace `<repository-url>` with the actual URL of your GitHub repository if it's hosted there. This `README.md` provides an overview of the project, lists prerequisites, explains how to get started, and outlines basic usage and contribution guidelines.

https://drive.google.com/file/d/1A6t6ZYShhUJ0ROFgzMLDqGbLGCxhRg8s/view?usp=sharing








