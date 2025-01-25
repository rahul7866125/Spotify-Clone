console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let progressBar = document.getElementById("progressBar");
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSong");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let gif = document.getElementById("gif");

let songs = [
  { songName: "Kusu Kusu", songPath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  {
    songName: "Aankh Marey-Simbaa",
    songPath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Tip Tip Barsa Pani",
    songPath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Paani Paani",
    songPath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Raataan Lambiyaan",
    songPath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Dil Galti Kar Baitha",
    songPath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Baarish Ban Jaana",
    songPath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  { songName: "Dilbar", songPath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Filhall", songPath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "Coca Cola",
    songPath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  makeAllPlays();
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    document.getElementById(`${songIndex + 1}`).classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();

      if (audioElement.paused || audioElement.currentTime <= 0 || songIndex!=parseInt(e.target.id - 1)) {
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        songIndex = parseInt(e.target.id - 1);
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.play();                                //Play a paused song or new song from list.
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        masterSongName.innerText = songs[songIndex].songName;
      } else {
        audioElement.pause();
        gif.style.opacity = 0;                          
        masterPlay.classList.remove("fa-pause-circle");      //Paused a playing song.
        masterPlay.classList.add("fa-play-circle");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex == 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  makeAllPlays();
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  document.getElementById(`${songIndex + 1}`).classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex == 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  makeAllPlays();
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  document.getElementById(`${songIndex + 1}`).classList.add("fa-pause-circle");
});
