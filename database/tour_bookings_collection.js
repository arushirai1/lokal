import {BSONtoObject} from '../lib/utils'

const TOUR_BOOKINGS_COLLECTION = "tour_bookings";

export async function getTourBooking(db, datetime, tourid) {
    try {
        const query = {"tourId": tourid, "dateTime": datetime};
        const doc = await db.collection(TOUR_BOOKINGS_COLLECTION).findOne(query);
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getTourBooking(): " + e);
    }
}