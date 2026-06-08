/**
 * InterAnime
 * @param {*} elemets
 * @param {*} className
 * @param {*} margin パーセント
 * @param {*} threshold 0〜1
 * @param {*} root 交差判定要素 nullはviewport
 */
export default class InterAnime {
  constructor(
    elemets = ".anime",
    className = "anime-run",
    repeat = false,
    margin = 0,
    threshold = 0.1,
    root = null
  ) {
    this._elemets = [].slice.call(document.querySelectorAll(elemets), null);
    this._className = className;
    this._repeat = repeat;
    this._observer = null;
    this._options = {
      root: root,
      rootMargin: `-${margin}% 0%`,
      threshold: threshold,
    };
    if (root !== null) {
      this._options.root = document.querySelector(root);
    }
    if (!threshold) {
      this._options.threshold = 0.1;
    }
  }

  intersect() {
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry.intersectionRatio)
        // console.log(this._options)
        if (entry.intersectionRatio >= this._options.threshold) {
          entry.target.classList.add(this._className);
        } else {
          if (this._repeat) {
            entry.target.classList.remove(this._className);
          }
        }
      });
    }, this._options);
  }
  init() {
    this.intersect();
    this._elemets.forEach((el) => {
      this._observer.observe(el);
    });
  }
}
