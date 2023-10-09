require('dotenv').config();

export const test_data = {
    username: process.env.USER,
    usernameLocked: process.env.USER_LOCKED,
    password: process.env.PASS_UNLOCKED,
    
    shippingData: {
        fname: "testfname",        
        lname: "testlname",
        address: "testaddress",
        province: "testprovince",
        postcode: "testpostcode"
    },

    noOfferLocation: {latitude: 44.16982, longitude: -88.29281},
}