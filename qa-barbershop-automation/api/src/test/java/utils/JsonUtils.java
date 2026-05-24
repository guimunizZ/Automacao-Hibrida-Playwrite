package utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public final class JsonUtils {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private JsonUtils() {
    }

    public static String toJson(Object payload) {
        try {
            return OBJECT_MAPPER.writeValueAsString(payload);
        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("Falha ao serializar o payload para JSON", exception);
        }
    }

    public static Map<String, Object> toMap(String payload) {
        try {
            return OBJECT_MAPPER.readValue(payload, new TypeReference<>() {
            });
        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("Falha ao converter o payload para Map", exception);
        }
    }

    public static <T> T fromJson(String payload, Class<T> clazz) {
        try {
            return OBJECT_MAPPER.readValue(payload, clazz);
        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("Falha ao desserializar o JSON", exception);
        }
    }
}
