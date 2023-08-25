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
        var tegA = resizeCol7.querySelector('.cellInsider');
        var link = tegA.getAttribute('href');
        console.log(link);
        console.log(tegA);
        try {
            var linker = 'https://10.77.71.130' + link;
            var iframeContent = await parseWindow(linker);
            chrome.runtime.sendMessage({ iframeContent });
        } catch (error) {
            console.log(error);
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
});

// localStorage.setItem("state", JSON.stringify(existingData));
