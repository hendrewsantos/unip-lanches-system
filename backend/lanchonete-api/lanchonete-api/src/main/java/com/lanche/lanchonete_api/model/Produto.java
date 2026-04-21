package com.lanche.lanchonete_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    @Column(nullable = false)
    private Integer quantidade;

    @Column(name = "estoque_minimo")
    @Builder.Default
    private Integer estoqueMinimo = 5;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "ativo")
    @Builder.Default
    private Boolean ativo = true;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }

    // ---- Métodos de negócio ----

    public boolean isVencido() {
        if (this.dataValidade == null) return false;
        return LocalDate.now().isAfter(this.dataValidade);
    }

    public boolean isEstoqueBaixo() {
        return this.quantidade <= this.estoqueMinimo;
    }

    public void diminuirEstoque(int quantidade) {
        if (this.quantidade < quantidade) {
            throw new RuntimeException("Estoque insuficiente para o produto: " + this.nome);
        }
        this.quantidade -= quantidade;
    }

    public void aumentarEstoque(int quantidade) {
        this.quantidade += quantidade;
    }
}