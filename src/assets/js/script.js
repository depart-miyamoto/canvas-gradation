import ScrollAnime from "./_dev/modules/scrollAnime";
import Smooth from "./_dev/modules/smooth";
import WindowStatus from "./_dev/modules/windowStatus";

document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnime().init();
  new Smooth();
  new WindowStatus();
});
