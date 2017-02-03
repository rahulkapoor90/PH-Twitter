const producthunt = function() {

  const images = [...document.getElementsByClassName('js-tweet-text-container')];

  images.forEach(function(el) {
    var productname,total_votes;
    //sel.style.display = 'none';
    var links = el.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
    var link = (links[i].title);
    var li = link.split('/');
    var query = li[li.length-2];
    var domain = li[li.length-3];
    if(query == "posts" && domain == "www.producthunt.com"){
      productname = li[li.length-1];
      let loading = "<ul class='loading'>Loading...</ul>";
      el.insertAdjacentHTML('afterend', loading);
      var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var ratelimit = request.getResponseHeader("X-Rate-Limit-Remaining");
                    if(ratelimit == 200){
                    chrome.runtime.sendMessage({"type": "ratelimit", "data": "rahul"});
                  }
                    var data = JSON.parse(request.responseText);
                    total_votes = data.posts[0].votes_count;
                    var featured = data.posts[0].featured;
                    var comments = data.posts[0].comments_count;
                    var fe,vot;
                    if(total_votes > 100){
                      vot = "💯";
                    }
                    else {
                      vot = "⬆️";
                    }
                    if(featured == true){
                      fe = "✔️";
                    }
                    else {
                      fe = "❌";
                    }
                    for (let el of document.querySelectorAll('.loading')) el.style.visibility = 'hidden';
                    let html = "<ul class='producthunt'>"+vot+" "+total_votes+" ✍"+comments+" "+fe+"</ul>";
                      el.insertAdjacentHTML('afterend', html);
                }
            }
        };
      request.open("GET", "https://api.producthunt.com/v1/posts/all?search%5Bslug%5D="+productname , true);
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Content-Type", "application/json");
      chrome.storage.sync.get({
    phtoken : ""
  }, function(items) {
     var token = items.phtoken;
     if(token != ''){
      request.setRequestHeader("Authorization", "Bearer "+token);
      request.send();
    }
      });
    }
  }

  });

};
chrome.storage.sync.get({
phtoken : ""
}, function(items) {
var token = items.phtoken;
if(token==''){
 chrome.runtime.sendMessage({"type": "gettoken", "data": "rahul"});
}
});

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        producthunt();
    });
});

const config = { attributes: true, childList: true, characterData: false }

observer.observe(document.body, config);

producthunt();
