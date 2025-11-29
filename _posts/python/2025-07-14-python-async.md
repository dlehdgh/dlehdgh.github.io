---
title: "파이썬 비동기 처리"
excerpt: ""
categories: [python]
tags:
  - 파이썬
  - Python
  - wxPython
  - 비동기
  - async
date: 2025-07-14 18:51
last_modified_at: 2025-11-15 22:14
---

파이썬에서 **wxPython**으로 GUI를 만들고 **TTS**로 말하는 기능을 구현하는 과정에서 발생한 문제와 해결 방법에 대해 기술하겠다.

## 오디오 파일 재생 시 멈추는 문제

오디오 파일을 **pygame** 라이브러리로 재생을 해주니 재생하는 동안에는 GUI가 멈춰 버리는 문제가 발생했다.

문제를 해결하기 위해 처음에는 **Thread** 처리를 해주었는데 GUI가 멈추는 문제는 해결되었지만 재생이 완료된 후 실행되어야 할 구문이 미리 실행되어 버리는 문제가 발생했다.

그래서 찾아보다 보니 **비동기 처리**를 해주면 된다는 것을 알게 되었다.

## 파이썬 비동기 처리란?

파이썬 비동기 처리는 `asyncio` 라이브러리를 기반으로 하며, `async`/`await` 문법을 사용하여 **I/O 바운드 작업**과 같이 오래 걸리는 작업을 기다리는 동안 다른 작업을 동시에 처리할 수 있게 합니다. 비동기 함수는 **코루틴**이라 불리며, `await` 키워드를 통해 실행을 일시 중단하고 다른 작업으로 제어권을 넘기는 방식으로 동작합니다. 이러한 비동기 코드를 실행하고 관리하는 핵심 주체는 **이벤트 루프**입니다. 

- `asyncio`: 파이썬의 표준 라이브러리로, 비동기 프로그래밍을 위한 다양한 도구와 `async`/`await` 문법을 제공합니다.
- **비동기 함수(코루틴)**: `async def` 키워드로 정의되는 함수입니다. 일반 함수와 달리 즉시 실행되지 않고, `await`를 만났을 때 실행이 일시 중단됩니다.
- `await`: 비동기 함수 내부에서 사용되며, 다른 비동기 작업이 완료될 때까지 현재 함수의 실행을 멈추고 제어권을 **이벤트 루프**로 넘깁니다.
- **이벤트 루프**: 비동기 작업의 실행을 스케줄링하고 관리하는 핵심 메커니즘입니다. 여러 비동기 작업을 감시하고, 준비된 작업이 실행되도록 제어합니다.
- `async with`: 비동기 컨텍스트 관리자로, 비동기 작업 중인 리소스(파일, 네트워크 연결 등)를 안전하게 관리하는 데 사용됩니다.

**동작 방식**

1. 비동기 함수(`async def`)는 코루틴 객체를 반환합니다.
1. `await` 키워드를 만나면 코루틴의 실행이 일시 중단되고, 이벤트 루프는 다른 준비된 작업을 실행합니다.
1. `await` 했던 비동기 작업이 완료되면, 원래 코루틴이 중단되었던 지점부터 다시 실행을 재개합니다.
1. 이벤트 루프는 이 과정을 반복하며 여러 작업을 동시에 처리하는 것처럼 보이게 합니다.

## 오디오 파일 재생을 비동기로 처리하기

비동기 처리를 하는 방법은 다음과 같다.

```python
import pygame

pygame.mixer.init(frequency=30000)

# 오디오 파일 재생 함수
async def soundplay_async(path: str):
	if not os.path.exists(path): # 파일이 없는 경우
		return
	pygame.mixer.music.load(path)
	pygame.mixer.music.play()
	while pygame.mixer.music.get_busy():
		await asyncio.sleep(0.1)

await soundplay_async('sample.mp3')
```

위 코드를 실행해 보면 오류가 나는 것을 확인할 수 있다. 비동기 함수는 **이벤트 루프**에서 동작하기 때문에 호출 과정이 까다롭다.

## GUI 이벤트로 비동기 처리하기

비동기 처리를 위해서는 이벤트 루프와 연결해줘야 하는데 GUI의 이벤트 루프에서 실행하는 방법은 다음과 같다.

```python
pygame.mixer.init()

class MyFrame(wx.Frame):

	# ... 생략 ...

	def on_play(self, event):
		asyncio.run(self.play_process())

	async def soundplay(self, file_path):
		pygame.mixer.music.load(file_path)
		pygame.mixer.music.play()
		while pygame.mixer.music.get_busy():
			await asyncio.sleep(0.1)

	async def play_process(self):
		await self.soundplay('sample.mp3')
		wx.CallAfter(lambda: wx.MessageBox('오디오가 재생되었습니다!', '알림'))
```

- 이벤트 함수에서 비동기 함수를 실행할 때는 `asyncio.run(함수)`로 호출하면 된다.
- 비동기 함수 내에서 다른 비동기 함수를 호출할 때는 함수명 앞에 **await**를 붙이면 된다.
- 비동기 함수 내에서는 `time.sleep(0.1)` 함수가 동작하지 않으므로 `await asyncio.sleep(0.1)`로 대체한다.
- 비동기 함수 내에서 다른 함수를 호출하려면 `wx.CallAfter(함수, 함수로 전달할 인자)`로 사용하면 된다.

