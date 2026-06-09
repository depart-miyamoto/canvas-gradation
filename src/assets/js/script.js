import ScrollAnime from "./_dev/modules/scrollAnime";
import Smooth from "./_dev/modules/smooth";
import WindowStatus from "./_dev/modules/windowStatus";
import Gradation from "./_dev/gradation";

document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnime().init();
  new Smooth();
  new WindowStatus();
  new Gradation();
});
