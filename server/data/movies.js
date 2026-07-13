const movies = [
  {
    title: "Interstellar",
    description:
      "A team of astronauts travels through a wormhole in search of humanity's new home.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 169,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine"
    ],
    rating: 8.7,
    releaseDate: new Date("2014-11-07"),
    posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Inception",
    description:
      "A skilled thief enters dreams to steal secrets but is given an impossible mission.",
    type: "movie",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Tom Hardy",
      "Elliot Page"
    ],
    rating: 8.8,
    releaseDate: new Date("2010-07-16"),
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Oppenheimer",
    description:
      "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
    type: "movie",
    genre: ["Biography", "Drama", "History"],
    duration: 180,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr."
    ],
    rating: 8.5,
    releaseDate: new Date("2023-07-21"),
    posterUrl: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Dune",
    description:
      "Paul Atreides leads nomadic tribes in a battle for the desert planet Arrakis.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    duration: 155,
    language: "English",
    director: "Denis Villeneuve",
    cast: [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Oscar Isaac"
    ],
    rating: 8.2,
    releaseDate: new Date("2021-10-22"),
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with the Fremen to seek revenge and shape the future of Arrakis.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    duration: 166,
    language: "English",
    director: "Denis Villeneuve",
    cast: [
      "Timothée Chalamet",
      "Zendaya",
      "Florence Pugh",
      "Austin Butler"
    ],
    rating: 8.6,
    releaseDate: new Date("2024-03-01"),
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "The Dark Knight",
    description:
      "Batman faces the Joker in one of the greatest superhero films ever made.",
    type: "movie",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Gary Oldman"
    ],
    rating: 9.0,
    releaseDate: new Date("2008-07-18"),
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Avatar",
    description:
      "A marine becomes part of the Na'vi tribe on the distant moon Pandora.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    duration: 162,
    language: "English",
    director: "James Cameron",
    cast: [
      "Sam Worthington",
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Stephen Lang"
    ],
    rating: 7.9,
    releaseDate: new Date("2009-12-18"),
    posterUrl: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Avatar: The Way of Water",
    description:
      "Jake Sully and his family face a new threat while exploring Pandora's oceans.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    duration: 192,
    language: "English",
    director: "James Cameron",
    cast: [
      "Sam Worthington",
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Kate Winslet"
    ],
    rating: 7.8,
    releaseDate: new Date("2022-12-16"),
    posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Top Gun: Maverick",
    description:
      "Pete 'Maverick' Mitchell trains a new generation of elite fighter pilots.",
    type: "movie",
    genre: ["Action", "Drama"],
    duration: 131,
    language: "English",
    director: "Joseph Kosinski",
    cast: [
      "Tom Cruise",
      "Miles Teller",
      "Jennifer Connelly",
      "Jon Hamm"
    ],
    rating: 8.3,
    releaseDate: new Date("2022-05-27"),
    posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "John Wick: Chapter 4",
    description:
      "John Wick faces the High Table in his deadliest mission yet.",
    type: "movie",
    genre: ["Action", "Crime", "Thriller"],
    duration: 169,
    language: "English",
    director: "Chad Stahelski",
    cast: [
      "Keanu Reeves",
      "Donnie Yen",
      "Bill Skarsgård",
      "Laurence Fishburne"
    ],
    rating: 8.1,
    releaseDate: new Date("2023-03-24"),
    posterUrl: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    featured: false,
    isActive: true
  },
  {
    title: "The Matrix",
    description:
      "A hacker discovers reality is a simulation and joins the fight against intelligent machines.",
    type: "movie",
    genre: ["Sci-Fi", "Action"],
    duration: 136,
    language: "English",
    director: "The Wachowskis",
    cast: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving"
    ],
    rating: 8.7,
    releaseDate: new Date("1999-03-31"),
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "The Martian",
    description:
      "An astronaut stranded on Mars must survive using science and ingenuity.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 144,
    language: "English",
    director: "Ridley Scott",
    cast: [
      "Matt Damon",
      "Jessica Chastain",
      "Kate Mara",
      "Jeff Daniels"
    ],
    rating: 8.0,
    releaseDate: new Date("2015-10-02"),
    posterUrl: "https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "The Prestige",
    description:
      "Two rival magicians push obsession to dangerous limits while competing for supremacy.",
    type: "movie",
    genre: ["Drama", "Mystery", "Thriller"],
    duration: 130,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Hugh Jackman",
      "Scarlett Johansson",
      "Michael Caine"
    ],
    rating: 8.5,
    releaseDate: new Date("2006-10-20"),
    posterUrl: "https://image.tmdb.org/t/p/w500/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Tenet",
    description:
      "A secret agent manipulates the flow of time to prevent global catastrophe.",
    type: "movie",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 150,
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "John David Washington",
      "Robert Pattinson",
      "Elizabeth Debicki",
      "Kenneth Branagh"
    ],
    rating: 7.8,
    releaseDate: new Date("2020-08-26"),
    posterUrl: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Gladiator",
    description:
      "A betrayed Roman general rises through the arena seeking justice and revenge.",
    type: "movie",
    genre: ["Action", "Drama", "History"],
    duration: 155,
    language: "English",
    director: "Ridley Scott",
    cast: [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen",
      "Oliver Reed"
    ],
    rating: 8.5,
    releaseDate: new Date("2000-05-05"),
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Ford v Ferrari",
    description:
      "Ford challenges Ferrari at Le Mans with an extraordinary racing team.",
    type: "movie",
    genre: ["Drama", "Sport"],
    duration: 153,
    language: "English",
    director: "James Mangold",
    cast: [
      "Matt Damon",
      "Christian Bale",
      "Jon Bernthal",
      "Josh Lucas"
    ],
    rating: 8.1,
    releaseDate: new Date("2019-11-15"),
    posterUrl: "https://image.tmdb.org/t/p/w500/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "The Batman",
    description:
      "Batman investigates corruption in Gotham while hunting the Riddler.",
    type: "movie",
    genre: ["Action", "Crime", "Mystery"],
    duration: 176,
    language: "English",
    director: "Matt Reeves",
    cast: [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Paul Dano",
      "Colin Farrell"
    ],
    rating: 7.8,
    releaseDate: new Date("2022-03-04"),
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Joker",
    description:
      "A struggling comedian descends into madness and becomes Gotham's infamous villain.",
    type: "movie",
    genre: ["Crime", "Drama", "Thriller"],
    duration: 122,
    language: "English",
    director: "Todd Phillips",
    cast: [
      "Joaquin Phoenix",
      "Robert De Niro",
      "Zazie Beetz",
      "Frances Conroy"
    ],
    rating: 8.4,
    releaseDate: new Date("2019-10-04"),
    posterUrl: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    featured: false,
    isActive: true
  },

  {
    title: "Spider-Man: No Way Home",
    description:
      "Peter Parker seeks Doctor Strange's help after his identity is revealed.",
    type: "movie",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: 148,
    language: "English",
    director: "Jon Watts",
    cast: [
      "Tom Holland",
      "Zendaya",
      "Benedict Cumberbatch",
      "Jacob Batalon"
    ],
    rating: 8.2,
    releaseDate: new Date("2021-12-17"),
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    featured: true,
    isActive: true
  },

  {
    title: "Avengers: Endgame",
    description:
      "The Avengers unite for one final battle to reverse Thanos' snap.",
    type: "movie",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: 181,
    language: "English",
    director: "Anthony Russo & Joe Russo",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson",
      "Chris Hemsworth"
    ],
    rating: 8.4,
    releaseDate: new Date("2019-04-26"),
    posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    featured: true,
    isActive: true
  },
];

export default movies;
