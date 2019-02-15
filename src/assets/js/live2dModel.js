var live2dModel = function (n=0) {

  let ModelList = [{
    model: "https://cdn.jsdelivr.net/gh/pma934/myCDN@1.0.0/live2D/Pio/model.json",
    img: 'https://cdn.jsdelivr.net/gh/pma934/myCDN@1.0.0/live2D/Pio/textures/texture (' + Math.ceil(Math.random() * 92) + ').png'
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json"
  }, {
    model: "https://cdn.jsdelivr.net/gh/pma934/myCDN@1.0.0/live2D/Tia/model.json",
    img:"https://cdn.jsdelivr.net/gh/pma934/myCDN@1.0.0/live2D/Tia/textures/texture (" + Math.ceil(Math.random() * 3) + ").png"
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-isuzu@1.0.4/assets/model.json"
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json"
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json"
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json"
  }, {
    model: "https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json"
  }]

  let num = n % ModelList.length;
  let Model = ModelList[num]

  return Model
}
export {
  live2dModel
}
