// Game.stargazeCategoryData
Game.stargazeCategoryData = (function () {

    const instance = {};

    instance.general = {
        title: 'General',
        category: 'general'
    };

    instance.faction = {
        title: 'Factions',
        category: 'faction',
    };

    return instance;

}());

// Game.stargazeData
Game.stargazeData = (function(){

	const instance = {};

	const intro = {
		name: "Introduction",
		para1: `"So here we are, at what seems like the end of your journey, but what you don't realize... is that this is just the beginning. Gazing up at the stars, you wonder what you could do with all of your newfound wealth and your empire in the solar system."`,
		para2: `"Suddenly, the Overlord reaches out to you and says: 'You have come far in your time, and I feel that your life is slowing to an end after a long life of empire building. However, you have not met the expectations I thought you would.'"`,
		para3: `"Despite disappointing me and not achieving as much greatness as I would have liked, because of your loyalty and your dedication to me, I am prepared to give you another chance at Rebirth."`,
		para4: `"You will have many chances to impress me, as I will give you the ability of redemption when you feel the time has come and sacrifice is necessary. Your empire will grow even greater than before every time you rebirth, and as long as your allegiance lies with me, I will show you the way to galactic domination."`,
		para5: `"You will start over, a new life, but in exchange for your soul, I will reward your next self with the knowledge you have gained during your time in this universe and some of the most valuable material in this side of the multiverse: Dark Matter."`,
		category: "general",
		unlocked: true
	};

	const darkMatter = {
		name: "Dark Matter",
		desc: "Here, you can see how much Dark Matter you have acquired and the earnings you will recieve upon reset (in brackets). You can find out how DM is gained and can spend it on Dark-Matter-specific upgrades.",
		current: 0,
		count: 0,
		category: "general",
		unlocked: true
	};

	// ... rest of the code for Game.stargazeData

	return instance;

}());

// Game.darkMatter
Game.darkMatter = (function(){

	const instance = {};

	// ... rest of the code for Game.darkMatter

	return instance;

}());

// Game.prestigeData
Game.prestigeData = (function(){

	const instance = {};

	// ... rest of the code for Game.prestigeData

	return instance;

}());
