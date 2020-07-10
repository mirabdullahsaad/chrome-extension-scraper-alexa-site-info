function hello() {
	chrome.tabs.executeScript({file: "jquery.min.js"}, function(){
		chrome.tabs.executeScript({code:"var shop_url = '"+document.getElementById('shop_name').value+"';"});
        chrome.tabs.executeScript({file: "alert.js"});
    }); 
}

var myVar = '';
function counter(){
    myVar = setInterval(function(){ 
        var data = {shop_url:document.getElementById('shop_name').value};
        http_post_request('https://saad.eastus.cloudapp.azure.com/scrapper.php/?count_shops=true&shop_url='+document.getElementById('shop_name').value,data,'return_from_counter');
    }, 3000);
}
function hello1() {
    var data = ''
    http_post_request('https://saad.eastus.cloudapp.azure.com/scrapper.php/?change_meta=true&name=status&value=1',data,'return_from_hello1');
}

function return_from_hello1(res){
    console.log(res);
    clearInterval(myVar);
    document.getElementById('counter').innerHTML =  document.getElementById('counter').innerHTML + '<br>Scrapping stopped.';
}
function return_from_counter(res){
    document.getElementById('counter').innerHTML = 'Scrapped '+ res.trim() + ' shops already!';
}

function http_post_request( url, data, callback, params ) {
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }else{// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            //callback with response
            window[callback](xmlhttp.responseText, params);
        }
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}
function download_data(){
  var val = document.getElementById('shop_name').value;
  if (val == '') {
      alert("Shop urls can't be blank");
  }else{
     window.open('https://saad.eastus.cloudapp.azure.com/scrapper.php/?download=true&shop_url='+document.getElementById('shop_name').value,'_blank');
  }
}

function return_from_download_data(){
    alert('Download finished');
}

document.getElementById('clickme').addEventListener('click', hello);
document.getElementById('clickme').addEventListener('click', counter);
document.getElementById('stopme').addEventListener('click', hello1);
document.getElementById('download_for_this_shops').addEventListener('click', download_data);

