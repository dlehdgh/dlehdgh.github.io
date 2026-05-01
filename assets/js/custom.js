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

	// 베리어프리 뉴스 이벤트
	// 이전 날짜로 변경 이벤트
	$('#bn_prev_btn').click(() => {
		moveDate(-1);
	});
	// 오늘 날짜로 변경 이벤트
	$('bn_today_btn').click(function () {
		moveDate(0);
	});
	// 뉴스 페이지로 이동하기
	$('#blind_news').click(() => blind_news());
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

// 베리어프리 뉴스
const getToday = () => new Date();
const pad = (n) => n.toString().padStart(2, '0');

// 양식 생성
function blind_news_form() {
	const today = getToday();
	const year = today.getFullYear();
	const month = today.getMonth();
	const date = today.getDate();
	$('#bn_today').text(`오늘: ${year}년 ${month + 1}월 ${date}일`);

	// 연도
	for (let y=year-5; y<=year; y++) {
		$('#bn_year').append(`<option value="${y}">${y}</option>`);
	}
	// 월
	for (let m=1; m<=12; m++) {
		$('#bn_month').append(`<option value="${m}">${pad(m)}</option>`);
	}
	// 일
	for (let d=1; d<=31; d++) {
		$('#bn_day').append(`<option value="${d}">${pad(d)}</option>`);
	}
	// 오늘 날짜 선택
	$('#bn_year').val(year);
	$('#bn_month').val(month + 1);
	$('#bn_day').val(date);
}

// 날짜 변경
function moveDate(offset) {
	// offset: 0 = 오늘, -1 = 어제
	const y = parseInt($('#bn_year').val());
	const m = parseInt($('#bn_month').val());
	const d = parseInt($('#bn_day').val());
	const date = new Date(y, m - 1, d + offset);
	$('#bn_year').val(date.getFullYear());
	$('#bn_month').val(date.getMonth() + 1);
	$('#bn_day').val(date.getDate());
}

// 뉴스 페이지로 이동하기
function blind_news() {
	const year = $('#bn_year').val();
	const month = pad($('#bn_month').val());
	const day = pad($('#bn_day').val());
	if (!year || !month || !day) {
		console.log('ERROR: not value: year =', year, 'month =', month, 'day =', day);
		return;
	}
	if (year.length != 4 || month.length != 2 || day.length != 2) {
		console.log('ERROR: 연, 월, 일의 문자 길이가 맞지 않음: year =', year, 'month =', month, 'day =', day);
		return;
	}
	const y = year.slice(-2);
	const url = `http://news.ars.kr/${year}/${month}/${y}${month}${day}_1.html`
	window.open(url, '_blank');
}