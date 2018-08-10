var req = new XMLHttpRequest();
req.open("GET","",true);
req.onload = sci2ools;
req.send();

function sci2ools() {
  var i = document.createElement("iframe");
  i.src = "http://www.sciweavers.org/utilschrome";
  i.scrolling = "no";
  i.frameborder = "0";
  i.width = "615px";
  i.height = "495px";
  document.body.appendChild(i);
}

