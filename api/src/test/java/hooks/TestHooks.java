package hooks;

import config.EnvironmentConfig;
import core.ScenarioContext;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.restassured.RestAssured;
import io.restassured.response.Response;

public class TestHooks {

    private final ScenarioContext context = ScenarioContext.getInstance();

    // ✅ COOKIE REAL (igual Postman)
    private static final String AUTH_COOKIE =
            "__Host-next-auth.csrf-token=cfe28a45ba17b0fdad50eb641a026bf0df815931c1d239df6d28fa9c4fdb3fc8%7Cef7d6ea0afba3f75db718d74a0d2378cff7e27fa341d99201158924f50b55623; " +
                    "__Secure-next-auth.callback-url=https%3A%2F%2Fpreview-barbeariamuniz.vercel.app%2F; " +
                    "__Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..VRoVyFucTqteflA3.bdzaWNRwdRBqGqSYz46t4sZZy-VSfwtvPJhPsyGe4fYMna56YxxYviEcG0YHvuBqbB6wtFQVE8DuLzmOfR1zmrmjxpBNQorhGvBIZ45bq6HvckKHk8e4cn_rxpP0TwG5hvYuksHb7X65CP0zqGBwstx0U86dNxMoRMUVyuygm_G3MZ-Dxann5OOEzwFGENtVM4OcUeyEpRVnFNPSST2_tw-hcERovNePnIu8vLBPMqlEoni6HFTFwN7WNXeVCWrB_MIFbrBkLE6pOTcAL9gbhZoXGIz9xJ7QHK0AVaAJ80TIjl0jj63CEvWSrbqn2taElpY0npn9icTtWM5tLXBo8WRR6q7WTLbKYZeg_-uCM6i8GaupkhhgeY9EzmISjbzFtEN72S8jPZ9lp5uVEjkDcvPNB2flQLOEIFKBBseoT0LUF3UEdxd9kyzaDZAMtc6MT5lVPNaKEM8gDQ8._jyuekh_otzCmCb9sOleDg";

    @Before
    public void setup(Scenario scenario) {
        EnvironmentConfig.reload();
        context.reset();

        RestAssured.baseURI = EnvironmentConfig.getInstance().getBaseUrl();

        context.setDefaultHeader("Accept", "*/*");
        context.setDefaultHeader("User-Agent", "qa-barbershop-automation");

        // 🔥 AUTENTICAÇÃO GLOBAL
        context.setDefaultHeader("Cookie", AUTH_COOKIE);

        scenario.log("Base URL: " + RestAssured.baseURI);
        scenario.log("Cookie aplicado");
    }

    @After
    public void tearDown(Scenario scenario) {
        Response response = context.getLastResponse();

        if (response != null) {
            scenario.log("Endpoint: " + context.getLastEndpoint().orElse("N/A"));
            scenario.log("Status: " + response.statusCode());
            scenario.log("Body: " + response.getBody().asPrettyString());
        }

        context.reset();
    }
}