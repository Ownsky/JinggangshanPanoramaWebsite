// importScripts("https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js");

if (navigator.userAgent.toLowerCase().indexOf('edge') >=0) {
    alert("暂不支持edge浏览器。");
}

var map = new BMap.Map("map-container");          // 创建地图实例 , {mapType: BMAP_SATELLITE_MAP}
map.setMapStyle({       //清除地图自带兴趣点
    styleJson:[
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }
    ]
});

var ctX = 0, ctY = 0;

var viewpoints = [
    [new BMap.Point(114.170992,26.588404), "全国青少年井冈山革命传统教育基地", "http://720yun.com/t/d3ejzskwrO6"],
    [new BMap.Point(114.137737,26.570752), "大井景区", "http://720yun.com/t/485jzgwuta4"],
    [new BMap.Point(113.958616,26.711592), "井冈山会师纪念馆", "http://720yun.com/t/x79r86lnayu8wlorh3"],
    [new BMap.Point(114.058381,26.668105), "井冈山茅坪八角楼", "http://720yun.com/t/6l5o4m97qysrmdjnhj"],
    [new BMap.Point(114.128534,26.626656), "井冈山黄洋界景区", "http://720yun.com/t/qq36olz558s7w6mj09"],
    [new BMap.Point(114.150598,26.596779), "井冈山龙潭景区", "http://720yun.com/t/l529eny72nu6e3rnc6"]
];

//计算中点位置
for (var x in viewpoints) {
    ctX += viewpoints[x][0].lng;
    ctY += viewpoints[x][0].lat;
}
ctX /= viewpoints.length;
ctY /= viewpoints.length;
ctY += 0.05;

var centerPoint = new BMap.Point(ctX, ctY);  // 创建中点坐标
map.centerAndZoom(centerPoint, 12);                 // 初始化地图，设置中心点坐标和地图级别
map.setMinZoom(10);
map.enableScrollWheelZoom();



for (var i = 0; i < viewpoints.length; i++) {
    var marker = new BMap.Marker(viewpoints[i][0]);
    var label = new BMap.Label(viewpoints[i][1], {offset:new BMap.Size(20,-10)});
    label.setStyle({
        backgroundColor :"0",
        border :"0"
    });
    marker.setLabel(label);
    marker.setTitle(i);
    marker.addEventListener("click", function (e) {
        var content = '<h4 class="innerTitle">'+viewpoints[this.getTitle()][1]+'</h4>\n' +
            '<hr style="height:1px;border:none;border-top:1px solid #aaaaaa;margin-top: 10px;margin-bottom:10px;" />\n' +
            '<div class="innerImg-container" align="center">\n' +
            '    <img src="./img/'+this.getTitle()+'.png" height="110"/>\n' +
            '</div>\n' +
            '    <p align="center">\n' +
            // '        <button id="introduce" attr="'+this.getTitle()+'" class="btn btn-default" style="margin: 10px" onclick="intro(this)">' +
            // '景点简介</button>\n' +
            '        <button id="panorama" attr="'+this.getTitle()+'" class="btn btn-default" style="margin: 10px" onClick="showPanorama(this)">' +
            '查看全景</button>\n' +
            '    </p>\n';// +
        var opts = {
            width : 300,     // 信息窗口宽度
            height: 200     // 信息窗口高度
            // title : this.getTitle()  // 信息窗口标题
        };
        var infowin = new BMap.InfoWindow(content, opts);
        this.openInfoWindow(infowin);
    });
    map.addOverlay(marker);
}

function showPanorama(name) {
    var attr = name.attributes['attr'].nodeValue;
    var url = viewpoints[attr][2];
    if (url.length == 0)
        alert("尚未拍摄，敬请期待！");
    else {
        var winw = document.body.clientWidth;
        var winh = document.body.clientHeight;

        var pLayer = document.getElementById("panoramaLayer");
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "iframe");
        iframe.setAttribute("src", url);
        iframe.setAttribute("frameBorder", "no");
        iframe.className = "pLayer";

        var img = document.createElement("img");
        img.setAttribute("src", "img/close.png");
        img.setAttribute("onClick", "closePanorama()");
        img.className = "closeBtn";

        var pbg = document.createElement("div");
        pbg.setAttribute("id", "pbgLayer");
        pbg.className = "backgroundLayer";

        var pfg = document.createElement("div");
        pfg.setAttribute("id", "pfgLayer");
        pfg.className = "floatLayer";
        // pfg.style.left = winw / 2 - 375;
        // pfg.style.top = winh / 2 - 275;
        pfg.appendChild(iframe);
        pfg.appendChild(img);

        pbg.appendChild(pfg);
        pLayer.appendChild(pbg);

        onResize();
    }
        // window.location.href=url;
}

function closePanorama() {
    document.getElementById("panoramaLayer").removeChild(document.getElementById("pbgLayer"));
}