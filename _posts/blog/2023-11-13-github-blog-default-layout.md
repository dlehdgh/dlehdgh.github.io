---
layout: post
title: "Github 블로그 - 7. 기본 레이아웃 구성"
categories: [blog]
tags: [Github, Blog, Jekyll, 레이아웃]
toc: true
toc_sticky: true
date: 2023-11-13 21:35
---

### 레이아웃이란?

레이아웃은 컨텐츠를 포장하는 템플릿이다. 템플릿을 위한 코드를 한 곳에 보관할 수 있게 해주기 때문에 모든 페이지에 네비게이션이나 푸터를 반복해서 입력할 필요가 없다.

레이아웃은 `_layouts` 폴더에 레이아웃으로 사용할 HTML 파일을 만들면 되는데 `default.html`라는 이름의 기본 템플릿을 가지고 필요에 따라 상속해서 다른 레이아웃을 만든다.

레이아웃 파일에서 `content`라는 변수를 사용하는데 그 값은 레이아웃을 사용하는 페이지나 포스트의 콘텐츠가 들어가게 된다.

### 기본 레이아웃 구성

나는 **Start Bootstrap - Resume** 테마를 적용하기 위해 필요한 CSS 파일을 추가하고, 테마의 Navigation과 About의 코드를 가져와 사용했다.

{% raw %}
```liquid
<!DOCTYPE html>
<html lang="ko">
<head>
	{% include head.html %}
</head>
<body>
	{% include navbar.html %}

	<main class="container-fluid p-0">
		<h1 id="main" class="visually-hidden">본문 영역</h1>
		<section class="resume-section">
			<div class="resume-section-content">
				{{ content }}
			</div>
		</section>
	</main>

	{% include footer.html %}

	{% include scripts.html %}
</body>
</html>
```
{: data-label="_layouts/default.html"}
{% endraw %}

`default.html`에서 일부 코드를 `include` 구문으로 파일을 불러와 사용했는데 이렇게 파일을 분리해 사용한 것은 나중에 다른 페이지에서 다른 레이아웃을 사용할 경우 반복되는 영역을 호출해 사용하기 위해서 이다.

{% raw %}
```liquid
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>
	{% if page.title -%}
		{{ page.title | escape }} - {{ site.title | escape }}
	{% else -%}
		{{ site.title | escape }}
	{% endif -%}
</title>
<!-- favicon -->
<link rel="shortcut icon" href="{{ '/favicon.ico' | relative_url }}" type="image/x-icon">
<!-- Google Font -->
<link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet" type="text/css">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- Syntax -->
<link rel="stylesheet" href="{{ '/assets/css/syntax.min.css' | relative_url }}">
<!-- Core theme CSS (includes Bootstrap) -->
<link rel="stylesheet" href="{{ '/assets/css/resume.min.css' | relative_url }}">
<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
<!-- CSS -->
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
```
{: data-label="_includes/head.html"}
{% endraw %}

{% raw %}
```liquid
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<!-- Bootstrap core JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- JS -->
<script src="{{ '/assets/js/main.js' | relative_url }}"></script>
```
{: data-label="_includes/scripts.html"}
{% endraw %}

#### 네비게이션 만들기

