/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OrderBook,
  OrderBookInterface,
} from "../../../contracts/finance/OrderBook";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGet",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGive",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Cancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGet",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGive",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Order",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGet",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenGive",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountGive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userFill",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Trade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeAccount",
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
    name: "feePercent",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "fillOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenGet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountGet",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenGive",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountGive",
        type: "uint256",
      },
    ],
    name: "makeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderCancelled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orderCount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderFilled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenGet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountGet",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenGive",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountGive",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokens",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516113bd3803806113bd83398101604081905261002f91610058565b600080546001600160a01b0319166001600160a01b039390931692909217909155600155610092565b6000806040838503121561006b57600080fd5b82516001600160a01b038116811461008257600080fd5b6020939093015192949293505050565b61131c806100a16000396000f3fe6080604052600436106100ec5760003560e01c806367b830ad1161008a5780639e281a98116100595780639e281a981461032c578063a85c38ef1461034c578063e9c18966146103c6578063f7888aec146103f65761013e565b806367b830ad146102ce5780637fd6f15c146102ee57806398ea5fca146103045780639a5c90aa1461030c5761013e565b80634a93e0da116100c65780634a93e0da146101fe578063508493bc1461023e578063514fcac71461027657806365e17c9d146102965761013e565b80632453ffa814610193578063338b5dea146101bc5780633bed33ce146101de5761013e565b3661013e5760405162461bcd60e51b815260206004820152601b60248201527f446972656374206465706f73697473206e6f7420616c6c6f776564000000000060448201526064015b60405180910390fd5b34801561014a57600080fd5b5060405162461bcd60e51b815260206004820152601c60248201527f46616c6c6261636b2066756e6374696f6e3a20526576657274696e67000000006044820152606401610135565b34801561019f57600080fd5b506101a960045481565b6040519081526020015b60405180910390f35b3480156101c857600080fd5b506101dc6101d73660046110ee565b610416565b005b3480156101ea57600080fd5b506101dc6101f9366004611118565b6105b6565b34801561020a57600080fd5b5061022e610219366004611118565b60066020526000908152604090205460ff1681565b60405190151581526020016101b3565b34801561024a57600080fd5b506101a9610259366004611131565b600260209081526000928352604080842090915290825290205481565b34801561028257600080fd5b506101dc610291366004611118565b6106d4565b3480156102a257600080fd5b506000546102b6906001600160a01b031681565b6040516001600160a01b0390911681526020016101b3565b3480156102da57600080fd5b506101dc6102e9366004611118565b610896565b3480156102fa57600080fd5b506101a960015481565b6101dc6109fd565b34801561031857600080fd5b506101dc610327366004611164565b610a89565b34801561033857600080fd5b506101dc6103473660046110ee565b610b9e565b34801561035857600080fd5b506103b3610367366004611118565b6003602081905260009182526040909120805460018201546002830154938301546004840154600585015460069095015493956001600160a01b03938416959084169492939091169187565b6040516101b397969594939291906111a8565b3480156103d257600080fd5b5061022e6103e1366004611118565b60056020526000908152604090205460ff1681565b34801561040257600080fd5b506101a9610411366004611131565b610da5565b6001600160a01b0382166104645760405162461bcd60e51b8152602060048201526015602482015274496e76616c696420746f6b656e206164647265737360581b6044820152606401610135565b6040516323b872dd60e01b8152336004820152306024820152604481018290526001600160a01b038316906323b872dd906064016020604051808303816000875af11580156104b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104db91906111e6565b6105195760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b6044820152606401610135565b6001600160a01b03821660009081526002602090815260408083203384529091528120805483929061054c908490611225565b90915550506001600160a01b0382166000908152600260209081526040808320338085529252918290205491517fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7926105aa92869290918691611238565b60405180910390a15050565b3360009081526000805160206112c783398151915260205260409020548111156106195760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606401610135565b3360009081526000805160206112c7833981519152602052604081208054839290610645908490611261565b9091555050604051339082156108fc029083906000818181858888f19350505050158015610677573d6000803e3d6000fd5b503360008181526000805160206112c783398151915260205260408082205490517ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb567936106c993929091869190611238565b60405180910390a150565b600081815260036020818152604092839020835160e0810185528154815260018201546001600160a01b03908116938201849052600283015481169582019590955292810154606084015260048101549093166080830152600583015460a083015260069092015460c08201529033146107815760405162461bcd60e51b815260206004820152600e60248201526d2737ba103cb7bab91037b93232b960911b6044820152606401610135565b60008281526006602052604090205460ff16156107d75760405162461bcd60e51b815260206004820152601460248201527313dc99195c88185b1c9958591e48199a5b1b195960621b6044820152606401610135565b60008281526005602052604090205460ff16156108305760405162461bcd60e51b815260206004820152601760248201527613dc99195c88185b1c9958591e4818d85b98d95b1b1959604a1b6044820152606401610135565b60008281526005602052604090819020805460ff19166001179055818101516060830151608084015160a085015193517f77de1da0be5f2d3b110d05c6694e5c4ff2d9da7cd23d84353ecf78c7b5acec61946105aa9488943394919390929042906111a8565b6000811180156108a857506004548111155b6108e75760405162461bcd60e51b815260206004820152601060248201526f125b9d985b1a59081bdc99195c881a5960821b6044820152606401610135565b60008181526005602052604090205460ff16156109405760405162461bcd60e51b815260206004820152601760248201527613dc99195c88185b1c9958591e4818d85b98d95b1b1959604a1b6044820152606401610135565b60008181526006602052604090205460ff16156109965760405162461bcd60e51b815260206004820152601460248201527313dc99195c88185b1c9958591e48199a5b1b195960621b6044820152606401610135565b6000818152600360208190526040909120805460018201546002830154938301546004840154600585015494956109e1956001600160a01b0394851694918216939290911690610dd2565b506000908152600660205260409020805460ff19166001179055565b3360009081526000805160206112c7833981519152602052604081208054349290610a29908490611225565b90915550503360008181526000805160206112c783398151915260205260408082205490517fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d793610a7f93929091349190611238565b60405180910390a1565b60048054906000610a9983611274565b90915550506040805160e081018252600480548083523360208085018281526001600160a01b038b8116878901908152606088018c81528b831660808a0190815260a08a018c81524260c08c0181815260009a8b52600398899052998d90209b518c55955160018c0180549187166001600160a01b0319928316179055935160028c0180549187169186169190911790559151958a019590955593518888018054919093169116179055905160058601559151600690940193909355905492517f9d33853d43e3607b4cc01fdc78338ff2dca6fef7db9232dae6d3eb55fbc3b10993610b90939092909189918991899189916111a8565b60405180910390a150505050565b6001600160a01b038216610bec5760405162461bcd60e51b8152602060048201526015602482015274496e76616c696420746f6b656e206164647265737360581b6044820152606401610135565b6001600160a01b0382166000908152600260209081526040808320338452909152902054811115610c5f5760405162461bcd60e51b815260206004820152601a60248201527f496e73756666696369656e7420746f6b656e2062616c616e63650000000000006044820152606401610135565b6001600160a01b038216600090815260026020908152604080832033845290915281208054839290610c92908490611261565b909155505060405163a9059cbb60e01b8152336004820152602481018290526001600160a01b0383169063a9059cbb906044016020604051808303816000875af1158015610ce4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0891906111e6565b610d4c5760405162461bcd60e51b8152602060048201526015602482015274151bdad95b881d1c985b9cd9995c8819985a5b1959605a1b6044820152606401610135565b6001600160a01b0382166000908152600260209081526040808320338085529252918290205491517ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb567926105aa92869290918691611238565b6001600160a01b038083166000908152600260209081526040808320938516835292905220545b92915050565b6000606460015485610de4919061128d565b610dee91906112a4565b9050610dfa8185611225565b6001600160a01b03861660009081526002602090815260408083203384529091529020541015610e925760405162461bcd60e51b815260206004820152603b60248201527f5472616465206661696c65643a20496e73756666696369656e742062616c616e60448201527f636520746f20636f76657220616d6f756e7420706c75732066656500000000006064820152608401610135565b6001600160a01b038084166000908152600260209081526040808320938a1683529290522054821115610f2d5760405162461bcd60e51b815260206004820152603860248201527f5472616465206661696c65643a204f72646572206d616b65722068617320696e60448201527f73756666696369656e7420746f6b656e2062616c616e636500000000000000006064820152608401610135565b610f378185611225565b6001600160a01b038616600090815260026020908152604080832033845290915281208054909190610f6a908490611261565b90915550506001600160a01b038086166000908152600260209081526040808320938a1683529290529081208054869290610fa6908490611225565b90915550506001600160a01b038086166000908152600260209081526040808320835490941683529290529081208054839290610fe4908490611225565b90915550506001600160a01b038084166000908152600260209081526040808320938a1683529290529081208054849290611020908490611261565b90915550506001600160a01b038316600090815260026020908152604080832033845290915281208054849290611058908490611225565b9091555050604080518881526001600160a01b03888116602083015287811682840152606082018790528516608082015260a081018490523360c08201524260e082015290517f0dddf4182dc0fc1a311cb75f049c97403c6b8a99cf6b2229a36e7c526acb3f81918190036101000190a150505050505050565b80356001600160a01b03811681146110e957600080fd5b919050565b6000806040838503121561110157600080fd5b61110a836110d2565b946020939093013593505050565b60006020828403121561112a57600080fd5b5035919050565b6000806040838503121561114457600080fd5b61114d836110d2565b915061115b602084016110d2565b90509250929050565b6000806000806080858703121561117a57600080fd5b611183856110d2565b935060208501359250611198604086016110d2565b9396929550929360600135925050565b9687526001600160a01b03958616602088015293851660408701526060860192909252909216608084015260a083019190915260c082015260e00190565b6000602082840312156111f857600080fd5b8151801515811461120857600080fd5b9392505050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610dcc57610dcc61120f565b6001600160a01b0394851681529290931660208301526040820152606081019190915260800190565b81810381811115610dcc57610dcc61120f565b6000600182016112865761128661120f565b5060010190565b8082028115828204841417610dcc57610dcc61120f565b6000826112c157634e487b7160e01b600052601260045260246000fd5b50049056feac33ff75c19e70fe83507db0d683fd3465c996598dc972688b7ace676c89077ba26469706673582212200b7526f283040d842574793c8853172a27d4502bcf9ce83574af3aa1fc1ee81064736f6c63430008180033";

type OrderBookConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrderBookConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrderBook__factory extends ContractFactory {
  constructor(...args: OrderBookConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _feeAccount: PromiseOrValue<string>,
    _feePercent: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OrderBook> {
    return super.deploy(
      _feeAccount,
      _feePercent,
      overrides || {}
    ) as Promise<OrderBook>;
  }
  override getDeployTransaction(
    _feeAccount: PromiseOrValue<string>,
    _feePercent: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _feeAccount,
      _feePercent,
      overrides || {}
    );
  }
  override attach(address: string): OrderBook {
    return super.attach(address) as OrderBook;
  }
  override connect(signer: Signer): OrderBook__factory {
    return super.connect(signer) as OrderBook__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderBookInterface {
    return new utils.Interface(_abi) as OrderBookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrderBook {
    return new Contract(address, _abi, signerOrProvider) as OrderBook;
  }
}
