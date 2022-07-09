// Hàm hiển thì những truyện tiêu biểu của những thể loại truyện
async function getBooks() {
  try {
  		var catecoryList = ["co-tich-viet-nam", "co-tich-the-gioi", "truyen-cuoi", "truyen-ngu-ngon",  "truyen-dan-gian"];
  		for (var i = 0; i < catecoryList.length; i++) {
  			var link = "https://dry-savannah-56936.herokuapp.com/api/books/" + catecoryList[i] + "?page=5&size=5";
 
  			const response = await axios.get(link);
  			var book = response.data.data.items;

			const bookBtn = document.createElement("button"); 
			bookBtn.className = "BookBtn";

			if (catecoryList[i] == "co-tich-viet-nam") {
				bookBtn.innerHTML = "Truyện Cổ Tích Việt Nam".link("book-list.html?" + catecoryList[i] + "#page=1");
				document.getElementById("bookIntro").appendChild(bookBtn);
			} else if (catecoryList[i] == "co-tich-the-gioi") {
				bookBtn.innerHTML = "Truyện Cổ Tích Thế Giới".link("book-list.html?" + catecoryList[i] + "#page=1");
				document.getElementById("bookIntro").appendChild(bookBtn);
			} else if (catecoryList[i] == "truyen-cuoi") {
				bookBtn.innerHTML = "Truyện Cười".link("book-list.html?" + catecoryList[i] + "#page=1");
				document.getElementById("bookIntro").appendChild(bookBtn);
			} else if (catecoryList[i] == "truyen-ngu-ngon") {
				bookBtn.innerHTML = "Truyện Ngụ Ngôn".link("book-list.html?" + catecoryList[i] + "#page=1");
				document.getElementById("bookIntro").appendChild(bookBtn);
			} else {
				bookBtn.innerHTML = "Truyện Dân Gian".link("book-list.html?" + catecoryList[i] + "#page=1");
				document.getElementById("bookIntro").appendChild(bookBtn);
			}

	  		for (var j = 0; j < book.length; j++) {
				const bookContainer = document.createElement("div");
				bookContainer.className = "BookContainer";
				const bookDiv = document.createElement("div"); 
				bookDiv.className = "Book";
				const bookImg = document.createElement("img");
				bookImg.className = "BookImg";
				const bookName = document.createElement("span");
				bookName.className = "BookName";
				const bookContent = document.createElement("p");
				bookContent.className = "BookContent";

				bookImg.bookID = book[j].id;
				bookImg.bookCatecory = catecoryList[i];

				bookImg.src = book[j].firebaseThumbnail;
				bookImg.onclick = onBookClickBook4;
				bookName.innerHTML = book[j].title.link("book-detail.html?" + catecoryList[i] + "/" + book[j].id);
				bookContent.innerHTML = book[j].content;

				bookDiv.appendChild(bookImg);
				bookContainer.appendChild(bookName);
				bookContainer.appendChild(bookContent);
				bookDiv.appendChild(bookContainer);

				document.getElementById("bookIntro").appendChild(bookDiv);
			}
  		}
	} catch (error) {
  		console.error(error);
	}
}

// Hàm có chức năng dẫn đến trang có nội dung truyện
function onBookClickBook4(e) {
	var targetEl = e.target;
	window.location.href =  "book-detail.html?" + targetEl.bookCatecory + "/" + targetEl.bookID;
}


getBooks();