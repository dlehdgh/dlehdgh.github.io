---
title: "Github 블로그 - 3. 기본 설정"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - _config.yml
date: 2023-11-04 15:03
---

## Jekyll 폴더 구조 이해하기

처음 Jekyll을 생성하면 여러 폴더가 자동으로 생성되어 있을 것이다. 생성되어 있지 않은 폴더도 있겠지만 직접 폴더를 만들어 사용하면 된다.

* `_data` : 데이터가 있는 폴더로 yml 형식의 파일을 생성해서 입력된 데이터를 가져와 사용할 수 있다.
* `_includes` : 반복해서 사용해야 하는 파일이 있는 폴더이다. 동일한 내용을 여러 파일에서 사용할 때 반복되는 부분을 .html 파일로 저장한 뒤 호출해서 사용할 수 있다.
* `_layouts` : 레이아웃을 구성하는 파일들이 있는 폴더이다.
* `_plugins` : 플러그인이 되는 Ruby 파일이 있는 폴더이다.
* `_posts` : 블로그에 게시되는 포스트들이 있는 폴더이다.
* `_drafts` : 초안이다. 즉 아직 게시하지 않은 포스트를 말한다. 파일명 형식에 날짜가 없다.
* `_site` : Jekyll을 실행하면 자동으로 폴더와 파일이 생성되는데 브라우저에 출력될 파일들이 있는 폴더이다.
* `_sass` : SCSS를 사용하기 위한 폴더로 사이트의 스타일을 설정한다.
* `assets` : 사이트의 자료들이 있는 폴더이다.

> 나는 SASS를 사용하지 않았기 때문에 `_sass` 폴더는 생성하지 않고 `assets` 폴더에 CSS 파일을 만들어 사용했다.
>
> 내가 만든 기본 디렉토리 구조는 다음과 같다.
>
> ```bash
> .
> ┌─ _data
> ├─ _includes
> ├─ _layouts
> ├─ _plugins
> ├─ _posts
> ├─ assets
> ├─ _config.yml
> └─ index.html
> ...
> ```
{: .notice--primary}

## _config.yml 설정하기

`_config.yml`은 우리가 만들 사이트에 대한 기본 설정이 담긴 파일이라고 할 수 있다. 기본적으로 생성되는 파일에 간단한 설명이 주석으로 달려있으나 각 항목에 대해 설명하겠다.

* `title` : 사이트 제목
* `description` : 사이트 설명
* `author` : 포스트의 작성자로 표시할 이름
* `email` : 사이트 운영자 이메일
* `url` : 사이트의 기본 호스트 이름 및 프로토콜, e.g. http://example.com
* `baseurl` : 사이트의 하위 경로로 최상위 경로일 경우는 빈칸으로 입력하면 되고 아닐 경우 `/폴더명`과 같이 입력하면 된다.
* `permalink` : 포스트의 URL 표시 방식을 지정한다.
  - 기본값은 `/:categories/:year/:month/:day/:title/`이다. 나는 `/:categories/:title/`로 설정했다.
  - 예를 들어 `_posts/2023-01-01-test-post.md`라는 파일에 카테고리를 `blog`로 설정한 경우 기본값의 URL은 `/blog/2023/01/01/test-post/`가 되고 나와 같이 설정한 경우에는 URL이 `/blog/test-post/`가 된다.
* `theme` : 사용할 테마를 입력하면 되는데 나는 기본값인 `minima` 테마를 사용하기로 했다.
* `plugins` : 사용할 플러그인을 입력하는 곳으로 자세한 내용은 paginate 플러그인을 사용하는 편에서 자세하게 설명하겠다.
