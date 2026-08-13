---
title: "파이썬 pip 명령어 모음"
excerpt: ""
categories: [python]
tags:
  - 파이썬
  - 라이브러리
  - pip
  - requirements
  - PowerShell
date: 2025-07-27 17:46
last_modified_at: 2025-09-28 20:15
---

파이썬에서 라이브러리를 설치하려면 **pip** 명령을 사용해야 하는데 많이 사용되는 명령어를 설명하겠습니다.

## 파이썬 버전 확인 방법

pip 명령으로 파이썬 라이브러리를 설치하다 보면 오류가 많이 발생하는데 그 중 하나가 파이썬 버전마다 지원하는 라이브러리 버전이 다른 경우가 있기 때문입니다.

예를 들어 **PyPi**에서 wxPython을 보면 **wxPython-4.2.2-cp313-cp313-win_amd64.whl**와 **wxPython-4.2.2-cp38-cp38-win_amd64.whl**가 있는 것을 확인할 수 있습니다. 여기서 **cp313** 또는 **cp38**이라고 적혀 있는데 이것이 **Python 3.13** 또는 **Python 3.8**에서 설치가 가능하다는 걸로 보입니다. 즉 4.2.2 버전은 파이썬 3.13, 3.8 버전이어야 한다는 의미입니다.

## 라이브러리 설치하기

라이브러리의 설치 명령은 **PyPi**에서 검색하면 바로 알 수 있습니다.

```bash
pip install 라이브러리명
pip install wxPython
```

pip 명령이 **Path**로 등록되어 있지 않을 경우 아래와 같이 입력합니다.

```bash
python -m pip install wxPython
```

pip 명령으로 설치가 되지 않을 경우 수동으로 설치할수도 있습니다.

**PyPi**에서 라이브러리를 다운로드 받아 줍니다.

```bash
cd ./whl 파일을 다운로드한 경로
pip install 파일명.whl
```

## 특정 버전 설치하기

**동일 버전 설치**:

```bash
pip install wxPython==4.2.2
```

**특정 버전과 호환되는 버전 설치**:

```bash
pip install wxPython~=4.2.2
```

## 설치된 라이브러리 확인

`pip list` 명령으로 **설치된 라이브러리 목록**을 확인할 수 있습니다. 하지만 설치된 모듈(라이브러리, 패키지)이 많다면 내가 찾고자하는 모듈(라이브러리, 패키지)을 찾아야 하는 불편함이 있습니다. 따라서 이때에는 `pip show` 명령을 이용하여 개별 모듈(라이브러리, 패키지)의 상세정보를 통하여 버전 정보를 확인할 수 있습니다.

```bash
pip show [라이브러리명]
pip show wxPython
```

## 라이브러리 제거

```bash
pip uninstall 라이브러리명
pip uninstall wxPython
```

## 라이브러리 목록 저장하기

**가상환경**을 만들고 라이브러리를 설치해 사용하다가 프로젝트 폴더를 옮길 경우 기존에 설치된 라이브러리를 `requirements.txt`로 저장한 후 **pip** 명령어로 한번에 설치할 수 있습니다.

`requirements.txt` 파일을 만드는 방법은 직접 작성하는 것과 자동 추출하는 것으로 2가지가 있습니다.

### 직접 작성하기

* 특정 버전만 지원하는 경우(지정한 버전을 무조건 설치하라는 의미)

  ```bash
  numpy==2.0.1
  ```
​
* 특정 버전 이후 버전을 설치해야 하는 경우(pip에 등록된 가장 최신 버전이 설치된다)

    ```bash
    numpy>2.0.1
    ```
​
* 특정 버전 이전 버전을 설치해야 하는 경우

    ```bash
    numpy<2.0.1
    ```
​

### pip freeze 명령으로 추출하기

파일명을 보통 `requirements.txt`로 하지만 본인이 원하는 이름으로 해도 상관은 없다. 하지만 협업하는 경우 다른 사람이 알아 볼 수 있도록 `requirements.txt`를 권장한다.

