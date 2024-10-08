package com.tcc.musikmatch.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;

public class EnumValidator implements ConstraintValidator<EnumValidation, String> {
    private List<String> values = new ArrayList<>();

    @Override
    public void initialize(EnumValidation enumValidation) {
        values = new ArrayList<>();
        Enum<?>[] enumConstants = enumValidation.enumClass().getEnumConstants();
        for (Enum<?> enumConstant : enumConstants) {
            values.add(enumConstant.toString().toUpperCase());
        }
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return values.contains(value);
    }
}
