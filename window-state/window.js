// Variables:

var hiddenWindowDelay = 3000;

// Helper functions
$ = function(selector) { return document.querySelector(selector); }

// Log events:

document.onwebkitfullscreenchange = function () {
  console.log("onwebkitfullscreenchange");
}

document.onwebkitfullscreenerror = function () {
  console.log("onwebkitfullscreenerror");
}

// Button handlers:

$('#newWindow').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'normal'});
};

$('#newWindowFullscreen').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen'});
};

$('#newWindowFullscreenHidden').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen', hidden: true},
    function (createdWindow) {
      setTimeout(function () { createdWindow.show(); }, hiddenWindowDelay);
    }
  );
};

$('#html-fullscreen-enter').onclick = function(e) {
  $('#fullscreen-area').webkitRequestFullscreen();
};

$('#html-fullscreen-exit').onclick = function(e) {
  document.webkitExitFullscreen();
};

$('#fullscreen').onclick = function(e) {
  setTimeout(chrome.app.window.current().fullscreen, $('#delay-slider').value);
};

$('#maximize').onclick = function(e) {
  setTimeout(chrome.app.window.current().maximize, $('#delay-slider').value);
};

$('#minimize').onclick = function(e) {
  setTimeout(chrome.app.window.current().minimize, $('#delay-slider').value);
};

$('#restore').onclick = function(e) {
  setTimeout(chrome.app.window.current().restore, $('#delay-slider').value);
};

$('#hide').onclick = function(e) {
  setTimeout(chrome.app.window.current().hide, $('#delay-slider').value);
};

$('#show').onclick = function(e) {
  setTimeout(chrome.app.window.current().show, $('#delay-slider').value);
};

updateDelaySiderText = function () {
  $('#delay-label').innerText = $('#delay-slider').value / 1000 + " seconds.";
}

$('#delay-slider').onchange = updateDelaySiderText;
updateDelaySiderText();  // Initial text update.

