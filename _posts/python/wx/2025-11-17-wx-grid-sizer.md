---
title: "wxPython 사이저 활용하기 (2)"
excerpt: ""
categories: [python]
tags:
  - 파이썬
  - wxPython
  - Sizer
  - GridSizer
  - FlexGridSizer
  - GridBagSizer
  - CallLater
date: 2025-11-17 19:37
last_modified_at: 2026-01-30 17:20
---

이번 시간에는 **사이저(Sizer)** 중 `wx.GridSizer`, `wx.FlexGridSizer`, `wx.GridBagSizer`에 대해 배워 볼 거에요.

## GridSizer

`wx.GridSizer(rows, cols, vgap, hgap)`는 위젯을 **행×열의 균일한 격자 형태로 배치하는 레이아웃 매니저**입니다.
모든 셀의 크기는 동일하며, 행/열 수와 간격을 지정해 사용할 수 있어요. **규칙적으호 반복되는 UI**를 만들 때 사용합니다.

```python
# -*- coding: utf-8 -*-
# grid_sizer.py

import wx
import random

class MyFrame(wx.Frame):
	def __init__(self, parent):
		super().__init__(parent, title='GridSizer Example', size=(400, 300))

		# 패널 생성
		panel = wx.Panel(self)

		# 그리드 사이저 (rows, cols, vgap, hgap)
		self.grid = wx.GridSizer(5, 5, 10, 10)

		for i in range(5):
			for j in range(5):
				# 버튼 25개 생성 (5 x 5)
				button = wx.Button(panel, -1, f'({i+1}, {j+1})')
				# 각 버튼을 그리드 사이저에 할당
				self.grid.Add(button, 0, wx.EXPAND, 5)

		# 패널에 그리드 사이저 할당
		panel.SetSizer(self.grid)

		# 랜덤으로 1개 지정하여 색 변경
		self.default_colour = button.GetBackgroundColour()
		print('기본 배경색상 =', self.default_colour)
		for i in range(20):
			wx.CallLater(i*100, self.SetColor)

	# 버튼 색상 변경
	def SetColor(self):
		# 랜덤 정수 생성 (0~24)
		# print('grid.children =', len(self.grid.Children))
		rand = random.randint(0, len(self.grid.Children) - 1)
		# 그리드 사이저에 속한 자식 오브젝트 중 rand 번째 아이템(버튼) 소환
		item = self.grid.Children[rand].Window
		# 해당 버튼 색상 변경 (회색 <-> 빨간색)
		if item.GetBackgroundColour() == wx.YELLOW:
			item.SetBackgroundColour(self.default_colour)
		else:
			item.SetBackgroundColour(wx.YELLOW)

class MyApp(wx.App):
	def OnInit(self):
		frame = MyFrame(None)
		frame.Show()
		frame.Center()
		return True

if __name__=="__main__":
	app = MyApp()
	app.MainLoop()
```
{: data-label="grid_sizer.py"}

> **`wx.CallLater()`란?**  
> `wx.CallLater(millis, callableObj, *args, **kw)`로 선언하며, 지정된 밀리초 후에 주어진 호출 가능 객체를 한 번 호출하는 클레스에요.
> - `millis`: 호출하기 전 지연할 밀리초
> - `callableObj`: 호출 가능한 객체
> - `args`: 호출 가능한 객체에 전달될 인수
> - `kw`: 호출 가능한 객체에 전달될 키워드 인수
{: .notice--warning}

## FlexGridSizer

`wx.FlexGridSizer(rows, cols, vgap, hgap)`는 **GridSizer의 유연한 버전**이라고 보면 되요. 특정 행/열만 선택적으로 늘어날 수 있는 거죠.

`.AddGrowableRow(row)`와 `.AddGrowableCol(column)` 메서드로 어떤 행/열이 늘어나게 할지 설정하는 거에요.

```python
# -*- coding: utf-8 -*-
# flex_grid_sizer.py

import wx

class MyFrame(wx.Frame):
	def __init__(self):
		super().__init__(parent=None, title='FlexGridSizer Example', size=(400, 370))

		# 패널 생성
		panel = wx.Panel(self)

		# 사이저 생성
		fgs = wx.FlexGridSizer(rows=3, cols=2, hgap=5, vgap=5)

		static_name = wx.StaticText(panel, label='이름:')
		self.tc_name = wx.TextCtrl(panel)
		static_email = wx.StaticText(panel, label='이메일:')
		self.tc_email = wx.TextCtrl(panel)
		static_phone = wx.StaticText(panel, label='휴대폰 번호:')
		self.tc_phone = wx.TextCtrl(panel)

		# 사이저 할당
		fgs.AddMany([ (static_name),
			(self.tc_name, 0, wx.EXPAND),
			(static_email),
			(self.tc_email, 0, wx.EXPAND),
			(static_phone),
			(self.tc_phone, 0, wx.EXPAND) ])
		fgs.AddGrowableCol(1)
		fgs.AddGrowableRow(2)

		vbox = wx.BoxSizer(wx.VERTICAL)
		vbox.Add(fgs, 1, wx.EXPAND|wx.ALL, 5)
		panel.SetSizer(vbox)

if __name__ == '__main__':
	app = wx.App()
	frame = MyFrame()
	frame.Show()
	app.MainLoop()
```
{: data-label="flex_grid_sizer.py"}

