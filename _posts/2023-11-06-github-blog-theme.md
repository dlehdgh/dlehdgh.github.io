---
layout: post
title: "Github 블로그 - 5. 테마 설치"
categories: [blog]
tags: [Github, Blog, Jekyll, Theme]
toc: true
toc_sticky: true
date: 2023-11-06 15:10
---

### 테마 설치

Jekyll은 많은 양의 테마를 오픈 소스로 제공하고 있다. 아래 사이트에 접속하면 무료로 제공되는 테마를 미리 보거나 다운로드 받을 수 있다.

* [http://jekyllthemes.org/](http://jekyllthemes.org/){:target="_blank"}
* [https://jekyllthemes.io/free](https://jekyllthemes.io/free){:target="_blank"}
* [http://themes.jekyllrc.org/](http://themes.jekyllrc.org/){:target="_blank"}

테마를 설치하는 방법은 두가지가 있다.

1. 원하는 테마의 Github 소스에서 Clone을 눌러서 내 Github 저장소로 가져오는 방법이다.
2. 원하는 테마의 Github 소스를 다운받은 후 내 Github에 업로드하는 것이다.

자세한 방법은 인터넷에 올라온 글들을 참고하기 바란다.

> 나는 테마를 적용하려고 했으나 구름IDE로 처음 개발하다 보니 Github와 연동하지 못해 테마가 정상적으로 동작하지 않는 문제가 발생해 기본적으로 제공되는 테마를 사용했다. 그런데 기본 테마에는 아무런 디자인이 없어 부트스트랩의 테마를 이용하기로 했다.

### 부트스트랩 테마 가져오기

아래 주소로 접속한 뒤 원하는 디자인의 테마를 받아 사용하면 된다. 테마에서 원하는 부분의 코드만을 가져와 사용하는 것도 가능하다.

* [Start Bootstrap](https://startbootstrap.com/){:target="_blank"}

나는 **[Start Bootstrap - Resume](https://github.com/startbootstrap/startbootstrap-resume){:target="_blank"}** 테마를 받아 사용하기로 했다. Github에서 `tags`로 이동한 뒤 최신 버전의 소스를 받아서 사용해도 되고 아래 다운로드 링크로 이동해서 테마를 다운 받으면 된다.

* 다운로드 : [https://startbootstrap.com/theme/resume](https://startbootstrap.com/theme/resume){:target="_blank"}

![Start Bootstrap - Resume 테마 스크린샷](https://assets.startbootstrap.com/img/screenshots/themes/resume.png)

**Start Bootstrap - Resume** 테마의 폴더 구조는 다음과 같다.

```bash
┌─ assets
│  └─ img
│  │  ├─ favicon.ico
│  │  └─ profile.jpg
├─ css
│  └─ styles.css
├─ js
│  └─ scripts.js
└─ index.html
```

**Start Bootstrap - Resume** 테마는 한 페이지로 사이트를 구성하는 테마로 `scripts.js` 파일로 기능을 구현했다. 하지만 나는 이 기능이 필요가 없으므로 Jekyll 루트 폴더에서 `assets` 폴더에 다운 받은 테마의 css 파일만 옮겨 놓았다.

`index.html` 파일은 레이아웃을 만드는 과정에서 필요한 부분의 코드만 가져와 사용할 것이다.

```bash
.
├── assets
│  ├── css
│  │  └── styles.css
...
```
