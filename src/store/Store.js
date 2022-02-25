const Store = () => {
  /*
      Store는 global 저장소로 활용하며
      변수는 기본적으로 private로 설정한다.
      또한 Store 접근의 기본적인 규칙은
      MainFrame과 바로 자식 노드 view 에서만 
      접근하는 것으로 규칙을 정하자.
    */
  var shipid = ''
  var model = null

  return {
    getShipid: () => {
      return shipid
    },
    setShipid: (value) => {
      shipid = value
    },
    getModel: () => {
      return model
    },
    setModel: (data = {}) => {
      model = data
    },
    clear: () => {
      model = null
    },
    toData: () => {
      return { shipid, model }
    },
    fromData: (data) => {
      // ==========================================================
      // 전자공학과 선생님 : 홍길동(30) 학생: 10명	총점: 2020 평균: 40.4

      // ----------------------------------------------------------
      // 번호   이름   나이  국어   영어  수학   사회  과학  총점     평균
      // ----------------------------------------------------------
      //  1   박철수   30   53   53   53   53   53  265	 53.0
      //  2   김영희   30   36   36   36   36   36  180	 36.0
      //  3   김영희   30   82   82   82   82   82  410	 82.0
      //  4   김영희   30   80   80   80   80   80  400	 80.0
      //  5   김영희   30   66   66   66   66   66  330	 66.0
      //  6   박철수   30    9    9    9    9    9   45	  9.0
      //  7   김영희   30    0    0    0    0    0    0	  0.0
      //  8   김영희   30   32   32   32   32   32  160	 32.0
      //  9   박철수   30   15   15   15   15   15   75	 15.0
      // 10   박철수   30   31   31   31   31   31  155	 31.0

      // ==========================================================

      if (!data) return

      const text = data
        .replace(/=/gi, '')
        .replace(/-/gi, '')
        .replace(/\t/gi, '')
        .replace(/ +(?= )/g, '')
        .replace(/ /gi, '#')

      let list = text.split('\n').filter((a) => a !== '')
      list = list.filter((a) => a.indexOf('번호') < 0)
      // console.dir(list)

      let items = []
      let arrs = []
      let classname = ''

      list.forEach((item, index) => {
        if (item.indexOf('선생님') > 0) {
          classname = item.substr(0, item.indexOf('선생님') - 1)
          if (index <= 0) return

          items.push(arrs)
          arrs = []
        } else {
          arrs.push(classname + item)
        }
      })

      // console.dir(items)
      model = items
    },
  }
}

export default Store
