# APIs

songs api: "songs/"

song api: "songs/<int:pk/">

categories api: "categories/"

category api: "categories/<int:pk>/"

# App Enpoints

Home url(create project/signup): "/BMAP"

Project Home: "/BMAP/{group_id}"

# accounts endpoints

make group(band/project)entity: "/BMAP/new_group/"

make group member: "/BMAP/{group_id}/new_member/"

delete/edit permissions and roles(with auth): "/BMAP/{group_id}/admin/"

# song request endpoints
<<<<<<< HEAD

public front end for requests: "/BMAP/{group_id}/requests/"

band frontend request list: "/BMAP/{group_id}/requests_list/"
=======
public front end for requests: "/trl/requests/"

band frontend request list: "/trl/requests_list/"
>>>>>>> 59c25f24038d063f29d72b6242dbc5e22aff84b8

user catalog: "trl/catalog/"

<<<<<<< HEAD
song api: "songs/<int:pk/>"
=======
create song: "/trl/catalog/new/"
>>>>>>> 59c25f24038d063f29d72b6242dbc5e22aff84b8

edit song: "trl/catalog/<int:pk>/"

<<<<<<< HEAD
category api: "categories/<int:pk/>/"
=======

songlist api: "trl/api/songs/"

song api: "trl/api/songs/<int:pk>/">

categories api: "trl/api/categories/"

category api: "trl/api/categories/<int:pk>/"
>>>>>>> 59c25f24038d063f29d72b6242dbc5e22aff84b8
