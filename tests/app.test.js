const supertest = require("supertest");
const server = require('./testserver');

// const express = require('express');
const app = supertest(server);

test("GET /api/ping", async () => {
    await app.get("/api/ping")
        .expect(200)
        .then((reponse) => reponse.body)
        .then((body) => {
            expect(body.success).toBeTruthy();
            expect(body.success).toEqual(true);

        });
})

test('one valid tag return 200', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech' })
      .expect(200);
});

test('tag parameter missing returns 400 and error message Tags parameter is required', async () => {
    await app.get("/api/posts")
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body.error).toEqual("Tags parameter is required");
      });
});

test('invalid tag parameter returns empty response', async () => {
    await app.get("/api/posts")
      .query({ tags: 'fiction'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts.length).toEqual(0);
      });
});

test('invalid sortBy returns 400 and error message sortBy parameter is invalid', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech', sortBy: 'non increasing'})
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body.error).toEqual("sortBy parameter is invalid");
      });
});

test('valid sort order returns 200', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech,culture', sortBy: 'likes'})
      .expect(200)

});

test('invalid direction should return 400 and error message', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech', direction: 'invalidDirection' })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body.error).toEqual("sortBy parameter is invalid");
      });
  });


test('valid tag and valid sortby order returns 200', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech', sortBy: 'likes'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(6);
        expect(body.posts[0].likes).toEqual(25);
        expect(body.posts[1].likes).toEqual(89);

      });
      
});

test('mulitple tags (tech, culture, science)valid sortby  reads and valid direction desc order', async () => {
    await app.get("/api/posts")
      .query({ tags: 'tech,culture,science', sortBy: 'reads', direction: 'desc'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(1);
        expect(body.posts[0].reads).toEqual(99575);
        expect(body.posts[0].author).toEqual("Lainey Ritter");
        expect(body.posts.length).toEqual(58);

      });
      
});


test('mulitple tags (culture, history) valid sortby popularity and valid direction desc order', async () => {
    await app.get("/api/posts")
      .query({ tags: 'culture,history', sortBy: 'popularity', direction: 'desc'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(10);
        expect(body.posts[0].popularity).toEqual(0.98);
        expect(body.posts[0].author).toEqual("Kinley Crosby");
      });
      
});

test('mulitple tags (science, tech) valid sortby popularity and default direction asc', async () => {
    await app.get("/api/posts")
      .query({ tags: 'science,tech', sortBy: 'likes'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(6);
        expect(body.posts[0].likes).toEqual(25);
        expect(body.posts[0].author).toEqual("Bryson Bowers");
      });
      
});

test('mulitple tags (design, startups) valid sortby reads and  direction desc', async () => {
    await app.get("/api/posts")
      .query({ tags: 'design,startups', sortBy: 'reads', direction: 'desc'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(3);
        expect(body.posts[0].reads).toEqual(98798);
        expect(body.posts[0].author).toEqual("Jaden Bryant");
      });
      
});

test('tag (politics) valid sortby popularity and  direction desc', async () => {
    await app.get("/api/posts")
      .query({ tags: 'politics', sortBy: 'popularity', direction: 'desc'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(1);
        expect(body.posts[0].popularity).toEqual(0.83);
        expect(body.posts[0].author).toEqual("Lainey Ritter");
      });
      
});


test('tag (health) valid sortby default id and default direction asc ', async () => {
    await app.get("/api/posts")
      .query({ tags: 'health'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(9);
        expect(body.posts[0].id).toEqual(1);
        expect(body.posts[0].author).toEqual("Rylee Paul");
      });
      
});


test('mulitple tags (design, startups,health, politics, culture,science, tech, history) valid sortby likes and direction desc', async () => {
    await app.get("/api/posts")
      .query({ tags: 'design,startups,health,politics, culture,science,tech,history', sortBy: 'likes', direction: 'desc'})
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].authorId).toEqual(12);
        expect(body.posts[0].likes).toEqual(992);
        expect(body.posts[0].author).toEqual("Zackery Turner");
        expect(body.posts.length).toEqual(96);
      });
      
});

