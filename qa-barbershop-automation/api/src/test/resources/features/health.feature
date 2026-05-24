@smoke @critical
Feature: Disponibilidade do ambiente
  Como time de QA
  Quero validar que a aplicacao da Barbearia Muniz responde no ambiente configurado
  Para garantir uma checagem rapida antes de expandir a suite

  Scenario: Validar acesso ao ambiente configurado
    Given acesso a API da barbearia
    When consulto a disponibilidade do ambiente
    Then o status code deve ser 200
    And a resposta deve conter o texto "Barbearia Muniz"
