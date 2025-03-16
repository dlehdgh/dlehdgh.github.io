---
title: "Github 블로그 - 10. 포스트 목록 만들기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Posts
  - Paginate
date: 2023-11-25 20:44
last_modified_at: 2025-03-01 09:55
---

먼저 포스트 목록을 만드는 기본적인 방법을 설명하겠다.

## 포스트 목록

{% raw %}
```liquid
<ul>
{% for post in site.posts %}
	<li>
		<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
		<tiem>{{ post.date }}</time>
	</li>
{% endfor %}
</ul>
```
{% endraw %}

위 코드를 실행해 보면 `_posts` 폴더에 있는 모든 포스트 목록이 출력될 것이다. 그런데 이 방법으로 하게 될 경우 우리가 포스트를 1000개 이상 작성했다고 가정할 때 페이지에 출력할 콘텐츠가 많아지면서 로딩 속도가 느려지게 되는 문제가 발생할 것이다. 이러한 문제를 해결하기 위해 Jekyll에서는 **페이지 나누기** 기능을 제공한다.

## 페이지 나누기

포스트에 페이지 나누기 기능을 사용하려면 한 페이지에 보여 줄 항목 개수에 대한 설정을 `_config.yml` 파일에 추가해야 한다.

```yaml
paginate: 5
paginate_path: "/posts/page:num/"
```

`paginate`는 한 페이지에 표시할 포스트의 개수를 입력하면 된다.

`paginate_path`는 `posts/index.html`에서 사용되어 `posts/page:num/`에 만들어진다. 여기서 `:num`은 2부터 시작하는 페이지 번호이다.

만약 포스트 목록이 4개의 페이지로 구성된 경우 1페이지는 `/posts/index.html`로 만들어 지고 2페이지부터는 `/posts/page2/index.html`, `/posts/page3/index.html`, `/posts/page4/index.html` 파일이 만들어 진다.

```bash
┌─ posts
│  ├─ index.html
│  ├─ page2
│  │  └─ index.html
│  ├─ page3
│  │  └─ index.html
│  ├─ page4
│  │  └─ index.html
...
```

> **Note**  
> 페이지 머리말에 **고유주소(permalink)**를 설정하면 페이지 나누기가 작동하지 않는다.
{: .notice--primary}

> **Warning**  
> 페이지 나누기는 카테고리, 태그 등의 포스트 목록에 대해서는 지원하지 않는다. 최신 버전의 [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2){:target="blank"} 플러그인에서는 카테고리, 태그 등 더 많은 페이지에서 페이지 나누기 기능을 사용할 수 있다. 하지만 **GitHub Pages**에서 이 플러그인을 지원하지 않는다.
{: .notice--primary}

|변수|설명|
|----|------|
|`paginator.page`|현재 페이지 번호|
|`paginator.per_page`|페이지 당 포스트 수|
|`paginator.posts`|현재 페이지의 포스트 목록|
|`paginator.total_posts`|전체 포스트 개수|
|`paginator.total_pages`|전체 페이지 개수|
|`paginator.previous_page`|이전 페이지 번호|
|`paginator.previous_page_path`|이전 페이지 경로|
|`paginator.next_page`|다음 페이지 번호|
|`paginator.next_page_path`|다음 페이지 경로|
{: .table.table-secondary.table-bordered}

포스트 목록에 페이지 나누기를 적용한 코드이다.

{% raw %}
```liquid
---
layout: default
title: My Posts
---

<ul>
{% for post in paginator.posts %}
	<li>
		<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
		<tiem>{{ post.date }}</time>
	</li>
{% endfor %}
</ul>

<div class="pagination">
	{% if paginator.previous_page %}
		<a href="{{ paginator.previous_page_path }}" class="page-prev">Previous</a>
	{% else %}
		<span class="page-prev">Previous</span>
	{% endif %}
	<span class="page-num">
		Page: {{ paginator.page }} of {{ paginator.total_pages }}
	</span>
	{% if paginator.next_page %}
		<a href="{{ paginator.next_page_path }}" class="page-next">Next</a>
	{% else %}
		<span class="page-next">Next</span>
	{% endif %}
</div>
```
{% endraw %}

## 포스트 목록 만들기

포스트의 페이징 처리는 일반적인 게시판에서 많이 사용되는 페이지 번호를 나열하는 방식으로 구현할 것이다. 일반적인 페이징 처리에서는 한 화면에 지정된 개수 만큼의 페이지 번호를 보여주므로 `_config.yml` 파일에 `paginate_size`를 추가해 몇 개의 페이지 번호를 보여 줄 것인지 설정한다.

```yaml
paginate_size: 5
```
{: data-label="_config.yml"}

이제 포스트 목록을 만들어 보자.

