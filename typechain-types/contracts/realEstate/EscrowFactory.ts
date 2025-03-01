/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace EscrowFactory {
  export type EscrowParamsStruct = {
    nft_address: PromiseOrValue<string>;
    nft_id: PromiseOrValue<BigNumberish>;
    nft_count: PromiseOrValue<BigNumberish>;
    purchase_price: PromiseOrValue<BigNumberish>;
    earnest_amount: PromiseOrValue<BigNumberish>;
    seller: PromiseOrValue<string>;
    buyer: PromiseOrValue<string>;
    inspector: PromiseOrValue<string>;
    lender: PromiseOrValue<string>;
    appraiser: PromiseOrValue<string>;
  };

  export type EscrowParamsStructOutput = [
    string,
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    string,
    string
  ] & {
    nft_address: string;
    nft_id: BigNumber;
    nft_count: number;
    purchase_price: BigNumber;
    earnest_amount: BigNumber;
    seller: string;
    buyer: string;
    inspector: string;
    lender: string;
    appraiser: string;
  };
}

export interface EscrowFactoryInterface extends utils.Interface {
  functions: {
    "_computeEscrowId((address,uint256,uint8,uint256,uint256,address,address,address,address,address),uint256)": FunctionFragment;
    "createEscrowFromVerified((address,uint256,uint8,uint256,uint256,address,address,address,address,address),bytes32)": FunctionFragment;
    "escrows(bytes32)": FunctionFragment;
    "nonce(address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "verifiedEscrowIds(bytes32)": FunctionFragment;
    "verifyEscrowData((address,uint256,uint8,uint256,uint256,address,address,address,address,address),bytes,bytes,bytes)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_computeEscrowId"
      | "createEscrowFromVerified"
      | "escrows"
      | "nonce"
      | "owner"
      | "verifiedEscrowIds"
      | "verifyEscrowData"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_computeEscrowId",
    values: [EscrowFactory.EscrowParamsStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createEscrowFromVerified",
    values: [EscrowFactory.EscrowParamsStruct, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "escrows",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "nonce",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "verifiedEscrowIds",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyEscrowData",
    values: [
      EscrowFactory.EscrowParamsStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "_computeEscrowId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEscrowFromVerified",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "escrows", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifiedEscrowIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyEscrowData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "EscrowCreated(address,bytes32,address,address,uint256)": EventFragment;
    "EscrowVerified(bytes32,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EscrowCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EscrowVerified"): EventFragment;
}

export interface EscrowCreatedEventObject {
  escrow: string;
  escrowId: string;
  buyer: string;
  seller: string;
  nonce: BigNumber;
}
export type EscrowCreatedEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  EscrowCreatedEventObject
>;

export type EscrowCreatedEventFilter = TypedEventFilter<EscrowCreatedEvent>;

export interface EscrowVerifiedEventObject {
  escrowId: string;
  buyer: string;
  seller: string;
  nonce: BigNumber;
}
export type EscrowVerifiedEvent = TypedEvent<
  [string, string, string, BigNumber],
  EscrowVerifiedEventObject
>;

export type EscrowVerifiedEventFilter = TypedEventFilter<EscrowVerifiedEvent>;

export interface EscrowFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EscrowFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _computeEscrowId(
      _params: EscrowFactory.EscrowParamsStruct,
      _currentNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    createEscrowFromVerified(
      _params: EscrowFactory.EscrowParamsStruct,
      _escrowId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    escrows(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    nonce(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    verifiedEscrowIds(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    verifyEscrowData(
      _params: EscrowFactory.EscrowParamsStruct,
      _seller_sig: PromiseOrValue<BytesLike>,
      _buyer_sig: PromiseOrValue<BytesLike>,
      _lender_sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  _computeEscrowId(
    _params: EscrowFactory.EscrowParamsStruct,
    _currentNonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  createEscrowFromVerified(
    _params: EscrowFactory.EscrowParamsStruct,
    _escrowId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  escrows(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  nonce(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  verifiedEscrowIds(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  verifyEscrowData(
    _params: EscrowFactory.EscrowParamsStruct,
    _seller_sig: PromiseOrValue<BytesLike>,
    _buyer_sig: PromiseOrValue<BytesLike>,
    _lender_sig: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _computeEscrowId(
      _params: EscrowFactory.EscrowParamsStruct,
      _currentNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    createEscrowFromVerified(
      _params: EscrowFactory.EscrowParamsStruct,
      _escrowId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    escrows(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    nonce(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    verifiedEscrowIds(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    verifyEscrowData(
      _params: EscrowFactory.EscrowParamsStruct,
      _seller_sig: PromiseOrValue<BytesLike>,
      _buyer_sig: PromiseOrValue<BytesLike>,
      _lender_sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "EscrowCreated(address,bytes32,address,address,uint256)"(
      escrow?: PromiseOrValue<string> | null,
      escrowId?: null,
      buyer?: null,
      seller?: null,
      nonce?: null
    ): EscrowCreatedEventFilter;
    EscrowCreated(
      escrow?: PromiseOrValue<string> | null,
      escrowId?: null,
      buyer?: null,
      seller?: null,
      nonce?: null
    ): EscrowCreatedEventFilter;

    "EscrowVerified(bytes32,address,address,uint256)"(
      escrowId?: null,
      buyer?: null,
      seller?: null,
      nonce?: null
    ): EscrowVerifiedEventFilter;
    EscrowVerified(
      escrowId?: null,
      buyer?: null,
      seller?: null,
      nonce?: null
    ): EscrowVerifiedEventFilter;
  };

  estimateGas: {
    _computeEscrowId(
      _params: EscrowFactory.EscrowParamsStruct,
      _currentNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createEscrowFromVerified(
      _params: EscrowFactory.EscrowParamsStruct,
      _escrowId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    escrows(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nonce(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    verifiedEscrowIds(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyEscrowData(
      _params: EscrowFactory.EscrowParamsStruct,
      _seller_sig: PromiseOrValue<BytesLike>,
      _buyer_sig: PromiseOrValue<BytesLike>,
      _lender_sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _computeEscrowId(
      _params: EscrowFactory.EscrowParamsStruct,
      _currentNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createEscrowFromVerified(
      _params: EscrowFactory.EscrowParamsStruct,
      _escrowId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    escrows(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nonce(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifiedEscrowIds(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyEscrowData(
      _params: EscrowFactory.EscrowParamsStruct,
      _seller_sig: PromiseOrValue<BytesLike>,
      _buyer_sig: PromiseOrValue<BytesLike>,
      _lender_sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
