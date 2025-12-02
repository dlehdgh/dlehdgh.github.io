---
title: "YouTube 화면해설 플레이어"
layout: archive
permalink: /tools/ytb-player/
excerpt: ""
toc: false
last_modified_at: 2025-11-29 11:33
scripts:
  - https://www.youtube.com/iframe_api
  - /assets/js/ytplayer/player.min.js
---

<style>
	#controls > label {
		display: inline-block;
		padding: 0.5rem;
	}
</style>
<!-- 메시지 출력 -->
<div id="load_message" class="alert alert-primary mt-2"></div>
<!-- 유투브 플레이어 -->
<div id="player"></div>
<!-- 영상 자막 출력 -->
<span class="visually-hidden">화면해설 자막:</span>
<div id="subtitle" class="notice--primary" aria-live="assertive" tabindex="0"></div>
<hr>
<!-- 화면해설 제어 -->
<div id="controls">
	<label for="mode">화면해설 모드</label>
	<select id="mode">
		<option value="0">TTS로 말하기(정지 후)</option>
		<option value="1">TTS로 말하기(재생 중)</option>
		<option value="2">화면해설 자막</option>
	</select>
	<br>
	<label for="tts_volume">TTS 볼륨</label>
	<input type="range" id="tts_volume" min="0" max="1" step="0.1" value="0.8" style="width: auto;">
	<br>
	<label for="tts_speed">TTS 속도</label>
	<select id="tts_speed">
		<option value="0.25">0.25</option>
		<option value="0.5">0.5</option>
		<option value="0.75">0.75</option>
		<option value="1.0" selected>1.0 (보통)</option>
		<option value="1.25">1.25</option>
		<option value="1.5">1.5</option>
		<option value="1.75">1.75</option>
		<option value="2.0">2.0</option>
	</select>
</div>
<a href="{{ '/tools/ytb-commentary/' | relative_url }}" class="btn btn--success">이전으로</a>
