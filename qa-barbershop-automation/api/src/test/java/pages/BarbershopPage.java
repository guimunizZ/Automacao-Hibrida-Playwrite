package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

public class BarbershopPage {

    private static final String BARBERSHOPS_PATH = "/api/barbershops";

    private final ApiClient apiClient = new ApiClient();

    public Response listBarbershops() {
        return apiClient.get(BARBERSHOPS_PATH);
    }
}
