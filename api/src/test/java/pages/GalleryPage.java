package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

public class GalleryPage {

    private static final String GALLERY_PATH = "/api/gallery";

    private final ApiClient apiClient = new ApiClient();

    public Response listGalleryItems() {
        return apiClient.get(GALLERY_PATH);
    }
}
