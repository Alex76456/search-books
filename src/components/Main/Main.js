import React from 'react';
import './Main.css';
import { useState, useEffect } from 'react';
//import { snippets } from '../../data/data';
import Snippet from '../Snippet/Snippet';

function Main({ onSnippetClick, snippets, onSearch, isRender, isSuccessImage }) {
	const [ request, setRequest ] = useState('');

	const [ timer, setTimer ] = useState();

	const [ visibleSnippets, setVisibleSnippets ] = useState(9);

	function showMoreSnippets() {
		setVisibleSnippets(visibleSnippets + 4);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSearch(request.replace(/ /g, '+'));
		setRequest('');
	}

	function handleRequestChange(e) {
		setRequest((request) => (request = e.target.value));

		clearTimeout(timer);
		setTimer(
			setTimeout(() => {
				onSearch(request.replace(/ /g, '+'));
				//console.log('ЗАПУСТИЛСЯ ТАЙМЕР');
			}, 1000)
		);
	}

	useEffect(
		() => {
			if (request === '') clearTimeout(timer);
		},
		[ request, timer ]
	);

	return (
		<main className="main">
			<section className="search">
				<form className="search__form" onSubmit={handleSubmit} noValidate>
					<label className="search__form-field">
						<input
							className="search__input"
							type="url"
							name="search-input"
							placeholder="Начните вводить название книги"
							required
							value={request}
							onChange={handleRequestChange}
						/>
					</label>

					<button
						className="search__submit"
						type="submit"
						disabled={request !== '' ? false : true}
					>
						Поиск
					</button>
				</form>
			</section>

			<section className="snippets">
				<h2 className="snippets__title">
					{isRender ? 'Идет поиск...' : 'Результаты поиска:'}
				</h2>
				{!isSuccessImage && (
					<img
						className="snippets__success-image"
						src={'https://giklive.com/wp-content/uploads/2017/09/travolta-confused.gif'}
						alt="книга не найдена"
					/>
				)}
				<ul className="snippets__list">
					{snippets.map((item, i) => {
						return (
							i <= visibleSnippets && (
								<Snippet snippet={item} key={i} onBookClick={onSnippetClick} />
							)
						);
					})}
				</ul>
				{snippets.length > visibleSnippets && (
					<button
						className="snippets__help-button"
						type="button"
						onClick={showMoreSnippets}
					>
						Показать еще...
					</button>
				)}
				{window.pageYOffset > 600 && (
					<button
						className="snippets__help-button"
						type="button"
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
					>
						Вернуться
					</button>
				)}
			</section>
		</main>
	);
}

export default Main;
