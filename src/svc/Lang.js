const ko = {
  login: '로그인',
  action: '편집',
  no: '번호',
  name: '이름',
  student: '학생',
  teacher: '선생님',
  age: '나이',
  score: '점수',
  // 번호   이름   나이  국어   영어  수학   사회  과학  총점     평균
  kor: '국어',
  eng: '영어',
  math: '수학',
  society: '사회',
  science: '과학',
  total: '총점',
  average: '평균',
  classname: '학과명',
  schoolname: '학교명',
  alert: {
    pre_select: '이미 선택한 항목입니다.',
    pre_select_equip: 'Equipment 항목을 먼저 선택하세요.',
    file_error_equip:
      '파일에 데이터가 없거나,\nxlsx 형식에 맞지 않는 파일입니다.',
    file_error_model:
      '파일에 데이터가 없거나,\nxml 형식에 맞지 않는 파일입니다.',
    save_error: '저장할 데이터가 없습니다.',
    save_ok: '저장되었습니다.',
  },
}

const en = {
  login: '로그인',
  alert: {
    pre_select: 'This has already been selected.',
    pre_select_equip: 'Select the Equipment item first.',
  },
}

const Lang = (iskor = true) => {
  return iskor ? ko : en
}

export default Lang
