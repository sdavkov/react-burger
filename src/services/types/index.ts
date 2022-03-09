import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch & AppThunk;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, Action>>; 