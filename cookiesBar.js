function generateCookieBar() {

  // Create elements
  var cookiesBar = document.createElement("div");
  var cookiesBarInner = document.createElement("div");

  // Apply class to element
  cookiesBar.classList.add('js-cookies');
  cookiesBarInner.classList.add('js-cookies__inner');

  // Add content to element
  cookiesBarInner.innerHTML = '<p>This site uses cookies to improve your experience. <a href="/privacy-policy/">Click here to find out more</a>. By using this site you are consenting to using cookies. <span class="btn btn-3">Allow Cookies</span></p>';

  // Combine elements to create cookie bar
  cookiesBar.appendChild(cookiesBarInner);

  // Add cookie bar to body
  document.getElementsByTagName('body')[0].appendChild(cookiesBar);

  if (!cookiesBar) return;
}

// https://stackoverflow.com/questions/5968196/check-cookie-if-cookie-exists
function getCookie(name) {

  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}

function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

const displayCookiesBar = () => {

  var cookieDoesntExist = getCookie('cookie_policy');

  if (!cookieDoesntExist) {
    generateCookieBar();

    var btn = document.querySelector('.js-cookies .btn');

    btn.addEventListener('click', function () {
      setCookie('cookie_policy', true, 30);
      setTimeout(function () {
        document.querySelector('.js-cookies').remove();
      }, 100);
    });
  }

}

export default displayCookiesBar;