{% raw %}
```liquid
---
layout: page
---

{% assign label = site.data.ui-text.label -%}
<p>{{ label.total }} <strong class="text-primary">{{ site.posts | size | default: '0' }}</strong>{{ label.posts }}</p>
{% for post in paginator.posts -%}
	{% include postlist.html post=post %}
{% endfor %}

<!-- Pagination -->
<ul class="pagination">
	{%- assign page_link = "page-link" -%}
	{% assign first_page = 1 -%}
	{% assign last_page = site.paginate_size -%}
	{% if paginator.page > last_page -%}
		{% assign first_page = paginator.page | minus: 1 | divided_by: site.paginate_size | floor | times: site.paginate_size | plus: 1 -%}
		{% assign last_page = first_page | plus: site.paginate_size -%}
	{% endif -%}
	{% if last_page > paginator.total_pages -%}
		{% assign last_page = paginator.total_pages -%}
	{%- endif -%}
	<li class="page-item">
		{%- assign first_path = site.paginate_path | replace_first: '/', '' | split: '/' | first | prepend: '/' | append: '/' | relative_url -%}
		{% if paginator.previous_page -%}
			<a href="{{ first_path }}" class="{{ page_link }}" aria-label="{{ label.pagination_first | default: 'First' }}">
				<i class="fa fa-angles-left" aria-hidden="true"></i>
			</a>
		{% else -%}
			<span class="{{ page_link }} disabled" aria-label="{{ label.pagination_first | default: 'First' }}">
				<i class="fa fa-angles-left" aria-hidden="true"></i>
			</span>
		{%- endif -%}
	</li>
	<li class="page-item">
		{% if paginator.previous_page -%}
			<a href="{{ paginator.previous_page_path | relative_url }}" class="{{ page_link }}" aria-label="{{ label.pagination_previous | default: 'Previous' }}">
				<i class="fas fa-angle-left" aria-hidden="true"></i>
			</a>
		{% else -%}
			<span class="{{ page_link }} disabled" aria-label="{{ label.pagination_previous | default: 'Previous' }}">
				<i class="fas fa-angle-left" aria-hidden="true"></i>
			</span>
		{% endif -%}
	</li>
	{% for i in (first_page..last_page) -%}
		<li class="page-item">
		{% if i == paginator.page -%}
			<span class="{{ page_link }} active" aria-current="page">{{ i }}</span>
		{% elsif i == 1 -%}
			<a href="{{ first_path }}" class="{{ page_link }}">{{ i }}</a>
		{% else -%}
			<a href="{{ site.paginate_path | relative_url | replace: ':num', i }}" class="{{ page_link }}">{{ i }}</a>
		{%- endif -%}
		</li>
	{%- endfor -%}
	<li class="page-item">
		{% if paginator.next_page -%}
			<a href="{{ paginator.next_page_path | relative_url }}" class="{{ page_link }}" aria-label="{{ label.pagination_next | default: 'Next' }}">
				<i class="fas fa-angle-right"></i>
			</a>
		{% else -%}
			<span class="{{ page_link }} disabled" aria-label="{{ label.pagination_next | default: 'Next' }}">
				<i class="fas fa-angle-right"></i>
			</span>
		{%- endif -%}
	</li>
	<li class="page-item">
		{%- assign last_path = site.paginate_path | replace: ":num", paginator.total_pages | relative_url -%}
		{% if paginator.next_page -%}
			<a href="{{ last_path }}" class="{{ page_link }}" aria-label="{{ label.pagination_last | default: 'Last' }}">
				<i class="fa fa-angles-right" aria-hidden="true"></i>
			</a>
		{% else -%}
			<span class="{{ page_link }} disabled" aria-label="{{ label.pagination_last | default: 'Last' }}">
				<i class="fa fa-angles-right" aria-hidden="true"></i>
			</span>
		{%- endif -%}
	</li>
</ul>
```
{: data-label="posts/index.html"}
{% endraw %}

위 코드의 페이지 나누기에서 `first_page`는 페이지 번호의 시작 번호이고 `last_page`는 페이지 번호의 끝 번호이다. 그런데 나는 5개의 페이지 번호만 보여 줄 것이므로 `first_page = paginator.page | minus: 1 | divided_by: site.paginate_size | floor | times: site.paginate_size | plus: 1`을 해주었다. 예를 들어 현재 페이지 번호가 6일 경우 `(6 - 1) / 5`를 내리면 `1`이 되고, `1 * 5 + 1`을 해서 `6`이라는 값이 나오게 된다. 이렇게 하면 1 ~ 5페이지는 1이 되고 6 ~ 10페이지는 6이 되므로 현재 페이지 번호에 맞는 페이지 번호의 시작 번호가 된다.

`first_path = site.paginate_path | replace_first: '/', '' | split: '/' | first | prepend: '/' | append: '/' | relative_url`를 변수로 선언해 사용하는 것은 위에서 설명한 것과 같이 첫 페이지는 `posts/index.html` 파일을 의미하므로 URL은 `/posts/`가 된다. 따라서 페이지 번호를 출력하는 반복문에서도 첫 페이지에서만 다른 URL을 설정 해주는 것이다.
