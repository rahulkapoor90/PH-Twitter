function audioNotification(){
    var yourSound = new Audio('notification.mp3');
    yourSound.play();
}

chrome.runtime.onMessage.addListener(function(request, sender, response){
    switch (request.type) {
        case "ratelimit":
            ratelimit(request);
            break;
        case "gettoken":
            gettoken(request);
    }
});

var ratelimit = function(data){
    var opt2 = {
  type: "basic",
  title: "Rate Limit Notification",
  message: "Hey! Rate limit is about to be reached. You will have to wait for about 15 minutes.",
  iconUrl: chrome.extension.getURL('logo64.png')
}
    chrome.notifications.create(opt2);
}

var gettoken = function(data){
    var opt1 = {
  type: "basic",
  title: "Need Access Token",
  message: "Hey! In order to work extension needs access token. Go to options page in Extensions settings to set it.",
  iconUrl: chrome.extension.getURL('logo64.png')
}
    audioNotification();
    chrome.notifications.create(opt1);
}

function install_notice() {
    if (localStorage.getItem('install_time'))
        return;

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    var options = chrome.extension.getURL('options.html');
    chrome.tabs.create({url: options});
var opt = {
  type: "basic",
  title: "Hello Friend!",
  message: "Thank You for installing PH Twitter. In order to Work enter Access Token here.",
  iconUrl: chrome.extension.getURL('logo128.png')
}
    audioNotification();
    chrome.notifications.create(opt);
}
install_notice();
