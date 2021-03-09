const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("GET /apps", () => {
  it("should return an array of apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const item = res.body[0];
        expect(item).to.include.all.keys("App", "Rating", "Genres");
      });
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: !["app", "rating"] })
      .expect(400, "Sort must be one of app or rating");
  });

  it("should be 400 if genres is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({
        genres: !["action", "puzzle", "strategy", "casual", "arcade", "card"],
      })
      .expect(
        400,
        "Genres must be one of the following: action, arcade, card, casual, puzzle, strategy"
      );
  });

  it("should sort by app", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "app" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if (appAtIPlus1["App"] < appAtI["App"]) {
            sorted = false;
            break;
          }
          i++;
        }
      });
  });

  it("should sort by rating", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "rating" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if (appAtIPlus1["Rating"] < appAtI["Rating"]) {
            sorted = false;
            break;
          }
          i++;
        }
      });
  });
});
