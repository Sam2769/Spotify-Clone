console.log("welcome to Spotify");

// variables
let song_index = 0;
let audioElement = new Audio("songs/0.mp3");
let myProgressBar = document.getElementById("myProgressBar");
let masterPlay = document.getElementById("masterPlay");
let gif = document.getElementById("gif");

let masterSongName = document.getElementById("masterSongName");
let small_symbolArray = [];

small_symbolArray = Array.from(document.getElementsByClassName("songItemPlay"));
console.log(small_symbolArray);

let songs_array = [
  {
    songName: "Kamlee",
    filePath: "songs/0.mp3",
    coverPath: "images/kk_songimg_1.jpg",
  },
  {
    songName: "One Love",
    filePath: "songs/1.mp3",
    coverPath: "images/kk_songimg_2.jpg",
  },
  {
    songName: "King Shit",
    filePath: "songs/2.mp3",
    coverPath: "images/kk_songimg_3.jpg",
  },
  {
    songName: "Winning Speech",
    filePath: "songs/3.mp3",
    coverPath: "images/kk_songimg_4.jpg",
  },
  {
    songName: "Kasoor",
    filePath: "songs/4.mp3",
    coverPath: "images/kk_songimg_5.jpg",
  },
  {
    songName: "With You",
    filePath: "songs/5.mp3",
    coverPath: "images/kk_songimg_6.jpg",
  },
  {
    songName: "Naina",
    filePath: "songs/6.mp3",
    coverPath: "images/kk_songimg_7.jpg",
  },
  {
    songName: "Yimmy Yimmy",
    filePath: "songs/7.mp3",
    coverPath: "images/kk_songimg_8.jpg",
  },
  {
    songName: "Akhiyan Gulaab",
    filePath: "songs/8.mp3",
    coverPath: "images/kk_songimg_9.jpg",
  },
  {
    songName: "Mayya Mayya",
    filePath: "songs/9.mp3",
    coverPath: "images/kk_songimg_10.jpg",
  },
];

// Listen to Events

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeItemPlay(song_index, 1);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    makeItemPause(song_index, 0);
  }
});

audioElement.addEventListener("timeupdate", () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

// IMPORTANT METHODS  *************************
// *********************************************

// PAUSE = ||
// PLAY = >
const makeItemPause = (index, opacityVal) => {
  let e = small_symbolArray[index];
  gif.style.opacity = opacityVal;

  e.classList.remove("fa-circle-pause");
  e.classList.add("fa-circle-play");
};

const makeItemPlay = (index, opacityVal) => {
  let e = small_symbolArray[index];
  gif.style.opacity = opacityVal;

  e.classList.remove("fa-circle-play");
  e.classList.add("fa-circle-pause");
};

const makeMasterPlay = () => {
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
};

const makeMasterPause = () => {
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
};

// **************************************************
// ****************************************************

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.currentTime > 0 && e.target.id == song_index) {
        if (audioElement.paused) {
          makeMasterPause();
          makeItemPause(song_index, 1);
          audioElement.play();
        } else {
          makeItemPause(song_index, 1);
          makeMasterPlay();
          audioElement.play();
        }
      }

      if (audioElement.currentTime > 0 && e.target.id == song_index) {
        makeItemPause(song_index, 0);
        audioElement.pause();
        makeMasterPlay();
      } else {
        makeAllPlays();
        song_index = Number.parseInt(e.target.id);
        console.log(e);
        console.log(song_index);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        audioElement.src = `songs/${song_index}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs_array[song_index].songName;

        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (song_index >= 9) {
    song_index = 9;
  } else {
    makeItemPause(song_index, 1);
    song_index += 1;
  }

  audioElement.src = `songs/${song_index}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();

  makeItemPlay(song_index, 1);

  masterSongName.innerText = songs_array[song_index].songName;
});

document.getElementById("previous").addEventListener("click", () => {
  if (song_index <= 0) {
    song_index = 0;
  } else {
    makeItemPause(song_index, 1);
    song_index -= 1;
  }

  audioElement.src = `songs/${song_index}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  makeItemPlay(song_index, 1);
  masterSongName.innerText = songs_array[song_index].songName;
});
console.log(song_index);
