# APIs

songs api: "songs/"

song api: "songs/<int:pk/">

categories api: "categories/"

category api: "categories/<int:pk>/"



# App Enpoints
Home url(create project/signup): "/BMAP"

Project Home: "/BMAP/{group_id}"



# accounts endpoints
make group(band/project)entity: "/BMAP/new_group"

make group member: "/BMAP/{group_id}/new_member"

delete/edit permissions and roles(with auth): "/BMAP/{group_id}/admin"



# song request endpoints
public front end for requests: "/trl/requests/"

band frontend request list: "/trl/requests_list/"

user catalog: "trl/catalog/"

create song: "/trl/catalog/new/"

edit song: "trl/catalog/<int:pk>/"


songlist api: "trl/api/songs/"

song api: "trl/api/songs/<int:pk>/">

categories api: "trl/api/categories/"

category api: "trl/api/categories/<int:pk>/"
