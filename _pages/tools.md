---
layout: archive
title: 도구
permalink: /tools/
excerpt: ""
toc: false
last_modified_at: 2025-12-02 16:20
tools:
  - title: "Youtube 화면해설 생성하기"
    url: /tools/ytb-commentary/
---

<nav class="tools">
<ul>
{%- for tool in page.tools %}
	<li><a href="{{ tool.url | relative_url }}" class="btn btn--warning btn--block text-left">{{ tool.title }}</a></li>
{%- endfor %}
</ul>
</nav>