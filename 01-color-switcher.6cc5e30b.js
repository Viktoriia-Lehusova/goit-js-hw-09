!function(){var o=document.querySelector("button[data-start]");console.log(o);var e=document.querySelector("button[data-stop]");console.log(e);var t=document.querySelector("body");console.log(t);o.addEventListener("click",(function(n){timeId=setInterval((function(){t.style.backgroundColor=(t.style.backgroundColor,"#".concat(Math.floor(16777215*Math.random()).toString(16))),console.log("change color"),o.disabled=!0,e.disabled=!1}),1e3)})),e.addEventListener("click",(function(t){clearInterval(timeId),o.disabled=!1,e.disabled=!0})),e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.6cc5e30b.js.map
