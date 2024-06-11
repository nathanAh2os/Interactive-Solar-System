export const planetKepDictionary = new Map([
	[
		"Mercury",
		{
			name: "Mercury",
			url: "2k_mercury.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 87.97,
			t_a: 2480186.5,
			m_a: 4.68047944,
			diameter: 0.0000326141,
			keplerianJ2000: {
				semiMajorAxis: 0.30749918,
				eccentricity: 0.20563016,
				inclination: 7.0050143,
				longitudeAscendNode: 48.33053855,
				argumentOfPerihelion: 29.12428449,
			},
			keplerianArbitrary: {
				semiMajorAxis: 0.30749112,
				eccentricity: 0.20565207,
				inclination: 7.00034185,
				longitudeAscendNode: 48.23282258,
				argumentOfPerihelion: 29.34772765,
			},
			innerSatellite: true,
			moons: ["none"],
		},
	],
	[
		"Venus",
		{
			name: "Venus",
			url: "2k_venus_surface.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 224.7,
			t_a: 2480186.5,
			m_a: 3.80692329,
			diameter: 8.0910243e-5,
			keplerianJ2000: {
				semiMajorAxis: 0.71844093,
				eccentricity: 0.00675735,
				inclination: 3.39458965,
				longitudeAscendNode: 76.67837412,
				argumentOfPerihelion: 55.20203103,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 0.71846185,
				eccentricity: 0.00672519,
				inclination: 3.39403329,
				longitudeAscendNode: 76.46266923,
				argumentOfPerihelion: 54.81687779,
			},
			innerSatellite: true,
			moons: ["none"],
		},
	],
	[
		"Earth",
		{
			name: "Earth",
			url: "2k_earth_daymap.jpg",
			zoomLevel: 0.75,
			siderealPeriod: 365.22,
			t_a: 2480186.5,
			m_a: 2.54547998,
			diameter: 8.5175009e-5,
			keplerianJ2000: {
				semiMajorAxis: 0.98329413,
				eccentricity: 0.01670545,
				inclination: 0.00010346,
				longitudeAscendNode: 140.2922798,
				argumentOfPerihelion: 322.62519121,
			},
			keplerianArbitrary: {
				semiMajorAxis: 0.98334884,
				eccentricity: 0.0166693,
				inclination: 0.01024504,
				longitudeAscendNode: 175.07134969,
				argumentOfPerihelion: 290.39955817,
			},
			innerSatellite: true,
			moons: ["moon"],
		},
	],
	[
		"Mars",
		{
			name: "Mars",
			url: "2k_mars.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 686.98,
			t_a: 2480186.5,
			m_a: 4.68047944,
			diameter: 4.53148e-5,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 1.38149677,
				eccentricity: 0.09331543,
				inclination: 1.84987648,
				longitudeAscendNode: 49.56200566,
				argumentOfPerihelion: 286.53746157,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 1.38135367,
				eccentricity: 0.09345692,
				inclination: 1.84332745,
				longitudeAscendNode: 49.33101299,
				argumentOfPerihelion: 287.03898861,
			},
			innerSatellite: true,
			moons: ["Phobos", "Deimos"],
		},
	],
	[
		"Jupiter",
		{
			name: "Jupiter",
			url: "2k_jupiter.jpg",
			zoomLevel: 2,
			siderealPeriod: 4332.589,
			t_a: 2480186.5,
			m_a: 4.20022402,
			diameter: 0.0009346523406,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 4.95071517,
				eccentricity: 0.04972812,
				inclination: 1.30463059,
				longitudeAscendNode: 100.49114995,
				argumentOfPerihelion: 275.458357,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 4.95441073,
				eccentricity: 0.04845395,
				inclination: 1.30234005,
				longitudeAscendNode: 100.63051614,
				argumentOfPerihelion: 272.83478796,
			},
			innerSatellite: false,
			moons: ["Ganymede", "Callisto", "Io", "Europa"],
		},
	],
	[
		"Saturn",
		{
			name: "Saturn",
			url: "2k_saturn.jpg",
			zoomLevel: 4.5,
			siderealPeriod: 10759.22,
			t_a: 2480186.5,
			m_a: 3.43073683,
			diameter: 0.0007785137546,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 9.0494869, //let semiMajorAxisTrue = 9.0942981; //saturn
				eccentricity: 0.05586067,
				inclination: 2.48425239,
				longitudeAscendNode: 113.69966003,
				argumentOfPerihelion: 335.66245818,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 9.0942981,
				eccentricity: 0.05084376,
				inclination: 2.49105172,
				longitudeAscendNode: 113.41605679,
				argumentOfPerihelion: 338.60793407,
			},
			innerSatellite: false,
			moons: ["Titan", "Rhea", "Iapetus", "Dione", "Tethys", "Enceladus", "Mimas"],
		},
	],
	[
		"Uranus",
		{
			name: "Uranus",
			url: "2k_uranus.jpg",
			zoomLevel: 0.75,
			siderealPeriod: 30689.15,
			t_a: 2480186.5,
			m_a: 1.95547809,
			diameter: 0.000339068997,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 18.3778869,
				eccentricity: 0.04435828,
				inclination: 0.77265893,
				longitudeAscendNode: 74.00247588,
				argumentOfPerihelion: 96.62326523,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 18.4063347,
				eccentricity: 0.04591317,
				inclination: 0.77099597,
				longitudeAscendNode: 74.02983165,
				argumentOfPerihelion: 103.06980275,
			},
			innerSatellite: false,
			moons: ["Ariel", "Umbriel", "Titania", "Oberon", "Miranda"],
		},
	],
	[
		"Neptune",
		{
			name: "Neptune",
			url: "2k_neptune.jpg",
			zoomLevel: 0.5,
			siderealPeriod: 60189,
			t_a: 2480186.5,
			m_a: 1.6763544,
			diameter: 0.000329175808,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 29.7584523,
				eccentricity: 0.01119955,
				inclination: 1.77021584,
				longitudeAscendNode: 131.78386916,
				argumentOfPerihelion: 267.046785,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 29.7599168,
				eccentricity: 0.00681429,
				inclination: 1.7650089,
				longitudeAscendNode: 131.8344887,
				argumentOfPerihelion: 248.47255473,
			},
			innerSatellite: false,
			moons: ["Triton"],
		},
	],
]);

