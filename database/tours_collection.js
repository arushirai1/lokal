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

function getDistance(lat1, long1, lat2, long2) {
    let earthRadius = 6371000; // meters
    let dLat = Math.toRadians(lat2 - lat1);
    let dLng = Math.toRadians(long2 - long1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1))
            * Math.cos(Math.toRadians(long1)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(Math.abs(a)), Math.sqrt(Math.abs(1 - a)));
    let dist = (float) (earthRadius * c);

    return dist;
}
export async function getTourList(db, {limit, location, categories, maxDist, minDate, maxDate}) {
    try {
        const query = {$where: () => {
            return getDistance(
                this.path[0].lat, 
                this.path[0].lon,
                location.lat,
                location.lon) < maxDist}};
        let categoryIds = [];
        for(let i=0; i<categories.length; i++) {
            categoryIds[i] = getCategoryId(db, categories[i]);
        }
        const catQuery = {"categoryId": {'$in': categoryIds}, "specificDates": {'$gte': minDate, '$lte': maxDate}}
        const doc = await db.collection(TOURS_COLLECTION).find({$and: [catQuery, query]}).toArray()//.skip(limit).limit(10);
        return BSONtoObject(doc);
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
        return BSONtoObject(doc);
    } catch (e) {
        console.log("Error in createTour(): " + e);
    }
}