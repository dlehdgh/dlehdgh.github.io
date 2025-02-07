---
layout: single-docs
title: 프레임
category: testing
---

**frameset.html**

```html
<frameset rows="1*" cols="50%, 50%">
	<frame name="LeftFrame" src="left.html" title="사이드바 영역">
	<frame name="RightFrame" src="right.html" title="본문 영역">
	<noframes>
		<body>
			<h1>프레임 지원 오류</h1>
			<p>이 페이지를 보려면, 프레임을 볼 수 있는 브라우저가 필요합니다.</p>
		</body>
	</noframes>
</frameset>
```

[프레임 보기](./frameset.html){:class="btn btn-primary" target="_blank"}
