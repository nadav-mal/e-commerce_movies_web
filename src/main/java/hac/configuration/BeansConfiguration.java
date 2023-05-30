
package hac.configuration;

import hac.beans.ShoppingCart;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

/**
 The BeansConfiguration class defines the bean configurations for the application.
 */
@Configuration
public class BeansConfiguration {

    /**
     Creates a ShoppingCart bean with session scope.
     @return The ShoppingCart bean.
     */
    @Bean
    @SessionScope
    public ShoppingCart shoppingCartBean() {
        return new ShoppingCart();
    }
}