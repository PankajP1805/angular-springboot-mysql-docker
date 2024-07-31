package com.example.CountryStateCityAssigngment.dto;

public class CountryDTO {
    private long id;
    private String countryName;
    private String countryPopulation;
	private long stateCount;

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
	public long getStateCount() {
		return stateCount;
	}
	public void setStateCount(long stateCount) {
		this.stateCount = stateCount;
	}
	public CountryDTO(long id, String countryName, String countryPopulation, long stateCount) {
		super();
		this.id = id;
		this.countryName = countryName;
		this.countryPopulation = countryPopulation;
		this.stateCount = stateCount;
	}

    
}
