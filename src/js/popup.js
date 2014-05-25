document.addEventListener('DOMContentLoaded', function () {

  var message = {};
  var img = document.querySelector('#js-img');
  var input = document.querySelector('#js-input');

  chrome.runtime.sendMessage(message, function responseCallback(response) {

    // build query
    var array = [];
    array.push('chs=500x500');
    array.push('cht=qr');
    array.push('chl=' + encodeURIComponent(response.tabUrl));

    // update img.src
    img.src = 'https://chart.googleapis.com/chart?' + array.join('&');
    input.value = response.tabUrl;
  });
});