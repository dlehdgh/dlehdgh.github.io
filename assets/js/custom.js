// 기존 이벤트 유지
// 검색 버튼
$(".search__toggle").on("click", function () {
	const is_visible = $(".search-content").hasClass("is--visible");
	$(this).attr("aria-expanded", String(!is_visible));
});
// 토글 메뉴
$("nav.greedy-nav .greedy-nav__toggle").on('click', function(){
	const is_close = $(this).hasClass('close');
	$(this).attr("aria-expanded", String(!is_close));
});
// 팔로우 메뉴 드롭다운
$(".author__urls-wrapper button").on("click", function () {
	const is_visible = $(".author__urls").hasClass("is--visible");
	$(this).attr("aria-expanded", String(!is_visible));
});

/*
// 카테고리 메뉴 드롭다운
const _toc_checkbox = $("#ac-toc");
const _toc_label = $('label[for="ac-toc"]');
const _toc_menu = checkbox.parent().find('.nav__items');
if (_toc_checkbox.length && _toc_menu.length) {
	// _toc_menu.hide();
	_toc_checkbox.on("change", function () {
		// console.log('checked:', this.checked);
		if (this.checked) {
			_toc_menu.fadeIn(200);
		} else {
			_toc_menu.fadeOut(200);
		}
	});
}
*/

$(document).ready(function () {
	codeblock_generator();
	
	// 검색 양식에 초점이 이동하지 않는 문제
	$("#search").removeAttr("tabindex");
	// ARIA 속성 추가
	$(".search__toggle, nav.greedy-nav .greedy-nav__toggle, .author__urls-wrapper button").each((i, el) => {
		$(el).attr("aria-expanded", "false");
	});
});

const codeblock_generator = () => {
	/**
	 * 코드 라벨
	 * 코드 라벨을 만들 경우 p 태그에 codeblock-label 클레스를 추가해 주면 되는데 HTML 태그를 수동으로 입력해줘야 하는 불편이 있다. 이러한 코드 라벨을 자동으로 생성하는 코드이다.
	 * 마크다운에서 코드 블럭 다음 줄에 {: data-label="Label"}를 입력하면 '.highlighter-rouge'에 data-label 속성이 추가된 것을 확인할 수 있다. data-label 속성의 값으로 코드 라벨을 생성한다.
	 * 코드 미리보기
	 * code-preview 클레스를 추가하면 코드를 가져와 HTML로 표시한다.
	 */
	$('.highlighter-rouge').each((i, el) => {
		// 코드 라벨 생성
		const label_class = 'codeblock-label';
		let label = $(el).attr('data-label');
		if(label != undefined && $(el).prev().hasClass(label_class) == false){
			$(el).before(`<p class="${label_class}">${label}</p>`);
		}
		// HTML 코드 미리보기 생성
		if($(el).hasClass('code-preview') && $(el).hasClass('language-html')){
			let code = $(el).find('pre code').text();
			code = code.replace(/[\n]+$/, '').replaceAll(/\n(<[^/])/g, '<br>$1');
			$(el).after(`<div class="highlight-preview"><p><strong>Preview</strong></p>${code}</div>`);
		}
	});
};