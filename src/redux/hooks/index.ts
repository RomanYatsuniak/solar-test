import { useDispatch } from 'react-redux';
import { AppDispatch, AppStore, RootReducer } from '../store';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
