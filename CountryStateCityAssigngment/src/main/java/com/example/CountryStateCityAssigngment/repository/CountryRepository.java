package com.example.CountryStateCityAssigngment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.CountryStateCityAssigngment.dto.CountryDTO;
import com.example.CountryStateCityAssigngment.entity.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    @Query("SELECT new com.example.CountryStateCityAssigngment.dto.CountryDTO(c.id, c.countryName, c.countryPopulation, COUNT(s)) " +
           "FROM Country c LEFT JOIN State s ON c.id = s.country.id " +
           "GROUP BY c.id")
    List<CountryDTO> findAllWithStateCount();
}