## GUI 이벤트 없이 비동기 처리하기

하지만 내 경우 이벤트 함수 내에서 실행하는 것이 아니여서 다음과 같이 사용했다.

```python
class MyFrame(wx.Frame):
	def __init__(self):
		# ... 생략 ...

		# 새로운 이벤트 루프 생성
		self.loop = asyncio.new_event_loop()
		asyncio.set_event_loop(self.loop)

		# wxPython의 IDLE 이벤트 사용
		self.Bind(wx.EVT_IDLE, self.on_idle)

	# ... 생략 ...

	def play(self):
		self.loop.create_task(self.play_process())

	# wxPython이 IDLE 상태일 때 asyncio 이벤트 루프 실행
	def on_idle(self, event):
		try:
			self.loop.run_until_complete(asyncio.sleep(0))
		except Exception as e:
			print('ERROR: Asyncio 루프 실행 중 오류 발생:', e)
```

## gTTS로 말하기

**gTTS**는 구글 음성 합성 기능을 이용해서 텍스트를 음성 파일로 변환하는 도구이다.

처음에는 **gTTS**를 이용해서 **temp.mp3** 파일로 저장한 뒤 재생하게 하였는데 **pygame** 라이브러리에서 재생이 완료되어도 재생한 파일을 계속 사용 중이어서 다음에 말하기를 하면 사용 중인 파일을 사용하려고 하니 오류가 발생하게 되었다.

그래서 재생이 완료되면 **pygame**을 초기화하고 사용한 파일을 삭제해줘야 해서 **임시 파일**로 처리하도록 수정했다.

```python
import os
import tempfile
import pygame
from gtts import gTTS

pygame.mixer.init()

async def soundplay_async(file_path: str):
	pygame.mixer.music.load(file_path)
	pygame.mixer.music.play()
	while pygame.mixer.music.get_busy():
		await asyncio.sleep(0.1)

async def speak(self, text: str):
	if not text:
		return
	# 임시 파일 생성
	with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
		temp_file_path = temp_file.name
	try:
		tts = gTTS(text=text, lang='ko', slow=False)
		tts.save(temp_file_path)
		await soundplay_async(temp_file_path)
	finally:
		# 임시 파일 삭제
		if os.path.exists(temp_file_path):
			pygame.mixer.quit()
			pygame.mixer.init()
			os.remove(temp_file_path)
```

> **gTTS**로 저장한 파일의 속도가 느려서 **ffmpeg**를 이용해서 속도를 조절해보니 목소리가 변조되고, 변환 과정을 거치다 보니 딜레이 시간이 좀 걸린다는 문제가 있었다.
{: .notice--primary}

## pyttsx3로 말하기

**pyttsx3**는 **Windows SAPI TTS**를 이용해 말하기 기능을 구현하는 라이브러리이다.

**gTTS**는 너무 느려서 **pyttsx3**를 적용해 보았다.

```python
import os
import tempfile
import pygame
import pyttsx3
from gtts import gTTS

pygame.mixer.init()

async def soundplay_async(file_path: str):
	pygame.mixer.music.load(file_path)
	pygame.mixer.music.play()
	while pygame.mixer.music.get_busy():
		await asyncio.sleep(0.1)

class SpeechEngine:
	def __init__(self):
		self.engine = pyttsx3.init() # pyttsx3 엔진 초기화(한 번만 수행)

	async def speak(self, text: str):
		if not text:
			return
		# 임시 파일 생성
		with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
			temp_file_path = temp_file.name
		# SAPI TTS로 말하기
		try:
			self.sapi_save(text, temp_file_path) # 텍스트를 음성으로 변환하여 임시 파일에 저장
			await soundplay_async(temp_file_path)
		finally:
			# 임시 파일 삭제
			if os.path.exists(temp_file_path):
				pygame.mixer.quit()
				pygame.mixer.init()
				os.remove(temp_file_path)

	def sapi_save(self, text: str, file_path: str, **kwargs):
		if not text and not file_path:
			return
		try:
			for option, value in kwargs.items():
				self.engine.setProperty(option, value)
		except Exception as e:
			voices = self.engine.getProperty('voices')
			voice = [voice.id for voice in voices if 'korea' in voice.name.lower()]
			if not voice:
				print('ERROR: speak: 한국어 음성이 없음')
				return
			self.engine.setProperty('voice', voice[-1])
		self.engine.save_to_file(text, file_path)
		self.engine.runAndWait()

	def gtts_save(self, text: str, file_path: str):
		tts = gTTS(text=text, lang='ko', slow=False)
		tts.save(file_path)
```

위에서 생성한 **SpeechEngine** 클레스를 **wxPython**의 클레스 내에서 `self.tts = SpeechEngine()`로 선언한 뒤 사용하면 된다.

> **gTTS**는 **.mp3** 파일로 저장하고 **pyttsx3**은 **.wav** 파일로 저장해야 한다.  
> **pyttsx3**의 `.say()` 함수를 **비동기 처리**해서 사용하려고 했으나 제대로 동작하지 않았다. 그래서 찾아보니 **pyttsx**의 `.say()` 함수가 **동기 방식으로 동작**하기 때문에 비동기 처리가 되지 않는 것이었다.
{: .notice--warning}
