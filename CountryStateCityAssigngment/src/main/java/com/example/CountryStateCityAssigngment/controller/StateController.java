package com.example.CountryStateCityAssigngment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CountryStateCityAssigngment.dto.StateDTO;
import com.example.CountryStateCityAssigngment.entity.Country;
import com.example.CountryStateCityAssigngment.entity.State;
import com.example.CountryStateCityAssigngment.service.StateService;

@RestController
@RequestMapping("/api/state")
@CrossOrigin(origins = "http://localhost:4200")
public class StateController {

	private final StateService stateService;

	@Autowired
	public StateController(StateService stateService) {
		this.stateService = stateService;
	}

	@PostMapping
	public State createState(@RequestBody State state) {
		return stateService.createState(state);
	}

	@GetMapping
	public List<State> getAllStates() {
		return stateService.getAllStates();
	}

	@PutMapping("/{id}")
	public State updateState(@PathVariable Long id, @RequestBody State state) {
		return stateService.updateState(id, state);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteState(@PathVariable Long id) {
		try {
			stateService.deleteState(id);
			return ResponseEntity.ok().build();
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/{countryId}")
	public ResponseEntity<List<State>> getStatesByCountry(@PathVariable Long countryId) {
		List<State> states = stateService.getStatesByCountry(countryId);
		if (states.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(states);
	}

	@GetMapping("/load-country/{stateId}")
	public ResponseEntity<Country> getCountryByState(@PathVariable Long stateId) {
		Country country = stateService.getCountryByState(stateId);
		if (country == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(country);
	}

	@GetMapping("/city-count")
	public List<StateDTO> getAllStatesWithCityCount() {
		return stateService.getAllStatesWithCityCount();
	}

}
