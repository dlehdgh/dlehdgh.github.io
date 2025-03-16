---
title: "Github 블로그 - 15. 검색 기능 구현하기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Search
  - Simple-Jekyll-Search
  - Jekyll Tipue Search
date: 2025-02-08 11:20
last_modified_at: 2025-03-08 14:29
---

블로그를 오랫동안 관리하다보면 게시물들이 어머어마하게 많아지고 원하는 게시물을 찾는것도 일이된다.

블로그에 게시물 찾기 기능이 있다면 원하는 게시물을 빠르게 찾을수 있을것이다.

검색 기능을 추가하는 방법으로 **Simple-Jekyll-Search**와 **Jekyll Tipue Search**을 소개하겠다.

## Simple-Jekyll-Search

먼저 [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search){: target="_blank"}로 접속한 뒤 `example/search.json`, `example/_plugins/simple_search_filter.rb`, `dest` 폴더의 js 파일을 다운받아 주면 된다.

```bash
┌─ example
│  ├─ search.json
│  └─ _plugins
│  │  └─ simple_search_filter.rb
├─ dest
│  ├─ simple-jekyll-search.js
│  └─ simple-jekyll-search.min.js
```

### npm 설치하기

Jekyll 개발환경을 구축했다면 아래 명령어를 입력해 설치해 준다.

```bash
npm install simple-jekyll-search
```

### 플러그인 적용하기

다운받은 **simple_search_filter.rb** 파일은 **_plugins** 폴더에 옮겨 놓으면 된다.

js 파일은 **assets/js** 폴더로 옮겨 놓았다. **assets** 폴더에만 있으면 되니 하위 경로는 원하는데로 지정해도 된다.

### json 파일 만들기

위에서 다운받은 json 파일을 사용해도 되지만 나는 아래와 같이 만들어 적용했다.

{% raw %}
```json
---
layout: none
---
[
	{% for post in site.posts %}
		{
			"title"    : "{{ post.title | escape }}",
			{% if post.category -%}
			"category" : "{{ post.category }}",
			{% else %}
			"category" : "{{ post.categories }}",
			{%- endif %}
			"tags"     : "{{ post.tags | join: ', ' }}",
			"url"      : "{{ site.baseurl }}{{ post.url }}",
			"date"     : "{{ post.date }}"
			{% if post.author -%}
			"author"   : "{{ post.author }}"
			{% else -%}
			"author"   : "{{ site.author }}"
			{%- endif %}
		} {% unless forloop.last %},{% endunless %}
	{% endfor %}
]
```
{% endraw %}

포스트 머리글에 카테고리를 입력할 때 `category` 또는 `categories`로 입력하므로 모두 입력되도록 했으며 작성자를 추가하기 위해 `author`도 추가했다.

이제 작성된 모든 포스트 파일의 정보가 json 파일로 저장되므로 JavaScript로 이 파일을 읽어와 검색하는 방식이다.

**Simple-Jekyll-Search**를 적용한 폴더 구조는 다음과 같다.

```bash
.
┌─ _plugins
│  └─ simple_search_filter.rb
├─ assets
│  ├─ simple-jekyll-search.js
│  └─ simple-jekyll-search.min.js
└─ search.json
...
```

### 검색 페이지 만들기

나는 **부트스트랩**의 모달 기능을 이용해 만들 것이므로 아래 코드를 `_includes/footer.html` 파일에 추가한다.

```html
<!-- Search Modal -->
<div id="search-modal" class="modal fade" tabindex="-1" aria-labelledby="search-label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<input type="search" id="search-input" class="form-control" placeholder="Search" aria-label="검색">
			</div>
			<div class="modal-body">
				<div id="results-container" class="srch-group list-group">
					<div class="list-group-item py-3">검색결과가 없습니다.</div>
				</div>
			</div>
			<div class="modal-footer">
				창을 닫으려면 <code>Esc</code>키를 누르세요.
			</div>
		</div>
	</div>
</div>
```

`_include/scripts.html`에 JavaScript 파일을 추가한다.

{% raw %}
```html
<!-- Simple-Jekyll-Search -->
<script src="{{ '/assets/js/simple-jekyll-search.min.js' | relative_url }}"></script>
<script type="text/javascript">
	SimpleJekyllSearch({
		searchInput: document.getElementById('search-input'),
		resultsContainer: document.getElementById('results-container'),
		json: '{{ '/search.json' | prepend: site.baseurl }}',
		searchResultTemplate: `<a href="{url}" class="list-group-item list-group-item-action">
	<strong class="d-block fs-5">{title}</strong>
	<small>
		<i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
		<span class="visually-hidden">{{ site.data.ui-text.label.updated }}:</span>
		<time>{date}</time>
		<i class="fas fa-folder-open ms-2" aria-hidden="true"></i>
		<span class="visually-hidden">{{ site.data.ui-text.navbar.categories }}:</span>
		<span>{category}</span>
	</small>
</a>`,
		noResultsText: '검색결과가 없습니다.',
		limit: 10000,
		fuzzy: false,
		exclude: ['Welcome']
	});
</script>
```
{% endraw %}

