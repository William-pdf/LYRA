Day 1: Docker Compose and the Eternal questions about Databases, 8/19/2022:

Today the question about how our song request app would be built came out in full force.
Micro-services V Monoliths, module one concepts re-introduced as design issues.  They said
it would happen, and it has.  For the scope of this project keeping the accounts and the request
features inside of a single django architecture makes sense.
We just hope that the two DATABASE_URL definitions work and are accessible in the Django project.


Day 2: Postgres quick fix(bandaid fix, need to solve real problem(the bathman?)) 8/20/2022:

I don't know why the docker compose is not creating my databases.
But whatever I can have someone look at the composition of the whole thing later.
even though I barely know any SQL, I just got into the terminal and made some databases.
I made some users and set them as owners.  Now I can start working on the meat and potatoes of this whole thing.  I need to remember to get a more specific walk-through of the docker compose and where everything is connecting.
This quick fix did let me get the Django container running so I made some models registered them with the admin and input some data.  I do realize tho that making everyone make their DBs in sql will be a huge pain in the ass, so I need to fix the docker automation on monday, first thing.



