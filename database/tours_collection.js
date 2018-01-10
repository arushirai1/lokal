import {BSONtoObject} from '../lib/utils'
import {getCategoryId} from './categories_collection'
import mongodb  from 'mongodb'
import {ObjectID} from 'mongodb'

const TOURS_COLLECTION = "tours";

export async function getTour(db, id) {
    try {
        const query = {"_id": new ObjectID(id)};
        const doc = await db.collection(TOURS_COLLECTION).findOne(query);
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getTour(): " + e);
    }
}

export async function createTour(db, {title, path, userId, categoryName, info, maxUsers, repeat, specificDates}) {
    try {
        const tour = { 
            title: title, 
            path: path, 
            userId: userId, 
            categoryId: getCategoryId(db, categoryName),
            info: {
                provide: info.provide,
                bring: info.bring,
                des: info.des,
                imgUrls: info.imgUrls
            }, 
            maxUsers: maxUsers, 
            repeat: null, 
            specificDates: null};
        if(repeat != null) {
            tour.repeat = {
                beg: repeat.beg,
                end: repeat.end,
                days: repeat.days
            };
        } if (specificDates != null) {
            tour.specificDates = specificDates;
        }

        const doc = await db.collection(TOURS_COLLECTION).insertOne(tour);
        return BSONtoObject(doc);
    } catch (e) {
        console.log("Error in createTour(): " + e);
    }
}