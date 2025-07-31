package ao.isptec.multimedia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // canal de saída
        config.enableSimpleBroker("/topico");
        // canal de entrada (prefixo para envios)
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // endpoint que o Angular vai conectar
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}