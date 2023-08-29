// (
// 	() => {
// 		const sendButton = document.getElementById('send-button');

// 		if (sendButton === null) {
// 			return;
// 		}

// 		sendButton.onclick = function (el) {
// 			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
// 				chrome.scripting.executeScript(
// 					{
// 						target: {tabId: tabs[0].id},
// 						files: ['parser.js'],
// 					},
// 					() => {}
// 				);
// 			})
// 		}
// 	}
// )();

document.addEventListener("DOMContentLoaded", function () {
  // const startButton = document.getElementById("start-button");
	const sendBtn = document.getElementById("send-btn");
	sendBtn.addEventListener("click", async () => {
		const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
		});
		await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["parser.js"],
		});
	});
});
