package com.lanche.lanchonete_api.repository;

import com.lanche.lanchonete_api.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByAtivoTrue();

    List<Produto> findByCategoria(String categoria);

    // Produtos vencidos
    @Query("SELECT p FROM Produto p WHERE p.dataValidade IS NOT NULL AND p.dataValidade < :hoje AND p.ativo = true")
    List<Produto> findProdutosVencidos(LocalDate hoje);

    // Produtos com estoque baixo (quantidade <= estoqueMinimo)
    @Query("SELECT p FROM Produto p WHERE p.quantidade <= p.estoqueMinimo AND p.ativo = true")
    List<Produto> findProdutosEstoqueBaixo();

    // Busca por nome (contém)
    List<Produto> findByNomeContainingIgnoreCaseAndAtivoTrue(String nome);

    // Verificar estoque disponível
    @Query("SELECT p FROM Produto p WHERE p.quantidade > 0 AND p.ativo = true")
    List<Produto> findProdutosDisponiveis();
}