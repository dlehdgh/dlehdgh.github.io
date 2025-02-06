---
layout: post
title: "Github 블로그 - 14. 포스트 상세페이지 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll, Posts]
toc: true
toc_sticky: true
date: 2025-01-20 18:12
---

이제 포스트의 내용을 보여 줄 레이아웃을 만들 것이다.

### 포스트 콘텐츠

포스트의 콘텐츠를 출력하는 것은 간단하다. `content` 변수를 출력해 주기만 하면 된다.

{% raw %}
```liquid
---
layout: default
---

{% include header.html meta=true %}

<article class="page-content">
	{{ content }}
</article>
```
{% endraw %}

> **Note**   
> 본문 콘텐츠가 되는 요소에는 `page-content` 클레스를 사용해 동일한 스타일을 적용할 것이다.

### 목차 만들기

페이지의 목차를 만드는 과정은 조금 복잡한데 본문에 출력할 `content`를 가져와 **해딩 태그**를 찾아서 나열해 주는 방식이다.

* `content`를 `<h`로 나누어 제목 태그를 구분한다.
* 나눠진 항목의 첫번째 자리의 글자가 1 ~ 6인지 체크해 해딩 태그인지 구분한다.
* id, class, 텍스트를 추출한다.
* class 속성 값에 `no_toc` 클레스가 있는 제목 태그는 제외한다.

먼저 포스트의 콘텐츠를 출력하는 부분을 아래와 같이 수정한다.

{% raw %}
```liquid
<article class="page-content">
	{%- if page.toc -%}
		{% include toc.html html=content %}
	{% endif -%}
	{{ content | toc }}
</article>
```
{% endraw %}

이제 `toc.html` 파일을 만들어 보자.

{% raw %}
```liquid
{% assign nodes = include.html | strip | split: '<h' -%}
{% if node.size > 1 %}
<aside class="toc card border-secondary{% if page.toc_sticky %} sticky-md-top{% endif %}">
	<div class="card-header text-bg-secondary">
		<i class="fas fa-server" aria-hidden="true"></i> {{ site.data.ui-text.label.toc }}
	</div>
	<ul class="toc-list">
	{% assign minHeader = 1 -%}
	{% assign maxHeader = 6 -%}
	{% assign firstHeader = true -%}
	{% assign currLevel = 0 -%}
	{% assign lastLevel = 0 -%}
	{% for node in nodes -%}
		{% if node == "" -%}
			{% continue -%}
		{% endif -%}
		{% assign currLevel = node | replace: '"', '' | slice: 0, 1 | times: 1 -%}
		{% if currLevel < minHeader or currLevel > maxHeader -%}
			{% continue -%}
		{% endif -%}
		{% if firstHeader -%}
			{% assign minHeader = currLevel %}
		{% endif -%}
		{% assign hTag = node | split: '</h' -%}
		{% assign hTagId = hTag[0] | split: 'id="' -%}
		{% assign hTagId = hTagId[1] | split: '"' -%}
		{% assign hTagText = hTagId[1] | split: '>' -%}
		{% assign hTagClass = hTag[0] | split: 'class="' -%}
		{% assign hTagClass = hTagClass[1] | split: '"' -%}
		{% if hTagClass[0] contains "no_toc" -%}
			{% continue -%}
		{% endif -%}
		{% if lastLevel > 0 -%}
			{% if currLevel > lastLevel -%}
				<ul>
			{% else -%}
				</li>
			{% endif -%}
		{% elsif currLevel < lastLevel -%}
			{% assign repeatCount = lastLevel | minus: currLevel -%}
			{% for i in (1..repeatCount) -%}
				</li></ul>
			{% endfor -%}
			</li>
		{% endif -%}
		<li><a href="#{{ hTagId[0] }}" class="list-group-item-action">{{ hTagText[1] }}</a>
		{% assign lastLevel = currLevel %}
		{% assign firstHeader = false %}
	{%- endfor -%}
	</li></ul>
</aside>
{%- endif %}
```

설명을 하자면 먼저 전달 받은 `content`를 `<h`로 나누어 해딩 태그를 구분한다. 그러면 아마 다음과 같은 결과가 나올 것이다.

```
1 id="logo" class="page-title">로고</h1> ...
2 id="about">Ablut</h2> ...
...
```

그리고 배열로 나누어진 항목의 첫 글자를 가져와 1 ~ 6에 해당하는지 체크해서 제목 태그만을 추출한다.

