---
title: "Github 블로그 - 2. Liquid 문법"
excerpt: ""
categories: [blog]
tags: [Github, Blog, Jekyll, Liquid]
date: 2023-11-02 15:36
---

Liquid는 Object, Tag, Filter 이렇게 3개의 카테고리로 분류 할 수 있다.

### Object

Liquid는 Object로 컨텐츠에 접근할 수 있다.

```liquid
{% raw %}{{ page.title }}{% endraw %}
{{ page.title }}
```
{: data-label="example"}

### Tag

#### Escape

코드를 그대로 보여주고 싶을 때는 다음과 같이 입력한다.

```liquid
{%- assign temp = "{%" -%}
{{ temp }} raw %}
{%- raw -%}
{{ page.title }}
{% endraw %}
{{ temp }} endraw %}
```

#### 변수

변수를 선언하고 싶을 때는 `assign 변수명 = 값`을 입력하면 된다.

{% raw %}
```liquid
{% assign name = "홍길동" %}
{{ name }}님
```
{: data-label="Input"}
{% endraw %}

```
{% assign name = "홍길동" -%}
{{ name }}님
```
{: data-label="Output"}



#### 주석

{% raw %}
코드를 `{% comment %}`와 `{% endcomment %}`로 감싸주면 주석으로 처리가 된다.
{% endraw %}

{% raw %}
```liquid
{% comment %}
주석 내용
{% endcomment %}
```
{% endraw %}

#### 조건문

##### if/elsif/else

`if`는 조건이 참이면 실행되고 조건이 거짓이면 실행되지 않는다. 조건이 두 가지 이상일 때 `if`와 `elsif`를 사용해 조건에 따라 다른 결과를 보여줄 수 있다.

`else`는 `if`와 `elsif`가 모두 거짓일 때 실행된다.

{% raw %}
```liquid
{% if page.title == "test" %}
	Test 페이지입니다.
{% elsif page.title == "about" %}
	About 페이지입니다.
{% else %}
	기본 페이지입니다.
{% endif %}
```
{% endraw %}

##### case/when

`case`로 어떤 변수의 값을 비교할 것인지 지정하고 `when`으로 값을 지정해 참이면 실행된다.

`else`는 if문과 마찬가지로 어떤 조건도 참이 아닐 때 실행된다.

{% raw %}
```liquid
{% case page.title %}
	{% when "test" %}
		Test 페이지입니다.
	{% when "about" %}
		About 페이지입니다.
	{% else %}
		기본 페이지입니다.
{% endcase %}
```
{% endraw %}

#### 반복문(for)

for 반복문은 `for 변수 in 범위`{: .text-warning}와 같이 사용하면 되는데 여기서 변수는 범위의 각 항목의 값을 갖게 된다.

{% raw %}
```liquid
{% for i in (1..5) %}
	{{ i }}
{% endfor %}

{% for i in (1..5) limit: 3 %}
	{{ i }}
{% endfor %}
```
{: data-label="Input"}
{% endraw %}

```
{% for i in (1..5) -%}
	{{ i }}
{%- endfor %}
{% for i in (1..5) limit: 3 -%}
	{{ i }}
{%- endfor %}
```
{: data-label="Output"}

위 for 반복문에서 `limit`는 반복 횟수를 제한한다.

for 반복문에서 현제 `index`를 알고 싶다면 `forloop.index`를 사용하면 된다. 또 for 반복문의 마지막인지 확인하고 싶을 때는 `forloop.last`를 사용하면 된다.

### Filter

Liquid 에서는 데이터를 가공하기 위한 여러가지 Filter를 제공한다.

|필터|설명|
|---|----|
|`relative_url`|입력값 앞에 `baseurl` 값을 추가한다. 사이트가 최상위 경로가 아닌 하위 경로에서 호스팅 될 경우 유용하다.
|`absolute_url`|입력값 앞에 url 과 baseurl 값을 추가한다.|
|`date_to_xmlschema`|날짜를 XML 스키마(ISO 8601) 형식으로 변환한다.|
|`date_to_string`|날짜를 짧은 형식으로 변환한다.|
|`where`|배열 안에서 특정 키와 값을 가진 객체들을 선택한다.|
|`where_exp`|배열 안에서 표현식이 참인 객체들을 선택한다.<br>{% raw %}`{{ site.pages | where_exp: "item", "item.category == 'test'" }}`{: .text-warning}{% endraw %}|
|`escape`|문자열을 이스케이프 한다. 일부 특수문자를 엔티티 코드로 변환한다.|
|`markdownify`|마크다운 형식 문자열을 HTML 로 변환한다.|
|`sort`|배열을 정렬한다. 해시를 위한 추가 전달인자 1. 프로퍼티 이름 2. nils 순서(first, last).|
|`inspect`|디버깅을 위해 객체를 문자열로 표시한다.|
{: .table.table-secondary.table-bordered}

