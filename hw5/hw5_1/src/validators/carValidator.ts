import Joi from 'joi';

const currentYear = new Date().getFullYear();

export const carValidator = Joi.object({
    brand: Joi.string()
        .pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{1,20}$/)
        .required()
        .messages({
            'string.empty': 'Вкажіть марку',
            'string.pattern.base': 'Марка — лише літери, від 1 до 20 символів',
        }),
    price: Joi.number().min(0).max(1_000_000).required().messages({
        'number.base': 'Вкажіть ціну',
        'number.min': 'Мінімальна ціна — 0',
        'number.max': 'Максимальна ціна — 1 000 000',
    }),
    year: Joi.number().integer().min(1990).max(currentYear).required().messages({
        'number.base': 'Вкажіть рік',
        'number.integer': 'Рік має бути цілим числом',
        'number.min': 'Мінімальний рік — 1990',
        'number.max': `Максимальний рік — ${currentYear}`,
    }),
});
