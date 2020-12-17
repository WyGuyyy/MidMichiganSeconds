const processCustomerOrder = async (data) => {

    var status = "";

    status = await fetch("http://localhost:8080/api/order/capture", {  
            method: "POST",                          
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: data.facilitatorAccessToken, order_id: data.orderID, payer_id: data.payerID})
            }).catch(console.log);

    return status;

}

export function processOrder(data){
    
    var status = processCustomerOrder(data).then((value) => {
        return value;
    });

    return status;

}