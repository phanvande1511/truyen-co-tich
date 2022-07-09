// Hàm tìm kiếm truyện
async function search() {
	var childBookResults = [];
	childBookResults = document.getElementById("bookResults").childNodes;

	while (childBookResults.length != 0) {
		for (var i = 0; i < childBookResults.length; i++) {
			childBookResults[i].remove();
		}

	}

	var searchValue = document.getElementById('searchInput').value;
	var apiSearch = "https://dry-savannah-56936.herokuapp.com/api/search-books?name=" + searchValue;

	const response = await axios.get(apiSearch);
	const bookSearch = response.data.data.items;

	if (bookSearch.length == 0) {
		document.getElementById('imgNotFound').style.display = "inherit";
		document.getElementById('imgSearch').style.display = "none";
	} else {
		document.getElementById('imgNotFound').style.display = "none";
		document.getElementById('imgSearch').style.display = "none";
		
		for (var i = 0; i < bookSearch.length; i++) {
			document.getElementById('imgSearch').style.display = "none";
			const searchDiv = document.createElement("div");
			searchDiv.className = "SearchDiv";
			const searchContainer = document.createElement("div");
			searchContainer.className = "SearchContainer";
			const searchImg = document.createElement("img");
			searchImg.className = "SearchImg";
			const searchContent = document.createElement("p");
			searchContent.className = "SearchContent";
			const searchName = document.createElement("span");
			searchName.className = "SearchName";

			searchImg.searchBookID = bookSearch[i].id;
			searchImg.searchBookCatecory = bookSearch[i].category;

			searchImg.onclick = onBookSearch;

			searchImg.src = bookSearch[i].firebaseThumbnail;
			searchName.innerHTML = bookSearch[i].title.link("book-detail.html?" + bookSearch[i].category + "/" + bookSearch[i].id);

			searchDiv.appendChild(searchImg);
			searchDiv.appendChild(searchName);
			searchDiv.appendChild(searchContent);

			document.getElementById("bookResults").appendChild(searchDiv);
		}
	}
}

// Hàm có chức năng dẫn đến trang có nội dung truyện
function onBookSearch(e) {
	var targetEl = e.target;
	window.location.href =  "book-detail.html?" + targetEl.searchBookCatecory + "/" + targetEl.searchBookID;
}

// Nếu nhấn "Enter" thì cũng tìm kiếm 
document.getElementById("searchInput").addEventListener('keypress', function (e) {
	if(e.key == "Enter") {
		search();
	}
});


























