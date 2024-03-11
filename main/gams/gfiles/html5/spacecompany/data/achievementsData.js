// Game.achievementsCategoryData is an IIFE (Immediately Invoked Function Expression) that returns an object.
// This object contains two properties: resources and producers, which are also objects.
// These objects contain arrays of achievements related to resources and producers respectively.
Game.achievementsCategoryData = (function () {

	var instance = {};
		
	// The resources object contains a title, brackets (an array of quantity thresholds), and entries (an array of resource names).
	instance.resources = {
		title: 'Resources',
		brackets: [50, 50000, 50000000, 50000000000, 50000000000000],
		entries: [
			'resPlasma', 'resUranium', 'resLava',
			'resOil', 'resMetal', 'resGems', 'resCharcoal', 'resWood', 'resSilicon',
			'resLunarite', 'resMethane', 'resTitanium', 'resGold', 'resSilver',
			'resHydrogen', 'resHelium', 'resIce', 'resMeteorite',
			'resScience', 'resRocketFuel' ]
	};
		
	// The producers object contains a title, brackets (an array of quantity thresholds), and entries (an array of producer names).
	instance.producers = {
		title: 'Producers',
		brackets: [5, 25, 75, 150, 250],
		entries: [
			'prodPlasma1', 'prodPlasma2',
			'prodEnergy1', 'prodEnergy2', 'prodEnergy3', 'prodEnergy4', 'prodEnergy5', 'prodEnergy6',
			'prodUranium1', 'prodUranium2', 'prodUranium3', 'prodUranium4', 'prodUranium5',
			'prodLava1', 'prodLava2', 'prodLava3', 'prodLava4', 'prodLava5',
			
			'prodOil1', 'prodOil2', 'prodOil3', 'prodOil4', 'prodOil5',
			'prodMetal1', 'prodMetal2', 'prodMetal3', 'prodMetal4', 'prodMetal5',
			'prodGems1', 'prodGems2', 'prodGems3', 'prodGems4', 'prodGems5',
			'prodCharcoal1', 'prodCharcoal2', 'prodCharcoal3', 'prodCharcoal4', 'prodCharcoal5',
			'prodWood1', 'prodWood2', 'prodWood3', 'prodWood4', 'prodWood5',
			'prodSilicon1', 'prodSilicon2', 'prodSilicon3', 'prodSilicon4', 'prodSilicon5',
			
			'prodLunarite1', 'prodLunarite2', 'prodLunarite3', 'prodLunarite4', 'prodLunarite5',
			'prodMethane1', 'prodMethane2', 'prodMethane3', 'prodMethane4', 'prodMethane5',
			'prodTitanium1', 'prodTitanium2', 'prodTitanium3', 'prodTitanium4', 'prodTitanium5',
			'prodGold1', 'prodGold2', 'prodGold3', 'prodGold4', 'prodGold5',
			'prodSilver1', 'prodSilver2', 'prodSilver3', 'prodSilver4', 'prodSilver5',
			
			'prodHydrogen1', 'prodHydrogen2', 'prodHydrogen3', 'prodHydrogen4', 'prodHydrogen5',
			'prodHelium1', 'prodHelium2', 'prodHelium3', 'prodHelium4', 'prodHelium5',
			'prodIce1', 'prodIce2', 'prodIce3', 'prodIce4', 'prodIce5',
			'prodMeteorite1', 'prodMeteorite2', 'prodMeteorite3', 'prodMeteorite4',
			
			'prodScience1', 'prodScience2', 'prodScience3', 'prodScience4', 'prodScience5',
			'prodRocketFuel1', 'prodRocketFuel2', 'prodRocketFuel3',
			'prodDyson1', 'prodDyson2' ]
			

	};

	return instance;

}());

// Game.achievementsData is an IIFE (Immediately Invoked Function Expression) that returns an object.
// This object contains various achievements for resources and producers.
Game.achievementsData = (function(){

	var instance = {};
	
	/**************
	** Resources **
	**************/

	// Each achievement is an object that contains an id_v4 (achievement ID),
	// categoryInstance (the category the achievement belongs to), iconName (the name of the icon),
	// title (the title of the achievement), evaluator (a function that evaluates if the achievement has been met),
	// and progressEvaluator (a function that calculates the progress towards the achievement).
	instance.resPlasma = {
		id_v4: 'ach_121',
		categoryInstance: Game.achievementsCategoryData.resources,
		iconName: 'plasmaIcon',
		title: 'Collect %s Plasma',
		evaluator: function(x) { return getResource(RESOURCE.Plasma) >= x },
		progressEvaluator: function(x) { return getResource(RESOURCE.Plasma) / x }
	};

	// ... More achievements
