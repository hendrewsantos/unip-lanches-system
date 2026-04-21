package com.lanche.lanchonete_api.repository;

import com.lanche.lanchonete_api.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    List<Venda> findByCriadoEmBetween(LocalDateTime dataInicio, LocalDateTime dataFim);

    List<Venda> findByStatus(Venda.StatusVenda status);

    @Query("SELECT SUM(v.total) FROM Venda v WHERE v.criadoEm >= :inicio AND v.criadoEm <= :fim AND v.status = 'CONCLUIDA'")
    Double somarVendasPorPeriodo(LocalDateTime inicio, LocalDateTime fim);
}