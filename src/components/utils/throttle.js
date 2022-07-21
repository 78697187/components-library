export function throttle(fn, wait) {
  let timer;
  return function() {
    // const context = this;
    const args = Array.from(arguments);
    if(!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}