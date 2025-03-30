import { createContext } from 'react';
import { IRadioCompactContext, IRadioContext } from '../interface/IRadioContext';
import { IEditStationsContext } from '../interface/IEditStationsContext';

export const RadioContext = createContext<IRadioContext | undefined>(undefined);

export const EditedStationsContext = createContext<IEditStationsContext | undefined>(undefined);

export const RadioCompactContext = createContext<IRadioCompactContext | undefined>(undefined);
