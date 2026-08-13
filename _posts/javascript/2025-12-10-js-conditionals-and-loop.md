---
title: "JavaScript 조건문과 반복문"
excerpt: ""
categories: [javascript]
tags:
  - JavaScript
  - 자바스크립트
  - 조건문
  - 반복문
  - if
  - switch
  - for
  - while
  - forEach
  - some
date: 2025-12-10 13:55
last_modified_at: 2026-03-09 17:06
---

이번에는 **조건문**과 **반복문**에 대해 배워 볼 거에요.

## if 문

`if` 문은 조건이 참이면 실행하는 방식인데 `else if`는 두번째, 세번째 조건을 추가하는 방식이고, `else`는 모든 조건이 거짓일 때 실행하는 방식이에요.

```javascript
if (조건) {
	실행문
} else if (조건) {
	실행문
} else {
	실행문
}
```

## switch case 문

하나의 변수를 가지고 여러 값과 비교하는 경우 `if` 문을 사용하면 동일한 변수명을 계속 입력해줘야 해서 불편한데요. `switch` 문을 사용해 변수를 전달하고, `case` 문으로 변수가 어떤 값인지 비교해서 참일 경우 실행하는 방식이에요. `default` 문은 `else` 문과 같이 모든 값과 일치하지 않을 때 실행한는 구문이에요.

`switch` 문의 `case` 문을 사용할 때 반드시 `break` 구문을 적어줘야 해요. `break` 구문을 적지 않으면 조검이 참일 경우 멈춰야 하는데 계속 다음 `case` 구문이 실행되게 되는 거죠.

```javascript
switch (조건) {
	case 값:
		실행문
		break;
	case 값:
		실행문
		break;
	default:
		실행문
}
```

## 삼항 연산자

`if else` 문을 사용하기에는 간단한 작업을 할 때 사용하면 좋아요.

```javascript
조건식 ? 참 : 거짓;
```

성별을 출력하는 예제 코드를 작성해 볼게요.

```javascript
const age = Number(confirm("성별", "주민번호 뒷자리의 첫 숫자를 입력하세요."));
document.write("성별: " + age == 1 ? "남자" : "여자");
```

## for 반복문

반복 작업을 할 때 수행하는 구문으로 세가지 방식이 있어요.

**n부터 m까지의 숫자를 반복**하는 구문이에요.

```javascript
for (초기화; 조건식; 증감식) {
	실행문
}
```

다음과 같이 사용할 수 있어요.

```javascript
for (let i=0; i<10; i++) {
	console.log(i + "번");
}
```

`for ... in` 문은 객체의 **열거 가능한 속성(키)**을 순회하는 반복문이에요.

```javascript
for (변수 in 객체) {
	실행문
}
```

예제 코드를 작성해 볼게요.

```javascript
const fruit = ["사과", "배", "바나나"];
const obj = {name: "홍길동", age: 20};
for (const i in fruit) {
	console.log(i, fruit[i]);
}
for (const key in obj) {
	console.log(key, obj[key]);
}
```

`for ... of` 문은 배열, 문자열, Map, Set 같은 **이터러블(Iterable) 객체의 값(value)**을 순회하는 반복문으로, 객체는 순회할 수 없으니 참고하세요.

```
for (변수 of 객체) {
	실행문
}
```

예제 코드를 작성해 볼게요.

```javascript
for (const value of fruit) {
	console.log(value);
}
```

> `for ... in` 구문에서 다른 프로그래밍 언어를 공부하신 분이시라면 좀 햇갈리실 수 있어요. 정리하자면 `for ... in`은 키를, `for ... of`는 값을 가져오는 거에요.
{: .notice--primary}

## break와 continue 구문

`for` 문 또는 `while` 문을 사용할 때 반복문을 건너뛰거나 멈춰야 할 경우가 있어요.
`break` 문은 반본문을 멈추는 거고, `continue` 문은 반복문을 건너뛰는 거에요.

```javascript
for (let i=10; i>=0; i--) {
	if (i == 5) {
		console.log("건너뛰기");
		continue;
	}
	console.log(i + "번");
	if (i == 1) {
		console.log("멈춤");
		break;
	}
}
```

## while 문

반복해서 실행할 때 사용하는 구문으로 조건이 거짓이 되면 멈추는 구문이라고 보시면 됩니다. 그레서 잘 못 작성할 경우 **무한 루프**에 빠지게 되니 주의해서 사용하세요.

```javascript
while (조건식) {
	실행문
}
```

## forEach 문

각 배열 요소에 대해 제공된 함수를 한 번씩 실행해요.

```javascript
const fruit = ['사과', '배', '바나나'];
fruit.forEach(function (value, index, data) {
	console.log(value, index, data);
});
```

위 코드에서 `value`는 배열의 항목별 값이 되고, `index`는 배열의 항목별 인덱스가 되고, `data`는 배열의 값이 되요. `for` 문 보다는 편하게 배열의 인덱스와 값을 가져올 수 있어요.

그리고 `break` 문은 사용할 수 없고, `continue` 문은 `return;`을 사용하면 되요.

## some 문

`forEach` 문은 반복을 중단할 수 없지만, `some` 문을 사용하면 반복을 중단할 수 있어요.
`break`는 `return true`로 사용하면 되고, `continue`는 `return false`로 사용하면 되요.

```javascript
const arr = [1, 2, 3, 4];
arr.some((item, index, data) => {
	if (item === 3) return true; // 3일 때 반복 중단
	console.log(item);
});
```

## 별표로 삼각형 표시하기 예제

별표(`*`)로 직삼각형으로 보이게 출력해 볼게요.

**직삼각형 출력하기**

```javascript
for (let i=1; i<6; i++) {
	document.write("*".repeat(i));
	document.write('<br>');
}
```

**정삼각형 출력하기**

```javascript
let n = 1;
const m = 9;
while (n < m) {
	const blank = (m - n) / 4;
	document.write("&nbsp; ".repeat(blank));
	document.write("*".repeat(n) + "<br>");
	n += 2;
}
```

위 코드에서 `"&nbsp;"`로만 하면 빈칸이 좀 부족하더라고요. 그래서 `"&nbsp; "`로 처리했어요.
