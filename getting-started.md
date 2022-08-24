Howdy welcome to LYRA. This is a quick way to get your database set up for local use!

After cloning the repo, follow these steps to get the database into working order
steps with a ( >>> ) indicate to use a terminal or CLI to input the command

1. Delete old version of database (if it exists) and create a new one (run commands from anywhere in your system)
   i) any directory >>> docker volume remove postgres-data
   ii) any directory >>> docker volume create postgres-data

2. Build and run the project with Docker (run commands from inside top level directory of project: 'Band-Managing-App')
   i) from BMAP/LYRA directory >>> docker-compose build (for M1 Macs: DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build )
   ii) from BMAP/LYRA directory >>> docker-compose up

3. More instructions to follow