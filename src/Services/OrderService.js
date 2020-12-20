const processCustomerOrder = async (orderData) => {

    var status = "";

    var status = await fetch("http://localhost:8080/api/order/capture", {  
        method: "POST",                 
        body: orderData
        }).then(result => result.text()).then(data => {
            return data;
        }).catch(console.log);

    return status;

}

export async function processOrder(orderData){
    
    var status = await processCustomerOrder(orderData).then((value) => {
        return value;
    });

    console.log(status);

    return status;

}