# Live Request App
    LYRA  

# Team "The Terminal Tyrants" Members
    Carter
    William
    Deion
    Matt
    Armen

# MVP
    SONG REQUEST
        Song Request feature
            -song search
            -live version with requester name(from account login)
            -pre-show version
                -show live updated "song by percentage selected"
        Request List Feature
            -see list of requests(live)
            -reorder and/or removal of song list
            -see song by percentage selected(pre-show)
        Catalog of Songs
            -add song
            -remove song
            -update song/toggle visibility to request feature
            -search for song
            -detail view for song
    ACCOUNTS
        Single User Role
            -can access all audience request pages
            -has own catalog of songs
            -has own performer frontend
            -has own audience frontend if they put in a "Band Name" in their profile.



# Stretch Goals
    Pure Microservice Implementation

    SONG REQUEST
        Song Request feature
            -song search
            -live version with requester name(from account login)
            -pre-show version
                -show live updated "song by percentage selected"
            -band tip (optional)
            -ad revenue (banners) (percentage of ad revenue goes back to band as use credit)
        Request List Feature
            -see list of requests(live)
            -see song by percentage selected(pre-show)
            -reorder and/or removal of song list
            -shuffle feature
        Catalog of Songs
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
            -keeps separation of members from different projects
        Performer
            -project access level defined
            -can be part of multiple projects
            -has access to Song Request Audience feature


# Stretch Continuation

-use websockets for request queue
