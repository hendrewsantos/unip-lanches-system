package com.lanche.lanchonete_api.config;

import com.lanche.lanchonete_api.model.Produto;
import com.lanche.lanchonete_api.model.Usuario;
import com.lanche.lanchonete_api.repository.ProdutoRepository;
import com.lanche.lanchonete_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;
    private final PasswordEncoder passwordEncoder;

    private record SeedUser(String nome, String email, String senhaPlana, Usuario.Role role) {}

    private record SeedProduto(String nome, String preco, int quantidade, int estoqueMinimo, String categoria) {}

    @Override
    public void run(String... args) {
        seedUsuariosSeNecessario();
        seedProdutosSeNecessario();
    }

    private void seedUsuariosSeNecessario() {
        if (usuarioRepository.count() > 0) {
            return;
        }

        List<SeedUser> seeds = List.of(
                new SeedUser("Administrador", "admin@lanchonete.com", "admin123", Usuario.Role.ADMIN),
                new SeedUser("Gerente Teste", "gerente@lanchonete.com", "gerente123", Usuario.Role.GERENTE),
                new SeedUser("Operador Teste", "operador@lanchonete.com", "operador123", Usuario.Role.OPERADOR)
        );

        for (SeedUser s : seeds) {
            Usuario u = Usuario.builder()
                    .nome(s.nome())
                    .email(s.email())
                    .senha(passwordEncoder.encode(s.senhaPlana()))
                    .role(s.role())
                    .ativo(true)
                    .build();
            usuarioRepository.save(Objects.requireNonNull(u));
        }

        System.out.println("Usuários de teste criados (base vazia):");
        seeds.forEach(s -> System.out.println("  • " + s.email() + " / " + s.senhaPlana() + " (" + s.role() + ")"));
    }

    private void seedProdutosSeNecessario() {
        if (produtoRepository.count() > 0) {
            return;
        }

        List<SeedProduto> seeds = List.of(
                new SeedProduto("X-Burguer", "18.90", 40, 10, "Lanches"),
                new SeedProduto("X-Salada", "22.50", 35, 8, "Lanches"),
                new SeedProduto("Hot-Dog Completo", "12.00", 50, 12, "Lanches"),
                new SeedProduto("Misto Quente", "9.50", 45, 10, "Lanches"),
                new SeedProduto("Frango Grelhado", "19.90", 30, 8, "Lanches"),
                new SeedProduto("Pastel de Carne", "8.00", 60, 15, "Lanches"),
                new SeedProduto("Coxinha (un.)", "6.50", 80, 20, "Lanches"),
                new SeedProduto("Suco Natural 400ml", "9.00", 40, 10, "Bebidas"),
                new SeedProduto("Refrigerante Lata", "6.50", 72, 18, "Bebidas"),
                new SeedProduto("Água Mineral 500ml", "3.50", 100, 24, "Bebidas"),
                new SeedProduto("Café Expresso", "5.00", 50, 10, "Bebidas"),
                new SeedProduto("Milk Shake 400ml", "16.90", 25, 6, "Bebidas"),
                new SeedProduto("Açaí 500ml", "17.50", 28, 8, "Sobremesas"),
                new SeedProduto("Bolo no Pote", "11.00", 20, 5, "Sobremesas"),
                new SeedProduto("Brownie", "8.90", 24, 6, "Sobremesas"),
                new SeedProduto("Combo Rápido (lanche + bebida)", "24.90", 30, 6, "Combos"),
                new SeedProduto("Combo Família", "56.00", 15, 3, "Combos"),
                new SeedProduto("Combo Kids", "19.90", 22, 5, "Combos")
        );

        for (SeedProduto s : seeds) {
            Produto p = Produto.builder()
                    .nome(s.nome())
                    .preco(new BigDecimal(s.preco()))
                    .quantidade(s.quantidade())
                    .estoqueMinimo(s.estoqueMinimo())
                    .categoria(s.categoria())
                    .ativo(true)
                    .dataValidade(null)
                    .build();
            produtoRepository.save(Objects.requireNonNull(p));
        }

        System.out.println("Produtos de lanchonete (cardápio) criados: " + seeds.size() + " itens.");
    }
}
