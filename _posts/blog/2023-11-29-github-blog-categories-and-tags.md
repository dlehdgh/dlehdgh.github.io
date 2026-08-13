---
title: "Github 블로그 - 11. 카테고리와 태그 목록 만들기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Categories
  - Tags
date: 2023-11-29 09:30
last_modified_at: 2025-03-05 21:14
---

## 카테고리와 태그 목록

카테고리 목록을 만드는 방법은 `site.categories` 변수를 사용해 반복문을 돌리면 된다. `site.categories`에 반복문을 적용하면 두 항목으로 구성된 또 다른 배열을 사용할 수 있는데, 첫 번째 항목은 카테고리의 이름이고 두 번째 항목은 해당 카테고리의 포스트 배열이다. 기본적인 사용방법은 다음과 같다.

{% raw %}
```liquid
{% for category in site.categories %}
	<h3>{{ category[0] }}</h3>
	<ul>
	{% for post in category[1] %}
		<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
	{% endfor %}
	</ul>
{% endfor %}
```
{% endraw %}

태그도 카테고리와 마찬가지로 `site.tags` 변수를 사용하면 된다.

{% raw %}
```liquid
{% for tag in site.tags %}
	<h3>{{ tag[0] }}</h3>
	<ul>
	{% for post in tag[1] %}
		<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
	{% endfor %}
	</ul>
{% endfor %}
```
{% endraw %}

## 카테고리 목록 만들기

모든 카테고리의 포스트 목록을 보여주는 페이지와 카테고리별로 포스트 목록을 보여주는 페이지를 만들 것이다.

우선 `categories` 폴더를 생성한 뒤 모든 카테고리의 포스트 목록을 보여줄 `index.html` 파일을 만들고, 카테고리별로 포스트 목록을 보여줄 `카테고리명.md` 파일을 만들면 된다.

내가 생성한 폴더 구조는 다음과 같다.

```bash
┌─ categories
│  ├─ blog.md
│  └─ index.html
```

먼저 모든 카테고리의 포스트 목록을 보여줄 `index.html` 파일을 만들겠다.

그런데 카테고리와 태그의 포스트 목록에서도 포스트 목록과 같이 **페이지 나누기**를 적용할 수 없을까 고민이 되었다. 처음에는 `search.json`을 **JavaScript**로 읽어온 뒤 출력하는 방식으로 사용했지만 JavaScript로 읽어오는데 시간이 걸리다 보니 로딩 시간이 걸리는 문제가 있었다. 그러던 중 생각해 낸 것이 **Liquid** 구문으로 페이지를 나누고 JavaScript에서 현재 페이지를 출력하는 방식으로 변경하였다.

> **Note**  
> `search.json`은 검색 기능을 다루는 과정에서 배우겠지만 모든 포스트 목록의 데이터를 json 형식으로 만들어 놓은 파일이다.
{: .notice--primary}

{% raw %}
```liquid
---
layout: default
---

<ul class="nav-skip">
	{% for category in site.categories -%}
	<li>
		<a href="#{{ category[0] | slugify }}" class="btn btn-primary">
			<strong>
				<i class="fas fa-folder-open" aria-hidden="true"></i> {{ category[0] }}
			</strong>
			<span class="badge text-bg-light">{{ category[1].size }}</span>
		</a>
	</li>
	{%- endfor -%}
</ul>

{% for category in site.categories -%}
	<article class="page-content">
		<h3 id="{{ category[0] | slugify }}">{{ category[0] }}</h3>
		{%- assign my_float = site.paginate | times: 1.0 -%}
		{% assign total_page = category[1] | size | divided_by: my_float | ceil -%}
		{% assign index = 1 -%}
		{% assign count = 0 -%}
		<div class="post-group" data-page="{{ index }}">
		{% for post in category[1] -%}
			{% include postlist.html post=post %}
			{% assign count = count | plus: 1 -%}
			{% if count == site.paginate -%}
				{% assign index = index | plus: 1 -%}
				{% assign count = 0 -%}
				</div>
				<div class="post-group" data-page="{{ index }}">
			{% endif -%}
		{% endfor -%}
		</div>
		{% if total_page > 1 -%}
			<button type="button" class="btn btn-primary btn-more" data-page="2" aria-label="{{ category[0] }} {{ site.data.ui-text.label.more }}">
				{{ site.data.ui-text.label.more }} <i aria-hidden="true">&rarr;</i>
			</button>
		{% endif -%}
	</article>
{% endfor -%}
```
{: data-label="categories/index.html"}
{% endraw %}