`</h`로 나누면 첫 번째 항목에 태그의 속성과 텍스트가 있게 되므로 `id="`로 나눈 뒤 `"`로 나누어 id를 추출하고
클레스도 동일한 방식으로 추출한다. 마지막으로 텍스트는 id를 추출하기 위해 나눈 항목 중 두번째 항목을 가져와 `>`로 나누면 텍스트가 추출되게 된다.

예를 들면 다음과 같다.

~~~
nodes[0] => <h1 id="logo" class="page-title">로고</h1>
currLevel = node[0] | replace: '"', '' | slice: 0, 1 | times: 1 => 1
hTag = nodes[0] | split: '</h' => ['1 id="logo" class="page-title">로고', '1>']
hTagId = hTag[0] | split: 'id="' => ['1 ', 'logo" class="page-title">로고']
hTagId = hTagId[1] | split: '"' => ['logo', ' class="page-title">로고']
hTagText = hTagId[1] | split: '>' => [' class="page-title"', '로고']
hTagClass = hTag[0] | split: 'class="' => ['1 id="logo" ', 'page-title">로고']
hTagClass = hTagClass[1] | split: '"' => ['page-title', '>로고']

hTagId[0] => 'logo'
hTagText[1] => '로고'
hTagClass[0] => 'page-title'
~~~

> **Note**   
> 처음 공부할 때는 `content` 변수에 `toc`을 추가해 주고 포스트 파일의 머리글에 `toc: true`를 입력하면 목차가 자동으로 생성되는 줄 알았다. 아마 테마에서 이 기능을 지원하는 것으로 예상된다.

본문이 나오기 전에 목차를 표시하도록 아래 코드를 추가한다.

{% raw %}
```liquid
{%- if page.toc -%}
	{% include toc.html html=content %}
{% endif -%}
```
{% endraw %}

### 카테고리와 태그 목록

카테고리와 태그는 포스트 머리말에 입력한 정보를 가져와 출력하는 것으로 **변수와 머리말** 글을 참고하기 바란다.

{% raw %}
```liquid
<footer class="page-meta">
	{%- assign path_type = '#' -%}
	{% assign meta = 'btn btn-outline-primary btn-sm' -%}
	<p class="page-taxonomy">
		<strong>
			<i class="fas fa-folder-open" aria-hidden="true"></i> {{ site.data.ui-text.navbar.categories }}: 
		</strong>
		{% if page.categories -%}
			{% for category in page.categories -%}
				{% assign category_url = category | slugify -%}
				<a href="{{ '/categories/' | append: path_type | append: category_url | relative_url }}" class="{{ meta }}" rel="tags">{{ category }}</a>
			{% endfor -%}
		{% endif -%}
	</p>
	<p class="page-taxonomy">
		<strong>
			<i class="fas fa-tags" aria-hidden="true"></i> {{ site.data.ui-text.navbar.tags }}: 
		</strong>
		{% if page.tags -%}
			{% for tag in page.tags -%}
				{% assign tag_url = tag | slugify -%}
				<a href="{{ '/tags/' | append: path_type | append: tag_url | relative_url }}" class="{{ meta }}">{{ tag }}</a>
			{% endfor -%}
		{%- endif -%}
	</p>
</footer>
```
{% endraw %}

위 코드에서 카테고리와 태그 링크에 **slugify**를 사용한 것을 알 수 있다. **slugify**는 문자열을 소문자 URL 슬러그로 변환한다. 이걸 사용하는 것은 `id` 속성 값에 공백이 들어가는 것을 제거하기 위해서 이다. 만약 카테고리나 태그에 공백이 포함된 경우 정상적으로 동작하지 않을 수도 있어 조치한 것이다. **slugify**는 다음과 같이 사용한다.

{% raw %}
```liquid
{{ "The _config.yml file" | slugify }}
{{ "The _config.yml file" | slugify: "pretty" }}
{{ "The _cönfig.yml file" | slugify: "ascii" }}
{{ "The cönfig.yml file" | slugify: "latin" }}
```
{: data-label="Input"}
{% endraw %}

```liquid
{{ "The _config.yml file" | slugify }}
{{ "The _config.yml file" | slugify: "pretty" }}
{{ "The _cönfig.yml file" | slugify: "ascii" }}
{{ "The cönfig.yml file" | slugify: "latin" }}
```
{: data-label="Output"}

### SNS 공유 기능 추가

대부분의 SNS 사이트에서는 URL로 공유하는 기능을 제공하지만 **카카오톡**의 경우 **developers** 사이트에 가입해서 **Key**를 받아야 한다.

