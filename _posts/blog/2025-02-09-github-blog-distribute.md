---
title: "Github 블로그 - 17. Github Pages로 배포하기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Pages
date: 2025-02-09 10:21
last_modified_at: 2025-03-08 17:46
---

지금까지는 개발환경에서 Jekyll 블로그를 만들었다면 이제 Github에 블로그를 업로드해야 한다.

## Github Repository 생성하기

Github로 로그인한 뒤 **Open user navigation menu**를 클릭해서 **Your repositories**로 이동한다.

**New** 링크를 누르면 Repository를 생성하는 창이 뜨게 된다.

먼저 **Repository name**에 `계정.github.io`를 입력해주면 되는데 예를 들어 내 계정이 **abcd**라면 `abcd.github.io`가 된다.

**Visibility**를 **Public**으로 선택해주면 된다. **Private**로 하고 싶은 분들이 있을 수 있는데 저는 한 번도 사용해 본 적은 없으며 전에는 유료로 제공했으나 현제는 모두 사용할 수 있다고 한다.

이렇게 이름, 설명, Readme 포함 여부 체크를 했다면 맨 하단의 **Create repository** 버튼을 눌러주면 Repository가 생성된다.  생성될 때까지 조금 시간이 걸릴 수 있으니 참고하세요.

> **Note**  
> 추가적인 정보로 `계정.github.io`로 넣으면 하위 경로 없이 루트 주소가 되는데 이건 계정 당 하나만 사용이 가능하다.   
> 만약 이미 루트 주소를 사용중이라면 원하는 이름을 입력하면 된다. 예를 들어 `home`으로 입력했다면 `계정.github.io/home/`가 된다.
{: .notice--warning}

## Jekyll 블로그 깃허브 배포용 설정하기

Jekyll 블로그를 Github에 배포하기에 앞서 몇 가지 설정을 해줘야 합니다. Jekyll 버전을 Github 블로그용 버전과 URL을 맞춰 주는 작업인데요.

[여기](https://pages.github.com/versions/)로 들어가면 Github 페이지에서 지원하는 Jekyll 버전 정보와 각종 Jekyll 플러그인 버전 정보가 나와있습니다. 여기서 우리가 유심히 봐야 될 부분은 **Github 페이지의 버전 정보**입니다.

이걸 확인했다면 우리가 만든 블로그 폴더 내부의 **Gemfile**을 열어 줍니다.

여기서 `gem "jekyll", 버전`이라고 된 부분을 주석으로 처리해 주고, `# gem "github-pages", group: :jekyll_plugins` 코드의 주석을 제거하고 `gem "github-pages", "~> GitHub Pages Version" group: :jekyll_plugins`로 바꾸어 줍니다.

**변경 전 코드**

```
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.4.1"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins
# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end
```

**변경 후 코드**

```
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "~> 4.4.1"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", "~> 232" group: :jekyll_plugins
# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end
```

다음으로 `_config.yml` 파일에서 `title : Your awesome title`라고 돼있는 부분은 블로그 이름을 입력하는 부분이고, `baseurl`은 `/Repository명/`로 바꿔주면 되는데 나는 블로그용 Repository를 사용할 것이므로 `baseurl: ""`로 입력하면 된다. 그리고 `url`을 `https://계정.github.io`로 변경해 주면 됩니다.

이제 Jekyll 블로그를 Github에 올릴 준비가 되었습니다.

## GitHub 페이지에 Jekyll 블로그 올리기

이제 GitHub 페이지에 Jekyll 블로그를 올려 주는 일만 남았습니다. Jekyll 블로그 파일에서 `_site`와 `.jekyll-cache` 폴더를 제외한 모든 파일을 올려 줍니다.

만약 테마를 적용한 경우 테마마다 다르지만 추가적으로 제거해줘야 하는데 예를 들어 **Minimal Mistakes** 테마를 적용한 경우 불필요한 파일은 다음과 같다.

* `.editorconfig`
* `.gitattributes`
* `.github`
* `/docs`
* `/test`
* `CHANGELOG.md`
* `minimal-mistakes-jekyll.gemspec`
* `README.md`
* `screenshot-layouts.png`
* `screenshot.png`

마지막으로 **Settings 탭**으로 이동해서 **Pages**를 클릭한 뒤 Branch에 None이라고 되어있는 걸 **main**으로 바꿔 주면 된다. 변경된 것을 확인한 뒤 Save 버튼을 눌러 줍니다.

그리고 GitHub 블로그의 경우 반영되는데 시간이 좀 걸리기 때문에 기다려줘야 합니다.

적용이 완료되었다면 이제 블로그를 포스팅하면 됩니다.

## Github Jekyll 번들 업데이트

내가 Jekyll 블로그를 Github에 업로드한 후 한 참 시간이 지나서의 일이다. 갑자기 Github에서 **builds 오류**가 발생했다는 메일이 온 것이다.

처음에는 갑자기 무슨 일인지 당황스러웠는데 알아보니 우리가 윈도우를 업데이트해주는 것처럼 Jekyll도 업데이트를 해줘야 한다. 이제 그 방법을 설명하겠다.

**Github**의 **Repository**에서 상단의 **Security**에 보면 builds 오류가 발생할 경우 개발환경에서 번들 업데이트를 진행해줘야 한다.

내 경우 **구름IDE**에서 개발했으므로 구름IDE에서 아래 명령어를 실행해주면 된다.

```bash
bundle update
bundle update github-pages
```

위 명령어를 실행하면 `Gemfile`과 `Gemfile.lock` 파일이 수정되었을 것이다. 이제 이 파일들을 Github에 커밋해주면 된다.

* 참고: [Github 블로그 jekyll 버전 업데이트 방법 - DS Tech Blog](https://tech.dslab.kr/2020-05-28-sec-vulnerability-jekyll-version/){:target="_blank"}
