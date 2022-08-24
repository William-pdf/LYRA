Captain's Log, Stardate 8/19/2022: Docker Compose and the Eternal questions about Databases:

    Today the question about how our song request app would be built came out in full force. Micro-services V Monoliths, module one concepts re-introduced as design issues.  They said it would happen, and it has.  For the scope of this project keeping the accounts and the request features inside of a single django architecture makes sense. We just hope that the two DATABASE_URL definitions work and are accessible in the Django project.


Captain's Log, Stardate 8/20/2022: Postgres quick fix(bandaid fix, need to solve real problem(the bathman?)):

    I don't know why the docker compose is not creating my databases. But whatever I can have someone look at the composition of the whole thing later. even though I barely know any SQL, I just got into the terminal and made some databases. I made some users and set them as owners.  Now I can start working on the meat and potatoes of this whole thing.  I need to remember to get a more specific walk-through of the docker compose and where everything is connecting. This quick fix did let me get the Django container running so I made some models registered them with the admin and input some data.  I do realize tho that making everyone make their DBs in sql will be a huge pain in the ass, so I need to fix the docker automation on monday, first thing.


Captain's Log, Stardate 8/22/2022: Views and Tests:

    Today we went over testing today and then I wanted to implement it quickly into the project.  My ah ha moment was while I was trying to get the tests to work I found some logical issues in my view function.  Me and Matt were working through the test writing process together when it hit us.  Writing tests, helps you write better code.  I get it now.  The first test was a process of me just trying to get the test to work,  I knew the code was functional at that point.  But, when I executed that same type of test on another function the script flipped.  I now knew the test was right and there was something in my view that was off.  After this experience I am going to keep writing tests as I write functions.  Maybe even before I write the functions.


Captain's Log Stardate 8/23/2022: More Tests and the back of the Backend: 

    The tests...are proving to be...more...and more helpful.  I met their leader today.  A quite creature...filled... with wisdom.  He told me that the tests...are there to guide...your code, and then...after they issue a decree of passed.  You can...try it...in..insomnia.  Ok thats enough Kirk.  But as I have come to the end of the first pass of back end code with models, views and urls.  The use of writing tests before manual testing has been really helpful.  I need to get more into testing specifics of certain things like, testing specific content instead of response codes.  But for now I am able to use the response code test as a first hurdle, and then I can get into insomnia and see what is actually being returned, to make sure the json responses can be used in the front end.

Captain's Log Stardate 8/24/2022: CI/CD Pipelines:
    Today I am implementing the CI/CD pipeline.