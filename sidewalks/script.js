let body = document.querySelector("body");

// Walk height for set positions correctly in both CSS and JS
let walkImageHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--imgsize'));

// Generate and animate handwritten portions
function byhandShuffle(e) {
	let byHandTargets = e.querySelectorAll(".walk-text-byhand");
	for (let i of byHandTargets) {
		temp = '';
		for (let j of i.innerText) {
			temp += `<span style='font-variation-settings:"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}'>${j}</span>`
		}
		i.innerHTML = temp;
	}
}
let byhandState = true;
function byhandAnimate() {
	setInterval(() => {
		if (!byhandState) {
			return
		}
		let byhandAnimateSpans = body.querySelectorAll(".walk-text-byhand span");
		for (let i of byhandAnimateSpans) {
			i.style.fontVariationSettings = `"SCRI" ${Math.floor(Math.random()*100)}, "SCRA" ${Math.floor(Math.random()*100)}`;
		}
	}, 200)
}
byhandAnimate();

// Text positions
let walkText = document.querySelector(".walk-text");
let walkTextCenter = walkText.querySelector('.walk-text-center');
let walkTextTop = walkText.querySelector('.walk-text-top');
let walkTextBottom = walkText.querySelector('.walk-text-bottom');
let walkTextLeft = walkText.querySelector('.walk-text-left');
let walkTextRight = walkText.querySelector('.walk-text-right');

// Fade in lines
function walkTextLineFade(e, delay) {
	e.style.opacity = 1;
	e.style.pointerEvents = "none";
	let lines = e.querySelectorAll(".walk-text-line");
	let totalLines = lines.length;
	let currentLine = 0;
	lines[currentLine].style.opacity = 1;
	currentLine++;
	if (currentLine >= totalLines) {
		e.style.pointerEvents = "unset";
	}
	setInterval(() => {
		if (currentLine >= totalLines) {
			e.style.pointerEvents = "unset";
			return
		}
		lines[currentLine].style.opacity = 1;
		currentLine++;
	}, delay)
}

// Clear text within element
function walkTextClear(e) {
	e.style.pointerEvents = "none";
	e.style.opacity = 0;
	setTimeout(() => {
		e.innerHTML = "";
	}, 550)
}

// Mouse cursor
let walkCursor = document.querySelector('.walk-cursor');
body.addEventListener("mousemove", function (e) {
	walkCursor.style.left = (e.pageX) + 'px';
	walkCursor.style.top = (e.pageY) + 'px';
}, false);
body.addEventListener("mousedown", function (e) {
	walkCursor.style.transform = "scale(.6)";
}, false);
body.addEventListener("mouseup", function (e) {
	walkCursor.style.transform = "scale(1)";
}, false);
function walkCursorStep() {
	if (parseInt(walkCursor.dataset.step) == 1) {
		walkCursor.dataset.step = 2;
	} else {
		walkCursor.dataset.step = 1;
	}
}

// Footsteps
let walkReverb = new Tone.Reverb().toDestination();
walkReverb.wet.value = .2;
walkReverb.decay.value = 1.5;
let walkStepSounds = [
	"s01-01",
	"s01-02",
	"s01-03",
	"s01-04",
	"s01-05",
	"s01-06",
	"s01-07",
	"s01-08",
	"s01-09",
	"s01-10",
	"s01-11",
	"s02-01",
	"s02-02",
	"s02-03",
	"s02-04",
	"s02-05",
	"s02-06",
	"s02-07",
	"s02-08",
	"s02-09",
	"s03-01",
	"s03-02",
	"s03-03",
	"s03-04",
	"s03-05",
	"s03-06",
	"s03-07",
	"s03-08",
	"s03-09",
	"s03-10",
	"s03-11",
	"s03-12",
	"s04-01",
	"s04-02",
	"s04-03",
	"s04-04",
	"s04-05",
	"s04-06",
	"s05-01",
	"s05-02",
	"s05-03",
	"s05-04",
	"s05-05",
	"s05-06",
	"s05-07",
	"s05-08",
	"s05-09",
	"s05-10",
	"s05-11",
	"s05-12"
];
let walkStepSamplers = {}
for (let sound of walkStepSounds) {
	walkStepSamplers[sound] = new Tone.Sampler({
		urls: {
			C3: `${sound}.mp3`
		},
		baseUrl: "sound/",
		volume: -10,
	}).toDestination();
}
function walkPlayStep(sound) {
	let pitch = Math.random()*50+110;
	if (sound == "random") {
		sound = walkStepSounds[Math.floor(Math.random()*walkStepSounds.length)];
	} else if (sound == 's01') {
		sound = walkStepSounds[Math.floor(Math.random()*11)];
	} else if (sound == 's02') {
		sound = walkStepSounds[Math.floor(Math.random()*9+11)];
	} else if (sound == 's03') {
		sound = walkStepSounds[Math.floor(Math.random()*12+20)];
	} else if (sound == 's04') {
		sound = walkStepSounds[Math.floor(Math.random()*6+32)];
	} else if (sound == 's05') {
		sound = walkStepSounds[Math.floor(Math.random()*12+38)];
	}
	walkStepSamplers[sound].triggerAttackRelease(pitch, 1);
}

