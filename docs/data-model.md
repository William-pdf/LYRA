## Accounts

**Band/Group/Project**

| Name    | Type                        | Unique | Optional |
| ------- | --------------------------- | ------ | -------- |
| name    | string                      | no     | no       |
| members | 1 to many with admin/member | no     | no       | 

Audio file access handled by permissions? JWT would remove the need to store permissions on db models?

**Admin**

| Name | Type                          | Unique | Optional |
| ---- | ----------------------------- | ------ | -------- |
| name | string                        | no     | no       |
| band | database relationship to Band | no     | no       | 

**Generic Member**

| Name             | Type              | Unique | Optional |
| ---------------- | ----------------- | ------ | -------- |
| name             | string            | no     | no       |
| band | database relationship to Band | no     | no       | 

## Song Requests

**Song Entry**

| Name           | Type                               | Unique | Optional |
| -------------- | ---------------------------------- | ------ | -------- |
| song title     | string                             | yes    | no       |
| artist         | string                             | no     | yes      | 
| category/genre | database relation to Category      | yes    | no       |
| is_requested   | boolean                            | no     | no       |
| band_owner     | database relation to a single Band | yes    | no       |
|is_requestable  | boolean                            | no     | no       |

(The database can store the same song name under different band owners.)

**Category/genre**

| Name | Type   | Unique | Optional |
| ---- | ------ | ------ | -------- |
| name | string | yes    | no       | 

Songs marked as requested would be sent and stored to the frontend, likely React state. Need to figure out real-time update. Timed refresh. Web Sockets? Poller?

## Songwriting Audio Assets

**Audio Files**

| Name       | Type                               | Unique | Optional |
| ---------- | ---------------------------------- | ------ | -------- |
| filename   | string? binary?                    | yes    | no       |
| status     | database relation to status type         | no     | no       |
| band_owner | database relation to a single Band | yes    | no       |
| lyric_file | database relation to lyric file    | yes    | no       |

**Song Status**

| Name                                        | Type   | Unique | Optional |
| ------------------------------------------- | ------ | ------ | -------- |
| status type (shelf, in progress, completed) | string | yes    | no       | 

This model will only have three entries: shelf, in progress, and completed. Audio files and lyric files models will reference it by ID (e.g. status: 1 == "shelf").

Audio file and lyric file linked via a 1 to 1 relationship. One lyric file to one song file.

**Lyric Files**

| Name       | Type                             | Unique | Optional | 
| ---------- | -------------------------------- | ------ | -------- | 
| song_name  | string                           | yes    | no       | 
| lyrics     | text field                       | no     | no       | 
| audio_file | database relation to audio file  | no     | no       | 
| status     | database relation to status type | no     | no       | 

## PR Assets

**Image**

| Name       | Type                               | Unique | Optional |
| ---------- | ---------------------------------- | ------ | -------- |
| filename   | string                             | yes    | no       |
| folder     | database relation to folder        | no     | no       |
| band_owner | database relation to a single Band | yes    | no       |

**Video**

| Name       | Type                               | Unique | Optional |
| ---------- | ---------------------------------- | ------ | -------- |
| filename   | string                             | yes    | no       |
| folder     | database relation to folder        | no     | no       |
| band_owner | database relation to a single Band | yes    | no       |

**Text**

| Name       | Type                               | Unique | Optional |
| ---------- | ---------------------------------- | ------ | -------- |
| filename   | string                             | yes    | no       |
| folder     | database relation to folder        | no     | no       |
| band_owner | database relation to a single Band | yes    | no       |

**Folder**

| Name        | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| folder type | string | yes    | no       |

Folder type would be of type:
	- images
		- logo
		- band pics
		- image promos
	- videos
		- music videos
		- live videos
		- video promos
	- text
		- text promos
		- bios
		- press release

## Venue Info
* Search bookable venues
* Save venues:
	* Plan tour
	* Save favorites

**Venue Location**

| Name           | Type    | Unique | Optional |
| -------------- | ------- | ------ | -------- |
| name           | string  | yes    | no       |
| city           | string  | no     | no       |
| state          | string  | no     | no       |
| visited_before | boolean | no     | no       | 
| is_favorite    | boolean | no     | no       |
| is_scheduled   | boolean | no     | no       |
| is_available   | boolean | no     | no       |

## Finance

**Expense**

| Name        | Type                      | Unique | Optional |
| ----------- | ------------------------- | ------ | -------- |
| Date        | datetime                  | no     | no       |
| Amount      | float                     | no     | no       |
| Description | textfield                 | no     | no       |
| Type        | string (expense)          | no     | no       |
| Band_owner  | database relation to Band | no     | no       |

**Income**

| Name        | Type                      | Unique | Optional |
| ----------- | ------------------------- | ------ | -------- |
| Date        | datetime                  | no     | no       |
| Amount      | float                     | no     | no       |
| Description | textfield                 | no     | no       |
| Type        | string (income)           | no     | no       |
| Band_owner  | database relation to Band | no     | no       |
