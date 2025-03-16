---
title: "Github 블로그 - 16. SEO 작업"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - SEO
date: 2025-02-08 21:27
---

내가 공부한 내용을 나중에 보기 위해 블로그를 만들었기 때문에 SEO 작업을 하지 않았지만 간단하게 소개하겠다.

## SEO란?

SEO의 뜻은 **‘검색엔진 최적화’**인데, 사람들이 웹에서 사이트를 찾아보기 쉽도록 보완하는 작업이다. 링크 공유시 등장하는 미리보기도 SEO에 포함된다. 네이버 블로그처럼 대형 블로그 플랫폼은 SEO가 이미 잘 되어있지만, Github 블로그의 경우 추가적인 작업이 필요하다.

## robots.txt 생성하기

우리가 사이트에 접속하는 방법은 구글 또는 네이버와 같은 검색엔진을 이용한다. 따라서 내 사이트를 등록해줘야 검색엔진에 노출이 된다. 검색엔진에 등록하는 방법에 대해서는 **참고** 링크를 보면 자세하게 설명되어 있다.

검색엔진은 보통 사이트의 **robots.txt**를 읽어서 접근 권환을 확인하기 때문에 **robots.txt** 파일을 만들어 줘야 한다.

아래 코드는 모든 검색엔진의 로봇에 대하여 수집을 허용으로 설정한다는 것이다.

```
User-agent: *
Allow: /
Sitemap: https://사이트주소/sitemap.xml
```

## 참고

[jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag){: target="_blank"} 플러그인을 이용하면 좀 더 편리하게 구성할 수 있는 것 같다.

* [깃허브 지킬 블로그 SEO 작업 - VVCD code](https://vvcdcode.github.io/2019/08/15/jekyll-seo.html){: target="_blank"}
* [깃허브 블로그에서 구글 검색 엔진 최적화 하기 - Standing-O](https://standing-o.github.io/posts/jekyll-seo/){: target="_blank"}
