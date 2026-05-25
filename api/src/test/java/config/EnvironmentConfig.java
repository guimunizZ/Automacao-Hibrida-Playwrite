package config;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.Objects;
import java.util.Properties;

public final class EnvironmentConfig {

    private static final String DEFAULT_ENV = "preview";
    private static final String ENV_PROPERTY = "env";
    private static final String BASE_URL_PROPERTY = "base.url";
    private static final String RESOURCE_TEMPLATE = "environments/%s.properties";

    private static EnvironmentConfig instance;

    private final Properties properties = new Properties();
    private final String environment;

    private EnvironmentConfig() {
        environment = System.getProperty(ENV_PROPERTY, DEFAULT_ENV).trim().toLowerCase();
        loadProperties();
    }

    public static synchronized EnvironmentConfig getInstance() {
        if (instance == null) {
            instance = new EnvironmentConfig();
        }
        return instance;
    }

    public static synchronized void reload() {
        instance = new EnvironmentConfig();
    }

    public String getEnvironment() {
        return environment;
    }

    public String getBaseUrl() {
        String overriddenBaseUrl = System.getProperty(BASE_URL_PROPERTY);
        if (overriddenBaseUrl != null && !overriddenBaseUrl.isBlank()) {
            return sanitizeUrl(overriddenBaseUrl);
        }

        return sanitizeUrl(Objects.requireNonNull(
                properties.getProperty(BASE_URL_PROPERTY),
                "A propriedade base.url deve estar definida para o ambiente " + environment
        ));
    }

    private void loadProperties() {
        String resourcePath = RESOURCE_TEMPLATE.formatted(environment);

        try (InputStream stream = Thread.currentThread()
                .getContextClassLoader()
                .getResourceAsStream(resourcePath)) {

            if (stream == null) {
                throw new IllegalStateException("Nao foi possivel localizar o arquivo de ambiente: " + resourcePath);
            }

            properties.load(stream);
        } catch (IOException exception) {
            throw new UncheckedIOException("Falha ao carregar o ambiente: " + environment, exception);
        }
    }

    private String sanitizeUrl(String value) {
        return value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
    }
}
