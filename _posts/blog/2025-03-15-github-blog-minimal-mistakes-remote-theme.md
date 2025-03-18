---
title: "Minimal Mistakes 원격 테마 커스터마이징"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Theme
  - Minimal Mistakes
date: 2025-03-15 19:43
# last_modified_at: 
---

이 글은 내가 나중에 보기 위해 정리하는 글이다.

내가 원격 테마를 적용하는데 아래 글을 참고했다.

* [깃허브(GitHub) 원격 테마 적용하는 방법 - 📁Temp](https://x2info.github.io/minimal-mistakes/%EC%9B%90%EA%B2%A9_%ED%85%8C%EB%A7%88_%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0/){: target="_blank"}
* [카테고리(category) 만들기 - 📁Temp](https://x2info.github.io/minimal-mistakes/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EB%A7%8C%EB%93%A4%EA%B8%B0/#google_vignette){: target="_blank"}
* [Github Blog Jekyll minimal mistakes - 공유의 가치를 추구하는 개발자](https://velog.io/@eona1301/Github-Blog-Jekyll-minimal-mistakes){: target="_blank"}


## 원격 테마란?

원격 테마는 원격으로 테마를 가져와 사용하는 것이다. 장점으로는 내 리파지토리에 기본적인 파일만 있어도 되며 테마가 업데이트때마다 쉽게 업그레이드할 수 있다는 것이다.

하지만 단점으로는 SCSS를 수정할 수 없으며 Github를 기반으로 개발환경을 구축해야 한다는 것이다.

## 개발환경 구축하기

**Minimal Mistakes** 테마를 **원격 테마**로 사용할 것이다. 원격테마는 Github로 커밋을 해야 확인이 가능하다. 따라서 조금난 수정을 해도 이걸 확인하려면 매번 커밋을 해줘야 하니 불편하다.

그레서 로컬 개발한경에서 **Minimal Mistakes** 테마를 수정한 뒤 원격테마로 가져와야 한다. 즉 두개의 폴더를 생성해서 하나는 개발중인 버전이고 또 하나는 Github에 업로드할 버전으로 만들어야 한다.

그리고 로컬 개발환경을 구축하는 방법은 인터넷에서 검색해 보기 바란다.

우선 [Minimal Mistakes Jekyll theme](https://github.com/mmistakes/minimal-mistakes){: target="_blank"}로 접속한 뒤 소스 코드를 다운 받아 준다.

다운받은 테마에서 기본적으로 필요한 파일은 다음과 같다.

* `Gemfile`
* `_config.yml`
* `index.html`

일단 이 3개의 파일만 있어도 된다. 원격테마를 사용하기 때문에 필요한 파일들은 **Minimal Mistakes** 테마의 리파지토리에서 가져와 사용하게 된다.

> **Note**  
> 처음 테마를 모두 적용한 뒤 `bundle install` 명령으로 **gem 라이브러리**를 설치해 줘야 한다. 하지만 실행해 보면 `Gemfile` 파일에서 오류가 발생할 수 있다. 그건 필요한 라이브러리를 선언해 주지 않았거나 라이브러리가 설치되어 있지 않아서 발생하는 오류일 가능성이 높다. 따라서 오류를 보고 `Gemfile` 파일에 필요한 라이브러리를 추가하고 설치해주면 정상적으로 실행될 것이다.  
> 처음에는 원격 테마를 이용하니 로컬 환경에서 코드를 작성하고 Github로 업로드하는 방식으로 개발하다가 이 방식으로는 안 되겠다 싶어서 로컬 환경을 구축하다 보니 로컬 환경에서 수정된 파일들을 Github에 업로드할 폴더에도 적용해줘야 하니 불편했다. 내 생각에는 애초에 개발을 모두 마친 뒤 Github에 업로드해줬으면 편했을 것 같다.
{: .notice--warning}

## Gemfile 만들기

원격 테마를 적용하기 위해 새로운 폴더를 생성하고, 아래와 같이 Gemfile 파일을 생성한다.

```
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

## _config.yml 만들기

다음으로 `_config.yml` 파일을 만들어야 한다. Minimal Mistakes 테마의 `_config.yml` 파일을 가져와 사용하면 된다.
 
`_config.yml` 파일은 아래 내용을 참고하여 값을 수정하면 된다.

```yml
theme                    : "minimal-mistakes-jekyll" # 테마
remote_theme             : "mmistakes/minimal-mistakes" # 원격 테마
# 로컬 환경에서는 theme을 활성화하고 Github에 업로드할 때는 remote_theme을 활성화 한다
minimal_mistakes_skin    : "default" # "default", "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise" 중 원하는 스킨 선택

# Site Settings
locale                   : "ko-KR" # 블로그의 주요 언어
title                    : "MyCoding" # 블로그 이름
name                     : "이름"
description              : >-
  블로그 설명
url                      : "https://계정.github.io" # 블로그 URL
baseurl                  : "" # 리파지토리 이름을 입력하는데 '계정.github.io'이면 생략한다
repository               : "mmistakes/minimal-mistakes" # GitHub username/repo-name
teaser                   : # path of fallback teaser image, e.g. "/assets/images/500x300.png"
logo                     : "/assets/images/88x88.png" # 로고 이미지 경로

# Site Author
author:
  name             : "" # 사용자 이름
  avatar           : # 프로필 이미지로 사이드바에 표시 됨
  bio              : "I am an **amazing** person." # 소개글을 간단히 적으면 됨
  location         : "South Korea" # 지역
  email            : # 본인의 이메일 주소
```

## 원격 테마 테스트

원격테마를 사용하는 경우 우선 생성한 파일을 **Github**의 리파지토리로 업로드한 뒤 `계정.github.io`로 접속해보면 된다. 하지만 아직 `index.html` 파일을 만들지 않았으므로 정상적으로 출력되지 않을 것이다.

그러면 `index.html` 파일을 아래 코드로 작성해 준다. **Minimal Mistakes** 테마의 `index.html` 파일을 그대로 가져와 사용해도 된다.

```yml
---
layout: home
author_profile: true
---
```

> **Note**
>
> 로컬 개발환경에서는 명령프롬프트를 실행하고 테마를 설치한 경로로 이동해서 아래 명령어를 실행하면 된다.
> ```bash
> bundle exec jekyll serve
> ```
> 만약 **webrick**과 관련된 에러가 발생한다면 아래의 명령어를 실행 후 다시 실행해주면 된다.
> ```bash
> bundle add webrick
> ```
> 브라우저에서 확인해보기 위해 `localhost:4000`으로 접속해보면 된다.

## 원격 테마 커스텀

원격테마의 경우 **SCSS**를 수정할 수 없기 때문에 `/assets/css/main.scss` 파일을 생성하고 아래와 같이 입력한다.

이제부터 커스텀할 SCSS 코드는 `main.scss`에 추가하면 된다.

```css
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}"; // skin
@import "minimal-mistakes"; // main partials
```

아래는 **오원석님의 깃허브 블로그**에서 원격 테마에 적용한 SCSS 코드이다.

```css
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

//
// 리모트 테마 또는 Gem 테마를 사용하는 경우
// 부분적으로 _sass 내의 파일을 수정할 수가 없다고 함.
// 때문에 /assets/css/main.scss 파일에서 재정의를 통해 수정을 하도록 함.
//

//
// Breakpoints 기준값 재정의 - 아래 import 이전에 정의해야 함.
//
// 기본 값이 데스크탑에서 large에서 x-large 이상 구간인 경우 폰트가 커지지만
// 양쪽 네비게이션 영역과 TOC 영역이 같이 넓어 지면서 상대적으로 표현할 수 있는
// 글 영역이 작아져서 효율적이지 못함을 느꼈습니다.
//
// 이에 이 영역을 포함한 전체 영역에 대한 조정을 실시했으며,
// 제가 가지고 있는 samsung z fold 3에서 외부 액정, 내부 액정, 내부 액정 회전시,
// 데스크탑에서 작을 때 부터 큰 사이즈 까지 모두 최적이라 생각되는 넓이에 맞춘 
// 개인적인 최적화된 값 입니다.
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_variables.scss
//   
$small: 576px;            // default 600px
$medium: 720px;           // default 768px
$medium-wide: $medium;    // default 900px
$large: 992px;            // default 1024px
$x-large: 1340px;         // default 1280px
$max-width: 1600px;       // default $x-large

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}"; // skin
@import "minimal-mistakes"; // main partials

//
// font 크기 재정의 - import 이후 정의해야 함.
//
// 위의 breakpoint와 함께 수정되었으며, large에서 글씨를 한 단계 올리지 않은 이유는
// nav, toc의 넓이가 변경되기 때문에 실제 컨텐츠 공간이 적어지는 부분을 고려했기 때문입니다.
// 데스크탑에서 x-large 이상일 경우 폰트를 올려 더 크게 표시되도록 하며 이는 기존 값보다
// 더 넓은 값을 사용하도록 합니다.
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_reset.scss
//
html {
  font-size: 16px;                    // Default 16px;

  @include breakpoint($medium) {
    font-size: 18px;                  // Default 18px;
  }

  @include breakpoint($large) {
    font-size: 18px;                  // Default 20px;
  }

  @include breakpoint($x-large) {
    font-size: 20px;                  // Default 22px;
  }

}


//
// link underline 제거
//
// 기본 링크에 underline이 가독성을 떨어트려 제거하였습니다.
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_basee.scss
//
a {
  text-decoration: none;                // 추가된 코드입니다.

  &:focus {
    @extend %tab-focus;
  }

  &:visited {
    color: $link-color-visited;
  }

  &:hover {
    color: $link-color-hover;
    outline: 0;
  }
}


//
// Grid Item 숫자를 4에서 3으로 조정
//
// collection layout등에서 사용하는 entries_layout: grid인 경우
// 표시되는 grid item의 개수가 4개로 설정되어 있는데 너무 작게 표시되는 것 같아
// 이를 3개로 표시되도록 수정하였습니다.
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_archive.scss
//
.grid__item {
  margin-bottom: 2em;

  @include breakpoint($small) {
    float: left;
    width: span(5 of 10);

    &:nth-child(2n + 1) {
      clear: both;
      margin-left: 0;
    }

    &:nth-child(2n + 2) {
      clear: none;
      margin-left: gutter(of 10);
    }
  }

  @include breakpoint($medium) {
    margin-left: 0; /* override margin*/
    margin-right: 0; /* override margin*/
    width: span(4 of 12);

    &:nth-child(2n + 1) {
      clear: none;
    }

    &:nth-child(3n + 1) {
      clear: both;
      margin-left: 0;
    }

    &:nth-child(3n + 2) {
      clear: none;
      margin-left: gutter(1 of 12);
    }

    &:nth-child(3n + 3) {
      clear: none;
      margin-left: gutter(1 of 12);
    }

  }

  //
  // page hero에서 호출하는 page meta 출력시 사용되는 글꼴의 크기를 키웠습니다.
  // 제가 추가로 작성한 _include/excerpt_hero.html 에서 표시되는 readtime등의 
  // meta 데이터 출력시 사용되는 값입니다.
  //
  // 이 값은 .grid__item 내에서 사용되는 값입니다.
  // 범용으로 선언 된 .page__meta와 별개 입니다.
  //
  // 원본위치: [remote-theme]/_sass/minimal-mistakes/_archive.scss
  //

  .page__meta {
    margin: 0 0 4px;
    font-size: 1em;         // default 0.6em
  }

  .page__meta-sep {
    display: block;

    &::before {
      display: none;
    }
  }

  .archive__item-title {
    margin-top: 0.5em;
    font-size: $type-size-5;
  }

  .archive__item-excerpt {
    display: none;

    @include breakpoint($medium) {
      display: block;
      font-size: $type-size-5;
    }
  }

  .archive__item-teaser {
    @include breakpoint($small) {
      max-height: 200px;
    }

    @include breakpoint($medium) {
      max-height: 200px;
    }
  }
}


//
// .notice 글자 크기 조정
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_notices.scss
//
@mixin notice($notice-color) {
  margin: 2em 0 !important;  /* override*/
  padding: 1em;
  color: $text-color;
  font-family: $global-font-family;
  font-size: $type-size-5 !important;     // default $type-size-6
  text-indent: initial; /* override*/
  background-color: mix($background-color, $notice-color, $notice-background-mix);
  border-radius: $border-radius;
  box-shadow: 0 1px 1px rgba($notice-color, 0.25);

  h4 {
    margin-top: 0 !important; /* override*/
    margin-bottom: 0.75em;
    line-height: inherit;
  }

  @at-root .page__content #{&} h4 {
    /* using at-root to override .page-content h4 font size*/
    margin-bottom: 0;
    font-size: 1em;
  }

  p {
    &:last-child {
      margin-bottom: 0 !important; /* override*/
    }
  }

  h4 + p {
    /* remove space above paragraphs that appear directly after notice headline*/
    margin-top: 0;
    padding-top: 0;
  }

  a {
    color: mix(#000, $notice-color, 10%);

    &:hover {
      color: mix(#000, $notice-color, 50%);
    }
  }

  code {
    background-color: mix($background-color, $notice-color, $code-notice-background-mix)
  }

	pre code {
		background-color: inherit;
	}

  ul {
    &:last-child {
      margin-bottom: 0; /* override*/
    }
  }
}

/* Default notice */

.notice {
  @include notice($light-gray);
}

/* Primary notice */

.notice--primary {
  @include notice($primary-color);
}

/* Info notice */

.notice--info {
  @include notice($info-color);
}

/* Warning notice */

.notice--warning {
  @include notice($warning-color);
}

/* Success notice */

.notice--success {
  @include notice($success-color);
}

/* Danger notice */

.notice--danger {
  @include notice($danger-color);
}

//
// archive list page meta 글자 크기 조정
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_archvie.scss
//

/*
   List view
   ========================================================================== */
  
.list__item {
  .page__meta {
    margin: 0 0 4px;
    font-size: 0.8em;         // default 0.6em
  }
}

.archive__item-excerpt {
  margin-top: 0;
  font-size: $type-size-5;

  & + p {
    text-indent: 0;
  }

  a {
    position: relative;
  }
}

//
// categories, tags, years 에서 사용하는 taxonomy index 글자 크기 조정
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_page.scss
//
.taxonomy__index {
  display: grid;
  grid-column-gap: 2em;
  grid-template-columns: repeat(2, 1fr);
  margin: 1.414em 0;
  padding: 0;
  font-size: 1em;                         // default 0.75em
  list-style: none;

  @include breakpoint($large) {
    grid-template-columns: repeat(3, 1fr);
  }

  a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.25em 0;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid $border-color;
  }
}

//
// page meta 글자 크기 조정
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_page.scss
//
.page__meta {
  margin-top: 2em;
  color: $muted-text-color;
  font-family: $sans-serif;
  font-size: $type-size-5;        // default $type-size-6

  p {
    margin: 0;
  }

  a {
    color: inherit;
  }
}

//
// table 글자 크기 조정
//
// 원본위치: [remote-theme]/_sass/minimal-mistakes/_tables.scss
//
table {
  display: block;
  margin-bottom: 1em;
  width: 100%;
  font-family: $global-font-family;
  font-size: $type-size-5;            // default $type-size-6
  border-collapse: collapse;
  overflow-x: auto;

  & + table {
    margin-top: 1em;
  }
}
```

* [오원석님의 깃허브 블로그에 적용한 main.scss](https://github.com/wonseoko/wonseoko.github.io/blob/main/assets/css/main.scss){: target="_blank"}

> **오원석님의 깃허브 블로그**에 적용한 `main.scss` 코드를 보는데 이게 어디가 어떻게 바뀌는 건지 알 수가 없었다. 그레서 블로그를 보면서 예쁘지 않은 부분을 수정해 나갔다.
> SCSS를 수정하면서 어려웠던 점이 브라우저에서 CSS 코드는 바로 확인할 수 있지만 SCSS 코드가 어떤 파일에 있는지 확인하기가 어려워 불편했다. SCSS 파일을 확인하려는 이유는 CSS 선택자의 우선 순위에 문제가 생기기 때문이다. 내가 SCSS를 수정해도 선택자의 우선 순위에서 밀리게 되면 적용되지 않기 때문이다.
{: .notice--warning}


내가 적용한 코드는 다음과 같다.

```css
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

// 기본 설정된 글자 크기가 커서 변경
$doc-font-size: 16px !default;

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}"; // skin
@import "minimal-mistakes"; // main partials

// 링크에 밑줄 제거
a {
	text-decoration: none !important;

	&:hover,
	&:focus,
	&:active {
		text-decoration: none !important;
	}
}

// 왼쪽 여백을 없에고 기울임꼴 제거
blockquote {
	margin-left: 0;
	font-style: normal;
}
// 코드 블럭에서 Tab 크기 설정
pre {
	tab-size: 4;
}

// 사이드바 카테고리 목록에서 링크에 hover 또는 focus 시 배경색 변경
// 카테고리 목록에 폴더 아이콘 추가
.sidebar .nav__list > ul > li {
	$nav-padding-inline: 0.5rem;
	$nav-active-color: #007bff;
	a {
		display: block;
		padding: 0.25rem $nav-padding-inline;

		&:hover, a:focus {
			color: #fff;
			background-color: $nav-active-color;
		}
		&.active {
			margin-inline-start: 0;
			padding-inline: $nav-padding-inline;
		}
	}
	.nav__sub-title::before {
		content: "📁";
		padding-right: 4px;
	}
	ul > li > a::before {
		content: "📂";
		padding-right: 4px;
	}
}

.entries-list {
  // 포스트 머리글에 `excerpt: ""`를 입력해서 포스트 발췌문이 출력되지 않게 하니 여백이 줄어서 여백 설정
	.list__item > article.archive__item > .archive__item-title {
		margin-top: 1em !important;
	}
	// 페이지 번호 네비게이션 여백 설정
	+ .pagination {
		margin-top: 0 !important;
		// padding-top: 0 !important;
	}
	// 카테그리 목록에서 제목과 여백 지정
	.archive > h1#page-title + & {
		margin-top: 2em;
	}
}

