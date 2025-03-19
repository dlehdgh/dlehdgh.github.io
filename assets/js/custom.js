$(document).ready(function () {
	codeblock_generator();
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