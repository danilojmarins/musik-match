package com.tcc.musikmatch.utils;

public class Distance {

    public static final double R = 6371e3;

    static public double calcHaversine(double lat1, double lon1, double lat2, double lon2) {
        double φ1 = lat1 * Math.PI/180;
        double φ2 = lat2 * Math.PI/180;
        double Δφ = (lat2-lat1) * Math.PI/180;
        double Δλ = (lon2-lon1) * Math.PI/180;
        double hav = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        double c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1-hav));
        return R * c / 1000;
    }

}
