// Hàm hiển thị những cuốn truyện đã lưu
function getLibraryBook() {
	var localData = window.localStorage.getItem('favoriteBook');
	var localArray = JSON.parse(localData);

	for (var i = 0; i < localArray.length; i++) {
		const libraryDiv = document.createElement("div");
		libraryDiv.className = "LibraryDiv";
		const libraryContainer = document.createElement("div");
		libraryContainer.className = "LibraryContainer";
		const libraryImg = document.createElement("img");
		libraryImg.className = "LibraryImg";
		const libraryContent = document.createElement("p");
		libraryContent.className = "LibraryContent";
		const libraryName = document.createElement("span");
		libraryName.className = "LibraryName";
		const libraryBtnRemove = document.createElement("button");
		libraryBtnRemove.className = "BtnRemove";

	    libraryImg.src = localArray[i].img;
	    libraryImg.onclick = onBookClick;
	    libraryContent.innerHTML = localArray[i].content;
	    libraryName.innerHTML = localArray[i].name.link(localArray[i].link);
	    libraryBtnRemove.innerHTML = "Xoá";

	    libraryImg.linkBook = localArray[i].link;
	    libraryBtnRemove.removeBook = i;
	    libraryBtnRemove.onclick = removeFavoriteBook;

	    libraryDiv.appendChild(libraryImg);
	    libraryContainer.appendChild(libraryName);
	    libraryContainer.appendChild(libraryContent);
	    libraryDiv.appendChild(libraryContainer);
	    libraryDiv.appendChild(libraryBtnRemove);

	  	document.getElementById("libraryData").appendChild(libraryDiv);
	}
}

// Hàm xoá truyện khỏi thư viện
function removeFavoriteBook(e) {
	var targetEl = e.target;
	var localDataBook =  window.localStorage.getItem('favoriteBook');
	var arrDataBook = JSON.parse(localDataBook);

	arrDataBook.splice((targetEl.removeBook), 1);

	window.localStorage.setItem('favoriteBook', JSON.stringify(arrDataBook));
	window.location.reload();
}

// Hàm chuyển đến trang đọc truyện khi click vào ảnh truyện
function onBookClick(e) {
	var targetEl = e.target;
	window.location.href =  targetEl.linkBook;
}

// Gọi hàm hiển thị những cuốn truyện đã lưu
getLibraryBook();


