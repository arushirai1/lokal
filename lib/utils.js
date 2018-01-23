import mongodb from 'mongodb';


export function BSONtoObject(doc, funcName) {
    const str = JSON.stringify(doc);
    console.log("JSON String for "+ funcName+": " + str);
    const obj = JSON.parse(str);
    return obj;
}