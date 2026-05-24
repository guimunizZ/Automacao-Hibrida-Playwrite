package pages;

import interactions.ApiClient;
import io.restassured.response.Response;

import java.util.Map;

public class AppointmentPage {

    // ✅ endpoint REAL
    private static final String APPOINTMENTS_PATH = "/api/v1/bookings";

    private final ApiClient apiClient = new ApiClient();

    public Response createAppointment(Map<String, Object> payload) {
        return apiClient.post(APPOINTMENTS_PATH, payload);
    }
}