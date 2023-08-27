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
for (let i=0; i<20; i++) {
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
	arrow.style.opacity = (Math.random()).toFixed(1);
	arrow.style.transform = `
		scale(${Math.random()*.5+.5})
		rotate(${Math.floor(Math.random()*360)}deg)
		translate(${Math.floor(Math.random()*100-50)}vw, ${Math.floor(Math.random()*100-50)}dvh)
	`
	arrow.style.filter = `blur(${Math.floor(Math.random()*2)}px)`;
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