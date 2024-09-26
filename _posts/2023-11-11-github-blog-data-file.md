---
layout: post
title: "Github 블로그 - 6. 데이터 파일 만들기"
categories: [blog]
tags: [Github, Blog, Jekyll]
toc: true
toc_sticky: true
date: 2023-11-11 19:04
---

### 데이터 파일이란?

Jekyll에서 제공하는 **기본변수**뿐만 아니라 자신만의 데이터라고 할 수 있다.

먼저 `_data` 폴더를 만들고 `.yml`파일을 만들면 된다.

### 데이터 파일 사용방법

기본적인 데이터 파일의 형식은 다음과 같다.

```yaml
navbar:
  - title: 소개
    url: /about/
  - title: 포스트
    url: /posts/
  - title: 연도 아카이브
    url: /year-archive/
  - title: 카테고리
    url: /categories/
  - title: 태그
    url: /tags/
```

데이터 파일에 자신이 원하는 항목을 추가해 사용하면 된다.

데이터 파일에 입력한 데이터를 출력하려면 `site.data.[YAML 파일명].[변수명]`으로 입력해 사용하면 된다.

{% raw %}
```liquid
<ul>
	{% for navbar in site.data.navigation.navbar %}
	<li>
		<a href="{{ navbar.url | relative_url }}">{{ navbar.title }}</a>
	</li>
	{% endfor %}
</ul>
```
{% endraw %}

### 데이터 파일 만들기

```yaml
navbar:
  - name: home
    url: /
    icon: fa-solid fa-house-chimney
  - name: about
    url: /about/
    icon: fa-sharp fa-solid fa-circle-info
  - name: posts
    url: /posts/
    icon: fa-solid fa-blog
  - name: year-archive
    url: /year-archive/
    icon: fa-solid fa-calendar
  - name: categories
    url: /categories/
    icon: fas fa-folder-open
  - name: tags
    url: /tags/
    icon: fa-solid fa-tag
  - name: testing
    url: /testing/
    icon: fa-solid fa-universal-access
```
{: data-label="navigation.yml"}

```yaml
# 메뉴를 구성하는 navbar의 name 값과 일치하는 항목을 출력.
navbar:
  home: 홈
  about: 소개
  posts: 포스트
  year-archive: 연도 아카이브
  categories: 카테고리
  tags: 태그
  testing: 접근성 테스트
  search: 검색

# 레이블
label:
  skip_content: 본문 바로가기
  skip_navigation: 주메뉴 바로가기
  navbar_toggler: 토글 메뉴
  recent_posts: 최근 포스트
  toc: 목차
  author: 작성자
  updated: 작성일
  read_time: 예상 읽기 시간
  less_than: 최대
  minute_read: 분 소요
  words: 단어
  share: 공유
  sns:
    facebook: 페이스북 공유
    twitter: 트위터 공유
    linkedin: 링크드인 공유
    naver: 네이버 공유
    kakaostory: 카카오스토리 공유
  related_posts: 관련글
  prev_post: 이전 글 
  next_post: 다음 글
  pagination_previous: 이전 페이지
  pagination_next: 다음 페이지
  pagination_first: 첫번째 페이지
  pagination_last : 마지막 페이지
  year: 연도 # 연도 아카이브의 바로가기 링크에 사용
  total: 총
  posts: 개의 게시물
  more: 더보기
  go_back: 뒤로
  go_top: 맨위로
  tag_cloud: 태그 클라우드
  nosearch: 검색결과가 없습니다.
  copy_url: URL 복사
  print: 인쇄
```
{: data-label="ui-text.yml"}

데이터 파일을 보면 Key 앞에 대시(-)를 붙인 곳과 안 붙인 곳이 있는 것을 알 수 있다. 대시(-)를 붙이면 배열 안에 객체로 인식되어 `navbar[0].url`과 같이 사용해야 하고 대시를 붙이지 않으면 객체로 인식되어 `navbar.home`와 같이 사용하면 된다.

`navigation.yml`은 네비게이션을 구성하는 데이터로 `name`, `url`, `icon`으로 구성되는데 `name`은 화면에 출력할 텍스트가 아니라 `ui-text.yml`의 `navbar`에서 일치하는 항목의 값을 가져오기 위해서 사용된다.

`ui-text.yml`에서 `label`은 여러 페이지에서 사용되는 텍스트 데이터로 사용할 텍스트를 변수로 지정하면 된다.

> 내가 `navigation.yml`과 `ui-text.yml`로 데이터 파일을 구성한 것은 여러 페이지에서 사용되는 텍스트를 데이터 파일로 제어하려는 것이다. 예를 들어 메뉴에도 **태그**가 있고 태그 페이지의 페이지 제목으로 **태그**가 사용된다. 만약 이 메뉴를 영어로 **Tags**로 수정하려면 메뉴와 태그 페이지 두 곳에서 모두 변경해 주어야 한다. 하지만 데이터 파일의 `navbar` 객체를 이용해 출력하면 데이터 파일만 수정해도 모든 페이지에 적용이 가능하다.