`assign total_page = category[1] | size | divided_by: my_float | ceil`는 카테고리의 포스트 개수를 `site.paginate`로 나눈 뒤 올림을 해서 총 페이지 수를 구하는 코드이다. 여기서 `divided_by`는 정수로 나눌 경우 정수로 반환하기 때문에 소수점 자리의 숫자를 얻을 수 없으므로 `my_float` 변수를 만들어 소수점 자리의 숫자로 만드는 것이다.

`index.html` 파일의 코드를 태그 목록에서도 거의 동일하게 사용하므로 `_includes/postgroup.html` 파일로 만들어 사용하겠다.

{% raw %}
```liquid
---
layout: default
---

<ul class="nav-skip">
	{% for category in site.categories -%}
	<li>
		<a href="#{{ category[0] | slugify }}" class="btn btn-primary">
			<strong>
				<i class="fas fa-folder-open" aria-hidden="true"></i> {{ category[0] }}
			</strong>
			<span class="badge text-bg-light">{{ category[1].size }}</span>
		</a>
	</li>
	{%- endfor -%}
</ul>

{% for category in site.categories -%}
	{% assign title = category[0] -%}
	{% assign posts = category[1] -%}
	{% include postgroup.html %}
{% endfor -%}
```
{: data-label="categories/index.html"}
{% endraw %}

{% raw %}
```liquid
<article class="page-content">
	<h3 id="{{ title | slugify }}">{{ title | capitalize }}</h3>
	{%- assign my_float = site.paginate | times: 1.0 -%}
	{% assign total_page = posts | size | divided_by: my_float | ceil -%}
	{% assign index = 1 -%}
	{% assign count = 0 -%}
	<div class="post-group" data-page="{{ index }}">
	{% for post in posts -%}
		{% include postlist.html post=post %}
		{% assign count = count | plus: 1 -%}
		{% if count == site.paginate and forloop.index < posts.size -%}
			{% assign index = index | plus: 1 -%}
			{% assign count = 0 -%}
			</div>
			<div class="post-group" data-page="{{ index }}">
		{% endif -%}
	{% endfor -%}
	</div>
	{% if total_page > 1 -%}
		<button type="button" class="btn btn-primary btn-more" data-page="2" aria-label="{{ title }} {{ site.data.ui-text.label.more }}">
			{{ site.data.ui-text.label.more }} <i aria-hidden="true">&rarr;</i>
		</button>
	{% endif -%}
</article>
```
{: data-label="_includes/postgroup.html"}
{% endraw %}

처음에는 `include`로 파일을 호출하면서 `category[0]`과 `category[1]`을 전달하려고 했으나 오류가 발생했다. 내 생각에는 배열 형식의 데이터를 전달하는 과정에서 오류가 발생하는 것 같다. 그래서 고민하던 중 `title`과 `posts`로 변수를 선언해 사용하기로 했다. 혹시 `include`로 파일을 호출할 때 배열을 전달하는 방법을 알고 있으면 댓글을 남겨주기 바랍니다.

이제 카테고리별로 포스트 목록을 보여주는 페이지로 `blog.md` 파일을 만들고 `category.html` 레이아웃을 만들겠다.

```markdown
---
layout: category
title: 블로그
category: blog
permalink: /blog/
---
```
{: data-label="categories/blog.md"}

