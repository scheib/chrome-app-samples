window.addEventListener('load', function() {
  output("onload!");
});

function output(innerHTML) {
  output_ul = document.getElementById("output");
  li = document.createElement("li");
  li.innerHTML = innerHTML;
  output_ul.appendChild(li)
}