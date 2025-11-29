// 유투브 ID와 JSON 데이터를 플레이어로 전송
function video_generate() {
	const action_file = '/ytb-player/';
	const url = $('#youtube_url').val();
	if (!url) {
		alert('유투브 URL을 입력해주세요.');
		return;
	}
	// URL에서 VIDEO ID 추출
	let video_id = null;
	const urlObj = new URL(url);
	if (urlObj.hostname.includes('youtu.be')) {
		video_id = urlObj.pathname.slice(1);
	} else if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
		video_id = urlObj.searchParams.get('v');
	} else {
		alert('유투브 URL이 올바르지 않습니다. (ex: https://youtu.be/...)');
		return;
	}

	const json_file_input = document.getElementById('json_file'); // 파일 첨부 요소
	// 탭 인덱스 확인 (0: 파일 첨부, 1: 직접 입력)
	const tabs = $('details[name="tab-pane"]');
	const index = tabs.index(tabs.filter('[open]'));
	if (index === 0) { // 파일 첨부
		const file = json_file_input.files[0];
		if (!file) {
			alert('유투브 화면해설용 JSON 파일을 선택해주세요.');
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target.result;
			const result = json_check(content);
			if (typeof result === 'string') {
				alert(result);
				console.log(result);
				return;
			}
			console.log('action_file =', action_file, '\nvideo_id =', video_id, `\nmove url = ${action_file}?id=${video_id}\ncontent =`, content);
			try {
				window.sessionStorage.setItem('json_data', JSON.stringify(result));
				window.location.href = `${action_file}?id=${video_id}`;
			} catch (err) {
				console.error('sessionStorage 저장 실패:', err.message);
				alert('세션 저장 실패: ' + err.message);
				return;
			}
		};
		reader.readAsText(file);
	} else if (index === 1) { // 직접 입력 방식 (동기 처리)
		const content = $('#json_code').val().trim();
		const result = json_check(content);
		if (typeof result === 'string') {
			alert(result);
			console.log(result);
			return;
		}
		console.log('action_file =', action_file, '\nvideo_id =', video_id, `\nmove url = ${action_file}?id=${video_id}\ncontent =`, content);
		try {
			window.sessionStorage.setItem('json_data', JSON.stringify(result));
			window.location.href = `${action_file}?id=${video_id}`;
		} catch (err) {
			console.error('sessionStorage 저장 실패:', err.message);
			alert('세션 저장 실패: ' + err.message);
			return;
		}
	} else {
		console.log('유효하지 않은 입력 방식입니다.');
	}
}

$(function () {
	$('#create-video').click(video_generate);
});