export type SurveyAnswers = {
	datos_iniciales: string[];
	conociendo_el_negocio: string[];
	analisis_subjetivo: string[];
	analisis_financiero: string[];
	feedback: string[];
	token: string;
};

export type Question = {
	id: number;
	tipo: string;
	texto: string;
	opciones?: string[];
};
