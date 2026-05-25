Feature: Criar agendamento

  Scenario: Criar agendamento com sucesso
    Given acesso a API da barbearia
    When realizo um novo agendamento valido
    Then o agendamento deve ser criado com sucesso