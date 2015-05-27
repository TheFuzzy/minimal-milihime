var wv = document.querySelector('webview');
var refreshButton = document.querySelector('.refresh');
var minimizeButton = document.querySelector('.minimize');
var closeButton = document.querySelector('.close');

refreshButton.addEventListener('click', function(evt) {
	wv.src = "http://yahoo-mbga.jp/game/12022153/play";
});
minimizeButton.addEventListener('click', function(evt) {
	chrome.app.window.current().minimize();
});
closeButton.addEventListener('click', function(evt) {
	chrome.app.window.current().close();
});

wv.addEventListener('loadcommit', function(evt) {
	if (!evt.isTopLevel) return;
	// console.log(evt);
	// Force game canvas to move to the top left and cover everything else
	wv.executeScript({
		code: 'document.location.href;'
	}, function(results) {
		if (!results || results.length < 1 || results[0].indexOf("play") < 0) return;
		wv.insertCSS({
			code: 'iframe#ymbga_app { position: absolute; left: 0; top: 0; margin: 0 !important; height: 640px; } html { overflow-y: hidden !important; overflow-x: hidden; }'
		});
	});
	// Ensure game resources can load, bypassing CORS
	wv.request.onHeadersReceived.addListener(addCorsHeaders, { urls: [ "*://res.milihime.jp.edgesuite.net/*" ] }, [ "blocking", "responseHeaders" ]);
});
wv.addEventListener('loadabort', function(evt) {
	if (!evt.isTopLevel) return;
	if (evt.reason == "ERR_ABORTED") return;
	wv.reload();
});
// Allow screenshots to be downloaded
wv.addEventListener('permissionrequest', function(e) {
	if (e.permission === 'download') {
		e.request.allow();
	}
});

function addCorsHeaders(details) {
	details.responseHeaders.push({
		"name": "Access-Control-Allow-Origin",
		"value": "*"
	});
	return {responseHeaders: details.responseHeaders};
}
