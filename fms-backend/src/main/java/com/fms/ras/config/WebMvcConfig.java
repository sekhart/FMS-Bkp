package com.fms.ras.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * <pre>
 * Revision History:
 * Version Date             Author           	Changes
 * -----------------------------------------------------------------------------
 * 1.0     30 Aug 2020       Sekhar		Initial coding
 *
 * </pre>
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*")
                .allowedMethods("HEAD", "POST", "PUT", "OPTIONS", "GET", "PATCH", "DELETE").maxAge(MAX_AGE_SECS);
    }
}
