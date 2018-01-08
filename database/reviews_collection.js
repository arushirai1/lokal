import {BSONtoObject} from '../lib/utils'

const REVIEWS_COLLECTION = "reviews";

export async function getReview(db, id) {
    try {
        const query = {"_id": id};
        const doc = await db.collection(REVIEWS_COLLECTION).findOne(query);
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getReview(): " + e);
    }
}