외국 SNS 사이트의 경우 **Font Awesomew**과 같은 아이콘 서비스에서 로고 아이콘을 가져올 수 있지만 국내 SNS의 경우 아이콘이 없어 이미지를 구해야 한다. 그런데 로고 이미지를 그냥 가져올 수 있는게 아니라서 텍스트로 대체했다.

처음에는 SNS 공유 버튼을 만들고 **JavaScript**를 사용해 처리했지만 URL과 포스트 제목만 넘길 것이여서 링크로 수정했다.

{% raw %}
```liquid
<article class="page-share mb-2">
	<strong>
		<i class="fa-sharp fa-solid fa-share-nodes" aria-hidden="true"></i> {{ site.data.ui-text.label.share }}: 
	</strong>
	<a href="https://twitter.com/intent/tweet?text={{ page.title | url_encode }}&url={{ page.url | absolute_url | url_encode }}" class="btn btn-twitter" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.twitter }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.twitter }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-twitter" aria-hidden="true"></i>
		<span>Twitter</span>
	</a>
	<a href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}" class="btn btn-facebook" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.facebook }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.facebook }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-facebook" aria-hidden="true"></i>
		<span>Facebook</span>
	</a>
	<a href="https://www.linkedin.com/shareArticle?mini=true&url={{ page.url | absolute_url | url_encode }}" class="btn btn-linkedin" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.linkedin }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.linkedin }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-linkedin" aria-hidden="true"></i>
		<span>LinkedIn</span>
	</a>
	<a href="https://share.naver.com/web/shareView?url={{ page.url | absolute_url | url_encode }}&title={{ page.title | url_encode }}" class="btn btn-naver" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.naver }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.naver }} {{ site.data.ui-text.label.share }}">
		<span>NAVER</span>
	</a>
	<a href="https://story.kakao.com/share?url={{ page.url | absolute_url | url_encode }}" class="btn btn-kakaostory" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.kakaostory }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.kakaostory }} {{ site.data.ui-text.label.share }}">
		<span>Kakao Story</span>
	</a>
</article>
<hr>
```
{% endraw %}

화면에 텍스트를 출력하기 위해 `ui-text.yml` 파일에 다음 코드를 추가한다.

```yaml
label:
  ...
  share: 공유
  facebook: 페이스북
  twitter: 트위터
  linkedin: 링크드인
  naver: 네이버
  kakaostory: 카카오스토리
```
{: data-label="ui-text.yml"}

#### Font Awesomew으로 간단한 로고 만들기

네이버와 카카오스토리 아이콘을 **Font Awesomew**의 N, K 모양을 이용해 만드는 방법이다.

```css
/* 네이버와 카카오스토리 공유 아이콘 폰트 */
.fa-square-n, .fa-square-k {
	position: relative;
}
.fa-square-n:after, .fa-square-k:after {
	color: #fff;
	font-size: 0.6em;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.fa-square-n:before {
	content: "\f0c8";
	color: #2db400;
}
.fa-square-n:after {
	content: "\4e";
}
.fa-square-k:before {
	content: "\f0c8";
	color: #fee500;
}
.fa-square-k:after {
	content: "\4b";
}
```
{: data-label="CSS"}

```html
<i class="fa fa-k fa-2x" aria-hidden="true">
<i class="fa fa-n fa-2x" aria-hidden="true">
```
{: data-label="HTML"}

### 이전 글과 다음 글

`page.next`와 `page.previous` 변수를 활용해 이전 글과 다음 글을 출력한 것이다.

{% raw %}
```liquid
<nav class="pagination d-flex justify-content-between">
	{%- assign paginate_class = 'btn btn-primary' -%}
	{% if page.previous.url -%}
		<a href="{{ page.previous.url | relative_url | replace: '//', '/' }}" class="{{ paginate_class }}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ page.previous.title }}" aria-description="{{ page.previous.title }}">
			<i aria-hidden="true">&larr;</i> {{ site.data.ui-text.label.prev_post | default: "Previous" }}
		</a>
	{% else -%}
		<span class="{{ paginate_class }} disabled">
			<i aria-hidden="true">&larr;</i> {{ site.data.ui-text.label.prev_post | default: "Previous" }}
		</span>
	{% endif -%}
	{% if page.next.url -%}
		<a href="{{ page.next.url | relative_url | replace: '//', '/' }}" class="{{ paginate_class }}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ page.next.title }}" aria-description="{{ page.next.title }}">
			{{ site.data.ui-text.label.next_post | default: "Next" }} <i aria-hidden="true">&rarr;</i>
		</a>
	{% else -%}
		<span class="{{ paginate_class }} disabled">
			{{ site.data.ui-text.label.next_post | default: "Next" }} <i aria-hidden="true">&rarr;</i>
		</span>
	{% endif -%}
</nav>
<hr>
```
{% endraw %}

