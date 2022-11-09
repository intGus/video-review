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

function addComment(user, timestamp, timecode, comment) {
  const logList = document.getElementById("log")
  const li = document.createElement("li")
  li.dataset.timecode = timecode;
  li.classList.add('comment-item');
  const commentHeader = document.createElement("div")
  commentHeader.classList.add('comment-header')
  const userImg = document.createElement("img")
  userImg.classList.add('avatar', 'mr-2')
  userImg.src = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=" + encodeURIComponent(user)
  const userSpan = document.createElement('span')
  userSpan.textContent = user;
  userSpan.classList.add('mr-2');
  const dateSpan = document.createElement('span')
  dateSpan.textContent = timestamp; //datetime now
  commentHeader.appendChild(userImg);
  commentHeader.appendChild(userSpan);
  commentHeader.appendChild(dateSpan);
  li.appendChild(commentHeader);

  const pComment = document.createElement('p');
  pComment.innerHTML = `<span>${timecode}</span> ${comment.value}`
  logList.appendChild(li)
  li.appendChild(pComment);
  
  

}

text = document.getElementById("comment")
text.addEventListener('click', function() {
  player.pauseVideo()
  let timecode = player.getCurrentTime()
  timecode = (timecode.toFixed(2) + "").padStart(5, "0");
  document.getElementById("timecode").textContent = timecode;
  })

button = document.getElementById("save")
button.addEventListener('click', function() {
  let timecode = player.getCurrentTime()
  timecode = (timecode.toFixed(2) + "").padStart(5, "0");
  let timestamp = '3d'
  let 

  document.getElementById("timecode").textContent = '--:--'
  comment.value = ''
  
  // const li = document.createElement("li")
  // li.dataset.timecode = timecode;
  // li.classList.add('comment-item');
  
  // const commentHeader = document.createElement("div")
  // commentHeader.classList.add('comment-header')
  // const userImg = document.createElement("img")
  // userImg.classList.add('avatar', 'mr-2')
  // userImg.src = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true"
  // const userSpan = document.createElement('span')
  // userSpan.textContent = 'John Doe';
  // userSpan.classList.add('mr-2');
  // const dateSpan = document.createElement('span')
  // dateSpan.textContent = '3d'; //datetime now
  // commentHeader.appendChild(userImg);
  // commentHeader.appendChild(userSpan);
  // commentHeader.appendChild(dateSpan);
  // li.appendChild(commentHeader);

  // const pComment = document.createElement('p');
  // pComment.innerHTML = `<span>${timecode}</span> ${comment.value}`
  // logList.appendChild(li)
  // li.appendChild(pComment);
  // comment.value = ''
  // document.getElementById("timecode").textContent = '--:--'
})
logList.addEventListener('click', function(e){
  let timecode = e.target.closest("[data-timecode]").dataset.timecode;
  player.seekTo(timecode);
})