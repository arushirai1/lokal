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

export async function createReview(db, {userId, tourId, rating, review}) {
    try {
        const input = {
            userId: userId,
            tourId: tourId,
            rating: rating,
            review: review
        }

        const doc = await db.collection(REVIEWS_COLLECTION).insertOne(input);
        return BSONtoObject(doc);
    } catch (e) {
        console.log("Error in createReview(): " + e);
    }
}

export async function getReviewList(db, tourId) {
    try {
        const query = {"tourId":tourId};
        const doc = await db.collection(REVIEWS_COLLECTION).find(query).toArray();
        return BSONtoObject(doc);
    } catch (e) {
        console.log("Error in getReviewList(): " + e);        
    }
}