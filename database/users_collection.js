
import mongodb from 'mongodb';
import {BSONtoObject} from '../lib/utils'
import {HttpClient} from '../lib/http'

const USER_COLLECTION = "users";

export async function getUser(id, db) {
    try {
        const query = {"email": id};
        const doc = await db.collection(USER_COLLECTION).findOne({"email": id});
        return BSONtoObject(doc);
    } catch(e) {
        console.log("Error in getUser(): " + e);
    }
}

export async function updateUser(db, userid, field, value) {
    db.collection(USER_COLLECTION).updateOne(
        { _id: userid },
        {
          $set: { field: value},
        }
     )
}


export async function createUser(db, {name, email, password, zip, picUrl, bio, phone}) {
    const user = {
        name: name, 
        email: email, 
        password: password,
        zip: zip,
        picUrl: picUrl,
        bio: bio,
        phone: phone
    }
    try {
        /*
        //have to find a way to pass additional arguments through the callback function
        const addrStr = "http://maps.googleapis.com/maps/api/geocode/json?address=";
        const zip= "80311";
        const client = new HttpClient();
        client.get(addrStr+zip, function(response) {
          const obj = JSON.parse(response);
          console.log(obj.results[0].formatted_address);
          "addr"
        });*/
        const doc = await db.collection(USER_COLLECTION).insertOne(user);
        return BSONtoObject(doc);
    } catch (e) {

    }
}
