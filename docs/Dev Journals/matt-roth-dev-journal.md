## Summary for week 2022-08-22--08-26

Over the course of this week I've learned that authorization is as fascinating as it is complex. During our initial planning the week before, it looked like we'd be able to avoid the complexities of JWTs and handle both our account and song request data in the same Django project.

From there I spent some time researching how to use two databases in one project. This was after the suggestion that it was better security to keep accounts separated in another database file. I was able to get the two databases working, but ultimately this extra complexity wasn't necessary. If we were to host our frontend with Django we could take advantage of the built-in user model in our template pages. _But_ we are using React for the frontend, which meant JWTs were a necessity.

This kicked off the process of decoupling the existing `account` app from our main `lyra` project, and creating a separate project dedicated solely to account management and authorization.

Once that Protect was up and running it was time to start learning Djwto. I set up the endpoints in Insomnia, inspected what the cookies look like, then began writing tests for both the auto-created Djwto endpoints, and the endpoints I set up with Django views. Finally, I started to write functions for the frontend that would make accessing the JWTs easier, with the eventual plan to use the `useToken()` hook as outlined in the Authentication Cookbook in Learn.

The week wrapped up with getting my tests working in the GitLab pipeline by setting an environmental variable in the yaml file.

## Summary for week 2022-08-29--09-02

### Day 1

- Wrote update and delete views for accounts. Delete view sets `is_active = False` rather than full delete.
- Got `useToken()` hook working and built an "auth demo" that demonstrates login, logout, and loading the current user's data into a component.
