let formContainer = document.getElementById("formCon");
let imgContainer = document.getElementById("imgCon");

let imgCols = document.getElementsByClassName("column");
function explore() {
	formContainer.classList.add("hidden");
	imgContainer.classList.remove("hidden");
	showImages();
}

function scrapImages(keyword) {
	
}

function showImages() {
	scrapImages("banana");
	for (let j = 0; j <= 10; j++) {
		for (var i = 0; i < 4; i++) {
			let img = document.createElement("img");
			let width = Math.floor(Math.random() * 100 + 100);
			let height = Math.floor(Math.random() * 100 + 100);
			img.src = "https://picsum.photos/" + width + "/" + height;
			imgCols[i % 4].appendChild(img);
		}
	}
}

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (clientHeight + scrollTop >= scrollHeight - 100) {
		showImages();
	}
});