class WindowStatus {
  constructor() {
    const body = document.body;

    let currentOffset = 0;
    let isDown = false;
    let isTop = window.pageYOffset == 0 ? false : true;
    let isPosition = "";

    const scroll = () => {
      const pageYOffset = window.pageYOffset;
      const bodyHeight = body.clientHeight;
      const innerHeight = window.innerHeight;

      if (isPosition == "top" && pageYOffset > 0) {
        if (pageYOffset + innerHeight < bodyHeight) {
          isPosition = "middle";
          body.classList.add("is-middle");
        } else {
          isPosition = "bottom";
          body.classList.add("is-bottom");
        }
        body.classList.remove("is-top");
      } else if (
        isPosition == "middle" &&
        (pageYOffset <= 0 || pageYOffset + innerHeight >= bodyHeight)
      ) {
        if (pageYOffset <= 0) {
          isPosition = "top";
          body.classList.add("is-top");
        } else {
          isPosition = "bottom";
          body.classList.add("is-bottom");
        }
        body.classList.remove("is-middle");
      } else if (
        isPosition == "bottom" &&
        pageYOffset + innerHeight < bodyHeight
      ) {
        if (pageYOffset <= 0) {
          isPosition = "top";
          body.classList.add("is-top");
        } else {
          isPosition = "middle";
          body.classList.add("is-middle");
        }
        body.classList.remove("is-bottom");
      } else {
        if (pageYOffset <= 0) {
          isPosition = "top";
          body.classList.add("is-top");
        } else if (pageYOffset + innerHeight < bodyHeight) {
          isPosition = "middle";
          body.classList.add("is-middle");
        } else {
          isPosition = "bottom";
          body.classList.add("is-bottom");
        }
      }

      if (isDown) {
        if (pageYOffset > 100 && pageYOffset > currentOffset) {
          isDown = false;
          body.classList.add("is-down");
          body.classList.remove("is-up");
        }
      } else {
        if (pageYOffset <= currentOffset) {
          isDown = true;
          body.classList.remove("is-down");
          body.classList.add("is-up");
        }
      }
      if (isTop) {
        if (pageYOffset > 0) {
          isTop = false;
          body.classList.remove("is-top");
        }
      } else {
        if (pageYOffset <= 0) {
          isTop = true;
          body.classList.add("is-top");
          body.classList.remove("not-top");
        }
      }

      currentOffset = pageYOffset;
    };

    const orientationQuery = window.matchMedia("(orientation: landscape)");

    const mediaChange = function (e) {
      if (e.matches) {
        body.classList.remove("is-vertical");
        body.classList.add("is-horizontal");
      } else {
        body.classList.remove("is-horizontal");
        body.classList.add("is-vertical");
      }
    };

    orientationQuery.addListener(mediaChange);

    scroll();
    mediaChange(orientationQuery);

    window.addEventListener("load", scroll);
    window.addEventListener("scroll", scroll);
    window.addEventListener("resize", scroll);

    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        scroll();
        mediaChange(orientationQuery);
      }, 50);
    });
  }
}

export default WindowStatus;