## GridBagSizer

위젯을 배치하다보면 딱 떨어지게 할 수 없는 경우가 많은데요. 그때 사용하는 **사이저(Sizer)**라고 보시면 됩니다.
`wx.GridBagSizer(vgap, hgap)`는 **wxPython에서 가장 유연한 레이아웃 매니저 중 하나**로, **그리드 + 플렉스그리드의 장점을 합친 레이아웃 매니저**입니다. 위젯을 격자(grid) 형태에 배치하되, **각 요소가 여러 셀을 가로/세로로 병합해서 차지할 수 있게** 해줍니다.

```python
# -*- coding: utf-8 -*-
# grid_beg_sizer.py

import wx

# 찾기 다이얼로그
class Finder(wx.Dialog):
	def __init__(self, parent):
		super().__init__(parent, title='찾기')

		static_find = wx.StaticText(self, -1, '찾을 내용:(&N)')
		self.tc_find = wx.TextCtrl(self, size=(150, -1), style=wx.TE_PROCESS_ENTER)
		self.tc_find.Bind(wx.EVT_TEXT_ENTER, self.OnFind)
		self.ck_upperLowerCase = wx.CheckBox(self, -1, '대/소문자 구분(&C)')
		self.ck_direction = wx.CheckBox(self, -1, '이전 방향')
		self.btn_find = wx.Button(self, wx.ID_FIND, '다음 찾기(&F)', size=(100, -1))
		btn_cancel = wx.Button(self, wx.ID_CANCEL, '취소', size=(100, -1))

		# 사이저 설정
		vbox = wx.BoxSizer(wx.VERTICAL)
		gbs = wx.GridBagSizer(vgap=5, hgap=5)
		gbs.SetFlexibleDirection(wx.BOTH)
		# gbs.AddMany([ (static_find, (0, 0), (1, 1), wx.ALL|wx.ALIGN_CENTER_VERTICAL, gap),
		# 	(self.tc_find, (0, 1), (1, 3), wx.EXPAND|wx.ALL, gap),
		# 	(self.btn_find, (0, 4), (1, 1), wx.ALL, gap),
		# 	(self.ck_upperLowerCase, (1, 0), (1, 2), wx.ALL, gap),
		# 	(btn_cancel, (1, 4), (1, 1), wx.ALL, gap),
		# 	(self.ck_direction, (2, 0), (1, 2), wx.ALL, gap) ])
		gbs.AddMany([ (static_find, (0, 0), (1, 1), wx.ALIGN_CENTER_VERTICAL),
			(self.tc_find, (0, 1), (1, 3), wx.EXPAND),
			(self.btn_find, (0, 4), (1, 1)),
			(self.ck_upperLowerCase, (1, 0), (1, 2)),
			(btn_cancel, (1, 4), (1, 1)),
			(self.ck_direction, (2, 0), (1, 2)) ])
		gbs.AddGrowableCol(1, proportion=1)
		gbs.AddGrowableRow(1, proportion=1)
		vbox.Add(gbs, 1, wx.EXPAND|wx.ALL, 10)
		self.SetSizerAndFit(vbox)
		self.Layout()
		self.Centre()

	# 엔터키로 찾기
	def OnFind(self, event):
		self.EndModal(wx.ID_FIND)

class MyApp(wx.App):
	def OnInit(self):
		dialog = Finder(None)
		if dialog.ShowModal() == wx.ID_FIND:
			find_value = dialog.tc_find.GetValue()
			print('찾을 내용:', find_value)
			upper_lower = dialog.ck_upperLowerCase.GetValue()
			print('대/소문자 구분:', upper_lower)
			direction = dialog.ck_direction.GetValue()
			print('이전 방향:', direction)
		dialog.Destroy()
		return True

if __name__ == '__main__':
	app = MyApp()
	app.MainLoop()
```
{: data-label="grid_beg_sizer.py"}

지금까지 **사이저(Sizer)**에 대해 알아보았는데요.
`wx.GridSizer`와 `wx.FlexGridSizer`는 `rows`, `cols`, `vgap`, `hgap` 인자를 사용해 선언했는데요.
**공식 문서**를 보면 `wx.GridSizer(rows, cols, gap)` 또는 `wx.GridSizer(cols, vgap, hgap)`와 같이 선언할 수도 있으니 참고하세요.
