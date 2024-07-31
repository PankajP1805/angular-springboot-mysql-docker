package com.example.CountryStateCityAssigngment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CountryStateCityAssigngment.entity.City;
import com.example.CountryStateCityAssigngment.entity.State;
import com.example.CountryStateCityAssigngment.service.CityService;

@RestController
@RequestMapping("/api/city")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController {

	private final CityService cityService;

	@Autowired
	public CityController(CityService cityService) {
		this.cityService = cityService;
	}

	@PostMapping
	public City createCity(@RequestBody City city) {
		return cityService.createCity(city);
	}

	@GetMapping
	public List<City> getAllCities() {
		return cityService.getAllCities();
	}

	@PutMapping("/{id}")
	public City updateCity(@PathVariable Long id, @RequestBody City city) {
		return cityService.updateCity(id, city);
	}

	@DeleteMapping("/{id}")
	public void deleteCity(@PathVariable Long id) {
		cityService.deleteCity(id);
	}
}