export const dwarfPlanetKepDictionary = new Map([
	[
		"Pluto",
		{
			name: "Pluto",
			url: "pluto-texture-map.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 90562.56,
			t_a: 2480186.5,
			m_a: 2.24452195,
			diameter: 1.58826e-5,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 29.7002699,
				eccentricity: 0.2494485,
				inclination: 17.23565302,
				longitudeAscendNode: 110.03993995,
				argumentOfPerihelion: 115.17866659,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 29.2579028,
				eccentricity: 0.25568402,
				inclination: 17.18478072,
				longitudeAscendNode: 111.16248406,
				argumentOfPerihelion: 112.60353204,
			},
			innerSatellite: false,
			moons: ["Charon", "Hydra", "Nix", "Kerberos", "Styx"],
		},
	],
	[
		"Makemake",
		{
			name: "Makemake",
			url: "2k_neptune.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 111845,
			t_a: 2460186.5,
			m_a: 166.63161251,
			diameter: 0.00000956,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 38.1138674,
				eccentricity: 0.16227186,
				inclination: 29.00802424,
				longitudeAscendNode: 79.16345483,
				argumentOfPerihelion: 297.30614126,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2460186.5
				semiMajorAxis: 37.9807239,
				eccentricity: 0.16355612,
				inclination: 29.03277407,
				longitudeAscendNode: 79.20612214,
				argumentOfPerihelion: 297.1413097,
			},
			innerSatellite: false,
			moons: ["S/2015 (136472) 1"], //https://en.wikipedia.org/wiki/S/2015_(136472)_1
		},
	],
	[
		"Haumea",
		{
			name: "Haumea",
			url: "2k_neptune.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 103410,
			t_a: 2460186.5,
			m_a: 219.84416926,
			diameter: 0.00000533,
			keplerianJ2000: {
				//obtained from SPICE, J = 2453371.5
				semiMajorAxis: 35.147224,
				eccentricity: 0.18884118,
				inclination: 28.18665181,
				longitudeAscendNode: 121.843316,
				argumentOfPerihelion: 239.80363381,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2460186.5
				semiMajorAxis: 34.3165069,
				eccentricity: 0.19994541,
				inclination: 28.20953364,
				longitudeAscendNode: 121.97967888,
				argumentOfPerihelion: 240.67991327,
			},
			innerSatellite: false,
			moons: ["Hi'iaka", "Namaka"], //https://en.wikipedia.org/wiki/Moons_of_Haumea
		},
	],
	[
		"Eris",
		{
			name: "Eris",
			url: "2k_neptune.jpg",
			zoomLevel: 0.125,
			siderealPeriod: 204199,
			t_a: 2459000.5,
			m_a: 205.989,
			diameter: 0.00000777,
			keplerianJ2000: {
				//obtained from SPICE, J = 2459000.5
				semiMajorAxis: 67.864,
				eccentricity: 0.43607,
				inclination: 44.04,
				longitudeAscendNode: 35.951,
				argumentOfPerihelion: 151.639,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2459000.5
				semiMajorAxis: 67.864,
				eccentricity: 0.43607,
				inclination: 44.04,
				longitudeAscendNode: 35.951,
				argumentOfPerihelion: 151.639,
			},
			innerSatellite: false,
			moons: ["Dysnomia"], //https://en.wikipedia.org/wiki/Dysnomia_(moon)
		},
	],
	[
		"Ceres",
		{
			name: "Ceres",
			url: "ceres-texture-map.jpg",
			zoomLevel: 0.4,
			siderealPeriod: 1680,
			t_a: 2480186.5,
			m_a: 18.63903895,
			diameter: 0.00000628,
			keplerianJ2000: {
				//obtained from SPICE, J = 2451545
				semiMajorAxis: 2.54967007,
				eccentricity: 0.07837569,
				inclination: 10.58335618,
				longitudeAscendNode: 80.49441995,
				argumentOfPerihelion: 73.92274073,
			},
			keplerianArbitrary: {
				//obtained from SPICE, J = 2480186.5
				semiMajorAxis: 2.55810385,
				eccentricity: 0.07544202,
				inclination: 10.58554173,
				longitudeAscendNode: 79.41564043,
				argumentOfPerihelion: 74.38125627,
			},
			innerSatellite: true,
			moons: ["none"],
		},
	],
]);

