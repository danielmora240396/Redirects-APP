// jshint ignore: start
chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var newURL = "html/index.html";
  chrome.tabs.create({ url: newURL });
});