package com.example.CountryStateCityAssigngment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.CountryStateCityAssigngment.dto.StateDTO;
import com.example.CountryStateCityAssigngment.entity.Country;
import com.example.CountryStateCityAssigngment.entity.State;

public interface StateRepository extends JpaRepository<State, Long> {

	@Query("SELECT new com.example.CountryStateCityAssigngment.dto.StateDTO(s.id, s.stateName, s.statePopulation, COUNT(c), s.country.countryName) "
			+ "FROM State s LEFT JOIN City c ON s.id = c.state.id " + "GROUP BY s.id, s.country.countryName")
	List<StateDTO> getStatesWithCityCount();

	List<State> findByCountry(Country country);
	List<State> findByCountryId(Long countryId);
}
