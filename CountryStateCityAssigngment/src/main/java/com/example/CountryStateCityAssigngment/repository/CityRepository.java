package com.example.CountryStateCityAssigngment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CountryStateCityAssigngment.entity.City;

public interface CityRepository extends JpaRepository<City, Long>{
	
	List<City> findByStateId(Long stateId);

}
