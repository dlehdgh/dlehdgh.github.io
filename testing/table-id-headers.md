---
layout: single-docs
title: 표(table) - 복잡한 구조의 표(id, headers)
category: testing
---

```html
<table summary="웹접근성의 검사유형별 평가유형별 배점 결과 지표에 관한 표입니다." class="table table-bordered border-dark">
	<caption>웹접근성 평가 지표</caption>
	<thead>
		<tr>
			<th colspan="2" id="h1-1">검사유형</th>
			<th colspan="2" id="h1-2">평가유형</th>
			<th rowspan="2" id="h1-3">배점</th>
		</tr>
		<tr>
			<th id="h2-1">구분</th>
			<th id="h2-2">검사항목</th>
			<th id="h2-3">전문가 평가</th>
			<th id="h2-4">사용자 평가</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th rowspan="3" headers="h1-1 h2-1">필수항목</th>
			<td headers="h1-1 h2-2">대체텍스트</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">미준수</td>
			<td headers="h1-3">50점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">초점 이동</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">준수</td>
			<td headers="h1-3">98점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">누르기 동작 지원</td>
			<td headers="h1-2 h2-3">미준수</td>
			<td headers="h1-2 h2-4">미준수</td>
			<td headers="h1-3">20점</td>
		</tr>
		<tr>
			<th rowspan="2" headers="h1-1 h2-1">선택사항</th>
			<td headers="h1-1 h2-2">표준 폰트</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4"></td>
			<td headers="h1-3">89점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">명도대비</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">준수</td>
			<td headers="h1-3">95점</td>
		</tr>
	</tbody>
</table>
```

<table summary="웹접근성의 검사유형별 평가유형별 배점 결과 지표에 관한 표입니다." class="table table-bordered border-dark">
	<caption>웹접근성 평가 지표</caption>
	<thead>
		<tr>
			<th colspan="2" id="h1-1">검사유형</th>
			<th colspan="2" id="h1-2">평가유형</th>
			<th rowspan="2" id="h1-3">배점</th>
		</tr>
		<tr>
			<th id="h2-1">구분</th>
			<th id="h2-2">검사항목</th>
			<th id="h2-3">전문가 평가</th>
			<th id="h2-4">사용자 평가</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th rowspan="3" headers="h1-1 h2-1">필수항목</th>
			<td headers="h1-1 h2-2">대체텍스트</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">미준수</td>
			<td headers="h1-3">50점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">초점 이동</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">준수</td>
			<td headers="h1-3">98점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">누르기 동작 지원</td>
			<td headers="h1-2 h2-3">미준수</td>
			<td headers="h1-2 h2-4">미준수</td>
			<td headers="h1-3">20점</td>
		</tr>
		<tr>
			<th rowspan="2" headers="h1-1 h2-1">선택사항</th>
			<td headers="h1-1 h2-2">표준 폰트</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4"></td>
			<td headers="h1-3">89점</td>
		</tr>
		<tr>
			<td headers="h1-1 h2-2">명도대비</td>
			<td headers="h1-2 h2-3">준수</td>
			<td headers="h1-2 h2-4">준수</td>
			<td headers="h1-3">95점</td>
		</tr>
	</tbody>
</table>
