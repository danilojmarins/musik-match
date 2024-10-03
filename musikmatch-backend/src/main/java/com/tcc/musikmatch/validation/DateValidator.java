package com.tcc.musikmatch.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class DateValidator implements ConstraintValidator<DateValidation, LocalDate> {

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            formatter.setLenient(false);
            String strDate = formatter.format(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}