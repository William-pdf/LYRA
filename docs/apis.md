# APIs

songs api: "songs/"

song api: "songs/<int:pk/">

categories api: "categories/"

category api: "categories/<int:pk>/"

accounts api base: https://lyra-accounts-api.herokuapp.com/

song-request-api base: https://lyra-song-request-api.herokuapp.com/

# App Enpoints

Home url(create project/signup): "/BMAP"

Project Home: "/BMAP/{group_id}"

# accounts endpoints

make group(band/project)entity: "/BMAP/new_group/"

make group member: "/BMAP/{group_id}/new_member/"

delete/edit permissions and roles(with auth): "/BMAP/{group_id}/admin/"

delete/edit permissions and roles(with auth): "/BMAP/{group_id}/admin"

public front end for requests: "/BMAP/{group_id}/requests/"

public front end for requests: "/trl/requests/"

band frontend request list: "/trl/requests_list/"

user catalog: "trl/catalog/"

song api: "songs/<int:pk/>"

create song: "/trl/catalog/new/"

edit song: "trl/catalog/<int:pk>/"

category api: "categories/<int:pk/>/"

songlist api: "trl/api/songs/"

song api: "trl/api/songs/<int:pk>/">

categories api: "trl/api/categories/"

category api: "trl/api/categories/<int:pk>/"
