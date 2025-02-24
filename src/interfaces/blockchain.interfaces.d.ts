import { BigNumber } from "ethers";

export interface EscrowParams {
    nft_address: string;
    nft_id: BigNumber;
    nft_count: BigNumber;
    purchase_price: BigNumber;
    earnest_amount: BigNumber;
    seller: string;
    buyer: string;
    inspector: string;
    lender: string;
    appraiser: string;
}