let formContainer = document.getElementById("formCon");
let imgContainer = document.getElementById("imgCon");
let imgCols = document.getElementsByClassName("column");
let keyword;
function explore() {
	formContainer.classList.add("hidden");
	imgContainer.classList.remove("hidden");
	keyword=document.getElementById("wordInp").value;
	if (keyword==undefined)
		keyword="Love"
	showImages();
}

async function scrapImages() {
	let url="https://serverimg.herokuapp.com/images/"+keyword;
	let res=await fetch(encodeURI(url),{
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
	})

	data= await res.json();
	keyword=data.nextWord;
	return data.images;
}

async function showImages() {
	images=await scrapImages(keyword);
	for (let i = 0; i < images.length; i++) {
			let img = document.createElement("img");
			img.src = images[i];
			imgCols[i % 4].appendChild(img);
	}
}

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (clientHeight + scrollTop >= scrollHeight - 100) {
		showImages();
	}
});