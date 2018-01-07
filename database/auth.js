//This is the file that will handle authentication

function getUserFromArray(user) {
    return {
        name: user['name'],
        email: user['email'],
        street: user['street'],
        cityState: user['cityState'],
        picUrl: user['picUrl'],
        bio: user['bio']
    }
}

export function signInUser(email, pass, db) {
    token = "";
    user=db.collection("users").findOne({email: email}).toArray();
    if(user['pass'] == pass) {
        token=""; //change to something later
        return {
            token: token,
            user: getUserFromArray(user)
        }
    } else {
        return {
            token: token,
            user: null
        }
    }
    
}