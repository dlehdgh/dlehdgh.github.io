---
title: "wxPython 간단한 계산기 만들기"
excerpt: ""
categories: [python]
tags:
  - 파이썬
  - wxPython
  - Panel
  - StaticText
  - TextCtrl
  - Button
  - 계산기
date: 2025-06-02 17:12
last_modified_at: 2026-01-15 17:39
toc: false
---

이번 시간에는 `wx.Panel`, `wx.StaticText`, `wx.TextCtrl`, `wx.Button`을 이용해 계산기를 만들어 볼 거에요.

- **`wx.Panel`** : 여러가지 구성 요소를 하나로 묶어서 다룰 수 있게 만들어 주는 역할을 합니다. **패널**은 프레임 속의 프레임이기 때문에 각각 레이아웃을 다르게 지정할 수 있어요.
- **`wx.StaticText`** : 읽기 전용 텍스트를 화면에 출력하는 컨트롤
- **`wx.TextCtrl`** : 사용자가 직접 텍스트를 입력할 수 있는 편집창을 생성하는 컨트롤
- **`wx.Button`** : 클릭 가능한 버튼을 생성하는 컨트롤

> **Note**:  
> `wx.Frame`에서 **스크린리더**가 컨트롤을 인식하도록 하려면, `wx.Panel` 안에 컨트롤을 추가해야 해요.  
> 이걸 적는 이유는 인터넷 검색으로 예제 코드를 가져오는 경우 `wx.Frame`에 컨트롤을 추가해 놓은 경우가 많은데요. 그걸 그대로 사용하면 스크린리더로 접근할 수 없기 때문이에요.
{: .notice--primary}

```python
# -*- coding: utf-8 -*-
# calculater.py

import wx

class Calculater(wx.Frame):
	def __init__(self, title):
		super().__init__(None, title=title, size=(370, 300))
		w, h, gap = 80, 25, 10

		# 패널 생성
		panel = wx.Panel(self)

		wx.StaticText(panel, label='계산식:', pos=(10, 10))
		self.tc_display = wx.TextCtrl(panel, pos=(10, 35), size=(w*4 + gap * 3, h), style=wx.TE_PROCESS_ENTER)
		# 엔터키를 눌렀을 때 이벤트 처리
		self.tc_display.Bind(wx.EVT_TEXT_ENTER, self.OnCalculate)

		btn_list = ['CE', 'C', '%', '÷',
			'7', '8', '9', '×',
			'4', '5', '6', '-',
			'1', '2', '3', '+',
			'0', '', '.', '=']
		for i in range(5):
			for j in range(4):
				value = btn_list[i * 4 + j]
				if not value:
					continue
				n = 2 if value == '0' else 1
				button = wx.Button(panel, label=value, pos=(gap + (w + gap) * j, 65 + gap + (h + gap) * i), size=(w * n, h))
				button.Bind(wx.EVT_BUTTON, self.OnClick)

		self.Show()
		self.Centre()

	# 버튼 클릭 이벤트
	def OnClick(self, event):
		math_matic = list('%×÷+-.')
		value = event.GetEventObject().GetLabel()
		text = self.tc_display.GetValue()
		print('text =', text)
		if value == '=': # 계산하기
			self.OnCalculate(None)
		elif value == 'CE': # 항목 지우기
			self.tc_display.SetValue(text[:-1])
		elif value == 'C': # 모두 지우기
			self.tc_display.Clear()
		elif value in '%×÷+.':
			# 연산자 입력 시 중복되는 문제 체크(ex: 1+*1)
			if text and text[-1] not in math_matic:
				value = '*' if value == '×' else '/' if value == '÷' else value # 곱하기, 나누기 부호를 연산 기호로 변경
				print('  연산자 입력:', value)
				self.tc_display.AppendText(value)
		else: # 숫자
			print('숫자 입력:', value)
			self.tc_display.AppendText(value)

	# 계산하기 이벤트
	def OnCalculate(self, event):
		text = self.tc_display.GetValue()
		try:
			res = eval(text)
			print('계산:', res)
			self.tc_display.SetValue(str(res))
		except Exception as e:
			print(f'ERROR: 예상치 못한 오류 발생: {e}')

class MyApp(wx.App):
	def OnInit(self):
		Calculater('계산기')
		return True

if __name__ == '__main__':
	app = MyApp()
	app.MainLoop()
```
{: data-label="calculater.py"}

![계산기](/assets/image/calculater.png)

위 코드에서는 **Sizer**를 사용하지 않고 위치와 크기를 지정해주었는데요. 컨트롤의 크기와 여백을 계산해서 창의 크기를 지정해주었지만 실행해보면 조금 잘려서 보이는 걸 확인할 수 있어요. 그래서 나중에 배울 **Sizer**를 이용해서 설정해 주는 게 좋아요.

`wx.Button`에 입력된 텍스트를 가져올 때는 `.GetLabel()`이고 `wx.TextCtrl`은 `.GetValue()`인데요. 가끔 혼동하는 경우가 있으니 주의해서 사용하세요. 그리고 `wx.TextCtrl()`에서 엔터키를 누르면 계산이 되게 만들어 놓았으니 나중에 이런 기능을 구현하고 싶을 때 참고하세요.
