// Hàm hiển thị truyện theo thể loại truyện
async function getBooks(myAge) {
  try {
  		var category = null;
  		var loc = window.location.search;
  		var searchData = loc.substring(1);
  		var pageNum = window.location.hash.substring(6);
  		category = searchData;

  		var links = "https://dry-savannah-56936.herokuapp.com/api/books/" + category + "?page=" + pageNum + "&size=20";

		const response = await axios.get(links);
		const books = response.data.data.items;
		const numberPage = response.data.data.totalPages;

		//Add dữ liệu
		for (var i = 0; i < books.length; i++) {
			const bookContainer = document.createElement("div");
			bookContainer.className = "BookContainer";
			const bookDiv = document.createElement("div"); 
			bookDiv.className = "BookDiv";
			const bookImg = document.createElement("img");
			bookImg.className = "BookImg";

			bookImg.bookID = books[i].id;
			bookImg.bookCategory = category;

			const bookName = document.createElement("span");
			bookName.className = "BookName";
			const bookContent = document.createElement("p");
			bookContent.className = "BookContent";

			bookImg.src = books[i].firebaseThumbnail;
			bookImg.onclick = onBookClick;
			bookName.innerHTML = books[i].title.link("book-detail.html?" + category + "/" + books[i].id);
			bookContent.innerHTML = books[i].content;

			bookDiv.appendChild(bookImg);
			bookContainer.appendChild(bookName);
			bookContainer.appendChild(bookContent);
			bookDiv.appendChild(bookContainer);

			document.getElementById("booksList").appendChild(bookDiv);
		}

		for (var i = 1; i <= numberPage; i++) {
			const pageDiv = document.createElement("div"); 
			pageDiv.className = "PageDiv";
			const pageNumber = document.createElement("span");
			pageNumber.className = "PageNumber";

			pageNumber.number = i;
			pageNumber.cate = category;

			pageNumber.innerHTML = i;

			pageNumber.onclick = onPageClick;

			pageDiv.appendChild(pageNumber);

			document.getElementById("pagesList").appendChild(pageDiv);
		}
	} catch (error) {
  		console.error(error);
	}
}

// Hàm chuyển đến số trang của một thể loại truyện
function onPageClick(e) {
	var targetEl = e.target;
	window.location.href = "book-list.html?" + targetEl.cate + "#page=" + targetEl.number;
	location.reload();
}

// Hàm chuyển đến trang web đọc truyện
function onBookClick(e) {
	var targetEl = e.target;
	window.location.href =  "book-detail.html?" + targetEl.bookCategory + "/" + targetEl.bookID;
}

// Hàm trở về trang chủ
function gotoHome() {
	window.location.href = "book-list.html";
}

// Hàm chuyển đến thể loại Cổ Tích Việt Nam
function gotoCoTichVietNam() {
	window.location.href = "book-list.html?co-tich-viet-nam#page=1";
}

// Hàm chuyển đến thể loại Cổ Tích Về Loài Vật
function gotoCoTichVeLoaiVat() {
	window.location.href = "book-list.html?co-tich-ve-loai-vat#page=1";
}

// Hàm chuyển đến thể loại Cổ Tích Thần Kì
function gotoCoTichThanKy() {
	window.location.href = "book-list.html?co-tich-than-ky#page=1";
}

// Hàm chuyển đến thể loại Cổ Tích Thế Tục
function gotoCoTichTheTuc() {
	window.location.href = "book-list.html?co-tich-the-tuc#page=1";
}

// Hàm chuyển đến thể loại Cổ Tích Thế Tục
function gotoCoTichTheGioi() {
	window.location.href = "book-list.html?co-tich-the-gioi#page=1";
}

// Hàm chuyển đến thể loại Truyện Cười
function gotoTruyenCuoi() {
	window.location.href = "book-list.html?truyen-cuoi#page=1";
}

// Hàm chuyển đến thể loại Truyện Ngụ Ngôn
function gotoTruyenNguNgon() {
	window.location.href = "book-list.html?truyen-ngu-ngon#page=1";
}

// Hàm chuyển đến thể loại Truyện Dân Gian
function gotoTruyenDanGian() {
	window.location.href = "book-list.html?truyen-dan-gian#page=1";
}

// Hàm chuyển đến thể loại Truyện Cổ Grim
function gotoTruyenCoGrimm() {
	window.location.href = "book-list.html?truyen-co-grimm#page=1";
}

// Hàm chuyển đến thể loại Truyện Cổ Andersen
function gotoTruyenCoAndersen() {
	window.location.href = "book-list.html?truyen-co-andersen#page=1";
}

// Hàm chuyển đến thể loại Thần Thoại Hy Lạp
function gotoThanThoaiHyLap() {
	window.location.href = "book-list.html?than-thoai-hy-lap#page=1";
}

getBooks();













