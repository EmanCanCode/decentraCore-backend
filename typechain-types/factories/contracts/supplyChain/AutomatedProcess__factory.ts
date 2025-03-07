/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AutomatedProcess,
  AutomatedProcessInterface,
} from "../../../contracts/supplyChain/AutomatedProcess";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "actor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "ReleaseProcessValue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "inventoryManagement",
        type: "address",
      },
    ],
    name: "SetInventoryManagement",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "actor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "SetProcessValue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "provenance",
        type: "address",
      },
    ],
    name: "SetProvenance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum IInventoryManagement.MovementType",
        name: "movementType",
        type: "uint8",
      },
    ],
    name: "UpdatedStock",
    type: "event",
  },
  {
    inputs: [],
    name: "inventoryManagement",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "processValues",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "provenance",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_nonce",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_actor",
        type: "address",
      },
    ],
    name: "releaseProcessValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_inventoryManagement",
        type: "address",
      },
    ],
    name: "setInventoryManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_actor",
        type: "address",
      },
    ],
    name: "setProcessValue",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_provenance",
        type: "address",
      },
    ],
    name: "setProvenance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "enum IInventoryManagement.MovementType",
        name: "_movementType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "updateStock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610aff806100326000396000f3fe6080604052600436106100865760003560e01c80638da5cb5b116100595780638da5cb5b14610153578063d5c7f73c14610173578063deda649314610193578063ee1efe41146101b3578063ee466996146101d357600080fd5b80630f7309e81461008b57806356a9c692146100c85780635c73cc201461010e57806368be479614610130575b600080fd5b34801561009757600080fd5b506001546100ab906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100d457600080fd5b506101006100e33660046107b9565b600360209081526000928352604080842090915290825290205481565b6040519081526020016100bf565b34801561011a57600080fd5b5061012e6101293660046107e3565b6101f3565b005b61014361013e366004610805565b61027b565b60405190151581526020016100bf565b34801561015f57600080fd5b506000546100ab906001600160a01b031681565b34801561017f57600080fd5b5061012e61018e366004610831565b610361565b34801561019f57600080fd5b506002546100ab906001600160a01b031681565b3480156101bf57600080fd5b5061012e6101ce366004610909565b6105f7565b3480156101df57600080fd5b5061012e6101ee3660046107e3565b610725565b6000546001600160a01b031633146102265760405162461bcd60e51b815260040161021d90610997565b60405180910390fd5b600280546001600160a01b0319166001600160a01b0383169081179091556040519081527fe931614c495123670252e5901186da0c448d80ffb2e8830940a21440edac453e906020015b60405180910390a150565b6001546000906001600160a01b03166102cb5760405162461bcd60e51b8152602060048201526012602482015271141c9bdd995b985b98d9481b9bdd081cd95d60721b604482015260640161021d565b6001546001600160a01b031633146102f55760405162461bcd60e51b815260040161021d90610997565b6001600160a01b03821660008181526003602090815260408083208784528252918290203490819055825193845290830186905282820152517f62380dbc5c0f0015196580ea921080619606dcddf9174724b22dcfa07202ff739181900360600190a150600192915050565b6000546001600160a01b0316331461038b5760405162461bcd60e51b815260040161021d90610997565b6001546001600160a01b03166103d85760405162461bcd60e51b8152602060048201526012602482015271141c9bdd995b985b98d9481b9bdd081cd95d60721b604482015260640161021d565b6001600160a01b038116600090815260036020908152604080832063ffffffff861684529091529020546104445760405162461bcd60e51b81526020600482015260136024820152724e6f2076616c756520746f2072656c6561736560681b604482015260640161021d565b60015460408051606084901b6bffffffffffffffffffffffff1916602082015260e085901b6001600160e01b03191660348201528151601881830301815260388201928390526301455bc760e51b9092526001600160a01b03909216916328ab78e0916104b391603c01610a05565b602060405180830381865afa1580156104d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f49190610a18565b6105405760405162461bcd60e51b815260206004820152601e60248201527f50726f76656e616e6365207374617465206e6f7420436f6d706c657465640000604482015260640161021d565b6001600160a01b03818116600090815260036020908152604080832063ffffffff8716845290915280822080549083905582549151909391909116916108fc841502918491818181858888f193505050501580156105a2573d6000803e3d6000fd5b50604080516001600160a01b038416815263ffffffff851660208201529081018290527f3728f4429245b05899a64cb76b61df527d296ea50ff409702f1e4bbe2ed201819060600160405180910390a1505050565b6000546001600160a01b031633146106215760405162461bcd60e51b815260040161021d90610997565b6002546001600160a01b03166106795760405162461bcd60e51b815260206004820152601c60248201527f496e76656e746f7279206d616e6167656d656e74206e6f742073657400000000604482015260640161021d565b60025460405163ee1efe4160e01b81526001600160a01b039091169063ee1efe41906106b19088908890889088908890600401610a5c565b600060405180830381600087803b1580156106cb57600080fd5b505af11580156106df573d6000803e3d6000fd5b505050507f58cd716031db8dc83c09dde37d31339d04fe3227e0c6b7835e0d0fac0f6513b685858560405161071693929190610aa6565b60405180910390a15050505050565b6000546001600160a01b0316331461074f5760405162461bcd60e51b815260040161021d90610997565b600180546001600160a01b0319166001600160a01b0383169081179091556040519081527f276dfcbc3291d4f1658b4289dfeae19e8894b3755ff830dfb7fb33795490253c90602001610270565b80356001600160a01b03811681146107b457600080fd5b919050565b600080604083850312156107cc57600080fd5b6107d58361079d565b946020939093013593505050565b6000602082840312156107f557600080fd5b6107fe8261079d565b9392505050565b6000806040838503121561081857600080fd5b823591506108286020840161079d565b90509250929050565b6000806040838503121561084457600080fd5b823563ffffffff8116811461085857600080fd5b91506108286020840161079d565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261088d57600080fd5b813567ffffffffffffffff808211156108a8576108a8610866565b604051601f8301601f19908116603f011681019082821181831017156108d0576108d0610866565b816040528381528660208588010111156108e957600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080600060a0868803121561092157600080fd5b853594506020860135935060408601356004811061093e57600080fd5b9250606086013567ffffffffffffffff8082111561095b57600080fd5b61096789838a0161087c565b9350608088013591508082111561097d57600080fd5b5061098a8882890161087c565b9150509295509295909350565b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b6000815180845260005b818110156109e5576020818501810151868301820152016109c9565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006107fe60208301846109bf565b600060208284031215610a2a57600080fd5b815180151581146107fe57600080fd5b60048110610a5857634e487b7160e01b600052602160045260246000fd5b9052565b858152846020820152610a726040820185610a3a565b60a060608201526000610a8860a08301856109bf565b8281036080840152610a9a81856109bf565b98975050505050505050565b8381526020810183905260608101610ac16040830184610a3a565b94935050505056fea2646970667358221220da7151dff3a3798e3eb0fedb31be1e47f62c227ed80ef9c58ad328528ae4f2b964736f6c63430008180033";

type AutomatedProcessConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AutomatedProcessConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AutomatedProcess__factory extends ContractFactory {
  constructor(...args: AutomatedProcessConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AutomatedProcess> {
    return super.deploy(overrides || {}) as Promise<AutomatedProcess>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AutomatedProcess {
    return super.attach(address) as AutomatedProcess;
  }
  override connect(signer: Signer): AutomatedProcess__factory {
    return super.connect(signer) as AutomatedProcess__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AutomatedProcessInterface {
    return new utils.Interface(_abi) as AutomatedProcessInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AutomatedProcess {
    return new Contract(address, _abi, signerOrProvider) as AutomatedProcess;
  }
}
