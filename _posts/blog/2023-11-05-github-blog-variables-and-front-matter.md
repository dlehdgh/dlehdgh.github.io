---
title: "Github 블로그 - 4. 변수와 머리말"
excerpt: ""
categories: [blog]
tags: [Github, Blog, Jekyll]
date: 2023-11-05 14:54
---

### 변수

Jekyll은 `_config.yml`의 설정 값과 파일의 머리말 등의 정보를 변수로 제공한다.

#### 전역 변수

* `site` : 사이트의 정보로 `_config.yml`의 환경설정 정보를 가지고 있다.
* `page` : 페이지 관련 정보로 페이지의 **머리말**에 설정한 변수를 가지고 있다.
* `content` : 레이아웃 파일에서 사용되는데 레이아웃을 사용하는 파일의 콘텐츠가 나올 부분을 의미한다.
* `paginator` : 페이지 나누기 시 사용되는 변수로 자세한 내용은 페이지 나누기에서 설명하겠다.

#### 사이트 변수

* `_config.yml`에 설정한 정보를 가져와 사용할 수 있다. 예를 들어 `title`, `description`을 설정한 경우 `site.title`, `site.description`을 입력하면 지정한 값을 가져올 수 있다.
* `site.pages` : 모든 페이지 목록
* `site.posts` : 모든 포스트 목록
* `site.categories` : 모든 카테고리 목록으로 포스트의 머리말에 입력한 모든 카테고리와 해당 카테고리가 입력된 포스트 목록을 가진다.
* `site.tags` : 카테고리와 마찬가지로 모든 태그의 목록이다.
* `site.collections` : 모든 콜렉션 목록.
* `site.related_posts` : 현재 포스트의 연관 포스트로 최대 10개의 목록을 갖는다.
* `site.data` : `_data` 폴더에 있는 YAML 파일에서 읽어들인 데이터 목록.

#### 페이지 변수

* `page.content` : 페이지의 컨텐츠.
* `page.title` : 페이지의 제목으로 페이지의 머리말에 입력한 `title` 값을 가져온다.
* `page.excerpt` : 문서의 발췌 부분이다.
* `page.url` : 포스트 URL. 예시, `/2008/12/14/my-post/`
* `page.date` : 포스트에 할당된 날짜. 머리말에 입력한 날짜를 가져온다. 예시, 2008-12-14 10:30:00 +0900
* `page.categories` : 포스트가 속한 카테고리들의 목록.
* `page.tags` : 포스트의 태그 목록.
* `page.path` : 페이지 또는 포스트의 실제 경로.
* `page.next` : 현재 포스트를 기준으로 다음 포스트의 상대 경로. 마지막 항목이라면 nil 을 반환한다.
* `page.previous` : 현재 포스트를 기준으로 이전 포스트의 상대 경로. 첫 번째 항목이라면 nil 을 반환한다.

위에서 설명한 변수 이외에도 페이지의 머리말에 설정해 두었다면 가져와 사용할 수 있다. 예를 들어 머리말에 `description: 설명글`를 입력해 두었다면 `page.discription`으로 지정한 값을 가져올 수 있다.

지금까지 설명한 변수는 자주 사용되는 것들을 소개했다. 더 자세한 내용은 [여기](https://jekyllrb-ko.github.io/docs/variables/){:target="_blank"}를 참고하면 된다.

### 머리말

Jekyll은 YAML 머리말 블록을 가진 모든 파일을 특별한 파일로 인식하여 처리한다.

{% raw %}
```liquid
---
layout: post
title: Welcom
---
```
{: data-label="example"}
{% endraw %}

머리말에는 사전 정의된 변수도 사용할 수 있고, 자신만의 고유 변수를 정의하는 것도 가능하다.

> **머리말의 변수는 필수가 아니다**   
> 만약 Liquid 구문은 사용하고 싶은데 머리말에는 넣을만한 내용이 없다면, 그냥 비워두어도 된다.

#### 변수

페이지와 포스트에서 공통적으로 사용되는 변수는 다음과 같다.

* `layout` : `_layout` 폴더에 있는 레이아웃을 지정한다. 레이아웃을 사용하지 않을 경우 `null`을 입력하면 된다. 예시, `layout: default`
* `permalink` : 접속 URL을 지정한다. 페이지에서 많이 사용된다.

포스트에서 사용되는 변수

* `date` : 포스트의 날짜를 지정한다. 포스트를 날짜 순으로 정렬하는데 사용된다. 날짜의 기본형식은 `YYYY-MM-DD HH:MM:SS +/-TTTT`이지만 원하는 형식으로 지정이 가능하다. 예를 들어 `YYYY-MM-DD`로 지정해도 된다.
* `category`, `categories` : 포스트의 카테고리를 지정한다.
* `tags` : 포스트의 태그를 지정한다.

{% raw %}
```liquid
---
layout: posts
title: "Github 블로그 만들기"
date: 2023-11-05
category: "blog"
tags: [Github, Blog]
---
```
{: data-label="예제 1"}

```liquid
---
layout: posts
title: "Github 블로그 만들기"
date: 2023-11-05
categories: [blog]
tags: [Github, Blog]
---
```
{: data-label="예제 2"}

```liquid
---
layout: posts
title: "Github 블로그 만들기"
date: 2023-11-05
categories:
  - blog
tags:
  - Github
  - Blog
---
```
{: data-label="예제 3"}
{% endraw %}

> 나는 **예제 3**의 방식으로는 써보지 않았지만 Github에 올라온 Jekyll 테마들을 보면 **예제 3**과 같은 형식을 사용했다. 자신이 사용하기 편한 방식으로 사용하면 된다.
