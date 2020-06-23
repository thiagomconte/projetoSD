module.exports = {
  add: function (canal, texto, horas, minutos, segundos) {
    ArrPublicacao.push(new Publicacao(canal, texto, horas, minutos, segundos))
  },
  limpar: function () {
    ArrPublicacao = []
  },
  listar: function () {
    return this.ordena();
  },
  ordena: function () {
    return ArrPublicacao.sort(function (a, b) {
      return b["horas"] - a["horas"] || b["minutos"] - a["minutos"] || b["segundos"] - a["segundos"]
    })
  }
};

var ArrPublicacao = []
var Publicacao = function (canal, texto, horas, minutos, segundos) {
  this.canal = canal,
    this.texto = texto,
    this.horas = horas,
    this.minutos = minutos,
    this.segundos = segundos
}