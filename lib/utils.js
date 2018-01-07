import mongodb from 'mongodb';


export function BSONtoObject(doc) {
    const str = JSON.stringify(doc);
    console.log("This is the JSON string: " + str);
    const obj = JSON.parse(str);
    return obj;
}