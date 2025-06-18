import { MongoClient, Db, WithId } from 'mongodb';
import { FinanceDocument, RealEstateDocument, SubscribeDocument } from '../interfaces/interfaces';
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

    encodeEmail(email: string): string {
        return email.replace(/\./g, '%2E');
    }

    decodeEmail(encoded: string): string {
        return encoded.replace(/%2E/g, '.');
    }

    async addEmailSubscribe(email: string): Promise<void> {
        const encodedEmail = this.encodeEmail(email);
        const collection = this.db.collection<SubscribeDocument>('subscriptions');
        const document = await collection.findOne({ emanCanCode: true });

        if (!document) {
            console.error("No subscription document found.");
            return;
        }

        if (document[encodedEmail]) {
            console.log(`Email: ${email} is already subscribed`);
            return;
        }

        console.log(`Adding email: ${email}`);

        try {
            await collection.updateOne(
                { emanCanCode: true },
                { $set: { [encodedEmail]: true } }
            );
        } catch (error) {
            console.error(`Error adding email: ${error}`);
        }
    }
    

    async getAllDocuments(): Promise<{ [collection: string]: WithId<Document>[][] }> {
        const collections = await this.db.collections();
        const allDocs: { [collection: string]: any[] } = {};
    
        for (const collection of collections) {
            const docs = await collection.find().toArray();
            allDocs[collection.collectionName] = docs;
        }
    
        return allDocs;
    }    

}

const mongo = new Mongo();

export default mongo;
