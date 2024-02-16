import type { SurveyAnswers } from '$lib/types/types';
import { writable } from 'svelte/store';

export const surveyAnswers = writable<SurveyAnswers>({
	datos_iniciales: [],
	conociendo_el_negocio: [],
	analisis_subjetivo: [],
	analisis_financiero: [],
	feedback: [],
	token: ''
});