.archive__item {
	// 포스트 목록에서 포스트의 날짜 정보가 작아 글꼴 크기 변경
	> .page__meta {
		font-size: 0.75em;
	}
	// 검색 결과에서 포스트의 발췌문 숨기기(다른 곳은 margin-bottom이 없어져 이상하게 보임)
	#results > .list__item > & {
		margin-bottom: 1em;

		&-excerpt {
			display: none;
		}
	}
}

// single layout의 헤더에 테두리와 여백 지정
.page__header {
	border-bottom: 1px solid $gray;
	float: inline-start;
	width: 100%;
	margin-bottom: 2em;
}

.page__content {
	// 콘텐츠가 제목 태그로 시작하면 margin이 중복되는 문제로 margin-top을 0으로 설정
	aside + * {
		margin-top: 0;
	}

	// 링크 색상 지정
	aside a {
		color: inherit;
	}
	a {
		color: $behance-color;
	}

	// 해딩 태그, 코드 블럭의 여백을 p 태그와 같게 설정
	$mb: 1.3em;
	@for $i from 1 through 6 {
		h#{$i} {
			margin-bottom:  $mb;
		}
	}
	div.highlighter-rouge, figure.highlight {
		margin-bottom: $mb * 1.2;
	}

	// 인라인 코드 블럭
	code.highlighter-rouge {
		color: #0d6efd;
	}

	// 코드 라벨
	.codeblock-label {
		background-color: $light-gray;
		color: $darker-gray;
		display: inline-block;
		padding: 0.25rem 0.5rem;
		margin-bottom: 0 !important;
		border: {
			radius: $border-radius;
			bottom-left-radius: 0;
			bottom-right-radius: 0;
		}

		+ .highlighter-rouge {
			border-top-left-radius:  0;
		}
	}

	// .notice 클레스 적용 시 글자 크기가 작아 변경
	.notice {
		font-size: 1em !important;
	}
}

