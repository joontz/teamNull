/*
Author: Jacob Smith
Username: jdsp4k
Domain: UMKC
Date: 9/27/2023
Desc:
MongoDB interface wrapper. Defines an object 'DBObject.' Create with:
new DBObject([protocol], [address], [port], [username], [password]);
Left blank, will try to connect to the defualt mongodb port on localhost,
with no username or password.
*/

const {MongoClient} = require("mongodb");
const defaultProtocol = "mongodb";
const defaultAddress = "0.0.0.0";
const defaultPort = "27017";

function createURL(
    protocol,
    address,
    port,
    uName,
    pass,
    protSep = "://",
    userPasSep = ":",
    loginSep = "@",
    portSep = ":")
{
    cred = "";
    if (typeof uName != "undefined")
    {
        cred = uname + userPasSep + pass + loginSep;
    }
    return protocol + protSep + cred + address + portSep + port;
}

const DBObject = {
    url: "",
    client,
    DBObject: function(
        protocol = defaultProtocol,
        address = defaultAddress,
        port = defaultPort,
        uName,
        pass,
        protSep,
        userPasSep,
        loginSep,
        portSep)
    {
        this.url = createURL(
            protocol,
            address,
            port,
            uName,
            pass, 
            protSep,
            userPasSep,
            loginSep,
            portSep);
        this.client = new MongoClient(this.url);
    },

    //poke: Simple connection test function. Returns true if successful.
    poke: async function()
    {
        try
        {
            await this.client.connect();
        } catch (e) {
            this.client.close();
            return false;
        } finally {
            this.client.close()
            return true
        }
    },

    //addApplicant:
    addApplicant: async function(
        dbName = "local",
        clName = "users",
        email,
        pass,
        fName = "",
        lName = "",
        studentID = -1,
        currLevel = "",
        gradSeason = "",
        gradYear = -1,
        cumulativeGPA = -1,
        hoursComplete = -1,
        undergradDegree = "",
        currentMajor = "",
        GTACert = ""
        )
    {
        data = {
            "email" : email,
            "pass" : pass
        };
        try
        {
            await this.client.connect(email, pass);
            await this.client.db(dbName).collection(clName).insertOne(data);
        } finally {
            this.client.close();
        }
    },

    //getUserByEmail: Takes a email, password, and a search email. Returns a record with that email or null.
    getUserByEmail: async function(
        dbName = "local",
        clName = "users",
        email,
        pass,
        targetUName
    )
    {
        data = {
            "email": targetUName
        };
        const u = null;
        try
        {
            await this.client.connect(email, pass);
            const u = await this.client.db(dbName).collection(clName).findOne(data);
        } finally {
            this.client.close();
            return u;
        }
    }

}