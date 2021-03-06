import {BSONtoObject} from '../lib/utils'
import mongodb  from 'mongodb'
import {ObjectID} from 'mongodb'

const CATEGORIES_COLLECTION = "categories";

export async function getCategory(db, id) {
    try {
        const query = {"_id": new ObjectID(id)};
        const doc = await db.collection(CATEGORIES_COLLECTION).findOne(query);
        return BSONtoObject(doc, "getCategory()");
    } catch(e) {
        console.log("Error in getCategory(): " + e);
    }
}


export async function getCategoryId(db, name) {
    try {
        const query = {"name": name};
        const doc = await db.collection(CATEGORIES_COLLECTION).findOne(query);  
        return BSONtoObject(doc, "getCategoryId()")._id;
    } catch (e) {
        console.log("Error in getCategoryId(): " + e);
    }
}