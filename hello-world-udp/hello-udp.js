window.addEventListener('load', function() {
  output("onload!");

  chrome.socket.create('udp', {}, function(createInfo) {
  	bound_socket = createInfo['socketId'];
    chrome.socket.bind(bound_socket, "0.0.0.0", 535353, function(result) {
      if (result) {
        output("Could not bind udp socket " + bound_socket + " result " + result);
      } else {
        output("Bound to " + bound_socket);
        queue_recvFrom();
      }
    });
  });
});

function queue_recvFrom() {
  chrome.socket.recvFrom(bound_socket, data_received);
};
function data_received(info) {
  if (info.data.byteLength)
    output("received: " + info.data.byteLength + " " + info.data);
  queue_recvFrom();
};

function output(innerHTML) {
  output_ul = document.getElementById("output");
  li = document.createElement("li");
  li.innerHTML = innerHTML;
  output_ul.appendChild(li)
}