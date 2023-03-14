class Main {
  constructor() {
    // scroll icon
    let scrollItem = [].slice.call(
      document.getElementsByClassName("table_type_scroll")
    );

    for (let i = 0; i < scrollItem.length; i++) {
      scrollItem[i].addEventListener("scroll", (elm) => {
        if (scrollItem[i].scrollLeft > 0) {
          elm.target.children[1].style.opacity = 0;
        }
      });
    }

    // change tab
    this.tabBtn = [].slice.call(
      document.getElementsByClassName("tabButton__item")
    );
    this.tabItem = [].slice.call(document.getElementsByClassName("tabContent"));

    for (let i = 0; i < this.tabBtn.length; i++) {
      this.tabBtn[i].addEventListener("click", (e) => {
        if (!e.target.classList.contains("is-active")) {
          let cat = e.srcElement.id;

          // change active
          for (let c = 0; c < this.tabBtn.length; c++) {
            this.tabBtn[c].classList.remove("is-active");
          }
          e.target.classList.add("is-active");

          // change show contents
          for (let c = 0; c < this.tabItem.length; c++) {
            this.tabItem[c].setAttribute("hidden", "");
          }
          if (cat === "tab1") {
            this.hideTab01();
          } else if (cat === "tab2") {
            this.hideTab02();
          }
        }
      });
    }
  }

  hideTab01() {
    this.tabItem[0].removeAttribute("hidden");
    this.tabItem[0].setAttribute("aria-expanded", "true");
    this.tabItem[0].setAttribute("tabindex", "0");
    this.tabBtn[0].setAttribute("aria-selected", "true");
    this.tabBtn[0].setAttribute("tabindex", "0");

    this.tabItem[1].setAttribute("aria-expanded", "false");
    this.tabItem[1].setAttribute("tabindex", "-1");
    this.tabBtn[1].setAttribute("aria-selected", "false");
    this.tabBtn[1].setAttribute("tabindex", "-1");
  }

  hideTab02() {
    this.tabItem[1].removeAttribute("hidden");
    this.tabItem[1].setAttribute("aria-expanded", "true");
    this.tabItem[1].setAttribute("tabindex", "0");
    this.tabBtn[1].setAttribute("aria-selected", "true");
    this.tabBtn[1].setAttribute("tabindex", "0");

    this.tabItem[0].setAttribute("aria-expanded", "false");
    this.tabItem[0].setAttribute("tabindex", "-1");
    this.tabBtn[0].setAttribute("aria-selected", "false");
    this.tabBtn[0].setAttribute("tabindex", "-1");
  }
}

new Main();
