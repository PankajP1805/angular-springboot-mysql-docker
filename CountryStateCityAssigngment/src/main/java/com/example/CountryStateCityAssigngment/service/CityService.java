package com.example.CountryStateCityAssigngment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CountryStateCityAssigngment.entity.City;
import com.example.CountryStateCityAssigngment.entity.State;
import com.example.CountryStateCityAssigngment.repository.CityRepository;
import com.example.CountryStateCityAssigngment.repository.StateRepository;

@Service
public class CityService {
	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private StateRepository stateRepository;

	public City createCity(City city) {
		Optional<State> state = stateRepository.findById(city.getState().getId());
		state.ifPresent(city::setState);
		return cityRepository.save(city);
	}

	public List<City> getAllCities() {
		return cityRepository.findAll();
	}

	public City updateCity(Long id, City city) {
		Optional<City> optionalCity = cityRepository.findById(id);
		if (optionalCity.isPresent()) {
			City existingCity = optionalCity.get();
			existingCity.setCityName(city.getCityName());
			existingCity.setCityPopulation(city.getCityPopulation());
			return cityRepository.save(existingCity);
		} else {
			throw new RuntimeException("City not found with id " + id);
		}
	}

	public void deleteCity(Long id) {
		cityRepository.deleteById(id);

	}

}
