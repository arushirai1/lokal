import mongodb from 'mongodb';


export function BSONtoObject(doc) {
    const str = JSON.stringify(doc);
    console.log("JSON String: " + str);
    const obj = JSON.parse(str);
    return obj;
}