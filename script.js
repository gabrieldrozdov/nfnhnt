let body = document.querySelector("body");

// Generate and animate handwritten portions
let shuffleTargets = document.querySelectorAll('.shuffle');
for (let i of shuffleTargets) {
	shuffle(i);
}
function shuffle(e) {
	temp = '';
	for (let i of e.innerText) {
		temp += `<span class="shuffle-span" style='font-variation-settings:"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}'>${i}</span>`
	}
	e.innerHTML = temp;
}
let animateTargets = document.querySelectorAll('.animate');
for (let i of animateTargets) {
	animate(i);
}
function animate(e) {
	setInterval(() => {
		let animateSpans = e.querySelectorAll("span");
		for (let i of animateSpans) {
			i.style.fontVariationSettings = `"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}`;
		}
	}, 200)
}

// Arrow animation
let arrows = document.querySelector(".arrows");
let arrowDirections = [
	'arrow-n.gif',
	'arrow-ne.gif',
	'arrow-e.gif',
	'arrow-se.gif',
	'arrow-s.gif',
	'arrow-sw.gif',
	'arrow-w.gif',
	'arrow-nw.gif',
]
let arrowTemp = '';
for (let i=0; i<30; i++) {
	arrowTemp += `
		<img src='assets/ui/${arrowDirections[Math.floor(Math.random()*arrowDirections.length)]}'>
	`
}
arrows.innerHTML += arrowTemp;
for (let arrow of arrows.querySelectorAll("img")) {
	arrowLoop(arrow);
}
function arrowLoop(arrow) {
	randomizeArrow(arrow);
	setTimeout(() => {
		arrowLoop(arrow);
	}, Math.floor(Math.random()*1000+500))
}
function randomizeArrow(arrow) {
	arrow.style.opacity = (Math.random()*.2+.8).toFixed(1);
	arrow.style.transform = `
		scale(${(Math.random()*5+1).toFixed(2)})
		rotate(${Math.floor(Math.random()*360)}deg)
		translate(${Math.floor(Math.random()*80-40)}vw, ${Math.floor(Math.random()*80-40)}vh)
	`
	arrow.style.filter = `blur(${Math.floor(Math.random()*5)}px)`;
}

// Title animation
for (let line of document.querySelectorAll('.title-line')) {
	randomizeTitle(line);
}
function randomizeTitle(line) {
	line.style.transform = `translateX(${Math.floor(Math.random()*15-7.5)}vw) rotate(${Math.floor(Math.random()*20-10)}deg) scale(${(Math.random()*3+1).toFixed(2)})`;
	line.style.filter = `blur(${(Math.random()*.5).toFixed(1)}px)`;
	line.style.opacity = (Math.random()*.1+.9).toFixed(1);
	setTimeout(() => {
		randomizeTitle(line)
	}, Math.floor(Math.random()*1000+500))
}

// Rotate links
for (let link of document.querySelectorAll('.catalog-link')) {
	link.style.transform = `rotate(${Math.floor(Math.random()*10-5)}deg)`;
}