const unescaper = document.createElement('div');

export default class Unescaper {
  unescape(escapedString) {
    unescaper.innerHTML = escapedString;
    return unescaper.textContent;
  }
}
