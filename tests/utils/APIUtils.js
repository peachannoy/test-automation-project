class APIUtils
{
    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: this.loginPayLoad
    }
    
    );
    const loginResponseJSON = await loginResponse.json();
    return loginResponseJSON.token;
    }


async createOrder(orderPayLoad){
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayLoad,
        headers: {
            'Authorization': await this.getToken(),
            'Content-Type': 'application/json'
        }
    })
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    return orderId;
};
}

module.exports = {APIUtils};