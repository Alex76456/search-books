import React from 'react';
import { useState } from 'react';
import api from '../utils/api';

import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import BookPopup from './BookPopup/BookPopup';
import Footer from './Footer/Footer';

function App() {
	const [ snippets, setSnippets ] = useState([]);
	const [ isBookOpened, setIsBookOpened ] = useState(false);
	const [ selectedBook, setSelectedBook ] = useState({});
	const [ isRender, setIsRender ] = useState(false);
	const [ isSuccessImage, setIsSuccessImage ] = useState(true);

	function handleBookClick(choosenSpippet) {
		setSelectedBook(choosenSpippet);
		setIsBookOpened(true);
	}

	function closeBookPopup() {
		setIsBookOpened(false);
		setSelectedBook({});
	}

	function handleClick(e) {
		if (e.target.classList.contains('popup')) {
			closeBookPopup();
		}
	}

	async function handleSearchSubmit(request) {
		if (request !== '') {
			setIsRender(true);
			let res = await api.getSnippets(request);

			console.log(res.numFound);
			setIsSuccessImage(res.numFound > 0 ? true : false);

			setSnippets(res.docs);
			setIsRender(false);
		}
	}
	return (
		<div className="root">
			<div className="page">
				<Header />
				<Main
					snippets={snippets}
					onSnippetClick={handleBookClick}
					onSearch={handleSearchSubmit}
					isRender={isRender}
					isSuccessImage={isSuccessImage}
				/>
				<Footer />
				<BookPopup
					book={selectedBook}
					isOpen={isBookOpened}
					onClose={closeBookPopup}
					onEscClose={handleClick}
				/>
			</div>
		</div>
	);
}

export default App;
