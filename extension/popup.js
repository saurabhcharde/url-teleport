
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var updatedObj = {
                "weburl": url
            };
            var updatedData = JSON.stringify(updatedObj);

            // do update
            $.ajax({
                url: "https://api.myjson.com/bins/15qier",
                type: "PUT",
                data: updatedData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    var json = JSON.stringify(data);
                    $("#data").val(json);
                }
            });
        
    $("#url").html(url);

  });
});