{% raw %}
```liquid
---
layout: page
---

{{ content }}

{%- assign total_posts = site.categories[page.category] | size -%}
{% assign my_float = site.paginate | times: 1.0 -%}
{% assign total_page = total_posts | divided_by: my_float | ceil -%}
{% assign index = 1 -%}
{% assign count = 0 -%}
<p>{{ site.data.ui-text.label.total_posts }}: <strong class="text-primary">{{ total_posts | default: '0' }}</strong></p>
<div class="post-group" data-page="{{ index }}">
{% for post in site.categories[page.category] -%}
	{% include postlist.html post=post %}
	{% assign count = count | plus: 1 -%}
	{% if count == site.paginate and forloop.index < total_posts -%}
		{% assign index = index | plus: 1 -%}
		{% assign count = 0 -%}
		</div>
		<div class="post-group" data-page="{{ index }}">
	{% endif -%}
{%- endfor -%}
</div>
{% include paginate.html total_page=total_page %}
```
{: data-label="_layouts/category.html"}
{% endraw %}

`paginate.html`는 페이지 번호를 출력하는 파일로 태그 페이지를 만들 경우 사용될 수 있어 분리했다.

{% raw %}
```liquid
<!-- Pagination -->
{% assign label = site.data.ui-text.label -%}
<div class="d-flex justify-content-between">
	<ul id="paginate" class="pagination">
		{%- assign page_link = "page-link" -%}
		<li class="page-item">
			{% if include.total_page > 1 -%}
				<button type="button" class="{{ page_link }} page-first" data-page="1" aria-label="{{ label.pagination_first | default: 'First' }}">
					<i class="fa fa-angles-left" aria-hidden="true"></i>
				</button>
			{% else -%}
				<span class="{{ page_link }} page-first disabled" aria-label="{{ label.pagination_first | default: 'First' }}">
					<i class="fa fa-angles-left" aria-hidden="true"></i>
				</span>
			{% endif -%}
		</li>
		<li class="page-item">
			<button type="button" class="{{ page_link }} page-prev" aria-label="{{ label.pagination_previous | default: 'Previous' }}">
				<i class="fas fa-angles-left" aria-hidden="true"></i>
			</button>
		</li>
		<li class="page-item">
			<span class="{{ page_link }} disabled">Page: <span class="page-current" aria-current="page">1</span> / <span class="page-total">{{ include.total_page }}</span></span>
		</li>
		<li class="page-item">
			<button type="button" class="{{ page_link }} page-next" aria-label="{{ label.pagination_next | default: 'Next' }}">
					<i class="fas fa-angles-right" aria-hidden="true"></i>
			</button>
		</li>
		<li class="page-item">
			{% if include.total_page > 1 -%}
				<button type="button" class="{{ page_link }} page-last" data-page="{{ include.total_page }}" aria-label="{{ label.pagination_last | default: 'Last' }}">
					<i class="fa fa-angles-right" aria-hidden="true"></i>
				</button>
			{% else -%}
				<span class="{{ page_link }} page-last disabled" aria-label="{{ label.pagination_last | default: 'Last' }}">
					<i class="fa fa-angles-right" aria-hidden="true"></i>
				</span>
			{% endif -%}
		</li>
	</ul>
	<form id="page-num-form" class="input-group w-auto">
		<label for="page-num" class="input-group-text visually-hidden">Page Number:</label>
		<input type="number" id="page-num" class="form-control border-primary" min="1" max="{{ include.total_page }}">
		<button type="submit" class="btn btn-primary">이동</button>
	</form>
</div>
```
{: data-label="_includes/paginate.html"}
{% endraw %}

`total_page` 변수를 전달 받아 총 페이지 수를 표시하고 이전 또는 다음 페이지로 이동하는 버튼을 누르면 JavaScript로 페이지를 이동하는 기능을 구현할 것이다.

## 태그 목록 만들기

그럼 이제 태그 페이지를 만들어 보자. 태그 페이지를 만들기 위해 `tags.html`파일을 만들어 준다.

