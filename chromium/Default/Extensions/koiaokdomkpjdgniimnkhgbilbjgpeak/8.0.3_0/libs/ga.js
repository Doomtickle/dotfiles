/* A simple interface to Google Analytics that doesn't require script access */

if(!localStorage.cid){
	localStorage.cid = Math.floor(Math.random() * 1000000000);
}
if(!localStorage.it){
	localStorage.it = now();
}
if(!localStorage.utx){
	localStorage.utx = now();
}

var GoogleAnalytics = {};
GoogleAnalytics.tid = "";
GoogleAnalytics.cid = localStorage.cid;
GoogleAnalytics.api = function(data){
	data.v = "1";
	data.tid = GoogleAnalytics.tid;
	data.cid = GoogleAnalytics.cid;
	if(!navigator.doNotTrack){
		$.get("https://www.google-analytics.com/collect",data);
	}
}
GoogleAnalytics.trackEvent = function(category,action,label,value){
	if (action === "Watch YouTube") {
		 let lastFire = localStorage.getItem("EventBreak"),
			period = (+new Date()) - (lastFire * 1);
		 if (lastFire && period <= 604800000) {
		 	return;
		 } else {
             localStorage.setItem("EventBreak", +new Date());
		 }
	}
	var data = {
		t:"event",
		ec:category,
		ea:action,
		el:label,
		ev:value
	};
	GoogleAnalytics.api(data);
}
GoogleAnalytics.trackPageView = function(hostname,page,title){
	var data = {
		t:"pageview",
		dh:hostname,
		dp:page,
		dt:title
	};
	GoogleAnalytics.api(data);
}
