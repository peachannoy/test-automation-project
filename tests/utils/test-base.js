const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username : "mail@britta.de",
            password : "Password1*",
            productName : "iphone 13 pro"
        }
    }
)