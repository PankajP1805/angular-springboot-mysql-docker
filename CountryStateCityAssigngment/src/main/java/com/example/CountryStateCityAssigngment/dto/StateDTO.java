package com.example.CountryStateCityAssigngment.dto;

public class StateDTO {
    private long id;
    private String stateName;
    private String statePopulation;
    private long cityCount;
    private String countryName;

    public StateDTO(long id, String stateName, String statePopulation, long cityCount, String countryName) {
        this.id = id;
        this.stateName = stateName;
        this.statePopulation = statePopulation;
        this.cityCount = cityCount;
        this.countryName = countryName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public String getStatePopulation() {
        return statePopulation;
    }

    public void setStatePopulation(String statePopulation) {
        this.statePopulation = statePopulation;
    }

    public long getCityCount() {
        return cityCount;
    }

    public void setCityCount(long cityCount) {
        this.cityCount = cityCount;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}
