var videos = [];
var playbackRate = 1;
var videosDom = [];
var isMouseDown = false;

var slider = document.querySelector('.slider');
var alert = document.querySelector('.info');
var value = document.querySelector('.value');

function renderValue(statusText) {
  value.textContent = statusText;
}

function handleChange(e) {
  playbackRate = e.target.value;
  var formatedValue = parseFloat(Math.round(playbackRate * 10) / 10).toFixed(1);

  if (isMouseDown) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, { action: "PLAYBACK_CHANGE", playbackRate: formatedValue });
    });
    renderValue(formatedValue);
  }
}

document.addEventListener('DOMContentLoaded', function() {

  slider.addEventListener('mousedown', () => isMouseDown = true);
  slider.addEventListener('mouseup', () => isMouseDown = false);
  slider.addEventListener('change', (e) => {
    isMouseDown = true;
    handleChange(e);
  });
  slider.addEventListener('mousemove', handleChange);
});


// Receive message:
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  if(request.action == "VIDEO_NOT_FOUND"){
      alert.innerText = 'No video found';
      alert.classList.add('text--alert');
  }
})
