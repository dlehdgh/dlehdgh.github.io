$(document).ready(() => {
	// 코드의 도구 생성
	codeGenerator();
	// 코드의 도구 버튼 이벤트
	$('.btn-run').click(codeRun);
	$('.btn-copy').click(copyClip);

	// 툴팁
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	
	// 태그 페이지에서 URL로 태그 선택
	if(location.pathname.includes('/tags/') == true){
		selectTag();
	}

	// 태그 페이지에서 태그 클릭 이벤트
	const triggerTabList = document.querySelectorAll('#tags-tab .nav-link');
	triggerTabList.forEach(triggerEl => {
		const tabTrigger = new bootstrap.Tab(triggerEl);
		const tag = $(triggerEl).attr('data-bs-target').slice(1);
		triggerEl.addEventListener('click', event => {
			event.preventDefault();
			pushState('tag', tag);
		});
		triggerEl.addEventListener('keyup', event => {
			event.preventDefault();
			pushState('tag', tag);
		});
	});
});

const getQuery = (key) => {
	let params = new URLSearchParams(location.search);
	let value = params.get(key);
	return value;
};

const selectTag = () => {
	let tag = getQuery('tag');
	const first = document.querySelector('#tags-tab li:first-child .nav-link');
	if(tag){
		let tab = new bootstrap.Tab(`#tags-tab #${tag}-tab`);
		tab.show();
	}else if(first != null){
		let tab = new bootstrap.Tab(`#tags-tab #${first.id}`);
		tab.show();
	}
};

// URL 변경 시 페이지 리로딩 막기
const pushState = (name, value) => {
	let url = new URL(location.href);
	url.searchParams.set(name, value);
	window.history.pushState(null, null, url.href);
};

// 코드 복사
const copyClip = (event) => {
	let code = $(event.delegateTarget).parent().next().text();
	let temp = $('<textarea class="visually-hidden">');
	$('body').append(temp);
	temp.text(code);
	temp.select();
	document.execCommand('copy');
	temp.remove();
};

// 코드 실행
const codeRun = (event) => {
	let code = $(event.delegateTarget).parent().next().text();
	let win = window.open('/example.html', '_blank');
	win.onload = function(){
		win.document.body.innerHTML = code;
	}
};

const codeGenerator = () => {
	// HTML 코드에만 미리보기 생성
	/* $('.language-html.highlighter-rouge').each((i, col) => {
		let preview = $('<div class="preview">');
		let pre = $(col).find('pre');
		pre.before(preview);
		preview.html(pre.text());
	}); */
	let tools = $('<div class="highlight-tools">');
	tools.append('<button type="button" class="btn btn-outline-primary btn-run" aria-label="코드 실행" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="코드 실행"><i class="bi bi-caret-right-fill"></i></button>');// 코드 실행
	tools.append('<button type="button" class="btn btn-outline-primary btn-copy" aria-label="코드 복사" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="코드 복사"><i class="bi bi-clipboard"></i></button>');// 코드 복사
	$('pre').attr('tabindex', '0').after(tools);
};
