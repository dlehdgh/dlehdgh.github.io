---
layout: post
title: "wxPython 개발환경 구축"
categories: [python]
tags: [파이썬, wxPython, 개발환경]
toc: true
toc_sticky: true
date: 2024-10-24 20:53
---

### wxPython이란?

파이썬에서 GUI를 만드는 라이브러리로는 **tkinter**, **pyQT**, **wxPython** 등이 대표적인데 이 중 wxPython이 스크린리더 접근성이 가장 좋다. NVDA 역시 이 wxPython을 사용한다.

wxPython을 공부하려니 [wxPython API 문서](https://docs.wxpython.org/index.html){:target="_blank"}를 제공하지만 영어로만 되어 있고, 기본적인 설명은 제공하지만 실제로 어떻게 코드를 작성해야 하는지 이해하기 어려운 부분이 많다.

그레서 내가 공부했던 내용을 적어 놓았다가 나중에 보려고 한다.

### 설치

wxPython 설치 시 최신 버전을 설치할 경우 스크린리더에서 제대로 지원하지 않을 수 있으므로 사용하는 **NVDA**에서 사용하는 wxPython 버전을 설치한다.

**NVDA 메뉴 - 도구 - 로그 보기**에서 엔터를 누르면 로그 내용이 나오는데 여기서 사용하는 Python과 wxPython의 버전을 확인할 수 있다.

```bash
Using Python version 3.11.9 ...
Using wx version 4.2.2a1 msw ...
```

> 로고로 출력된 wxPython 버전을 보면 `4.2.2a1`인 것을 확인할 수 있다. 하지만 **PyPi**에서 wxPython을 검색해 보면 같은 버전이 없는 것을 확인할 수 있다.
> 이럴 경우 뒤에 붙은 `a1`은 빼고 `4.2.2` 버전을 설치하면 된다.

이제 해당 버전을 설치해 사용하면 된다.

```bash
pip install wxPython==4.2.2
```

> 나는 **Python 3.7.9**와 **wxPython 4.1.1**를 설치해 개발환경을 구축했다.

### 환경변수 등록

예전에는 바탕화면의 내 컴퓨터에서 속성으로 들어가 고급 설정인가로 들어가면 되었는데 요즘에는 바뀐 것 같아 적어 본다.

> 바탕화면의 내 PC에서 속성 - 고급 시스템 설정 - 고급 탭 - 환경변수 - 시스템 변수 목록에서 Path 선택 - 편집 - 환경 변수 편집 창에서 새로 만들기 - 파이썬 설치 폴더 경로 추가(ex: C:\Python37\) - 파이썬 스크립트 경로 추가(ex: C:\Python37\Scripts\)

바탕화면의 **내 PC**에서 속성으로 이동한 다음 탭키를 누르다 보면 **고급 시스템 설정**에서 엔터를 누르고 시스템 속성 창이 뜨면 탭키를 눌러 **환경변수**에서 엔터를 누른다.

시스템 변수 목록에서 **Path**를 선택한 뒤 편집에서 엔터를 누르면 환경 변수 편집 창이 뜨는데 여기서 **새로 만들기**를 눌러 파이썬 설치 폴더 경로(ex: C:\Python37\)와 파이썬 스크립트 경로(ex: C:\Python37\Scripts\)를 추가한 다음 확인 버튼을 눌러 설정을 완료하면 된다.

파이썬 설치 경로는 자신의 상황에 맞게 입력해주면 된다.

환경변수를 등록해야 우리가 명령프롬프트 창에서 `python` 또는 `pip` 명령을 입력해도 동작할 수 있게 하는 것이다. 만약 Path에 등록되어 있지 않다면 `python` 명령을 입력해도 동작하지 않는 것이다.

### pip 설치 명령

* 파이썬 버전 확인 방법   

  pip 명령으로 파이썬 라이브러리를 설치하다 보면 오류가 많이 발생하는데 그 중 하나가 파이썬 버전마다 지원하는 라이브러리 버전이 다른 경우가 있기 때문이다.

  예를 들어 **PyPi**에서 wxPython을 보면 `wxPython-4.2.2-cp313-cp313-win_amd64.whl`와 `wxPython-4.2.2-cp38-cp38-win_amd64.whl`가 있는 것을 확인할 수 있다. 여기서 `cp313` 또는 `cp38`이라고 적혀 있는데 이것이 **Python 3.13** 또는 **Python 3.8**에서 설치가 가능하다는 걸로 보인다. 즉 4.2.2 버전은 파이썬 3.13, 3.8 버전이어야 한다는 의미이다.

* 기본
  ```
  pip install 라이브러리명
  ```

* 특정 버전
  ```
  pip install wxPython==4.2.2
  ```

* 특정 버전과 호환되는 버전
  ```
  pip install wxPython~=4.2.2
  ```

* 설치된 라이브러리 리스트 확인
  ```
  pip list
  ```

* 제거
  ```
  pip uninstall wxPython
  ```

* pip 명령이 Path로 등록되어 있지 않을 경우
  ```
  python -m pip install wxPython
  ```

* 수동설치   
  PyPi에서 패키지 다운로드 후
  ```
  cd ./whl 파일을 다운로드한 경로
  pip install 파일명.whl
  ```
