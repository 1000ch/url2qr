// popup.html の DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  var message = {};
  var img = document.querySelector('#js-img');
  var input = document.querySelector('#js-input');

  chrome.runtime.sendMessage(message, function responseCallback(response) {

    var array = [];
    array.push('chs=500x500');
    array.push('cht=qr');
    array.push('chl=' + encodeURIComponent(response.tabUrl));

    img.src = 'https://chart.googleapis.com/chart?' + array.join('&');
    input.value = response.tabUrl;
    document.removeChild(spinner);
  });
});