### 관련글

> 나는 관련글을 출력하지 않았지만 나중에 사용할 수도 있어 적어 본다.

`site.related_posts`는 현재 포스트와 관련된 포스트 목록을 10개 출력하는 변수이다. 이 변수를 활용해 관련글을 출력해 줄 수는 있다. 하지만 관련글을 선택하는 기준 또는 출력할 개수 등을 지정할 수가 없어 불편한 점이 있다.

{% raw %}
```liquid
<ul>
{% for post in site.related_posts %}
	<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% endfor %
</ul>
```
{% endraw %}

### 댓글 기능

댓글 기능을 구현하려면 외부 기능을 가져와 사용해야 한다. 전에는 **Disqus**를 많이 사용했지만 광고가 많이 나오다 보니 요즘에는 다른 외부 기능들을 사용한다.

* [Disqus](https://disqus.com/){:target="_blank"}
* [giscus](https://giscus.app/ko){:target="_blank"}
* [Utterances](https://utteranc.es/){:target="_blank"}

> 나는 **Utterances**를 사용해 댓글 기능을 구현했다.

#### Utterances 적용하기

1. 설치

먼저 Github App에서 [Utterances](https://github.com/apps/utterances){:target="_blank"}를 설치해야 한다.

이미 설치한 경우 **Configure** 버튼이 나오고, 설치가 안 되어 있다면 **Install** 버튼이 보일 것이다.

**Install** 버튼을 누르면 저장소를 선택하는 화면이 나오는데 댓글을 이슈로 관리할 저장소를 선택하고 **Install** 버튼을 눌러 설치를 완료하면 된다.

2. 설정

**repo**에 `계정명/저장소이름`을 입력하면 된다. 그 다음은 블로그 포스트와 이슈 매핑 방법에 대한 설정이다.

**Issue Mapping**의 종류가 여러가지가 있는데 간략히 설명하자면 다음과 같다.

* Issue title contains page pathname : 이슈 제목을 페이지 경로로 지정
* Issue title contains page URL : 이슈 제목을 페이지 URL로 지정
* Issue title contains page title : 이슈 제목을 페이지 제목으로 지정

> 나는 **Issue title contains page URL**로 지정했다.

나머지는 원하는 대로 설정하면 되고 모두 입력하면 **Enable Utterances**에 생성된 스크립트 코드를 복사해서 사용하면 된다.

위에서 생성한 코드를 복사해서 사용해도 되지만 사용하기 편하도록 `_includes` 폴더에 `utterances.html`을 만들어 사용하겠다. 먼저 `_config.yml`에 아래 코드를 추가해 준다.

```yml
utterances:
  repo: 계정명/저장소이름
  issue-term: 댓글 추가 시 issue의 제목 유형
  label: 댓글 추가 시 issue의 라벨
  theme: 댓글 테마
```
{: data-label="_config.yml"}

설정 값은 이전에 생성한 스크립트 코드를 참고해 작성하면 된다.

{% raw %}
```liquid
<div class="comments" lang="ko">
	<script src="https://utteranc.es/client.js"
		repo="{{ site.utterances.repo }}"
		issue-term="{{ site.utterances.issue-term }}"
		label="{{ site.utterances.label }}"
		theme="{{ site.utterances.theme }}"
		crossorigin="anonymous"
		async>
	</script>
</div>
```
{: data-label="_includes/comments.html"}
{% endraw %}

아래 코드를 추가해주면 된다.

{% raw %}
```liquid
{% include comments.html %}
```
{% endraw %}

### 마치며

지금까지 포스트의 콘텐츠를 출력하는 코드를 작성했다. 전체 코드는 다음과 같다.

{% raw %}
```liquid
---
layout: default
---

<article class="page-content">
	{%- if page.toc -%}
		{% include toc.html html=content %}
	{% endif -%}
	{{ content | toc }}
</article>

{% include creative-commons.html %}

<footer class="page-meta">
	{%- assign path_type = '#' -%}
	{% assign meta = 'btn btn-outline-primary btn-sm' -%}
	{% if page.categories -%}
	<p class="page-taxonomy">
		<strong>
			<i class="fas fa-folder-open" aria-hidden="true"></i> {{ site.data.ui-text.label.categories }}: 
		</strong>
		{% for category in page.categories -%}
			{% assign category_url = category | slugify -%}
			<a href="{{ '/categories/' | append: path_type | append: category_url | relative_url }}" class="{{ meta }}" rel="tag">{{ category | capitalize }}</a>
		{% endfor -%}
	</p>
	{% endif -%}
	{% if page.tags -%}
	<p class="page-taxonomy">
		<strong>
			<i class="fas fa-tags" aria-hidden="true"></i> {{ site.data.ui-text.label.tags }}: 
		</strong>
		{% for tag in page.tags -%}
			{% assign tag_url = tag | slugify -%}
			<a href="{{ '/tags/' | append: path_type | append: tag_url | relative_url }}" class="{{ meta }}" rel="tag">{{ tag | capitalize }}</a>
		{% endfor -%}
	</p>
	{%- endif -%}
</footer>

<article class="page-share mb-2">
	<strong>
		<i class="fa-sharp fa-solid fa-share-nodes" aria-hidden="true"></i> {{ site.data.ui-text.label.share }}: 
	</strong>
	<a href="https://twitter.com/intent/tweet?text={{ page.title | url_encode }}&url={{ page.url | absolute_url | url_encode }}" class="btn btn-twitter" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.twitter }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.twitter }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-twitter" aria-hidden="true"></i>
		<span>Twitter</span>
	</a>
	<a href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}" class="btn btn-facebook" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.facebook }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.facebook }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-facebook" aria-hidden="true"></i>
		<span>Facebook</span>
	</a>
	<a href="https://www.linkedin.com/shareArticle?mini=true&url={{ page.url | absolute_url | url_encode }}" class="btn btn-linkedin" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.linkedin }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.linkedin }} {{ site.data.ui-text.label.share }}">
		<i class="fa-brands fa-linkedin" aria-hidden="true"></i>
		<span>LinkedIn</span>
	</a>
	<a href="https://share.naver.com/web/shareView?url={{ page.url | absolute_url | url_encode }}&title={{ page.title | url_encode }}" class="btn btn-naver" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.naver }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.naver }} {{ site.data.ui-text.label.share }}">
		<span>NAVER</span>
	</a>
	<a href="https://story.kakao.com/share?url={{ page.url | absolute_url | url_encode }}" class="btn btn-kakaostory" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.kakaostory }} {{ site.data.ui-text.label.share }}" aria-label="{{ site.data.ui-text.label.kakaostory }} {{ site.data.ui-text.label.share }}">
		<span>Kakao Story</span>
	</a>
</article>
<hr>

<nav class="pagination d-flex justify-content-between">
	{%- assign paginate_class = 'btn btn-primary' -%}
	{% if page.previous.url -%}
		<a href="{{ page.previous.url | relative_url | replace: '//', '/' }}" class="{{ paginate_class }}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ page.previous.title }}" aria-description="{{ page.previous.title }}">
			<i aria-hidden="true">&larr;</i> {{ site.data.ui-text.label.prev_post | default: "Previous" }}
		</a>
	{% else -%}
		<span class="{{ paginate_class }} disabled">
			<i aria-hidden="true">&larr;</i> {{ site.data.ui-text.label.prev_post | default: "Previous" }}
		</span>
	{% endif -%}
	{% if page.next.url -%}
		<a href="{{ page.next.url | relative_url | replace: '//', '/' }}" class="{{ paginate_class }}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ page.next.title }}" aria-description="{{ page.next.title }}">
			{{ site.data.ui-text.label.next_post | default: "Next" }} <i aria-hidden="true">&rarr;</i>
		</a>
	{% else -%}
		<span class="{{ paginate_class }} disabled">
			{{ site.data.ui-text.label.next_post | default: "Next" }} <i aria-hidden="true">&rarr;</i>
		</span>
	{% endif -%}
</nav>
<hr>

{% include comments.html %}
```
{: data-label="_layouts/post.html"}
{% endraw %}

### 참고

* [블로그/웹사이트에 SNS 공유버튼 추가하기 - Suji Kang BLOG](https://sjkangblog.github.io/sns%EA%B3%B5%EC%9C%A0%EB%B2%84%ED%8A%BC%EB%84%A3%EA%B8%B0.html){: target="_blank"}
* [Bootstrap Social Media icons & buttons - examples & tutorial](https://mdbootstrap.com/docs/jquery/components/buttons-social/){: target="_blank"}