// 저작권 정보
.page__ccl {
	position: relative;
	float: inline-start;
	width: 100%;
	clear: both;
	padding-bottom: 1.5em;
	margin: {
		inline: 0;
		top: 2em;
		bottom: 0.5em;
	}
	border-bottom: 1px solid #cecfd1;

	p {
		margin-bottom: 1em;
	}
}
```
{: data-label="/assets/css/main.scss"}

**Minimal Mistakes** 테마의 SCSS를 수정하면서 본문 영역인 `article.page` 요소에 `float: inline-end;`가 적용되어 하위 요소에 다음 코드를 넣어줘야 했다.

```css
float: inline-start;
width: 100%;
clear: both;
```

## _page 설정하기

**Minimal Mistakes** 테마에서 `_config.yml` 파일을 가져와 사용했다면 `defaults`로 `_posts`만 추가되어 있을 것이다. `test/_config.yml` 파일을 보면 더 많은 설정이 있는 것을 확인할 수 있다. 우선 `_page`를 설정해 보자.

```yml
# Defaults
defaults:
  ...
  # _pages
- scope:
    path: ""
    type: pages
  values:
    layout: single
    author_profile: true
    read_time: false
    comments: false
    share: false
    related: false
```

* `author_profile`: 프로필 정보
* `read_time`: 읽기 소요 시간
* `comments`: 댓글 기능
* `share`: 공유 기능
* `related`: 관련글

위 옵션의 값이 `true`이면 표시되고, `false`이면 표시되지 않는다.

이제 `_pages` 폴더에 있는 마크다운 파일이 페이지로 표시된다.

## 사이드바에 카테고리 추가하기

### navigation.yml 수정하기

```yml
sidebar-category:
  - title: "카테고리"
    children:
      - title: "블로그"
        url: "/blog/"
      - title: "Python"
        url:  "/python/"
