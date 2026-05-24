package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

public class HealthPage {

    private final ApiClient apiClient = new ApiClient();

    public Response fetchLandingPage() {
        return apiClient.get("/");
    }
}
