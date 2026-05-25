Feature: Carrossel

  Scenario: Validar retorno do carrossel
    Given acesso a API da barbearia
    When consulto a API de carrossel
    Then o status code deve ser 200
    And o JSON de carrossel deve retornar os campos obrigatorios