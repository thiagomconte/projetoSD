module.exports = {
  add: function (canal, mensagens, horas, minutos, segundos) {
    ArrPublicacao.push(new Publicacao(canal, mensagens, horas, minutos, segundos))
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
var Publicacao = function (canal, mensagens, horas, minutos, segundos) {
  this.canal = canal,
    this.mensagens = mensagens,
    this.horas = horas,
    this.minutos = minutos,
    this.segundos = segundos
}