import { MongoClient, Db } from 'mongodb';
import { FinanceDocument, RealEstateDocument } from '../interfaces/interfaces';
import dotenv from 'dotenv';
dotenv.config();

export class Mongo {
    client: MongoClient;
    db: Db;

    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }

        this.client = new MongoClient(process.env.MONGO_URI);
        this.db = this.client.db('DecentraCore');
    }



    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.close();
    }

    // finance
    // get finance docs
    async getFinanceDocs() {
        return this.db.collection<FinanceDocument>('finance').find().toArray();
    }


    // real estate
    // determine if document exists, return escrow id
    async getEscrowId(buyer: string): Promise<string | null> {
        // i console this out because i can see it in the terminal, and its in the database bc its showing in the logs
        // console.log(await this.db.collection<RealEstateDocument>('realEstate').find().toArray());
        const doc = await this.db.collection<RealEstateDocument>('realEstate').findOne({ buyer });
        if (doc) {
            return doc.escrowId;
        }
        return null;
    }

    // delete document
    async deleteRealEstateDoc(buyer: string) {
        const deletedDoc = await this.db.collection<RealEstateDocument>('realEstate').deleteOne({ buyer });
        if (deletedDoc.deletedCount === 0) {
            throw new Error('Document not found');
        } 
    }

    // supply chain
    // get supply chain docs
    async getSupplyChainDocs() {
        return this.db.collection('supplyChain').find().toArray();
    }
}

// Still in src/db/mongo.ts
const mongo = new Mongo();

export default mongo;
