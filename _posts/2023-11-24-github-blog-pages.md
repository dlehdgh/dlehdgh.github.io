---
layout: post
title: "Github 블로그 - 8. 페이지 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll, Pages]
toc: true
toc_sticky: true
date: 2023-11-24 18:29
---

이번 시간에는 매인 페이지, 소개 페이지, 404 페이지를 만들 것이다.

페이지를 만들 때는 `.html` 또는 `.md` 확장자로 파일을 만든 후 **머리말**을 입력한 뒤 원하는 내용을 입력하면 된다. **HTML** 문법 또는 **마크다운** 문법으로 페이지를 작성할 수 있다.

### 매인 페이지 만들기

{% raw %}
```markdown
---
layout: home
---
```
{: data-label="index.html"}
{% raw %}

메인 페이지는 `home` 레이아웃을 통해 출력할 것이므로 아무런 내용을 입력하지 않아도 된다. 하지만 매인 페이지에 추가하고 싶은 내용이 있으면 추가로 입력하면 된다.

### 소개 페이지 만들기

{% raw %}
```markdown
---
layout: page
---

소개글 내용
```
{: data-label="about.md"}
{% endraw %}

소개 페이지에는 블로그의 소개글을 적어주면 된다.

### 404 페이지

404 페이지는 잘 못된 주소로 접속한 경우 보여 줄 페이지라고 할 수 있다.

{% raw %}
```liquid
---
layout: default
permalink: /404.html
---

<article class="page-content">
	<h2 class="h1 text-primary fw-bolder">Error 404 Not Found.</h2>
	<p><strong>페이지를 찾을 수 없습니다 :(</strong></p>
	<p>요청하신 페이지를 찾을 수 없습니다.</p>
	<button type="button" class="btn btn-outline-primary" onclick="history.go(-1);">이전 페이지로 이동</button>
	<a href="{{ '/' | relative_url }}" class="btn btn-outline-primary">홈으로 이동</a>
</article>
```
{: data-label="404.html"}
{% endraw %}

만약 404 페이지를 기존과 다른 레이아웃으로 구현하고 싶은 경우 `layout: null`로 설정해 빈 레이아웃으로 만든 뒤 원하는 코드를 추가하면 된다.
