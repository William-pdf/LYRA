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

public front end for requests: "/BMAP/{group_id}/requests/"

band frontend request list: "/BMAP/{group_id}/requests_list/"

songlist api: "songs/"

song api: "songs/<int:pk/>"

categories api: "categories/"

category api: "categories/<int:pk/>/"
