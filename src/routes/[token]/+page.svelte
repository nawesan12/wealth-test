<script lang="ts">
	export let data;

	const datos = data.body.informe;
	// Función para formatear la edad del usuario
	function formatAge(age: string | undefined): string {
		return age ?? '';
	}
</script>

<main class="p-8">
	<h1 class="mb-4 text-3xl font-semibold">Informe de Análisis Empresarial</h1>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Información del Usuario</h2>
		<p><strong>Nombre:</strong> {datos?.User?.name}</p>
		<p><strong>Edad:</strong> {formatAge(datos?.User?.age)}</p>
		<p><strong>País:</strong> {datos?.User?.country}</p>
		<p><strong>Correo Electrónico:</strong> {datos?.User?.email}</p>
		<p><strong>WhatsApp:</strong> {datos?.User?.whatsapp}</p>
		<p><strong>Referido Por:</strong> {datos?.User?.referredBy}</p>
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis del Negocio</h2>
		<p><strong>Historia y Visión:</strong> {datos?.businessInfo?.historyAndVision}</p>
		<p><strong>Tipo de Negocio:</strong> {datos?.businessInfo?.businessType}</p>
		<p><strong>Oferta de Negocio:</strong> {datos?.businessInfo?.businessOffering}</p>
		<p><strong>Modelo de Negocio:</strong> {datos?.businessInfo?.businessModel}</p>
		<p><strong>Principal Producto:</strong> {datos?.businessInfo?.mainProduct}</p>
		<p><strong>Ventaja Competitiva:</strong> {datos?.businessInfo?.competitiveAdvantage}</p>
		<p><strong>Investigación de Mercado:</strong> {datos?.businessInfo?.marketResearch}</p>
		<p><strong>Plan de Marketing:</strong> {datos?.businessInfo?.marketingPlan}</p>
		<!-- Otros campos de análisis del negocio -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis Financiero</h2>
		<p><strong>Política Financiera:</strong> {datos?.financialAnalysis?.financialPolicy}</p>
		<p><strong>Métricas Financieras:</strong> {datos?.financialAnalysis?.financialIndicators}</p>
		<p>
			<strong>Métricas de Rentabilidad:</strong>
			{datos?.financialAnalysis?.profitabilityMetrics}
		</p>
		<p><strong>Medición de Moneda:</strong> {datos?.financialAnalysis?.currencyMeasurement}</p>
		<p><strong>Mitigación de Inflación:</strong> {datos?.financialAnalysis?.inflationMitigation}</p>
		<p><strong>Cuentas Financieras:</strong> {datos?.financialAnalysis?.financialAccounts}</p>
		<p>
			<strong>Compensación del Propietario:</strong>
			{datos?.financialAnalysis?.ownerCompensation}
		</p>
		<p><strong>Presupuesto:</strong> {datos?.financialAnalysis?.budgeting}</p>
		<p><strong>Estructura de Costos:</strong> {datos?.financialAnalysis?.costStructure}</p>
		<p><strong>Fondo de Emergencia:</strong> {datos?.financialAnalysis?.emergencyFund}</p>
		<p>
			<strong>Análisis de Punto de Equilibrio:</strong>
			{datos?.financialAnalysis?.breakevenAnalysis}
		</p>
		<p><strong>Administración de Deudas:</strong> {datos?.financialAnalysis?.debtManagement}</p>
		<p><strong>Medición de Liquidez:</strong> {datos?.financialAnalysis?.liquidityMeasurement}</p>
		<p>
			<strong>Elaboración de Estados Financieros:</strong>
			{datos?.financialAnalysis?.financialStatements}
		</p>
		<p><strong>Seguimiento de Inventario:</strong> {datos?.financialAnalysis?.inventoryTracking}</p>
		<p><strong>Financiamiento Externo:</strong> {datos?.financialAnalysis?.externalFinancing}</p>
		<p>
			<strong>Plan de Transición de Crecimiento:</strong>
			{datos?.financialAnalysis?.growthTransitionPlan}
		</p>
		<p>
			<strong>Plan de Consultor Financiero:</strong>
			{datos?.financialAnalysis?.financialConsultantPlan}
		</p>
		<!-- Otros campos de análisis financiero -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Análisis Subjetivo</h2>
		<p><strong>Conocimiento Financiero:</strong> {datos?.subjectiveAnalysis?.financialKnowledge}</p>
		<p><strong>Conocimiento Contable:</strong> {datos?.subjectiveAnalysis?.accountingKnowledge}</p>
		<p><strong>Entrenamiento Financiero:</strong> {datos?.subjectiveAnalysis?.financialTraining}</p>
		<p><strong>Estado del Socio:</strong> {datos?.subjectiveAnalysis?.partnerStatus}</p>
		<p><strong>Delegación:</strong> {datos?.subjectiveAnalysis?.delegation}</p>
		<p><strong>Experiencia Emocional:</strong> {datos?.subjectiveAnalysis?.emotionalExperience}</p>
		<p><strong>Oportunidades Perdidas:</strong> {datos?.subjectiveAnalysis?.missedOpportunity}</p>
		<p><strong>Crecimiento Repentino:</strong> {datos?.subjectiveAnalysis?.suddenGrowth}</p>
		<p><strong>Creeencias de la Infancia:</strong> {datos?.subjectiveAnalysis?.childhoodBeliefs}</p>
		<p>
			<strong>Experiencias de la Infancia:</strong>
			{datos?.subjectiveAnalysis?.childhoodExperience}
		</p>
		<p><strong>Incidentes de Vida:</strong> {datos?.subjectiveAnalysis?.lifeIncidents}</p>
		<p><strong>Evaluación Emocional:</strong> {datos?.subjectiveAnalysis?.emotionalEvaluation}</p>
		<p>
			<strong>Compromiso a Largo Plazo:</strong>
			{datos?.subjectiveAnalysis?.longTermCommitment}
		</p>
		<p>
			<strong>Tolerancia al Riesgo Financiero:</strong>
			{datos?.subjectiveAnalysis?.financialRiskTolerance}
		</p>
		<p>
			<strong>Toma de Decisiones Financieras:</strong>
			{datos?.subjectiveAnalysis?.financialDecisionMaking}
		</p>
		<!-- Otros campos de análisis subjetivo -->
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-2xl font-semibold">Comentarios y Feedback</h2>
		<p><strong>Diagnóstico Integral:</strong> {datos?.feedback?.comprehensiveDiagnosis}</p>
		<p><strong>Sentimientos:</strong> {datos?.feedback?.feelings}</p>
		<p><strong>Aspectos Sorprendentes:</strong> {datos?.feedback?.surprisingAspects}</p>
		<p><strong>Lecciones Aprendidas:</strong> {datos?.feedback?.newLearnings}</p>
		<p><strong>Aspectos Destacados:</strong> {datos?.feedback?.highlights}</p>
		<p><strong>Sugerencias:</strong> {datos?.feedback?.suggestions}</p>
		<p><strong>Recomendar Sesión:</strong> {datos?.feedback?.recommendSession}</p>
	</section>
</main>
