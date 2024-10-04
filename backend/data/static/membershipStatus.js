const membershipStatusList = {
    "pending": 0, //membership not added for client
    "firstPaymentOutstanding": 1, //have not received first payment yet
    "good": 2, //account it up to date
    "inArrears": 3, //account is in arrears
    "followUp": 4 //account requires follow up
};

export default membershipStatusList;