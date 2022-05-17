importScripts("./functions_for_bs_inject.js", "./functions_for_br_inject.js")

function bulkSend(tab, mailData, delay) {
	switch (tab.url.replace('http://', 'https://').split('?')[0]) {
		case "https://www.charmdate.com/clagt/emf_sender2.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: emfSender2
				}
			)

		case "https://www.charmdate.com/clagt/emf_sender3.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: emfSender3
				}
			)

		case "https://www.charmdate.com/clagt/emf_sender4.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: emfSender4,
					args: [mailData]
				}
			)

		case "https://www.charmdate.com/clagt/emf_error.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: emfError,
				}
			)

	}
}

function bulkResponse(tab, mailData, delay) {
	switch (tab.url.replace('http://', 'https://').split('?')[0]) {
		case "https://www.charmdate.com/clagt/cupidnote/reply2.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: replyPage,
					args: [mailData]
				}
			)
		case "https://www.charmdate.com/clagt/cupidnote/error_msg.php":
			chrome.scripting.executeScript(
				{
					target: {'tabId': tab.id},
					func: sayHiError
				}
			)
	}
}

function onTabsUpdateListener(tabId, changeInfo, tab) {
	if (changeInfo.status !== "complete") {
		return
	}

	chrome.storage.local.get(['emailingType', 'mailData', 'delay'], function(result) {
		if (result.emailingType === "First EMF Mail") {
			bulkSend(tab, result.mailData, result.delay)
		} else if (result.emailingType === "Say Hi") {
			bulkResponse(tab, result.mailData, result.delay)
		}
	})

}

chrome.storage.local.get(['scriptIsActive'], function(result) {
	if (result.scriptIsActive) {
		chrome.tabs.onUpdated.addListener(onTabsUpdateListener);
	}
})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text === "openTab") {
    	chrome.tabs.create(msg.detail)
	}
});
