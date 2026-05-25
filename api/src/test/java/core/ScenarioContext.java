package core;

import io.restassured.response.Response;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

public final class ScenarioContext {

    private static final ThreadLocal<ScenarioContext> HOLDER = ThreadLocal.withInitial(ScenarioContext::new);

    private final Map<String, Object> scenarioData = new LinkedHashMap<>();
    private final Map<String, String> defaultHeaders = new LinkedHashMap<>();
    private Response lastResponse;
    private String lastEndpoint;

    private ScenarioContext() {
    }

    public static ScenarioContext getInstance() {
        return HOLDER.get();
    }

    public void reset() {
        scenarioData.clear();
        defaultHeaders.clear();
        lastResponse = null;
        lastEndpoint = null;
    }

    public void put(String key, Object value) {
        scenarioData.put(key, value);
    }

    public Object get(String key) {
        return scenarioData.get(key);
    }

    public Map<String, String> getDefaultHeaders() {
        return new LinkedHashMap<>(defaultHeaders);
    }

    public void setDefaultHeader(String key, String value) {
        defaultHeaders.put(key, value);
    }

    public Response getLastResponse() {
        return lastResponse;
    }

    public void setLastResponse(Response lastResponse) {
        this.lastResponse = lastResponse;
    }

    public Optional<String> getLastEndpoint() {
        return Optional.ofNullable(lastEndpoint);
    }

    public void setLastEndpoint(String lastEndpoint) {
        this.lastEndpoint = lastEndpoint;
    }
}
