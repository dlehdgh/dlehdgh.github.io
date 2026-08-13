---
title: "JavaScript 함수와 클레스"
excerpt: ""
categories: [javascript]
tags:
  - JavaScript
  - Object
  - Array
  - Number
  - String
  - Math
  - function
  - class
  - 자바스크립트
  - 함수
  - 객체
  - 클레스
date: 2025-12-17 13:54
last_modified_at: 2026-04-03 18:03
---

## 내장 함수

**JavaScript**에서 지원하는 내장 함수에 대해 설명할 건데요.

### 타이머 함수

- `setTimeout(함수, 밀리초)` : 지정한 밀리초 후 함수를 한 번 실행.
- `clearTimeout(id)` : `setTimeout()` 함수를 중지(**id**는 타이머가 할당된 변수)
- `setInterval(함수, 밀리초)` : 지정한 밀리초마다 함수를 반복 실행.
- `clearInterval(id)` : `setInterval()` 함수를 중지(**id**는 타이머가 할당된 변수)
- `requestAnimationFrame(함수)` : 애니메이션을 효율적으로 구현하기 위한 표준 웹 API입니다. 브라우저의 리페인트 시점에 맞춰 콜백 함수를 실행시켜 부드러운 애니메이션을 만듭니다.

> **밀리초**: 1초를 1000등분한 시간 단위
{: .notice--primary}

애니메이션을 만들 때 예전에는 `setInterval()` 함수를 이용해서 만들었지만 최근에는 `requestAnimationFrame()` 함수를 이용해서 만들어요.

```javascript
let timer = setTimeout(() => {
	console.log('Hello Timer');
}, 1000);
// 타이머 정지
clearTimeout(timer);
```

`setInterval()` 함수도 같은 방식으로 사용하면 되요.

```javascript
const element = document.getElementById("panel");
const start_x = 0; // X좌표 시작 위치
const end_x = 200; // X좌표 끝 위치
let pos;

function step(timestamp) {
	if (pos == undefined) {
		pos = start_x;
	}
	pos += 5;
	element.style.transform = `translateX(${pos}px)`;
	if (pos < end_x) {
		requestAnimationFrame(step);
	}
}
requestAnimationFrame(step);
```

### 인코딩과 디코딩 함수

- `escape()`, `unescape()` : 영문 알파벳과 숫자, 일부 특수문자(`@ * - _ + . /`)를 제외하고 인코딩
- `encodeURI(uri)`, `decodeURI(encodedURI)` : `escape()` 함수와 같으나 일부 특수문자(`: ; / = ? &`) 제외
- `encodeURIComponent(uriComponent)`, `decodeURIComponent(encodedURI)` : 알파벳과 숫자를 제외한 모든 문자 인코딩, UTF-8 인코딩과 동일

### 코드 실행 함수(eval)

`eval(string)`은 문자열을 코드로 실행할 수 있는 함수입니다.

```javascript
let code = `var num = 3;
alert(num);`;
eval(code);
console.log('num:', num); // 코드에서 선언한 변수 출력
```

> **주의**: 스크립트 실행이 가능하기 때문에 보안상의 문제가 발생할 수 있어요.
{: .notice--primary}

### 숫자 관련 함수

**숫자 확인 함수**

- `isFinite()` : 무한한 값인지 확인
- `isNaN()` : NaN인지 확인

> 자바스크립트에서는 숫자를 0으로 나누면 에러가 발생하는게 아니라 `Infinity`라는 값이 됩니다.
{: .notice--primary}

**숫자 변환 함수**

- `Number(string)` : 문자열을 정수값으로 변환
- `parseInt(string)` : 문자열을 정수값으로 변환
- `parseFloat(string)` : 문자열을 실수값으로 변환

## Object 객체

자바스크립트의 최상위 객체로 다음과 같이 생성합니다.

```javascript
let obj_1 = {};
let obj_2 = new Object();
```

**Object 객체의 메서드**:

- `constructor()` : 객체의 생성자 함수
- `toLocaleString()` : 객체를 호스트 환경에 맞는 언어의 문자열로 변경
- `toString()` : 객체를 문자열로 변경
- `valueOf()` : 객체의 값을 표시

## Document 객체

웹 페이지 전체(HTML 문서)를 나타내는 객체로, 자바스크립트에서 **DOM(Document Object Model)**을 통해 페이지의 구조를 읽거나 수정할 때 사용합니다.

**속성**:

- `title` : 현재 문서의 제목
- `body` : `<body>` 요소에 접근
- `head` : `<head>` 요소에 접근
- `URL` : 현재 문서의 URL

**메서드**:

