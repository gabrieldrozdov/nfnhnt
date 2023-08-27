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