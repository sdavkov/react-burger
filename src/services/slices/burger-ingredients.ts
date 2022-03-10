import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBurgerIngredientsRequest } from '../api';
import { TBurgerIngredient } from '../types/data';

export type TBurgerIngredientState = {
	burgerIngredients: TBurgerIngredient[],
	currentBurgerIngredient?: TBurgerIngredient,
	burgerIngredientsRequest: boolean,
	burgerIngredientsRequestFailed: boolean,
}

const initialState: TBurgerIngredientState = {
	burgerIngredients: [],
	burgerIngredientsRequest: false,
	burgerIngredientsRequestFailed: false,
}

export const fetchBurgerIngredients = createAsyncThunk(
	"burgerIngredients/fetchBurgerIngredients",
	getBurgerIngredientsRequest
);

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		setCurrentBurgerIngredientAction: (state, action: PayloadAction<string>) => {
			state.currentBurgerIngredient = state.burgerIngredients.find((item) => item._id === action.payload);
		},
		clearBurgerIngredientAction: (state) => {
			state.currentBurgerIngredient = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBurgerIngredients.pending, (state) => {
			state.burgerIngredientsRequest = true;
		});
		builder.addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
			state.burgerIngredientsRequest = false;
			state.burgerIngredientsRequestFailed = false;
			state.burgerIngredients = action.payload.data;
		});
		builder.addCase(fetchBurgerIngredients.rejected, (state) => {
			state.burgerIngredientsRequest = false;
			state.burgerIngredientsRequest = true;
		});
	}
})

export const {
	setCurrentBurgerIngredientAction,
	clearBurgerIngredientAction,
} = burgerIngredientsSlice.actions

export default burgerIngredientsSlice.reducer;