// Variables for step functions
let walkSteps = document.querySelector(".walk-steps");
let walkStepCount = 0; // total steps taken so far


const imgPathRanges = {
	trail1: 305,
	trail2: 336,
	trail3: 272,
	trail4: 202,
	mall1: 221,
	mall2: 238,
	mall3: 58,
	boardwalk1: 260,
	beach1: 230,
	beach2: 116,
	beach4: 178,
	grass2: 416,
	alley1: 122,
	edge1: 143,
	escalator1: 87,
	fog1: 146,
	fog2: 126,
	garage1: 259,
	store1: 72,
	pier1: 485,
}
const imgGroundRanges = {
	boardwalk2: 223,
	grass1: 117,
	pier2: 214,
	beach3: 150,
	alley2: 132,
	carpet1: 123,
	garage2: 260,
	wood1: 45,
	stones1: 149,
	stones2: 93,
	stones3: 124,
	sidewalk1: 221,
	sidewalk2: 172,
	sidewalk3: 345,
	sidewalk4: 190,
	sidewalk5: 147,
	sidewalk6: 110,
	sidewalk7: 131,
	sidewalk8: 85,
	sidewalk9: 244,
}
let activePath = "trail1";
let activeGround = "boardwalk2";
let stepPath = 0;
let stepGround = 0;
function pickImage() {
	stepPath += Math.floor(Math.random()*5+1);
	if (stepPath >= imgPathRanges[activePath] || Math.random() > .95) {
		activePath = Object.keys(imgPathRanges)[Math.floor(Math.random()*Object.keys(imgPathRanges).length)];
		stepPath = 0;
	}
	let main = document.querySelector(".walk-background");
	main.style.backgroundImage = `url("imgs/${activePath}/${activePath}-${stepPath}.jpg")`;

	stepGround += Math.floor(Math.random()*5+1);
	if (stepGround >= imgGroundRanges[activeGround] || Math.random() > .95) {
		activeGround = Object.keys(imgGroundRanges)[Math.floor(Math.random()*Object.keys(imgGroundRanges).length)];
		stepGround = 0;
	}
	return `imgs/${activeGround}/${activeGround}-${stepGround}.jpg`;
}

// Take step forward and add new step to DOM
let stepRotation = 0;
let stepPosition = 0;
function walkStepNext() {
	walkPlayStep('s05');
	walkStepCount++;

	// Create nodes for new step image
	let imgContainer = document.createElement("div");
	imgContainer.classList = "walk-steps-child";
	let img = new Image();
	img.classList = "walk-steps-child-img";

	// Add image to the container
	imgContainer.appendChild(img);

	// Set initial properties for new step image/container
	imgContainer.style.opacity = 0;
	imgContainer.style.transform = `translateY(${-walkImageHeight}vh)`;
	imgContainer.style.zIndex = 9;
	imgContainer.dataset.pos = 0;
	img.src = pickImage();
	stepRotation += Math.round(Math.random()*20-10);
	stepPosition += stepRotation*2;
	if (stepPosition > 75) {
		stepRotation -= 10;
		stepPosition = 75;
	} else if (stepPosition < -75) {
		stepRotation += 10;
		stepPosition = -75;
	}
	img.style.transform = `rotate(${stepRotation}deg) translate(${-50+stepPosition}%, -50%)`;

	// Add finished node to live div
	walkSteps.appendChild(imgContainer);

	// Animate transform by adding delay
	setTimeout(() => {
		imgContainer.style.opacity = 1;
		imgContainer.style.transform = `translateY(0vh)`;
	}, 50)

	// Style and position previous steps
	for (let step of walkSteps.childNodes) {
		if (step != imgContainer && parseInt(step.dataset.pos) < 1) {
			step.style.filter = `brightness(${100+(step.dataset.pos-1)*10}%) grayscale(${(step.dataset.pos-1)*-30}%)`;
			step.style.zIndex = `0`;

			// Adjust step position and set transform
			step.dataset.pos = parseInt(step.dataset.pos) - 1;
			step.style.transform = `translateY(${-walkImageHeight/2*step.dataset.pos/2}vh)`;

			// Remove step if over 25 steps ago
			if (parseInt(step.dataset.pos) <= -25) {
				step.remove();
			}
		}
	}
}