- `getElementById()` : id 속성 값으로 요소 선택
- `getElementByClass()` : class 속성 값으로 요소 선택
- `getElementByName()` : name 속성 값으로 요소 선택
- `getElementByTagName()` : 태그 이름으로 요소 선택
- `querySelector(selectors)`: CSS 선택자로 요소 하나만 선택
- `querySelectorAll(selectors)` : CSS 선택자로 모든 요소 선택
- `createElement()` : 새로운 요소 생성
- `write()` : 문서에 내용 작성

**예시 코드**

```javascript
// 제목 변경
document.title = "새로운 페이지";

// 요소 선택 후 내용 변경
const title = document.getElementById('title');
title.textContent = '안녕하세요';

// 새로운 요소 생성 및 추가
const pTag = document.createElement('p');
pTag.innerHTML = '이 <string>문장</strong>은 새로 추가되었습니다.';
document.body.appendChild(pTag);
```

> 예전에는 `document.body`로 접근해서 스타일을 변경했지만, 요즘에는 잘 사용하지 않아요.
{: .notice--warning}

## Number 객체

숫자를 표현할 때 사용하는 객체로 **숫자 관련 함수**에서 간단하게 설명했으니 메서드와 속성에 대해 설명할게요.

**메서드**:

- `toExponential(자릿수)` : 숫자를 지수 표시로 변환
- `toFixed(자릿수)` : 숫자를 고정 소수점 표시로 변환(문자열 반환)

**속성**:

- `MIN_VALUE` : 표현 가능한 최소 숫자
- `MAX_VALUE` : 표현 가능한 최대 숫자
- `NaN` : Not a Number
- `POSITIVE_INFINITY` : 양의 무한대 수
- `NEGATIVE_INFINITY` : 음의 무한대 수

## String 객체

문자열을 표현할 때 사용하는 객체에요.

**속성**:

- `length` : 문자열의 길이

**메서드**:

- `charAt(position)` : 문자열에서 인덱스 문자 반환
- `charCodeAt(position)` : 문자열에서 인덱스 문자를 유니코드로 반환
- `concat(args)` : 매개변수로 입력한 문자열을 결합
- `indexOf(찾을 문자열, position)` : 앞에서부터 일치하는 문자열의 인덱스 반환
- `lastIndexOf(찾을 문자열, position)` : 뒤에서부터 일치하는 문자열의 인덱스 반환
- `match(regexp)` : 문자열 안에 regexp가 있는지 확인
- `replace(regexp, replacement)` : 문자열 안의 regexp를 replacement로 변경
- `search(regexp)` : regexp와 일치하는 문자열의 위치 반환
- `slice(start, end)` : 특정 위치의 문자열을 반환
- `substr(start, count)` : start부터 count만큼 문자열을 반환
- `substring(start, end)` : start부터 end까지 문자열을 반환
- `toLowerCase()` : 문자열을 소문자로 바꾸어 반환
- `toUpperCase()` : 문자열을 대문자로 바꾸어 반환

> HTML 태그를 생성하는 내장 함수들이 있지만 `document.createElement()`와 같은 **DOM API**를 사용하는 것을 권장해요.  
> `search`, `replace` 등의 메서드에서 `regexp`는 **정규 표현식**을 이용해서 처리할 수 있다는 거에요.
{: .notice--primary}

## Array 객체

배열을 표현할 때 사용하는 객체입니다.

**배열 생성하기**:

```javascript
var args_1 = ['a', 'b', 'c']; // 생성과 동시에 초기화
var args_2 = new Array(); // 빈 배열 생성
var args_3 = new Array(4); // 생성 시 지정한 개수만큼 빈공간 지정
var args_4 = new Array('a', 'b', 'c'); // 생성과 동시에 초기화
```

**속성**:

- `length` : 배열의 크기 반환

**메서드**:

- `Array.isArray(배열)` : 배열인지 확인
- `pop()` : 배열의 마지막 요소를 제거 후 리턴
- `push(값)` : 배열의 마지막에 새로운 요소 추가
- `reverse()` : 배열의 요소 순서 반전
- `sort()` : 배열 요소 정렬(기본값: 문자열 오름차순)

	```javascript
	// 내림 차순으로 정렬
	var args = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
	args.sort((a, b) => b - a);
	// 셔플
	args.sort(() => 0.5 - Math.random());
	```

