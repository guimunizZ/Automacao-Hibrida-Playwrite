package interactions;

import config.EnvironmentConfig;
import core.ScenarioContext;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;

public class ApiClient {

    private final ScenarioContext context = ScenarioContext.getInstance();

    public Response get(String path) {
        return execute("GET", path, null, Map.of());
    }

    public Response get(String path, Map<String, ?> queryParams) {
        return execute("GET", path, null, queryParams);
    }

    public Response post(String path, Object body) {
        return execute("POST", path, body, Map.of());
    }

    public Response put(String path, Object body) {
        return execute("PUT", path, body, Map.of());
    }

    public Response delete(String path) {
        return execute("DELETE", path, null, Map.of());
    }

    private Response execute(String method, String path, Object body, Map<String, ?> queryParams) {
        RequestSpecification request = RestAssured
                .given()
                .baseUri(EnvironmentConfig.getInstance().getBaseUrl())
                .headers(context.getDefaultHeaders())
                .queryParams(queryParams)
                .log().ifValidationFails();

        if (body != null) {
            request.contentType(ContentType.JSON);
            request.body(body);
        }

        Response response = switch (method) {
            case "GET" -> request.get(path);
            case "POST" -> request.post(path);
            case "PUT" -> request.put(path);
            case "DELETE" -> request.delete(path);
            default -> throw new IllegalArgumentException("Metodo HTTP nao suportado: " + method);
        };

        context.setLastEndpoint(path);
        context.setLastResponse(response);
        return response;
    }
}
