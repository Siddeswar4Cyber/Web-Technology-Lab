let xmlDoc = null;

function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET","books.xml",true);

    xhr.onload = function() {
        if (this.status === 200) {
            if(!xhr.responseXML) {
                showMessage("Error: Unable to parse XML.", "error");
                return;
            }
            xmlDoc = xhr.responseXML;
            if(!xmlDoc.getElementsByTagName("book").length) {
                showMessage("No books available in XML.", "error");
            }
                displayBooks();
        }
        else {
            showMessage("Error: Unable to load XML file.", "error");
        }
    };

    xhr.onerror = function() {
        showMessage("Error: Network error occurred while loading XML file.", "error");
    };

    xhr.send();
}

function displayBooks() {
    const table = document.getElementById("booksTable");
    const books = xmlDoc.getElementsByTagName("book");
    table.innerHTML ="";
    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const availability = books[i].getElementsByTagName("availability")[0].textContent;

        const row = `
        <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td>${availability}</td>
            <td>
                <button class="edit-btn" onclick="toggleAvailability(${id})">Toggle Availability</button>
                <button class="delete-btn" onclick="deleteBook(${id})">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += row;
    }
    showMessage("Books loaded successfully.", "success");
}

function toggleAvailability(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        const bookId = books[i].getElementsByTagName("id")[0].textContent;
        if (bookId == id) {
            const availability = books[i].getElementsByTagName("availability")[0];
            availability.textContent = availability.textContent === "Available" ? "Not Available" : "Available";
            showMessage(`Book ID ${id} availability toggled.`, "success");
            displayBooks();
            return;
        }
    }
    showMessage(`Error: Book ID ${id} not found.`, "error");
}

function addBook() {
    const id = document.getElementById("bookID").value;
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const availability = document.getElementById("bookAvailability").value;
    if (!id || !title || !author || !availability) {
        showMessage("Error: All fields are required to add a book.", "error");
        return;
    }

    const newBook = xmlDoc.createElement("book");
    const idElement = xmlDoc.createElement("id");
    idElement.textContent = id;
    const titleElement = xmlDoc.createElement("title");
    titleElement.textContent = title;
    const authorElement = xmlDoc.createElement("author");
    authorElement.textContent = author;
    const availabilityElement = xmlDoc.createElement("availability");
    availabilityElement.textContent = availability;

    newBook.appendChild(idElement);
    newBook.appendChild(titleElement);
    newBook.appendChild(authorElement);
    newBook.appendChild(availabilityElement);

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);
    showMessage(`Book ID ${id} added successfully.`, "success");
    displayBooks();
}

function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        const bookId = books[i].getElementsByTagName("id")[0].textContent;
        if (bookId == id) {
            xmlDoc.getElementsByTagName("library")[0].removeChild(books[i]);
            showMessage(`Book ID ${id} deleted successfully.`, "success");
            displayBooks();
            return;
        }
    }
    showMessage(`Error: Book ID ${id} not found.`, "error");
}

function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type === "success" ? "success" : "error";
    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "";
    }
    , 3000);
}

document.addEventListener("DOMContentLoaded", loadBooks);
