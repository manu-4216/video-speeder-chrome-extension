var videoElem;

// Receive message:
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  if(request.action == "PLAYBACK_CHANGE"){

    var playbackRate = request.playbackRate;

    videoElem = document.querySelector('video');

    if (videoElem) {
      videoElem.playbackRate = playbackRate;
      videoElem.classList.add('video--selected');
    } else {
      // Send mesage back:
      chrome.runtime.sendMessage({ action: "VIDEO_NOT_FOUND" });
    }
  }
})
