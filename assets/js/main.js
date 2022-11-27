$(document).ready(() => {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

	let tag = getQuery('tag');
	let first = $('#pills-tab .nav-link').first();
	if(tag){
		let tab = new bootstrap.Tab(tag);
		tab.show();
	}else if(first.length > 0){
		let tab = new bootstrap.Tab(`#${first.attr('id')}`);
		tab.show();
	}
});

const getQuery = (key) => {
	let params = new URLSearchParams(location.search);
	let value = params.get(key);
	return value;
};

const setQuery = (key, value) => {
	// const path = `${location.protocol}//${location.host}${location.pathname}?tag=${tag}`;
	// window.history.replaceState({ path }, '', path);
	let params = new URLSearchParams(location.search);
	params.set(key, value);
	window.location.search = '?' + params.toString();
};
