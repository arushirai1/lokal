
import mongodb from 'mongodb';
import {BSONtoObject} from '../lib/utils'

export async function getUser(id, db) {
    try {
        const query = {"email": id};
        const doc = await db.collection("users").findOne({"email": id});
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getUser(): " + e);
    }
}

export async function createUser(db, {name, email, password, street, cityState, zip, picUrl, bio}) {
    const user = {
        name: name, 
        email: email, 
        password: password,
        street: street,
        cityState: cityState, 
        zip: zip,
        picUrl: picUrl,
        bio: bio
    }
    try {
        const doc = await db.collection("users").insertOne(user);
        return BSONtoObject(doc);
    } catch (e) {

    }
}
