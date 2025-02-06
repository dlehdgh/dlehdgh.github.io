---
layout: post
title: "Github 블로그 - 13. 아카이브 통합 레이아웃 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll, Categories, Tags, 연도 아카이브, 통합]
toc: true
toc_sticky: true
date: 2024-07-07 11:39
---

카테고리, 태그, 연도 아카이브의 코드를 비교해보면 내용만 다르지 레이아웃은 동일한 것을 알 수 있다. 그래서 하나의 레이아웃으로 만들 수 없을지 고민을 하다가 마크다운 파일의 **머리글**로 값을 전달 받아 그에 맞는 내용을 출력하는 방식으로 만들었다.

우선 기존에 만들었던 파일을 `md`파일로 수정한다.

```bash
┌─ categories
│ ├─ blog.md
│ └─ index.md
├─ tags.md
└─ year-archive.md
```

우선 머리글에 추가할 항목에 대한 설명을 하겠다.

```yml
- group_by:
  - key: "tags"
    icon: "fa-solid fa-tag"
  - key: "categories"
    icon: "fas fa-folder-open"
  - key:
    - "year" # %Y
    - "month" # %m
    - "day" # %d
    icon: "fa-solid fa-calendar"
```

보면 알겠지만 `key`는 표시할 항목을 구분하기 위한 값이고, `icon`은 건너뛰기 링크에 넣을 아이콘의 클레스를 의미한다. 머리글에 다음과 같이 입력하면 된다.

```
...
group_by:
  key: "categories"
  icon: "fas fa-folder-open"
```
{: data-label="Example"}

이제 레이아웃을 만들어 보자.

{% raw %}
```liquid
---
layout: default
---

{% include header.html meta=false %}

{%- assign args = "" | split: "," -%}
{%- case page.group_by.key -%}
	{%- when "categories" or "tags" -%}
		{%- assign args = site[page.group_by.key] -%}
		{% assign idx_title = 0 -%}
		{% assign idx_items = 1 -%}
	{% when "year" or "month" or "day" -%}
		{%- if page.group_by.key == "year" -%}
			{%- assign date_format = "%Y" -%}
		{% else -%}
			{%- assign date_format = page.group_by.key | split: "" | first | prepend: "%" -%}
		{% endif -%}
		{% assign args = site.posts | where_exp: "item", "item.hidden != true" | group_by_exp: 'post', 'post.date | date: date_format' -%}
		{% assign idx_title = "name" -%}
		{% assign idx_items = "items" -%}
{% endcase -%}
<ul class="nav-skip">
	{%- for post in args -%}
		{% capture skip_title -%}{{ post[idx_title] }}{% endcapture -%}
		{% capture skip_size -%}{{ post[idx_items].size }}{% endcapture -%}
		{% capture skip_icon -%}{{ page.group_by.icon }}{% endcapture %}
		{% include skip_list.html title=skip_title size=skip_size fa=skip_icon %}
	{% endfor -%}
</ul>

{%- for item in args -%}
	{% capture title -%}{{ item[idx_title] }}{% endcapture -%}
	{% assign posts = item[idx_items] -%}
	{% include postgroup.html title=title %}
{% endfor -%}
```
{: data-label="_layout/posts_by_group.html"}
{% endraw %}

위 코드를 설명하자면 **머리글**에 입력한 `key` 값에 따라 `site` 변수에서 원하는 포스트 목록을 가져오는 방식이다. 그리고 `include` 파일로 `post[idx_title]`를 전달해주면 오류가 발생한다. 이를 해결하기 위해 `capture` 구문을 사용해 변수를 선언하는 것이다.

> 설명을 하잖니 뭐라고 글을 적어야 할지 어렵네요. 이전 포스트의 카테고리, 태그, 연도 아카이브의 포스트를 참고하세요.
