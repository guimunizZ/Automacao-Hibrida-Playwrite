package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

public class EventPage {

    private static final String EVENTS_PATH = "/api/events";

    private final ApiClient apiClient = new ApiClient();

    public Response listEvents() {
        return apiClient.get(EVENTS_PATH);
    }
}
