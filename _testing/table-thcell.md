---
title: 표(table) - 복잡한 구조의 표(th)
excerpt: ""
date: 2018-05-04 22:15
---

```html
<table summary="웹접근성의 검사유형별 평가유형별 배점 결과 지표에 관한 표입니다." class="table table-bordered border-dark">
	<caption>웹접근성 평가 지표</caption>
	<thead>
		<tr>
			<th colspan="2">검사유형</th>
			<th colspan="2">평가유형</th>
			<th rowspan="2">배점</th>
		</tr>
		<tr>
			<th>구분</th>
			<th>검사항목</th>
			<th>전문가 평가</th>
			<th>사용자 평가</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th rowspan="3">필수항목</th>
			<td>대체텍스트</td>
			<td>준수</td>
			<td>미준수</td>
			<td>50점</td>
		</tr>
		<tr>
			<td>초점 이동</td>
			<td>준수</td>
			<td>준수</td>
			<td>98점</td>
		</tr>
		<tr>
			<td>누르기 동작 지원</td>
			<td>미준수</td>
			<td>미준수</td>
			<td>20점</td>
		</tr>
		<tr>
			<th rowspan="2">선택사항</th>
			<td>표준 폰트</td>
			<td>준수</td>
			<td></td>
			<td>89점</td>
		</tr>
		<tr>
			<td>명도대비</td>
			<td>준수</td>
			<td>준수</td>
			<td>95점</td>
		</tr>
	</tbody>
</table>
```

<table summary="웹접근성의 검사유형별 평가유형별 배점 결과 지표에 관한 표입니다." class="table table-bordered border-dark">
	<caption>웹접근성 평가 지표</caption>
	<thead>
		<tr>
			<th colspan="2">검사유형</th>
			<th colspan="2">평가유형</th>
			<th rowspan="2">배점</th>
		</tr>
		<tr>
			<th>구분</th>
			<th>검사항목</th>
			<th>전문가 평가</th>
			<th>사용자 평가</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th rowspan="3">필수항목</th>
			<td>대체텍스트</td>
			<td>준수</td>
			<td>미준수</td>
			<td>50점</td>
		</tr>
		<tr>
			<td>초점 이동</td>
			<td>준수</td>
			<td>준수</td>
			<td>98점</td>
		</tr>
		<tr>
			<td>누르기 동작 지원</td>
			<td>미준수</td>
			<td>미준수</td>
			<td>20점</td>
		</tr>
		<tr>
			<th rowspan="2">선택사항</th>
			<td>표준 폰트</td>
			<td>준수</td>
			<td></td>
			<td>89점</td>
		</tr>
		<tr>
			<td>명도대비</td>
			<td>준수</td>
			<td>준수</td>
			<td>95점</td>
		</tr>
	</tbody>
</table>
