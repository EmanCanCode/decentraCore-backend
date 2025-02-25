import { ethers } from 'hardhat';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, Wallet } from 'ethers';
import * as chainConfig from './config.json';
import dotenv from 'dotenv';
dotenv.config();


export class Blockchain {
    private providerUrl: string;
    private provider: JsonRpcProvider;
    private faucet: Wallet;
    private escrowManager: Wallet;
    private deployer: Wallet;
    private seeders: [Wallet, Wallet, Wallet];

    constructor() {
        if (!process.env.PROVIDER_URL) {
            throw new Error('PROVIDER_URL is not set');  // same as one in blockchain section of DecentraCore
        } else if (!process.env.FAUCET_PRIVATE_KEY) {  
            throw new Error('FAUCET_PRIVATE_KEY is not set');
        } else if (!process.env.ESCROW_MANAGER_PRIVATE_KEY) {  // handles all escrow related transactions
            throw new Error('ESCROW_MANAGER_PRIVATE_KEY is not set');
        } else if (!process.env.DEPLOYER_PRIVATE_KEY) {  // same deployer in blockchain deploy scripts in DecentraCore
            throw new Error('DEPLOYER_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER1_PRIVATE_KEY) {  // same seeder1 in blockchain seed scripts in DecentraCore
            throw new Error('SEEDER1_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER2_PRIVATE_KEY) { // same seeder2 in blockchain seed scripts in DecentraCore
            throw new Error('SEEDER2_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER3_PRIVATE_KEY) { // same seeder3 in blockchain seed scripts in DecentraCore
            throw new Error('SEEDER3_PRIVATE_KEY is not set');
        } 


        // set provider url
        this.providerUrl = process.env.PROVIDER_URL;
        // set provider
        this.provider = new ethers.providers.JsonRpcProvider(this.providerUrl);
        // set faucet
        this.faucet = new Wallet(process.env.FAUCET_PRIVATE_KEY, this.provider);
        // set escrow manager
        this.escrowManager = new Wallet(process.env.ESCROW_MANAGER_PRIVATE_KEY, this.provider);
        // set deployer
        this.deployer = new Wallet(process.env.DEPLOYER_PRIVATE_KEY, this.provider);
        // set seeders
        this.seeders = [
            new Wallet(process.env.SEEDER1_PRIVATE_KEY, this.provider),
            new Wallet(process.env.SEEDER2_PRIVATE_KEY, this.provider),
            new Wallet(process.env.SEEDER3_PRIVATE_KEY, this.provider)
        ];
    }

    async requestFaucet(address: string) {
        try {
            // get minimum ether amount
            const minimumEtherAmount = ethers.utils.parseEther('5'); // 5 ether
            let requesterBalance = await this.provider.getBalance(address);
            let tx: TransactionResponse;
            // if requester balance is less than minimum amount
            if (requesterBalance.lt(minimumEtherAmount)) {
                // send the difference between the requester balance and the minimum amount to get them to the minimum amount
                const difference = minimumEtherAmount.sub(requesterBalance);
                let tx = await this.faucet.sendTransaction({
                    to: address,
                    value: difference
                });
                await tx.wait(); // wait for transaction to be mined
                console.log(`Faucet: Sent ${ethers.utils.formatEther(difference)} ether to ${address}`);
            }
    
            const minimumTokenAmount = ethers.utils.parseEther('1000000'); // 1 million tokens
            // create token contract instance 1
            let tokenContract = await ethers.getContractAt("FungibleToken", chainConfig.finance['Eman Token 1'], this.deployer);
            // get requester balance
            requesterBalance = await tokenContract.balanceOf(address);
            if (requesterBalance.lt(minimumTokenAmount)) {
                // send the difference between the requester balance and the minimum amount to get them to the minimum amount
                const difference = minimumTokenAmount.sub(requesterBalance);
                tx = await tokenContract.connect(this.deployer).transfer(address, difference);
                await tx.wait();
                console.log(`Faucet: Sent ${ethers.utils.formatEther(difference)} tokens 1 to ${address}`);
            }
    
            // create token contract instance 2
            tokenContract = await ethers.getContractAt("FungibleToken", chainConfig.finance['Eman Token 2'], this.deployer);
            // get requester balance
            requesterBalance = await tokenContract.balanceOf(address);
            if (requesterBalance.lt(minimumTokenAmount)) {
                // send the difference between the requester balance and the minimum amount to get them to the minimum amount
                const difference = minimumTokenAmount.sub(requesterBalance);
                tx = await tokenContract.connect(this.deployer).transfer(address, difference);
                await tx.wait();
                console.log(`Faucet: Sent ${ethers.utils.formatEther(difference)} tokens 2 to ${address}`);
            }
        
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // create signatures for escrow factory
    async createEscrowFactorySignatures(
        buyer: string, // buyer address
        seller: string, // .env.SEEDER 1, 2 or 3 PUBLIC_KEY
        nftId: number, // nft id
        purchasePrice: BigNumber, // purchase price
    ) {
        // ensure seller is one of the seeders
        if (seller !== this.seeders[0].address && seller !== this.seeders[1].address && seller !== this.seeders[2].address) {
            throw new Error('Seller must be one of the seeders');
        }
        try {
            // create escrow factory instance
            const escrowFactory = await ethers.getContractAt(
                "EscrowFactory", 
                chainConfig.realEstate['escrowFactoryAddress'], 
                this.deployer
            );

            // get nonce
            const nonce = await escrowFactory.nonce(buyer, seller);

            // create message to sign
            let messageDigest = ethers.utils.solidityPack(
                [
                    'address', // nft address
                    'uint256', // nft id
                    'uint8', // nft count
                    'uint256', // purchase price
                    'uint256', // earnest amount
                    'address', // seller
                    'address', // buyer
                    'address', // inspector
                    'address', // lender
                    'address', // appraiser
                    'uint256' // nonce
                ],
                [
                    chainConfig.realEstate['realEstateAddress'], // nft address
                    nftId, // nft id
                    1, // nft count
                    purchasePrice, // purchase price
                    purchasePrice.div(100), // earnest amount (1% of purchase price)
                    seller, // seller
                    buyer, // buyer
                    this.escrowManager.address, // inspector
                    this.escrowManager.address, // lender
                    this.escrowManager.address, // appraiser
                    nonce.add(1) // nonce that is signed (nonce + 1)
                ]
            );
            messageDigest = ethers.utils.solidityKeccak256(['bytes'], [messageDigest]);
            // buyer signs on the web app
            // have seller sign here
            const _seller = this.seeders.find(seeder => seeder.address === seller);
            const sellerSignature = await _seller!.signMessage(ethers.utils.arrayify(messageDigest));
            // have lender sign here
            const lenderSignature = await this.escrowManager.signMessage(ethers.utils.arrayify(messageDigest));

            return { sellerSignature, lenderSignature };

        } catch(error) {
            console.error(error);
            return { sellerSignature: '', lenderSignature: '' };
        }
    }

    // complete escrow 
    async completeEscrow(
        escrowAddress: string, // escrow address
    ) {
        // get escrow instance
        const escrow = await ethers.getContractAt("Escrow", escrowAddress, this.deployer);
        // ensure that buyer had deposited earnest amount, essentially the first approval in the escrow
        const buyerDeposit = await escrow.deposit_balance(await escrow.buyer());
        if (buyerDeposit.eq(0)) {
            throw new Error('Buyer has not deposited earnest amount');
        }

        // ensure the state is in Created state
        if (await escrow.state() !== 0) {
            throw new Error("Escrow is not in 'Created' state");
        }

        // have seller, inspector, lender and appraiser call approveSale()
        const sellerAddress = await escrow.seller();
        const seller = this.seeders.find(seeder => seeder.address === sellerAddress)!;
        await escrow.connect(seller).approveSale();
        // inspector, lender and appraiser are the same
        await escrow.connect(this.escrowManager).approveSale();
        // activate sale
        await escrow.connect(this.escrowManager).activateSale();
        // have lender deposit loan
        const loanAmount = await (async () => {
            const purchasePrice = await escrow.purchase_price();
            return purchasePrice.sub(buyerDeposit);
        })();
        await escrow.connect(this.escrowManager).deposit({ value: loanAmount });
        // finalize sale
        const tx = await escrow.connect(this.escrowManager).finalizeSale();
        await tx.wait();

        // add id in finance contract
        await this.addIdInFinance(
            await escrow.buyer(),
            (await escrow.nft_id()).toNumber()
        );

        return true;
    }

    // this gets called when escrow is completed
    async addIdInFinance(
        buyer: string, // financer
        id: number, // nft id
    ) {
        // create real estate finance contract instance
        const finance = await ethers.getContractAt(
            'Finance',
            chainConfig.realEstate['finance'],
            this.deployer
        );
        // add id as owner (deployer)
        await finance.connect(this.deployer).setIdInFinance(
            buyer,
            id
        );
    }

    // what i used to test 👆🏾. i ran npx hardhat node and deployed and listened to the contracts in blockchain part of DecentraCore
    // async testRealEstateFns() {
    //     const wait = async (seconds: number) => {
    //         return new Promise((resolve) => {
    //             console.log("Waiting for " + seconds + " seconds...");
    //             setTimeout(resolve, seconds * 1000);
    //         });
    //     }



    //     // create buyer
    //     const buyer = new Wallet('0x45cfa5545a6859f2bd532e09ad58f11c98953361e935621d02f88570d13aa0aa', this.provider);
    //     // send buyer some ether
    //     await this.requestFaucet(buyer.address); // sneaky way to get some ether
    //     // lets create the parameters
    //     const params = {
    //         nft_address: chainConfig.realEstate['realEstateAddress'],
    //         nft_id: 1, // seeder 1 owns this nft
    //         nft_count: 1,
    //         purchase_price: ethers.utils.parseEther('2'), // 2 ether
    //         earnest_amount: ethers.utils.parseEther('0.02'), // 0.02 ether (1% of purchase price)
    //         seller: this.seeders[0].address,
    //         buyer: buyer.address,
    //         inspector: this.escrowManager.address,
    //         lender: this.escrowManager.address,
    //         appraiser: this.escrowManager.address
    //     }
    //     // have buyer sign the message (nonce will be 1)
    //     const nonce = 1;
    //     let messageDigest = ethers.utils.solidityPack(
    //         [
    //             'address', // nft address
    //             'uint256', // nft id
    //             'uint8', // nft count
    //             'uint256', // purchase price
    //             'uint256', // earnest amount
    //             'address', // seller
    //             'address', // buyer
    //             'address', // inspector
    //             'address', // lender
    //             'address', // appraiser
    //             'uint256' // nonce
    //         ],
    //         [
    //             params.nft_address, // nft address
    //             params.nft_id, // nft id
    //             params.nft_count, // nft count
    //             params.purchase_price, // purchase price
    //             params.earnest_amount, // earnest amount
    //             params.seller, // seller
    //             params.buyer, // buyer
    //             params.inspector, // inspector
    //             params.lender, // lender
    //             params.appraiser, // appraiser
    //             nonce // nonce
    //         ]
    //     );
    //     messageDigest = ethers.utils.solidityKeccak256(['bytes'], [messageDigest]);
    //     const buyerSignature = await buyer.signMessage(
    //         ethers.utils.arrayify(messageDigest)
    //     );
    //     // TEST get seller and lender signatures
    //     const { 
    //         sellerSignature, 
    //         lenderSignature 
    //     } = await this.createEscrowFactorySignatures(
    //         params.buyer,
    //         params.seller,
    //         params.nft_id,
    //         params.purchase_price
    //     );
    //     // create escrow factory instance
    //     const escrowFactory = await ethers.getContractAt(
    //         "EscrowFactory",
    //         chainConfig.realEstate['escrowFactoryAddress'],
    //         this.deployer
    //     );

    //     // have lending manager verify escrow data (doesnt matter who does it)
    //     let tx = await escrowFactory.connect(this.escrowManager).verifyEscrowData(
    //         params,
    //         sellerSignature,
    //         buyerSignature,
    //         lenderSignature
    //     );
    //     // wait for transaction to be mined
    //     let receipt = await tx.wait();
    //     // log if it was successful
    //     console.table({
    //         "Escrow data verified": receipt.status === 1,
    //     });
    //     // create escrow id
    //     const escrowId = await escrowFactory._computeEscrowId(
    //         params,
    //         1
    //     );
    //     // create escrow from verified data (buyer on front end will call but doesnt matter who does it)
    //     tx = await escrowFactory.connect(buyer).createEscrowFromVerified(
    //         params,
    //         escrowId
    //     );
    //     // wait for transaction to be mined
    //     receipt = await tx.wait();
    //     // log if it was successful
    //     console.table({
    //         "Escrow created from verified": receipt.status === 1,
    //     });
    //     // wait 2 seconds, the listener should add finance contract to the newly created escrow
    //     await wait(2);
    //     const escrowContract = await ethers.getContractAt(
    //         'Escrow',
    //         await escrowFactory.escrows(escrowId),
    //         this.deployer
    //     );
    //     // see if the listener added the finance contract to the escrow
    //     console.table({
    //         "Finance contract set": (await escrowContract.finance_contract()).toLowerCase() == chainConfig.realEstate['finance'].toLowerCase(),
    //     });
    //     // buyer deposits earnest amount
    //     tx = await escrowContract.connect(buyer).depositEarnest({ value: params.earnest_amount });
    //     receipt = await tx.wait();
    //     // log if it was successful
    //     console.table({
    //         "Buyer deposited earnest": receipt.status === 1,
    //     });
    //     // TEST finalize escrow 
    //     await this.completeEscrow(escrowContract.address);
    //     // see if the finance contract owns the nft now
    //     const realEstate = await ethers.getContractAt( // erc1155 contract
    //         'RealEstate',
    //         chainConfig.realEstate['realEstateAddress'],
    //         this.deployer
    //     );

    //     console.table({
    //         "Finance contract owns nft": (await realEstate.balanceOf(chainConfig.realEstate['finance'], params.nft_id)).eq(1),
    //     });

    //     const finance = await ethers.getContractAt(
    //         'Finance',
    //         chainConfig.realEstate['finance'],
    //         this.deployer
    //     );

    //     console.table({
    //         "Buyers nft id set in finance": (await finance.idInFinance(buyer.address)).eq(params.nft_id),
    //     });
    //     // buyer can now claim the nft
    //     tx = await finance.connect(buyer).payOff(
    //         buyer.address,
    //         params.nft_id
    //     );
    //     receipt = await tx.wait();
    //     console.table({
    //         "Buyer owns nft": (await realEstate.balanceOf(buyer.address, params.nft_id)).eq(1),
    //     });

    //     console.table({
    //         'escrow state completed': await escrowContract.state() == 2
    //     });

    //     console.log("----- TEST COMPLETE -----")
    // }
}


const blockchain = new Blockchain();
export default blockchain;