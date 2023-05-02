"use strict";

const {
  db,
  models: { User, Movies, Cart, CartItems },
} = require("../server/db");

const movies = [
  {
    Title: "The Lion King",
    Genre: "Animation, Adventure, Drama",
    Director: "Roger Allers, Rob Minkoff",
    LeadActor:
      "Matthew Broderick, Jeremy Irons, James Earl Jones, Whoopi Goldberg",
    Description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
  },
  {
    Title: "Aladdin",
    Genre: "Animation, Adventure, Comedy",
    Director: "Ron Clements, John Musker",
    LeadActor: "Scott Weinger, Robin Williams, Linda Larkin, Jonathan Freeman",
    Description:
      "A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/bd/Aladdin_%281992_Disney_film%29_poster.jpg",
  },
  {
    Title: "Snow White and the Seven Dwarfs",
    Genre: "Animation, Adventure, Family",
    Director:
      "William Cottrell, David Hand, Wilfred Jackson, Larry Morey, Perce Pearce, Ben Sharpsteen",
    LeadActor:
      "Adriana Caselotti, Harry Stockwell, Lucille La Verne, Roy Atwell",
    Description:
      "Exiled into the dangerous forest by her wicked stepmother, a princess is rescued by seven dwarf miners who make her part of their household.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/49/Snow_White_1937_poster.png",
  },
  {
    Title: "Titanic",
    Genre: "Drama, Romance",
    Director: "James Cameron",
    LeadActor: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
    Description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
  },
  {
    Title: "Jurassic Park",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Steven Spielberg",
    LeadActor: "Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough",
    Description:
      "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
  },
  {
    Title: "Independence Day",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Roland Emmerich",
    LeadActor: "Will Smith, Bill Pullman, Jeff Goldblum, Mary McDonnell",
    Description:
      "The aliens are coming and their goal is to invade and destroy Earth. Fighting superior technology, mankind's best weapon is the will to survive.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/bb/Independence_day_movieposter.jpg",
  },
  {
    Title: "The Shawshank Redemption",
    Genre: "Drama",
    Director: "Frank Darabont",
    LeadActor: "Tim Robbins",
    Description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  },
  {
    Title: "The Godfather",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    LeadActor: "Marlon Brando",
    Description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",

    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
  },
  {
    Title: "The Dark Knight",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    LeadActor: "Christian Bale",
    Description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
  },
  {
    Title: "12 Angry Men",
    Genre: "Drama",
    Director: "Sidney Lumet",
    LeadActor: "Henry Fonda",
    Description:
      "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/12_Angry_Men_1997_film_poster.jpg",
  },
  {
    Title: "Schindler's List",
    Genre: "Biography, Drama, History",
    Director: "Steven Spielberg",
    LeadActor: "Liam Neeson",
    Description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
  },
  {
    Title: "The Lord of the Rings: The Return of the King",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    LeadActor: "Elijah Wood",
    Description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg",
  },
  {
    Title: "Pulp Fiction",
    Genre: "Crime, Drama",
    Director: "Quentin Tarantino",
    LeadActor: "John Travolta",
    Description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    LeadActor: "Elijah Wood",
    Description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
  },
  {
    Title: "The Good, the Bad and the Ugly",
    Genre: "Western",
    Director: "Sergio Leone",
    LeadActor: "Clint Eastwood",
    Description:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/45/Good_the_bad_and_the_ugly_poster.jpg",
  },
  {
    Title: "Forrest Gump",
    Genre: "Drama, Romance",
    Director: "Robert Zemeckis",
    LeadActor: "Tom Hanks",
    Description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/220px-Forrest_Gump_poster.jpg",
  },
  {
    Title: "Inception",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Christopher Nolan",
    LeadActor: "Leonardo DiCaprio",
    Description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
  },
  {
    Title: "The Lord of the Rings: The Two Towers",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    LeadActor: "Elijah Wood",
    Description:
      "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/d0/Lord_of_the_Rings_-_The_Two_Towers_%282002%29.jpg",
  },
  {
    Title: "The Matrix",
    Genre: "Action, Sci-Fi",
    Director: "Lana Wachowski, Lilly Wachowski",
    LeadActor: "Keanu Reeves",
    Description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
  },
  {
    Title: "Goodfellas",
    Genre: "Crime, Drama",
    Director: "Martin Scorsese",
    LeadActor: "Robert De Niro",
    Description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    Price: 20,
    ImageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
  },
  {
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Genre: "Action, Adventure, Fantasy",
    Director: "Irvin Kershner",
    LeadActor: "Mark Hamill",
    Description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg",
  },
  {
    Title: "One Flew Over the Cuckoo's Nest",
    Genre: "Drama",
    Director: "Milos Forman",
    LeadActor: "Jack Nicholson",
    Description:
      "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/26/One_Flew_Over_the_Cuckoo%27s_Nest_poster.jpg",
  },
  {
    Title: "The Silence of the Lambs",
    Genre: "Crime, Drama, Thriller",
    Director: "Jonathan Demme",
    LeadActor: "Jodie Foster",
    Description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
  },
  {
    Title: "Se7en",
    Genre: "Crime, Drama, Mystery",
    Director: "David Fincher",
    LeadActor: "Morgan Freeman",
    Description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/68/Seven_%28movie%29_poster.jpg",
  },
  {
    Title: "Tombstone",
    Genre: "Action, Drama, History",
    Director: "George P. Cosmatos, Kevin Jarre",
    LeadActor: "Kurt Russell",
    Description:
      "A successful lawman's plans to retire anonymously in Tombstone, Arizona, are disrupted by the kind of outlaws he was famous for eliminating.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/71/Tombstoneposter.jpeg",
  },
  {
    Title: "Casino",
    Genre: "Crime, Drama",
    Director: "Martin Scorsese",
    LeadActor: "Robert De Niro",
    Description:
      "A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive, compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/d8/Casino_poster.jpg",
  },
  {
    Title: "Billy Madison",
    Genre: "Comedy",
    Director: "Tamra Davis",
    LeadActor: "Adam Sandler",
    Description:
      "In order to inherit his fed up father's hotel empire, an immature and lazy man must repeat grades 1-12 all over again.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/07/Billy_madison_poster.jpg",
  },
  {
    Title: "Scarface",
    Genre: "Crime, Drama",
    Director: "Brian De Palma",
    LeadActor: "Al Pacino",
    Description:
      "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/71/Scarface_-_1983_film.jpg",
  },
  {
    Title: "Mystic River",
    Genre: "Crime, Drama, Mystery",
    Director: "Clint Eastwood",
    LeadActor: "Sean Penn",
    Description:
      "With a childhood tragedy that overshadowed their lives, three men are reunited by circumstance when one loses a daughter.",
    Price: 20,
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/93/Mystic_River_poster.jpg",
  },
  {
    Title: "Space Jam",
    Genre: "Animation, Adventure, Comedy",
    Director: "Joe Pytka",
    LeadActor: "Michael Jordan",
    Description:
      "In a desperate attempt to win a basketball match and earn their freedom, the Looney Tunes seek the aid of retired basketball champion, Michael Jordan.",
    Price: 20,
    ImageUrl: "https://upload.wikimedia.org/wikipedia/en/1/14/Space_jam.jpg",
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const usersArray = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody@example.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@example.com",
    }),
  ]);

  const users = {
    cody: usersArray[0],
    murphy: usersArray[1],
  };

  const createdMovies = await Promise.all(
    movies.map((movie) => {
      return Movies.create(movie);
    })
  );

  const carts = [];

  carts.push(
    await Cart.create({ userId: users.murphy.id }, { include: [User] })
  );

  carts.push(await Cart.create({ userId: users.cody.id }, { include: [User] }));

  await CartItems.create({
    quantity: 1,
    MovieId: 1,
    CartId: carts[0].id,
  });

  await CartItems.create({
    quantity: 2,
    MovieId: 2,
    CartId: carts[1].id,
  });

  console.log(`seeded ${usersArray.length} users`);
  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded ${createdMovies.length} movies`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users.cody,
      murphy: users.murphy,
    },
    movies: createdMovies,
    carts: carts,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
