chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		id: 'milihimeViewer',
		innerBounds: {
			minWidth: 1024,
			minHeight: 660,
			maxWidth: 1024,
			maxHeight: 660
		},
        frame: 'none',
		state: 'normal',
		resizable: false,
	});
	chrome.app.window.get('milihimeViewer').focus();
});
