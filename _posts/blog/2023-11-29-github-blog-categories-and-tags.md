---
title: "Github 블로그 - 11. 카테고리와 태그 목록 만들기"
excerpt: ""
categories: [blog]
tags: [Github, Blog, Jekyll, Categories, Tags]
date: 2023-11-29 09:30
---

### 카테고리와 태그 목록

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

### 카테고리 목록 만들기

카테고리에서 각각의 카테고리의 페이지를 만들려면 `categories` 폴더를 만들고 `카테고리명.md` 파일을 만들면 된다. 그리고 카테고리 목록을 보여 줄 `index.html` 파일도 만들어 준다.

```bash
┌─ categories
│  ├─ blog.md
│  └─ index.html
```

{% raw %}
```liquid
---
layout: category
title: 블로그
category: blog
permalink: /blog/
---
```
{: data-label="categories/blog.md"}
{% endraw %}

이제 `index.html` 파일을 만들어야 한다. 그런데 카테고리와 태그의 포스트 목록에서도 포스트 목록과 같이 **페이지 나누기**를 할 수 없을까 고민이 되었다. 처음에는 `search.json`을 JavaScript로 읽어온 뒤 출력하는 방식으로 사용했지만 JavaScript로 읽어오는데 시간이 걸리다 보니 화면에 출력하는데 로딩 시간이 걸리는 문제가 있었다. 그러던 중 생각해 낸 것이 Liquid에서 페이지를 나누고 JavaScript에서 현재 페이지를 출력하는 방식으로 하였다.

> **Note**  
> `search.json`은 검색 기능을 다루는 과정에서 배우겠지만 모든 포스트 목록의 데이터를 json 형식으로 만들어 놓은 파일이다.

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
			<button type="button" class="btn btn-primary btn-more" data-page="2" aria-description="{{ category[0] }}">{{ site.data.navigation.page.more }} &rarr;</button>
		{% endif -%}
	</article>
{% endfor -%}
```
{: data-label="categories/index.html"}
{% endraw %}

`assign total_page = category[1] | size | divided_by: my_float | ceil`는 카테고리의 포스트 개수를 `site.paginate`로 나눈 뒤 올림을 해서 총 페이지 수를 구하는 코드이다. 여기서 `divided_by`는 정수로 나눌 경우 정수로 반환하기 때문에 소수점 자리의 숫자를 얻을 수 없으므로 `my_float` 변수를 만들어 소수점 자리의 숫자로 만드는 것이다.

위와 같은 코드를 카테고리와 태그에서 중복 사용할 것이므로 `_includes/postgroup.html` 파일로 분리해 사용한다.

{% raw %}
```liquid
<article class="page-content">
	<h3 id="{{ title | slugify }}">{{ title }}</h3>
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
{: data-label="postgroup.html"}
{% endraw %}

처음에 나는 `include`로 파일을 호출하면서 `category[0]`과 `category[1]`을 전달하려고 했으나 오류가 발생해 불가능했다. 내 생각에는 배열 형식의 데이터를 전달하는 과정에서 오류가 발생한 것 같다. 그래서 고민하던 중 `title`과 `posts`로 변수를 선언하고 사용하기로 했다. 혹시 `include`로 파일을 호출할 때 배열을 전달하는 방법을 알고 있으면 댓글을 남겨주기 바랍니다.

사용 방법을 간단히 적어 보면 다음과 같다.

{% raw %}
```liquid
{% assign title = 포스트 그룹의 제목 %}
{% assign posts = 포스트 목록 배열 %}
{% include postgroup.html %}
```
{: data-label="Example"}
{% endraw %}

### 태그 목록 만들기

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

### 더보기 버튼의 이벤트

카테고리와 태그 목록에서 더보기 버튼을 누르면 다음 페이지의 포스트가 나오도록 구현할 것이다. `assets/js/main.js`에 다음 코드를 입력한다.

```javascript
const groupEl = '.post-group';
$(document).ready(() => {
	// 페이징 처리
	if($(`${groupEl}[data-page]`).length > 0){
		$(groupEl).hide().eq(0).show();
		// 더보기 버튼 이벤트
		$('.btn-more').click(function(){
			let page = Number($(this).attr('data-page')); // 버튼을 누르면 보여줄 페이지 번호
			if(page == $(this).parent().find(groupEl).length){ // 마지막 페이지인 경우
				$(this).attr('disabled', true);
			}else{
				$(this).attr('data-page', page);
			}
			$(this).parent().find(`${groupEl}[data-page="${page}"]`).show().find('a').eq(0).focus();
		});
	}
});
```
{: data-label="main.js"}
