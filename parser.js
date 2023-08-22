console.log("start");
// // GIEYS3IP-C
// var tableRowElement = document.querySelector(".tableRow");
// var resizeCol = tableRowElement.querySelector('.resize-column-90');
// var tegA = resizeCol.querySelector('.cellInsider');
// var divElement = tegA.querySelector('div');
// var text = divElement.textContent;
// console.log(text);


console.log("start");

var tableRowElements = document.querySelectorAll(".tableRow");

var existingData = JSON.parse(localStorage.getItem("state")) || [];

tableRowElements.forEach(async function(tableRowElement) {
    var dateStart = "";
    var sla = "";
    var id = "";
    var userName = "";
    var serviceName = "";
    var type = "";

    var resizeCol1 = tableRowElement.querySelector('.resize-column-86');

    if (resizeCol1) {
        var tegA = resizeCol1.querySelector('.cellInsider');
        if (tegA) {
            var divElement = tegA.querySelector('div');
            if (divElement) {
                dateStart = divElement.textContent;
                console.log(dateStart);
            }
        }
    }

    var resizeCol2 = tableRowElement.querySelector('.resize-column-89');

    if (resizeCol2) {
        var tegA = resizeCol2.querySelector('.cellInsider');
        if (tegA) {
            var divElement = tegA.querySelector('div');
            if (divElement) {
                sla = divElement.textContent;
                console.log(sla);
            }
        }
    }

    var resizeCol3 = tableRowElement.querySelector('.resize-column-90');

    if (resizeCol3) {
        var tegA = resizeCol3.querySelector('.cellInsider');
        
        if (tegA) {
        
            var divElement = tegA.querySelector('div');
            if (divElement) {
                id = divElement.textContent;
                console.log(id);
            }
        }
    }

    var resizeCol4 = tableRowElement.querySelector('.resize-column-93');

    if (resizeCol4) {
        var tegA = resizeCol4.querySelector('.cellInsider');
        if (tegA) {
            var divElement = tegA.querySelector('div');
            if (divElement) {
                userName = divElement.textContent;
                console.log(userName);
            }
        }
    }

    var resizeCol5 = tableRowElement.querySelector('.resize-column-94');

    if (resizeCol5) {
        var tegA = resizeCol5.querySelector('.cellInsider');
        if (tegA) {
            var divElement = tegA.querySelector('div');
            if (divElement) {
                serviceName = divElement.textContent;
                console.log(serviceName);
            }
        }
    }

    var resizeCol6 = tableRowElement.querySelector('.resize-column-99');

    if (resizeCol6) {
        var tegA = resizeCol6.querySelector('.cellInsider');
        if (tegA) {
            var divElement = tegA.querySelector('div');
            if (divElement) {
                type = divElement.textContent;
                console.log(type);
            }
        }
    }

    var resizeCol7 = tableRowElement.querySelector('.resize-column-90');

    if (resizeCol7) {
        var tegA = resizeCol7.querySelector('.cellInsider');
        var link = tegA.getAttribute('href');
        console.log(link)
        if (link) {
            try{
                var response = await fetch('https://10.77.71.130/sd/operator/'+link);
                var htmlText = await response.text();
                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlText, 'text/html');
                var someElement = doc.querySelector('iframe');
                var documentIframe = someElement.querySelector("html");
                console.log(documentIframe)
                // if(someElement){
                //     var someText = someElement.querySelector('div');
                //     console.log(someText.textContent);
                // }
            }
            catch(error){
                console.log(error)
            }
            // var divElement = tegA.querySelector('div');
            // if (divElement) {
            //     id = divElement.textContent;
            //     console.log(id);
            // }
        }
    }

    const obj = {
        dateStart: dateStart,
        sla: sla,
        id: id,
        userName: userName,
        serviceName: serviceName,
        type: type
    }

    existingData.push(obj)
});

localStorage.setItem("state", JSON.stringify(existingData));