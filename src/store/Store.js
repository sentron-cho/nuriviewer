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
    fromData: (json) => {
      shipid = json
      model = json.model
    },
  }
}

export default Store
