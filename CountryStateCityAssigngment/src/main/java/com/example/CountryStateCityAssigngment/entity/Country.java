package com.example.CountryStateCityAssigngment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Country {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private long id;
	private String countryName;
	private String countryPopulation;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getCountryPopulation() {
		return countryPopulation;
	}

	public void setCountryPopulation(String countryPopulation) {
		this.countryPopulation = countryPopulation;
	}

}
