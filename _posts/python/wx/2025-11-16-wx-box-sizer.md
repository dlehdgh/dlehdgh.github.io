---
title: "wxPython 사이저 활용하기 (1)"
excerpt: ""
categories: [python]
tags:
  - 파이썬
  - wxPython
  - Sizer
  - BoxSizer
  - StaticBoxSizer
date: 2025-11-16 19:24
last_modified_at: 2026-01-30 16:54
---

이번 시간에는 **사이저(Sizer)**를 배워볼 거에요.
사이저는 화면 위에 버튼, 텍스트 상자 등의 위젯들을 정렬하고 배치(Layout)하는 **레이아웃 관리자 클래스**입니다. 
단순히 위젯의 절대적인 좌표(x, y)를 지정하는 대신, 사이저를 사용하면 윈도우 크기가 변경될 때 위젯들의 크기와 위치를 자동으로 조정할 수 있어 필수적인 요소입니다.

## BoxSizer

`wx.BoxSizer`는 가장 단순한 컨테이너로 **가로방향 배열(Horizontal)**과 **세로방향 배열(Vertical)** 두 가지를 지원해요.
우선 `wx.BoxSizer(VERTICAL | HORIZONTAL)`를 선언한 뒤, `.Add(window, proportion=0, flag=0, border=0)` 메서드를 통해 각각의 위젯들을 차례로 담으면 되요.

- **window**: BoxSizer에 담을 위젯 인스턴스
- **proportion**:: 위젯 크기가 차지하는 비중이다. 사이저가 **HORIZONTAL** 배열이면 가로 방향 전체 길이에서 위젯의 비율을 의미하고, **VERTICAL**이면 세로 방향 전체 길이에서 위젯 세로 길이 비율을 의미한다. `proportion=0`이면, 위젯 크기 비율의 증가/감소 없이 위젯 자체 크기를 그대로 사용하겠다는 의미이다.
- **flag**: 위젯의 border 두께가 적용되는 영역(`wx.LEFT`, `wx.RIGHT`, `wx.TOP`, `wx.BOTTOM`)을 결정하고, 프레임의 크기가 변경되었을 때 위젯 크기도 그에 따라 변하게 되는 `wx.EXPAND` 등을 설정할 수 있다.
- **border**: 위젯과 사이저 가장자리 사이 두께이다. 즉 값이 커질 수록 컨트롤 간의 간격이 넓어진다.

### proportion 값 정리

| 값  | 의미   | 설명                    |
| --- | ------ | ----------------------- |
| `0` | 고정 크기  | 위젯의 최소 크기만 사용 |
| `1` | 동일 비율  | 남는 공간을 다른 `1`들과 동일하게 나눔 |
| `2` | 두 배 비율 | `1`인 항목보다 2배 공간 차지 |
| `n` | n배 비율   | 다른 항목들과의 상대적인 비율 |

### flag 설정 값

| 플래그                | 설명       |
| ------------------ | -------- |
| `wx.EXPAND`        | 할당된 영역을 꽉 채움       |
| `wx.SHAPED`        | 위젯의 가로·세로 비율 유지   |
| `wx.FIXED_MINSIZE` | 위젯의 최소 크기를 무시하지 않음 |
| `wx.ALIGN_LEFT`    | 왼쪽 정렬  |
| `wx.ALIGN_RIGHT`   | 오른쪽 정렬 |
| `wx.ALIGN_TOP`     | 위쪽 정렬  |
| `wx.ALIGN_BOTTOM`  | 아래쪽 정렬 |
| `wx.ALIGN_CENTER`  | 가운데 정렬 |
| `wx.ALIGN_CENTER_HORIZONTAL` | 수평 중앙 정렬 |
| `wx.ALIGN_CENTER_VERTICAL`   | 수직 중앙 정렬 |
| `wx.ALL`<br>`wx.TOP`<br>`wx.BOTTOM`<br>`wx.LEFT`<br>`wx.RIGHT` | 어느 면에 **border 너비**를 적용할지 설정 |

> 정렬 플래그는 **BoxSizer의 방향을 기준**으로 동작하며, `wx.EXPAND`와 **동시에 쓰면 정렬이 무시**됩니다.  
> 여백 플래그는 `border` 인자와 **함께 사용**해야만 여백이 늘어나거나 줄어듭니다.
{: .notice--primary}

```python
# -*- coding: utf-8 -*-
# box_sizer.py

import wx

class MyFrame(wx.Frame):
	def __init__(self, title: str, size: tuple):
		super().__init__(None, title=title, size=size, style=wx.DEFAULT_FRAME_STYLE)

		# 패널 생성
		panel = wx.Panel(self)

		# 사이저 생성
		vbox = wx.BoxSizer(wx.VERTICAL)

		# 버튼 생성
		self.memo = wx.TextCtrl(panel, size=(280, -1))
		vbox.Add(self.memo, 0, wx.EXPAND|wx.ALL, 5)
		btn_add = wx.Button(panel, wx.ID_ADD, '추가')
		vbox.Add(btn_add, 0, wx.ALL, 5)
		btn_del = wx.Button(panel, wx.ID_DELETE, '삭제')
		vbox.Add(btn_del, 0, wx.ALL|wx.ALIGN_CENTER_HORIZONTAL, 5)
		btn_save = wx.Button(panel, wx.ID_SAVE, '저장')
		vbox.Add(btn_save, 0, wx.ALL|wx.ALIGN_RIGHT, 5)
		btn_cancel = wx.Button(panel, wx.ID_CANCEL, '취소')
		vbox.Add(btn_cancel, 0, wx.ALL|wx.ALIGN_RIGHT, 5)
		panel.SetSizerAndFit(vbox)
		self.Fit()
		self.Layout()
		self.Show()

		self.Bind(wx.EVT_CLOSE, self.OnClose)

	def OnClose(self, event):
		self.Destroy()

class MyApp(wx.App):
	def OnInit(self):
		MyFrame('메모', (300, 300))
		return True

if __name__ == '__main__':
	app = MyApp()
	app.MainLoop()
```
{: data-label="box_sizer.py"}

