package hac.configuration;
import hac.beans.ShoppingCart;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

/**
 * create some beans witn various scopes using QUALIFIERS (method names)
 * since there are multiple methods for creating Label beans, we will need to use @Qualifier
 * to specify which one we want to use
 */
@Configuration
public class BeansConfiguration {
    @Bean
    @SessionScope
    public ShoppingCart shoppingCartBean() {
        return new ShoppingCart();
    }


}