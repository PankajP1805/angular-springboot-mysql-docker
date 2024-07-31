package com.example.CountryStateCityAssigngment.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CountryStateCityAssigngment.dto.CountryDTO;
import com.example.CountryStateCityAssigngment.entity.Country;
import com.example.CountryStateCityAssigngment.entity.State;
import com.example.CountryStateCityAssigngment.repository.CountryRepository;
import com.example.CountryStateCityAssigngment.repository.StateRepository;

@Service
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private StateRepository stateRepository;

    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    public Country updateCountry(Long id, Country country) {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            Country existingCountry = optionalCountry.get();
            existingCountry.setCountryName(country.getCountryName());
            existingCountry.setCountryPopulation(country.getCountryPopulation());
            return countryRepository.save(existingCountry);
        } else {
            throw new RuntimeException("Country not found with id " + id);
        }
    }

    public void deleteCountry(Long id) {
        List<State> states = stateRepository.findByCountryId(id);
        if (states.isEmpty()) {
            countryRepository.deleteById(id);
        } else {
            String stateNames = states.stream()
                .map(State::getStateName)
                .collect(Collectors.joining(", "));
            throw new RuntimeException("Cannot delete country as the following states exist: " + stateNames);
        }
    }

    public List<CountryDTO> getAllCountriesWithStateCount() {
        return countryRepository.findAllWithStateCount();
    }
}