위 코드에서 `.Fit()`는 창의 크기를 그 안에 포함된 자식 컨트롤들의 최소 크기에 맞춰 자동으로 조정하는 메서드이고,

`.SetSizer()`는 **사이저(Sizer)**를 설정하여 자식 위젯들의 크기와 위치를 자동으로 배치하는 데 사용되는 메서드입니다.
그리고 `.Fit()`는 창 크기를 가장 적합한 크기로 조정하고, `.Layout()`은 배치된 컨트롤들의 위치와 크기를 **사이저(Sizer)** 규칙에 따라 재계산하고 반영하는 메서드입니다.

## StaticBoxSizer

`wx.StaticBoxSizer`는 `wx.BoxSizer`에 `wx.StaticBox`를 결합하여, 텍스트 레이블이 있는 테두리 상자로 위젯 그룹을 감쌀 수 있는 레이아웃 관리자입니다. 이는 `wx.StaticBox` 객체를 먼저 생성한 뒤, 이 StaticBox를 StaticBoxSizer 생성자의 인자로 전달하고, 마지막으로 StaticBoxSizer에 위젯들을 추가하는 방식으로 사용됩니다.

```python
# -*- coding: utf-8 -*-
# static_box_sizer.py

import wx

class MyDialog(wx.Dialog):
	def __init__(self, parent, title: str):
		super().__init__(parent, title=title, size=(300, 250), style=wx.DEFAULT_DIALOG_STYLE)

		# 박스 사이저 생성
		vbox = wx.BoxSizer(wx.VERTICAL)

		# StaticBox 생성
		static_box = wx.StaticBox(self, -1, '개인정보')
		static_box_sizer = wx.StaticBoxSizer(static_box, wx.VERTICAL)

		self.ck_male = wx.CheckBox(self, -1, '남성')
		self.ck_married = wx.CheckBox(self, -1, '기혼')
		st_age = wx.StaticText(self, -1, '나이')
		self.spin_age = wx.SpinCtrl(self, -1, '1', min=1, max=120)
		st_mail = wx.StaticText(self, -1, '이메일')
		self.tc_mail = wx.TextCtrl(self, size=(280, -1), style=wx.TE_AUTO_URL)
		btn_ok = wx.Button(self, wx.ID_OK, '보내기')

		static_box_sizer.AddMany([ (self.ck_male, 0, wx.ALL, 5),
			(self.ck_married, 0, wx.ALL, 5),
			(st_age, 0, wx.ALL, 5),
			(self.spin_age, 0, wx.ALL, 5) ])
		vbox.AddMany([ (static_box_sizer, 1, wx.EXPAND|wx.ALL, 5),
			(st_mail, 0, wx.ALL, 5),
			(self.tc_mail, 0, wx.EXPAND|wx.ALL, 5),
			(btn_ok, 0, wx.ALL|wx.ALIGN_CENTER, 5) ])
		self.SetSizerAndFit(vbox)
		self.Centre()

		self.Bind(wx.EVT_CLOSE, self.OnClose)

	def OnClose(self, event):
		self.Destroy()

class MyApp(wx.App):
	def OnInit(self):
		dialog = MyDialog(None, '설문조사')
		if dialog.ShowModal() == wx.ID_OK:
			gender = '남성' if dialog.ck_male.GetValue() else '여성' # 성별
			married = '기혼' if dialog.ck_married.GetValue() else '미혼' # 결혼 여부
			age = dialog.spin_age.GetValue() # 나이
			email = dialog.tc_mail.GetValue() # 이메일
			if not email:
				email = '없음'
			print(f'성별: {gender}, 결혼 여부: {married}, 나이: {age}세, 이메일: {email}')
			wx.MessageBox(f'성별: {gender}\n결혼 여부: {married}\n나이: {age}세\n이메일: {email}', '설문조사 결과', style=wx.OK|wx.ICON_INFORMATION)
		dialog.Destroy()
		return True

if __name__ == '__main__':
	app = MyApp()
	app.MainLoop()
```
{: data-label="static_box_sizer.py"}

위 코드에서 `wx.StaticBox()`로 텍스트 레이블을 지정하고, `wx.StaticBoxSizer()`로 **사이저(Sizer)**를 설정합니다.
**BoxSizer**의 예제 코드와 달리 `.AddMany()`를 사용한 것을 알 수 있는데요. 이 메서드는 `.Add()`로 추가할 위젯을 리스트로 한 번에 추가하는 거에요.

`.SetSizerAndFit()`는 이전에 배운 `.SetSizer()`와 `.Fit()` 메서드를 합쳐서 사용하는 거라고 생각하시면 되요.
또 `.Center()` 또는 `.Centre()`는 창을 중앙에 배치하는 메서드입니다. 저는 이 메서드를 잘 사용하지 않지만 인터넷에 있는 코드들을 보면 꼭 사용하는 것 같아 적어 봅니다.
