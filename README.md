// DECISÕES DE NORMALIZAÇÃO:
//
// 1FN — Atomicidade:
//   • Provincia e Municipio extraídos para tabelas próprias.
//     Antes: provincia VARCHAR(30) repetido em Doador e Hospital.
//     Depois: FK id_municipio → Municipio(id_municipio), que por sua
//     vez aponta para Provincia. Elimina redundância e garante
//     consistência geográfica.
//   • Todos os campos são atómicos (sem listas nem grupos repetidos).
//
// 2FN — Dependência total da chave primária:
//   • telefone_destino removido de Notificacao: depende do Doador,
//     não de id_notificacao. O telefone é obtido via JOIN com Doador.
//   • tipo_sanguineo e quantidade_bolsas removidos de Mensagem:
//     dependem do "pedido entre hospitais", não da mensagem em si.
//     Criada entidade PedidoEntreHospitais separada.
//
// 3FN — Sem dependências transitivas:
//   • nivel removido de EstatisticaDoador: era determinado por pontuacao
//     (transitiva). Substituído por RegraClassificacao que define as
//     faixas; o nível é calculado na aplicação.
//   • data_ultima_doacao removido de Doador: é derivado de
//     MAX(data_doacao) em HistoricoDoacao. Elimina anomalias de update.
//   • total_doacoes, vidas_salvas, total_centros em EstatisticaDoador
//     são caches INTENCIONAIS documentados (performance), atualizados
//     por serviço/trigger sempre que HistoricoDoacao é alterado.
//
// =============================================================