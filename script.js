let body = document.querySelector("body");

// Generate and animate handwritten portions
let byhandShuffleTargets = document.querySelectorAll('.byhand-shuffle');
for (let i of byhandShuffleTargets) {
	byhandShuffle(i);
}
function byhandShuffle(e) {
	temp = '';
	for (let i of e.innerText) {
		temp += `<span style='font-variation-settings:"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}'>${i}</span>`
	}
	e.innerHTML = temp;
}
let byhandAnimateTargets = document.querySelectorAll('.byhand-animate');
for (let i of byhandAnimateTargets) {
	byhandAnimate(i);
}
function byhandAnimate(e) {
	setInterval(() => {
		let byhandAnimateSpans = e.querySelectorAll("span");
		for (let i of byhandAnimateSpans) {
			i.style.fontVariationSettings = `"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}`;
		}
	}, 200)
}

// Header arrow animation
let headerArrows = document.querySelector(".header-arrows");
let arrowDirections = [
	"&#8593;",
	"&#8599;",
	"&#8594;",
	"&#8600;",
	"&#8595;",
	"&#8601;",
	"&#8592;",
	"&#8598;",
]
for (let i=0; i<20; i++) {
	let arrowDirection = arrowDirections[Math.floor(Math.random()*arrowDirections.length)];
	headerArrows.innerHTML += `<span>${arrowDirection}</span>`;
}
for (let arrow of headerArrows.querySelectorAll("span")) {
	arrow.style.fontSize = Math.random()*15+10 + "rem";
	arrow.style.top = Math.random()*100 + "vh";
	arrow.style.left = Math.random()*100 + "vw";
	arrow.style.filter = `blur(${Math.random()*20}px)`
	headerArrowLoop(arrow);
}
function headerArrowLoop(arrow) {
	setTimeout(() => {
		arrow.style.fontSize = Math.random()*15+10 + "rem";
		arrow.style.top = Math.random()*100 + "vh";
		arrow.style.left = Math.random()*100 + "vw";
		headerArrowLoop(arrow);
	}, Math.random()*500+200)
}