const getBlob = async (contentID) => {

    var fileResult;

    await fetch("http://localhost:8080/api/file/" + contentID  , { 
        method: "GET"                         
        })
        .then(res => res.text())
        .then(
            (text) => {

                var result = text.length ? JSON.parse(text) : {};
                fileResult = result;
                
                
            }
        )
    .catch(console.log);

    return fileResult;

}

const getRandomBlob = async () => {

    var fileResult;

    await fetch("http://localhost:8080/api/file", { 
        method: "GET"                         
        })
        .then(res => res.text())
        .then(
            (text) => {

                var result = text.length ? JSON.parse(text) : {};
                fileResult = result;
                
                
            }
        )
    .catch(console.log);

    return fileResult;

}

export async function retrieveBlob(contentID){

    var fileResult = [];

    fileResult = await getBlob(contentID);

    return fileResult;

}

export async function retrieveRandomBlob(){
    return await getRandomBlob();
}