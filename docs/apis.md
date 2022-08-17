# APIs
audio file api: "/BMAP/{group_id}/writting/audio"

lyrics file api: "/BMAP/{group_id}/writting/lyrics"

songlist api: "/BMAP/{group_id}/requests_titles"

video file api: "/BMAP/{group_id}/pr/video_api"

image api: "/BMAP/{group_id}/pr/image_api"

text api: "/BMAP/{group_id}/pr/text_api"

finance api: "/BMAP/{group_id}/money/money_api"

# App Enpoints
Home url(create project/signup): "/BMAP"

Project Home: "/BMAP/{group_id}"



# accounts endpoints
make group(band/project)entity: "/BMAP/new_group"

make group member: "/BMAP/{group_id}/new_member"

delete/edit permissions and roles(with auth): "/BMAP/{group_id}/admin"



# song request endpoints
public front end for requests: "/BMAP/{group_id}/requests"

band frontend request list: "/BMAP/{group_id}/requests_list"

songlist api: "/BMAP/{group_id}/requests_titles"


# songwritting audio asset endpoints
audio file api: "/BMAP/{group_id}/writting/audio"

lyrics file api: "/BMAP/{group_id}/writting/lyrics"

writting, projects(group) frontend: "/BMAP/{group_id}/writting"


# PR and Venue Assets endpoints
video file api: "/BMAP/{group_id}/pr/video_api"

image api: "/BMAP/{group_id}/pr/image_api"

text api: "/BMAP/{group_id}/pr/text_api"

user main front end: "/BMAP/{group_id}/pr"

images folder frontend: "/BMAP/{group_id}/pr/images"

image "logo": "/BMAP/{group_id}/pr/images/logos"

image "band pics": "/BMAP/{group_id}/pr/images/group_pics"

image "Promo": "/BMAP/{group_id}/pr/images/promo"

video folder frontend: "/BMAP/{group_id}/pr/videos"

video "music videos": "/BMAP/{group_id}/pr/videos/music_vids"

video "live video": "/BMAP/{group_id}/pr/videos/live_vid"

video "promo": "/BMAP/{group_id}/pr/videos/promo"

text folder frontend: "/BMAP/{group_id}/pr/text"

text "bios": "/BMAP/{group_id}/pr/text/bios"

text "press releases": "/BMAP/{group_id}/pr/text/press"

text "promo": "/BMAP/{group_id}/pr/text/promo"


# finance endpoints
finance api: "/BMAP/{group_id}/money/money_api"

finance spreadsheet frontend: "/BMAP/{group_id}/money"

expense: "/BMAP/{group_id}/money/expense"

income: "/BMAP/{group_id}/money/income"