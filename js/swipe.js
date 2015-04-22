var myElement = document.getElementById('swipe');
var mc = new Hammer(myElement);
mc.on("panleft", function(ev) {
	//console.log(ev.type +" gesture detected.");
    $("#nextButton").trigger("click");
});
mc.on("panright", function(ev) {
	//console.log(ev.type +" gesture detected.");
    $("#prevButton").trigger("click");
});