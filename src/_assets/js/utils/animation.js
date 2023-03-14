// フェードイン
window.addEventListener("DOMContentLoaded", () => {
  $(".loadIn").each(function () {
    $(this).addClass("active");
  });
  var element = $(".typTxt");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split("").forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += "<font>" + t + "</font>";
        } else {
          var n = i / 10;
          textbox += "<font>" + t + "</font>";
        }
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });
  const boxes = document.querySelectorAll(".scrollIn,.scroll,.typTxt");
  const boxesArr = Array.prototype.slice.call(boxes);

  const options = {
    root: null, // 今回はビューポートをルート要素とする
    rootMargin: "0px 0px", // ビューポートの中心を判定基準にする
    threshold: 0, // 閾値は0
  };
  const observer = new IntersectionObserver(callback, options);
  boxesArr.forEach(function (box) {
    observer.observe(box);
  });

  function callback(entries) {
    entries.forEach(function (entry, i) {
      const target = entry.target;
      if (entry.isIntersecting && !target.classList.contains(".active")) {
        const delay = i * 100;
        setTimeout(function () {
          target.classList.add("active");
        }, delay);
      }
    });
  }
});

let topFixedSearchBtnFlagMv = false;
let topFixedSearchBtnFlagSearch = false;
if (document.getElementById("taoyaSearch")) {
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      fixedSearchBtnObserbeTop(document.getElementById("taoyaMv"));
    } else if (i == 1) {
      fixedSearchBtnObserbeTop(document.getElementById("taoyaSearch"));
    }
  }
} else if (document.getElementsByClassName("bgContainer")[0]) {
  const fixedSearchBtn = document.getElementsByClassName("bgContainer")[0];
  fixedSearchBtnObserbe(fixedSearchBtn);
}

function fixedSearchBtnObserbe(elm) {
  let thresholdSets = [];
  for (let i = 0; i <= 1.0; i += 0.01) {
    thresholdSets.push(i);
  }
  let obs = new IntersectionObserver(onIntersectOrderShow.bind(this), {
    threshold: thresholdSets,
  });
  obs.observe(elm);
}

function fixedSearchBtnObserbeTop(elm) {
  let obs = new IntersectionObserver(onIntersectOrderShowTop.bind(this));
  obs.observe(elm);
}

function onIntersectOrderShow(elm) {
  if (elm[0].intersectionRatio * 100 >= 7) {
    document
      .getElementsByClassName("fixed-search-btn")[0]
      .classList.add("isShow");
  } else {
    document
      .getElementsByClassName("fixed-search-btn")[0]
      .classList.remove("isShow");
  }
}

function onIntersectOrderShowTop(elm) {
  if (!elm[0].isIntersecting) {
    if (elm[0].target.id == "taoyaMv") {
      topFixedSearchBtnFlagMv = true;
    } else if (elm[0].target.id == "taoyaSearch") {
      topFixedSearchBtnFlagSearch = true;
    }
  } else {
    if (elm[0].target.id == "taoyaMv") {
      topFixedSearchBtnFlagMv = false;
    } else if (elm[0].target.id == "taoyaSearch") {
      topFixedSearchBtnFlagSearch = false;
    }
  }

  if (topFixedSearchBtnFlagMv && topFixedSearchBtnFlagSearch) {
    document
      .getElementsByClassName("fixed-search-btn")[0]
      .classList.add("isShow");
  } else {
    document
      .getElementsByClassName("fixed-search-btn")[0]
      .classList.remove("isShow");
  }
}
