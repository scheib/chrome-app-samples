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
        send_ping();
      }
    });
  });

  // Development hack --- kill off all sockets!
  document.body.onkeydown = function (e) { 
    output("chrome.socket.destroy(bound_socket);");
    chrome.socket.destroy(bound_socket);
    output("chrome.socket.destroy(i);");
    for (var i=0; i<100; i++) {
      chrome.socket.destroy(i);
    }
  }
});

function output(innerHTML) {
  output_ul = document.getElementById("output");
  li = document.createElement("li");
  li.innerHTML = innerHTML;
  output_ul.appendChild(li)
}

function queue_recvFrom() {
  chrome.socket.recvFrom(bound_socket, data_received);
};
function data_received(info) {
  if (info.data.byteLength)
    output("received: " + info.data.byteLength + " " + info.data);
  console.log(info);
  queue_recvFrom();
};

function send_ping() {
  var uint_array = new Uint8Array(new ArrayBuffer(1));
  uint_array[0] = 1;

  chrome.socket.sendTo(bound_socket, uint_array.buffer, '224.0.0.251', 535353, function(writeInfo) {
    if (writeInfo.bytesWritten != uint_array.byteLength) {
      output('could not write DNS packet.');
    }
  });
}
