package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

public class CarouselPage {

    private static final String CAROUSEL_PATH = "/api/v1/carousel";

    private final ApiClient apiClient = new ApiClient();

    public Response fetchCarousel() {
        return apiClient.get(CAROUSEL_PATH);
    }
}
