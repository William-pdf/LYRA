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

