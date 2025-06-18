// import { ethers } from 'hardhat';
import { ethers } from 'ethers';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, Wallet } from 'ethers';
import * as chainConfig from './config.json';
import dotenv from 'dotenv';
import { Escrow__factory, EscrowFactory__factory, Finance__factory, FungibleToken__factory } from '../../typechain-types';
import mongo from '../config/mongo';
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
            // let tokenContract = await ethers.getContractAt("FungibleToken", chainConfig.finance['Eman Token 1'], this.deployer);
            let tokenContract = FungibleToken__factory.connect(chainConfig.finance['Eman Token 1'], this.deployer);
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
            // tokenContract = await ethers.getContractAt("FungibleToken", chainConfig.finance['Eman Token 2'], this.deployer);
            tokenContract = FungibleToken__factory.connect(chainConfig.finance['Eman Token 2'], this.deployer);
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
            // const escrowFactory = await ethers.getContractAt(
            //     "EscrowFactory", 
            //     chainConfig.realEstate['escrowFactoryAddress'], 
            //     this.deployer
            // );
            const escrowFactory = EscrowFactory__factory.connect(chainConfig.realEstate['escrowFactoryAddress'], this.deployer);
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
        // const escrow = await ethers.getContractAt("Escrow", escrowAddress, this.deployer);
        const escrow = Escrow__factory.connect(escrowAddress, this.deployer);
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
        let tx = await escrow.connect(seller).approveSale();
        await tx.wait();
        // inspector, lender and appraiser are the same
        tx = await escrow.connect(this.escrowManager).approveSale();
        await tx.wait();
        // activate sale
        tx = await escrow.connect(this.escrowManager).activateSale();
        await tx.wait();
        // have lender deposit loan
        const loanAmount = await (async () => {
            const purchasePrice = await escrow.purchase_price();
            return purchasePrice.sub(buyerDeposit);
        })();
        tx = await escrow.connect(this.escrowManager).deposit({ value: loanAmount });
        await tx.wait();
        // finalize sale
        tx = await escrow.connect(this.escrowManager).finalizeSale();
        await tx.wait();

        // add id in finance contract
        await this.addIdInFinance(
            await escrow.buyer(),
            (await escrow.nft_id()).toNumber()
        );

        let deletedDoc = true;
        await mongo.deleteRealEstateDoc(await escrow.buyer()).catch(err => {
            console.error(err);
            deletedDoc = false;
        });

        if (!deletedDoc) {
            console.log('Failed to delete document');
            // throw new Error('Failed to delete document');
        }

        return true;
    }

    // this gets called when escrow is completed
    async addIdInFinance(
        buyer: string, // financer
        id: number, // nft id
    ) {
        // create real estate finance contract instance
        // const finance = await ethers.getContractAt(
        //     'Finance',
        //     chainConfig.realEstate['finance'],
        //     this.deployer
        // );
        const finance = Finance__factory.connect(chainConfig.realEstate['finance'], this.deployer);
        // add id as owner (deployer)
        const tx = await finance.connect(this.deployer).setIdInFinance(
            buyer,
            id
        );
        await tx.wait();
    }
}


const blockchain = new Blockchain();
export default blockchain;