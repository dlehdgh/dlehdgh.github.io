// JSON 데이터가 유효한지 체크
function json_check(content) {
	/* JSON 데이터에 문제가 있으면 오류 메시지를 반환하고, 문제가 없으면 null을 반환 */
	if (!content) {
		return '❌ JSON 데이터가 없습니다.';
	}
	let data;
	try {
		data = JSON.parse(content);
	} catch (err) {
		return '❌ JSON 파싱 실패: ' + err.message;
	}
	// 객체인지 검사(배열, null 제외)
	if (typeof data !== 'object' || data === null || Array.isArray(data)) {
		return '❌JSON 데이터가 객체(Object)가 아닙니다.';
	}
	return data;
}