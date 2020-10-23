;(function (window, undefined){
    var searchBtn = document.getElementById("btnSearch");
    
    function getNodeText(node){//xml 处理用
        if(window.ActiveXObject){//IE
            return node.text;
        }
        else{//其他
            if(node.nodeType == 1){
                return node.textContent;
            }
        }
    }
    
    searchBtn.onclick = function(){
        var city = '';
        city = document.search.cityToSearch.value;
        //维基百科api
        var Wiki_ajax =  new XMLHttpRequest;
        Wiki_Url = 'https://cors-anywhere.herokuapp.com/zh.wikipedia.org/w/api.php?action=query&list=search&srsearch='+city+'市&format=json&formatversion=2'
        Wiki_ajax.open('GET', Wiki_Url);
        Wiki_ajax.send(); 
        Wiki_ajax.onreadystatechange = function () {
            if (Wiki_ajax.readyState==4&&Wiki_ajax.status==200) {
                // json 对象的处理
                console.log(Wiki_ajax.responseText);
    
                // 转化为 js对象
                var jsObj = JSON.parse(Wiki_ajax.responseText);
                console.log(jsObj);
    
                var str = '';
                str+='<ul>';
                str+='<p>'+jsObj.query.search[0].snippet+'...'+'</li>';
                str+='<a href="https://zh.wikipedia.org/zh-hans/'+ city +'市">'+'维基百科'+'</a>'
                str+='</ul>';
    
                document.querySelector('wiki').innerHTML = str;
            }
        }
        //天行数据api
        var Air_ajax =  new XMLHttpRequest;
        Air_Key = '6b3310d6a25b188affc921e9f07845b7'
        Air_Url = "http://api.tianapi.com/txapi/aqi/index?key="+ Air_Key +"&area=" + city       
        Air_ajax.open('GET', Air_Url);
        Air_ajax.send(); 
        Air_ajax.onreadystatechange = function () {
            if (Air_ajax.readyState==4&&Air_ajax.status==200) {
                // json 对象的处理
                console.log(Air_ajax.responseText);
    
                // 转化为 js对象
                var jsObj = JSON.parse(Air_ajax.responseText);
                console.log(jsObj);
    
                var str = '';
                str+='<ul>';
                str+='<p>'+'pm2_5：'+jsObj.newslist[0].pm2_5+'</p>';
                str+='<p>'+'首要污染物：'+jsObj.newslist[0].primary_pollutant+'</p>';
                str+='<p>'+'空气质量指数：'+jsObj.newslist[0].aqi+'</p>';
                str+='<p>'+'空气质量指数类别：'+jsObj.newslist[0].quality+'</p>';
                str+='<p>'+'更新时间：'+jsObj.newslist[0].time+'</p>';
                str+='</ul>';
                str+='（数据来自<a href="https://www.tianapi.com/">天行数据<a>)';
    
                document.querySelector('air').innerHTML = str;
            }
        }
        //和风天气api
        var Weather_ajax =  new XMLHttpRequest;
        Weather_Key = 'e52a94e351194d439cc2d7a46095551b'
        Weather_Url = "https://free-api.heweather.com/s6/weather?location=" + city + "&key=" + Weather_Key       
        Weather_ajax.open('GET', Weather_Url);
        Weather_ajax.send(); 
        Weather_ajax.onreadystatechange = function () {
            if (Weather_ajax.readyState==4&&Weather_ajax.status==200) {
                // json 对象的处理
                console.log(Weather_ajax.responseText);
    
                // 转化为 js对象
                var jsObj = JSON.parse(Weather_ajax.responseText);
                console.log(jsObj);
    
                var str = '';
                str+='<ul>';
                str+='<p>'+'地区：'+jsObj.HeWeather6[0].basic.location+' 日期：'+jsObj.HeWeather6[0].daily_forecast[0].date+'</p>';
                str+='<p>'+'温度：'+jsObj.HeWeather6[0].daily_forecast[0].tmp_min+'~'+jsObj.HeWeather6[0].daily_forecast[0].tmp_max+'</p>';
                str+='<p>'+'天气：'+jsObj.HeWeather6[0].daily_forecast[0].cond_txt_d+'~'+jsObj.HeWeather6[0].daily_forecast[0].cond_txt_n+'</p>';
                str+='<p>'+'风向：'+jsObj.HeWeather6[0].daily_forecast[0].wind_dir+',风力：'+jsObj.HeWeather6[0].daily_forecast[0].wind_sc+'级'+'</p>';
                str+='</ul>';
                str+='（数据来自<a href="https://www.qweather.com/">和风天气<a>)';
    
                document.querySelector('weather').innerHTML = str;
            }
        }
        //高德地图api
        var Tourism_ajax =  new XMLHttpRequest;
        Tourism_Key = 'f198a60dbe2343cf44ad13fdb307b939'
        Tourism_Url = 'https://restapi.amap.com/v3/place/text?keywords=景点&city='+city+'&output=xml&offset=10&page=1&key='+Tourism_Key+'&extensions=all'        
        Tourism_ajax.open('GET', Tourism_Url);
        Tourism_ajax.send(); 
        Tourism_ajax.onreadystatechange = function () {
            if (Tourism_ajax.readyState==4&&Tourism_ajax.status==200) {
                //xml 对象的处理
                var data = Tourism_ajax.responseXML;
                var res = data.getElementsByTagName('response')[0];
                console.log(res);
                var pois = res.getElementsByTagName('pois')[0];
                console.log(pois);
                var poi = res.getElementsByTagName('poi');
                var str = '<ul>';
                for(var i=0;i<poi.length;i++){
                    var Npoi = poi[i];
                    var name = Npoi.getElementsByTagName('name')[0];
                    var addr = Npoi.getElementsByTagName('address')[0];
                    str += '<li>'+getNodeText(name)+'———<a href="https://zh.wikipedia.org/zh-cn/'+ getNodeText(name) +'">维基百科</a>&nbsp&nbsp地址：'+getNodeText(addr)+'</li>';
                }
                str += '</ul>'
                str  += '<tr><td>（数据来自<a href="https://lbs.amap.com/">高德地图</a>）</td></tr>' 
                document.querySelector('tourism').innerHTML = str;
            }
        }
        // 百度地图API
        var map = new BMap.Map("container");            // 创建Map实例
        map.centerAndZoom(city, 9);
        window.openInfoWinFuns = null;
        map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
        map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
        map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
        map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
    }
})(window, undefined);


// Made by 1853444 崔鑫宇  
// Date：  10/23/2020