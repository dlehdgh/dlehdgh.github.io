---
layout: single-docs
title: figure와 표
excerpt: ""
category: testing
date: 2018-05-05 20:09
---

figure 요소 안에 표가 있는 경우 스크린리더가 어떻게 읽어주는지 테스트하기 위한 페이지입니다.

```html
<figure>
	<figcaption>공지사항 목록이 번호, 제목, 등록일로 구성된 표입니다.</figcaption>
	<table class="table table-bordered border-dark">
		<tr>
			<th>번호</th>
			<th>제목</th>
			<th>등록일</th>
		</tr>
		<tr>
			<td>1</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cupiditate commodi voluptates maiores fuga perspiciatis optio obcaecati voluptate earum, deleniti aliquam ratione sed pariatur illum dolorum, vero laborum enim? Nihil!</td>
			<td>2016-10-10</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nemo ad quaerat, aliquid, deserunt blanditiis perferendis praesentium, sint inventore fugiat labore deleniti rem cupiditate sunt? Ipsa esse quia sit atque!</td>
			<td>2016-10-10</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni autem earum molestiae vel? Itaque officiis eius iure, similique in obcaecati, nobis ipsa atque odio reiciendis beatae, distinctio magni saepe modi?</td>
			<td>2016-10-10</td>
		</tr>
	</table>
</figure>
```

<figure>
	<figcaption>공지사항 목록이 번호, 제목, 등록일로 구성된 표입니다.</figcaption>
	<table class="table table-bordered border-dark">
		<tr>
			<th>번호</th>
			<th>제목</th>
			<th>등록일</th>
		</tr>
		<tr>
			<td>1</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cupiditate commodi voluptates maiores fuga perspiciatis optio obcaecati voluptate earum, deleniti aliquam ratione sed pariatur illum dolorum, vero laborum enim? Nihil!</td>
			<td>2016-10-10</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nemo ad quaerat, aliquid, deserunt blanditiis perferendis praesentium, sint inventore fugiat labore deleniti rem cupiditate sunt? Ipsa esse quia sit atque!</td>
			<td>2016-10-10</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni autem earum molestiae vel? Itaque officiis eius iure, similique in obcaecati, nobis ipsa atque odio reiciendis beatae, distinctio magni saepe modi?</td>
			<td>2016-10-10</td>
		</tr>
	</table>
</figure>
