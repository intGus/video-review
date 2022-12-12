//javascript file
var tag = document.createElement('script');
tag.id = 'iframe-video';
tag.src = 'https://www.youtube.com/iframe_api';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoId = urlParams.get('v')


fetch("/node/backend/comments/" + videoId)
.then(res => res.json())
.then(data => {
  data.forEach(item => {
    addComment(
      item._id,
      item.user,
      item.timestamp,
      item.timecode, 
      item.comment
    )
  })
})


let user = "";
userAvatar = document.getElementById("userAvatar")

if (localStorage.getItem('user')) {
  user = localStorage.getItem('user');
}

updateAvatar(user, userAvatar);

userAvatar.addEventListener('click', function () {
  updateUser('Enter new username')
})

function updateUser(msg){
  const newUser = prompt(msg, user);
  if (!newUser) {
    return;
  }
  updateAvatar(newUser, userAvatar)
  user = newUser
  return true;
}

function updateAvatar(user, imgContainer) {
  localStorage.setItem('user', user);
  imgContainer.src =  "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=" + encodeURIComponent(user);
}

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('iframe', {
    videoId: videoId,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      'enablejsapi': 1,
      'origin': window.location.host
    },
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

const logList = document.getElementById("log")

function addComment(_id, user, timestamp, timecode, comment) {
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
  dateSpan.textContent = timestamp;
  commentHeader.appendChild(userImg);
  commentHeader.appendChild(userSpan);
  commentHeader.appendChild(dateSpan);
  li.appendChild(commentHeader);
  const pComment = document.createElement('p');
  pComment.innerHTML = `<span>${timecode}</span> ${comment}`
  const trashcan = document.createElement("div")
  trashcan.classList.add('trashcan')
  const trashcanIcon = document.createElement("i")
  trashcanIcon.classList.add("fa-regular")
  trashcanIcon.classList.add("fa-trash-can")
  trashcan.appendChild(trashcanIcon)
  li.setAttribute("id", _id)
  // trashcan.addEventListener("click", function() {
  //   alert(_id)
  // })
  logList.appendChild(li)
  li.appendChild(pComment);
  li.appendChild(trashcan)
}

comment = document.getElementById("comment")
comment.addEventListener('click', function() {
  player.pauseVideo()
  let timecode = player.getCurrentTime()
  timecode = (timecode.toFixed(2) + "").padStart(5, "0"); //create function
  document.getElementById("timecode").textContent = timecode;
  })

button = document.getElementById("save")

comment.addEventListener("input", function(){
  button.disabled = !this.value;
})



button.addEventListener('click', function() {
  if (!user){
    if (updateUser('Provide a username before leaving a comment') === undefined) {
      return;
    }
  }
    
  let timecode = player.getCurrentTime();
  timecode = (timecode.toFixed(2) + "").padStart(5, "0"); //create function
  let timestamp = '2d';
  const commentDB = {user, timestamp, timecode, comment: comment.value, videoId: "Al_HXSoQ7JI"} //videoId from URL
  fetch("/node/backend/comments", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(commentDB)
  })
  .then(res => res.json())
  .then(data => addComment(data._id, data.user, data.timestamp, data.timecode, data.comment));

  document.getElementById("timecode").textContent = '--:--'
  comment.value = ''
  button.disabled = true
})

logList.addEventListener('click', function(e){
  if (e.target.nodeName === "I"){
    const commentId = e.target.parentNode.parentNode.id
    fetch(("/node/backend/comments/" + commentId), {
      method: "DELETE"
    })
    .then( function(res) {
      if (res.ok){
        e.target.parentNode.parentNode.remove()
      }
      console.log(res)
    })
    // console.log(e.target.parentNode.parentNode.id)
  } else {
  let timecode = e.target.closest("[data-timecode]").dataset.timecode;
  player.seekTo(timecode);
  }
})

modalContainer = document.getElementById('modal-container');
modalOverlay = document.getElementById('modal-overlay');
modalOverlay.addEventListener('click', function(){
  modalContainer.classList.add('hidden')
  // modalContainer.remove()
})
