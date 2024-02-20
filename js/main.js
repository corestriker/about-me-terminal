// Thanks to ForrestKnigth for the inpiration of this website!


function $(elid) {
  return document.getElementById(elid);
}

var cursor;
window.onload = init;

function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}

function nl2br(txt) {
  return txt.replace(/\n/g, "");
}

function typeText(from, e) {
  e = e || window.event;
  var typer = $("typer");
  var textToWrite = from.value;
  typer.innerHTML = nl2br(textToWrite);
}

function moveCarret(count, e) {
  e = e || window.event;
  var keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= 0 - (count - 1) * 10) {
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}

var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var hist = [];


window.addEventListener("keyup", main);

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);


console.log(
  "%cWhat are you looking for?",
  "font-weight: bold; font-size: 12px;"
);

textarea.value = "";
command.innerHTML = textarea.value;

function main(event) {
  if (event.keyCode == 13) {
    var cmd = command.innerHTML;
    hist.push(command.innerHTML);
    git = hist.length;

    if (cmd.length == 0) {
      addLine("guest@about.c0re.ninja:  ~ ❯", "color1", 0);
    } else {
      addLine('guest@about.c0re.ninja:  ~ ❯ <span class="color2">' + cmd + '</span>', "color1", 0);
      runCommand(cmd);
    }

    textarea.value = "";
    command.innerHTML = "";
  }
  if (event.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = hist[git];
    command.innerHTML = textarea.value;
  }
  if (event.keyCode == 40 && git != hist.length) {
    git += 1;
    if(hist[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = hist[git];
    }
    command.innerHTML = textarea.value;
  }
}

function runCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "email":
      loopLines(email, "color2 margin", 80);
      break;
    case "github":
      loopLines(github, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "banner":
      loopLines(banner, "color2 margin", 80);
      break;
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(hist, "color2", 80);
      addLine("<br>", "command", 80 * hist.length + 50);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    default:
      addLine(
        '<span class="inherit">Command \'' +
          cmd +
          '\' not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
        "error",
        100
      );
      break;
  }
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}
