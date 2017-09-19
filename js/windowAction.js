function onResize() {
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var fl = document.getElementById("pfgLayer");
    var ifr = document.getElementById("iframe");
    if (fl == null) return;
    if (w>h) {
        fl.style.width = "80%";
        fl.style.height = "80%";
        fl.style.top = "10%";
        fl.style.left = "10%";
        ifr.style.width = "96%";
        ifr.style.height = "96%";
        ifr.style.top = "2%";
        ifr.style.left = "2%";
    } else {
        fl.style.width = "90%";
        fl.style.height = "90%";
        fl.style.top = "5%";
        fl.style.left = "5%";
        ifr.style.width = "98%";
        ifr.style.height = "98%";
        ifr.style.top = "1%";
        ifr.style.left = "1%";
    }
}