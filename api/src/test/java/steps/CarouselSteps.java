package steps;

import core.ScenarioContext;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import pages.CarouselPage;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class CarouselSteps {

    private final ScenarioContext context = ScenarioContext.getInstance();
    private final CarouselPage carouselPage = new CarouselPage();

    @When("consulto a API de carrossel")
    public void consultoAApiDeCarrossel() {
        Response response = carouselPage.fetchCarousel();
        context.setLastResponse(response);

        System.out.println("RESPONSE CAROUSEL:");
        System.out.println(response.getBody().asPrettyString());
    }

    @Then("o JSON de carrossel deve retornar os campos obrigatorios")
    public void oJsonDeCarrosselDeveRetornarOsCamposObrigatorios() {

        Response response = context.getLastResponse();

        // 🔥 CORREÇÃO PRINCIPAL → acessar "data"
        List<Map<String, Object>> items = response.jsonPath().getList("data");

        assertNotNull(items, "Campo 'data' não deve ser nulo");
        assertFalse(items.isEmpty(), "Lista de carrossel não deve estar vazia");

        items.forEach(this::validarCampos);
    }

    private void validarCampos(Map<String, Object> item) {

        // 🔥 CAMPOS REAIS DA API
        assertNotNull(item.get("id"), "Campo id é obrigatório");
        assertNotNull(item.get("image_url"), "Campo image_url é obrigatório");
        assertNotNull(item.get("display_order"), "Campo display_order é obrigatório");
        assertNotNull(item.get("active"), "Campo active é obrigatório");

        // ⚠ description pode ser null (como vimos no JSON)
        assertTrue(item.containsKey("description"), "Campo description deve existir");
    }
}