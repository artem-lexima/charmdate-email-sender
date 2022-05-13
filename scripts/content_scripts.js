let page

window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);

    let ladyId = urlParams.get('womanid');

    chrome.storage.local.get(['scriptIsActive', 'emailingType', 'delay'], function(result) {
        if (result.scriptIsActive) {
            switch (document.location.pathname) {
                case "/clagt/woman/women_preview_profile.php":
                    let shouldStart = confirm(`Хотите запустить рассылку '${result.emailingType}'?`);

                    if (shouldStart) {
                        if (result.emailingType === "Bulk Send") {
                            let urlToRedirect = chrome.runtime.getURL('../html/bulk-send.html') + `?ladyId=${ladyId}`;
                            chrome.runtime.sendMessage({text: "openTab", detail: {url: urlToRedirect}}, function(response) {});
                        } else if (result.emailingType === "Bulk Response") {
                            let urlToRedirect = chrome.runtime.getURL('../html/bulk-response.html') + `?ladyId=${ladyId}`;
                            chrome.runtime.sendMessage({text: "openTab", detail: {url: urlToRedirect}}, function(response) {});
                        }
                    }

                case "/clagt/cupidnote/search_result.php":
                    if (result.emailingType !== "Bulk Response") {return}

                    let ids = document.querySelectorAll('table#DataGrid1 tbody tr td:nth-child(2)')[Symbol.iterator]();

                    page = "https://www.charmdate.com/clagt/cupidnote/reply2.php?noteid=" + ids.next().value.innerText.trim().replace(' ', '');
                    chrome.runtime.sendMessage({text: "openTab", detail: {url: page}}, function(response) {});

                    ids = Array.from(ids)

                    setTimeout(() => {alert(`Done! You’ve just sent ${ids.length+1} emails successfully`)}, result.delay * 1000 * (ids.length+1))

                    for (let index = 0; index < ids.length; index++) {
                        setTimeout(() => {
                            let page = "https://www.charmdate.com/clagt/cupidnote/reply2.php?noteid=" + ids[index].innerText.trim().replace(' ', '');
                            chrome.runtime.sendMessage({text: "openTab", detail: {url: page}}, function(response) {});
                        }, result.delay * 1000 * (index+1))
                    }

                case "/clagt/first_emf.php":
                    if (result.emailingType !== "Bulk Send") {return}

                    let pages = [...document.querySelectorAll("a")].filter(a => a.textContent.includes("Send Another Mail"))[Symbol.iterator]();

                    page = pages.next().value.href;
                    chrome.runtime.sendMessage({text: "openTab", detail: {url: page}}, function(response) {});

                    pages = Array.from(pages)

                    setTimeout(() => {alert(`Done! You’ve just sent ${pages.length+1} emails successfully`)}, result.delay * 1000 * (pages.length+1))

                    for (let index = 0; index < pages.length; index++) {
                        setTimeout(() => {
                            chrome.runtime.sendMessage({text: "openTab", detail: {url: pages[index].href}}, function(response) {});
                        }, result.delay * 1000 * (index+1))
                    }

            }

        }
    });
}
