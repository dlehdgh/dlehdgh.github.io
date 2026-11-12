---
title: "[테스트] Minimal Mistakes 원격 테마 커스터마이징"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Theme
  - Minimal Mistakes
date: 2026-11-11 12:43
---

그러면 `index.html` 파일을 아래 코드로 작성해 준다. **Minimal Mistakes** 테마의 `index.html` 파일을 그대로 가져와 사용해도 된다.

index.html
{: .codeblock-label}
{% source_code /index.html %}

이제부터 커스텀할 SCSS 코드는 `main.scss`에 추가하면 된다.

main.scss
{: .codeblock-label}
{% source_code /assets/css/main.scss %}
