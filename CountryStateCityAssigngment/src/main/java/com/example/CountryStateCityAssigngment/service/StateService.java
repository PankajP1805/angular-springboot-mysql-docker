package com.example.CountryStateCityAssigngment.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CountryStateCityAssigngment.dto.StateDTO;
import com.example.CountryStateCityAssigngment.entity.City;
import com.example.CountryStateCityAssigngment.entity.Country;
import com.example.CountryStateCityAssigngment.entity.State;
import com.example.CountryStateCityAssigngment.repository.CityRepository;
import com.example.CountryStateCityAssigngment.repository.CountryRepository;
import com.example.CountryStateCityAssigngment.repository.StateRepository;

@Service
public class StateService {
	@Autowired
	private StateRepository stateRepository;

	@Autowired
	private CountryRepository countryRepository;

	@Autowired
	private CityRepository cityRepository;

	public State createState(State state) {
		Optional<Country> country = countryRepository.findById(state.getCountry().getId());
		country.ifPresent(state::setCountry);

		return stateRepository.save(state);
	}

	public List<State> getAllStates() {
		return stateRepository.findAll();
	}

	public State updateState(Long id, State state) {
		Optional<State> optionalState = stateRepository.findById(id);
		if (optionalState.isPresent()) {
			State existingState = optionalState.get();
			existingState.setStateName(state.getStateName());
			existingState.setStatePopulation(state.getStatePopulation());
			return stateRepository.save(existingState);
		} else {
			throw new RuntimeException("State not found with id " + id);
		}
	}

	public void deleteState(Long id) {
		List<City> cities = cityRepository.findByStateId(id);
		if (cities.isEmpty()) {
			stateRepository.deleteById(id);
		} else {
			String cityNames = cities.stream().map(City::getCityName).collect(Collectors.joining(","));
			throw new RuntimeException("Cannot delete state as the following cities exist: " + cityNames);
		}
		stateRepository.deleteById(id);
	}

	public List<State> getStatesByCountry(Long countryId) {
		Country country = countryRepository.findById(countryId).orElse(null);
		return stateRepository.findByCountry(country);
	}

	public Country getCountryByState(Long stateId) {
		State state = stateRepository.findById(stateId).orElse(null);
		if (state != null) {
			return state.getCountry();
		}
		return null;
	}

	public List<StateDTO> getAllStatesWithCityCount() {
		return stateRepository.getStatesWithCityCount();
	}
}
