$(function(){
	codeblock_label()
	/* // 저작권 정보 출력하기
	$.get("{{ '/_includes/creative-commons.html' | relative_url }}", function(data){
		$('#main > .page > .page__inner-wrap > .page__meta').before(data);
	}).fail(function(){
		console.error('Error loading creative-commons.html');
	}); */
})();

const codeblock_label = () => {
	/**
	 * 코드 라벨
	 * 코드 라벨을 만들 경우 p 태그에 codeblock-label 클레스를 추가해 주면 되는데 HTML 태그를 수동으로 입력해줘야 하는 불편이 있다. 이러한 코드 라벨을 자동으로 생성하는 코드이다.
	 * 마크다운에서 코드 블럭 다음 줄에 {: data-label="Label"}를 입력하면 '.highlighter-rouge'에 data-label 속성이 추가된 것을 확인할 수 있다. data-label 속성의 값으로 코드 라벨을 생성한다.
	 */
	$('.highlighter-rouge').each((i, el) => {
		const label_class = 'codeblock-label';
		let label = $(el).attr('data-label');
		if(label != undefined && $(el).prev().hasClass(label_class) == false){
			$(el).before(`<p class="${label_class}">${label}</p>`);
		}
	});
};