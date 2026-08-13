---
title: "YouTube 화면해설 생성하기"
layout: archive
permalink: /tools/ytb-commentary/
excerpt: ""
toc: false
last_modified_at: 2025-11-29 11:03
scripts:
  - /assets/js/ytplayer/generate.min.js
---

## 🎬 Gemini 기반 YouTube 화면해설 플레이어 사용 안내

이 플레이어는 **Gemini의 강력한 분석 능력**을 활용해 YouTube 영상에 **화면해설(Audio Description)**을 제공합니다. 아래 단계에 따라 쉽게 이용할 수 있습니다.

1. 화면해설이 필요한 **YouTube 영상 URL**과 **화면해설용 프롬프트**를 Gemini에 전달합니다.
1. Gemini가 생성한 **JSON 형식의 화면해설 대본**을 복사합니다.
1. **YouTube 영상 URL**을 입력하고, **JSON 데이터**를 파일로 업로드하거나 직접 입력합니다.
1. **‘생성하기’ 버튼**을 누르면 플레이어 페이지가 열리고, YouTube 영상이 표시됩니다.
1. 원하는 **화면해설 모드**를 선택합니다.
   - **TTS로 말하기(정지 후)**: 화면해설 타이밍에 영상이 자동으로 멈추고, TTS로 읽어줍니다.
   - **TTS로 말하기(재생 중)**: 영상은 계속 재생되며 TTS로 화면해설을 읽어줍니다.
   - **화면해설 자막**: 화면해설 내용을 자막처럼 별도 영역에 표시하여 스크린리더가 읽을 수 있습니다.
1. 이제 영상 재생 중 필요한 시점마다 자동으로 화면해설이 재생되어, 더 접근성 높은 경험을 제공합니다.

[유투브 프롬프트 보기]({{ '/tools/ytb-prompt/' | relative_url }}){: .btn.btn--warning target="_blank"}

## 📝 YouTube 화면해설 생성기

<p>
	<label for="youtube_url">YouTube URL</label>
	<input type="url" id="youtube_url">
</p>
<p>
	<details name="tab-pane" class="collapse collapse-primary">
		<summary>파일 첨부</summary>
		<label for="json_file">JSON 파일:</label>
		<input type="file" id="json_file" accept=".json">
	</details>
	<details name="tab-pane" class="collapse collapse-primary">
		<summary>직접 입력</summary>
		<label for="json_code">JSON 코드:</label>
		<textarea id="json_code" name="json_code" cols="100" rows="10"></textarea>
	</details>
</p>
<p>
	<button type="button" id="create-video" class="btn btn--primary">재생하기</button>
</p>