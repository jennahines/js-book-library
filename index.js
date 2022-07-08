class Book {
	constructor( title, author, pageCount, isRead ) {
		this.title = title;
		this.author = author;
		this.pageCount = pageCount;
		this.isRead = isRead;
	}
}

function addBookToLibrary() {
	if (
		$titleInput.value === '' 
		|| $authorInput.value === ''
		|| $pagesInput.value === ''
	) {
		alert( 'Please fill in all fields' );
		return;

	} else {
		const newBook = new Book( $titleInput.value, $authorInput.value, $pagesInput.value, $readInput.checked );
		library.push( newBook );
		updateStorage();
	}
}

function removeBookFromLibrary( index ) {
	library.splice( index, index + 1 );

	updateStorage();
	render();
}

function toggleReadStatus( index ) {
	library[index].isRead = !library[index].isRead;

	updateStorage();
	render();
}

function findBook( libraryArray, title ) {
	if ( libraryArray.length === 0 || libraryArray === null ) {
		return;
	}

  	for ( const book of libraryArray ) {
		if ( book.title === title ) {
			return libraryArray.indexOf( book );
		}
    }
}

function updateStorage() {
	console.log(library);
	localStorage.setItem( 'library', JSON.stringify( library ) );
}

function checkStorage() {
	if ( localStorage.getItem( 'library' ) ) {
		if ( localStorage.getItem( 'library' ) === '[]') {
			if ( confirm( 'Do you want to load the default library books?' ) ) {
				library = DEFAULT_BOOKS;
				updateStorage();
			}

		} else {
			library = JSON.parse( localStorage.getItem( 'library' ) );
		}

	} else {
		library = DEFAULT_BOOKS;
		updateStorage();
	}
}

function clearForm() {
	$titleInput.value = '';
	$authorInput.value = '';
	$pagesInput.value = '';
	$readInput.checked = false;
}

function render() {
	$libraryContainer.innerHTML = '';
	checkStorage();

	for ( const book of library ) {
		const bookHtml = `
			<div class="book-item flex flex-col border p-2 m-2">
				<p class="book__title"><strong>Title:</strong> ${book.title}</p>
				<p class="book__author"><strong>Author:</strong> ${book.author}</p>
				<p class="book__page-count"><strong>Pages:</strong> ${book.pageCount}</p>
				<p class="book__read-status"><strong>Read:</strong> ${book.isRead ? checkSvg : xMarkSvg}</p>
				<div class="book__actions mt-auto pt-2 self-end">
					<button class="button" data-action="remove" onclick="removeBookFromLibrary(findBook(library, '${book.title}'));">Remove Book</button>
					<button class="button" data-action="toggle-status" onclick="toggleReadStatus(findBook(library, '${book.title}'));">Mark ${book.isRead ? 'Unread' : 'Read'}</button>
				</div>
			</div>
		`;
		$libraryContainer.insertAdjacentHTML( 'beforeend', bookHtml );
	}
	
}

let library = [];

const DEFAULT_BOOKS = [
	{
		title: 'Nowhere for Very Long: The Unexpected Road to an Unconventional Life',
		author: 'Brianna Madia',
		pageCount: 272,
		isRead: true,
	},
	{
		title: 'Where the Crawdads Sing',
		author: 'Delia Owens',
		pageCount: 400,
		isRead: false,
	},
];

const $libraryContainer = document.getElementById( 'books' );

const checkSvg = `
	<svg class="svg-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
		<path 
			fill="currentColor" 
			d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
		/>
	</svg>
`;
const xMarkSvg = `
	<svg class="svg-xmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
		<path 
			fill="currentColor" 
			d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
		/>
	</svg>
`;

const $addBookForm = document.getElementById( 'add-book' );
const $titleInput = document.getElementById( 'title' );
const $authorInput = document.getElementById( 'author' );
const $pagesInput = document.getElementById( 'pages' );
const $readInput = document.getElementById( 'read' );

$addBookForm.addEventListener( 'submit', ( e ) => {
	e.preventDefault();
	addBookToLibrary();
	render();
	clearForm();
});

render();

