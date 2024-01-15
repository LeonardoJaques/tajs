import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import { server } from "../src/api.js";
/*
  - Should register a new user in categories where:
  - Younger than 18 years old to 25 years old
  - Adults 26 years old to 50 years old
  - Elderly people 51 years or older
  - if the user is chields is not registered, return an error!
*/

describe("API Users E2E", () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once('error', (err) => reject(err))
      server.once('listening', () => resolve())
    })
  }

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`)
    return user.json()
  }

  let _testServer;
  let _testServerAddress;

  beforeAll(async () => {

    _testServer = server.listen();
    await waitForServerStatus(_testServer);
    const serverInfo = _testServer.address();
    _testServerAddress = `http://localhost:${serverInfo.port}`;

  })
  afterAll((done) => {
    server.closeAllConnections()
    _testServer.close(done)
  });
  it("Should register a new user with young-adult category", async () => {
    // important the year that this test can will broke if dont use fake timer
    // always you use date use fake timer
    jest.useFakeTimers({
      now: new Date('2023-11-23T00:00')
    })
    const expectedCategory = "young-adult";
    const response = await createUser({
      name: "Michael Jordan",
      birthDay: '2000-01-01' // 21 years old
    });
    expect(response.status).toBe(201); // 201 Created

    const result = await response.json()
    expect(result.id).not.toBeUndefined()

    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  });
  it("Should register a new user with adult category", async () => {
    jest.useFakeTimers({
      now: new Date('2023-11-23T00:00')
    })
    const expectedCategory = "adult";
    const response = await createUser({
      name: "Michael Jordan",
      birthDay: '1980-01-01' // 21 years old
    });
    expect(response.status).toBe(201); // 201 Created

    const result = await response.json()
    expect(result.id).not.toBeUndefined()

    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  });
  it("Should register a new user with senior category", async () => {
    jest.useFakeTimers({
      now: new Date('2023-11-23T00:00')
    })
    const expectedCategory = "elderly";
    const response = await createUser({
      name: "Michael Jordan",
      birthDay: '1950-01-01' // 21 years old
    });
    expect(response.status).toBe(201); // 201 Created

    const result = await response.json()
    expect(result.id).not.toBeUndefined()

    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  });
  it("Should throw an error when try register a under age user", async () => {
    const response = await createUser({
      name: "Michael Jordan",
      birthDay: '2018-01-01' // 21 years old
    });
    expect(response.status).toBe(400) // bad Request
    const result = await response.json()
    expect(result).toEqual({
      message: 'User must be 18yo or older'
    })

  });

});


