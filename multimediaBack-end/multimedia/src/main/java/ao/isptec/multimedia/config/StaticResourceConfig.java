package ao.isptec.multimedia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/files/**")
                .addResourceLocations("file:C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\");
    }
}
