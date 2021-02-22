const app = require("../src/server/index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
import { connectDb, disconnectDb } from "../src/db/connection";
import UrlModel from "../src/db/models/Url.model";

describe("api", () => {
  let db;
  const mockUrl = {
    id: "newEntry1",
    url: "http://testNew.com"
  };

  beforeAll(async () => {
    db = await connectDb();
  });

  afterAll(async () => {
    db = disconnectDb();
  });

  it("Gets the urls endpoint", async (done) => {
    const res = await request.get("/urls");

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();

    done();
  });

  it("Posts a new url", async (done) => {
    const res = await request
      .post("/url-create")
      .send({ url: "http://test.com" });

    try {
      const url = await UrlModel.findOne({ url: "http://test.com" });

      expect(url.short.substr(0, 16)).toBe("https://pbid.io/");
      expect(url.timestamp).toBeTruthy();
      expect(url.id.length).toBe(8);
      expect(url.url).toBeTruthy();

      expect(res.body.short).toBe(url.short);
      expect(res.body.id).toBe(url.id);
      expect(res.body.timestamp).toBe(url.timestamp);
      expect(res.body.url).toBe(url.url);
      done();
    } catch (e) {
        throw new Error(e)
    }
    
  });

  it("Posts an existing url receives same result", async (done) => {
    let res2;
    const res1 = (res2 = await request
      .post("/url-create")
      .send({ url: "http://test.com" }));

    expect(res1.body.short).toBe(res2.body.short);
    expect(res1.body.id).toBe(res2.body.id);
    expect(res1.body.timestamp).toBe(res2.body.timestamp);
    expect(res1.body.url).toBe(res2.body.url);
    done();
  });

  it("Posts an incorrect payload, gets an error message", async (done) => {
    const res = await request.post("/url-create").send();

    expect(res.status).toBe(422);
    done();
  });
});
