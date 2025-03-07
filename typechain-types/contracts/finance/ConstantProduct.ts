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

export interface ConstantProductInterface extends utils.Interface {
  functions: {
    "addLiquidity(uint256,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeLiquidity(uint256)": FunctionFragment;
    "reserveA()": FunctionFragment;
    "reserveB()": FunctionFragment;
    "swap(address,uint256)": FunctionFragment;
    "tokenA()": FunctionFragment;
    "tokenB()": FunctionFragment;
    "totalSupply()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addLiquidity"
      | "balanceOf"
      | "owner"
      | "removeLiquidity"
      | "reserveA"
      | "reserveB"
      | "swap"
      | "tokenA"
      | "tokenB"
      | "totalSupply"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeLiquidity",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "reserveA", values?: undefined): string;
  encodeFunctionData(functionFragment: "reserveB", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "tokenA", values?: undefined): string;
  encodeFunctionData(functionFragment: "tokenB", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reserveA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reserveB", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenB", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;

  events: {
    "AddedLiquidity(address,uint256)": EventFragment;
    "RemovedLiquidity(address,uint256)": EventFragment;
    "Swapped(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddedLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemovedLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swapped"): EventFragment;
}

export interface AddedLiquidityEventObject {
  to: string;
  shares: BigNumber;
}
export type AddedLiquidityEvent = TypedEvent<
  [string, BigNumber],
  AddedLiquidityEventObject
>;

export type AddedLiquidityEventFilter = TypedEventFilter<AddedLiquidityEvent>;

export interface RemovedLiquidityEventObject {
  from: string;
  shares: BigNumber;
}
export type RemovedLiquidityEvent = TypedEvent<
  [string, BigNumber],
  RemovedLiquidityEventObject
>;

export type RemovedLiquidityEventFilter =
  TypedEventFilter<RemovedLiquidityEvent>;

export interface SwappedEventObject {
  from: string;
  to: string;
  amountReceived: BigNumber;
  amountReturned: BigNumber;
}
export type SwappedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  SwappedEventObject
>;

export type SwappedEventFilter = TypedEventFilter<SwappedEvent>;

export interface ConstantProduct extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ConstantProductInterface;

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
    addLiquidity(
      _amountA: PromiseOrValue<BigNumberish>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeLiquidity(
      _shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    reserveA(overrides?: CallOverrides): Promise<[BigNumber]>;

    reserveB(overrides?: CallOverrides): Promise<[BigNumber]>;

    swap(
      _tokenReceived: PromiseOrValue<string>,
      _amountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokenA(overrides?: CallOverrides): Promise<[string]>;

    tokenB(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  addLiquidity(
    _amountA: PromiseOrValue<BigNumberish>,
    _amountB: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeLiquidity(
    _shares: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  reserveA(overrides?: CallOverrides): Promise<BigNumber>;

  reserveB(overrides?: CallOverrides): Promise<BigNumber>;

  swap(
    _tokenReceived: PromiseOrValue<string>,
    _amountReceived: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokenA(overrides?: CallOverrides): Promise<string>;

  tokenB(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    addLiquidity(
      _amountA: PromiseOrValue<BigNumberish>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeLiquidity(
      _shares: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    reserveA(overrides?: CallOverrides): Promise<BigNumber>;

    reserveB(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      _tokenReceived: PromiseOrValue<string>,
      _amountReceived: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenA(overrides?: CallOverrides): Promise<string>;

    tokenB(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "AddedLiquidity(address,uint256)"(
      to?: PromiseOrValue<string> | null,
      shares?: null
    ): AddedLiquidityEventFilter;
    AddedLiquidity(
      to?: PromiseOrValue<string> | null,
      shares?: null
    ): AddedLiquidityEventFilter;

    "RemovedLiquidity(address,uint256)"(
      from?: PromiseOrValue<string> | null,
      shares?: null
    ): RemovedLiquidityEventFilter;
    RemovedLiquidity(
      from?: PromiseOrValue<string> | null,
      shares?: null
    ): RemovedLiquidityEventFilter;

    "Swapped(address,address,uint256,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amountReceived?: null,
      amountReturned?: null
    ): SwappedEventFilter;
    Swapped(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amountReceived?: null,
      amountReturned?: null
    ): SwappedEventFilter;
  };

  estimateGas: {
    addLiquidity(
      _amountA: PromiseOrValue<BigNumberish>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeLiquidity(
      _shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    reserveA(overrides?: CallOverrides): Promise<BigNumber>;

    reserveB(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      _tokenReceived: PromiseOrValue<string>,
      _amountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokenA(overrides?: CallOverrides): Promise<BigNumber>;

    tokenB(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addLiquidity(
      _amountA: PromiseOrValue<BigNumberish>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeLiquidity(
      _shares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    reserveA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reserveB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      _tokenReceived: PromiseOrValue<string>,
      _amountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokenA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
