package com.tcc.musikmatch.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateValidator implements ConstraintValidator<DateValidation, Date> {

    @Override
    public boolean isValid(Date value, ConstraintValidatorContext context) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        try {
            formatter.setLenient(false);
            String strDate = formatter.format(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}