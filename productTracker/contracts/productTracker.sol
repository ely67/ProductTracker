// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @author Elyas Sarjoughi
 * @title Product Tracker Contract
 * @notice This contract allows tracking and management of products.
 * @dev Products are uniquely identified by their product codes and can be associated with tags.
 *      The contract owner can add, remove, and transfer ownership of the contract.
 */

contract productTracker {
    // Define a struct to represent a product
    struct Product {
        address creator;        // The address of the individual who executed the function.
        string productName;     // Name of the product
        uint256 productCode;    // Unique product code
        uint256 entryDate;      // the entry date of the product
        string tag;             // Product tag or category
    }

    // Mapping to store products by their unique product code
    mapping(uint256 => Product) public products;

    // Total count of products
    uint256 public productCount;

    // Address of the contract owner
    address public owner;

    // Define events to log important contract actions
    event ProductAdded(address indexed creator, string productName, uint256 productCode, string tag);
    event ProductModified(uint256 productCode, string newProductName, string newTag);
    event ProductRemoved(uint256 productCode);

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructor to set the initial contract owner
    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    // Function to add a new product to the contract
    function addProduct(string memory _productName, uint256 _productCode, string memory _tag) public onlyOwner {
        // Check if a product with the same code already exists
        require(products[_productCode].productCode == 0, "Product with this code already exists");

        // Create a new product and store it in the mapping
        products[_productCode] = Product({
            creator: msg.sender,
            productName: _productName,
            productCode: _productCode,
            entryDate: block.timestamp,
            tag: _tag
        });

        // Increment the product count
        productCount++;

        // Emit the ProductAdded event to log the addition of a new product
        emit ProductAdded(msg.sender, _productName, _productCode, _tag);
    }

    // Function to retrieve product details by its unique product code
    function getProduct(uint256 _productCode) public view returns (
        address creator,
        string memory productName,
        uint256 entryDate,
        string memory tag
    ) {
        Product memory product = products[_productCode];

        // Check if the product with the given code exists
        require(product.productCode != 0, "Product with this code does not exist");

        // Return the product details
        return (
            product.creator,
            product.productName,
            product.entryDate,
            product.tag
        );
    }

    // Function to modify product details (can only be called by the owner)
    function modifyProduct(uint256 _productCode, string memory _newName, string memory _newTag) public onlyOwner {
        // Retrieve the product from storage
        Product storage product = products[_productCode];

        // Check if the product with the given code exists
        require(product.productCode != 0, "Product with this code does not exist");

        // Update product details
        product.productName = _newName;
        product.tag = _newTag;

        // Emit the ProductModified event to log the modification of product details
        emit ProductModified(_productCode, _newName, _newTag);
    }

    // Function to remove a product from the contract (can only be called by the owner)
    function removeProduct(uint256 _productCode) public onlyOwner {
        // Retrieve the product from storage
        Product memory product = products[_productCode];

        // Check if the product with the given code exists
        require(product.productCode != 0, "Product with this code does not exist");

        // Delete the product and decrement the product count
        delete products[_productCode];
        productCount--;

        // Emit the ProductRemoved event to log the removal of a product
        emit ProductRemoved(_productCode);
    }

    function getProductCount() public view returns(uint256) {
        return productCount;
    }

}

