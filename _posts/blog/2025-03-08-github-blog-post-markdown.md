---
title: "Github 블로그 - 19. 포스트 작성하기"
excerpt: ""
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Post
  - Markdown
  - 마크다운
date: 2025-03-08 19:20
# last_modified_at: 
---

이 글은 내가 나중에 보기 위해 정리하는 글이다.

이제 블로그에 포스트를 작성하면 되는데요. Github 블로그의 포스트는 마크다운 문법을 이용해 작성해야 합니다.

* 참고: [Markdown 문법 정리](https://velog.io/@woojinn8/Practice-Markdown-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC){: target="_blank"}

## 포스트 파일 만들기

우선 루트 경로에서 **_posts** 폴더를 생성한 뒤 마크다운 파일을 생성하면 됩니다.

하지만 파일을 생성할 때 규칙이 있는데 **년-월-일-파일명.md**로 구성되어 있어야 되요. 예를 들어 `2025-02-10-markdown.md`가 되는데 날짜는 포스트 작성날짜를 입력해주면 됩니다.

포스트 파일에는 다음과 같은 **머리글**을 추가해 주면 됩니다.

```markdown
---
title: "마크다운 문법"
categories: [blog]
tags:
  - Github
  - Blog
  - Jekyll
  - Markdown
toc: true
date: 2025-02-10 13:22
last-modified-at: 2025-02-20 15:24
---
```

* `title`: 포스트 제목
* `categories`: 포스트가 포함된 카테고리
* `tags`: 포스트의 태그
* `toc`: 목차를 표시할지 여부를 설정해요.
* `date`: 포스트 작성일
* `last-modified-at`: 포스트 수정일

카테고리와 태그 목록은 대괄호(`[]`) 안에 작성해도 되고 대시(`-`)를 붙여서 작성해 줘도 되니 참고하세요.

> 카테고리와 태그 목록에서 대시(`-`)로 입력할 때 들여쓰기를 공백으로 해야 한다. 탭키로 들여쓰기를 하면 오류가 발생하니 주의하자.
{: .notice--primary}

## 헤더

`h1` ~ `h6` 태그를 만들어 줍니다.

```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Header 1과 2는 `#` 외에도 `=`, `-` 기호도 사용 가능합니다.

Header 1
=
Header 2
--
```

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Header 1과 2는 `#` 외에도 `=`, `-` 기호도 사용 가능합니다.

Header 1
=
Header 2
--

## 글자 스타일

글자의 굵기, 기울임, 취소선을 변경할 수 있다.

```markdown
*기울임꼴*
_기울임꼴_
__굵게__
**굵게**
~~취소선~~
```

*기울임꼴*  
_기울임꼴_  
__굵게__  
**굵게**  
~~취소선~~  

## 문단 나누기

마크다운에서 줄바꿈을 하고 싶을 때 `<br>` 태그를 입력하거나 문장 끝에 두칸이상의 빈칸을 넣으면 된다.

```markdown
문장 1

문장 2<br>
문장 3(공백 2칸)  
문장 4
```

문장 1

문장 2<br>
문장 3(공백 2칸)  
문장 4

## 목록

순서가 있는 `ol` 태그로 작성하고 싶다면 `1.`과 같이 숫자와 점을 입력하면 되고, 순서가 없는 `ul` 태그로 작성하고 싶다면 `*`, `+`, `-` 기호를 줄 앞에 입력하면 된다.

```markdown
* 과일
	- 바나나
	- 사과
	- 딸기
* 야체
	+ 토마토

1. Chapter 1. 파이썬 시작하기
	1. Section 1. 파이썬 개발환경
	2. Section 2. 콘솔에 출력해보기
2. 부록
	* 부록 1  
	  연습장 만들기
	* 부록 2
```

* 과일
	- 바나나
	- 사과
	- 딸기
* 야체
	+ 토마토

1. Chapter 1. 파이썬 시작하기
	1. Section 1. 파이썬 개발환경
	2. Section 2. 콘솔에 출력해보기
2. 부록
	* 부록 1  
	* 부록 2

목록을 만들 때 같은 항목에서 다음줄에 내용을 입력하고 싶다면 줄 끝에 두 칸의 공백을 넣고 다음 줄 앞에 들여쓰기를 해주면 된다.

~~~markdown
1. 테스트1  
   테스트 완료
2. 테스트2  
  테스트 중
  ```python
  print('hello world')
  ```
~~~

1. 테스트1  
   테스트 완료
2. 테스트2  
  테스트 중
  ```python
  print('hello world')
  ```

> **Visual Studio Code**의 미리보기로 볼 때는 위 예시의 경우 코드 블럭이 목록 안에 표시되지 않고 더 들여쓰기를 해야 목록 안에 표시되는 문제가 있으니 참고하기 바란다.
{: .notice--primary}

## 수평선

수평선을 넣어 페이지 구분이 가능합니다.

```markdown
***
---
```

## 인용문

`>` 기호로 인용문을 만들 수 있다. 하지만 인용문 안에 코드 블럭을 넣을 수 없으니 참고하기 바란다.

```markdown
> blockquote 인용문
>> 인용문 내부에 사용 가능하다.
```

> blockquote 인용문
>> 인용문 내부에 사용 가능하다.

## 코드 블럭

한 줄의 인라인 코드는  **\`** 기호를 사용하여 작성하면 됩니다.

여러줄의 코드는 **\`**를 세번 입력한 뒤 언어를 입력하여 **문법 강조**가 가능하다.

지원하는 언어는 다음과 같다.

* Bash: bash
* C: c
* C++: cpp
* Java: java
* HTML, XML: html
* CSS: css
* JavaScript: js
* PHP: php
* Python: python
* Ruby: rb
* Ini: ini
* SQL: sql

더 자세한 내용은 [Markdown supported languages for syntax highlighting](https://github.com/jincheng9/markdown_supported_languages){: target="_blank"}를 참고하기 바란다.

~~~markdown
`print('hello world')`

```python
def sum(a, b):
	print(a + b)
```
~~~

`print('hello world')`

```python
def sum(a, b):
	print(a + b)
```

## 링크

링크는 `[텍스트](URL)`로 입력하면 되는데 텍스트와 URL이 같은 경우 `<URL>`로 입력하면 된다.

```markdown
[네이버](https://www.naver.com/)
<https://www.naver.com/>
<test@mail.com>
```

[네이버](https://www.naver.com/)  
<https://www.naver.com/>  
<test@mail.com>

## 이미지

```markdown
![사과]({{ '/assets/image/apple.png' | relative_url }})
```

![사과]({{ '/assets/image/apple.png' | relative_url }}){: width="100px"}

포스트에 이미지를 첨부할 경우 `assets/images` 폴더로 이미지 파일을 옮겨 놓고 경로를 입력해주면 된다.

그런데 이미지를 첨부할 때마다 이미지를 업로드해줘야 하니 여간 불편한게 아니다. 이럴 때는 Github의 **Issues**를 활용하면 된다.

* Github에서 Repository의 Issues로 들어가서 **New issue** 링크를 클릭한다.
* **Add a description**의 마크다운 편집창에 이미지 파일을 복사해 붙여 넣거나 드래그드롭으로 넣어 준다. 
* 이미지를 넣으면 이미지가 업로드 되면서 다음과 같은 주소가 생성된다.
  ```markdown
  ![Image](https://github.com/user-attachments/assets/deda80c3-a11b-457e-bb1c-1ee550fc0896)
  ```
* 그러면 생성된 이미지 코드를 복사한 뒤 내게 맞게 수정해서 마크다운 파일에 붙여넣으면 된다.

> **왜 이렇게 되나요?**:  
> issue에 이미지를 올리면 바로 Github 서버에 이미지가 업로드되기 때문에 이미지의 고유 링크가 생성되며 우리는 Github 서버를 사용하게 됩니다.  
> **issue를 발행하지 않아도 되나요?**:  
> 이미지를 issue에 붙여넣기 하는 순간 이미지 고유 링크가 생성되는 것이기 때문에 굳이 이슈를 발행하지 않아도 됩니다.
{: .notice--primary}

출처: [Github 블로그 image 삽입하기 - uzchu.log](https://velog.io/@uzchu/Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-image-%EC%82%BD%EC%9E%85%ED%95%98%EA%B8%B0){: target="_blank"}

## 표 삽입하기

버티컬 바(`|`) 기호로 셀을 구분하며 하이픈(`-`)과 콜론(`:`)을 이어붙여서 정렬을 한다. `:`이 왼쪽에 있으면 왼쪽 정렬이 되고, 오른쪽에 있으면 오른쪽 정렬이 되고, 양쪽에 있으면 가운데 정렬이 된다.

```markdown
| 제목 | 작성자 | 작성일 |
|:----|:----:|----:|
| 공지 1 | admin | 25-02-13 |
| 공지 2 | admin | 25-02-13 |
```

| 제목 | 작성자 | 작성일 |
|:----|:----:|----:|
| 공지 1 | admin | 25-02-13 |
| 공지 2 | admin | 25-02-13 |

참고로 마크다운으로는 복잡한 구조의 표는 만들 수 없으므로 복잡한 구조의 표를 만들 때는 **HTML** 코드로 작성해야 한다.

> 내가 링크를 작성하는데 링크 텍스트 안에 버티컬 바 기호가 있었다. 그런데 이게 표로 인식되서 링크가 아니라 표로 만들어지는 것이다. 이럴 경우 `|`를 제거하거나 `\|`로 입력하면 문제가 해결된다.  
> 작성할 때는 `|` 하나만 입력되어 있었기 때문에 단연히 표로 인식하지 않을 줄 알았는데 표로 인식해 버리니 참고하기 바란다.
{: .notice--warning}

## 체크상자

대괄호(`[ ]`)를 입력하면 체크박스가 생성되고 대괄호(`[x]`)를 입력하면 체크된 체크박스가 생성된다.

```markdown
* [ ] 동의함.
* [x] 동의 안 함
```

* [ ] 동의함.
* [x] 동의 안 함

## 마치며

지금까지 **GitHub 블로그**를 만드는 과정을 적어 보았다. 이 글들은 내가 나중에 보기 위해 정리하는 글이다. 나는 테마 없이 직접 만들었지만, 테마를 적용해 만들면 더 쉽게 만들 수 있을 것이다.

처음 **GitHub Pages**를 이용할 때는 내가 만든 HTML 파일을 웹페이지에서 볼 수 있다는 점이 좋았지만, 수동으로 만들어줘야 해서 불편했다. 그러다 **Jekyll**을 이용하면 블로그처럼 만들 수 있다고 해서 Jekyll로 블로그를 만드는 과정을 찾아가면서 공부했다. 하지만 지금 와서 보면 테마를 적용해 만들면 더 쉽게 만들 수 있었는데, 어려운 과정을 거쳐 온 것 같다. 현재는 원격 테마를 적용해서 Github 블로그를 만들어 놓았다.