* `searchInput`: 검색어를 입력할 input 요소(엔터키를 누르면 검색 됨)
* `resultsContainer`: 검색 결과를 출력할 요소
* `json`: json 파일 경로
* `searchResultTemplate`: 검색 결과를 출력할 탬플릿(url, title, date, category)
* `noResultsText`: 검색결과가 없을 때 출력할 메시지

나는 메뉴에 검색 링크를 만들어 사용할 것이므로 `_includes/navbar.html` 파일에 다음 코드를 추가해주면 된다.

{% raw %}
```html
<li class="nav-item">
	<a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#search-modal">
		<i class="fa fa-fw fa-search" aria-hidden="true"></i> {{ names.search }}
	</a>
</li>
```
{% endraw %}

## Jekyll Tipue Search

먼저 [Jekyll Tipue Search](https://github.com/jekylltools/jekyll-tipue-search){: target="_blank"}로 접속한 뒤 **Code** 메뉴 버튼을 누르고 **Download ZIP** 링크를 눌러 소스파일을 다운로드 한다.

다운받은 **jekyll-tipue-search-master.zip** 파일의 압축을 푼 뒤 **assets/tipuesearch** 폴더를 복사해 자신의 **assets** 폴더로 옮겨 놓는다.

기본으로 제공되는 **search.html** 파일을 이용해 검색 페이지를 만들어도 되지만 나는 **부트스트랩**의 모달 기능을 이용해 만들 것이다.

### 환경설정

`_config.yml` 파일에 아래 코드를 추가한다.

```yml
tipue_search:
  include:
    pages: false
    collections: []
  exclude:
    files: [search.html, index.html, 404.html, categories/index.md, tags.md, year-archive.md, testing.md]
    categories: []
    tags: []
```

`include` 부분의 `pages: false`​는 pages 레이아웃에 해당하는 일반 html 페이지는 검색하지 않겠다는 것을 의미한다.(포스트 내용 검색에 집중하기 위함)

`exclude` 부분에 입력한 파일들은 검색에서 제외하겠다는 것을 의미한다.

`_include/head.html`에 CSS 파일을 추가한다.

{% raw %}
```html
<!-- Jekyll Tipue Search -->
<link rel="stylesheet" href="{{ '/assets/tipuesearch/css/tipuesearch.css' | relative_url }}">
```
{% endraw %}

`_include/scripts.html`에 JavaScript 파일을 추가한다.

{% raw %}
```html
{% if page.tipue_search_active or layout.tipue_search_active %}
<script src="{{ '/assets/tipuesearch/tipuesearch_content.js' | relative_url }}"></script>
<script src="{{ '/assets/tipuesearch/tipuesearch_set.js' | relative_url }}"></script>
<script src="{{ '/assets/tipuesearch/tipuesearch.min.js' | relative_url }}"></script>
<script>
	$(document).ready(function() {
		$('#tipue_search_input').tipuesearch({
			'wholeWords': false,
			'showTime': false,
			'minimumLength': 1
		});
	});
</script>
{% endif %}
```
{% endraw %}

* `wholeWords`: 한글 검색 옵션으로 `false`이면 한글 검색이 가능하다.
* `showTime`: 검색이 완료되기 까지의 소요시간을 표시할지 여부를 설정하는 옵션이다.
* `minimumLength`: 최소 검색 글자수를 설정하는 옵션이다.

### 검색 페이지 만들기

{% raw %}
```html
<!-- Search Modal -->
<div id="search-modal" class="modal fade" tabindex="-1" aria-labelledby="search-label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<form action="{{ page.url | relative_url }}" class="search-form card border-primary">
					<div class="tipue_search_left"><img src="{{ '/assets/tipuesearch/search.png' | relative_url }}" class="tipue_search_icon"></div>
					<div class="tipue_search_right">
						<input type="search" name="q" id="tipue_search_input" pattern=".{3,}" title="3자 이상 입력하세요." required>
					</div>
					<div style="clear: both;"></div>
				</form>
			</div>
			<div class="modal-body">
				<div id="tipue_search_content">
					<p class="mb-0">{{ site.data.ui-text.label.nosearch }}</p>
				</div>
			</div>
			<div class="modal-footer">
				창을 닫으려면 <code>Esc</code>키를 누르세요.&nbsp;
				<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
```
{% endraw %}

검색어를 입력하는 input 요소의 `pattern` 속성과 `title` 속성에 대해 설명하겠다.

* `pattern`: 검색어의 최소 글자수를 설정하는 정규표현식 옵션으로 `.{3,}`는 3글자 이상이면 허용한다는 의미이다.
* `title`: pattern을 지키지 않은 채 검색을 시도할 경우 나타나는 알림메시지 문구이다.

> 나는 검색 기능을 만들 때 검색어 입력란이 있고 검색 버튼을 누르면 검색되도록 만들고 싶었는데 아무리 찾아봐도 검색 버튼으로 동작하게 하는 방법을 찾지 못했다. 혹시 검색 버튼을 눌렀을 때 검색되도록 하는 방법을 알고 있다면 댓글로 남겨주기 바란다.
{: .notice--warning}
