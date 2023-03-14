class Main {
  constructor() {
    if (
      !document.getElementById("js-youtubePc") &&
      !document.getElementById("js-youtubeSp")
    ) {
      return false;
    }
    this.ytIDPc = document.getElementById("js-youtubePc").dataset.ytid;
    this.ytIDSp = document.getElementById("js-youtubeSp").dataset.ytid;

    this.playerPc = "";
    this.playerSp = "";

    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onload = () => {
      this.initYoutube();
    };

    // resize
    if (window.innerWidth >= 751) {
      document.getElementById("js-youtubePc").style.opacity = "1";
      document.getElementById("js-youtubeSp").style.opacity = "0";
    } else {
      document.getElementById("js-youtubePc").style.opacity = "0";
      document.getElementById("js-youtubeSp").style.opacity = "1";
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 751) {
        this.playerPc.playVideo();
        this.playerSp.stopVideo();
        document.getElementById("js-youtubePc").style.opacity = "1";
        document.getElementById("js-youtubeSp").style.opacity = "0";
      } else {
        this.playerSp.playVideo();
        this.playerPc.stopVideo();
        document.getElementById("js-youtubePc").style.opacity = "0";
        document.getElementById("js-youtubeSp").style.opacity = "1";
      }
    });
  }

  initYoutube() {
    // PC
    this.playerPc = new YT.Player("js-youtubePc", {
      videoId: this.ytIDPc,
      playerVars: {
        start: 0,
        rel: 0,
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 0,
        autoplay: 0,
        playsinline: 1,
        loop: 1,
        playlist: this.ytIDPc,
      },
      events: {
        onReady: onPlayerReady,
      },
    });

    // SP
    this.playerSp = new YT.Player("js-youtubeSp", {
      videoId: this.ytIDSp,
      playerVars: {
        start: 0,
        rel: 0,
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 0,
        autoplay: 0,
        loop: 1,
        playlist: this.ytIDSp,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  playVideo(elm) {
    elm.target.mute();

    if (window.innerWidth >= 751) {
      if (elm.target.v.id === "js-youtubePc") {
        elm.target.playVideo();
      } else if (elm.target.v.id === "js-youtubeSp") {
        elm.target.stopVideo();
      }
    } else {
      if (elm.target.v.id === "js-youtubePc") {
        elm.target.stopVideo();
      } else if (elm.target.v.id === "js-youtubeSp") {
        elm.target.playVideo();
      }
    }
  }
}

new Main();

function onPlayerReady(event) {
  var youtube = event.target;
  youtube.mute();
  youtube.playVideo();
  $(".youtubeKv").addClass("is-loaded");
}
