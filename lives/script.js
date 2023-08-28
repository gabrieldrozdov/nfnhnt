let photo = document.querySelector(".photo");
let map = document.querySelector(".map");

let imgIndex = 0;
let currentMap = 0;
let mapIndex = 0;
let cooldown = 0;

let content = document.querySelector(".content");
// content.addEventListener("wheel", (e) => {
// 	e.preventDefault();
// 	if (e.deltaX > 2 && cooldown == 0) {
// 		cooldown = 2;
// 		imgIndex ++;
// 	} else if (e.deltaX < -2 && cooldown == 0) {
// 		cooldown = 2;
// 		imgIndex --;
// 	}
// 	imgChange();
// });

let lastX;
content.addEventListener("mousedown", (e) => {
	e.preventDefault();
	content.addEventListener("mousemove", dragMove);
	content.addEventListener("mouseup", dragEnd);

	function dragMove(e) {
		let currentX = e.clientX;
		mouseDrag(currentX);
	}
	function dragEnd() {
		content.removeEventListener("mousemove", dragMove);
		content.removeEventListener("mouseup", dragEnd);
	}
});
content.addEventListener('touchmove', (e) => {
	if (e.cancelable) {e.preventDefault(); e.stopPropagation()};
	let currentX = e.touches[0].clientX;
	mouseDrag(currentX);
});

function mouseDrag(currentX) {
	if (currentX > lastX && cooldown == 0) {
		cooldown = 1;
		imgIndex ++;
	} else if (currentX < lastX && cooldown == 0) {
		cooldown = 1;
		imgIndex --;
	}
	lastX = currentX;
	imgChange();
}

// prevent scrolling too quickly
setInterval(() => {
	if (cooldown > 0) {
		cooldown --;
	}
}, 50)

// function called on scroll
function imgChange() {
	// bounds
	if (imgIndex < 0) {
		imgIndex = 39;
	} else if (imgIndex > 39) {
		imgIndex = 0;
	}

	// change image
	photo.src = `assets/photos/johnst${imgIndex}.jpg`;

	// set map animation
	if (imgIndex <= 1) {
		mapIndex = 0;
	} else if (imgIndex <= 4) {
		mapIndex = 1;
	} else if (imgIndex <= 5) {
		mapIndex = 2;
	} else if (imgIndex <= 7) {
		mapIndex = 3;
	} else if (imgIndex <= 13) {
		mapIndex = 4;
	} else if (imgIndex <= 15) {
		mapIndex = 5;
	} else if (imgIndex <= 17) {
		mapIndex = 6;
	} else if (imgIndex <= 18) {
		mapIndex = 7;
	} else if (imgIndex <= 20) {
		mapIndex = 8;
	} else if (imgIndex <= 21) {
		mapIndex = 9;
	} else if (imgIndex <= 23) {
		mapIndex = 10;
	} else if (imgIndex <= 25) {
		mapIndex = 11;
	} else if (imgIndex <= 26) {
		mapIndex = 12;
	} else if (imgIndex <= 28) {
		mapIndex = 13;
	} else if (imgIndex <= 30) {
		mapIndex = 14;
	} else if (imgIndex <= 32) {
		mapIndex = 15;
	} else if (imgIndex <= 34) {
		mapIndex = 16;
	} else if (imgIndex <= 35) {
		mapIndex = 17;
	} else if (imgIndex <= 36) {
		mapIndex = 18;
	} else if (imgIndex <= 38) {
		mapIndex = 19;
	} else if (imgIndex <= 39) {
		mapIndex = 20;
	}
	if (mapIndex != currentMap) {
		currentMap = mapIndex;
		map.src = `assets/maps/map${mapIndex}.gif`;
	}
}