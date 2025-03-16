---
title: "Github 블로그 - 18. 포스트 꾸미기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Syntax highlighter
  - Code Block Label
  - Code Block Line number
  - Permalink
  - 크리에이티브 커먼즈
  - 복사 금지
date: 2025-02-09 11:19
last_modified_at: 2025-03-08 18:57
---

블로그의 포스트를 좀 더 꾸며 보겠다.

## Syntax highlighter 테마 설정하기

[Rouge 테마 미리보기 사이트](https://spsarolkar.github.io/rouge-theme-preview/){: target="_blank"}로 이동해서 **Select Theme** 버튼으로 테마를 변경해 보면서 마음에 드는 테마를 찾아보고 선택하세요.

저는 어두운 배경에 구분 잘 되는 알록달록을 좋아하기 때문에 **base16.monokai.dark**로 선택했습니다. 원하는 테마를 선택하셨다면, **‘Current Selection:’**에 나오는 이름을 기억해 두세요. 

**Syntax highlighter 테마 적용 방법**

명령프롬프트에서 블로그가 있는 폴더로 이동한 뒤 다음 명령어를 입력해서 테마를 설치합니다.

```bash
gem install kramdown rouge
```

`_config.yml` 파일에 아래 코드를 추가합니다.

```yaml
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge
```

CSS 파일을 생성하기 위해 명령프롬프트에 다음 명령을 입력합니다. 그러면 assets/css 폴더에 syntax.css 파일이 생성됩니다.

```bash
rougify style base16.monokai.dark > assets/css/syntax.css
```

위 내용에서 `base16.monokai.dark` 대신 원하는 테마 이름을 넣으면 해당 테마의 CSS 파일이 생성됩니다.

코드블럭을 만들고 확인해보세요.

## 코드 블럭에 라벨 추가하기

코드 블럭에 라벨을 달기 위해 찾아보니 마크다운 파일에서 코드블럭 다음에 `{: data-label="라벨"}`을 입력하고, 레이아웃에서 {% raw %}`{{ content | replace: '<p>:label=', '<p class="codeblock-label">' }}`{% endraw %}를 입력하면 된다고 했지만 제대로 동작하지 않아 JavaScript로 코드블럭에 라벨을 생성하도록 만들었다.

{% raw %}
~~~liquid
```html
<p>테스트</p>
```
{: data-label="Example"}
~~~
{: data-label="Input"}
{% endraw %}

```html
<div data-label="Example" class="language-html highlighter-rouge">
	<div class="highlight">
		<pre class="highlight">
			<code><span class="nt">&lt;p&gt;</span>테스트<span class="nt">&lt;/p&gt;</span></code>
		</pre>
	</div>
</div>
```
{: data-label="Output"}

코드 블럭의 구조를 보면 다음과 같다.

```bash
┌─ .highlighter-rouge
│  ├─ div.highlight
│  │  └─ pre.highlight
```

JavaScript로 `.highlighter-rouge`의 `data-label` 속성 값을 가져와 p 태그를 추가해주면 된다.

```js
$('.highlighter-rouge').each((i, el) => {
	let label = $(el).attr('data-label');
	if(label){
		$(el).before(`<p class="codeblock-label">${label}</p>`)
	}
});
```

이제 CSS로 코드블럭의 라벨을 예쁘게 꾸며주면 된다.

```css
.codeblock-label {
	--border-radius: 5px;
	display: inline-block;
	font-size: 0.75rem;
	padding: 0.25rem 0.75rem;
	margin-bottom: 0;
	border-bottom-width: 0;
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
	color: var(--bs-dark);
	background-color: var(--bs-secondary);
}
.codeblock-label + .highlighter-rouge .highlight {
	border-top-left-radius: 0;
}
```

## 코드 블럭에 복사 버튼 추가하기

코드 블럭의 코드를 복사하는 기능이 제공되지 않아 코드를 복사하기 쉽도록 JavaScript로 기능을 만들어 줄 것이다.

```js
let btn_copy = '<button type="button" class="btn btn-outline-primary btn-sm btn-copy" aria-label="코드 복사"><i class="fa-solid fa-clipboard" aria-hidden="true"></i></button>';
$('pre').before(btn_copy);
$('.btn-copy').click((event) => {
	copyClip($(event.delegateTarget).parent().next().text());
});

// 코드 복사
const copyClip = (content) => {
	if(!content || typeof content != 'string'){
		console.error('Error: 전달 받은 값이 없거나 형식이 올바르지 않습니다.', typeof content, content);
		return false;
	}
	let temp = $('<textarea class="visually-hidden">');
	$('body').append(temp);
	temp.text(content);
	temp.select();
	document.execCommand('copy');
	temp.remove();
};
```

코드를 설명하자면 `pre` 태그에 Copy 버튼을 생성하고 버튼을 클릭하면 `pre` 태그의 코드를 가져온 뒤 `textarea` 태그에 입력한 다음 코드를 복사해 오는 것이다.

CSS로 코드 복사 버튼을 코드 블럭 오른쪽 위에 표시하도록 하겠다.

```css
div.highlight {
	position: relative;
}
.btn-copy {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.25rem;
	z-index: 9999;
	opacity: 0.25;
}
.btn-copy:focus,
.btn-copy:hover {
	opacity: 1;
}
```

## 코드 블럭 클릭 시 코드 편집창 표시하기

웹에서 검색을 하다 보면 코드를 더블 클릭하면 편집창처럼 나오게 해놓은 곳을 볼 수 있다. JavaScript로 구현해 보자.

```javascript
// 더블 클릭 시 이벤트
$('pre.highlight').dblclick(function(){
	let code = $(this).find('code').text().replace(/[\n]+$/, ''); // 마지막 줄의 빈 줄 제거
	let textarea = $('<textarea class="highlight-form form-control"></textarea>').html(code);
	$(this).attr('aria-hidden', 'true').after(textarea);
});
// 포커스 아웃 시 요소 제거
$(document).on('focusout', 'textarea.highlight-form', function(){
	$(this).removeAttr('aria-hidden').remove();
});
```

코드를 설명하자면 코드 블럭을 더블 클릭하면 코드의 내용을 가져와 `textarea` 요소에 입력해서 보여주고 초점이 빠져나오면 `textarea` 요소를 제거하는 것이다.

```css
div.highlight {
	position: relative;
}
.highlight-form {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	text-wrap: nowrap;
	line-height: 1.35em;
}
```

아래 코드 블럭을 더블 클릭해 보면 편집창으로 코드가 나오는 것을 확인할 수 있다.

```javascript
console.log("hello world")
```
{: id="demo" data-label="Example"}

<style>#demo div.highlight{position:relative}.highlight-form{position:absolute;top:0;bottom:0;left:0;right:0;text-wrap:nowrap;line-height:1.35em}</style>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script>$("#demo pre.highlight").dblclick(function(){let code=$(this).find("code").text().replace(/[\n]+$/,"");let textarea=$('<textarea class="highlight-form form-control"></textarea>').html(code);$(this).attr("aria-hidden","true").after(textarea)});$(document).on("focusout","textarea.highlight-form",function(){$(this).removeAttr("aria-hidden").remove()});</script>

## 코드블럭에 줄 번호 추가하기

기존에는 코드 블럭을 만들 때 그레이브(\`)를 세번 입력했는데 줄 번호를 표시하고 싶다면 Liquid 구문인 `highlight`를 이용해야 한다.

{% raw %}
```
{% highlight python linenos %}
코드 블럭
{% endhighlight %}
```
{% endraw %}

`_config.yml` 파일을 아래와 같이 수정하면 된다.

```yml
markdown: kramdown
kramdown:
  highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: true
```

아래 코드블럭은 위에서 설명한 방법으로 작성해 보았다.

{% highlight python linenos %}
print('Hello World!')
{% endhighlight %}

## URL 복사 및 인쇄 버튼 추가하기

보통 블로그에는 다 있는 기능이라서 만들었다.

`_includes/header.html` 파일에 아래 코드를 추가한다.

{% raw %}
```html
<p class="page-tool">
	<!-- URL Copy -->
	<button type="button" class="btn btn-dark btn-sm btn-copy-url me-1">
		<i class="fa-solid fa-plus"></i> {{ site.data.ui-text.label.copy_url | default: 'URL Copy' }}
	</button>
	<!-- Print -->
	<button type="button" class="btn btn-secondary btn-print btn-sm">
		<i class="fa-solid fa-print"></i> {{ site.data.ui-text.label.print | default: 'Print' }}
	</button>
</p>
```
{% endraw %}

`main.js` 파일에 아래 코드를 추가한다.

```js
// URL 복사
$('.btn-copy-url').click(() => {
	copyClip(location.href);
});
// 인쇄
$('.btn-print').click(() => {
	window.print();
});
```

인쇄 시 특정 영역을 제거하고 싶거나 다른 스타일을 적용하고 싶을 때 아래 코드처럼 작성해주면 된다.

```css
@media print {
	.resume-section {
		padding: 0 !important;
	}
	#sideNav,
	.resume-section hr,
	.resume-section #btn-go-back,
	.resume-section .page-tool,
	.resume-section .page-share,
	.resume-section .pagination,
	.resume-footer {
		display: none !important;
	}
	.toc {
		margin-bottom: 2rem !important;
	}
}
```

## 제목 태그에 Permalink 생성하기

**Permalink(영구 링크)**은 웹 페이지, 블로그 게시물, 뉴스 기사 등 특정 웹 콘텐츠에 대한 고유하고 영구적인 URL을 말합니다. 이것은 시간이 지나도 변하지 않기 때문에, 링크를 통해 항상 동일한 콘텐츠에 접근할 수 있도록 해줍니다. Permalink는 특히 웹 페이지나 블로그에서 특정 게시물로 연결할 때 유용합니다. 이렇게 하면 URL이 바뀌어도 링크가 깨지지 않아 항상 동일한 콘텐츠로 연결됩니다.

Permalink는 종종 블로그나 뉴스 웹사이트에서 발견할 수 있으며, 주소에 날짜나 게시물 ID 등이 포함된 경우가 많습니다. 이를 통해 사용자와 검색 엔진이 해당 콘텐츠를 보다 쉽게 찾을 수 있습니다.

```javascript
$('.page-content').find('h1, h2, h3, h4, h5, h6').each((i, el) => {
	let id = $(el).attr('id');
	if(id){
		$(el).append(`<a href="#${id}" class="anchor-link" aria-label="Permalink">#</a>`);
	}
});
```

## 크리에이티브 커먼즈 라이선스 마크 표시하기

처음에 저작권 정보를 표시하려고 찾아 보니 [Font Awesome](https://fontawesome.com/)에서 아이콘을 가져와 사용할 수 있지만 내가 원하는 다음과 같은 이미지는 없었다.

![크리에이티브 커먼즈 라이선스 CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)

그러다가 [Namhoon Kim](https://namhoon.kim/){: target="_blank"} 사이트에서 저작권 표시를 [Creative Commons license buttons](https://licensebuttons.net){: target="_blank"}에서 이미지를 가져와 표시하는 것을 보고 원하는 이미지를 구할 수 있었다.

그레서 나는 다음과 같이 사용했다.

```html
<div xmlns:cc="http://creativecommons.org/ns#">
	<p><img src="https://licensebuttons.net/l/by-nc/4.0/88x31.png" alt="크리에이티브 커먼즈 라이선스 CC BY-NC 4.0"></p>
	이 저작물은 <a href="http://creativecommons.org	/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">CC BY-NC 4.0</a>에 따라 이용할 수 있습니다.
</div>
```

## 콘텐츠 복사 금지하기

블로그에서 콘텐츠를 복사할 수 없도록 막아두는 경우가 있다. GitHub 블로그의 경우, 복사 금지를 해두어도 GitHub 저장소에서 콘텐츠를 직접 확인할 수 있으므로 사실상 복사 금지의 의미가 없다. 그래서 현재는 복사 금지를 적용하지 않았지만, 나중에 필요할 수도 있어 기록해 둔다.

**CSS로 복사 금지하기**

```css
body {
	-webkit-user-select: none !important;
	-moz-user-select: -moz-none !important;
	-ms-user-select: none !important;
	user-select: none !important;
}
```

**JavaScript로 복사 금지하기**

```javascript
// 오른쪽 클릭 방지
document.oncontextmenu = function() {
	return false;
}
// 드래그 방지
var omitformtags = ["input", "textarea", "select"]
omitformtags = omitformtags.join("|")

function disableselect(e) {
	if (omitformtags.indexOf(e.target.tagName.toLowerCase()) == -1)
		return false
}

function reEnable() {
	return true
}

if (typeof document.onselectstart != "undefined")
	document.onselectstart = new Function("return false")
else {
	document.onmousedown = disableselect
	document.onmouseup = reEnable
}
```

**jQuery로 복사 금지하기**

```javascript
$(document).ready(function(){
	// 우클릭 금지
	$(document).bind('contextmenu', function(e){
		return false;
	});
	// 드래그 금지
	$('*').bind('selectstart', function(e){
		return false;
	});
});
```
