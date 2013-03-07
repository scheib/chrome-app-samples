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

document.querySelector('#enter').onclick = function(e) {
  document.body.webkitRequestFullscreen();
};

document.querySelector('#exit').onclick = function(e) {
  document.webkitExitFullscreen();
};

document.querySelector('#newWindow').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'normal'});
};

document.querySelector('#newWindowFullscreen').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen'});
};

document.querySelector('#newWindowFullscreenHidden').onclick = function(e) {
  chrome.app.window.create('window.html', { state: 'fullscreen', hidden: true},
    function (createdWindow) {
      hiddenWindow = createdWindow;
    }
  );
};

document.querySelector('#showHidden').onclick = function(e) {
  if (hiddenWindow) {
    hiddenWindow.show();
  }
};

document.querySelector('#fullscreen').onclick = function(e) {
  chrome.app.window.current().fullscreen();
};

document.querySelector('#maximize').onclick = function(e) {
  chrome.app.window.current().maximize();
};

document.querySelector('#minimize').onclick = function(e) {
  chrome.app.window.current().minimize();
};

document.querySelector('#restore').onclick = function(e) {
  chrome.app.window.current().restore();
};

document.querySelector('#delay-fullscreen').onclick = function(e) {
  setTimeout(chrome.app.window.current().fullscreen, 3000);
};

document.querySelector('#delay-maximize').onclick = function(e) {
  setTimeout(chrome.app.window.current().maximize, 3000);
};

document.querySelector('#delay-minimize').onclick = function(e) {
  setTimeout(chrome.app.window.current().minimize, 3000);
};

document.querySelector('#delay-restore').onclick = function(e) {
  setTimeout(chrome.app.window.current().restore, 3000);
};

document.querySelector('#delay-hide').onclick = function(e) {
  setTimeout(chrome.app.window.current().hide, 3000);
};

document.querySelector('#delay-show').onclick = function(e) {
  setTimeout(chrome.app.window.current().show, 3000);
};



// Attempt fullscreen on window creation.
// It will fail, but hopefully some day it won't:
// http://code.google.com/p/chromium/issues/detail?id=164624
document.body.webkitRequestFullscreen();

