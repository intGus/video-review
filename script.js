//javascript file
var tag = document.createElement('script');
tag.id = 'iframe-video';
tag.src = 'https://www.youtube.com/iframe_api';

fetch("http://192.168.1.100:3000/backend/comments")
.then(res => res.json())
.then(data => {
  data.forEach(item => {
    addComment(
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

function addComment(user, timestamp, timecode, comment) {
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
  logList.appendChild(li)
  li.appendChild(pComment);
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
  const commentDB = {user, timestamp, timecode, comment: comment.value}
  fetch("http://192.168.1.100:3000/backend/comments", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(commentDB)
  })
  .then(res => console.log(res.json()))
  addComment(user, timestamp, timecode, comment.value);

  document.getElementById("timecode").textContent = '--:--'
  comment.value = ''
  button.disabled = true
})

logList.addEventListener('click', function(e){
  let timecode = e.target.closest("[data-timecode]").dataset.timecode;
  player.seekTo(timecode);
})