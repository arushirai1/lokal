import {BSONtoObject} from '../lib/utils'

const CATEGORIES_COLLECTION = "categories";

export async function getCategory(db, id) {
    try {
        const query = {"_id": id};
        const doc = await db.collection(CATEGORIES_COLLECTION).findOne(query);
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getCategory(): " + e);
    }
}