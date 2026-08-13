---
title: "Github 블로그 - 9. 홈화면 꾸미기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Recent Posts
  - Tag Cloud
date: 2023-11-25 09:49
last_modified_at: 2025-02-28 21:43
---

Jekyll로 만든 사이트에 접속해보면 아무런 내용이 안 나오는 것을 알 수 있다. 그것은 우리가 홈화면 레이아웃을 만들지 않았기 때문이다.

홈화면에는 **최근 포스트**와 **태그 클라우드**를 표시할 것이다. **태그 클라우드**는 태그들을 분석하여 중요도나 인기도 등을 고려하여 시각적으로 늘어 놓아 웹 사이트에 표시하는 것이다.

{% raw %}
```liquid
---
layout: default
---

<header class="page-header">
	<h2 class="page-title">{{ site.title }}</h2>
	{% if site.description -%}
		<div class="subheading mb-3">{{ site.description }}</div>
	{% endif -%}
</header>

{{ content }}

<article class="page-content">
	<h2>{{ site.data.ui-text.label.recent_posts }}</h2>
	<p>{{ site.data.ui-text.label.total }} <strong class="text-primary">{{ site.posts | size | default: '0' }}</strong>{{ site.data.ui-text.label.posts }}</p>
	{% for post in site.posts limit: 5 -%}
		{% include postlist.html post=post %}
	{% endfor -%}
	<a href="{{ '/posts/' | relative_url }}" class="btn btn-primary" aria-label="{{ site.data.ui-text.navbar.posts }} {{ site.data.ui-text.label.more }}">
		{{ site.data.ui-text.label.more }} &rarr;
	</a>
</article>

<article class="page-content">
	<h2>{{ site.data.ui-text.label.tag_cloud }}</h2>
	<div class="tag-cloud">
		{%- capture tags -%}
			{% for tag in site.tags -%}
				{% if tag[1].size > 1 %}
					{{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}{%- unless forloop.last -%}|{%- endunless %}
				{%- endif -%}
			{% endfor -%}
		{% endcapture -%}
		{% assign tags = tags | split: "|" | sort | reverse -%}
		{% assign path_type = '#' -%}
		{% for tag in tags -%}
			{% assign item = tag | split: "#" -%}
			{%- assign tag_url = item[1] | slugify %}
			<a href="{{ '/tags/' | append: path_type | append: tag_url | relative_url }}" class="btn btn-outline-primary rounded-pill m-1" aria-description="{{ site.data.ui-text.navbar.tags }}" rel="tag">
				<i class="fas fa-tags" aria-hidden="true"></i> {{ item[1] }}
				<span class="badge text-bg-light">{{ item[2] }}</span>
			</a>
		{%- endfor %}
	</div>
</article>
```
{: data-label="_layouts/home.html"}
{% endraw %}

## 최근 포스트 목록

`for post in site.posts limit: 5` 코드는 `site.posts`로 모든 포스트 목록을 가져오는데 `limit: 5`를 입력했으므로 5개의 포스트만 출력되는 것이다.

`postlist.html` 파일은 앞으로 포스트, 카테고리, 태그 등의 목록을 출력하기 위해 여러 페이지에서 사용되므로 `_includes` 폴더로 파일을 분리해 사용했다.

> 나는 포스트 목록을 포스트의 제목, 작성자, 작성일, 예상 읽기 시간, 카테고리로 구성했지만 원하는 형식으로 만들어 사용하면 된다.
{: .notice--warning}

{% raw %}
```liquid
{%- assign post = include.post -%}
<div class="post-item">
	<h3 class="post-title"><a href="{{ post.url | relative_url | replace: '//', '/' }}">{{ post.title }}</a></h3>
	<small class="post-meta">
		{% if post.date -%}
		{% include datetime.html date=post.date format=site.date_format %}
		{%- endif %}
		{% include read_time.html %}
		{% if post.categories -%}
		<i class="fas fa-folder-open" aria-hidden="true"></i>
		<span class="visually-hidden">{{ site.data.ui-text.navbar.categories }}:</span>
		<span>{{ post.categories | array_to_sentence_string  }}</span>
		{%- endif %}
	</small>
</div>
```
{: data-label="_includes/postlist.html"}
{% endraw %}

## 태그 클라우드

```liquid
{%- capture tags -%}
	{% for tag in site.tags -%}
		{% if tag[1].size > 1 %}
			{{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}{%- unless forloop.last -%}|{%- endunless %}
		{%- endif -%}
	{% endfor -%}
{% endcapture -%}
{% assign tags = tags | split: "|" | sort | reverse -%}
{% assign path_type = '#' -%}
{% for tag in tags -%}
	{% assign item = tag | split: "#" -%}
	{%- assign tag_url = item[1] | slugify %}
	<a href="{{ '/tags/' | append: path_type | append: tag_url | relative_url }}" class="btn btn-outline-primary rounded-pill m-1" aria-description="{{ site.data.ui-text.navbar.tags }}" rel="tag">
		<i class="fas fa-tags" aria-hidden="true"></i> {{ item[1] }}
		<span class="badge text-bg-light">{{ item[2] }}</span>
	</a>
{%- endfor %}
```

`capture`를 이용해 변수로 선언한 것을 설명하자면 태그 목록을 가져온 뒤 각각의 태그를 `태그의 포스트 개수 * 1000#태그#태그의 포스트 개수`로 만들어 태그를 하나의 문자열로 만드는 과정이다. 이처럼 만드는 것은 태그의 포스트 개수가 많은 순으로 정렬하기 위해서 이다.

`tags` 변수의 값을 `태그의 포스트 개수#태그`로 해도 정렬이 될 것 같지만 예를 들어 `10#사과|5#바나나|2#배`일 경우 정렬한 결과는 `10#사과`, `2#배`, `5#바나나|` 순으로 정렬되어  우리가 원하는 순서가 아니게 된다. 이 문제를 해결하기 위해 태그의 포스트 개수에 **1000**을 곱한 것이다.
