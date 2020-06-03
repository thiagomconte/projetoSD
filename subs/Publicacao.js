module.exports = {
    add: function (canal, texto) {
      ArrPublicacao.push(new Publicacao(canal, texto))
    },
    limpar: function () {
      ArrPublicacao = []
    },
    listar: function(){
        return ArrPublicacao;
    }
  };

  var ArrPublicacao = []
  var Publicacao = function(canal,texto){
    this.canal = canal,
    this.texto = texto
}