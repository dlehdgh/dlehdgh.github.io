$(document).ready(() => {
	// 사이드바의 현제 카테고리 선택
	$('.bd-sidebar .list-group a').each((i, el) => {
		if(location.pathname.includes($(el).attr('href')) == true){
			$(el).addClass('active').attr('aria-current', 'page');
		}
	});
	
	// 포스트 목록 표시
	postCheck('category');
	postCheck('tags');

	// 코드의 도구 생성
	codeGenerator();
	// 코드의 도구 버튼 이벤트
	$('.btn-run').click(codeRun);
	$('.btn-copy').click(copyClip);

	// SNS 공유
	$('.share .share-facebook').click(() => { // Facebook 공유
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href));
	});
	$('.share .share-twitter').click(() => { // Twitter 공유
		window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href));
	});

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
	$('pre').attr('tabindex', '0').before(tools);
};

// 포스트 목록을 출력할 것인지 체크
const postCheck = (key) => {
	if($(`.post-group[data-${key}]`).length > 0){
		$('.post-group').each((i, post) => {
			console.log('postCheck:', $(post).data(key));
			if($(post).data(key) != undefined){
				getPost(key, $(post).data(key));
			}
		});
	}
};
const getPost = (key, value) => {
	fetch('/search.json').then(response => {
		return response.json();
	}).then(jsondata => {
		// 현제 카테고리의 포스트 추출
		let post_list = $(`.post-group[data-${key}="${value}"]`);
		const data = jsondata.filter(obj => {
			console.log('value:', obj[key], '\nif 1:', obj[key].includes(value), '\nif 2:', obj[key] == value);
			if(obj[key].includes(',') == true){// 여러 문자열인 경우
				return obj[key].includes(value);
			}else{
				return obj[key] == value;
			}
		});
		const page = Number(getQuery('page') ?? 1);// 현제 페이지 번호
		const post_count = Number(post_list.data('postlist') ?? 10);// 한 페이지에 표시할 포스트 개수
		let first = (page - 1) * post_count;// 시작 번호(ex: 0, 10)
		let last = page * post_count - 1;// 마지막 번호(ex: 9, 19)
		if(last > data.length) last = data.length;
		// 포스트 목록 표시
		if(data.length == 0){
			post_list.append('<div class="post-item">등록된 게시글이 없습니다.</div>');
		}else{
			for(let i=0; i<data.length; i++){
				let post = data[i];
				if(i < first) continue;
				if(i > last) break;
				post_list.append(`<div class="post-item">
	<h3 class="post-title">
		<a href="${post.url}">${post.title}</a>
	</h3>
	<p class="post-meta">
		<i class="bi bi-person-fill" aria-hidden="true"></i>
		<span class="post-author" aria-description="작성자">${post.author}</span>
		<i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
		<span class="post-date" aria-description="등록일">${post.date}</span>
	</p>
</div>`);
			}
		}
		
		// 페이징 처리
		let page_list = $(`.post-group[data-${key}="${value}"] + .paginate`);
		const btn = "btn btn-outline-dark";// 버튼 클레스
		const page_count = 5;// 표시되는 페이지 번호의 개수
		let total_page = Math.ceil(data.length / post_count);// 총 페이지 수
		let first_page = ((Math.ceil(page / page_count) - 1) * page_count) + 1;// 시작 번호
		let last_page = first_page + page_count - 1;// 마지막 번호
		if(last_page > total_page) last_page = total_page;
		console.log('page:', page, '\ntotal_page:', total_page, '\nfirst_page:', first_page, '\nlast_page:', last_page);
		let fragment = $(document.createDocumentFragment());
		// 이전 페이지
		if(page == 1){
			fragment.append(`<a href="#" class="${btn} disabled" aria-label="이전 페이지"><i aria-hidden="true">&laquo;</i></a>`);
		}else{
			fragment.append(`<a href="./?page=${page - 1}" class="${btn}" aria-label="이전 페이지">&laquo;</a>`);
		}
		// 페이지 목록
		if(total_page > 1){
			for(let i=first_page; i<=last_page; i++){
				if(i == page){// 현제 페이지
					fragment.append(`<span class="${btn} active" aria-current="page">${i}</span>`);
				}else{
					fragment.append(`<a href="./?page=${i}" class="${btn}">${i}</a>`);
				}
			}
		}else{
			fragment.append(`<span class="${btn} active" aria-current="page">1</span>`);
		}
		// 다음 페이지
		if(page == total_page || total_page == 0){
			fragment.append(`<a href="#" class="${btn} disabled" aria-label="다음 페이지"><i aria-hidden="true">&raquo;</i></a>`);
		}else{
			fragment.append(`<a href="./?page=${page + 1}" class="${btn}" aria-label="다음 페이지">&raquo;</a>`);
		}
		page_list.html(fragment);
	});
};
