---
title: "Github 블로그 - 12. 연도 아카이브 만들기"
excerpt: ""
categories: [blog]
tags: [Github, Blog, Jekyll, 연도 아카이브]
date: 2023-12-23 20:21
---

이번 시간에는 연도별로 포스트를 나열하는 페이지를 만들 것이다.

{% raw %}
```liquid
---
layout: default
permalink: /year-archive/
---

{%- assign postsByYear = site.posts | where_exp: "item", "item.hidden != true" | group_by_exp: 'post', 'post.date | date: "%Y"' -%}
<ul class="nav-skip">
	{% for year in postsByYear %}
	<li>
		<a href="#{{ year.name | slugify }}" class="btn btn-primary">
			<strong>
				<i class="fa-solid fa-calendar" aria-hidden="true"></i> {{ year.name }}
			</strong>
			<span class="badge text-bg-light">{{ year.items | size }}</span>
		</a>
	</li>
	{% endfor -%}
</ul>

{% for year in postsByYear -%}
	{% assign title = year.name -%}
	{% assign posts = year.items -%}
	{% include postgroup.html %}
{%- endfor -%}
```
{: data-label="year-archive.html"}
{% endraw %}

기존에 만들었던 카테고리, 태그와 동일한 구조이다. 다만 연도 아카이브의 경우 제공되는 사이트 변수가 없기 때문에 변수를 만들어 사용해야 한다.

`assign postsByYear = site.posts | where_exp: "item", "item.hidden != true" | group_by_exp: 'post', 'post.date | date: "%Y"'`는 포스트의 날짜를 기준으로 그룹화하는 코드로 날짜의 형식을 `%Y`로 지정해주었기 때문에 연도별로 포스트가 그룹화되는 것이다. 만약 월별 또는 일별로 그룹화하고 싶다면 그에 맞는 날짜 형식을 사용하면 된다.

기존과 달리 `year.name`은 연도를 의미하고 `year.items`은 해당 연도의 포스트 배열을 의미한다.

<blockquote>
**group_by_exp**

배열 안의 항목들을 Liquid 표현식을 사용해 그룹 짓는다.

{% raw %}
```liquid
{{ site.members | group_by_exp: "item", "item.graduation_year | truncate: 3, ''" }}
```
{: data-label="Input"}
{% endraw %}

```
[{"name"=>"201", "items"=>[...]}, {"name"=>"200", "items"=>[...]}]
```
{: data-label="Output"}
</blockquote>
