/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "IERC1155MetadataURI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURI__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ConstantProduct",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConstantProduct__factory>;
    getContractFactory(
      name: "ConstantSum",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConstantSum__factory>;
    getContractFactory(
      name: "FungibleToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FungibleToken__factory>;
    getContractFactory(
      name: "OrderBook",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrderBook__factory>;
    getContractFactory(
      name: "Escrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Escrow__factory>;
    getContractFactory(
      name: "EscrowFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EscrowFactory__factory>;
    getContractFactory(
      name: "Finance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Finance__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "RealEstate",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RealEstate__factory>;
    getContractFactory(
      name: "AutomatedProcess",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomatedProcess__factory>;
    getContractFactory(
      name: "IAutomatedProcess",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAutomatedProcess__factory>;
    getContractFactory(
      name: "IInventoryManagement",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IInventoryManagement__factory>;
    getContractFactory(
      name: "IProvenance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProvenance__factory>;
    getContractFactory(
      name: "InventoryManagement",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InventoryManagement__factory>;
    getContractFactory(
      name: "Provenance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Provenance__factory>;

    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "IERC1155MetadataURI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURI>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ConstantProduct",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConstantProduct>;
    getContractAt(
      name: "ConstantSum",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConstantSum>;
    getContractAt(
      name: "FungibleToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FungibleToken>;
    getContractAt(
      name: "OrderBook",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OrderBook>;
    getContractAt(
      name: "Escrow",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Escrow>;
    getContractAt(
      name: "EscrowFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EscrowFactory>;
    getContractAt(
      name: "Finance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Finance>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "RealEstate",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RealEstate>;
    getContractAt(
      name: "AutomatedProcess",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomatedProcess>;
    getContractAt(
      name: "IAutomatedProcess",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAutomatedProcess>;
    getContractAt(
      name: "IInventoryManagement",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IInventoryManagement>;
    getContractAt(
      name: "IProvenance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProvenance>;
    getContractAt(
      name: "InventoryManagement",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InventoryManagement>;
    getContractAt(
      name: "Provenance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Provenance>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
