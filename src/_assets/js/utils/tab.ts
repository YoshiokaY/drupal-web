//タブ
const btns = document.querySelectorAll(".c_tab_list li");
function onTabClick(e: Event) {
  let event = e.target as HTMLElement;
  // イベントターゲットが含まれるタブコンテンツを取得
  const parent = event.closest(".c_tab");
  const tabContents = parent?.querySelectorAll(".c_tab_content");
  const tabArr = Array.prototype.slice.call(tabContents);
  const item = parent?.querySelectorAll(".c_tab_list li");
  const itemArr = Array.prototype.slice.call(item);
  // ボタンとパネルを紐づけるための番号取得
  const index = itemArr.indexOf(e.target);
  // タブボタン切り替え
  itemArr.forEach((el) => {
    el.classList.remove("-open");
    el.setAttribute("aria-selected", "false");
  });
  event.classList.add("-open");
  event.setAttribute("aria-selected", "true");

  // タブパネル切り替え
  tabArr.forEach((tab) => {
    tab.setAttribute("hidden", "");
    tab.setAttribute("aria-expanded", "false");
    tab.setAttribute("tabindex", "-1");
  });
  tabArr[index].removeAttribute("hidden");
  tabArr[index].setAttribute("aria-expanded", "true");
  tabArr[index].setAttribute("tabindex", "0");
}

btns.forEach((btn) => {
  btn.addEventListener("click", onTabClick);
});
