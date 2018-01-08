import {BSONtoObject} from '../lib/utils'

const TOURS_COLLECTION = "categories";

export async function getTour(db, id) {
    try {
        const query = {"_id": id};
        const doc = await db.collection(TOURS_COLLECTION).findOne(query);
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getTour(): " + e);
    }
}