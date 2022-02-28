import PropTypes from "prop-types";
import { BURGER_INGREDIENT_BUN_TYPE, BURGER_INGREDIENT_MAIN_TYPE, BURGER_INGREDIENT_SAUCE_TYPE } from "./constants";

export const burgerIngredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([BURGER_INGREDIENT_BUN_TYPE, BURGER_INGREDIENT_MAIN_TYPE, BURGER_INGREDIENT_SAUCE_TYPE]).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});