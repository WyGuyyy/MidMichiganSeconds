import {baseURI} from './APIService';

const getContent = async (ampm, hour, minute) => {

    var seconds = "";

     seconds = await fetch(baseURI + "/api/content/" + ampm + "/" + hour + "/" + minute  , {  
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

    var slideshowDataArr = [];

    var contentID = 0;
    var newLink = "";

     await fetch(baseURI + "/api/content/" + ampm + "/" + hour + "/" + minute + "/" + second  , {  
        method: "GET",                          
        headers: {"Content-Type": "application/json"}
        })
        .then(res => res.text())
        .then(
            (text) => {

                var result = (text.length ? JSON.parse(text) : {});

                contentID = result[0].content_id;
                newLink = result[0].url;

                slideshowDataArr.push(contentID);
                slideshowDataArr.push(newLink);

            }
        )
        .catch(console.log);

    return slideshowDataArr;

}

export function getUsedSeconds(ampm, hour, minute){
    
    hour = (hour <= 9 ? "0" + hour : "" + hour);
    minute = (minute <= 9 ? "0" + minute : "" + minute);

    var data = getContent(ampm, hour, minute).then((seconds) => {

        var secondArr = [];
        var count = 0;

        for(count = 0; count < 60; count++){
            secondArr.push({value: count, active: true});
        }

        for(count = 0; count < seconds.length; count++){
            var sec = parseInt(seconds[count].second);
            secondArr[sec] = {value: secondArr[sec].value, active: false};
        }

        return secondArr;

    });

    return data;

}

export async function retrieveSlideshowData(ampm, hour, minute, second){

    var slideshowDataArr = [];

    slideshowDataArr = await getSlideshowData(ampm, hour, minute, second);

    return slideshowDataArr;

}