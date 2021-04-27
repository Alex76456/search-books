import React from 'react';
import './Snippet.css';

function Snippet({ snippet, onBookClick }) {
	function handleClick() {
		onBookClick(snippet);
	}

	return (
		<li className="snippets__list-item" onClick={handleClick}>
			<img
				className="snippets__image"
				src={
					snippet.cover_i ? (
						`http://covers.openlibrary.org/b/id/${snippet.cover_i}-M.jpg`
					) : (
						`https://missefficiency.nl/contents/media/l_naslagwerk_20171107144603.jpg`
					)
				}
				alt={snippet.name}
			/>
			<div className="snippets__container">
				<h2 className="snippets__snippet-title">{snippet.title}</h2>

				<p className="snippets__author">{snippet.author_name}</p>
			</div>
		</li>
	);
}

export default Snippet;