{% raw %}
```liquid
{%- assign names = site.data.ui-text.navbar -%}
<!-- Skip Navigation -->
<div class="navbar fixed-top visually-hidden-focusable z-max">
	<div class="container-fluid">
		<a href="#main" class="visually-hidden-focusable btn btn-skip">{{ site.data.ui-text.label.skip_content }}</a>
		<a href="#sideNav" class="visually-hidden-focusable btn btn-skip">{{ site.data.ui-text.label.skip_navigation }}</a>
	</div>
</div>

<!-- Navigation-->
<nav id="sideNav" class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="매인 네비게이션">
	<!-- Logo -->
	<a href="{{ '/' | relative_url }}" class="navbar-brand d-block mb-lg-4 js-scroll-trigger">
		<span class="d-none d-lg-block">
			<img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="{{ '/favicon.ico' | relative_url }}" alt="Logo">
		</span>
		<span class="h2">{{ site.title | escape }}</span>
	</a>
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="{{ site.data.ui-text.label.navbar_toggler }}">
		<span class="navbar-toggler-icon"></span>
	</button>
	<!-- Menu -->
	<div class="collapse navbar-collapse" id="navbarResponsive">
		<ul class="navbar-nav">
			<!-- <li class="nav-item">
				<a href="{{ '/' | relative_url }}" class="nav-link js-scroll-trigger{% if page.url == '/' %} active" aria-current="page{% endif %}">{{ names.home }}</a>
			</li> -->
			{% for navbar in site.data.navigation.navbar -%}
				<li class="nav-item">
					<a href="{{ navbar.url | relative_url }}" class="nav-link js-scroll-trigger{% if page.url == navbar.url %} active" aria-current="page{% endif %}">
						<i class="{{ navbar.icon }}" aria-hidden="true"></i> {{ names[navbar.name] }}
					</a>
				</li>
			{% endfor -%}
			<li class="nav-item">
				<a href="#" class="nav-link js-scroll-trigger" data-bs-toggle="modal" data-bs-target="#search-modal">
					<i class="fa fa-fw fa-search" aria-hidden="true"></i> {{ names.search }}
				</a>
			</li>
		</ul>
	</div>
</nav>
```
{: data-label="_includes/navbar.html"}
{% endraw %}

마지막의 검색 링크는 나중에 검색 기능을 구현하는 과정에서 자세히 다루겠다.

#### 헤더 영역 만들기

하위 페이지의 제목을 표시하거나  포스트의 제목, 작성자, 작성일 등의 정보를 표시할 것이다.

> 내가 `header.html` 파일로 분리한 것은 매번 페이지 제목 또는 포스트 제목을 출력하기 위해 거의 동일한 코드를 적어야 하는 불편이 있어 만들게 되었다.

{% raw %}
```liquid
<header class="page-header">
	{% if page.layout == 'home' %}
		<h2>{{ site.title }}</h2>
		{% if site.description %}
			<div class="subheading mb-3">{{ site.description }}</div>
		{% endif %}
	{% else %}
		<a href="javascript: history.back(-1);" id="btn-go-back" class="btn btn-link btn-sm text-dark" aria-label="{{ site.data.ui-text.label.go_back }}">
			<i class="fa fa-arrow-left" aria-hidden="true"></i>
		</a>
		{% include breadcrumbs.html %}
		{% assign page_name = page.url | remove_first: "/" | split: "/" | first %}
		<h2>{{ page.title | default: site.data.ui-text.navbar[page_name] }}</h2>
		{% if page.description %}
			<div class="subheading mb-3">{{ page.description }}</div>
		{% endif %}
		{% if page.date %}
			<p>
				{% include read_time.html %} · 
				{% include datetime.html date=page.date format=site.date_time_format %}
			</p>
		{% endif %}
	{% endif %}
</header>
```
{: data-label="_includes/header.html"}
{% endraw %}

{% raw %}
```liquid
<i class="fas fa-calendar-days" aria-hidden="true"></i>
<span class="visually-hidden">{{ site.data.ui-text.label.updated }}:</span>
<time datetime="{{ include.date | date_to_xmlschema }}">{{ include.date | date: include.format }}</time>
```
{: data-label="_includes/datetime.html"}
{% endraw %}

위 코드는 아주 간단하지만 여러 곳에서 날짜를 출력하다 보면 `datetime` 속성을 빼먹는 경우도 있어 이전에 작성했던 코드를 확인하면서 작성해야 하는 불편이 있어 `_includes` 폴더로 파일을 분리해 사용했다.

`include.date | date: include.date_format`는 페이지의 날짜를 지정한 형식으로 바꾸는 구문이다. `_config.yml` 파일에 다음과 같이 입력해 사용하면 된다.

