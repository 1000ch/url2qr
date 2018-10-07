document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('img');
  const input = document.querySelector('input');

  chrome.runtime.sendMessage({}, ({ tabUrl }) => {
    const url = encodeURIComponent(tabUrl);
    img.src = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${url}`;
    input.value = tabUrl;
  });
});
