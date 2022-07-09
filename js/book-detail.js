var hideAlertTimeout = null;

// Hàm in ra dữ liệu truyện để người dùng đọc
async function getStory() {
  try {
    var locStory = window.location.search;
    var linkLength = locStory.length;

    var categoryStory = locStory.slice(1, -37);
    var idStory = locStory.substring((linkLength - 36));

    var link = "https://dry-savannah-56936.herokuapp.com/api/books/" + categoryStory + "/" + idStory;

    const response = await axios.get(link);
    const books = response.data.data;
    document.title = books.title;

    const bookDetailDiv = document.createElement("div");
    bookDetailDiv.className = "BookDetailDiv";
    const bookDetailButton = document.createElement("button");
    bookDetailButton.className = "BookDetailButton";
    const bookDetailName = document.createElement("p");
    bookDetailName.className = "BookDetailName";
    const bookDetailData = document.createElement("p");
    bookDetailData.className = "BookDetailData";
    const bookDetailImg = document.createElement("img");
    bookDetailImg.className = "BookDetailImg";

    bookDetailName.innerHTML =  books.title;
    bookDetailImg.src = books.firebaseThumbnail;
    bookDetailData.innerHTML = books.content;

    bookDetailButton.storyName = books.title;
    bookDetailButton.storyImg = books.firebaseThumbnail;
    bookDetailButton.storyId = books.id;
    bookDetailButton.storyLink = window.location.href;
    bookDetailButton.storyContent = books.content.slice(0, 300);
    bookDetailButton.onclick = addBook2Favorite;
    bookDetailButton.innerHTML = "Lưu";

    bookDetailDiv.appendChild(bookDetailName);
    bookDetailDiv.appendChild(bookDetailButton);
    bookDetailDiv.appendChild(bookDetailImg);
    bookDetailDiv.appendChild(bookDetailData);

  	document.getElementById("storiesData").appendChild(bookDetailDiv);
	} catch (error) {
  		console.error(error);
	}
}

// Hàm kiểm tra dữ liệu ở local storage để xem truyện đã lưu hay chưa
function addBook2Favorite(e) {
    var book = {img: e.target.storyImg, name: e.target.storyName, id: e.target.storyId, content: e.target.storyContent, link: e.target.storyLink};
    var localStorageFavoviteBooks = window.localStorage.getItem('favoriteBook');

    var favoriteBooks = localStorageFavoviteBooks == null ? [] : JSON.parse(localStorageFavoviteBooks);

    var isExisted = false;
    for (var i = 0; i < favoriteBooks.length; i++) {
        if ((favoriteBooks[i].name).localeCompare(book.name) == 0) {
            isExisted = true;
        }
    }

    if (isExisted) {
        changeDataAlert();
        showAlert();

        document.getElementById("closeAlertBtn").addEventListener("click", hideAlert);

        hideAlertTimeout = setTimeout(hideAlert, 3000);
        console.log(hideAlertTimeout);
    } else {
        favoriteBooks.push(book);
        window.localStorage.setItem('favoriteBook', JSON.stringify(favoriteBooks));

        showAlert();

        document.getElementById("closeAlertBtn").addEventListener("click", hideAlert);

        hideAlertTimeout = setTimeout(hideAlert, 3000);
    }
}

getStory();

//Hàm hiển thị thông báo "Lưu" hoặc "Truyện đã lưu"  
function showAlert() {
    document.getElementById("alert").style.visibility = 'visible';
}

//Hàm ẩn thông báo "Lưu" hoặc "Truyện đã lưu"  
function hideAlert() {
    document.getElementById("alert").style.visibility = 'hidden';
    if (hideAlertTimeout) {
        clearTimeout(hideAlertTimeout);
    }
}

// Hàm thay đổi nội dung thông báo "Lưu Truyện Thành Công" thành "Truyện Này Bạn Đã Lưu Rồi" và thay đổi mà thông báo
function changeDataAlert() {
    document.getElementById("alert").style.background = "#FFCDBD";
    document.getElementById("dataAlert").style.color = "#D52753";
    document.getElementById("closeAlertBtn").style.color = "#D52753";
    document.getElementById("dataAlert").innerHTML = "Truyện Này Bạn Đã Lưu Rồi";
}











