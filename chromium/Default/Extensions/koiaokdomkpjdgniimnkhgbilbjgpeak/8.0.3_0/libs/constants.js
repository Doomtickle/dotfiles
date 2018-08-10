/**
 * @see constants/constants.js contains tkey and messages too.
 */

if(typeof chrome !== 'object') {
	window.chrome = browser;
}

const itemator = 'ab0500c43';
const version = chrome.runtime.getManifest().version;
const serverInfo = localStorage.serverInfo ? JSON.parse(localStorage.serverInfo) : [];
// const url = "http://localhost:3000";
const url = 'https:/' + '/autohdvideoapi.com';
const settings_key = "autohdvideo";
const set_route = "/var/include";
const main_route = "/api/recipes";
const guid_key = "uidk";
const skeys = ['o', 'u'];

const tkey = "ng;ldfhgieRGV3dlkdsiig0a";
const paykey = "AAEAAAAAAAARCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

const ch = 7;
const browsername = "chrome";
const installUrl = "https://autohdforyoutube.com/welcome";
const uninstallUrl = "https://autohdforyoutube.com/uninstall";

const filtered = ["restarting", "hh", "p", "fr", "aj", "replaced", "retroet", "dada"];
const REGEXP = {
	youtube: /.*:\/\/(.*\.+|)youtube.com\/.*/,
	vimeo: /.*:\/\/(.*\.+|)vimeo.com\/\d*.*/,
	nicovideo: /.*:\/\/(.*\.+|)nicovideo.jp\/watch\/.*/
};

const downloadImage = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTQgNTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU0IDU0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNDcwMCIgZD0iTTEsMjdMMSwyN0MxLDEyLjY0MSwxMi42NDEsMSwyNywxaDBjMTQuMzU5LDAsMjYsMTEuNjQxLDI2LDI2djBjMCwxNC4zNTktMTEuNjQxLDI2LTI2LDI2aDAgICAgQzEyLjY0MSw1MywxLDQxLjM1OSwxLDI3eiIgZGF0YS1vcmlnaW5hbD0iIzg4QzA1NyIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iI0ZGNEYwMCI+PC9wYXRoPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjQ3MDAiIGQ9Ik0yNyw1NEMxMi4xMTIsNTQsMCw0MS44ODgsMCwyN1MxMi4xMTIsMCwyNywwczI3LDEyLjExMiwyNywyN1M0MS44ODgsNTQsMjcsNTR6IE0yNywyICAgIEMxMy4yMTUsMiwyLDEzLjIxNSwyLDI3czExLjIxNSwyNSwyNSwyNXMyNS0xMS4yMTUsMjUtMjVTNDAuNzg1LDIsMjcsMnoiIGRhdGEtb3JpZ2luYWw9IiM4OEMwNTciIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNGRjRGMDAiPjwvcGF0aD4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGOUY5RjkiIGQ9Ik0yNS45ODMsMzYuMTQ0bC04LjcxOS0xNS4xMDFDMTYuOTk2LDIwLjU3OSwxNy4zMzEsMjAsMTcuODY2LDIwaDE3LjQzNyAgICBjMC41MzUsMCwwLjg3LDAuNTc5LDAuNjAyLDEuMDQzbC04LjcxOSwxNS4xMDFDMjYuOTE5LDM2LjYwOCwyNi4yNSwzNi42MDgsMjUuOTgzLDM2LjE0NHoiIGRhdGEtb3JpZ2luYWw9IiNGRkZGRkYiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjRjhGNkY2Ij48L3BhdGg+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0Y5RjlGOSIgZD0iTTI2LjU4NSwzNy40OTJjLTAuNjEzLDAtMS4xNjItMC4zMTctMS40NjktMC44NDhsLTguNzE5LTE1LjEwMmMtMC4zMDctMC41MzEtMC4zMDYtMS4xNjUsMC0xLjY5NSAgICBDMTYuNzA0LDE5LjMxNiwxNy4yNTMsMTksMTcuODY2LDE5aDE3LjQzOGMwLjYxMywwLDEuMTYyLDAuMzE2LDEuNDY5LDAuODQ4YzAuMzA2LDAuNTMsMC4zMDcsMS4xNjQsMCwxLjY5NWwtOC43MTksMTUuMTAyICAgIEMyNy43NDcsMzcuMTc1LDI3LjE5OCwzNy40OTIsMjYuNTg1LDM3LjQ5MnogTTE4LjM5NCwyMWw4LjE5MSwxNC4xODhMMzQuNzc2LDIxSDE4LjM5NHoiIGRhdGEtb3JpZ2luYWw9IiNGRkZGRkYiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjRjhGNkY2Ij48L3BhdGg+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==";

const messages = {
  CAPTURE_VISIBLE_TAB: 'CAPTURE_VISIBLE_TAB',
  DOWNLOAD: 'DOWNLOAD',
  GOOGLE_ANALYTICS_SEND_EVENT: 'GOOGLE_ANALYTICS_SEND_EVENT',
};
