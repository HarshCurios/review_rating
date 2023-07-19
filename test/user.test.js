// const server = require("../index");
// const chaiHttp = require("chai-http");
// const chai = require("chai");
// const userSchema = require("../models/userSchema");
// const userRouts = require("../routes/userRoutes");

// chai.should();
// chai.use(chaiHttp);

// describe("POST /api/users", () => {
//   it("It should return login user detail :", (done) => {
//     const data = {
//       userEmail: "aman@gmail.com",
//       userPassword: "Aa1*a",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.have.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have.property("message").eq("LogIn successfully")
//         res.body.should.have.property("accessToken")
//       });
//       done();
//   });

//   it("It should return Error Message if password is wrong:", (done) => {
//     const data = {
//       userEmail: "aman@gmail.com",
//       userPassword: "Aa1*",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.have.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have.property("message").eq("Invalid email or Password")
//       });
//       done();
//   });

//   it("It should return Error Message if Email is wrong:", (done) => {
//     const data = {
//       userEmail: "man@gmail.com",
//       userPassword: "Aa1*",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.have.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have.property("message").eq("User is not recognized with this Email")
//       });
//       done();
//   });
// });

// describe("POST /api/users", () => {
//   it("It should return signUp user detail :", (done) => {
//     const user = {
//       userName: "lavish",
//       userEmail: "lavih@gmail.com",
//       userPassword: "Aa1*a",
//       userPhone: 8094147454,
//       userCity: "Baran",
//       userState: "Raj",
//     };
//     chai
//       .request(server)
//       .post("/user/create")
//       .set("Content-Type", "application/x-www-form-urlencoded")
//       .field(user)
//       .attach("profilePic", "C:\Users\PULKIT\OneDrive\Pictures\ankit.jpg")
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.have.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have.property("message").eq("user registered successfully");
//       });
//       done();
//   });

//   it("It should return error message if same email is given :", (done) => {
//     const data = {
//       userName: "Aman",
//       userEmail: "aman@gmail.com",
//       userPassword: "Aa1*a",
//       userPhone: 8094147454,
//       userCity: "Baran",
//       userState: "Raj"
//     };
//     chai
//       .request(server)
//       .post("/user/create")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.have.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have.property("message").eq("User is already registered With this Email");
//       });
//       done();
//   });
// })

let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const userSchema = require("../models/userSchema");
const routes = require("../routes/userRoutes");

chai.should();
chai.use(chaiHttp);

describe("Task Api", () => {
  describe("POST /api/users", async () => {
    it("It should return login user detail :", (done) => {
      const data = {
        userEmail: "aman@gmail.com",
        userPassword: "Aa1*a",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("message").eq("LogIn successfully");
          res.body.should.have.property("accessToken");
        });
      done();
    });

    it("It should return error message :", (done) => {
      const data = {
        userEmail: "aman@gmail.com",
        userPassword: "Aa1*",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have
            .property("message")
            .eq("Invalid email or Password");
        });
      done();
    });

    it("It should return wrong email message :", (done) => {
      const data = {
        userEmail: "ashu@91gmail.com",
        userPassword: "Aa1*a",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have
            .property("message")
            .eq("User is not recognized with this Email");
        });
      done();
    });
  });
});

describe("POST /api/users", () => {
  it("It should Add new user :", (done) => {
    const user = {
      userName: "Aman",
      userEmail: "an@gmail.com",
      userPassword: "Aman@123",
      userCity: "Hoshangabad",
      userState: "M.P.",
      userPhone: "9876543210",
    };
    chai
      .request(server)
      .post("/user/create")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field(user)
      .attach("profilePic", "C:\Users\PULKIT\OneDrive\Pictures\ankit.jpg")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("user registered successfully");
      });
    done();
  });
});
