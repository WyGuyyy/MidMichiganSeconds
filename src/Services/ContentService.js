const getContent = async (ampm, hour, minute) => {

    var seconds = "";

     seconds = await fetch("http://localhost:8080/api/content/" + ampm + "/" + hour + "/" + minute  , {  
                method: "GET",                          
                headers: {"Content-Type": "application/json"}
                })
                .then(res => res.text())
                .then(
                    (text) => {

                        var result = text.length ? JSON.parse(text) : {};
                        return result;
        }
    )

    return seconds;

}

const getSlideshowData = async (ampm, hour, minute, second) => {

    var seconds = "";

     seconds = await fetch("http://localhost:8080/api/content/" + ampm + "/" + hour + "/" + minute + "/" + second  , {  
                method: "GET",                          
                headers: {"Content-Type": "application/json"}
                })
                .then(res => res.text())
                .then(
                    (text) => {

                        var result = text.length ? JSON.parse(text) : {};
                        return result;
        }
    )

    return seconds;

}

export function getUsedSeconds(ampm, hour, minute){
    
    var data = getContent(ampm, 12, 12).then((value) => {

        var secondArr = [];
        var count = 0;

        for(count = 0; count < 60; count++){
            secondArr.push({value: count, active: true});
        }

        for(count = 0; count < value.length; count++){
            var sec = parseInt(value[count].second);
            secondArr[sec] = {value: secondArr[sec].value, active: false};
        }

        return secondArr;

    });

    return data;

}

export function retrieveSlideshowData(ampm, hour, minute, second){

}