- `splice(시작 위치, 개수)` : 요소의 지정된 부분 삭제 후 삭제한 요소를 반환
- `slice(시작 우치, 마지막 위치)` : 요소의 지정한 부분을 반환
- `concat(배열)` : 매개변수로 전달 받은 배열의 요소를 모두 합쳐서 배열을 생성 후 반환
- `join(문자열)` : 배열 안의 모든 요소를 문자열로 합쳐서 반환
- `indexOf(값)` : 배열의 앞쪽부터 매개변수로 전달 받은 값과 일치하는 인덱스를 반환(없으면 -1 반환)
- `lastIndexOf(값)` : 배열의 뒷쪽부터 매개변수로 전달 받은 값과 일치하는 인덱스를 반환(없으면 -1 반환)
- `forEach(배열 요소, 인덱스, 배열 자체)` : 배열을 `for in` 반복문처럼 사용 가능
- `map(배열 요소, 인덱스, 배열 자체)` : 기존의 배열에 특정 규칙을 적용해서 새로운 배열 생성
- `filter(배열 요소, 인덱스)` : 특정 조건을 만족하는 요소를 추출하여 새로운 배열 생성
- `every(배열 요소, 인덱스, 배열 자체)` : 배열의 모든 요소가 조건을 만족하는지 확인(`true` 또는 `false` 반환)
- `some(배열 요소, 인덱스, 배열 자체)` : 배열의 요소가 특정 조건을 적어도 하나는 만족하는지 확인(`true` 또는 `false` 반환)
- `reduce(accumulator, currentValue, currentIndex, array)` : 배열의 요소가 하나가 될 때까지 요소를 왼쪽부터 두 개씩 묶는 함수 실행
- `reduceRight()` : 위와 같으나 오른쪽부터 실행

위에서 설명한 메서드를 사용하는 간단한 예제 코드를 작성해 볼게요.

```javascript
let fruit = ['사과', '바나나', '배', '귤', '포도'];

// 과일 배열 출력
fruit.forEach((item, index, data) => {
	console.log(`${index + 1}. ${item}`);
});

// 값 증가시키기
let args = [...Array(10).keys()];
args.map((value, index, data) => value + 5); // [5, 6, 7, ...]

// 짝수
args.filter((value, index, data) => value % 2 == 0); // [0, 2, 4, ...]

// every
args.every((value, index, data) => value < 6); // false
args.every((value, index, data) => value == 5); // false

// some
args.some((value, index, data) => value < 6); // true
args.some((value, index, data) => value == 5); // true

// 배열의 모든 숫자 더하기
args.reduce((accumulator, currentValue) => accumulator + currentValue); // 45
```

## Date 객체

날짜와 시간을 표시하는 객체입니다.

**생성**:

```javascript
new Date(); // 현재 날짜와 시간
new Date('October 10, 2025');
new Date('2026.01.01');
new Date('2026-01-01');
new Date(2026, 1, 1);
```

생성 시 기본적으로 날짜 및 시간을 **세계시(UTC)로 반환**합니다. 영어로 출력이 되는데 이걸 사용해도 되지만 보통은 년, 월, 일, 시, 분, 초를 각각 가져와서 원하는 형식으로 출력하는 방식으로 사용을 해요.

**메서드**:

메서드는 매우 많으며, 대부분 `get`, `set`으로 이루어져 있으며 메서드명으로 기능을 유추할 수 있어요.

- `getTime()` : UTC로부터의 경과시간을 밀리초 단위로 반환합니다.(경과 시간 체크 시 사용)
- `getFullYear()` : 현지 시간 기준 연도(4자리 숫자)를 반환(`getYear()`는 브라우저마다 반환 값이 달라서 사용하지 않음.)
- `getMonth()` : 현지 시간 기준 월(0-11)을 반환
- `getDate()` : 현지 시간 기준 일(1-31)을 반환
- `getDay()` : 현지 시간 기준 요일(0-6)을 반환(0은 일요일을 나타냄.)
- `getHours()` : 현지 시간 기준 시(0-23)를 반환
- `getMinutes()` : 현지 시간 기준 분(0-59)를 반환
- `getSeconds()` : 현지 시간 기준 초(0-59)를 반환

> `set`으로 시작하는 메서드도 동일한 기능을 해요. 예를 들어 `setFullYear(2026)`은 연도를 설정하는 거에요.
{: .notice--primary}

## Math 객체

수학과 관련된 속성과 메서드를 가진 객체인데요. Math 객체는 **변수**라고 보시면 되요.

**속성**:

- `PI` : 원주율로 약 3.14159.

**메서드**:

- `abs()` : 절대값 반환(양수 또는 음수를 전달하면 양수로 반환)
- `acos()` : 아크 코사인 값 반환
- `asin()` : 아크 사인 값 반환
- `atan()` : 아크 탄젠트 값 반환
- `atan2(y, x)` : x와 y의 비율로 아크 탄젠트 값 반환
- `cos()` : 코사인 값 반환
- `exp()` : 자연로그의 제곱 반환
- `log()` : 로그 값 반환
- `max()` : 매개변수 중 가장 큰 값 반환
- `min()` : 매개변수 중 가장 작은 값 반환
- `pow(x, y)` : x의 y제곱 반환
- `random()` : 0부터 1까지의 임의의 수 반환
- `ceil()` : 크거나 같은 가장 작은 정수 반환(올림)
- `round()` : 반올림해서 반환
- `floor()` : 작거나 같은 가장 큰 정수 반환(내림)
- `sin()` : 사인 값 반환
- `sqrt()` : 제곱근 반환
- `tan()` : 탄젠트 값 반환