export const moonsKepDictionary = new Map([
	["Sun", []],
	["Mercury", []],
	["Venus", []],
	[
		"Earth",
		[
			{
				name: "Moon",
				url: "moon-texture-map-2K.jpg",
				zoomLevel: 0.25,
				siderealPeriod: 27.322,
				t_a: 2480186.5,
				m_a: 4.96980439,
				diameter: 1.58826e-5,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00244289,
					eccentricity: 0.05357474,
					inclination: 5.240273,
					longitudeAscendNode: 123.95805544,
					argumentOfPerihelion: 315.4342062,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.0024487,
					eccentricity: 0.04985445,
					inclination: 5.24150766,
					longitudeAscendNode: 48.21595207,
					argumentOfPerihelion: 355.27377926,
				},
			},
		],
	],
	[
		"Mars",
		[
			{
				name: "Phobos",
				url: "phobos-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 0.31891023,
				t_a: 2480186.5,
				m_a: 179.50613216,
				diameter: 1.4813e-7,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00006177,
					eccentricity: 0.01468853,
					inclination: 26.05536777,
					longitudeAscendNode: 84.81541114,
					argumentOfPerihelion: 342.71419338,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00006177,
					eccentricity: 0.01475233,
					inclination: 26.30548114,
					longitudeAscendNode: 80.53321108,
					argumentOfPerihelion: 211.87670352,
				},
			},
			{
				name: "Deimos",
				url: "deimos-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 1.263,
				t_a: 2480186.5,
				m_a: 345.42441378,
				diameter: 8.3824e-8,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00015676,
					eccentricity: 0.00033473,
					inclination: 27.57036409,
					longitudeAscendNode: 83.66278217,
					argumentOfPerihelion: 211.61202639,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00015675,
					eccentricity: 0.0003503,
					inclination: 24.38918075,
					longitudeAscendNode: 80.16098912,
					argumentOfPerihelion: 19.13274486,
				},
			},
		],
	],
	[
		"Jupiter", //"ganymede", "callisto", "io", "europa"
		[
			{
				name: "Ganymede",
				url: "ganymede-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 7.15455296,
				t_a: 2480186.5,
				m_a: 233.71563356,
				diameter: 0.00003522,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00714588,
					eccentricity: 0.00146872,
					inclination: 2.21414804,
					longitudeAscendNode: 343.17284553,
					argumentOfPerihelion: 316.78451725,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00714117,
					eccentricity: 0.00228276,
					inclination: 2.01239149,
					longitudeAscendNode: 333.3828652,
					argumentOfPerihelion: 104.68999591,
				},
			},
			{
				name: "Callisto",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 16.6890184,
				t_a: 2480186.5,
				m_a: 103.29036234,
				diameter: 0.00003222,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.01249258,
					eccentricity: 0.00744405,
					inclination: 2.01691622,
					longitudeAscendNode: 337.94261035,
					argumentOfPerihelion: 16.56181506,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.01249403,
					eccentricity: 0.00721423,
					inclination: 1.86552655,
					longitudeAscendNode: 335.6177762,
					argumentOfPerihelion: 68.20561448,
				},
			},
			{
				name: "Io",
				url: "io-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 1.769137786,
				t_a: 2480186.5,
				m_a: 91.57280698,
				diameter: 0.00002435,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00280785,
					eccentricity: 0.00475854,
					inclination: 2.21261776,
					longitudeAscendNode: 336.85244521,
					argumentOfPerihelion: 65.92494315,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00280955,
					eccentricity: 0.0041295,
					inclination: 2.23046375,
					longitudeAscendNode: 338.58660132,
					argumentOfPerihelion: 137.01043967,
				},
			},
			{
				name: "Europa",
				url: "europa-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 3.551181,
				t_a: 2480186.5,
				m_a: 49.88171607,
				diameter: 0.00002087,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00444299,
					eccentricity: 0.00983748,
					inclination: 1.79097121,
					longitudeAscendNode: 332.62873236,
					argumentOfPerihelion: 254.60937838,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00444532,
					eccentricity: 0.00927449,
					inclination: 2.64354253,
					longitudeAscendNode: 335.55104755,
					argumentOfPerihelion: 311.41843448,
				},
			},
		],
	],
	[
		"Saturn", //"titan", "rhea", "iapetus", "dione", "tethys", "enceladus", "mimas"
		[
			{
				name: "Titan",
				url: "titan-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 15.945,
				t_a: 2480186.5,
				m_a: 201.71353302,
				diameter: 0.00003442,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.0079381,
					eccentricity: 0.02837963,
					inclination: 27.71833887,
					longitudeAscendNode: 169.23916029,
					argumentOfPerihelion: 164.53810395,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00793849,
					eccentricity: 0.02835872,
					inclination: 27.59112434,
					longitudeAscendNode: 168.7995985,
					argumentOfPerihelion: 205.00068814,
				},
			},
			{
				name: "Rhea",
				url: "rhea-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 4.518212,
				t_a: 2480186.5,
				m_a: 213.88398351,
				diameter: 0.00001021,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00352149,
					eccentricity: 0.00079663,
					inclination: 28.24141738,
					longitudeAscendNode: 168.98420222,
					argumentOfPerihelion: 165.65101995,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00352221,
					eccentricity: 0.00067905,
					inclination: 27.8621176,
					longitudeAscendNode: 168.83746757,
					argumentOfPerihelion: 201.37887528,
				},
			},
			{
				name: "Iapetus",
				url: "Iapetus-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 79.3215,
				t_a: 2480186.5,
				m_a: 216.09955238,
				diameter: 0.00000982,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.0231509,
					eccentricity: 0.02785977,
					inclination: 17.23820439,
					longitudeAscendNode: 139.69175513,
					argumentOfPerihelion: 229.65550413,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.0231756,
					eccentricity: 0.02740913,
					inclination: 16.41144309,
					longitudeAscendNode: 136.84890733,
					argumentOfPerihelion: 237.95970512,
				},
			},
			{
				name: "Dione",
				url: "dione-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 2.736915,
				t_a: 2480186.5,
				m_a: 19.21044293,
				diameter: 0.00001509,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00251706,
					eccentricity: 0.00293004,
					inclination: 28.04139511,
					longitudeAscendNode: 169.47019679,
					argumentOfPerihelion: 164.91795178,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00251758,
					eccentricity: 0.00270998,
					inclination: 28.07077855,
					longitudeAscendNode: 169.50594302,
					argumentOfPerihelion: 75.43957145,
				},
			},
			{
				name: "Tethys",
				url: "tethys-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 1.887802,
				t_a: 2480186.5,
				m_a: 352.20690984,
				diameter: 0.0000144,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00196991,
					eccentricity: 0.00097092,
					inclination: 27.22072909,
					longitudeAscendNode: 167.99772568,
					argumentOfPerihelion: 158.04667079,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00196979,
					eccentricity: 0.00102711,
					inclination: 28.80826569,
					longitudeAscendNode: 167.86159259,
					argumentOfPerihelion: 111.89671063,
				},
			},
			{
				name: "Enceladus",
				url: "enceladus-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 1.370218,
				t_a: 2480186.5,
				m_a: 4.22707303,
				diameter: 0.00000337,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00158362,
					eccentricity: 0.00635175,
					inclination: 28.05202311,
					longitudeAscendNode: 169.50659563,
					argumentOfPerihelion: 135.48319849,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00158373,
					eccentricity: 0.00627623,
					inclination: 28.0516395,
					longitudeAscendNode: 169.49394987,
					argumentOfPerihelion: 94.07792423,
				},
			},
			{
				name: "Mimas",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 0.942421959,
				t_a: 2480186.5,
				m_a: 289.55172068,
				diameter: 0.00000265,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00121652,
					eccentricity: 0.02175637,
					inclination: 27.00265761,
					longitudeAscendNode: 172.05694495,
					argumentOfPerihelion: 108.72543786,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00121811,
					eccentricity: 0.02041742,
					inclination: 28.99435553,
					longitudeAscendNode: 166.89707985,
					argumentOfPerihelion: 328.30794479,
				},
			},
		],
	],
	[
		"Uranus", //"ariel", "umbriel", "titania", "oberon", "miranda"
		[
			{
				name: "Ariel",
				url: "ariel-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 2.52,
				t_a: 2480186.5,
				m_a: 334.18144518,
				diameter: 0.00000774,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00127446,
					eccentricity: 0.00150788,
					inclination: 97.72132069,
					longitudeAscendNode: 167.61677595,
					argumentOfPerihelion: 43.51598238,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00121811,
					eccentricity: 0.02041742,
					inclination: 28.99435553,
					longitudeAscendNode: 166.89707985,
					argumentOfPerihelion: 328.30794479,
				},
			},
			{
				name: "Umbriel",
				url: "umbriel-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 4.144,
				t_a: 2480186.5,
				m_a: 136.65399117,
				diameter: 0.00000782,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00177079,
					eccentricity: 0.00417057,
					inclination: 97.6793263,
					longitudeAscendNode: 167.63707473,
					argumentOfPerihelion: 334.29177793,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00177138,
					eccentricity: 0.0037175,
					inclination: 97.79193742,
					longitudeAscendNode: 167.63375204,
					argumentOfPerihelion: 204.46967059,
				},
			},
			{
				name: "Titania",
				url: "titania-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 8.706234,
				t_a: 2480186.5,
				m_a: 6.78526847,
				diameter: 0.00001054,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00290918,
					eccentricity: 0.00252897,
					inclination: 97.82120743,
					longitudeAscendNode: 167.61321812,
					argumentOfPerihelion: 204.71698133,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00291376,
					eccentricity: 0.00097609,
					inclination: 97.810702,
					longitudeAscendNode: 167.73407141,
					argumentOfPerihelion: 236.41893227,
				},
			},
			{
				name: "Oberon",
				url: "oberon-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 13.463234,
				t_a: 2480186.5,
				m_a: 247.48052783,
				diameter: 0.00001018,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00389876,
					eccentricity: 0.00056174,
					inclination: 97.87786398,
					longitudeAscendNode: 167.75630803,
					argumentOfPerihelion: 256.61132734,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00389538,
					eccentricity: 0.00129875,
					inclination: 97.88626905,
					longitudeAscendNode: 167.5988639,
					argumentOfPerihelion: 238.96632293,
				},
			},
			{
				name: "Miranda",
				url: "miranda-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 1.413479,
				t_a: 2480186.5,
				m_a: 345.85556401,
				diameter: 0.00000315,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00086684,
					eccentricity: 0.00150263,
					inclination: 97.26798585,
					longitudeAscendNode: 172.06596654,
					argumentOfPerihelion: 261.84763682,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00086704,
					eccentricity: 0.00128357,
					inclination: 100.42056252,
					longitudeAscendNode: 164.11397123,
					argumentOfPerihelion: 20.97335499,
				},
			},
		],
	],
	[
		"Neptune", //"triton"
		[
			{
				name: "Triton",
				url: "triton-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 5.876854,
				t_a: 2480186.5,
				m_a: 0.45069261,
				diameter: 0.00001809,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00237145,
					eccentricity: 0.00021429,
					inclination: 130.25578468,
					longitudeAscendNode: 215.85163819,
					argumentOfPerihelion: 74.58732853,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00237139,
					eccentricity: 0.00024242,
					inclination: 129.22074605,
					longitudeAscendNode: 236.49463865,
					argumentOfPerihelion: 310.42861049,
				},
			},
		],
	],
	[
		"Pluto", //"Charon", "hydra", "nix", "kerberos", "styx"
		[
			{
				name: "Charon",
				url: "charon-texture-map.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 6.387221,
				t_a: 2480186.5,
				m_a: 359.96097003,
				diameter: 0.0000081,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00013101,
					eccentricity: 0.12152437,
					inclination: 112.89080976,
					longitudeAscendNode: 227.3916867,
					argumentOfPerihelion: 321.21594941,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00013101,
					eccentricity: 0.12153334,
					inclination: 112.8889331,
					longitudeAscendNode: 227.39600887,
					argumentOfPerihelion: 28.70884175,
				},
			},
			{
				name: "Hydra",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 38.20177,
				t_a: 2480186.5,
				m_a: 117.6731241,
				diameter: 5.0803e-7,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00041773,
					eccentricity: 0.36646878,
					inclination: 112.68669084,
					longitudeAscendNode: 227.56728957,
					argumentOfPerihelion: 283.34768394,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00031116,
					eccentricity: 0.18294001,
					inclination: 112.85884559,
					longitudeAscendNode: 227.09904117,
					argumentOfPerihelion: 20.11819304,
				},
			},
			{
				name: "Nix",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 24.85463,
				t_a: 2480186.5,
				m_a: 202.22163424,
				diameter: 4.9466e-7,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00020909,
					eccentricity: 0.20442471,
					inclination: 112.88844558,
					longitudeAscendNode: 227.4192595,
					argumentOfPerihelion: 304.76262578,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00020444,
					eccentricity: 0.21332029,
					inclination: 112.86533419,
					longitudeAscendNode: 227.38723706,
					argumentOfPerihelion: 44.19673709,
				},
			},
			{
				name: "Kerberos",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 32.16756,
				t_a: 2480186.5,
				m_a: 2.38469165,
				diameter: 1.6932e-7,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00039544,
					eccentricity: 0.55498621,
					inclination: 113.23849367,
					longitudeAscendNode: 227.24051183,
					argumentOfPerihelion: 298.72807324,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00039631,
					eccentricity: 0.58060046,
					inclination: 112.86484676,
					longitudeAscendNode: 227.81506558,
					argumentOfPerihelion: 47.60750499,
				},
			},
			{
				name: "Styx",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 20.16155,
				t_a: 2480186.5,
				m_a: 2.42660107,
				diameter: 1.4706e-7,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00025362,
					eccentricity: 0.10077754,
					inclination: 112.86495221,
					longitudeAscendNode: 227.34218484,
					argumentOfPerihelion: 296.46589303,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00029681,
					eccentricity: 0.54363408,
					inclination: 112.91720662,
					longitudeAscendNode: 227.35461598,
					argumentOfPerihelion: 44.31072099,
				},
			},
		],
	],
	[
		"Makemake",
		[
			{
				name: "S/2015 (136472) 1",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 12.4,
				t_a: 2480186.5,
				m_a: 0, //unknown
				diameter: 0.00000117,
				keplerianJ2000: {
					//obtained from SPICE, J = 2451545
					semiMajorAxis: 0.00014038,
					eccentricity: 0.01, //unknown, assume close to circular
					inclination: 0, //unknown, assume 0
					longitudeAscendNode: 123.95805544, //unknown
					argumentOfPerihelion: 315.4342062, //unknown
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2480186.5
					semiMajorAxis: 0.00014038,
					eccentricity: 0.01, //unknown, assume close to circular
					inclination: 0, //unknown, assume 0
					longitudeAscendNode: 48.21595207, //unknown
					argumentOfPerihelion: 355.27377926, //unknown
				},
			},
		],
	],
	[
		"Haumea",
		[
			{
				//J2000 & JArbitrary the same because not enough data, https://arxiv.org/pdf/0903.4213
				name: "Hi'iaka",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 49.12,
				t_a: 2454615.0,
				m_a: 152.8,
				diameter: 0.00000214,
				keplerianJ2000: {
					//obtained from SPICE, J = 2454615.0
					semiMajorAxis: 0.00033343,
					eccentricity: 0.0513,
					inclination: 126.356,
					longitudeAscendNode: 206.766,
					argumentOfPerihelion: 154.1,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2454615.0
					semiMajorAxis: 0.00033343,
					eccentricity: 0.0513,
					inclination: 126.356,
					longitudeAscendNode: 206.766,
					argumentOfPerihelion: 154.1,
				},
			},
			{
				//J2000 & JArbitrary the same because not enough data, https://arxiv.org/pdf/0903.4213
				name: "Namaka",
				url: "2k_neptune.jpg",
				zoomLevel: 0.1,
				siderealPeriod: 18.2783,
				t_a: 2454615.0,
				m_a: 178.5,
				diameter: 0.00000114,
				keplerianJ2000: {
					//obtained from SPICE, J = 2454615.0
					semiMajorAxis: 0.00017151,
					eccentricity: 0.249,
					inclination: 113.013,
					longitudeAscendNode: 205.016,
					argumentOfPerihelion: 178.9,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2454615.0
					semiMajorAxis: 0.00017151,
					eccentricity: 0.249,
					inclination: 113.013,
					longitudeAscendNode: 205.016,
					argumentOfPerihelion: 178.9,
				},
			},
		],
	],
	[
		"Eris",
		[
			{
				//J2000 & JArbitrary the same because not enough data, https://arxiv.org/pdf/2009.13733
				name: "Dysnomia",
				url: "2k_neptune.jpg",
				zoomLevel: 0.15,
				siderealPeriod: 15.785899,
				t_a: 2453979.0,
				m_a: 178.78,
				diameter: 0.00000822,
				keplerianJ2000: {
					//obtained from SPICE, J = 2453979.0
					semiMajorAxis: 0.00024915,
					eccentricity: 0.0062,
					inclination: 0, //or 45 to celestil equator
					longitudeAscendNode: 126.17,
					argumentOfPerihelion: 180.83,
				},
				keplerianArbitrary: {
					//obtained from SPICE, J = 2453979.0
					semiMajorAxis: 0.00024915,
					eccentricity: 0.0062,
					inclination: 0, //or 45 to celestil equator
					longitudeAscendNode: 126.17,
					argumentOfPerihelion: 180.83,
				},
			},
		],
	],
	["Ceres", []],
]);
