key = "41696c40f269771ef773aebeb0d53975bae68c0124ad8af4b853ce90965d0c04"
secret = "6eb789f3f2fff356e0a84e31aa3fbd82fcd019edd8dcf33808157d0746ebaa04"

var base_url = "https://api.producthunt.com/v1/"
var token_url = base_url +"oauth/token"
var today_post_url = base_url + "posts"


function get_token(){
  var token = '';

  $.ajax({
    url: token_url,
    type: "POST",
    async: false,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
        "client_id": key,
        "client_secret": secret,
        "grant_type": 'client_credentials'
      },
    success: (function(res) {
        token = res.access_token;
    })
  });

    return (token);
}
var token = get_token();
const producthunt = function(node) {
  const images = [...node.getElementsByClassName('js-tweet-text-container')];

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
          var ratelimit = request.getResponseHeader("X-Rate-Limit-Remaining");
          if(ratelimit == 0){

            for (let el of document.querySelectorAll('.loading')) el.innerHTML = 'Wait for 15 Min';
          }
            else if (request.readyState === 4) {
                if (request.status === 200) {
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
      request.setRequestHeader("Authorization", "Bearer "+token);
      request.send();
    }
  }

  });

};

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
  mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                producthunt(node);
            }
        });
        });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

producthunt(document.body);
