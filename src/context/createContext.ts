import { createContext } from 'react';
import { IRadioContext } from '../interface/IRadioContext';
import { IEditStationsContext } from '../interface/IEditStationsContext';

export const RadioContext = createContext<IRadioContext | undefined>(undefined);

export const EditedStationsContext = createContext<IEditStationsContext | undefined>(undefined);
