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

$('#enter').onclick = function(e) {
  document.body.webkitRequestFullscreen();
};

$('#exit').onclick = function(e) {
  document.webkitExitFullscreen();
};

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

$('#fullscreen').onclick = function(e) {
  chrome.app.window.current().fullscreen();
};

$('#maximize').onclick = function(e) {
  chrome.app.window.current().maximize();
};

$('#minimize').onclick = function(e) {
  chrome.app.window.current().minimize();
};

$('#restore').onclick = function(e) {
  chrome.app.window.current().restore();
};

$('#delay-fullscreen').onclick = function(e) {
  setTimeout(chrome.app.window.current().fullscreen, $('#delay-slider').value);
};

$('#delay-maximize').onclick = function(e) {
  setTimeout(chrome.app.window.current().maximize, $('#delay-slider').value);
};

$('#delay-minimize').onclick = function(e) {
  setTimeout(chrome.app.window.current().minimize, $('#delay-slider').value);
};

$('#delay-restore').onclick = function(e) {
  setTimeout(chrome.app.window.current().restore, $('#delay-slider').value);
};

$('#delay-hide').onclick = function(e) {
  setTimeout(chrome.app.window.current().hide, $('#delay-slider').value);
};

$('#delay-show').onclick = function(e) {
  setTimeout(chrome.app.window.current().show, $('#delay-slider').value);
};

updateDelaySiderText = function () {
  $('#delay-label').innerText = "Delay " + $('#delay-slider').value / 1000 + " seconds:";
}

$('#delay-slider').onchange = updateDelaySiderText;
updateDelaySiderText();  // Initial text update.

// Attempt fullscreen on window creation.
// It will fail, but hopefully some day it won't:
// http://code.google.com/p/chromium/issues/detail?id=164624
document.body.webkitRequestFullscreen();