// Take step backward and remove previous step from DOM
function walkStepPrev() {
	// Base edge case
	if (!walkSteps.querySelector("[data-pos='0']")) {
		return
	}

	walkPlayStep('s05');
	walkStepCount++;

	// Remove most recently added node
	let lastAdded = walkSteps.querySelector("[data-pos='0']");
	walkStepRemove(lastAdded);

	// Style and position steps
	for (let step of walkSteps.childNodes) {
		if (step != lastAdded) {
			step.style.filter = `brightness(30%) grayscale(100%)`;
			step.style.zIndex = `0`;
	
			// Adjust step position and set transform
			step.dataset.pos = parseInt(step.dataset.pos) + 1;
			step.style.transform = `translateY(${-walkImageHeight/2*step.dataset.pos/2}vh)`;
		}
	}

	// Highlight new featured step
	let newHighlight = walkSteps.querySelector("[data-pos='0']");
	if (newHighlight != null) {
		newHighlight.style.filter = "brightness(100%) grayscale(0%)";
		newHighlight.style.zIndex = 9;
	}
}

// Remove step from stack
function walkStepRemove(step) {
	step.dataset.pos = 1;
	step.style.transform = step.style.transform + `translateY(${-walkImageHeight}vh) rotate(${Math.random()*90-45}deg) scale(0.8)`;
	step.style.filter = "brightness(30%) grayscale(100%) blur(10px)";
	step.style.opacity = 0;
	step.style.zIndex = 0;
	setTimeout(() => {
		step.remove();
	}, 650);
}

// Highlight specific step image in current stack
let walkPrevImg, walkCurrentImg;
body.addEventListener("keydown", checkKey);
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') { // up arrow
		walkStepNext();
    }
    else if (e.keyCode == '40') { // down arrow
		walkStepPrev();
    }
    else if (e.keyCode == '37') { // left arrow
    }
    else if (e.keyCode == '39') { // right arrow
    }
}

// Resolves for promises and delays
function walkResolveAfterDelay(delay) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delay);
	});
}
let walkResolve = false;
function walkResolveCheck() {
	return new Promise(resolve => {
		let loop = setInterval(() => {
			if (walkResolve) {
				resolve();
				clearInterval(loop);
			}
		}, 50);
	});
}
function walkResolveTrigger() {
	walkResolve = true;
	setTimeout(() => {
		walkResolve = false;
	}, 50)
}