내가 자주 사용했던 Filter에 대해 설명했다. Filter에 대한 더 자세한 내용은 **마치며**에 있는 링크들을 참고한다.

### 공백 제어

{% raw %}
Liquid를 사용하다 보면 태그의 앞뒤에 공백이 생기게 되는데 `-`를 붙이면 공백이 제거된다. 예를 들어 `{%-`와 `{{-`는 앞쪽 공백을 제거하고, `-%}`와 `-}}`는 뒤쪽 공백을 제거한다.
{% endraw %}

{% raw %}
```liquid
{% assign first_page = 1 %}
{% assign last_page = 5 %}
<ul class="pagination">
	{% for i in (first_page..last_page) %}
		<li>{{ i }}</li>
	{% endfor %}
</ul>
{% assign first_page = 1 -%}
{% assign last_page = 5 -%}
<ul class="pagination">
	{% for i in (first_page..last_page) -%}
		<li>{{ i }}</li>
	{% endfor -%}
</ul>
```
{: data-label="Input"}
{% endraw %}

```html
{% assign first_page = 1 %}
{% assign last_page = 5 %}
<ul class="pagination">
	{% for i in (first_page..last_page) %}
		<li>{{ i }}</li>
	{% endfor %}
</ul>
{% assign first_page = 1 -%}
{% assign last_page = 5 -%}
<ul class="pagination">
	{% for i in (first_page..last_page) -%}
		<li>{{ i }}</li>
	{% endfor -%}
</ul>
```
{: data-label="Output"}

### 배열

Liquid 문법에서는 자바스크립트와 같이 배열을 선언하는 구문이 없는 걸로 알고 있다. 하지만 `split` 필터를 사용하면 문자열을 지정한 문자로 나누어 배열로 만드는 것이다.

{% raw %}
```liquid
{% assign args = "" | split: "," %}
{% assign args2 = "사과,배,바나나" | split: "," %}
{{ args | jsonify }}
{{ args2 | jsonify }}
```
{: data-label="Input"}
{% endraw %}

```liquid
{% assign args = "" | split: "," -%}
{% assign args2 = "사과,배,바나나" | split: "," -%}
{{ args | jsonify }}
{{ args2 | jsonify }}
```
{: data-label="Output"}

#### 배열 요소 추가

`push`를 사용해 배열에 요소를 추가하고 변수에 다시 할당을 해야 한다. 요소를 추가해도 변수에 저장되지 않기 때문이다.

{% raw %}
```liquid
{% assign array_name = "사과,바나나" | split: "," %}
{% assign array_name = array_name | push: "귤" %}
```
{: data-label="Input"}
{% endraw %

```liquid
{% assign array_name = "사과,바나나" | split: "," %}
{{ array_name }}
{% assign array_name = array_name | push: "귤" %}
{{ array_name }}
```
{: data-label="Output"}

### 조각파일

동일한 내용을 여러 파일에서 사용할 때 반복되는 부분을 `_include` 폴더에 `.html` 파일로 저장한 뒤 호출해서 사용할 수 있다.

{% raw %}
```liquid
{% include footer.html %}
```
{: data-label="example"}
{% endraw %}

조각파일에 파라미터를 전달해 사용할 수도 있다. 예를 들어 이미지를 삽입할 코드가 복잡할 경우 다음과 같이 사용할 수 있다.

{% raw %}
```liquid
<figure>
	<img src="{{ include.url | prepend: site.image_path | relative_url }}" alt="{{ include.alt }}">
	{% if include.description -%}
		<figcaption>{{ include.description }}</figcaption>
	{% endif -%}
</figure>
```
{: data-label="_include/figure.html"}
{% endraw %}

{% raw %}
```liquid
{% include figure.html url='apple.png' alt='사과' %}
```
{% endraw %}

조각파일의 파라미터로 문자열이 아닌 변수를 전달하고자 할 때는 `capture`를 사용해서 변수를 생성해야 한다.

{% raw %}
```liquid
{% capture download_note %}
이제 최신 버전의 {{ site.product_name }}을 사용할 수 있습니다.
{% endcapture %}
```
{% endraw %}

### 마치며

지금까지 Liquid 문법에 대해 알아 보았는데 Liquid 문법에 대한 자세한 내용은 다음 링크를 참고한다.

* [https://jekyllrb.com/docs/liquid/](https://jekyllrb.com/docs/liquid/){:target="_blank"}
* [https://jekyllrb-ko.github.io/docs/liquid/](https://jekyllrb-ko.github.io/docs/liquid/){:target="_blank"} - 한국어 번역본
* [https://shopify.github.io/liquid/](https://shopify.github.io/liquid/){:target="_blank"}
* [https://selosele.github.io/liquid/](https://selosele.github.io/liquid/){:target="_blank"} - 한국어 번역본
