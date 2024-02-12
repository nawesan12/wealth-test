<script lang="ts">
	export let data;

	const datos = data.body.informe;
	// Función para formatear la edad del usuario
	function formatAge(age: string | undefined): string {
		return age ?? '';
	}
</script>

<main class="m-4 rounded-lg bg-white p-8">
	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Información del Usuario</h2>
		<article class="space-y-2">
			<p><strong class="font-semibold">Nombre:</strong> {datos?.User?.name}</p>
			<p><strong class="font-semibold">Edad:</strong> {formatAge(datos?.User?.age)}</p>
			<p><strong class="font-semibold">País:</strong> {datos?.User?.country}</p>
			<p><strong class="font-semibold">Correo Electrónico:</strong> {datos?.User?.email}</p>
			<p><strong class="font-semibold">WhatsApp:</strong> {datos?.User?.whatsapp}</p>
			<p><strong class="font-semibold">Referido Por:</strong> {datos?.User?.referredBy}</p>
		</article>
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis del Negocio</h2>
		<article class="space-y-2">
			<p>
				<strong class="font-semibold">Historia y Visión:</strong>
				{datos?.businessInfo?.historyAndVision}
			</p>
			<p>
				<strong class="font-semibold">Tipo de Negocio:</strong>
				{datos?.businessInfo?.businessType}
			</p>
			<p>
				<strong class="font-semibold">Oferta de Negocio:</strong>
				{datos?.businessInfo?.businessOffering}
			</p>
			<p>
				<strong class="font-semibold">Modelo de Negocio:</strong>
				{datos?.businessInfo?.businessModel}
			</p>
			<p>
				<strong class="font-semibold">Principal Producto:</strong>
				{datos?.businessInfo?.mainProduct}
			</p>
			<p>
				<strong class="font-semibold">Ventaja Competitiva:</strong>
				{datos?.businessInfo?.competitiveAdvantage}
			</p>
			<p>
				<strong class="font-semibold">Investigación de Mercado:</strong>
				{datos?.businessInfo?.marketResearch}
			</p>
			<p>
				<strong class="font-semibold">Plan de Marketing:</strong>
				{datos?.businessInfo?.marketingPlan}
			</p>
		</article>
		<!-- Otros campos de análisis del negocio -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis Financiero</h2>
		<article class="space-y-2">
			<p>
				<strong class="font-semibold">Política Financiera:</strong>
				{datos?.financialAnalysis?.financialPolicy}
			</p>
			<p>
				<strong class="font-semibold">Métricas Financieras:</strong>
				{datos?.financialAnalysis?.financialIndicators}
			</p>
			<p>
				<strong class="font-semibold">Métricas de Rentabilidad:</strong>
				{datos?.financialAnalysis?.profitabilityMetrics}
			</p>
			<p>
				<strong class="font-semibold">Medición de Moneda:</strong>
				{datos?.financialAnalysis?.currencyMeasurement}
			</p>
			<p>
				<strong class="font-semibold">Mitigación de Inflación:</strong>
				{datos?.financialAnalysis?.inflationMitigation}
			</p>
			<p>
				<strong class="font-semibold">Cuentas Financieras:</strong>
				{datos?.financialAnalysis?.financialAccounts}
			</p>
			<p>
				<strong class="font-semibold">Compensación del Propietario:</strong>
				{datos?.financialAnalysis?.ownerCompensation}
			</p>
			<p>
				<strong class="font-semibold">Presupuesto:</strong>
				{datos?.financialAnalysis?.budgeting}
			</p>
			<p>
				<strong class="font-semibold">Estructura de Costos:</strong>
				{datos?.financialAnalysis?.costStructure}
			</p>
			<p>
				<strong class="font-semibold">Fondo de Emergencia:</strong>
				{datos?.financialAnalysis?.emergencyFund}
			</p>
			<p>
				<strong class="font-semibold">Análisis de Punto de Equilibrio:</strong>
				{datos?.financialAnalysis?.breakevenAnalysis}
			</p>
			<p>
				<strong class="font-semibold">Administración de Deudas:</strong>
				{datos?.financialAnalysis?.debtManagement}
			</p>
			<p>
				<strong class="font-semibold">Medición de Liquidez:</strong>
				{datos?.financialAnalysis?.liquidityMeasurement}
			</p>
			<p>
				<strong class="font-semibold">Elaboración de Estados Financieros:</strong>
				{datos?.financialAnalysis?.financialStatements}
			</p>
			<p>
				<strong class="font-semibold">Seguimiento de Inventario:</strong>
				{datos?.financialAnalysis?.inventoryTracking}
			</p>
			<p>
				<strong class="font-semibold">Financiamiento Externo:</strong>
				{datos?.financialAnalysis?.externalFinancing}
			</p>
			<p>
				<strong class="font-semibold">Plan de Transición de Crecimiento:</strong>
				{datos?.financialAnalysis?.growthTransitionPlan}
			</p>
			<p>
				<strong class="font-semibold">Plan de Consultor Financiero:</strong>
				{datos?.financialAnalysis?.financialConsultantPlan}
			</p>
		</article>
		<!-- Otros campos de análisis financiero -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis Subjetivo</h2>
		<article class="space-y-2">
			<p>
				<strong class="font-semibold">Conocimiento Financiero:</strong>
				{datos?.subjectiveAnalysis?.financialKnowledge}
			</p>
			<p>
				<strong class="font-semibold">Conocimiento Contable:</strong>
				{datos?.subjectiveAnalysis?.accountingKnowledge}
			</p>
			<p>
				<strong class="font-semibold">Entrenamiento Financiero:</strong>
				{datos?.subjectiveAnalysis?.financialTraining}
			</p>
			<p>
				<strong class="font-semibold">Estado del Socio:</strong>
				{datos?.subjectiveAnalysis?.partnerStatus}
			</p>
			<p>
				<strong class="font-semibold">Delegación:</strong>
				{datos?.subjectiveAnalysis?.delegation}
			</p>
			<p>
				<strong class="font-semibold">Experiencia Emocional:</strong>
				{datos?.subjectiveAnalysis?.emotionalExperience}
			</p>
			<p>
				<strong class="font-semibold">Oportunidades Perdidas:</strong>
				{datos?.subjectiveAnalysis?.missedOpportunity}
			</p>
			<p>
				<strong class="font-semibold">Crecimiento Repentino:</strong>
				{datos?.subjectiveAnalysis?.suddenGrowth}
			</p>
			<p>
				<strong class="font-semibold">Creeencias de la Infancia:</strong>
				{datos?.subjectiveAnalysis?.childhoodBeliefs}
			</p>
			<p>
				<strong class="font-semibold">Experiencias de la Infancia:</strong>
				{datos?.subjectiveAnalysis?.childhoodExperience}
			</p>
			<p>
				<strong class="font-semibold">Incidentes de Vida:</strong>
				{datos?.subjectiveAnalysis?.lifeIncidents}
			</p>
			<p>
				<strong class="font-semibold">Evaluación Emocional:</strong>
				{datos?.subjectiveAnalysis?.emotionalEvaluation}
			</p>
			<p>
				<strong class="font-semibold">Compromiso a Largo Plazo:</strong>
				{datos?.subjectiveAnalysis?.longTermCommitment}
			</p>
			<p>
				<strong class="font-semibold">Tolerancia al Riesgo Financiero:</strong>
				{datos?.subjectiveAnalysis?.financialRiskTolerance}
			</p>
			<p>
				<strong class="font-semibold">Toma de Decisiones Financieras:</strong>
				{datos?.subjectiveAnalysis?.financialDecisionMaking}
			</p>
		</article>
		<!-- Otros campos de análisis subjetivo -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Comentarios y Feedback</h2>
		<article class="space-y-2">
			<p>
				<strong class="font-semibold">Diagnóstico Integral:</strong>
				{datos?.feedback?.comprehensiveDiagnosis}
			</p>
			<p><strong class="font-semibold">Sentimientos:</strong> {datos?.feedback?.feelings}</p>
			<p>
				<strong class="font-semibold">Aspectos Sorprendentes:</strong>
				{datos?.feedback?.surprisingAspects}
			</p>
			<p>
				<strong class="font-semibold">Lecciones Aprendidas:</strong>
				{datos?.feedback?.newLearnings}
			</p>
			<p>
				<strong class="font-semibold">Aspectos Destacados:</strong>
				{datos?.feedback?.highlights}
			</p>
			<p><strong class="font-semibold">Sugerencias:</strong> {datos?.feedback?.suggestions}</p>
			<p>
				<strong class="font-semibold">Recomendar Sesión:</strong>
				{datos?.feedback?.recommendSession}
			</p>
		</article>
	</section>
</main>
