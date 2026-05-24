package steps;

import core.ScenarioContext;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.restassured.response.Response;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommonSteps {

    private final ScenarioContext context = ScenarioContext.getInstance();

    @Given("acesso a API da barbearia")
    public void acessoAApi() {
        context.put("service", "barbearia");
    }

    @Then("o status code deve ser {int}")
    public void validarStatus(int statusCode) {
        Response response = context.getLastResponse();
        assertEquals(statusCode, response.statusCode());
    }
}