```yaml
date_format: "%Y.%m.%d" # 년.월.일(ex: 2023.11.01)
date_time_format: "%Y.%m.%d %I:%M"  # 년.월.일 시:분(ex: 2023.11.01 11:01)
```
{: data-label="_config.yml"}

날짜 형식에 대한 자세한 내용은 [STRFTIME](https://strftime.net/){:target="_blank"}를 참고하세요.

`read_time.html`은 포스트를 읽는데 소모되는 시간을 출력해주는 파일이다. 자세한 내용에 대해서는 포스트를 따로 만들어 설명하겠다.

#### 푸터 영역 만들기

{% raw %}
```liquid
<button type="button" id="btn-back-to-top" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{ site.data.ui-text.label.go_top }}" aria-label="{{ site.data.ui-text.label.go_top }}">Top</button>
<footer class="resume-footer">
	<h1 class="h2">
		<a href="{{ '/' | relative_url }}" class="text-dark">{{ site.title }}</a>
	</h1>
	<div class="social-icons">
		<a href="{{ 'feed.xml' | relative_url }}" class="social-icon" target="_blank" aria-label="RSS">
			<i class="fas fa-rss text-info" aria-hidden="true"></i>
		</a>
		{% if site.email -%}
		<a href="mailto:{{ site.email }}" class="social-icon" aria-label="E-mail">
			<i class="fas fa-envelope text-warning" aria-hidden="true"></i>
		</a>
		{% endif -%}
		{% if site.github_username -%}
		<a href="https://github.com/{{ site.github_username }}" target="_blank" class="social-icon" target="_blank" aria-label="Github">
			<i class="fab fa-github" aria-hidden="true"></i>
		</a>
		{% endif -%}
		{% if site.twitter_username -%}
		<a href="https:​/​/​twitter.com/{{ site.twitter_username }}" class="social-icon" target="_blank" aria-label="Twitter">
			<i class="fab fa-twitter" aria-hidden="true"></i>
		</a>
		{% endif -%}
		{% if site.facebook_username -%}
		<a href="https://www.facebook.com/{{ site.facebook_username }}" class="social-icon" target="_blank" aria-label="Facebook">
			<i class="fab fa-facebook-f" aria-hidden="true"></i>
		</a>
		{% endif -%}
	</div>
	<address>&copy; 2017. <strong>{{ site.title }}</strong> all rights reserved.</address>
</footer>
```
{: data-label="_includes/footer.html"}
{% endraw %}

푸터 영역의 `.social-icons`에는 자신의 상황에 맞는 SNS 링크를 추가하면 된다. 그리고 SNS 링크는 `_config.yml` 파일에 사용할 변수를 입력해 두어야 사용이 가능하다.

RSS의 `feed.xml` 파일은 기본 플러그인으로 제공되는 `jekyll-feed` 플러그인으로 자동 생성되는 파일이다. Jekyll을 로컬 환경 또는 클라우드 통합 개발 환경(IDE)를 통해 개발하는 경우 `_site` 폴더에 `feed.xml` 파일이 있는 것을 확인할 수 있다.

### 페이지 레이아웃 구성

{% raw %}
```liquid
---
layout: default
---

<article class="page-content">
	{{ content }}
</article>
```
{: data-label="_layouts/page.html"}
{% endraw %}

페이지는 간단하다. 페이지 제목은 `default.html`에서 출력해주므로 본문 콘텐츠만 출력해주면 된다.

### 레이아웃 파일 구조

내가 만들 레이아웃 파일의 목록은 다음과 같다.

```bash
┌─ _layouts
│  ├─ category.html
│  ├─ default.html
│  ├─ home.html
│  ├─ page.html
│  ├─ post.html
│  ├─ posts_by_group.html
│  ├─ docs.html
│  └─ single-docs.html
```

> `home.html`, `post.html`, `category.html`, `posts_by_group.html`는 포스트와 카테고리를 만드는 과정에서 만들 것이다.
> `docs.html`, `single-docs.html`는 접근성 테스트 메뉴를 만드는 과정에서 자세히 설명하겠다.