{% raw %}
```liquid
---
layout: default
permalink: /tags/
---

<ul class="nav-skip">
	{%- for tag in site.tags -%}
	<li>
		<a href="#{{ tag[0] | slugify }}" class="btn btn-primary">
			<strong>
				<i class="fa-solid fa-tag" aria-hidden="true"></i> {{ tag[0] }}
			</strong>
			<span class="badge text-bg-light">{{ tag[1].size }}</span>
		</a>
	</li>
	{% endfor -%}
</ul>

{% for tag in site.tags -%}
	{% assign title = tag[0] -%}
	{% assign posts = tag[1] -%}
	{% include postgroup.html %}
{% endfor -%}
```
{: data-label="tags.html"}
{% endraw %}

## JavaScript로 페이지 이동하기

모든 카테고리와 태그의 포스트 목록을 보여주는 페이지에서 **더보기** 버튼을 누르면 다음 페이지의 포스트가 나오도록 하고, 카테고리별로 포스트 목록을 보여주는 페이지에서 페이지 번호를 이동하는 기능을 구현할 것이다. `assets/js/main.js` 파일에 다음 코드를 입력한다.

```javascript
const groupEl = '.post-group'; // 페이지를 나누는 블럭
const paginateEl = $('#paginate.pagination'); // 페이지 번호를 표시하는 요소

$(document).ready(() => {
	pagination(); // 페이징 처리
});

// 페이징 처리 시 다른 페이지로 전환
const pageChange = (page) => {
	let total_page = $(groupEl).length;
	if(page < 1 || page > total_page) return false;
	console.log('page:', page, 'total_page', total_page)
	if(total_page == 1){// total page is 1
		paginateEl.find('.page-first, .page-last, .page-prev, .page-next').addClass('disabled').attr('disabled', true);
	}else if(page == 1){ // first
		paginateEl.find('.page-first, .page-prev').addClass('disabled').attr('disabled', true);
		paginateEl.find('.page-last, .page-next').removeClass('disabled').attr('disabled', false);
	}else if(page == total_page){// last
		paginateEl.find('.page-last, .page-next').addClass('disabled').attr('disabled', true);
		paginateEl.find('.page-first, .page-prev').removeClass('disabled').attr('disabled', false);
	}else{// page > 1 && page < last
		paginateEl.find('.page-first, .page-last, .page-prev, .page-next').removeClass('disabled').attr('disabled', false);
	}
	paginateEl.find('.page-current').text(page);
	$(groupEl).hide();
	$(`${groupEl}[data-page="${page}"]`).show();
};

// 페이징 처리
const pagination = () => {
	if($(`${groupEl}[data-page]`).length > 0){
		pageChange(1);
		// 페이지 나누기의 더보기 버튼 이벤트
		$('.btn-more').click(function(){
			let page = Number($(this).attr('data-page'));
			if(page == $(this).parent().find(groupEl).length){
				$(this).attr('disabled', true);
			}else{
				$(this).attr('data-page', page);
			}
			$(this).parent().find(`${groupEl}[data-page="${page}"]`).show().find('a').eq(0).focus();
		});
		// 페이지 번호에서 첫번째 페이지와 마지막 페이지로 이동
		paginateEl.find('.page-first, .page-last').click(function(){
			let page = Number($(this).attr('data-page'));
			pageChange(page);
		});
		// 페이지 번호에서 이전 페이지로 이동
		paginateEl.find('.page-prev').click(() => {
			let page = Number(paginateEl.find('.page-current').text()) - 1;
			pageChange(page);
		});
		// 페이지 번호에서 다음 페이지로 이동
		paginateEl.find('.page-next').click(() => {
			let page = Number(paginateEl.find('.page-current').text()) + 1;
			pageChange(page);
		});
		// 페이지 번호에서 입력한 번호의 페이지로 이동
		$('#page-num-form').submit(function(event){
			event.preventDefault();
			let el = event.target['page-num'];
			let page = Number(el.value);
			const min = Number(el.min);
			const max = Number(el.max);
			const current = Number(paginateEl.find('.page-current').text());
			if(page == current) return false;
			if(page >= min && page <= max){
				$(el).val('');
				pageChange(page);
			}
		});
	}
};
```
{: data-label="assets/js/main.js"}
