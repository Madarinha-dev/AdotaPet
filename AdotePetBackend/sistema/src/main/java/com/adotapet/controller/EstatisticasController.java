package com.adotapet.controller;

import com.adotapet.dto.EstatisticasDTO;
import com.adotapet.service.EstatisticasService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/estatisticas") 
public class EstatisticasController {

    private final EstatisticasService estatisticasService;

    public EstatisticasController(EstatisticasService estatisticasService) {
        this.estatisticasService = estatisticasService;
    }

    // GET /api/estatisticas
    @GetMapping
    public EstatisticasDTO getHomeStatistics() {
        return estatisticasService.getEstatisticasHome();
    }
}