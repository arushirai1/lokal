import {BSONtoObject} from '../lib/utils'
import {getCategoryId} from './categories_collection'
import mongodb  from 'mongodb'
import {ObjectID} from 'mongodb'

const TOURS_COLLECTION = "tours";

export async function getTour(db, id) {
    try {
        const query = {"_id": new ObjectID(id)};
        const doc = await db.collection(TOURS_COLLECTION).findOne(query);
        return BSONtoObject(doc, "getTour");
    } catch(e) {
        console.log("Error in getTour(): " + e);
    }
}

export async function getTourList(db, {limit, location, categories, maxDist, minDate, maxDate}) {
    try {
        const agg = [
            {$geoNear: 
                {near: {type: "Point", coordinates: [location.lon, location.lat]},
                distanceField: "dist.calculated",
                maxDistance: 2,
                includeLocs: "dist.location",
                num: 5,
                spherical: true}},
            {$unwind: "$categoryId"},
            {$lookup:{from: "categories", localField:"categoryId", foreignField:"_id", as: "category"}},
            {$lookup:{from: "users", localField:"userId", foreignField:"_id", as: "user"}},
            {$unwind: "$category"},
            {$unwind: "$user"}
            ];
/*        let categoryIds = [];
        for(let i=0; i<categories.length; i++) {
            categoryIds[i] = getCategoryId(db, categories[i]);
        }
        const catQuery = {"categoryId": {'$in': categoryIds}, "specificDates": {'$gte': minDate, '$lte': maxDate}}*/
        const doc = await db.collection(TOURS_COLLECTION).aggregate(agg).toArray()//.skip(limit).limit(10);
        const obj = BSONtoObject(doc, "getTourList");
        return obj;
    } catch (e) {
        console.log("Error in getTourList(): " + e);
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
        return BSONtoObject(doc, "createTour()");
    } catch (e) {
        console.log("Error in createTour(): " + e);
    }
}