```bash
pip freeze > requirements.txt
```

`freeze` 옵션은 설치된 패키지를 requirements 포멧으로 출력한다.

## requirements.txt 설치하기

pip를 최신 버전으로 업그레이드 하고 `-r` 옵션을 이용하여 패키지 목록을 읽어와 설치한다.

저장했던 패키지 목록 파일명을 파라미터로 입력한다.

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

`-r`, `--requirement` 옵션은 requirements 포멧파일을 읽어 설치한다

## PowerShell 사용방법

이번에 **Windows 11**로 업데이트했는데 **명령 프롬프트(CMD)**가 실행되는 것이 아니라 **PowerShell**로 실행되게 되어 있어 **PowerShell**로 가상환경에 접속하려니 오류가 발생해 해결 방법을 적어 본다.

**Visual Studio Code**에서는 정상작동할 것이다. 그 이유는 기본 셋팅이 아마 **CMD**로 되어 있기 때문이다.

> **원인** - 가상화 실행 명령은 스크립트를 실행해야하는데 PowerShell에서 이를 제한하기 때문이다.
{: .notice--primary}

> 나중에 알게 되었는데 **CMD** 창을 실행하는 방법은 폴더에서 **주소 표시줄**에 `cmd` 명령을 입력하거나 **실행창**(Ctrl+R)에서 `cmd` 명령을 입력하면 된다.
{: .notice--warning}

**해결책**  

Windows PowerShell을 **관리자 권한**으로 실행한다.

`Get-ExecutionPolicy` 명령으로 현재의 실행정책을 확인해보면 **Restricted**로 나올 것이다.

**RemoteSigned**가 아니면 `Set-ExecutionPolicy RemoteSigned` 명령을 실행한다.

그럼 실행 정책인 ExecutionPolicy가 가질 수 있는 값이 어떤 의미인지 설명하겠다.

* **Undefined** : ExecutionPolicy를 설정하지 않았다는 의미이며, 기본 정책인 `Restricted`로 작동합니다.
* **Restricted** : 기본 값이며, 이 경우 스크립트 파일이 실행되지 않습니다. 단, Microsoft에서 만든 일부 스크립트 파일들은 실행이 가능하기도 합니다.
* **Unrestricted** : 이 설정은 Microsoft에서도 권장하지 않는 옵션인데, 모든 스크립트(서명되지 않은 스크립트 포함)를 실행할 수 있습니다. 악성코드를 실행시킬 수도 있기 때문에 왠만하면 사용하지 않는 것이 좋을 듯 합니다.
* **AllSigned** : 신뢰할 수 있는 인증기관이 서명한 스크립만 실행하는 옵션으로 보안이 가장 높지만, 해당 컴퓨터에서 작성된 스크립트라 하더라도 신뢰할 수 있는 인증기관이 서명하지 않았다면 실행이 불가능합니다.
* **Bypass** : 이 값은 다른 어플리케이션 내에 파워쉘 스크립트가 내장되거나, 별도의 자체 보안 설정을 갖추었을때 사용하기 위해 만들어졌으며, 차단되거나 별다른 경고 없이 실행됩니다.
* **RemoteSigned** : 이 값은 최신 Windows Server 버전(Windows Server 2012 R2 이후)의 Powershell 실행정책 기본값입니다. 해당 로컬 컴퓨터에서 에서 작성된 모든 스크립트는 실행이 가능하며, 인터넷에서 다운로드한 스크립트는 인증기관이 발행한 코드로 서명되어야만 실행이 가능합니다. 인터넷 이외의 소스로부터 다운로드 받거나 서명은 되었지만 악의적인 목적이 있는 스크립트는 위험이 있을 수도 있습니다.

**참고**:  
* [About_Execution_Policies - PowerShell](https://learn.microsoft.com/ko-kr/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4){: target="_blank"}
* [Powershell 파워쉘 실행정책 - Execution Policy](https://m.blog.naver.com/vanstraat/221732533202){: target="_blank"}
