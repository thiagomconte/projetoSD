module.exports = {
    add: function (canal, mensagens) {
      ArrPublicacao.push(new Publicacao(canal, mensagens))
    },
    limpar: function () {
      ArrPublicacao = []
    },
    listar: function(){
        return ArrPublicacao;
    }
  };

  var ArrPublicacao = []
  var Publicacao = function(canal,mensagens){
    this.canal = canal,
    this.mensagens = mensagens
}