```

### Page 생성

`_pages` 홀더에 카테고리별 마크다운 파일을 생성하고 `category.html` 레이아웃을 이용할 것이다.

```markdown
---
title: "블로그"
layout: category
permalink: /blog/
taxonomy: blog
---
```
{: data-label="_pages/blog.md"}

### _config.yml 수정하기

```yml
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      show_date: true
      read_time: true
      comments: true
      share: true
      related: true
      toc: true
      toc_sticky: true
      creative_commons: true
      sidebar:
        nav: "sidebar-category"
```

### index.html 수정하기

```html
---
layout: archive
author_profile: true
sidebar:
  nav: "sidebar-category"
---
```

### nav_list 수정

카테고리 목록에 포스트 수를 표시하기 위해 `nav_list` 파일을 다음과 같이 수정한다.

{% raw %}
```liquid
<nav class="nav__list">
  {% if page.sidebar.title %}<h3 class="nav__title" style="padding-left: 0;">{{ page.sidebar.title }}</h3>{% endif %}
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label | default: "Toggle Menu" }}</label>
  <ul class="nav__items">
    {% for navname in include.nav %}
      {% assign navigation = site.data.navigation[navname] %}
      {% for nav in navigation %}
        <li>
          {% if nav.url %}
            <a href="{{ nav.url | relative_url }}"><span class="nav__sub-title">{{ nav.title }}</span></a>
          {% else %}
            <span class="nav__sub-title">{{ nav.title }}</span>
          {% endif %}

          {% if nav.children != null %}
          <ul>
            {% for child in nav.children %}
              {% comment %}<!-- category를 표시하는데 카테고리별 포스트 수를 표시하도록 수정 -->{% endcomment %}
              {% assign post_category = child.url | replace: "/", "" %}
              {% assign post_count = 0 %}
              {% for category in site.categories %}
                {% if category[0] == post_category %}
                  {% assign post_count = category[1].size %}
                {% endif %}
              {% endfor %}
              <li><a href="{{ child.url | relative_url }}"{% if child.url == page.url %} class="active"{% endif %}>{{ child.title }} ({{ post_count }})</a></li>
            {% endfor %}
          </ul>
          {% endif %}
        </li>
      {% endfor %}
    {% endfor %}
  </ul>
</nav>
```
{: data-label="_includes/nav_list"}
{% endraw %}

### SCSS로 카테고리 목록에 아이콘 추가하기

참고한 글에서는 카테고리 목록에 📁 또는 📂 아이콘이 표시되어 있는데 아이콘을 `navigation.yml`에 직접 입력해 만들었지만 나는 SCSS로 아이콘을 추가하겠다.

```scss
// 사이드바 카테고리 목록
.sidebar .nav__list > ul > li {
	.nav__sub-title::before {
		content: "📁";
		padding-right: 4px;
	}
	ul > li > a::before {
		content: "📂";
		padding-right: 4px;
	}
}
```