// Main sequence
async function walkSequence() {
	// walkTextCenter.innerHTML = `
	// 	<span class='walk-text-line'>I’d like you to read a poem</span>
	// 	<span class='walk-text-line'>about what it feels like</span>
	// 	<span class='walk-text-line'>to walk through a place.</span>
	// `;
	// walkTextLineFade(walkTextCenter, 2500);
	// await walkResolveAfterDelay(10000);
	// walkTextClear(walkTextCenter);
	// await walkResolveAfterDelay(750);


	// walkTextCenter.innerHTML = `
	// 	<span class='walk-text-line'>Would you like to read this poem?</span>
	// 	<span class='walk-text-line'>
	// 		<div class='walk-intro-options'>
	// 			<div class='walk-button' onclick='walkResolveTrigger();'>
	// 				<div class='walk-button-text walk-text-byhand'>Yes.</div>
	// 				<div class='walk-button-background'></div>
	// 			</div>
	// 			<div class='walk-button' onclick='window.close();'>
	// 				<div class='walk-button-text walk-text-byhand'>No.</div>
	// 				<div class='walk-button-background'></div>
	// 			</div>
	// 		</div>
	// 	</span>
	// `;
	// byhandShuffle(walkTextCenter);
	// walkTextLineFade(walkTextCenter, 2500);
	// await walkResolveCheck();
	// walkTextClear(walkTextCenter);
	// await walkResolveAfterDelay(750);


	// walkTextCenter.innerHTML = `
	// 	<span class='walk-text-line'>This poem is called:</span>
	// 	<div class='walk-text-break'></div>
	// 	<span class='walk-text-line walk-text-byhand'>“There are many ways to take a walk.”</span>
	// `;
	// byhandShuffle(walkTextCenter);
	// walkTextLineFade(walkTextCenter, 2500);
	// await walkResolveAfterDelay(10000);
	// walkTextClear(walkTextCenter);
	// await walkResolveAfterDelay(750);


	// walkTextCenter.innerHTML = `
	// 	<span class='walk-text-line'>One way to take a walk is to <span class="walk-text-byhand">take a walk.</span></span>
	// 	<div class='walk-text-break'></div>
	// 	<span class='walk-text-line'>If you’d like, you can stop reading</span>
	// 	<span class='walk-text-line'>and take a walk.</span>
	// `;
	// byhandShuffle(walkTextCenter);
	// walkTextLineFade(walkTextCenter, 2500);
	// await walkResolveAfterDelay(10000);
	// walkTextClear(walkTextCenter);
	// await walkResolveAfterDelay(750);


	// walkTextTop.innerHTML = `
	// 	<span class='walk-text-line'>Another way to take a walk</span>
	// `;
	// let loop = setInterval(() => {
	// 	walkStepNext();
	// }, 1000)
	// walkTextLineFade(walkTextTop, 2500);
	// await walkResolveAfterDelay(2500);
	// walkTextBottom.innerHTML = `
	// 	<span class='walk-text-line'>is to <span class="walk-text-byhand">watch a walk.</span></span>
	// `;
	// byhandShuffle(walkTextBottom);
	// walkTextLineFade(walkTextBottom, 2500);
	// await walkResolveAfterDelay(5000);
	// walkTextClear(walkTextTop);
	// walkTextClear(walkTextBottom);
	// await walkResolveAfterDelay(750);


	// walkTextLeft.innerHTML = `
	// 	<span class='walk-text-line'>You didn’t take this walk</span>
	// `;
	// walkTextLineFade(walkTextLeft, 2500);
	// await walkResolveAfterDelay(2500);
	// walkTextRight.innerHTML = `
	// 	<span class='walk-text-line'>but now you’re taking a walk</span>
	// `;
	// walkTextLineFade(walkTextRight, 2500);
	// await walkResolveAfterDelay(2500);
	// walkTextBottom.innerHTML = `
	// 	<span class='walk-text-line walk-text-byhand'>through this walk.</span>
	// `;
	// byhandShuffle(walkTextBottom);
	// walkTextLineFade(walkTextBottom, 2500);
	// await walkResolveAfterDelay(5000);
	// walkTextClear(walkTextLeft);
	// walkTextClear(walkTextRight);
	// walkTextClear(walkTextBottom);
	// await walkResolveAfterDelay(750);
	// clearInterval(loop);
	// await walkResolveAfterDelay(1000);


	// walkTextTop.innerHTML = `
	// 	<span class='walk-text-line'>A walk can be <span class="walk-text-byhand">hasty</span></span>
	// `;
	// byhandShuffle(walkTextTop);
	// walkTextLineFade(walkTextTop, 2500);
	// await walkResolveAfterDelay(1000);
	// loop = setInterval(() => {
	// 	walkStepNext();
	// }, 350)
	// await walkResolveAfterDelay(5000);
	// walkTextClear(walkTextTop);
	// clearInterval(loop);
	// walkTextBottom.innerHTML = `
	// 	<span class='walk-text-line'>or <span class="walk-text-byhand">unhurried</span></span>
	// `;
	// byhandShuffle(walkTextBottom);
	// walkTextLineFade(walkTextBottom, 2500);
	// loop = setInterval(() => {
	// 	walkStepNext();
	// }, 2500)
	// await walkResolveAfterDelay(10000);
	// walkTextClear(walkTextBottom);
	// clearInterval(loop);
	// walkTextLeft.innerHTML = `
	// 	<span class='walk-text-line'>or</span>
	// `;
	// walkTextLineFade(walkTextLeft, 2500);
	// await walkResolveAfterDelay(1000);
	// loop = setInterval(() => {
	// 	walkStepNext();
	// 	setTimeout(() => {
	// 		walkStepNext();
	// 	}, 200)
	// }, 1000)
	// await walkResolveAfterDelay(500);
	// walkTextRight.innerHTML = `
	// 	<span class='walk-text-line walk-text-byhand'>irregular.</span>
	// `;
	// byhandShuffle(walkTextRight);
	// walkTextLineFade(walkTextRight, 2500);
	// await walkResolveAfterDelay(7000);
	// walkTextClear(walkTextLeft);
	// walkTextClear(walkTextRight);
	// await walkResolveAfterDelay(1000);
	// clearInterval(loop);
}

walkSequence();











// Wheels
body.addEventListener("wheel", tempScroll);
function tempScroll(event) {
	// Read scroll event
	if (event.deltaY > 10) {
	} else if (event.deltaY < -10) {
	}
}