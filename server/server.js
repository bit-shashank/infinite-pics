require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
var cheerio = require("cheerio");
var cors = require('cors')

app.use(cors())
app.set("port", port);

app.listen(port, () => console.log(`App started on port ${port}.`));

app.get("/images/:query", async (req, res) => {
	word = await getNextWord(req.params.query);

	let images = await getImages(req.params.query);
    if(images)
	    res.json({ nextWord: word, images: images });
    else{
        images=[]
        res.json({ nextWord: word, images: images });
    }
});

async function getImages(query) {
	let url =
		"https://www.google.com/search?q=" +
		query +
		"&sxsrf=ALeKk01qKl915_4HGWDiNBbVJ8j-6oqygA:1625119286346&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiPt56OmcHxAhWIc30KHQE8BjAQ_AUoAXoECAEQAw&biw=1366&bih=663";
	try {
		const { data } = await axios.get(url);
		let $ = cheerio.load(data);
		let images = $("img");
		let sources = [];
		$(images).each(function (i, img) {
			let src = $(img).attr("src");
			if (src.startsWith("https")) sources.push(src);
		});
		return sources;
	} catch (err) {
		console.log(err);
	}
}

async function getNextWord(currWord) {
	let url = "https://en.wikipedia.org/wiki/" + currWord;
	try {
		const { data } = await axios.get(url);
		let $ = cheerio.load(data);
		let links = $("p a");
		let nextWords = [];

		$(links).each(function (i, link) {
			let text = $(link).text();
			if (text.charAt(text.length - 1) == ":") text.slice(0, -1);
			let url = $(link).attr("href");
			if (
				url != undefined &&
				url.startsWith("/wiki/") &&
				text.indexOf(" ") == -1 &&
				text.length >= 2
			)
			nextWords.push(text);
		});
        if (nextWords.length==0)
            return "death"

		let word = nextWords[Math.floor(Math.random() * nextWords.length)];
		return word;
	} catch (err) {
		console.log(err);
		return "death";
	}
}
