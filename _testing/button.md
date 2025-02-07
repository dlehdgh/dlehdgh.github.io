---
title: 폼(form) - 버튼과 이미지 버튼
excerpt: ""
date: 2018-04-29 22:17:10
---

{%- assign img_apple = "/assets/image/apple.png" | relative_url -%}

### Input Button

```html
<input type="button">
<input type="button" value="전송">
```
{: data-preview="true"}

### Button Tag

```html
<button type="button"></button>
<button type="button">전송</button>
```
{: data-preview="true"}

### Input Image Button

```html
<input type="image" src="{{ img_apple }}">
<input type="image" src="{{ img_apple }}" alt="전송">
```
{: data-preview="true"}

### Image Button

```html
<button type="button">
	<img src="{{ img_apple }}">
</button>
<button type="button">
	<img src="test.png" alt="전송">
</button>
```
{: data-preview="true"}

### Icon Button

```html
<button type="button">
	<i class="fas fa-star"></i>
</button>
```
{: data-preview="true"}
