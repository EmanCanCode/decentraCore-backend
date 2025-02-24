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
            throw new Error('PROVIDER_URL is not set');
        } else if (!process.env.FAUCET_PRIVATE_KEY) {
            throw new Error('FAUCET_PRIVATE_KEY is not set');
        } else if (!process.env.ESCROW_MANAGER_PRIVATE_KEY) {
            throw new Error('ESCROW_MANAGER_PRIVATE_KEY is not set');
        } else if (!process.env.DEPLOYER_PRIVATE_KEY) {
            throw new Error('DEPLOYER_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER_1_PRIVATE_KEY) {
            throw new Error('SEEDER_1_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER_2_PRIVATE_KEY) {
            throw new Error('SEEDER_2_PRIVATE_KEY is not set');
        } else if (!process.env.SEEDER_3_PRIVATE_KEY) {
            throw new Error('SEEDER_3_PRIVATE_KEY is not set');
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
            new Wallet(process.env.SEEDER_1_PRIVATE_KEY, this.provider),
            new Wallet(process.env.SEEDER_2_PRIVATE_KEY, this.provider),
            new Wallet(process.env.SEEDER_3_PRIVATE_KEY, this.provider)
        ];
    }

    async requestFaucet(address: string) {
        const minimumEtherAmount = ethers.utils.parseEther('5'); // 5 ether
        let requesterBalance = await this.provider.getBalance(address);
        let tx: TransactionResponse;
        if (requesterBalance.lt(minimumEtherAmount)) {
            // send the difference between the requester balance and the minimum amount to get them to the minimum amount
            const difference = minimumEtherAmount.sub(requesterBalance);
            let tx = await this.faucet.sendTransaction({
                to: address,
                value: difference
            });
            await tx.wait();
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
                    nonce.add(1) // nonce
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
            return false;
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
        if (buyerDeposit !== await escrow.earnest_amount()) {
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
        const loanAmount = (async () => {
            const purchasePrice = await escrow.purchase_price();
            return purchasePrice.sub(buyerDeposit);
        })();
        await escrow.connect(this.escrowManager).deposit({ value: loanAmount });
        // finalize sale
        await escrow.connect(this.escrowManager).finalizeSale();
    }
}