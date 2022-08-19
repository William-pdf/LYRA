# Band Managing App

PWA - progressive web app ?
Maybe BMAP for short?
MUMA - Music Management?  (this feel appropriate for the tech world lol)
TRL - Total Request Live?
LYRA - Live Request App 

# Team "The Terminal Tyrants" Members

Carter
William
Deion
Matt
Armen

# microservices
# MVP
    accounts ---
        * Login as band member
        * Authorization
            * Band layer
                * Member layer (admin, #accountant, #songwriter, member)
                    * Microservice permissions


    song request ---
        * database of song titles
        * list of requests
        * band front-end (list of requests)
        * audience front-end (search bar/selecting functionality)
        * utilizing QR code

# Stretch Goals
    songwritting audio assets ---
        * database of audio files.
        * Upload feature for audio files
        * Playback feature for audio files
        * Song entity (audio file, lyric file(giant text field?))
        * categories for song entity (shelf, in progress, completed)
        * Feature to update and delete song entity
        * Filter through categories feature (search bar or ios side letters)
        * if song completed, add to database of song titles


    PR and venue assets ---
        * database of image, video, and text files
            * images
                * logos
                * band pics
                * promos
            * videos
                * music videos
                * live videos
                * promos
            * text
                * bios
                * press release


    finance ---
        * database housing finance table
        * create expense endpoint
        * create income endpoint
        * spreadsheet (excel like) with all income and expense instances and a bottome line



# Ideal Project

SONG REQUEST
    Song Request feature
        -song search
        -live version with requester name(from account login)
        -preshow version
            -show live updated "song by percentage selected"
        -band tip (optional)
        -ad revenue (banners) (percentage of ad revenue goes back to band as use credit)
    Request List Feature
        -see list of requests(live)
        -see song by percentage selected(preshow)
        -reorder and/or removal of song list
        -shuffle feature
    Cataloge of Songs
        -add song
        -remove song
        -update song/toggle visibility to request feature
        -search for song
        -detail view for song

ACCOUNTS
    Audience
        -access to Song Request Feature ONLY
    Project Entity
        -connected to performers that either created the project or were given a form of access
        -different access levels (admin or member)
        -keeps seperation of members from different projects
    Performer
        -project access level defined
        -can be part of multiple projects
        -has access to Song Request Audience feature

# MVP

SONG REQUEST
    Song Request feature
        -song search
        -live version with requester name(from account login)

    Request List Feature
        -see list of requests(live)
        -reorder and/or removal of song list

    Cataloge of Songs
        -add song
        -remove song
        -update song/toggle visibility to request feature
        -search for song
        -detail view for song
ACCOUNTS
    Audience
        -access to Song Request Feature ONLY
    Project Entity
        -connected to performers that either created the project or were given a form of access
        -different access levels (admin or member)
        -keeps seperation of members from different projects
    Performer
        -project access level defined
        -can be part of multiple projects
        -has access to Song Request Audience feature
