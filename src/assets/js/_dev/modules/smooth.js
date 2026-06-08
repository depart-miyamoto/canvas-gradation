class Smooth {
  constructor() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");

        if (href === "#" || href == "") {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
        } else {
          // hrefが「#◯◯◯」の場合
          const target = document.querySelector(href);

          if (target) {
            // 「#◯◯◯」のID＝アンカーリンク先が見つかった場合、その位置にスクロール
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  }
}

export default Smooth;
