// Variables
var hiddenWindow = null;

// Log events:

document.onwebkitfullscreenchange = function () {
  console.log("onwebkitfullscreenchange");
}

document.onwebkitfullscreenerror = function () {
  console.log("onwebkitfullscreenerror");
}

// Button handlers:

document.getElementById('enter').onclick = function(e) {
  document.body.webkitRequestFullscreen();
};

document.getElementById('exit').onclick = function(e) {
  document.webkitExitFullscreen();
};

document.getElementById('newWindow').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'normal'});
};

document.getElementById('newWindowFullscreen').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen'});
};

document.getElementById('newWindowFullscreenHidden').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen', hidden: true},
    function (createdWindow) {
      hiddenWindow = createdWindow;
    }
  );
};

document.getElementById('showHidden').onclick = function(e) {
  if (hiddenWindow) {
    hiddenWindow.show();
  }
};


// Attempt fullscreen on window creation.
// It will fail, but hopefully some day it won't:
// http://code.google.com/p/chromium/issues/detail?id=164624
document.body.webkitRequestFullscreen();

