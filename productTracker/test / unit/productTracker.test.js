const { ethers } = require("hardhat")
const { expect } = require("chai")

let productTrackerFactory, productTracker
let owner
describe("productTracker", function () {
  beforEach(async function (){
      owner = await ethers.getSigner()
      productTrackerFactory = await ethers.getContractFactory("productTracker")
      productTracker = await productTrackerFactory.deploy()
  })

  it("should add a new product", async function () {
    const productName = "Product 1";
    const productCode = 1;
    const tag = "Tag 1";

    await productTracker.addProduct(productName, productCode, tag);

    const product = await productTracker.getProduct(productCode);

    expect(product.creator).to.equal(owner.address, "Creator should be the owner");
    expect(product.productName).to.equal(productName, "Product name should match");
    expect(product.productCode).to.equal(productCode, "Product code should match");
    expect(product.tag).to.equal(tag, "Tag should match");
   
  })

  it("should modify a product", async function () {
    const productCode = 1;
    const newName = "Updated Product";
    const newTag = "Updated Tag";

    await productTracker.modifyProduct(productCode, newName, newTag);

    const product = await productTracker.getProduct(productCode);

    expect(product.productName).to.equal(newName, "Product name should be updated");
    expect(product.tag).to.equal(newTag, "Tag should be updated");
  })

  it("should remove a product", async function () {
    const productCode = 1;

    await productTracker.removeProduct(productCode);

    try {
      await productTracker.getProduct(productCode);
      expect.fail("Product should have been removed");
    } catch (error) {
      expect(error.message).to.include("Product with this code does not exist", "Error message should indicate the product doesn't exist");
    }
  })

  it("should prevent a non-owner from adding a product", async function () {
    const nonOwner = await ethers.getSigner(); 
  
    const productName = "Product 2";
    const productCode = 2;
    const tag = "Tag 2";
  
    try {
      await productTracker.connect(nonOwner).addProduct(productName, productCode, tag);
      expect.fail("A non-owner should not be able to add a product");
    } catch (error) {
      expect(error.message).to.include("Only the owner can perform this action", "Error message should indicate non-owner access");
    }
  });
  
  it("should prevent a non-owner from modifying a product", async function () {
    const nonOwner = await ethers.getSigner(); 
    const productCode = 1;
    const newName = "Unauthorized Change";
    const newTag = "Unauthorized Tag";
  
    try {
      await productTracker.connect(nonOwner).modifyProduct(productCode, newName, newTag);
      expect.fail("A non-owner should not be able to modify a product");
    } catch (error) {
      expect(error.message).to.include("Only the owner can perform this action", "Error message should indicate non-owner access");
    }
  });
  
})
