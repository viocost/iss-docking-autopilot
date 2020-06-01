



function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);

    console.log("FILE")
    console.log(file)
    console.log(th)
    th.appendChild(s);
}

injectScript( chrome.extension.getURL('/autopilot.js'), 'body');


