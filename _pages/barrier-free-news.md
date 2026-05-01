---
title: "읽어주는 베리어프리 뉴스"
layout: archive
permalink: /tools/blind-news/
excerpt: ""
toc: false
last_modified_at: 2026-05-01 11:02
---

<p>
	<span id="bn_today"></span>
	<button id="bn_prev_btn" class="btn btn--primary btn--small" aria-label="이전 날짜">◀</button>
	<button id="bn_today_btn" class="btn btn--primary btn--small">오늘</button>
</p>
<p>
	<select id="bn_year" class="form-control" aria-label="연도"></select>
	<select id="bn_month" class="form-control" aria-label="월"></select>
	<select id="bn_day" class="form-control" aria-label="일"></select>
</p>
<button id="blind_news" class="btn btn--success btn--small">이동하기</button>

<script>
document.addEventListener('DOMContentLoaded', function () {
	blind_news_form();
});
</script>