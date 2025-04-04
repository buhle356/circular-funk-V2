import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="title">CIRCULAR FUNK</div>
  <div class="top-right">
    <div class="search-bar" onclick="toggleSearch()">Search...</div>
    <input class="search-input" type="text" placeholder="Type to search..." onblur="hideSearch()">
    <a href="https://www.instagram.com/circular_funk/" target="_blank">
      <svg class="instagram-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.418 0 3.833.013 5.17.075 1.334.062 2.036.279 2.513.465.632.246 1.084.538 1.558 1.012.474.474.766.926 1.012 1.558.186.477.403 1.179.465 2.513.062 1.337.075 1.752.075 5.17s-.013 3.833-.075 5.17c-.062 1.334-.279 2.036-.465 2.513-.246.632-.538 1.084-1.012 1.558-.474.474-.926.766-1.558 1.012-.477.186-1.179.403-2.513.465-1.337.062-1.752.075-5.17.075s-3.833-.013-5.17-.075c-1.334-.062-2.036-.279-2.513-.465-.632-.246-1.084-.538-1.558-1.012-.474-.474-.766-.926-1.012-1.558-.186-.477-.403-1.179-.465-2.513-.062-1.337-.075-1.752-.075-5.17s.013-3.833.075-5.17c.062-1.334.279-2.036.465-2.513.246-.632.538-1.084 1.012-1.558.474-.474.926-.766 1.558-1.012.477-.186 1.179-.403 2.513-.465 1.337-.062 1.752-.075 5.17-.075"/>
      </svg>
    </a>
  </div>

  <div class="animation-container">
    <video autoplay loop muted playsinline class="background-animation">
      <source src="/animation.webm" type="video/webm">
    </video>
  </div>

  <div class="ticker-bar">
    <div class="ticker-text">LIVE NOW: Circular Funk streaming funkadelic beats – Contribute, Watch, Groove, Repeat – Follow us on Instagram @circular_funk – </div>
  </div>

  <div class="tabs">
    <div class="tab-button" onclick="showContributeForm()">Magazin</div>
    <div class="tab-button" onclick="showTwitchStream()">Live</div>
    <div class="tab-button" onclick="showCalendar()">Events</div>
    <div class="tab-button" onclick="showArchive()">Archive</div>
    <div class="tab-button" onclick="showMusic()">Music</div>
  </div>

  <div class="content-container" id="twitchStream">
    <iframe
      src="https://player.twitch.tv/embed?channel=circular_funk&parent=${location.hostname}&muted=true"
      height="100%"
      width="100%"
      allowfullscreen>
    </iframe>
  </div>

  <div class="content-container" id="calendarModal">
    <div class="calendar-header" id="calendarMonthYear"></div>
    <div class="calendar-grid" id="calendarDays"></div>
  </div>

  <div class="content-container" id="archiveContainer">
    <iframe 
      class="youtube-container" 
      src="https://www.youtube.com/embed?listType=user_uploads&list=circularfunkk"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>

  <div id="formBox">
    <h4>New Contribution</h4>
    <input type="text" placeholder="Title">
    <textarea placeholder="Description" rows="4"></textarea>
    <select>
      <option>Live Stream</option>
      <option>News</option>
      <option>Ideas</option>
      <option>Projects</option>
      <option>Music</option>
      <option>Calendar</option>
    </select>
    <button>Submit</button>
  </div>

  <div class="content-container" id="musicContainer">
    <div class="webradio-player">
      <button id="playButton">▶️ Play</button>
      <span id="trackInfo">Loading track info...</span>
    </div>
    <audio id="webradio" src="https://stream.laut.fm/circularfunk" preload="none"></audio>
  </div>
`;

// Make functions globally available
window.toggleSearch = function() {
  const input = document.querySelector('.search-input');
  const bar = document.querySelector('.search-bar');
  bar.style.display = 'none';
  input.style.display = 'block';
  input.focus();
};

window.hideSearch = function() {
  const input = document.querySelector('.search-input');
  const bar = document.querySelector('.search-bar');
  input.style.display = 'none';
  bar.style.display = 'block';
};

window.showTab = function(id) {
  document.querySelectorAll('.content-container').forEach(el => el.style.display = 'none');
  document.getElementById('formBox').style.display = 'none';
  const target = document.getElementById(id);
  if (target) target.style.display = 'block';
};

window.showTwitchStream = function() {
  showTab('twitchStream');
};

window.showContributeForm = function() {
  document.querySelectorAll('.content-container').forEach(el => el.style.display = 'none');
  document.getElementById('formBox').style.display = 'block';
};

window.showCalendar = function() { 
  showTab('calendarModal'); 
  generateCalendar(); 
};

window.showArchive = function() { 
  showTab('archiveContainer'); 
};

window.showMusic = function() { 
  showTab('musicContainer'); 
};

function generateCalendar() {
  const daysContainer = document.getElementById("calendarDays");
  const header = document.getElementById("calendarMonthYear");
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const today = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  header.textContent = `${monthNames[month]} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  daysContainer.innerHTML = "";
  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += `<div class='calendar-cell'></div>`;
  }
  for (let d = 1; d <= totalDays; d++) {
    const isToday = d === today ? 'today' : '';
    daysContainer.innerHTML += `<div class='calendar-cell ${isToday}'>${d}</div>`;
  }
}

// Webradio Player Functionality
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("webradio");
  const playButton = document.getElementById("playButton");
  const trackInfo = document.getElementById("trackInfo");

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "⏸ Pause";
    } else {
      audio.pause();
      playButton.textContent = "▶️ Play";
    }
  });

  fetch("https://api.laut.fm/station/circularfunk/current_song")
    .then(res => res.json())
    .then(data => {
      if (data && data.title && data.artist) {
        trackInfo.textContent = `${data.artist} – ${data.title}`;
      }
    })
    .catch(() => {
      trackInfo.textContent = "Currently streaming...";
    });
});