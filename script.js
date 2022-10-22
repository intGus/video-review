//javascript file
var tag = document.createElement('script');
tag.id = 'iframe-video';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
  console.log('calling youtubeiframe')
  player = new YT.Player('iframe', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
}
function onPlayerReady(event) {
  
}
function onPlayerStateChange(event) {
;
}
logDiv = document.getElementById("log")
text = document.getElementById("comment")
text.addEventListener('click', function() {
  player.pauseVideo()
  })

button = document.getElementById("save")
button.addEventListener('click', function() {
  var timestamp = player.getCurrentTime()
  let logged = document.createElement("div")
  logged.setAttribute("id", timestamp)
  logged.textContent = `${comment.value} at ${timestamp}`
  logDiv.appendChild(logged)
  comment.value = ''
})
logDiv.addEventListener('click', function(e){
  timecode = e.target.id
  player.seekTo(timecode)
})