console.log("start");

var tableRowElements = document.querySelectorAll(".tableRow");

var existingData = JSON.parse(localStorage.getItem("state")) || [];

var link;
async function parseWindow(linker) {
    return new Promise((resolve, reject) => {
        browser.tabs.create({ url: linker, active: false }, async (newTab) => {
            browser.tabs.executeScript(newTab.id, {
                code: `(${getIframeContent.toString()})();`
            }).then((result) => {
                browser.tabs.remove(newTab.id);

                resolve(result[0]);
            }).catch((error) => {
                reject(error);
            });
        });
    });
}

function getIframeContent() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(document.documentElement.outerHTML, 'text/html');
    const divInsideIframe = doc.querySelector("header");
    if (divInsideIframe) {
        return divInsideIframe.textContent.trim();
    }
    return null;
}

async function parseTableRow(tableRowElement) {
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

    var iframe = tableRowElement.querySelector("iframe");
    // console.log(iframe)

    if (iframe) {
        var iframeDocument = iframe.contentWindow.document;
        if (iframeDocument) {
            var divInsideIframe = iframeDocument.querySelector("div");

            if (divInsideIframe) {
                var content = divInsideIframe.textContent.trim();
                console.log("Содержимое <div> внутри iframe:", content);
            } else {
                console.log("Элемент <div> внутри iframe не найден");
            }
        }
    }

    var resizeCol7 = tableRowElement.querySelector('.resize-column-90');

    if (resizeCol7) {
        const NUMERIC_REGEXP = /\d+/g;
        var tegA = resizeCol7.querySelector('.cellInsider');
        var link = tegA.getAttribute('href');
        console.log(link);
        const numberLink = Number(link.match(NUMERIC_REGEXP));
        console.log(numberLink);
        console.log(tegA);
        const linker = `https://10.77.71.130/sd/operator/richText?uuid=serviceCall$${numberLink}&checkSum=70c5485baee3135538a492f2468eca020fcb7bd8d7c9dff7934d9ffe28053e2c&attr=descriptionInRTF&isComment=false`;
        console.log(linker);
        try{
            // var htmlText = await openTab
            // var htmlText = await openTab(link);
            // console.log("opentab");
            // var body = htmlText.querySelector('body');
            // console.log(body);
            var htmlText = await fetchData(linker);
            if(htmlText){
                await Parserer(htmlText);
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
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

    existingData.push(obj);
};

async function openTab(linker){
    return new Promise((resolve, reject) => {
        // var newTab = window.open(linker, '_blank');
        // window.location.href = linker;
        window.location.assign(linker);
        window.onload = async function(){
            try{
                const body = document.querySelector('body');
                console.log(body);
                resolve(body);
            }
            catch(error){
                console.log(error);
                reject(error);
            }
            finally{
                console.log('closed');
                window.history.go(-1);
            }
        }
    });
}


async function fetchData(linker) {
    console.log(linker);
    try {
        const response = await fetch(linker, {
            headers: {
                'Content-Type':'text/html;charset=UTF-8',
                // 'Access-Control-Allow-Origin': 'https://10.77.71.130/sd/operator/#uuid:serviceCall$',
                // 'X-Content-Type-Options': '',
            },
            // redirect: 'follow',
            mode: 'cors',
        });
        console.log(response)
// https://10.77.71.130/sd/operator/richText?uuid=serviceCall$1841372452
        if (response.url === `'https://10.77.71.130/sd/operator/'+${linker}`) {
                console.log(response);
                const htmlText = await response.text();
                return htmlText;
            } else {
                console.log(response);
                console.error('Fetch failed with status:', response.status);
                const htmlText = await response.text();
                return htmlText;
                return null;
            }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function Parserer(htmlText){
    // console.log(response)
    console.log(htmlText);
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlText, 'text/html');
    console.log(doc);
    var someElement = doc.querySelector('#gwt-debug-title-value');
    // var documentIframe = someElement.querySelector("html");
    var global = doc.getElementById('globalWrapper');
    console.log(global);
    console.log(someElement);
    // var content = await parseWindow(linker);
    // console.log(content);
}

(async () => {
    for (const tableRowElement of tableRowElements) {
        await parseTableRow(tableRowElement);
    }
})();

// localStorage.setItem("state", JSON.stringify(existingData));
