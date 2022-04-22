# fullstack_todo

## Development

### Starting the backend and database

Make sure you have docker with docker-compose installed.

Then type:
```
cd backend
docker-compose up
```

### Changes in package.json

Because the container has its on node_modules folder, you need to run `docker-compose build` if you add any new packages to package.json.

## Testing

### Backend

Since we run 2 containers for the express app and the database which communicate inside the compose network, we
can not simply run the test for our express app from our host machine. We have to get inside the backend container
and execute the tests there.

`docker exec -t the_backend_container /bin/bash -c "npm test"`

-t is there to create pseudo tty (which helps with putting colors on the screen)