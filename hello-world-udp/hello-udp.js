window.addEventListener('load', function() {
  output("onload!");

  chrome.socket.create('udp', {}, function(createInfo) {
  	bound_socket = createInfo['socketId'];
    chrome.socket.bind(bound_socket, "0.0.0.0", 535353, function(result) {
      if (result) {
        output("Could not bind udp socket " + bound_socket + " result " + result);
        callback(null);
      } else {
        output("Bound to " + bound_socket);
      }
    });
  });

  setInterval(tick, 250);
  function tick() {
  	chrome.socket.recvFrom(bound_socket, function(info) {
  		if (info.data.byteLength)
  			output("received: " + info.data.byteLength + " " + info.data);
  	});
  };
});

function output(innerHTML) {
  output_ul = document.getElementById("output");
  li = document.createElement("li");
  li.innerHTML = innerHTML;
  output_ul.appendChild(li)
}