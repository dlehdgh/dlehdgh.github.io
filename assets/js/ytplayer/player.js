/**
 * YouTube 화면해설 플레이어
 * Youtube 영상 정지 시 뜨는 '동영상 더보기' 팝업 안 뜨게 할 수 없음: url의 GET 전달 값을 수정해도 안 되고, CSS, JS로 iframe에 접근도 안 됨.
 */

window.speechSynthesis; // 

// 메시지 출력
function print(message) {
	$('#load_message').text(message);
	console.log(message);
}

(function() {
	console.log('실행');
	let check_interval;
	let descriptions = {}; // 화면해설 데이터([{시간: 해설}, ...])
	let time_stamps = []; // 화면해설 데이터의 시간 정보만 추출한 배열
	let spoken_timestamps = new Set(); // 화면해설 재생 여부를 추적할 변수
	let YOUTUBE_VIDEO_ID = ''; // 유투브 비디오 ID 값

	// GET 전달 값 가져오기
	try {
		const urlParams = new URLSearchParams(window.location.search);
		YOUTUBE_VIDEO_ID = urlParams.get('id'); // id 파라미터의 값 가져오기
		console.log('YOUTUBE_VIDEO_ID =', YOUTUBE_VIDEO_ID);
	} catch (err) {
		YOUTUBE_VIDEO_ID = '';
		console.log('❌ 오류 발생: URL에서 id 파라미터가 없습니다.');
	}

	// YouTube API 로드 후 플레이어 초기화
	window.onYouTubeIframeAPIReady = function() {
		console.log('YouTube Iframe API가 준비되었습니다.');
		// 이미 플레이어가 생성되어 있으면 중복 방지
		if (window.YTPlayer) return;
		window.YTPlayer = new YT.Player('player', {
			height: '315',
			width: '560',
			videoId: YOUTUBE_VIDEO_ID,
			playerVars: {
				'controls': 1,
				'modestbranding': 1,
				'showinfo': 0,
				'rel': 0
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	// 이미 YT가 로드된 상태(예: 캐시로 인해 API 로드가 빨랐던 경우)에 대비
	if (window.YT && window.YT.Player) {
		console.log('YT.Player가 이미 존재하므로 onYouTubeIframeAPIReady 함수를 직접 호출');
		// 콜백이 이미 호출됐을 가능성이 있으니 직접 호출
		window.onYouTubeIframeAPIReady();
	}

	// 플레이어 준비 완료 시 실행
	function onPlayerReady(event) {
		print('✅ 플레이어 준비 완료.');
		const data = window.sessionStorage.getItem('json_data');
		console.log('json data =', data);
		const result = json_check(data);
		if (typeof result === 'string') {
			alert(result);
			print(result);
			return;
		}
		descriptions = result;
		time_stamps = Object.keys(descriptions);
	}

	// 플레이어 상태 변경 시 (재생/정지 등)
	function onPlayerStateChange(event) {
		if (time_stamps.length === 0) {
			if (event.data === YT.PlayerState.PLAYING) {
				alert('화면해설 JSON 데이터가 로드되지 않았습니다.');
				print('❌ 오류 발생: JSON 데이터가 로드되지 않았습니다.');
				window.YTPlayer.pauseVideo();
			}
			return;
		}
		if (event.data === YT.PlayerState.PLAYING) {
			// 재생 상태일 때만 시간 체크 시작 (100ms 간격)
			check_interval = setInterval(checkAudioDescription, 100);
		} else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
			// 일시 정지 또는 다른 상태일 때 시간 체크 중단
			clearInterval(check_interval);
			check_interval = null;
		}
	}

	// 100ms마다 현재 시간을 체크하고 화면해설 구간인지 확인하는 핵심 로직
	function checkAudioDescription() {
		const tolerance = 0.5;
		const current_time = window.YTPlayer.getCurrentTime();
		let mode = parseInt($('#mode').val());
		if (isNaN(mode)) { // 라디오 버튼의 값이 숫자가 아닌 경우 parseInt() 함수에서 NaN을 반환
			mode = 0;
		}

		// 사용자가 되감기한 경우 현재 재생 시간보다 큰 시간을 Set에서 제거
		for (const stamp of spoken_timestamps) {
			if (stamp > current_time) {
				spoken_timestamps.delete(stamp);
			}
		}

		// 재생 시간과 일치하는 화면해설 출력
		for (const stamp in descriptions) {
			const seconds = timeToSeconds(stamp);
			// 이미 지나간 해설인지 확인
			if (spoken_timestamps.has(seconds)) {
				continue;
			}
			// 재생 시간과 화면해설 시간이 일치하는 경우
			if (current_time >= seconds && current_time < seconds + tolerance) {
				const content = descriptions[stamp];
				clearInterval(check_interval); // 시간 체크 중단
				if (mode == 0) {
					// player
					window.YTPlayer.pauseVideo(); // 유투브 영상 정지
				}
				if (mode == 2) {
					$('#subtitle').text(content); // 자막 출력
				} else {
					speak(content); // TTS로 말하기
				}
				// 한 번만 실행되도록 Set에 기록
				spoken_timestamps.add(seconds);
				break;
			}
		}
	}

	// 시간 형식을 초 단위 숫자로 변환하는 함수
	function timeToSeconds(time_str) {
		if (!time_str) return 0;
		let total_sec = 0;
		const parts = time_str.split(':');
		if (parts.length == 2) { // 분:초.밀리초 형식
			const minutes = parseFloat(parts[0]); // 분
			const seconds = parseFloat(parts[1]); // 초
			total_sec = (minutes * 60) + seconds;
		} else if (parts.length == 3) { // 시:분:초.밀리초 형식
			const hours = parseFloat(parts[0]); // 시
			const minutes = parseFloat(parts[1]); // 분
			const seconds = parseFloat(parts[2]); // 초
			total_sec = (hours * 3600) + (minutes * 60) + seconds;
		}
		return total_sec
	}

	// Web Speech API를 사용하여 TTS 재생
	function speak(message){
		const volume = parseFloat($('#tts_volume').val());
		if (isNaN(volume)) {
			volume = 0.8;
		}
		const rate = parseFloat($('#tts_speed').val());
		if (isNaN(rate)) {
			rate = 1;
		}
		let target_voice = null; // 선택한 음성
		const language = 'ko-KR';
		const voices = window.speechSynthesis.getVoices().filter(t => t.lang == 'ko-KR' && t.name.toLocaleLowerCase().includes('google'));
		const online_voices = voices.filter(t => t.lang == language && t.localService == false);
		if (online_voices.length == 0) {
			// 한국어 온라인 음성이 없을 때
			const local_voices = voices.filter(t => t.lang == language && t.localService == true); // 로컬 음성
			if (local_voices.length == 0) { // 
				print('지원하는 한국어 TTS가 없습니다.');
				return;
			}
			target_voice = local_voices[0];
		} else {
			target_voice = online_voices[0];
		}
		const utterance = new SpeechSynthesisUtterance(message);
		utterance.lang = language;
		utterance.voice = target_voice;
		utterance.rate = rate; // 음성 속도
		utterance.volume = volume; // 음성 볼륨
		// 말하기 완료 시 이벤트
		utterance.onend = () => {
			if (window.YTPlayer.getPlayerState() == YT.PlayerState.PAUSED) { // 유투브 영상이 일시정지된 상태라면
				window.YTPlayer.playVideo();
			}
		};
		window.speechSynthesis.speak(utterance);
	}

	// 모드 변경 이벤트
	$('#mode input[type="radio"]').change(function () {
		const value = $(this).val();
		const controls = $('#controls > input, #controls > select');
		if (value == 2) {
			controls.attr('disabled', true);
		} else {
			controls.attr('disabled', false);
		}
	});
})();