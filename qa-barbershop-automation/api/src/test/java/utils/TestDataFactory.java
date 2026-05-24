package utils;

import java.util.HashMap;
import java.util.Map;

public class TestDataFactory {

    public static Map<String, Object> appointmentPayload() {

        // 🔥 MODO DEBUG → ALTERE AQUI
        String manualDate = "2026-05-15T10:00:00Z";

        Map<String, Object> payload = new HashMap<>();

        payload.put("userId", "cmli9su950000jv047e9whspg");
        payload.put("serviceId", "4a6936f3-3f5f-4c7f-8d63-f79847fdb38d");
        payload.put("barberId", "2");
        payload.put("barbershopId", "2");
        payload.put("date", manualDate);

        System.out.println("📅 Data usada (manual): " + manualDate);

        return payload;
    }
}