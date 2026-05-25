package steps;

import core.ScenarioContext;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import pages.AppointmentPage;
import utils.TestDataFactory;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class AppointmentSteps {

    private final ScenarioContext context = ScenarioContext.getInstance();
    private final AppointmentPage appointmentPage = new AppointmentPage();

    @When("realizo um novo agendamento valido")
    public void realizoUmNovoAgendamentoValido() {

        Map<String, Object> payload = TestDataFactory.appointmentPayload();

        Response response = appointmentPage.createAppointment(payload);

        // 🔥 DEBUG REAL (NUNCA TIRE ISSO AGORA)
        System.out.println("REQUEST:");
        System.out.println(payload);

        System.out.println("RESPONSE:");
        System.out.println(response.getBody().asPrettyString());

        context.setLastResponse(response);
    }

    @Then("o agendamento deve ser criado com sucesso")
    public void validarCriacao() {
        Response response = context.getLastResponse();

        assertEquals(201, response.statusCode(), "Falha ao criar agendamento");

        Object id = response.jsonPath().get("id");

        if (id == null) {
            id = response.jsonPath().get("data.id");
        }

        assertNotNull(id, "ID não retornado");
    }
}