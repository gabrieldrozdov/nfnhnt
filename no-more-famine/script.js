window.onload = () => {
	let content = document.querySelector('.content');
	let aisle = document.querySelectorAll('.aisle');
	let contentWidth = content.offsetWidth;
	let aisleWidth = 0;

	for (let i = 0; i < aisle.length; i++) {
		aisleWidth += aisle[i].offsetWidth;
	}

	content.scrollLeft = (aisle[0].offsetWidth / 2) - (contentWidth / 2);

	content.addEventListener('scroll', function() {
		if (content.scrollLeft + contentWidth >= aisleWidth-300) {
			// move the first aisle element to the end of the content
			let firstaisle = content.firstElementChild;
			content.appendChild(firstaisle);
			content.scrollLeft -= firstaisle.offsetWidth;
		} else if (content.scrollLeft <= 0) {
			// move the last aisle element to the beginning of the content
			let lastaisle = content.lastElementChild;
			content.prepend(lastaisle);
			content.scrollLeft = lastaisle.offsetWidth;
		}
	});

	document.addEventListener('resize', () => {
		aisleWidth = 0;
		for (let i = 0; i < aisle.length; i++) {
			aisleWidth += aisle[i].offsetWidth;
		}
	})
}