```javascript
let args = [3, 9, 6, 12, 19, 15];
// 최대, 최소 값 구하기
Math.min(3, 9, 6); // 3
Math.min(...args); // 3
Math.max(3, 9, 6); // 9
Math.max(...args); // 19

// 올림, 반올림, 내림
let value = 5.25;
Math.ceil(value); // 6
Math.round(value); // 5
Math.floor(value); // 5

// 랜덤 숫자 생성
Math.random(); // 0.6217907289957261
let n = Math.floor(Math.random() * 10); // 0 ~ 9 사이의 숫자
```

## JSON(Javascript Object Notation) 객체

Javascript 객체 문법으로 구조화된 데이터를 표현하기 위한 문자 기반의 표준 포맷입니다.

**메서드**:

- `JSON.stringify()` : 자바스크립트 객체를 JSON 문자열로 변환
- `JSON.parse()` : JSON 문자열을 자바스크립트 객체로 변환

```javascript
let member = [
	{
		"name": "홍길동",
		"age": 18
	}, {
		"name": "고길동",
		"age": 30
	}
];
let data = JSON.stringify(member, null, 4);
console.log(typeof data);
console.log(data);
let data2 = JSON.parse(data);
console.log(typeof data2);
console.log(data2);
```

출력 결과:

```bash
string
[
  {
    "name": "홍길동",
    "age": 18
  },
  {
    "name": "고길동",
    "age": 30
  }
]
object
[ { name: '홍길동', age: 18 }, { name: '고길동', age: 30 } ]
```

***

## 사용자 정의 함수

JavaScript에서 원하는 기능을 함수로 정의하시면 되는데요. 이번에는 더하기 함수를 정의해 볼게요.

```javascript
function sum(a, b) {
	return a + b;
}
let res = sum(5, 7);
console.log(res);
```

기존에는 `function` 구문으로 함수를 선언했지만 **ES6**에서는 **화살표 함수 표현식**으로 함수를 선언할 수 있어요.
차이점으로는 다음과 같아요.

1. `function`으로 선언한 함수는 자체적인 `this`를 가지지만 화살표 함수는 외부 스코프의 `this`를 그대로 사용해요.
1. `function` 함수는 전달된 인자들을 모아주는 `arguments` 객체와 `new`를 통한 생성자 호출이 가능한 반면 화살표 함수는 이를 지원하지 않아요.
1. `function` 함수는 선언보다 먼저 호출하는 **호이스팅**이 가능하지만 화살표 함수는 변수에 할당된 표현식이기 때문에 호이스팅되지 않아요.

```javascript
const sum = (a, b) => {
	return a + b
};
const multiply = (a, b) => a * b;
```

**화살표 함수 표현식**에서 간단한 코드를 리턴할 경우 중괄호 없이 바로 리턴 값을 전달할 수 있어요.

## 사용자 정의 클레스

클래스는 **ES6**에서 부터 사용하기 시작했으며, 객체를 만들기 위한 설계도 또는 틀로, 속성과 메서드를 묶어 객체 지향 프로그래밍(OOP)을 더 쉽게 구현하도록 돕는 문법입니다.
이는 기존 **프로토타입** 기반을 유지하면서도 클래스 문법을 통해 더 간결하고 직관적으로 코드를 작성할 수 있게 해주며, 동일한 구조의 객체를 여러 개 생성할 때 유용합니다.

```javascript
class Person {
	// 생성자 함수
	constructor(name, age) {
		this.name = name; // 속성
		this.age = age;
	}

	// 메서드
	greet() {
		console.log(`안녕하세요, 제 이름은 ${this.name}이고, 나이는 ${this.age}살입니다.`);
	}
}
// 클래스를 이용해 객체(인스턴스) 생성
const person1 = new Person('홍길동', 30);
const person2 = new Person('이순신', 45);

person1.greet();
```

## 마치며

JavaScript의 **함수**와 **클레스**에 대해 알아 보았는데요. **내장 함수**와 **객체**의 경우 자주 사용하는 것들만 설명한 거에요.

객체의 메소드나 속성에 대해 자세히 알고 싶다면 변수로 선언한 뒤 `.__proto__`를 콘솔창에 출력해 보시면 사용 가능한 메소드나 속성이 출력되니 그걸 검색해서 알아 보고 사용하시거나 다음 문서를 참고해 보세요.

- [표준 내장 객체 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects){: target="_blank"}
- [함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions){: target="_blank"}
- [classes - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes){: target="_blank"}
